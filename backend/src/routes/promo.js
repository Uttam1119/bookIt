const express = require("express");
const router = express.Router();
require("dotenv").config();

// POST /promo/validate
router.post("/validate", (req, res) => {
  const { code, amount } = req.body;
  if (!code) return res.status(400).json({ valid: false });

  const c = code.trim().toUpperCase();
  const resp = { valid: false };

  if (c === "SAVE10") {
    const percent = parseInt(process.env.PROMO_SAVE10_PERCENT || "10", 10);
    resp.valid = true;
    resp.type = "percent";
    resp.amount = percent;
    resp.newPrice = Math.max(0, amount - Math.round((amount * percent) / 100));
  } else if (c === "FLAT100") {
    const flat = parseInt(process.env.PROMO_FLAT100 || "100", 10);
    resp.valid = true;
    resp.type = "flat";
    resp.amount = flat;
    resp.newPrice = Math.max(0, amount - flat);
  }

  res.json(resp);
});

module.exports = router;
