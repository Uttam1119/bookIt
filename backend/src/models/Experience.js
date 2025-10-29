const mongoose = require("mongoose");

const SlotSchema = new mongoose.Schema({
  date: String,
  slotId: String,
  time: String,
  capacity: Number,
});

const ExperienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: String,
  description: String,
  price: Number,
  image: String,
  slots: [SlotSchema],
});

module.exports = mongoose.model("Experience", ExperienceSchema);
