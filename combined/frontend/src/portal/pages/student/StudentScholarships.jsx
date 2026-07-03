import { useEffect, useState } from "react";
import { Award } from "lucide-react";
import api from "../../api/axiosClient";
import StatusBadge from "../../components/StatusBadge";

export default function StudentScholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [myApps, setMyApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(null);

  const load = async () => {
    setLoading(true);
    const [sRes, aRes] = await Promise.all([
      api.get("/scholarships"),
      api.get("/scholarships/applications/all"),
    ]);
    setScholarships(sRes.data);
    setMyApps(aRes.data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const statusFor = (scholarshipId) =>
    myApps.find((a) => a.scholarship?._id === scholarshipId)?.status;

  const handleApply = async (scholarship) => {
    setApplying(scholarship._id);
    try {
      await api.post("/scholarships/applications", { scholarship: scholarship._id });
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Could not submit application.");
    } finally {
      setApplying(null);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Scholarships</h1>
          <p>Available scholarships — apply directly, your counsellor will follow up.</p>
        </div>
      </div>

      <div className="card">
        {!loading && scholarships.length > 0 && (
          <table className="data-table">
            <thead><tr><th>Scholarship</th><th>University</th><th>Amount</th><th>Deadline</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {scholarships.map((s) => {
                const status = statusFor(s._id);
                return (
                  <tr key={s._id}>
                    <td style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Award size={15} style={{ color: "var(--amber-500)" }} /> {s.name}
                    </td>
                    <td>{s.university?.name || "—"}</td>
                    <td>{s.amount} {s.currency}</td>
                    <td>{s.deadline ? new Date(s.deadline).toLocaleDateString() : "—"}</td>
                    <td>{status ? <StatusBadge status={status} /> : <span style={{ color: "var(--slate-300)" }}>—</span>}</td>
                    <td>
                      {!status && (
                        <button className="btn btn-sm btn-primary" disabled={applying === s._id} onClick={() => handleApply(s)}>
                          {applying === s._id ? "Applying..." : "Apply"}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {!loading && scholarships.length === 0 && <div className="empty-state">No scholarships listed yet.</div>}
      </div>
    </div>
  );
}
