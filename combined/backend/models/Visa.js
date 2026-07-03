const mongoose = require("mongoose");

const visaSchema = new mongoose.Schema(
  {
    application: { type: mongoose.Schema.Types.ObjectId, ref: "Application", required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["Not Started", "Documents Pending", "Interview Scheduled", "Approved", "Rejected"],
      default: "Not Started",
    },
    interviewDate: { type: Date },
    approvalDate: { type: Date },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Visa", visaSchema);
