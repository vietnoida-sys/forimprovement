import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, UserPlus } from "lucide-react";
import api from "../api/axiosClient";
import Modal from "../components/Modal";
import StatusBadge from "../components/StatusBadge";

const STATUSES = ["New", "Contacted", "Interested", "Applied", "Visa Approved", "Enrolled"];
const emptyForm = { name: "", email: "", phone: "", source: "Website", interestedCountry: "", followUpDate: "", notes: "" };

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [counsellors, setCounsellors] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [assignTarget, setAssignTarget] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const params = statusFilter !== "all" ? { status: statusFilter } : {};
      const [leadsRes, counsellorsRes] = await Promise.all([
        api.get("/leads", { params }),
        api.get("/users", { params: { role: "counsellor" } }),
      ]);
      setLeads(leadsRes.data);
      setCounsellors(counsellorsRes.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load leads.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [statusFilter]);

  const filtered = leads.filter((l) =>
    [l.name, l.email, l.phone].join(" ").toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (l) => {
    setEditing(l);
    setForm({ ...l, followUpDate: l.followUpDate ? l.followUpDate.slice(0, 10) : "" });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) await api.put(`/leads/${editing._id}`, form);
      else await api.post("/leads", form);
      setModalOpen(false);
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (l) => {
    if (!confirm(`Delete lead "${l.name}"?`)) return;
    await api.delete(`/leads/${l._id}`);
    load();
  };

  const handleStatusChange = async (lead, status) => {
    await api.patch(`/leads/${lead._id}/status`, { status });
    load();
  };

  const handleAssign = async (counsellorId) => {
    await api.patch(`/leads/${assignTarget._id}/assign`, { counsellorId });
    setAssignTarget(null);
    load();
  };

  return (
    <div className="leads-page">
      {/* Scoped responsive styles — only affects this page, nothing else changed */}
      <style>{`
        .leads-page .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .leads-page .toolbar {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .leads-page .toolbar .search-input {
          flex: 1;
          min-width: 180px;
        }
        .leads-page .table-responsive {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .leads-page .data-table {
          min-width: 720px;
        }
        @media (max-width: 768px) {
          .leads-page .page-header {
            flex-direction: column;
            align-items: stretch;
          }
          .leads-page .page-header .btn {
            width: 100%;
            justify-content: center;
          }
          .leads-page .toolbar {
            flex-direction: column;
          }
          .leads-page .toolbar select,
          .leads-page .toolbar .search-input {
            width: 100%;
          }
          .leads-page .field-row {
            flex-direction: column;
          }
        }
        @media (max-width: 480px) {
          .leads-page h1 {
            font-size: 1.25rem;
          }
          .leads-page .data-table {
            font-size: 12.5px;
          }
          .leads-page .icon-btn {
            padding: 4px;
          }
        }
      `}</style>

      <div className="page-header">
        <div>
          <h1>Lead Management</h1>
          <p>Track new leads through the pipeline, all the way to enrollment.</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Add lead</button>
      </div>

      <div className="card">
        <div className="toolbar">
          <input className="search-input" placeholder="Search leads..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All statuses</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {error && <div style={{ padding: 16, color: "#b3413d" }}>{error}</div>}

        {!loading && !error && (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th><th>Contact</th><th>Country</th><th>Status</th><th>Assigned to</th><th>Follow-up</th><th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((l) => (
                  <tr key={l._id}>
                    <td>{l.name}</td>
                    <td>{l.email || l.phone || "—"}</td>
                    <td>{l.interestedCountry || "—"}</td>
                    <td>
                      <select
                        value={l.status}
                        onChange={(e) => handleStatusChange(l, e.target.value)}
                        style={{ border: "none", background: "transparent", fontSize: 13, fontWeight: 600 }}
                      >
                        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td>{l.assignedTo?.name || <span style={{ color: "var(--slate-500)" }}>Unassigned</span>}</td>
                    <td>
                      {l.followUpDate
                        ? new Date(l.followUpDate).toLocaleDateString()
                        : "—"}
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: 4 }}>
                        <button className="icon-btn" title="Assign counsellor" onClick={() => setAssignTarget(l)}><UserPlus size={15} /></button>
                        <button className="icon-btn" title="Edit" onClick={() => openEdit(l)}><Pencil size={15} /></button>
                        <button className="icon-btn danger" title="Delete" onClick={() => handleDelete(l)}><Trash2 size={15} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!loading && filtered.length === 0 && !error && <div className="empty-state">No leads found.</div>}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit lead" : "Add lead"}>
        <form onSubmit={handleSave}>
          <div className="field"><label>Full name</label><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div className="field-row">
            <div className="field"><label>Email</label><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            <div className="field"><label>Phone</label><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
          </div>
          <div className="field-row">
            <div className="field"><label>Source</label><input value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} /></div>
            <div className="field"><label>Interested country</label><input value={form.interestedCountry} onChange={(e) => setForm({ ...form, interestedCountry: e.target.value })} /></div>
          </div>
          <div className="field"><label>Follow-up date</label><input type="date" value={form.followUpDate} onChange={(e) => setForm({ ...form, followUpDate: e.target.value })} /></div>
          <div className="field"><label>Notes</label><textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></div>
          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} disabled={saving}>
            {saving ? "Saving..." : editing ? "Save changes" : "Create lead"}
          </button>
        </form>
      </Modal>

      <Modal open={!!assignTarget} onClose={() => setAssignTarget(null)} title={`Assign — ${assignTarget?.name}`} width={360}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {counsellors.length === 0 && <p style={{ color: "var(--slate-500)", fontSize: 13.5 }}>No counsellors yet. Add one under User Management.</p>}
          {counsellors.map((c) => (
            <button key={c._id} className="btn btn-secondary" style={{ justifyContent: "flex-start" }} onClick={() => handleAssign(c._id)}>
              {c.name} <span style={{ color: "var(--slate-500)", fontWeight: 400 }}>· {c.email}</span>
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
}