import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import api from "../api/axiosClient";
import Modal from "../components/Modal";

const emptyForm = { name: "", university: "", degreeLevel: "Master", tuitionFee: "", durationMonths: "", intakes: "" };

export default function Courses() {
  const [items, setItems] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const [coursesRes, unisRes] = await Promise.all([api.get("/courses"), api.get("/universities")]);
      setItems(coursesRes.data);
      setUniversities(unisRes.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load courses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = items.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => {
    if (universities.length === 0) { alert("Add a university first."); return; }
    setEditing(null);
    setForm({ ...emptyForm, university: universities[0]._id });
    setModalOpen(true);
  };
  const openEdit = (c) => {
    setEditing(c);
    setForm({ ...c, university: c.university?._id || c.university, intakes: (c.intakes || []).join(", ") });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        tuitionFee: Number(form.tuitionFee),
        durationMonths: Number(form.durationMonths),
        intakes: form.intakes.split(",").map((s) => s.trim()).filter(Boolean),
      };
      if (editing) await api.put(`/courses/${editing._id}`, payload);
      else await api.post("/courses", payload);
      setModalOpen(false);
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (c) => {
    if (!confirm(`Delete course "${c.name}"?`)) return;
    await api.delete(`/courses/${c._id}`);
    load();
  };

  return (
    <div className="courses-page">
      {/* Scoped responsive styles — only affects this page, nothing else changed */}
      <style>{`
        .courses-page .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .courses-page .toolbar {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .courses-page .toolbar .search-input {
          flex: 1;
          min-width: 200px;
        }
        .courses-page .table-responsive {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .courses-page .data-table {
          min-width: 760px;
        }
        @media (max-width: 768px) {
          .courses-page .page-header {
            flex-direction: column;
            align-items: stretch;
          }
          .courses-page .page-header .btn {
            width: 100%;
            justify-content: center;
          }
          .courses-page .toolbar {
            flex-direction: column;
          }
          .courses-page .toolbar select,
          .courses-page .toolbar .search-input {
            width: 100%;
          }
          .courses-page .field-row {
            flex-direction: column;
          }
        }
        @media (max-width: 480px) {
          .courses-page h1 {
            font-size: 1.25rem;
          }
          .courses-page p {
            font-size: 13px;
          }
          .courses-page .data-table {
            font-size: 12.5px;
          }
          .courses-page .icon-btn {
            padding: 4px;
          }
        }
      `}</style>

      <div className="page-header">
        <div>
          <h1>Course Management</h1>
          <p>Tuition fees, duration, and intakes for every course offered.</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Add course</button>
      </div>

      <div className="card">
        <div className="toolbar">
          <input className="search-input" placeholder="Search courses..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {error && <div style={{ padding: 16, color: "#b3413d" }}>{error}</div>}

        {!loading && !error && (
          <div className="table-responsive">
            <table className="data-table">
              <thead><tr><th>Course</th><th>University</th><th>Level</th><th>Tuition</th><th>Duration</th><th>Intakes</th><th></th></tr></thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c._id}>
                    <td style={{ fontWeight: 600 }}>{c.name}</td>
                    <td>{c.university?.name || "—"}</td>
                    <td>{c.degreeLevel}</td>
                    <td>{c.currency || "USD"} {c.tuitionFee?.toLocaleString()}</td>
                    <td>{c.durationMonths} mo</td>
                    <td>{(c.intakes || []).join(", ") || "—"}</td>
                    <td>
                      <div style={{ display: "flex", gap: 4 }}>
                        <button className="icon-btn" onClick={() => openEdit(c)}><Pencil size={15} /></button>
                        <button className="icon-btn danger" onClick={() => handleDelete(c)}><Trash2 size={15} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!loading && filtered.length === 0 && !error && <div className="empty-state">No courses yet.</div>}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit course" : "Add course"}>
        <form onSubmit={handleSave}>
          <div className="field"><label>Course name</label><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div className="field">
            <label>University</label>
            <select required value={form.university} onChange={(e) => setForm({ ...form, university: e.target.value })}>
              {universities.map((u) => <option key={u._id} value={u._id}>{u.name}</option>)}
            </select>
          </div>
          <div className="field-row">
            <div className="field">
              <label>Degree level</label>
              <select value={form.degreeLevel} onChange={(e) => setForm({ ...form, degreeLevel: e.target.value })}>
                <option>Diploma</option><option>Bachelor</option><option>Master</option><option>PhD</option>
              </select>
            </div>
            <div className="field"><label>Duration (months)</label><input type="number" required value={form.durationMonths} onChange={(e) => setForm({ ...form, durationMonths: e.target.value })} /></div>
          </div>
          <div className="field"><label>Tuition fee (USD)</label><input type="number" required value={form.tuitionFee} onChange={(e) => setForm({ ...form, tuitionFee: e.target.value })} /></div>
          <div className="field"><label>Intakes (comma-separated)</label><input placeholder="Fall 2026, Spring 2027" value={form.intakes} onChange={(e) => setForm({ ...form, intakes: e.target.value })} /></div>
          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} disabled={saving}>
            {saving ? "Saving..." : editing ? "Save changes" : "Add course"}
          </button>
        </form>
      </Modal>
    </div>
  );
}