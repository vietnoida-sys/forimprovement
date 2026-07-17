const Settings = require("../models/Settings");

// Fields that are select:false in the schema (secrets) — only pulled in
// explicitly when an admin needs to see them, never returned by default.
const SECRET_FIELDS = "+smtp.password +paymentGateway.secretKey +paymentGateway.webhookSecret";

// Internal helper: fetch the single settings doc, creating it with
// defaults the first time it's ever requested.
const getOrCreateSettings = async (withSecrets = false) => {
  let query = Settings.findOne({ singleton: "main" });
  if (withSecrets) query = query.select(SECRET_FIELDS);
  let settings = await query;

  if (!settings) {
    settings = await Settings.create({ singleton: "main" });
    if (withSecrets) {
      settings = await Settings.findOne({ singleton: "main" }).select(SECRET_FIELDS);
    }
  }

  return settings;
};

// GET /api/settings  (admin only)
// Returns settings without secret fields (smtp.password, gateway secretKey/webhookSecret)
exports.get = async (req, res) => {
  try {
    const settings = await getOrCreateSettings(false);
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/settings/secrets  (admin only)
// Same as above but includes secret fields — use only where the raw
// values are genuinely needed (e.g. populating an edit form).
exports.getWithSecrets = async (req, res) => {
  try {
    const settings = await getOrCreateSettings(true);
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/settings  (admin only)
// Upserts the single settings document. Supports partial updates for
// nested objects (e.g. sending only { smtp: { host: "..." } }).
exports.update = async (req, res) => {
  try {
    const nestedFields = ["website", "smtp", "paymentGateway", "notifications"];
    const updates = {};

    if (req.body.siteName !== undefined) {
      updates.siteName = req.body.siteName;
    }

    for (const key of nestedFields) {
      if (req.body[key] !== undefined) {
        // Merge nested objects field-by-field so a partial payload
        // (e.g. just smtp.host) doesn't wipe out sibling fields.
        for (const [subKey, value] of Object.entries(req.body[key])) {
          updates[`${key}.${subKey}`] = value;
        }
      }
    }

    const settings = await Settings.findOneAndUpdate(
      { singleton: "main" },
      { $set: updates },
      { new: true, upsert: true, runValidators: true }
    );

    res.json(settings);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};