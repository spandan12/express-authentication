const express = require("express");
const bcrypt = require("../utils/bcrypt");
const jwt = require("../utils/jwt");
const User = require("../models/User");
const UserSession = require("../models/UserSession");
const router = express.Router();
const validate = require("../utils/validate");
const {
  userValidator,
  tokenValidator,
} = require("../validators/user.validator");

router.post("/signUp", validate(userValidator), async (req, res) => {
  try {
    const password = await bcrypt.hash(req.body.password);
    const user = new User({
      username: req.body.username,
      password,
    });
    await user.save();
    res.send(200);
  } catch (err) {
    console.log(err);
    res.send(400);
  }
});

router.post("/signin", validate(userValidator), async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  const isSame = await bcrypt.compare(req.body.password, user.password);

  if (!isSame) {
    res.send({ code: 400, message: "username or password error" });
  }
  const accessToken = await jwt.generateAccessToken(user);
  const refreshToken = await jwt.generateRefreshToken(user);
  const userSession = new UserSession({
    token: refreshToken,
  });
  await userSession.save();

  res.send({ accessToken, refreshToken });
});

router.post("/signout", validate(tokenValidator), async (req, res) => {
  const usersession = await UserSession.findOne({
    token: req.body.refreshToken,
  });

  if (!usersession || !usersession.active) {
    res.status(400).send({ message: "no session with given token present" });
  }
  const response = await UserSession.updateOne({
    _id: usersession._id,
    active: false,
  });
  console.log(response);
  res.send(200);
});

router.post("/refresh", validate(tokenValidator), async (req, res) => {
  try {
    const usersession = await UserSession.findOne({
      token: req.body.refreshToken,
    });
    if (!usersession || !usersession.active) {
      res.status(400).send({ message: "no session with given token present" });
    }
    const isVerified = await jwt.verifyRefreshToken(req.body.refreshToken);
    if (!isVerified) {
      res.status(401).send({ message: "refresh token expired" });
    }
    const accessToken = await jwt.generateAccessToken(isVerified);
    res.status(200).send({ accessToken });
  } catch (err) {
    res.send(400);
  }
});

module.exports = router;
