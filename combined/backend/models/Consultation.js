const mongoose = require("mongoose");

const consultationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    whatsappNumber: {
      type: String,
      default: "",
    },

    targetCountry: {
      type: String,
      required: true,
    },

    consultationType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Consultation",
  consultationSchema
);