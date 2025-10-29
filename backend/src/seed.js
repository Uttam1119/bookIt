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
          "https://plus.unsplash.com/premium_photo-1661893427047-16f6ddc173f6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
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
          "https://images.unsplash.com/photo-1562904604-fc9109b899cc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
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
          "https://images.unsplash.com/photo-1633275790633-ec22b4610cf3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
        price: 1299,
        slots: [
          { date: "2025-11-01", time: "08:00 am", capacity: 4 },
          { date: "2025-11-02", time: "10:00 am", capacity: 3 },
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
      {
        title: "Nandi Hills Sunrise",
        location: "Bangalore",
        image:
          "https://images.unsplash.com/photo-1653282766924-d59ca526ec7f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
        price: 899,
        slots: [
          { date: "2025-11-01", time: "05:30 am", capacity: 10 },
          { date: "2025-11-02", time: "06:00 am", capacity: 6 },
        ],
      },
      {
        title: "Boat Cruise",
        location: "Sunderban",
        image:
          "https://plus.unsplash.com/premium_photo-1663050763676-82ff02c5e02c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074",
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
          "https://plus.unsplash.com/premium_photo-1663013514560-a30fbd137865?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=688",
        price: 999,
        slots: [
          { date: "2025-11-02", time: "01:00 pm", capacity: 3 },
          { date: "2025-11-03", time: "03:30 pm", capacity: 6 },
        ],
      },

      {
        title: "Coffee Trail",
        location: "Coorg",
        image:
          "https://images.unsplash.com/photo-1633275755864-3e8aaa5968cd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764",
        price: 1299,
        slots: [
          { date: "2025-11-01", time: "08:00 am", capacity: 4 },
          { date: "2025-11-02", time: "10:00 am", capacity: 3 },
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
