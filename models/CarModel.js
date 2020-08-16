const { model, Schema, Types } = require("mongoose");

const CarSchema = new Schema({
  manufacturer: {
    required: true,
    type: String,
  },
  model: {
    required: true,
    type: String,
  },
  mileage: { type: Number, required: true },
  price: { type: Number, required: true },
  state: [{ type: String }],
  gear: { type: String },
  year: { type: String },
  description: { type: String },
  exchange: { type: Boolean },
  photos: [{ type: String, default: {} }],
  owner: { type: Types.ObjectId, ref: "User" },
});

module.exports = model("Car", CarSchema);
