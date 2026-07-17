const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    country: { type: String, trim: true, default: "" },
    role: { type: String, trim: true, default: "" }, // legacy field, kept for backward compatibility
    quote: { type: String, required: true, trim: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Testimonial", testimonialSchema);