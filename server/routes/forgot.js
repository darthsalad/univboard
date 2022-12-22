const router = require("express").Router();
const User = require("../model/user");
const mail = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

router.post("/forgot_password", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email doesn't exist");

  const token = crypto.randomBytes(20).toString("hex");
  console.log(token);
  await User.updateOne(
    {
      email: req.body.email,
    },
    {
      $set: {
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 360000,
      },
    }
  );

  const transporter = mail.createTransport({
    service: "gmail",
    auth: {
      user: "piyushmishra965@gmail.com",
      pass: "lauwirpmxstopwfp",
    },
  });

  const mailOptions = {
    from: {
      name: "Admin@univboard",
      email: "piyushmishra965@gmail.com",
    },
    to: user.email,
    subject: "Link to reset password",
    text:
      `Password reset link: ` +
      `Click on the link to reset your password: ${`http://localhost:5000/api/user/reset/${token}`}`,
  };
  transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      res.status(400).send(err);
    } else {
      console.log(response);
      res.status(200).send("recovery email send to " + req.body.email);
    }
  });
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
    res
      .status(200)
      .redirect(`http://localhost:3000/reset_password/${req.params.token}`);
  }
});

router.post("/new_password/:token", async (req, res) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
    });
    if (!user) res.status(400).send("Link expired!");
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    await User.findOneAndUpdate(
      {
        resetPasswordToken: req.params.token,
        resetPasswordExpires: {
          $gt: Date.now(),
        },
      },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );
    await User.findOneAndUpdate(
      {
        resetPasswordToken: req.params.token,
        resetPasswordExpires: {
          $gt: Date.now(),
        },
      },
      {
        $set: {
          resetPasswordToken: "",
          resetPasswordExpires: new Date(),
        },
      }
    );
  } catch (err) {
    res.status(400).send(err);
  }
  res.status(200).send({ data: "User password updated successfully" });
});

module.exports = router;
