import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import api from "../api/axiosClient";
import Modal from "../components/Modal";

const emptyForm = { name: "", university: "", amount: "", eligibility: "", deadline: "" };

export default function Scholarships() {
  const [items, setItems] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const [schRes, uniRes] = await Promise.all([api.get("/scholarships"), api.get("/universities")]);
      setItems(schRes.data);
      setUniversities(uniRes.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load scholarships.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (s) => {
    setEditing(s);
    setForm({ ...s, university: s.university?._id || s.university || "", deadline: s.deadline ? s.deadline.slice(0, 10) : "" });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, amount: Number(form.amount), university: form.university || undefined };
      if (editing) await api.put(`/scholarships/${editing._id}`, payload);
      else await api.post("/scholarships", payload);
      setModalOpen(false);
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (s) => {
    if (!confirm(`Delete scholarship "${s.name}"?`)) return;
    await api.delete(`/scholarships/${s._id}`);
    load();
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Scholarship Management</h1>
          <p>Publish scholarships and manage eligibility criteria.</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Add scholarship</button>
      </div>

      <div className="card">
        {error && <div style={{ padding: 16, color: "#b3413d" }}>{error}</div>}
        {!loading && !error && (
          <table className="data-table">
            <thead><tr><th>Scholarship</th><th>University</th><th>Amount</th><th>Deadline</th><th></th></tr></thead>
            <tbody>
              {items.map((s) => (
                <tr key={s._id}>
                  <td style={{ fontWeight: 600 }}>{s.name}</td>
                  <td>{s.university?.name || "Any university"}</td>
                  <td>{s.currency || "USD"} {s.amount?.toLocaleString()}</td>
                  <td>{s.deadline ? new Date(s.deadline).toLocaleDateString() : "—"}</td>
                  <td>
                    <div style={{ display: "flex", gap: 4 }}>
                      <button className="icon-btn" onClick={() => openEdit(s)}><Pencil size={15} /></button>
                      <button className="icon-btn danger" onClick={() => handleDelete(s)}><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!loading && items.length === 0 && !error && <div className="empty-state">No scholarships yet.</div>}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit scholarship" : "Add scholarship"}>
        <form onSubmit={handleSave}>
          <div className="field"><label>Name</label><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div className="field">
            <label>University (optional)</label>
            <select value={form.university} onChange={(e) => setForm({ ...form, university: e.target.value })}>
              <option value="">Any university</option>
              {universities.map((u) => <option key={u._id} value={u._id}>{u.name}</option>)}
            </select>
          </div>
          <div className="field-row">
            <div className="field"><label>Amount (USD)</label><input type="number" required value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} /></div>
            <div className="field"><label>Deadline</label><input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} /></div>
          </div>
          <div className="field"><label>Eligibility criteria</label><textarea rows={3} value={form.eligibility} onChange={(e) => setForm({ ...form, eligibility: e.target.value })} /></div>
          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} disabled={saving}>
            {saving ? "Saving..." : editing ? "Save changes" : "Add scholarship"}
          </button>
        </form>
      </Modal>
    </div>
  );
}
