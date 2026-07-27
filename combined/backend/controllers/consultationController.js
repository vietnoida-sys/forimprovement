const Consultation = require("../models/Consultation");

// Create Consultation
exports.createConsultation = async (req, res) => {
  try {
    const {
      fullName,
      email,
      whatsappNumber,
      targetCountry,
      consultationType,
    } = req.body;

    // Validation
    const errors = {};
    if (!fullName?.trim()) errors.fullName = "Full name is required";
    if (!email?.trim()) errors.email = "Email is required";
    if (!targetCountry) errors.targetCountry = "Target country is required";
    if (!consultationType) errors.consultationType = "Consultation type is required";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    // Save to DB
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
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// Get all consultations
exports.getAllConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: consultations.length, consultations });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get single consultation
exports.getSingleConsultation = async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id);
    if (!consultation) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, consultation });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete consultation
exports.deleteConsultation = async (req, res) => {
  try {
    const consultation = await Consultation.findByIdAndDelete(req.params.id);
    if (!consultation) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Accept Consultation - just updates status, no email
exports.acceptConsultation = async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id);

    if (!consultation) {
      return res.status(404).json({ success: false, message: "Consultation not found" });
    }

    consultation.status = "accepted";
    await consultation.save();

    res.status(200).json({
      success: true,
      message: "Consultation accepted successfully",
      consultation,
    });
  } catch (error) {
    console.error("Accept Consultation Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// Reject Consultation - just updates status, no email
exports.rejectConsultation = async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id);

    if (!consultation) {
      return res.status(404).json({ success: false, message: "Consultation not found" });
    }

    consultation.status = "rejected";
    await consultation.save();

    res.status(200).json({
      success: true,
      message: "Consultation rejected successfully",
      consultation,
    });
  } catch (error) {
    console.error("Reject Consultation Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// Bulk delete - deletes multiple consultations by array of IDs
exports.bulkDeleteConsultations = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: "No IDs provided" });
    }

    const result = await Consultation.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} consultation(s) deleted successfully`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Bulk Delete Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};