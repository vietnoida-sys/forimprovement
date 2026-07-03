import { useEffect, useState } from "react";
import {
  Users, UserCog, GraduationCap, FileText, FolderCheck,
  CalendarClock, Plane, Wallet,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import api from "../api/axiosClient";
import StatCard from "../components/StatCard";
import { useAuth } from "../context/AuthContext";

const PIE_COLORS = ["#6b7280", "#e0a63a", "#6472e0", "#4f5fd9", "#2aa896", "#157a6a"];

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [breakdown, setBreakdown] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      api.get("/dashboard/stats"),
      api.get("/dashboard/lead-status-breakdown"),
    ])
      .then(([statsRes, breakdownRes]) => {
        setStats(statsRes.data);
        setBreakdown(breakdownRes.data.map((b) => ({ name: b._id, value: b.count })));
      })
      .catch((err) => setError(err.response?.data?.message || "Could not load dashboard data."));
  }, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Welcome back, {user?.name?.split(" ")[0]}</h1>
          <p>Here's what's happening across your admissions pipeline today.</p>
        </div>
      </div>

      {error && <div className="card" style={{ padding: 16, color: "#b3413d", marginBottom: 16 }}>{error}</div>}

      {stats && (
        <div className="stat-grid">
          <StatCard icon={Users} label="Total Students" value={stats.totalStudents} tint="indigo" />
          <StatCard icon={UserCog} label="Total Counsellors" value={stats.totalCounsellors} tint="indigo" />
          <StatCard icon={GraduationCap} label="Total Universities" value={stats.totalUniversities} tint="amber" />
          <StatCard icon={FileText} label="Applications Submitted" value={stats.totalApplications} tint="amber" />
          <StatCard icon={FolderCheck} label="Pending Documents" value={stats.pendingDocuments} tint="red" />
          <StatCard icon={CalendarClock} label="Upcoming Appointments" value={stats.upcomingAppointments} tint="indigo" />
          <StatCard icon={Plane} label="Visa Approved" value={stats.visaApprovedCount} tint="teal" />
          <StatCard icon={Wallet} label="Revenue Generated" value={`$${stats.revenueGenerated?.toLocaleString()}`} tint="teal" />
        </div>
      )}

      <div className="dash-grid">
        <div className="card chart-card">
          <h3 style={{ padding: "18px 20px 0" }}>Lead status breakdown</h3>
          <div style={{ height: 280 }}>
            {breakdown.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={breakdown} dataKey="value" nameKey="name" innerRadius={60} outerRadius={95} paddingAngle={2}>
                    {breakdown.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="empty-state">No leads yet. Add your first lead to see the breakdown.</div>
            )}
          </div>
        </div>

        <div className="card">
          <h3 style={{ padding: "18px 20px 0" }}>Lead conversion rate</h3>
          <div style={{ padding: "30px 20px 20px", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 42, color: "var(--indigo-600)" }}>
              {stats?.leadConversionRate || "0.0"}%
            </div>
            <p style={{ color: "var(--slate-500)", fontSize: 13.5, marginTop: 8 }}>
              {stats?.totalLeads || 0} total leads tracked, converting through to enrollment.
            </p>
          </div>
        </div>
      </div>

      <style>{`
.portal-app {

        .stat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 22px;
        }
        .dash-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 16px;
        }
        .chart-card { padding-bottom: 10px; }
        @media (max-width: 1100px) { .stat-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 900px) { .dash-grid { grid-template-columns: 1fr; } }
        @media (max-width: 560px) { .stat-grid { grid-template-columns: 1fr; } }
      
}
`}</style>
    </div>
  );
}
