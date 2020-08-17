const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const config = require("config");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const path = require("path");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.static("public"));
app.use("/images", express.static("./images"));
app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/cars", require("./routes/carsRoutes"));
app.use("/api/user", require("./routes/userRoutes"));

const PORT = process.env.PORT || 5000;
const YOUR_HOST = process.env.YOUR_HOST || "0.0.0.0";
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const start = async () => {
  try {
    await mongoose.connect(config.get("db"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    });
    console.log("DB connected");

    app.listen(PORT, YOUR_HOST, () => {
      console.log(`App is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
