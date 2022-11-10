const router = require("express").Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getAuth = require("./validateToken");
const { registerValidate, loginValidate } = require("../validate");
const mail = require("nodemailer");
const crypto = require("crypto")

router.post("/register", async (req, res) => {
  const { error } = registerValidate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists");

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email doesn't exist");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res
      .status(400)
      .send("Email or password incorrect\nPlease check again");

  const token = jwt.sign({ user: user._id }, process.env.TOKEN_SECRET);
  if (token)
    return res
      .cookie("auth-token", token, {
        maxAge: 1296 * Math.pow(10, 6), //15 days in ms
        // secure: false,
        httpOnly: false,
      })
      .header("auth-token", token)
      .send({
        id: user._id,
        name: user.name,
        email: user.email,
        clipboard: user.clips.length,
        date_created: user.date,
      });
});

router.get("/auth", getAuth, async (req, res) => {
  const user = await User.findById(req.user.user);
  if (req.user)
    return res.send({
      auth: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        clipboard: user.clips.length,
        date_created: user.date,
      },
    });
});

router.get("/logout", getAuth, async (req, res, next) => {
  if (req.user)
    return res
      .cookie("auth-token", "none", {
        expires: new Date(Date.now() + 1 * 1000),
        httpOnly: false,
      })
      .send({ message: "user logged out successfully" });
  console.log(res, req);
  next();
});

router.post("/forgot_password", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email doesn't exist");

  const token = crypto.randomBytes(20).toString('hex');
  console.log(token);
  await User.updateOne({
    email: req.body.email,
  }, {
    $set: {
      resetPasswordToken: token,
      resetPasswordExpires: Date.now() + 360000
    },
  });

  const transporter = mail.createTransport({
    service: 'gmail',
    auth: {
      user: "piyushmishra965@gmail.com",
      pass: "lauwirpmxstopwfp"
    }
  });

  const mailOptions = {
    from: "admin@univboard",
    to: user.email,
    subject: "Link to reset password",
    text:
      `Password reset link: ` +
      `Click on the link to reset your password: ${`http://localhost:5000/api/user/reset/${token}`}`
  };
  transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      res.status(400).send(err);
    } else {
      console.log(response);
      res.status(200).send('recovery email send to ' + req.body.email);
    }
  })
});

router.get("/reset/:token", async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: {
      $gt: Date.now(),
    },
  });
  if (!user) {
    res.status(400).send("Password link has expired");
  } else {
    // res.status(200).send({
    //   email: user.email,
    //   message: "password link working"
    // })
    res.status(200).redirect(`http://localhost:3000/reset_password/${req.params.token}`);
  }
});

router.post("/new_password/:token", async (req, res) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token
    })
    if (!user) res.status(400).redirect("http://localhost:3000/error");

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    await User.findOneAndUpdate({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    }, {
      $set: {
        password: hashedPassword,
      }
    })

    res.status(200).send({data: "User password updated successfully"});

    await User.findOneAndUpdate({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    }, {
      $set: {
        resetPasswordToken: "",
        resetPasswordExpires: new Date()
      }
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
