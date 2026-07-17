const mongoose = require("mongoose");

const newsEventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, enum: ["news", "event"], default: "news" },
    date: { type: String, required: true }, // YYYY-MM-DD
    description: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("NewsEvent", newsEventSchema);