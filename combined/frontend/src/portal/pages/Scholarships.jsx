import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Users, Check, X } from "lucide-react";
import api from "../api/axiosClient";
import Modal from "../components/Modal";

const emptyForm = { name: "", university: "", amount: "", eligibility: "", deadline: "" };

function StatusPill({ status }) {
  const colors = {
    Pending: { bg: "#fff4e5", text: "#a86400" },
    Approved: { bg: "#e6f7ee", text: "#1a7f4e" },
    Rejected: { bg: "#fdeaea", text: "#b3413d" },
  };
  const c = colors[status] || colors.Pending;
  return (
    <span style={{
      background: c.bg,
      color: c.text,
      padding: "3px 10px",
      borderRadius: 999,
      fontSize: 12,
      fontWeight: 600,
      display: "inline-block",
    }}>
      {status}
    </span>
  );
}

export default function Scholarships() {
  const [items, setItems] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  // --- Applicants modal state ---
  const [applicantsModalOpen, setApplicantsModalOpen] = useState(false);
  const [activeScholarship, setActiveScholarship] = useState(null);
  const [applications, setApplications] = useState([]);
  const [applicationsLoading, setApplicationsLoading] = useState(false);
  const [applicationsError, setApplicationsError] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkSaving, setBulkSaving] = useState(false);
  const [rowSavingId, setRowSavingId] = useState(null);

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

  // --- Applicants logic ---

  const getStudentId = (field) => (field && typeof field === "object" ? field._id : field);
  const getStudentName = (field) => (field && typeof field === "object" ? (field.name || field.email || "—") : "—");

  const openApplicants = async (scholarship) => {
    setActiveScholarship(scholarship);
    setApplicantsModalOpen(true);
    setSelectedIds([]);
    setApplicationsError("");
    setApplicationsLoading(true);
    try {
      // Backend only has a single "all applications" endpoint (admin/counsellor get everything,
      // students get their own automatically) — so filter down to this scholarship on the client.
      const res = await api.get("/scholarships/applications/all");
      const filtered = res.data.filter((a) => {
        const schId = a.scholarship && typeof a.scholarship === "object" ? a.scholarship._id : a.scholarship;
        return schId === scholarship._id;
      });
      setApplications(filtered);
    } catch (err) {
      setApplicationsError(err.response?.data?.message || "Failed to load applicants.");
    } finally {
      setApplicationsLoading(false);
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const toggleSelectAll = () => {
    const pendingIds = applications.filter((a) => a.status === "Pending").map((a) => a._id);
    setSelectedIds((prev) => (prev.length === pendingIds.length ? [] : pendingIds));
  };

  const updateApplicationStatus = async (applicationId, status) => {
    setRowSavingId(applicationId);
    try {
      await api.put(`/scholarships/applications/${applicationId}`, { status });
      setApplications((prev) => prev.map((a) => (a._id === applicationId ? { ...a, status } : a)));
      setSelectedIds((prev) => prev.filter((id) => id !== applicationId));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update application.");
    } finally {
      setRowSavingId(null);
    }
  };

  const handleBulkApprove = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Approve ${selectedIds.length} selected application(s)?`)) return;
    setBulkSaving(true);
    try {
      await Promise.all(
        selectedIds.map((id) => api.put(`/scholarships/applications/${id}`, { status: "Approved" }))
      );
      setApplications((prev) =>
        prev.map((a) => (selectedIds.includes(a._id) ? { ...a, status: "Approved" } : a))
      );
      setSelectedIds([]);
    } catch (err) {
      alert(err.response?.data?.message || "Bulk approve failed.");
    } finally {
      setBulkSaving(false);
    }
  };

  return (
    <div className="scholarships-page">
      {/* Scoped responsive styles — only affects this page, nothing else changed */}
      <style>{`
        .scholarships-page .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .scholarships-page .table-responsive {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .scholarships-page .data-table {
          min-width: 560px;
        }
        .scholarships-page .applicants-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }
        .scholarships-page .applicants-table {
          width: 100%;
          border-collapse: collapse;
        }
        .scholarships-page .applicants-table th,
        .scholarships-page .applicants-table td {
          text-align: left;
          padding: 8px 6px;
          border-bottom: 1px solid #eee;
          font-size: 13px;
        }
        @media (max-width: 768px) {
          .scholarships-page .page-header {
            flex-direction: column;
            align-items: stretch;
          }
          .scholarships-page .page-header .btn {
            width: 100%;
            justify-content: center;
          }
          .scholarships-page .field-row {
            flex-direction: column;
          }
        }
        @media (max-width: 480px) {
          .scholarships-page h1 {
            font-size: 1.25rem;
          }
          .scholarships-page p {
            font-size: 13px;
          }
          .scholarships-page .data-table {
            font-size: 12.5px;
          }
          .scholarships-page .icon-btn {
            padding: 4px;
          }
        }
      `}</style>

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
          <div className="table-responsive">
            <table className="data-table">
              <thead><tr><th>Scholarship</th><th>University</th><th>Amount</th><th>Deadline</th><th>Applicants</th><th></th></tr></thead>
              <tbody>
                {items.map((s) => (
                  <tr key={s._id}>
                    <td style={{ fontWeight: 600 }}>{s.name}</td>
                    <td>{s.university?.name || "Any university"}</td>
                    <td>{s.currency || "USD"} {s.amount?.toLocaleString()}</td>
                    <td>{s.deadline ? new Date(s.deadline).toLocaleDateString() : "—"}</td>
                    <td>
                      <button className="btn btn-secondary" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 10px", marginBottom: "0px" }} onClick={() => openApplicants(s)}>
                        <Users size={14} />
                        View
                      </button>
                    </td>
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
          </div>
        )}
        {!loading && items.length === 0 && !error && <div className="empty-state">No scholarships yet.</div>}
      </div>

      {/* Add/Edit scholarship modal */}
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

      {/* Applicants modal */}
      <Modal
        open={applicantsModalOpen}
        onClose={() => setApplicantsModalOpen(false)}
        title={activeScholarship ? `Applicants — ${activeScholarship.name}` : "Applicants"}
      >
        {applicationsError && <div style={{ padding: 12, color: "#b3413d" }}>{applicationsError}</div>}

        {!applicationsLoading && !applicationsError && applications.length > 0 && (
          <div className="applicants-toolbar">
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
              <input
                type="checkbox"
                checked={selectedIds.length > 0 && selectedIds.length === applications.filter((a) => a.status === "Pending").length}
                onChange={toggleSelectAll}
              />
              Select all pending
            </label>
            <button
              className="btn btn-primary"
              style={{ padding: "6px 12px" }}
              disabled={selectedIds.length === 0 || bulkSaving}
              onClick={handleBulkApprove}
            >
              {bulkSaving ? "Approving..." : `Approve selected (${selectedIds.length})`}
            </button>
          </div>
        )}

        {applicationsLoading && <div style={{ padding: 12 }}>Loading applicants...</div>}

        {!applicationsLoading && !applicationsError && applications.length === 0 && (
          <div className="empty-state">No one has applied yet.</div>
        )}

        {!applicationsLoading && !applicationsError && applications.length > 0 && (
          <div className="table-responsive">
            <table className="applicants-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Student</th>
                  <th>Applied on</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {applications.map((a) => (
                  <tr key={a._id}>
                    <td>
                      <input
                        type="checkbox"
                        disabled={a.status !== "Pending"}
                        checked={selectedIds.includes(a._id)}
                        onChange={() => toggleSelect(a._id)}
                      />
                    </td>
                    <td>{getStudentName(a.student)}</td>
                    <td>{a.appliedAt || a.createdAt ? new Date(a.appliedAt || a.createdAt).toLocaleDateString() : "—"}</td>
                    <td><StatusPill status={a.status || "Pending"} /></td>
                    <td>
                      <div style={{ display: "flex", gap: 4 }}>
                        <button
                          className="icon-btn"
                          title="Approve"
                          disabled={a.status === "Approved" || rowSavingId === a._id}
                          onClick={() => updateApplicationStatus(a._id, "Approved")}
                        >
                          <Check size={15} />
                        </button>
                        <button
                          className="icon-btn danger"
                          title="Reject"
                          disabled={a.status === "Rejected" || rowSavingId === a._id}
                          onClick={() => updateApplicationStatus(a._id, "Rejected")}
                        >
                          <X size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Modal>
    </div>
  );
}