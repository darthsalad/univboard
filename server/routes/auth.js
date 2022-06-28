const router = require("express").Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getAuth = require("./validateToken");
const { registerValidate, loginValidate } = require("../validate");

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

module.exports = router;
