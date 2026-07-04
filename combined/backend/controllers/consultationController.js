const Consultation = require("../models/Consultation");

// Create Consultation
exports.createConsultation = async (req, res) => {
  try {
    console.log("Consultation API Hit");
    console.log("Request Body:", req.body);

    const {
      fullName,
      email,
      whatsappNumber,
      targetCountry,
      consultationType,
    } = req.body;

    const errors = {};

    if (!fullName || !fullName.trim()) {
      errors.fullName = "Full name is required";
    }

    if (!email || !email.trim()) {
      errors.email = "Email is required";
    }

    if (!targetCountry) {
      errors.targetCountry = "Target country is required";
    }

    if (!consultationType) {
      errors.consultationType = "Consultation type is required";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    const consultation = await Consultation.create({
      fullName,
      email,
      whatsappNumber,
      targetCountry,
      consultationType,
    });

    res.status(201).json({
      success: true,
      message: "Consultation request submitted successfully",
      consultation,
    });
  } catch (error) {
    console.error("Create Consultation Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Get All Consultations
exports.getAllConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: consultations.length,
      consultations,
    });
  } catch (error) {
    console.error("Get All Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Single Consultation
exports.getSingleConsultation = async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id);

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: "Consultation not found",
      });
    }

    res.status(200).json({
      success: true,
      consultation,
    });
  } catch (error) {
    console.error("Get Single Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Delete Consultation
exports.deleteConsultation = async (req, res) => {
  try {
    const consultation = await Consultation.findByIdAndDelete(
      req.params.id
    );

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: "Consultation not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Consultation deleted successfully",
    });
  } catch (error) {
    console.error("Delete Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};