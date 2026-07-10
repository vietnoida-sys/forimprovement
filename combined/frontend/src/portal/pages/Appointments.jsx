import { useEffect, useState } from "react";
import { Plus, Trash2, Video } from "lucide-react";
import api from "../api/axiosClient";
import Modal from "../components/Modal";
import StatusBadge from "../components/StatusBadge";

const emptyForm = { student: "", counsellor: "", dateTime: "", meetingLink: "", notes: "" };

export default function Appointments() {
  const [items, setItems] = useState([]);
  const [students, setStudents] = useState([]);
  const [counsellors, setCounsellors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const [apptRes, studentsRes, counsellorsRes] = await Promise.all([
        api.get("/appointments"),
        api.get("/users", { params: { role: "student" } }),
        api.get("/users", { params: { role: "counsellor" } }),
      ]);
      setItems(apptRes.data);
      setStudents(studentsRes.data);
      setCounsellors(counsellorsRes.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => {
    if (students.length === 0 || counsellors.length === 0) {
      alert("Add at least one student and one counsellor first.");
      return;
    }
    setForm({ ...emptyForm, student: students[0]._id, counsellor: counsellors[0]._id });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post("/appointments", form);
      setModalOpen(false);
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleStatus = async (appt, status) => {
    await api.put(`/appointments/${appt._id}`, { status });
    load();
  };

  const handleDelete = async (appt) => {
    if (!confirm("Cancel and delete this appointment?")) return;
    await api.delete(`/appointments/${appt._id}`);
    load();
  };

  return (
    <div className="appointments-page">
      {/* Scoped responsive styles — only affects this page, nothing else changed */}
      <style>{`
        .appointments-page .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .appointments-page .table-responsive {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .appointments-page .data-table {
          min-width: 640px;
        }
        @media (max-width: 768px) {
          .appointments-page .page-header {
            flex-direction: column;
            align-items: stretch;
          }
          .appointments-page .page-header .btn {
            width: 100%;
            justify-content: center;
          }
        }
        @media (max-width: 480px) {
          .appointments-page h1 {
            font-size: 1.25rem;
          }
          .appointments-page p {
            font-size: 13px;
          }
          .appointments-page .data-table {
            font-size: 12.5px;
          }
          .appointments-page .icon-btn {
            padding: 4px;
          }
        }
      `}</style>

      <div className="page-header">
        <div>
          <h1>Appointment Management</h1>
          <p>Book and track student-counsellor meetings.</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Book meeting</button>
      </div>

      <div className="card">
        {error && <div style={{ padding: 16, color: "#b3413d" }}>{error}</div>}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="data-table">
              <thead><tr><th>Student</th><th>Counsellor</th><th>Date &amp; time</th><th>Meeting link</th><th>Status</th><th></th></tr></thead>
              <tbody>
                {items.map((a) => (
                  <tr key={a._id}>
                    <td>{a.student?.name || "—"}</td>
                    <td>{a.counsellor?.name || "—"}</td>
                    <td>{new Date(a.dateTime).toLocaleString()}</td>
                    <td>
                      {a.meetingLink ? (
                        <a href={a.meetingLink} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                          <Video size={14} /> Join
                        </a>
                      ) : "—"}
                    </td>
                    <td>
                      <select value={a.status} onChange={(e) => handleStatus(a, e.target.value)} style={{ border: "none", background: "transparent", fontSize: 13, fontWeight: 600 }}>
                        <option>Scheduled</option><option>Completed</option><option>Cancelled</option>
                      </select>
                    </td>
                    <td><button className="icon-btn danger" onClick={() => handleDelete(a)}><Trash2 size={15} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!loading && items.length === 0 && !error && <div className="empty-state">No appointments booked yet.</div>}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Book meeting">
        <form onSubmit={handleSave}>
          <div className="field">
            <label>Student</label>
            <select value={form.student} onChange={(e) => setForm({ ...form, student: e.target.value })}>
              {students.map((s) => <option key={s._id} value={s._id}>{s.name}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Counsellor</label>
            <select value={form.counsellor} onChange={(e) => setForm({ ...form, counsellor: e.target.value })}>
              {counsellors.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
          </div>
          <div className="field"><label>Date &amp; time</label><input type="datetime-local" required value={form.dateTime} onChange={(e) => setForm({ ...form, dateTime: e.target.value })} /></div>
          <div className="field"><label>Video meeting link (optional)</label><input placeholder="https://meet.google.com/..." value={form.meetingLink} onChange={(e) => setForm({ ...form, meetingLink: e.target.value })} /></div>
          <div className="field"><label>Notes</label><textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></div>
          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} disabled={saving}>
            {saving ? "Saving..." : "Book meeting"}
          </button>
        </form>
      </Modal>
    </div>
  );
}