const { Router } = require("express");
const router = Router();
const Car = require("../models/CarModel");
const auth = require("../middleware/auth.middleware");
const fsa = require("fs-extra");

//Create car
//Private
router.post("/", auth, async (req, res) => {
  const {
    user: { userId },
  } = req;

  if (!req.body) {
    return res.status(400).json({ message: "Invalid data" });
  }

  try {
    const paths = [];
    if (req.files) {
      const files = Object.keys(req.files).map((item) => req.files[item]);

      files.forEach((file) => {
        paths.push(`/images/${file.name}`);
        file.mv(`./images/${file.name}`, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });
    }

    const obj = {
      manufacturer: req.body.manufacturer,
      model: req.body.car_model,
      price: req.body.price,
      mileage: req.body.mileage,
      state: req.body.state,
      exchange: req.body.exchange === "true",
      gear: req.body.gear,
      year: req.body.year,
      description: req.body.description,
      owner: userId,
      photos: paths,
    };

    const car = new Car(obj);
    const result = await car.save();

    res.json({ status: "ok", result });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error,
    });
  }
});

//Get list of cars
//Public
router.get("/", async (req, res) => {
  try {
    const result = await Car.find();

    res.json({
      status: "ok",
      cars: result,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
});

//Get list of cars of registered user
//Private
router.get("/mycars", auth, async (req, res) => {
  try {
    const { user } = req;
    const result = await Car.find({ owner: user.userId });
    if (!result) {
      return res.json({ status: "ok", data: [] });
    }
    return res.send({
      status: "ok",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error,
    });
  }
});

//Get car by id
//Public
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findById(id);
    return res.json({
      status: "ok",
      car,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
});

//Delete car
// Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findByIdAndDelete(id);
    if (car.photos) {
      const { photos } = car;
      photos.forEach((photo) =>
        fsa
          .remove(`.${photo}`)
          .then(() => console.log("success"))
          .catch((err) => console.log(err))
      );
    }

    return res.json({
      status: "ok",
      message: "Car is deleted",
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
});

module.exports = router;
