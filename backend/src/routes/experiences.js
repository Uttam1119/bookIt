const express = require("express");
const router = express.Router();
const Experience = require("../models/Experience");

// GET /experiences
router.get("/", async (req, res) => {
  try {
    const exps = await Experience.find();
    res.json(exps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /experiences/:id
router.get("/:id", async (req, res) => {
  try {
    const exp = await Experience.findById(req.params.id);
    if (!exp) return res.status(404).json({ error: "Not found" });
    res.json(exp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
