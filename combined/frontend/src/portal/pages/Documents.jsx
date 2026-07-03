import { useEffect, useState } from "react";
import { Upload, Check, X, Trash2, Download, Share2, Users as UsersIcon } from "lucide-react";
import api from "../api/axiosClient";
import Modal from "../components/Modal";
import StatusBadge from "../components/StatusBadge";

const API_ORIGIN = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/api$/, "");

export default function Documents() {
  const [docs, setDocs] = useState([]);
  const [students, setStudents] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({ student: "", type: "Passport", file: null });
  const [saving, setSaving] = useState(false);

  const [shareOpen, setShareOpen] = useState(false);
  const [shareForm, setShareForm] = useState({ audience: "single", student: "", type: "Circular", title: "", file: null });
  const [sharing, setSharing] = useState(false);

  const [rejectTarget, setRejectTarget] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const params = statusFilter !== "all" ? { status: statusFilter } : {};
      const [docsRes, studentsRes] = await Promise.all([
        api.get("/documents", { params }),
        api.get("/users", { params: { role: "student" } }),
      ]);
      setDocs(docsRes.data);
      setStudents(studentsRes.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load documents.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [statusFilter]);

  const openUpload = () => {
    if (students.length === 0) { alert("Add a student first."); return; }
    setUploadForm({ student: students[0]._id, type: "Passport", file: null });
    setModalOpen(true);
  };

  const openShare = () => {
    if (students.length === 0) { alert("Add a student first."); return; }
    setShareForm({ audience: "single", student: students[0]._id, type: "Circular", title: "", file: null });
    setShareOpen(true);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!uploadForm.file) { alert("Choose a file."); return; }
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("student", uploadForm.student);
      fd.append("type", uploadForm.type);
      fd.append("file", uploadForm.file);
      await api.post("/documents/upload", fd, { headers: { "Content-Type": "multipart/form-data" } });
      setModalOpen(false);
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleShare = async (e) => {
    e.preventDefault();
    if (!shareForm.file) { alert("Choose a file."); return; }
    if (shareForm.audience === "single" && !shareForm.student) { alert("Choose a student."); return; }
    setSharing(true);
    try {
      const fd = new FormData();
      fd.append("audience", shareForm.audience);
      if (shareForm.audience === "single") fd.append("student", shareForm.student);
      fd.append("type", shareForm.type);
      fd.append("title", shareForm.title || shareForm.type);
      fd.append("file", shareForm.file);
      await api.post("/documents/share", fd, { headers: { "Content-Type": "multipart/form-data" } });
      setShareOpen(false);
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Sharing failed.");
    } finally {
      setSharing(false);
    }
  };

  const handleVerify = async (doc) => { await api.patch(`/documents/${doc._id}/verify`); load(); };
  const handleReject = async (e) => {
    e.preventDefault();
    await api.patch(`/documents/${rejectTarget._id}/reject`, { reason: rejectReason });
    setRejectTarget(null);
    setRejectReason("");
    load();
  };
  const handleDelete = async (doc) => {
    if (!confirm("Delete this document?")) return;
    await api.delete(`/documents/${doc._id}`);
    load();
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Document Management</h1>
          <p>Review student documents, or share a document with one student or all students.</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-secondary" onClick={openShare}><Share2 size={16} /> Share with students</button>
          <button className="btn btn-primary" onClick={openUpload}><Upload size={16} /> Upload on behalf of student</button>
        </div>
      </div>

      <div className="card">
        <div className="toolbar">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All statuses</option>
            <option value="Pending">Pending</option>
            <option value="Verified">Verified</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {error && <div style={{ padding: 16, color: "#b3413d" }}>{error}</div>}

        {!loading && !error && (
          <table className="data-table">
            <thead><tr><th>Student</th><th>Type</th><th>File</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {docs.map((d) => (
                <tr key={d._id}>
                  <td>
                    {d.audience === "all" ? (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 5, color: "var(--indigo-600)", fontWeight: 600 }}>
                        <UsersIcon size={14} /> All students
                      </span>
                    ) : (
                      d.student?.name || "—"
                    )}
                    {d.uploadedBy && (
                      <div style={{ fontSize: 11, color: "var(--slate-300)", marginTop: 2 }}>
                        Shared by {d.uploadedBy?.name}
                      </div>
                    )}
                  </td>
                  <td>{d.title || d.type}</td>
                  <td>
                    <a href={`${API_ORIGIN}${d.fileUrl}`} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                      <Download size={14} /> {d.fileName}
                    </a>
                  </td>
                  <td>
                    <StatusBadge status={d.status} />
                    {d.status === "Rejected" && d.rejectionReason && (
                      <div style={{ fontSize: 11.5, color: "var(--slate-500)", marginTop: 3 }}>{d.rejectionReason}</div>
                    )}
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 4 }}>
                      {!d.uploadedBy && d.status !== "Verified" && <button className="icon-btn" title="Verify" onClick={() => handleVerify(d)}><Check size={15} /></button>}
                      {!d.uploadedBy && d.status !== "Rejected" && <button className="icon-btn" title="Reject / request re-upload" onClick={() => setRejectTarget(d)}><X size={15} /></button>}
                      <button className="icon-btn danger" title="Delete" onClick={() => handleDelete(d)}><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!loading && docs.length === 0 && !error && <div className="empty-state">No documents uploaded yet.</div>}
      </div>

      {/* Upload on behalf of a student — goes through the same verification flow as a student's own upload */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Upload document on behalf of a student">
        <form onSubmit={handleUpload}>
          <div className="field">
            <label>Student</label>
            <select value={uploadForm.student} onChange={(e) => setUploadForm({ ...uploadForm, student: e.target.value })}>
              {students.map((s) => <option key={s._id} value={s._id}>{s.name}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Document type</label>
            <select value={uploadForm.type} onChange={(e) => setUploadForm({ ...uploadForm, type: e.target.value })}>
              <option>Passport</option><option>Transcript</option><option>SOP</option>
              <option>IELTS/TOEFL Score</option><option>Recommendation Letter</option><option>Bank Statement</option>
            </select>
          </div>
          <div className="field">
            <label>File</label>
            <input type="file" onChange={(e) => setUploadForm({ ...uploadForm, file: e.target.files[0] })} />
          </div>
          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} disabled={saving}>
            {saving ? "Uploading..." : "Upload"}
          </button>
        </form>
      </Modal>

      {/* Share a document WITH student(s) — e.g. a circular, a sample form, a scholarship form */}
      <Modal open={shareOpen} onClose={() => setShareOpen(false)} title="Share a document with students">
        <form onSubmit={handleShare}>
          <div className="field">
            <label>Share with</label>
            <select value={shareForm.audience} onChange={(e) => setShareForm({ ...shareForm, audience: e.target.value })}>
              <option value="single">A single student</option>
              <option value="all">All students</option>
            </select>
          </div>
          {shareForm.audience === "single" && (
            <div className="field">
              <label>Student</label>
              <select value={shareForm.student} onChange={(e) => setShareForm({ ...shareForm, student: e.target.value })}>
                {students.map((s) => <option key={s._id} value={s._id}>{s.name}</option>)}
              </select>
            </div>
          )}
          <div className="field">
            <label>Title</label>
            <input placeholder="e.g. Scholarship application form" value={shareForm.title} onChange={(e) => setShareForm({ ...shareForm, title: e.target.value })} />
          </div>
          <div className="field">
            <label>Type / category</label>
            <select value={shareForm.type} onChange={(e) => setShareForm({ ...shareForm, type: e.target.value })}>
              <option>Circular</option><option>Sample Form</option><option>Scholarship Form</option>
              <option>Visa Checklist</option><option>Resource</option><option>Other</option>
            </select>
          </div>
          <div className="field">
            <label>File</label>
            <input type="file" onChange={(e) => setShareForm({ ...shareForm, file: e.target.files[0] })} />
          </div>
          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} disabled={sharing}>
            {sharing ? "Sharing..." : "Share document"}
          </button>
        </form>
      </Modal>

      <Modal open={!!rejectTarget} onClose={() => setRejectTarget(null)} title="Reject document" width={380}>
        <form onSubmit={handleReject}>
          <div className="field"><label>Reason / what's needed for re-upload</label><textarea rows={3} required value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} /></div>
          <button className="btn btn-danger" style={{ width: "100%", justifyContent: "center" }}>Reject &amp; request re-upload</button>
        </form>
      </Modal>
    </div>
  );
}
