const express = require("express");
const router = express.Router();
const Experience = require("../models/Experience");
const Booking = require("../models/Booking");

// POST /bookings
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

    if (!experienceId || !slotId || !name || !email)
      return res.status(400).json({ error: "Missing required fields" });

    const exp = await Experience.findById(experienceId);
    if (!exp) return res.status(404).json({ error: "Experience not found" });

    const slot = exp.slots.find((s) => s._id.toString() === slotId);
    if (!slot) return res.status(400).json({ error: "Slot not found" });

    // Check if there’s enough capacity left
    if (slot.capacity < quantity) {
      return res.status(409).json({
        error: `Only ${slot.capacity} seat(s) left for this slot.`,
      });
    }

    // Reduce the slot capacity
    slot.capacity -= quantity;

    // Save the updated experience (so future fetches show new capacity)
    await exp.save();

    // Create booking
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

    res.json({ success: true, booking });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
