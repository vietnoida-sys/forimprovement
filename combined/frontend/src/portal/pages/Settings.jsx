import { useState } from "react";
import { Settings as SettingsIcon } from "lucide-react";
import api from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";

const TABS = ["Profile", "Website", "SMTP Email", "Payment Gateway", "Notifications"];

export default function Settings() {
  const { user } = useAuth();
  const [tab, setTab] = useState("Profile");
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

          {tab !== "Profile" && (
            <div className="coming-soon">
              <SettingsIcon size={36} strokeWidth={1.5} />
              <h3>{tab} settings</h3>
              <p style={{ fontSize: 13.5, color: "var(--slate-500)" }}>
                Scaffolded — wire this tab to a Settings model in the backend (site name, SMTP host/port/credentials, gateway keys, notification toggles) the same way Universities/Courses are wired.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
