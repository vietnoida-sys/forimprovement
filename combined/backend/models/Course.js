const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    university: { type: mongoose.Schema.Types.ObjectId, ref: "University", required: true },
    degreeLevel: { type: String, enum: ["Bachelor", "Master", "PhD", "Diploma"], default: "Master" },
    tuitionFee: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    durationMonths: { type: Number, required: true },
    intakes: [{ type: String }], // e.g. ["Fall 2026", "Spring 2027"]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
