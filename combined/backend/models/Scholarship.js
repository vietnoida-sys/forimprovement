const mongoose = require("mongoose");

const scholarshipSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    university: { type: mongoose.Schema.Types.ObjectId, ref: "University" },
    amount: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    eligibility: { type: String },
    deadline: { type: Date },
  },
  { timestamps: true }
);

const scholarshipApplicationSchema = new mongoose.Schema(
  {
    scholarship: { type: mongoose.Schema.Types.ObjectId, ref: "Scholarship", required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  },
  { timestamps: true }
);

module.exports = {
  Scholarship: mongoose.model("Scholarship", scholarshipSchema),
  ScholarshipApplication: mongoose.model("ScholarshipApplication", scholarshipApplicationSchema),
};
