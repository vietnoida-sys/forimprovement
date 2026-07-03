export default function ComingSoon({ icon: Icon, title, features = [] }) {
  return (
    <div className="card coming-soon-card">
      <div className="page-header">
        <div>
          <h1>{title}</h1>
          <p>This module is scaffolded and ready to be built out on the same pattern as Leads / Applications.</p>
        </div>
      </div>
      <div className="coming-soon">
        {Icon && <Icon size={40} strokeWidth={1.5} />}
        <h3>Planned features</h3>
        <ul style={{ textAlign: "left", color: "var(--slate-500)", fontSize: 13.5 }}>
          {features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>
      <style>{`
.portal-app {
.coming-soon-card { padding: 22px 24px; }
}
`}</style>
    </div>
  );
}
