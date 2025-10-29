const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    experienceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Experience",
      required: true,
    },
    slotId: String,
    name: String,
    email: String,
    phone: String,
    amount: Number,
    promoCode: String,
    status: { type: String, default: "confirmed" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
