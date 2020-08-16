const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema({
  name: { type: String, required: true },
  second_name: { type: String, default: "" },
  password: { type: String, required: true },
  email: { type: String, unique: true, default: "" },
  phone: { type: String, default: "" },
  avatar: { type: String },
  Cars: [{ type: Types.ObjectId, ref: "Cars" }],
});

module.exports = model("User", userSchema);
