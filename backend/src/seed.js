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
        title: "Kayaking",
        location: "Udupi",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200",
        price: 999,
        slots: [
          { date: "2025-11-01", time: "07:00 am", capacity: 5 },
          { date: "2025-11-01", time: "09:00 am", capacity: 2 },
          { date: "2025-11-02", time: "04:00 pm", capacity: 4 },
        ],
      },
      {
        title: "Nandi Hills Sunrise",
        location: "Bangalore",
        image:
          "https://images.unsplash.com/photo-1617957743100-67a54a1b8b6a?q=80&w=1200",
        price: 899,
        slots: [
          { date: "2025-11-01", time: "05:30 am", capacity: 10 },
          { date: "2025-11-02", time: "06:00 am", capacity: 6 },
        ],
      },
      {
        title: "Coffee Trail",
        location: "Coorg",
        image:
          "https://images.unsplash.com/photo-1504593811423-6dd665756598?q=80&w=1200",
        price: 1299,
        slots: [
          { date: "2025-11-01", time: "08:00 am", capacity: 4 },
          { date: "2025-11-02", time: "10:00 am", capacity: 3 },
        ],
      },
      {
        title: "Boat Cruise",
        location: "Sunderban",
        image:
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200",
        price: 999,
        slots: [
          { date: "2025-11-03", time: "11:00 am", capacity: 8 },
          { date: "2025-11-04", time: "02:00 pm", capacity: 5 },
        ],
      },
      {
        title: "Bunjee Jumping",
        location: "Manali",
        image:
          "https://images.unsplash.com/photo-1518593929751-4a238b4a9e53?q=80&w=1200",
        price: 999,
        slots: [
          { date: "2025-11-02", time: "01:00 pm", capacity: 3 },
          { date: "2025-11-03", time: "03:30 pm", capacity: 6 },
        ],
      },
      {
        title: "Nandi Hills Sunrise",
        location: "Bangalore",
        image:
          "https://images.unsplash.com/photo-1522204501817-376f8e5ebd4f?q=80&w=1200",
        price: 899,
        slots: [
          { date: "2025-11-01", time: "06:30 am", capacity: 5 },
          { date: "2025-11-02", time: "07:00 am", capacity: 2 },
        ],
      },
      {
        title: "Coffee Trail",
        location: "Coorg",
        image:
          "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1200",
        price: 1299,
        slots: [
          { date: "2025-11-01", time: "08:00 am", capacity: 3 },
          { date: "2025-11-02", time: "09:30 am", capacity: 1 },
        ],
      },
      {
        title: "Kayaking",
        location: "Udupi, Karnataka",
        image:
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200",
        price: 999,
        slots: [
          { date: "2025-11-02", time: "07:00 am", capacity: 6 },
          { date: "2025-11-02", time: "10:00 am", capacity: 2 },
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
