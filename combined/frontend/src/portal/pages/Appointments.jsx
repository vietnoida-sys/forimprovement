import { useEffect, useState } from "react";
import { Plus, Trash2, Video, Check, X } from "lucide-react";
import api from "../api/axiosClient";
import Modal from "../components/Modal";
import StatusBadge from "../components/StatusBadge";

const emptyForm = { student: "", counsellor: "", dateTime: "", meetingLink: "", notes: "" };

export default function AppointmentsAndConsultations() {
  const [activeTab, setActiveTab] = useState("appointments"); // "appointments" | "consultations"
  const user = JSON.parse(localStorage.getItem("eduadmin_user"));
  const isStudent = user?.role === "student";

  return (
    <div className="combined-page">
      <style>{`
        .combined-page .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .combined-page .table-responsive {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .combined-page .data-table {
          min-width: 640px;
        }
        .combined-page .action-cell {
          display: flex;
          gap: 6px;
        }
        .combined-page .tab-bar {
          display: flex;
          gap: 6px;
          margin: 16px 0;
          border-bottom: 1px solid #e2e8f0;
        }
        .combined-page .tab-btn {
          padding: 10px 16px;
          border: none;
          background: transparent;
          font-size: 14px;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
          border-bottom: 2px solid transparent;
        }
        .combined-page .tab-btn.active {
          color: #012819;
          border-bottom-color: #012819;
        }
        .combined-page .bulk-bar {
          padding: 10px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          background: #fef2f2;
          border-bottom: 1px solid #fecaca;
        }
        .combined-page .bulk-delete-btn {
          background: #dc2626;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .combined-page .bulk-delete-btn:disabled {
          background: #94a3b8;
          cursor: not-allowed;
        }
        @media (max-width: 768px) {
          .combined-page .page-header {
            flex-direction: column;
            align-items: stretch;
          }
          .combined-page .page-header .btn {
            width: 100%;
            justify-content: center;
          }
        }
        @media (max-width: 480px) {
          .combined-page h1 { font-size: 1.25rem; }
          .combined-page p { font-size: 13px; }
          .combined-page .data-table { font-size: 12.5px; }
          .combined-page .icon-btn { padding: 4px; }
          .combined-page .tab-btn { padding: 8px 12px; font-size: 13px; }
        }
      `}</style>

      <div className="page-header">
        <div>
          <h1>Appointments &amp; Consultations</h1>
          <p>Manage meetings and review incoming consultation leads.</p>
        </div>
      </div>

      {!isStudent && (
        <div className="tab-bar">
          <button
            className={`tab-btn ${activeTab === "appointments" ? "active" : ""}`}
            onClick={() => setActiveTab("appointments")}
          >
            Appointments
          </button>
          <button
            className={`tab-btn ${activeTab === "consultations" ? "active" : ""}`}
            onClick={() => setActiveTab("consultations")}
          >
            Consultations
          </button>
        </div>
      )}

      {(isStudent || activeTab === "appointments") && (
        <AppointmentsSection user={user} isStudent={isStudent} />
      )}

      {!isStudent && activeTab === "consultations" && <ConsultationsSection />}
    </div>
  );
}

/* ---------------- Appointments Section ---------------- */

function AppointmentsSection({ user, isStudent }) {
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
      if (isStudent) {
        const apptRes = await api.get("/appointments");
        setItems(apptRes.data);
      } else {
        const [apptRes, studentsRes, counsellorsRes] = await Promise.all([
          api.get("/appointments"),
          api.get("/users", { params: { role: "student" } }),
          api.get("/users", { params: { role: "counsellor" } }),
        ]);
        setItems(apptRes.data);
        setStudents(studentsRes.data);
        setCounsellors(counsellorsRes.data);
      }
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

  const getId = (field) => (field && typeof field === "object" ? field._id : field);
  const getName = (field) => (field && typeof field === "object" ? field.name : "—");

  const visibleItems = isStudent
    ? items.filter((a) => getId(a.student) === user?._id)
    : items;

  if (isStudent) {
    return (
      <div className="card">
        {error && <div style={{ padding: 16, color: "#b3413d" }}>{error}</div>}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Counsellor</th>
                  <th>Date &amp; time</th>
                  <th>Meeting link</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {visibleItems.map((a) => (
                  <tr key={a._id}>
                    <td>{getName(a.counsellor)}</td>
                    <td>{new Date(a.dateTime).toLocaleString()}</td>
                    <td>
                      {a.meetingLink ? (
                        <a href={a.meetingLink} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                          <Video size={14} /> Join
                        </a>
                      ) : "—"}
                    </td>
                    <td><StatusBadge status={a.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!loading && visibleItems.length === 0 && !error && (
          <div className="empty-state">No appointments booked yet.</div>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="page-header" style={{ marginBottom: 12 }}>
        <div />
        <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Book meeting</button>
      </div>

      <div className="card">
        {error && <div style={{ padding: 16, color: "#b3413d" }}>{error}</div>}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="data-table">
              <thead><tr><th>Student</th><th>Counsellor</th><th>Date &amp; time</th><th>Meeting link</th><th>Status</th><th></th></tr></thead>
              <tbody>
                {visibleItems.map((a) => (
                  <tr key={a._id}>
                    <td>{getName(a.student)}</td>
                    <td>{getName(a.counsellor)}</td>
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
        {!loading && visibleItems.length === 0 && !error && <div className="empty-state">No appointments booked yet.</div>}
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
    </>
  );
}

/* ---------------- Consultations Section ---------------- */

function ConsultationsSection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processingId, setProcessingId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkDeleting, setBulkDeleting] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/consultations");
      setItems(res.data.consultations || res.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load consultations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleStatusChange = async (id, action) => {
    setProcessingId(id);
    try {
      await api.put(`/consultations/${id}/${action}`);
      const newStatus = action === "accept" ? "accepted" : "rejected";
      setItems((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
      );
    } catch (err) {
      alert(err.response?.data?.message || `Failed to ${action}.`);
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this consultation permanently? This cannot be undone.")) return;
    setProcessingId(id);
    try {
      await api.delete(`/consultations/${id}`);
      setItems((prev) => prev.filter((c) => c._id !== id));
      setSelectedIds((prev) => prev.filter((sid) => sid !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete.");
    } finally {
      setProcessingId(null);
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === items.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map((c) => c._id));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Delete ${selectedIds.length} selected consultation(s) permanently? This cannot be undone.`)) return;

    setBulkDeleting(true);
    try {
      await api.delete("/consultations/bulk-delete", { data: { ids: selectedIds } });
      setItems((prev) => prev.filter((c) => !selectedIds.includes(c._id)));
      setSelectedIds([]);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete selected consultations.");
    } finally {
      setBulkDeleting(false);
    }
  };

  const allSelected = items.length > 0 && selectedIds.length === items.length;

  return (
    <div className="card">
      {error && <div style={{ padding: 16, color: "#b3413d" }}>{error}</div>}

      {selectedIds.length > 0 && (
        <div className="bulk-bar">
          <span style={{ fontSize: 13, fontWeight: 600, color: "#991b1b" }}>
            {selectedIds.length} selected
          </span>
          <button
            className="bulk-delete-btn"
            onClick={handleBulkDelete}
            disabled={bulkDeleting}
          >
            <Trash2 size={14} />
            {bulkDeleting ? "Deleting..." : "Delete Selected"}
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: 36 }}>
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>WhatsApp</th>
                <th>Target Country</th>
                <th>Consultation Type</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((c) => (
                <tr key={c._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(c._id)}
                      onChange={() => toggleSelect(c._id)}
                    />
                  </td>
                  <td>{c.fullName}</td>
                  <td>{c.email}</td>
                  <td>{c.whatsappNumber || "—"}</td>
                  <td>{c.targetCountry}</td>
                  <td>{c.consultationType}</td>
                  <td><StatusBadge status={c.status || "pending"} /></td>
                  <td className="action-cell">
                    <button
                      className="icon-btn"
                      title="Accept"
                      disabled={c.status === "accepted" || processingId === c._id}
                      onClick={() => handleStatusChange(c._id, "accept")}
                      style={{ color: c.status === "accepted" ? "#94a3b8" : "#16a34a" }}
                    >
                      <Check size={16} />
                    </button>
                    <button
                      className="icon-btn danger"
                      title="Reject"
                      disabled={c.status === "rejected" || processingId === c._id}
                      onClick={() => handleStatusChange(c._id, "reject")}
                      style={{ color: c.status === "rejected" ? "#94a3b8" : "#b3413d" }}
                    >
                      <X size={16} />
                    </button>
                    <button
                      className="icon-btn danger"
                      title="Delete permanently"
                      disabled={processingId === c._id}
                      onClick={() => handleDelete(c._id)}
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!loading && items.length === 0 && !error && (
        <div className="empty-state">No consultation requests yet.</div>
      )}
    </div>
  );
}