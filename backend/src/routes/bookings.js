const express = require("express");
const router = express.Router();
const Experience = require("../models/Experience");
const Booking = require("../models/Booking");

router.post("/", async (req, res) => {
  try {
    const {
      experienceId,
      slotId,
      name,
      email,
      phone,
      promoCode,
      quantity = 1,
    } = req.body;

    if (!experienceId || !slotId || !name || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const exp = await Experience.findById(experienceId);
    if (!exp) return res.status(404).json({ error: "Experience not found" });

    const slot = exp.slots.find((s) => s._id.toString() === slotId);
    if (!slot) return res.status(400).json({ error: "Slot not found" });

    const existingBooking = await Booking.findOne({
      experienceId,
      slotId,
      email,
      status: "confirmed",
    });
    if (existingBooking) {
      return res
        .status(409)
        .json({ error: "You have already booked this slot." });
    }

    const confirmedCount = await Booking.aggregate([
      { $match: { experienceId, slotId, status: "confirmed" } },
      { $group: { _id: null, total: { $sum: "$quantity" } } },
    ]);
    const totalBooked = confirmedCount[0]?.total || 0;

    if (totalBooked + quantity > slot.capacity) {
      return res
        .status(409)
        .json({ error: "Not enough spots left in this slot." });
    }

    const booking = await Booking.create({
      experienceId,
      slotId,
      name,
      email,
      phone,
      amount: exp.price * quantity,
      promoCode: promoCode || null,
      quantity,
      status: "confirmed",
    });

    slot.capacity = Math.max(0, slot.capacity - quantity);
    await exp.save();

    res.json({ success: true, booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
