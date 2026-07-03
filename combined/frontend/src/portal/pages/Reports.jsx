import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import api from "../api/axiosClient";

export default function Reports() {
  const [breakdown, setBreakdown] = useState([]);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([api.get("/dashboard/lead-status-breakdown"), api.get("/dashboard/stats")])
      .then(([b, s]) => {
        setBreakdown(b.data.map((x) => ({ status: x._id, count: x.count })));
        setStats(s.data);
      })
      .catch((err) => setError(err.response?.data?.message || "Failed to load reports."));
  }, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Reports &amp; Analytics</h1>
          <p>Live lead pipeline data. Country-wise and monthly admission reports can be added the same way once more historical data exists.</p>
        </div>
      </div>

      {error && <div className="card" style={{ padding: 16, color: "#b3413d" }}>{error}</div>}

      <div className="card" style={{ padding: "20px 20px 8px", marginBottom: 16 }}>
        <h3 style={{ marginBottom: 14 }}>Leads by pipeline stage</h3>
        <div style={{ height: 300 }}>
          {breakdown.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={breakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--slate-200)" />
                <XAxis dataKey="status" tick={{ fontSize: 11 }} interval={0} angle={-15} textAnchor="end" height={60} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="var(--indigo-600)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="empty-state">No lead data yet.</div>
          )}
        </div>
      </div>

      {stats && (
        <div className="report-grid">
          <ReportRow label="Total students" value={stats.totalStudents} />
          <ReportRow label="Active counsellors" value={stats.totalCounsellors} />
          <ReportRow label="Applications submitted" value={stats.totalApplications} />
          <ReportRow label="Lead conversion rate" value={`${stats.leadConversionRate}%`} />
          <ReportRow label="Visa approvals" value={stats.visaApprovedCount} />
          <ReportRow label="Revenue generated (demo)" value={`$${stats.revenueGenerated?.toLocaleString()}`} />
        </div>
      )}

      <style>{`
.portal-app {

        .report-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        @media (max-width: 800px) { .report-grid { grid-template-columns: 1fr 1fr; } }
      
}
`}</style>
    </div>
  );
}

function ReportRow({ label, value }) {
  return (
    <div className="card" style={{ padding: "16px 18px" }}>
      <div style={{ fontSize: 12.5, color: "var(--slate-500)" }}>{label}</div>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, marginTop: 4 }}>{value}</div>
    </div>
  );
}
