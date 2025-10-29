const mongoose = require("mongoose");
require("dotenv").config();
const Experience = require("./models/Experience");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo connected.");

    await Experience.deleteMany();

    const exps = [
      {
        title: "Sunset Kayaking",
        location: "Goa Beach",
        description: "Enjoy a peaceful kayak ride at sunset.",
        price: 1200,
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        slots: [
          { date: "2025-11-01", slotId: "exp1-s1", time: "16:00", capacity: 4 },
          { date: "2025-11-02", slotId: "exp1-s2", time: "16:00", capacity: 4 },
        ],
      },
      {
        title: "Mountain Hike",
        location: "Himalayan Trail",
        description: "A guided trek for intermediate hikers.",
        price: 2500,
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
        slots: [
          { date: "2025-11-05", slotId: "exp2-s1", time: "06:00", capacity: 8 },
          { date: "2025-11-06", slotId: "exp2-s2", time: "06:00", capacity: 8 },
        ],
      },
      {
        title: "City Food Walk",
        location: "Old Town",
        description: "Taste best street foods with a local guide.",
        price: 900,
        image: "https://images.unsplash.com/photo-1547592166-7a7f4f9f0f4f",
        slots: [
          {
            date: "2025-11-03",
            slotId: "exp3-s1",
            time: "18:00",
            capacity: 10,
          },
          {
            date: "2025-11-04",
            slotId: "exp3-s2",
            time: "18:00",
            capacity: 10,
          },
        ],
      },
    ];

    await Experience.insertMany(exps);
    console.log("Seeded experiences successfully.");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
