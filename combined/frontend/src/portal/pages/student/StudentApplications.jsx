import { useEffect, useState } from "react";
import api from "../../api/axiosClient";
import StatusBadge from "../../components/StatusBadge";

export default function StudentApplications() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/applications").then((res) => setApps(res.data)).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>My Applications</h1>
          <p>Track the status of your university applications.</p>
        </div>
      </div>

      <div className="card">
        {!loading && apps.length > 0 && (
          <table className="data-table">
            <thead><tr><th>University</th><th>Course</th><th>Intake</th><th>Status</th></tr></thead>
            <tbody>
              {apps.map((a) => (
                <tr key={a._id}>
                  <td>{a.university?.name || "—"}</td>
                  <td>{a.course?.name || "—"}</td>
                  <td>{a.intake || "—"}</td>
                  <td><StatusBadge status={a.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!loading && apps.length === 0 && <div className="empty-state">No applications yet.</div>}
      </div>
    </div>
  );
}
