const mongoose = require("mongoose");
const newsEventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, enum: ["news", "event"], default: "news" },
    date: { type: String, required: true }, // YYYY-MM-DD
    description: { type: String, trim: true, default: "" },

    // add these to support the events page UI:
    time: { type: String, default: "" },          // e.g. "5:00 PM - 6:30 PM"
    location: { type: String, default: "" },       // e.g. "Hyatt Regency, Mumbai"
    category: { type: String, default: "" },        // e.g. "Education Fair", "Webinar"
    country: { type: String, default: "" },
    mode: { type: String, enum: ["ONLINE", "OFFLINE"], default: "OFFLINE" },
    seatsLeft: { type: Number, default: 0 },
    totalSeats: { type: Number, default: 0 },
    img: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("NewsEvent", newsEventSchema);