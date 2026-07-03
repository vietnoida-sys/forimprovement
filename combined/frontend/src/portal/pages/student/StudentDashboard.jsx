import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FolderCheck, Clock, FileText, CalendarClock } from "lucide-react";
import api from "../../api/axiosClient";
import StatCard from "../../components/StatCard";
import { useAuth } from "../../context/AuthContext";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/dashboard/stats").then((res) => setStats(res.data)).catch(() => {});
  }, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Welcome back, {user?.name?.split(" ")[0] || "Student"}</h1>
          <p>Here's a snapshot of your study-abroad journey.</p>
        </div>
      </div>

      <div className="stat-grid">
        <StatCard icon={FolderCheck} label="My Documents" value={stats?.myDocuments ?? "—"} tint="indigo" />
        <StatCard icon={Clock} label="Pending Verification" value={stats?.pendingDocuments ?? "—"} tint="amber" />
        <StatCard icon={FileText} label="My Applications" value={stats?.myApplications ?? "—"} tint="teal" />
        <StatCard icon={CalendarClock} label="Upcoming Appointments" value={stats?.myAppointments ?? "—"} tint="red" />
      </div>

      <div className="quick-links card">
        <div style={{ padding: "16px 18px", borderBottom: "1px solid var(--slate-200)" }}>
          <h3 style={{ fontSize: 15 }}>Quick actions</h3>
        </div>
        <div style={{ padding: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link className="btn btn-primary" to="/portal/documents">Upload a document</Link>
          <Link className="btn btn-secondary" to="/portal/universities">Browse universities</Link>
          <Link className="btn btn-secondary" to="/portal/scholarships">View scholarships</Link>
          <Link className="btn btn-secondary" to="/portal/notifications">Check notifications</Link>
        </div>
      </div>

      <style>{`
.portal-app {

        .stat-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 14px;
          margin-bottom: 20px;
        }
      
}
`}</style>
    </div>
  );
}
