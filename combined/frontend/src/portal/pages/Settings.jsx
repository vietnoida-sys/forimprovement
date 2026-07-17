import { useState, useEffect } from "react";
import api from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";

const TABS = ["Profile", "Website", "SMTP Email", "Payment Gateway", "Notifications"];

export default function Settings() {
  const { user } = useAuth();
  const [tab, setTab] = useState("Profile");

  // ---- Profile (unchanged) ----
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleResetOwnPassword = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      await api.patch(`/auth/change-password`, { currentPassword, newPassword });
      setMessage("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to update password.");
    } finally {
      setSaving(false);
    }
  };

  // ---- Settings (Website / SMTP / Payment Gateway / Notifications) ----
  const [settings, setSettings] = useState(null);
  const [loadingSettings, setLoadingSettings] = useState(false);
  const [settingsSaving, setSettingsSaving] = useState(false);
  const [settingsMessage, setSettingsMessage] = useState("");

  const settingsTabs = TABS.filter((t) => t !== "Profile");

  useEffect(() => {
    if (settingsTabs.includes(tab) && !settings && !loadingSettings) {
      loadSettings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const loadSettings = async () => {
    setLoadingSettings(true);
    setSettingsMessage("");
    try {
      // /secrets so SMTP password / gateway keys are editable, not blank
      const { data } = await api.get("/settings/secrets");
      setSettings(data);
    } catch (err) {
      setSettingsMessage(err.response?.data?.message || "Failed to load settings.");
    } finally {
      setLoadingSettings(false);
    }
  };

  const updateField = (section, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
  };

  const saveSection = async (section) => {
    setSettingsSaving(true);
    setSettingsMessage("");
    try {
      const payload =
        section === "siteName"
          ? { siteName: settings.siteName }
          : { [section]: settings[section] };
      const { data } = await api.put("/settings", payload);
      setSettings((prev) => ({ ...prev, ...data }));
      setSettingsMessage("Settings saved successfully.");
    } catch (err) {
      setSettingsMessage(err.response?.data?.message || "Failed to save settings.");
    } finally {
      setSettingsSaving(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Settings</h1>
          <p>Manage your profile and platform configuration.</p>
        </div>
      </div>

      <div className="card">
        <div className="toolbar" style={{ gap: 4 }}>
          {TABS.map((t) => (
            <button
              key={t}
              className={`btn btn-sm ${tab === t ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <div style={{ padding: 22 }}>
          {tab === "Profile" && (
            <div style={{ maxWidth: 380 }}>
              <div className="field"><label>Name</label><input value={user?.name || ""} disabled /></div>
              <div className="field"><label>Email</label><input value={user?.email || ""} disabled /></div>
              <form onSubmit={handleResetOwnPassword}>
                <div className="field"><label>Current password</label><input type="password" required value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} /></div>
                <div className="field"><label>New password</label><input type="password" required minLength={6} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} /></div>
                {message && <p style={{ fontSize: 13, color: message.includes("success") ? "#157a6a" : "#b3413d", marginBottom: 10 }}>{message}</p>}
                <button className="btn btn-primary" disabled={saving}>{saving ? "Saving..." : "Update password"}</button>
              </form>
            </div>
          )}

          {settingsTabs.includes(tab) && (
            <div style={{ maxWidth: 480 }}>
              {loadingSettings && <p style={{ fontSize: 13.5, color: "var(--slate-500)" }}>Loading...</p>}

              {!loadingSettings && settingsMessage && (
                <p style={{ fontSize: 13, color: settingsMessage.includes("success") ? "#157a6a" : "#b3413d", marginBottom: 14 }}>
                  {settingsMessage}
                </p>
              )}

              {!loadingSettings && !settings && (
                <button className="btn btn-secondary" onClick={loadSettings}>Retry</button>
              )}

              {!loadingSettings && settings && (
                <>
                  {tab === "Website" && (
                    <>
                      <div className="field">
                        <label>Site name</label>
                        <input value={settings.siteName || ""} onChange={(e) => setSettings((p) => ({ ...p, siteName: e.target.value }))} />
                      </div>
                      <div className="field">
                        <label>Logo URL</label>
                        <input value={settings.website?.logoUrl || ""} onChange={(e) => updateField("website", "logoUrl", e.target.value)} />
                      </div>
                      <div className="field">
                        <label>Support email</label>
                        <input value={settings.website?.supportEmail || ""} onChange={(e) => updateField("website", "supportEmail", e.target.value)} />
                      </div>
                      <div className="field">
                        <label>Contact phone</label>
                        <input value={settings.website?.contactPhone || ""} onChange={(e) => updateField("website", "contactPhone", e.target.value)} />
                      </div>
                      <div className="field">
                        <label>Address</label>
                        <input value={settings.website?.address || ""} onChange={(e) => updateField("website", "address", e.target.value)} />
                      </div>
                      <button
                        className="btn btn-primary"
                        disabled={settingsSaving}
                        onClick={async () => {
                          await saveSection("siteName");
                          await saveSection("website");
                        }}
                      >
                        {settingsSaving ? "Saving..." : "Save website settings"}
                      </button>
                    </>
                  )}

                  {tab === "SMTP Email" && (
                    <>
                      <div className="field">
                        <label>SMTP host</label>
                        <input value={settings.smtp?.host || ""} onChange={(e) => updateField("smtp", "host", e.target.value)} placeholder="smtp.gmail.com" />
                      </div>
                      <div className="field">
                        <label>SMTP port</label>
                        <input type="number" value={settings.smtp?.port ?? 587} onChange={(e) => updateField("smtp", "port", Number(e.target.value))} />
                      </div>
                      <div className="field" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <input type="checkbox" checked={!!settings.smtp?.secure} onChange={(e) => updateField("smtp", "secure", e.target.checked)} />
                        <label style={{ margin: 0 }}>Use SSL (port 465)</label>
                      </div>
                      <div className="field">
                        <label>Username</label>
                        <input value={settings.smtp?.username || ""} onChange={(e) => updateField("smtp", "username", e.target.value)} />
                      </div>
                      <div className="field">
                        <label>Password</label>
                        <input type="password" value={settings.smtp?.password || ""} onChange={(e) => updateField("smtp", "password", e.target.value)} />
                      </div>
                      <div className="field">
                        <label>From name</label>
                        <input value={settings.smtp?.fromName || ""} onChange={(e) => updateField("smtp", "fromName", e.target.value)} />
                      </div>
                      <div className="field">
                        <label>From email</label>
                        <input value={settings.smtp?.fromEmail || ""} onChange={(e) => updateField("smtp", "fromEmail", e.target.value)} />
                      </div>
                      <button className="btn btn-primary" disabled={settingsSaving} onClick={() => saveSection("smtp")}>
                        {settingsSaving ? "Saving..." : "Save SMTP settings"}
                      </button>
                    </>
                  )}

                  {tab === "Payment Gateway" && (
                    <>
                      <div className="field">
                        <label>Provider</label>
                        <select value={settings.paymentGateway?.provider || "none"} onChange={(e) => updateField("paymentGateway", "provider", e.target.value)}>
                          <option value="none">None</option>
                          <option value="stripe">Stripe</option>
                          <option value="razorpay">Razorpay</option>
                          <option value="paypal">PayPal</option>
                        </select>
                      </div>
                      <div className="field">
                        <label>Public key</label>
                        <input value={settings.paymentGateway?.publicKey || ""} onChange={(e) => updateField("paymentGateway", "publicKey", e.target.value)} />
                      </div>
                      <div className="field">
                        <label>Secret key</label>
                        <input type="password" value={settings.paymentGateway?.secretKey || ""} onChange={(e) => updateField("paymentGateway", "secretKey", e.target.value)} />
                      </div>
                      <div className="field">
                        <label>Webhook secret</label>
                        <input type="password" value={settings.paymentGateway?.webhookSecret || ""} onChange={(e) => updateField("paymentGateway", "webhookSecret", e.target.value)} />
                      </div>
                      <div className="field">
                        <label>Currency</label>
                        <input value={settings.paymentGateway?.currency || ""} onChange={(e) => updateField("paymentGateway", "currency", e.target.value)} />
                      </div>
                      <button className="btn btn-primary" disabled={settingsSaving} onClick={() => saveSection("paymentGateway")}>
                        {settingsSaving ? "Saving..." : "Save payment gateway settings"}
                      </button>
                    </>
                  )}

                  {tab === "Notifications" && (
                    <>
                      {[
                        ["emailOnNewApplication", "Email on new application"],
                        ["emailOnStatusChange", "Email on status change"],
                        ["emailOnNewUniversity", "Email on new university added"],
                        ["smsEnabled", "SMS notifications"],
                        ["inAppEnabled", "In-app notifications"],
                      ].map(([key, label]) => (
                        <div className="field" key={key} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <input
                            type="checkbox"
                            checked={!!settings.notifications?.[key]}
                            onChange={(e) => updateField("notifications", key, e.target.checked)}
                          />
                          <label style={{ margin: 0 }}>{label}</label>
                        </div>
                      ))}
                      <button className="btn btn-primary" disabled={settingsSaving} onClick={() => saveSection("notifications")}>
                        {settingsSaving ? "Saving..." : "Save notification settings"}
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}