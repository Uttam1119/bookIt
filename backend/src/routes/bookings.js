const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const Experience = require("../models/Experience");
const Booking = require("../models/Booking");

// POST /bookings
router.post("/", async (req, res) => {
  try {
    const { experienceId, slotId, name, email, phone, promoCode } = req.body;

    if (!experienceId || !slotId || !name || !email)
      return res.status(400).json({ error: "Missing required fields" });

    const exp = await Experience.findById(experienceId);
    if (!exp) return res.status(404).json({ error: "Experience not found" });

    const slot = exp.slots.find((s) => s._id.toString() === slotId);

    if (!slot) return res.status(400).json({ error: "Slot not found" });

    const existingCount = await Booking.countDocuments({
      experienceId,
      slotId,
      status: "confirmed",
    });
    if (existingCount >= slot.capacity) {
      return res.status(409).json({ error: "Slot sold out" });
    }

    const booking = await Booking.create({
      experienceId,
      slotId,
      name,
      email,
      phone,
      amount: exp.price,
      promoCode: promoCode || null,
      status: "confirmed",
    });

    res.json({ success: true, booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
