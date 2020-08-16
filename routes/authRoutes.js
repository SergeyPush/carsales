const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { Router } = require("express");
const router = Router();
const User = require("../models/UserModel");

router.post(
  "/register",
  check("email", "Incorrect email").isEmail(),
  check("password", "Incorrect password").isLength({ min: 6 }),
  check("name", "Incorrect username").trim().not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        message: "Incorrect registration data",
        errors: errors.array(),
      });
    }
    const { name, email, password } = req.body;

    try {
      const candidate = User.findOne({ email });
      if (!candidate) {
        return res.status(400).json({
          status: "fail",
          message: "User already exists",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await User({ name, email, password: hashedPassword });

      const createdUser = await user.save();
      const token = jwt.sign({ userId: createdUser.id }, config.get("secret"), {
        expiresIn: "48h",
      });
      return res.json({
        userId: createdUser.id,
        token,
        username: user.name,
      });
    } catch (error) {
      return res.json({
        status: "fail",
        messgae: error.message,
      });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Incorrect email").isEmail(),
    check("password", "Incorrect password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        message: "Incorrect registration data",
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          status: "fail",
          message: "No such user",
        });
      }
      const isMatch = bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          status: "fail",
          message: "Invalid data",
        });
      }
      const token = jwt.sign({ userId: user.id }, config.get("secret"), {
        expiresIn: "48h",
      });

      res.json({ token, userId: user.id, username: user.name });
    } catch (error) {
      return res.status(400).json({ status: "fail", message: error.message });
    }
  }
);

module.exports = router;
