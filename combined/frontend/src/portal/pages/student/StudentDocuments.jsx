import { useEffect, useState } from "react";
import { Upload, Download, Trash2 } from "lucide-react";
import api from "../../api/axiosClient";
import Modal from "../../components/Modal";
import StatusBadge from "../../components/StatusBadge";

const API_ORIGIN = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/api$/, "");

export default function StudentDocuments() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ type: "Passport", file: null });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/documents");
      setDocs(res.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load your documents.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!form.file) { alert("Choose a file first."); return; }
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("type", form.type);
      fd.append("file", form.file);
      await api.post("/documents/upload", fd, { headers: { "Content-Type": "multipart/form-data" } });
      setModalOpen(false);
      setForm({ type: "Passport", file: null });
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed.");
    } finally {
      setSaving(false);
    }
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
          <h1>My Documents</h1>
          <p>Upload your documents here — your counsellor gets notified automatically.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}><Upload size={16} /> Upload document</button>
      </div>

      <div className="card">
        {error && <div style={{ padding: 16, color: "#b3413d" }}>{error}</div>}

        {!loading && !error && docs.length > 0 && (
          <table className="data-table">
            <thead><tr><th>Type</th><th>File</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {docs.map((d) => (
                <tr key={d._id}>
                  <td>
                    {d.title || d.type}
                    {d.uploadedBy && (
                      <div style={{ fontSize: 11, color: "var(--indigo-600)", marginTop: 2 }}>
                        Shared by {d.uploadedBy?.name} {d.audience === "all" ? "(all students)" : ""}
                      </div>
                    )}
                  </td>
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
                    {!d.uploadedBy && d.status !== "Verified" && (
                      <button className="icon-btn danger" title="Delete" onClick={() => handleDelete(d)}><Trash2 size={15} /></button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!loading && docs.length === 0 && !error && (
          <div className="empty-state">You haven't uploaded any documents yet.</div>
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Upload document">
        <form onSubmit={handleUpload}>
          <div className="field">
            <label>Document type</label>
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option>Passport</option><option>Transcript</option><option>SOP</option>
              <option>IELTS/TOEFL Score</option><option>Recommendation Letter</option><option>Bank Statement</option>
            </select>
          </div>
          <div className="field">
            <label>File</label>
            <input type="file" onChange={(e) => setForm({ ...form, file: e.target.files[0] })} />
          </div>
          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} disabled={saving}>
            {saving ? "Uploading..." : "Upload"}
          </button>
        </form>
      </Modal>
    </div>
  );
}
