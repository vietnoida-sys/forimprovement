import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, KeyRound, Power } from "lucide-react";
import api from "../api/axiosClient";
import Modal from "../components/Modal";
import StatusBadge from "../components/StatusBadge";

const ROLES = ["all", "student", "counsellor", "admin"];
const emptyForm = { name: "", email: "", password: "", role: "student", phone: "", country: "" };

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const [resetTarget, setResetTarget] = useState(null);
  const [newPassword, setNewPassword] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const params = roleFilter !== "all" ? { role: roleFilter } : {};
      const res = await api.get("/users", { params });
      setUsers(res.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [roleFilter]);

  const filtered = users.filter((u) =>
    [u.name, u.email].join(" ").toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (u) => { setEditing(u); setForm({ ...u, password: "" }); setModalOpen(true); };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await api.put(`/users/${editing._id}`, form);
      } else {
        await api.post("/users", form);
      }
      setModalOpen(false);
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (u) => {
    if (!confirm(`Delete ${u.name}? This cannot be undone.`)) return;
    await api.delete(`/users/${u._id}`);
    load();
  };

  const handleToggleStatus = async (u) => {
    await api.patch(`/users/${u._id}/status`);
    load();
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/users/${resetTarget._id}/reset-password`, { newPassword });
      setResetTarget(null);
      setNewPassword("");
      alert("Password reset successfully.");
    } catch (err) {
      alert(err.response?.data?.message || "Reset failed.");
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>User Management</h1>
          <p>Manage students, counsellors, and admin accounts.</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Add user</button>
      </div>

      <div className="card">
        <div className="toolbar">
          <input
            className="search-input"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
            {ROLES.map((r) => <option key={r} value={r}>{r === "all" ? "All roles" : r}</option>)}
          </select>
        </div>

        {error && <div style={{ padding: 16, color: "#b3413d" }}>{error}</div>}

        {!loading && !error && (
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th><th>Email</th><th>Role</th><th>Phone</th><th>Status</th><th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td style={{ textTransform: "capitalize" }}>{u.role}</td>
                  <td>{u.phone || "—"}</td>
                  <td><StatusBadge status={u.status} /></td>
                  <td>
                    <div style={{ display: "flex", gap: 4 }}>
                      <button className="icon-btn" title="Edit" onClick={() => openEdit(u)}><Pencil size={15} /></button>
                      <button className="icon-btn" title="Toggle status" onClick={() => handleToggleStatus(u)}><Power size={15} /></button>
                      <button className="icon-btn" title="Reset password" onClick={() => setResetTarget(u)}><KeyRound size={15} /></button>
                      <button className="icon-btn danger" title="Delete" onClick={() => handleDelete(u)}><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!loading && filtered.length === 0 && !error && <div className="empty-state">No users match your search.</div>}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit user" : "Add user"}>
        <form onSubmit={handleSave}>
          <div className="field"><label>Full name</label><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div className="field"><label>Email</label><input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
          {!editing && (
            <div className="field"><label>Password</label><input type="password" placeholder="Min 6 characters" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></div>
          )}
          <div className="field-row">
            <div className="field">
              <label>Role</label>
              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                <option value="student">Student</option>
                <option value="counsellor">Counsellor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="field"><label>Phone</label><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
          </div>
          {form.role === "student" && (
            <div className="field"><label>Interested country</label><input value={form.country || ""} onChange={(e) => setForm({ ...form, country: e.target.value })} /></div>
          )}
          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} disabled={saving}>
            {saving ? "Saving..." : editing ? "Save changes" : "Create user"}
          </button>
        </form>
      </Modal>

      <Modal open={!!resetTarget} onClose={() => setResetTarget(null)} title={`Reset password — ${resetTarget?.name}`} width={380}>
        <form onSubmit={handleResetPassword}>
          <div className="field"><label>New password</label><input type="password" required minLength={6} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} /></div>
          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>Reset password</button>
        </form>
      </Modal>
    </div>
  );
}
