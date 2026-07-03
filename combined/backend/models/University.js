const mongoose = require("mongoose");

const universitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    country: { type: String, required: true },
    city: { type: String },
    ranking: { type: Number },
    logoUrl: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("University", universitySchema);
