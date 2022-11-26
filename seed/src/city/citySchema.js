const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    population: { type: String, required: true },
    mapImage: { type: String },
    history: { type: String },
    places: { type: String },
  },
  {
    timestamps: true,
  }
);
const City = mongoose.model("cities", citySchema);

module.exports = City;
