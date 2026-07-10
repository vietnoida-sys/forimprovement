import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import api from "../api/axiosClient";
import Modal from "../components/Modal";
import StatusBadge from "../components/StatusBadge";

const STATUSES = ["Not Started", "Documents Pending", "Interview Scheduled", "Approved", "Rejected"];
const emptyForm = { student: "", application: "", status: "Not Started", interviewDate: "", notes: "" };

export default function Visas() {
  const [visas, setVisas] = useState([]);
  const [students, setStudents] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const [visasRes, studentsRes, appsRes] = await Promise.all([
        api.get("/visas"),
        api.get("/users", { params: { role: "student" } }),
        api.get("/applications", { params: { status: "Approved" } }),
      ]);
      setVisas(visasRes.data);
      setStudents(studentsRes.data);
      setApplications(appsRes.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load visa records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => {
    if (applications.length === 0) { alert("A visa record needs an approved application first."); return; }
    setForm({ ...emptyForm, application: applications[0]._id, student: applications[0].student?._id });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post("/visas", form);
      setModalOpen(false);
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (visa, status) => {
    const payload = { status };
    if (status === "Approved") payload.approvalDate = new Date().toISOString();
    await api.put(`/visas/${visa._id}`, payload);
    load();
  };

  const handleDelete = async (v) => {
    if (!confirm("Delete this visa record?")) return;
    await api.delete(`/visas/${v._id}`);
    load();
  };

  return (
    <div className="visas-page">
      {/* Scoped responsive styles — only affects this page, nothing else changed */}
      <style>{`
        .visas-page .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .visas-page .table-responsive {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
          
        .visas-page .data-table {
          min-width: 560px;
        }
        @media (max-width: 768px) {
          .visas-page .page-header {
            flex-direction: column;
            align-items: stretch;
          }
          .visas-page .page-header .btn {
            width: 100%;
            justify-content: center;
          }
        }
        @media (max-width: 480px) {
          .visas-page h1 {
            font-size: 1.25rem;
          }
          .visas-page p {
            font-size: 13px;
          }
          .visas-page .data-table {
            font-size: 12.5px;
          }
          .visas-page .icon-btn {
            padding: 4px;
          }
        }
      `}</style>

      <div className="page-header">
        <div>
          <h1>Visa Management</h1>
          <p>Track visa applications, interviews, and approvals.</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Add visa record</button>
      </div>

      <div className="card">
        {error && <div style={{ padding: 16, color: "#f5edec" }}>{error}</div>}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="data-table">
              <thead><tr><th>Student</th><th>Status</th><th>Interview date</th><th>Approval date</th><th></th></tr></thead>
              <tbody>
                {visas.map((v) => (
                  <tr key={v._id}>
                    <td>{v.student?.name || "—"}</td>
                    <td>
                      <select value={v.status} onChange={(e) => handleStatusChange(v, e.target.value)} style={{ border: "none", background: "transparent", fontSize: 13, fontWeight: 600 }}>
                        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td>{v.interviewDate ? new Date(v.interviewDate).toLocaleDateString() : "—"}</td>
                    <td>{v.approvalDate ? new Date(v.approvalDate).toLocaleDateString() : "—"}</td>
                    <td><button className="icon-btn danger" onClick={() => handleDelete(v)}><Trash2 size={15} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!loading && visas.length === 0 && !error && <div className="empty-state">No visa records yet.</div>}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add visa record">
        <form onSubmit={handleSave}>
          <div className="field">
            <label>Approved application</label>
            <select
              value={form.application}
              onChange={(e) => {
                const app = applications.find((a) => a._id === e.target.value);
                setForm({ ...form, application: e.target.value, student: app?.student?._id });
              }}
            >
              {applications.map((a) => <option key={a._id} value={a._id}>{a.student?.name} — {a.university?.name}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Status</label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="field"><label>Interview date</label><input type="date" value={form.interviewDate} onChange={(e) => setForm({ ...form, interviewDate: e.target.value })} /></div>
          <div className="field"><label>Notes</label><textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></div>
          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} disabled={saving}>
            {saving ? "Saving..." : "Create record"}
          </button>
        </form>
      </Modal>
    </div>
  );
}