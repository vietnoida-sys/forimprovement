const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    source: { type: String, default: "Website" },
    interestedCountry: { type: String },
    status: {
      type: String,
      enum: ["New", "Contacted", "Interested", "Applied", "Visa Approved", "Enrolled"],
      default: "New",
    },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    followUpDate: { type: Date },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lead", leadSchema);
