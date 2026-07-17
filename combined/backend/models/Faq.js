const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
    category: { type: String, trim: true, default: "General" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Faq", faqSchema);