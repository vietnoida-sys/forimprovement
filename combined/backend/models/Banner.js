const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true, trim: true },
    subheading: { type: String, trim: true, default: "" },
    imageUrl: { type: String, trim: true, default: "" },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Banner", bannerSchema);