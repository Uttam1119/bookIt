require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const expRoutes = require("./routes/experiences");
const bookingRoutes = require("./routes/bookings");
const promoRoutes = require("./routes/promo");

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use("/experiences", expRoutes);
app.use("/bookings", bookingRoutes);
app.use("/promo", promoRoutes);

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected.");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Mongo connection failed:", err));
