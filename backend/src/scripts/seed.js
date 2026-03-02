require("dotenv").config({ path: require("path").join(__dirname, "../../.env") });
const mongoose = require("mongoose");
const User = require("../models/User");

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const existing = await User.findOne({ username: "admin" });
  if (existing) {
    console.log("Admin user already exists.");
    process.exit(0);
  }

  await User.create({ username: "admin", password: "admin123", role: "admin" });
  console.log("Admin user created: admin / admin123");
  process.exit(0);
};

run().catch((e) => { console.error(e); process.exit(1); });
