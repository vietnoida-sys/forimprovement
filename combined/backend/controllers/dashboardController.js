const User = require("../models/User");
const University = require("../models/University");
const Application = require("../models/Application");
const Document = require("../models/Document");
const Appointment = require("../models/Appointment");
const Visa = require("../models/Visa");
const Lead = require("../models/Lead");

// GET /api/dashboard/stats
exports.getStats = async (req, res) => {
  try {
    if (req.user.role === "student") {
      const [myDocuments, pendingDocuments, myApplications, myAppointments] = await Promise.all([
        Document.countDocuments({ student: req.user.id }),
        Document.countDocuments({ student: req.user.id, status: "Pending" }),
        Application.countDocuments({ student: req.user.id }),
        Appointment.countDocuments({ student: req.user.id, status: "Scheduled", dateTime: { $gte: new Date() } }),
      ]);
      return res.json({ myDocuments, pendingDocuments, myApplications, myAppointments });
    }

    const [
      totalStudents,
      totalCounsellors,
      totalUniversities,
      totalApplications,
      pendingDocuments,
      upcomingAppointments,
      visaApprovedCount,
      totalLeads,
      enrolledLeads,
    ] = await Promise.all([
      User.countDocuments({ role: "student" }),
      User.countDocuments({ role: "counsellor" }),
      University.countDocuments(),
      Application.countDocuments(),
      Document.countDocuments({ status: "Pending" }),
      Appointment.countDocuments({ status: "Scheduled", dateTime: { $gte: new Date() } }),
      Visa.countDocuments({ status: "Approved" }),
      Lead.countDocuments(),
      Lead.countDocuments({ status: "Enrolled" }),
    ]);

    // Revenue placeholder: sums application fee tracking once payments module has real data.
    // Here we approximate using tuition fee sums of approved applications as a demo figure.
    const approvedApps = await Application.find({ status: "Approved" }).populate("course", "tuitionFee");
    const revenueGenerated = approvedApps.reduce(
      (sum, a) => sum + (a.course?.tuitionFee ? a.course.tuitionFee * 0.1 : 0), // 10% commission demo
      0
    );

    const leadConversionRate = totalLeads > 0 ? ((enrolledLeads / totalLeads) * 100).toFixed(1) : "0.0";

    res.json({
      totalStudents,
      totalCounsellors,
      totalUniversities,
      totalApplications,
      pendingDocuments,
      upcomingAppointments,
      visaApprovedCount,
      revenueGenerated: Math.round(revenueGenerated),
      totalLeads,
      leadConversionRate,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/dashboard/lead-status-breakdown
exports.leadStatusBreakdown = async (req, res) => {
  try {
    const breakdown = await Lead.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
    res.json(breakdown);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
