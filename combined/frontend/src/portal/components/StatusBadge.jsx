const COLORS = {
  // Lead statuses
  New: "slate",
  Contacted: "amber",
  Interested: "indigo",
  Applied: "indigo",
  "Visa Approved": "teal",
  Enrolled: "teal",
  // Generic
  active: "teal",
  inactive: "red",
  Active: "teal",
  Inactive: "red",
  Pending: "amber",
  Verified: "teal",
  Rejected: "red",
  Approved: "teal",
  Submitted: "slate",
  "Document Verification": "amber",
  "Under Review": "amber",
  Scheduled: "indigo",
  Completed: "teal",
  Cancelled: "red",
  "Not Started": "slate",
  "Documents Pending": "amber",
  "Interview Scheduled": "indigo",
};

export default function StatusBadge({ status }) {
  const tint = COLORS[status] || "slate";
  return (
    <span className={`badge tint-${tint}`}>
      {status}
      <style>{`
.portal-app {

        .badge {
          display: inline-flex;
          align-items: center;
          padding: 3px 10px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
        }
        .tint-slate { background: var(--slate-100); color: var(--slate-700); }
        .tint-indigo { background: #eceeff; color: var(--indigo-600); }
        .tint-amber { background: var(--amber-100); color: #9a6b12; }
        .tint-teal { background: var(--teal-100); color: #157a6a; }
        .tint-red { background: var(--red-100); color: #b3413d; }
      
}
`}</style>
    </span>
  );
}
