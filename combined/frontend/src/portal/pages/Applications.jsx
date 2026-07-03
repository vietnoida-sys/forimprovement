import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import api from "../api/axiosClient";
import Modal from "../components/Modal";
import StatusBadge from "../components/StatusBadge";

const STATUSES = ["Submitted", "Document Verification", "Under Review", "Approved", "Rejected"];
const emptyForm = { student: "", university: "", course: "", intake: "", notes: "" };

export default function Applications() {
  const [apps, setApps] = useState([]);
  const [students, setStudents] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [courses, setCourses] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const params = statusFilter !== "all" ? { status: statusFilter } : {};
      const [appsRes, studentsRes, unisRes, coursesRes] = await Promise.all([
        api.get("/applications", { params }),
        api.get("/users", { params: { role: "student" } }),
        api.get("/universities"),
        api.get("/courses"),
      ]);
      setApps(appsRes.data);
      setStudents(studentsRes.data);
      setUniversities(unisRes.data);
      setCourses(coursesRes.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [statusFilter]);

  const coursesForUniversity = courses.filter((c) => (c.university?._id || c.university) === form.university);

  const openAdd = () => {
    if (students.length === 0 || universities.length === 0) {
      alert("Add at least one student and one university first.");
      return;
    }
    setForm({ ...emptyForm, student: students[0]._id, university: universities[0]._id });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post("/applications", form);
      setModalOpen(false);
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (app, status) => {
    await api.patch(`/applications/${app._id}/status`, { status });
    load();
  };

  const handleDelete = async (app) => {
    if (!confirm("Delete this application?")) return;
    await api.delete(`/applications/${app._id}`);
    load();
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Application Management</h1>
          <p>Track student applications from submission to approval or rejection.</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> New application</button>
      </div>

      <div className="card">
        <div className="toolbar">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All statuses</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {error && <div style={{ padding: 16, color: "#b3413d" }}>{error}</div>}

        {!loading && !error && (
          <table className="data-table">
            <thead><tr><th>Student</th><th>University</th><th>Course</th><th>Intake</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {apps.map((a) => (
                <tr key={a._id}>
                  <td>{a.student?.name || "—"}</td>
                  <td>{a.university?.name || "—"}</td>
                  <td>{a.course?.name || "—"}</td>
                  <td>{a.intake || "—"}</td>
                  <td>
                    <select value={a.status} onChange={(e) => handleStatusChange(a, e.target.value)} style={{ border: "none", background: "transparent", fontSize: 13, fontWeight: 600 }}>
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td><button className="icon-btn danger" onClick={() => handleDelete(a)}><Trash2 size={15} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!loading && apps.length === 0 && !error && <div className="empty-state">No applications yet.</div>}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="New application">
        <form onSubmit={handleSave}>
          <div className="field">
            <label>Student</label>
            <select required value={form.student} onChange={(e) => setForm({ ...form, student: e.target.value })}>
              {students.map((s) => <option key={s._id} value={s._id}>{s.name} ({s.email})</option>)}
            </select>
          </div>
          <div className="field">
            <label>University</label>
            <select required value={form.university} onChange={(e) => setForm({ ...form, university: e.target.value, course: "" })}>
              {universities.map((u) => <option key={u._id} value={u._id}>{u.name}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Course</label>
            <select required value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })}>
              <option value="">Select a course</option>
              {coursesForUniversity.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
          </div>
          <div className="field"><label>Intake</label><input placeholder="Fall 2026" value={form.intake} onChange={(e) => setForm({ ...form, intake: e.target.value })} /></div>
          <div className="field"><label>Notes</label><textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></div>
          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} disabled={saving}>
            {saving ? "Saving..." : "Submit application"}
          </button>
        </form>
      </Modal>
    </div>
  );
}
