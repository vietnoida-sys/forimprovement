export default function StatCard({ icon: Icon, label, value, tint = "indigo" }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon tint-${tint}`}>
        <Icon size={20} strokeWidth={2} />
      </div>
      <div>
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
      </div>

      <style>{`
.portal-app {

        .stat-card {
          display: flex;
          align-items: center;
          gap: 14px;
          background: var(--white);
          border: 1px solid var(--slate-200);
          border-radius: var(--radius-lg);
          padding: 18px 20px;
          box-shadow: var(--shadow-card);
          min-width: 0;
        }
        .stat-icon {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .tint-indigo { background: #eceeff; color: var(--indigo-600); }
        .tint-amber { background: var(--amber-100); color: var(--amber-500); }
        .tint-teal { background: var(--teal-100); color: var(--teal-500); }
        .tint-red { background: var(--red-100); color: var(--red-500); }
        .stat-value {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 800;
          color: var(--slate-900);
          line-height: 1.2;
        }
        .stat-label {
          font-size: 12.5px;
          color: var(--slate-500);
          margin-top: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      
}
`}</style>
    </div>
  );
}
