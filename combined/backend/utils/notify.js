const Notification = require("../models/Notification");
const User = require("../models/User");

// Create the same notification for a list of specific user ids.
async function notifyUsers(userIds, payload) {
  const ids = (userIds || []).filter(Boolean);
  if (ids.length === 0) return;
  const docs = ids.map((id) => ({
    recipient: id,
    type: payload.type,
    title: payload.title,
    message: payload.message,
    link: payload.link,
    relatedId: payload.relatedId,
  }));
  try {
    await Notification.insertMany(docs);
  } catch (err) {
    // Notifications must never break the main request flow.
    console.error("notifyUsers failed:", err.message);
  }
}

// Broadcast the same notification to every active user with a given role
// (or an array of roles), e.g. notifyRole("student", {...}) or
// notifyRole(["admin", "counsellor"], {...}).
async function notifyRole(role, payload) {
  const roles = Array.isArray(role) ? role : [role];
  try {
    const users = await User.find({ role: { $in: roles }, status: "active" }).select("_id");
    await notifyUsers(users.map((u) => u._id), payload);
  } catch (err) {
    console.error("notifyRole failed:", err.message);
  }
}

module.exports = { notifyUsers, notifyRole };
