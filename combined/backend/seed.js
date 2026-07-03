// Run with: npm run seed
// Creates a default admin account and a couple of demo records.
require("dotenv").config();
const connectDB = require("./config/db");
const User = require("./models/User");
const University = require("./models/University");
const Course = require("./models/Course");
const Lead = require("./models/Lead");

const run = async () => {
  await connectDB();

  const adminExists = await User.findOne({ email: "admin@eduadmin.com" });
  if (!adminExists) {
    await User.create({
      name: "Super Admin",
      email: "admin@eduadmin.com",
      password: "admin123",
      role: "admin",
    });
    console.log("Created default admin -> admin@eduadmin.com / admin123");
  } else {
    console.log("Admin already exists, skipping.");
  }

  const counsellorExists = await User.findOne({ email: "counsellor@eduadmin.com" });
  if (!counsellorExists) {
    await User.create({
      name: "Demo Counsellor",
      email: "counsellor@eduadmin.com",
      password: "counsellor123",
      role: "counsellor",
    });
    console.log("Created demo counsellor -> counsellor@eduadmin.com / counsellor123");
  }

  const studentExists = await User.findOne({ email: "student@eduadmin.com" });
  if (!studentExists) {
    await User.create({
      name: "Demo Student",
      email: "student@eduadmin.com",
      password: "student123",
      role: "student",
      country: "India",
    });
    console.log("Created demo student -> student@eduadmin.com / student123");
  }

  let uni = await University.findOne({ name: "University of Toronto" });
  if (!uni) {
    uni = await University.create({
      name: "University of Toronto",
      country: "Canada",
      city: "Toronto",
      ranking: 21,
      description: "Top-ranked research university in Canada.",
    });
    await Course.create({
      name: "MSc Computer Science",
      university: uni._id,
      degreeLevel: "Master",
      tuitionFee: 32000,
      durationMonths: 24,
      intakes: ["Fall 2026", "Winter 2027"],
    });
    console.log("Seeded demo university and course.");
  }

  const leadExists = await Lead.findOne({ email: "demo.lead@example.com" });
  if (!leadExists) {
    await Lead.create({
      name: "Demo Lead",
      email: "demo.lead@example.com",
      phone: "9990001111",
      source: "Website",
      interestedCountry: "Canada",
      status: "New",
    });
    console.log("Seeded demo lead.");
  }

  console.log("Seeding complete.");
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
