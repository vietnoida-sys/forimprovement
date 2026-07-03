const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    university: { type: mongoose.Schema.Types.ObjectId, ref: "University", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    status: {
      type: String,
      enum: ["Submitted", "Document Verification", "Under Review", "Approved", "Rejected"],
      default: "Submitted",
    },
    intake: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
