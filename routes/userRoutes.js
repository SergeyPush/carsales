const { Router } = require("express");
const router = Router();
const User = require("../models/UserModel");
const auth = require("../middleware/auth.middleware");

router.get("/username", auth, async (req, res) => {
  const {
    user: { userId },
  } = req;

  try {
    const result = await User.findById(userId).select("name");

    return res.json({
      status: "ok",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
});

router.get("/userdata", auth, async (req, res) => {
  const {
    user: { userId },
  } = req;
  try {
    const result = await User.findById(userId).select(
      "name second_name phone email"
    );
    return res.json({
      status: "ok",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
});

router.patch("/userdata", auth, async (req, res) => {
  const {
    user: { userId },
  } = req;
  try {
    const candidate = await User.findById(userId);
    if (!candidate) {
      return res.status(400).json({
        status: "fail",
        message: "No such user",
      });
    }

    await User.findByIdAndUpdate(userId, { ...req.body });

    return res.json({
      status: "ok",
      message: "userdata saved",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
});

router.get("/userinfo", async (req, res) => {
  const { owner } = req.query;
  try {
    if (!owner) {
      return res.status(400).json({
        status: "fail",
        message: "No such user",
      });
    }
    const result = await User.findById(owner).select(
      "name second_name email phone"
    );

    return res.json({
      status: "ok",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
});

module.exports = router;
