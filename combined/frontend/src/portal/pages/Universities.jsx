import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, GraduationCap } from "lucide-react";
import api from "../api/axiosClient";
import Modal from "../components/Modal";

const emptyForm = { name: "", country: "", city: "", ranking: "", description: "" };

export default function Universities() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/universities");
      setItems(res.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load universities.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const countries = ["all", ...new Set(items.map((i) => i.country))];
  const filtered = items.filter(
    (i) =>
      (countryFilter === "all" || i.country === countryFilter) &&
      i.name.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (u) => { setEditing(u); setForm(u); setModalOpen(true); };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, ranking: form.ranking ? Number(form.ranking) : undefined };
      if (editing) await api.put(`/universities/${editing._id}`, payload);
      else await api.post("/universities", payload);
      setModalOpen(false);
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (u) => {
    if (!confirm(`Delete ${u.name}? Linked courses will be orphaned.`)) return;
    await api.delete(`/universities/${u._id}`);
    load();
  };

  return (
    <div className="universities-page">
      {/* Scoped responsive styles — only affects this page, nothing else changed */}
      <style>{`
        .universities-page .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .universities-page .toolbar {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .universities-page .toolbar .search-input {
          flex: 1;
          min-width: 200px;
        }
        .universities-page .table-responsive {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .universities-page .data-table {
          min-width: 600px;
        }
        @media (max-width: 768px) {
          .universities-page .page-header {
            flex-direction: column;
            align-items: stretch;
          }
          .universities-page .page-header .btn {
            width: 100%;
            justify-content: center;
          }
          .universities-page .toolbar {
            flex-direction: column;
          }
          .universities-page .toolbar select,
          .universities-page .toolbar .search-input {
            width: 100%;
          }
          .universities-page .field-row {
            flex-direction: column;
          }
        }
        @media (max-width: 480px) {
          .universities-page h1 {
            font-size: 1.25rem;
          }
          .universities-page p {
            font-size: 13px;
          }
          .universities-page .data-table {
            font-size: 12.5px;
          }
          .universities-page .icon-btn {
            padding: 4px;
          }
        }
      `}</style>

      <div className="page-header">
        <div>
          <h1>University Management</h1>
          <p>Maintain the universities students can apply to.</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Add university</button>
      </div>

      <div className="card">
        <div className="toolbar">
          <input className="search-input" placeholder="Search universities..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <select value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)}>
            {countries.map((c) => <option key={c} value={c}>{c === "all" ? "All countries" : c}</option>)}
          </select>
        </div>

        {error && <div style={{ padding: 16, color: "#b3413d" }}>{error}</div>}

        {!loading && !error && (
          <div className="table-responsive">
            <table className="data-table">
              <thead><tr><th>University</th><th>Country</th><th>City</th><th>Ranking</th><th></th></tr></thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u._id}>
                    <td style={{ fontWeight: 600 }}>{u.name}</td>
                    <td>{u.country}</td>
                    <td>{u.city || "—"}</td>
                    <td>{u.ranking ? `#${u.ranking}` : "—"}</td>
                    <td>
                      <div style={{ display: "flex", gap: 4 }}>
                        <button className="icon-btn" onClick={() => openEdit(u)}><Pencil size={15} /></button>
                        <button className="icon-btn danger" onClick={() => handleDelete(u)}><Trash2 size={15} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!loading && filtered.length === 0 && !error && (
          <div className="empty-state"><GraduationCap size={28} style={{ marginBottom: 8, opacity: 0.5 }} /><br />No universities yet.</div>
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit university" : "Add university"}>
        <form onSubmit={handleSave}>
          <div className="field"><label>Name</label><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div className="field-row">
            <div className="field"><label>Country</label><input required value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} /></div>
            <div className="field"><label>City</label><input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></div>
          </div>
          <div className="field"><label>Ranking (global, optional)</label><input type="number" value={form.ranking} onChange={(e) => setForm({ ...form, ranking: e.target.value })} /></div>
          <div className="field"><label>Description</label><textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} disabled={saving}>
            {saving ? "Saving..." : editing ? "Save changes" : "Add university"}
          </button>
        </form>
      </Modal>
    </div>
  );
}