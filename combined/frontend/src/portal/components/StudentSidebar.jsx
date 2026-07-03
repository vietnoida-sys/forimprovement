import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, FolderCheck, GraduationCap, Award, FileText, Bell, Settings,
  GraduationCap as Logo, X,
} from "lucide-react";

const GROUPS = [
  {
    label: "Overview",
    items: [{ to: "/portal", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    label: "My Study Journey",
    items: [
      { to: "/portal/documents", label: "My Documents", icon: FolderCheck },
      { to: "/portal/applications", label: "My Applications", icon: FileText },
    ],
  },
  {
    label: "Explore",
    items: [
      { to: "/portal/universities", label: "Universities", icon: GraduationCap },
      { to: "/portal/scholarships", label: "Scholarships", icon: Award },
    ],
  },
  {
    label: "Account",
    items: [
      { to: "/portal/notifications", label: "Notifications", icon: Bell },
      { to: "/portal/settings", label: "Settings", icon: Settings },
    ],
  },
];

export default function StudentSidebar({ open, onClose }) {
  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <div className="brand">
        <div className="brand-mark"><Logo size={18} /></div>
        <span>Student Portal</span>
        <button className="sidebar-close" onClick={onClose} aria-label="Close menu">
          <X size={18} />
        </button>
      </div>

      <nav className="nav">
        {GROUPS.map((group) => (
          <div className="nav-group" key={group.label}>
            <div className="nav-group-label">{group.label}</div>
            {group.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/portal"}
                className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
                onClick={onClose}
              >
                <item.icon size={17} strokeWidth={2} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <style>{`
.portal-app {

        .sidebar {
          width: 250px;
          background: var(--navy-950);
          color: #b9c0d4;
          height: 100dvh;
          overflow-y: auto;
          position: fixed;
          top: 0;
          left: 0;
          flex-shrink: 0;
          z-index: 100;
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 20px 16px 16px 20px;
          color: var(--white);
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 17px;
        }
        .brand span { flex: 1; }
        .brand-mark {
          width: 30px;
          height: 30px;
          background: linear-gradient(135deg, var(--indigo-600), var(--amber-500));
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--white);
          flex-shrink: 0;
        }
        .sidebar-close {
          display: none;
          border: none;
          background: transparent;
          color: #b9c0d4;
          padding: 6px;
          border-radius: var(--radius-sm);
          flex-shrink: 0;
        }
        .sidebar-close:hover { background: var(--navy-800); color: var(--white); }
        .nav { padding: 6px 12px 24px; }
        .nav-group { margin-top: 16px; }
        .nav-group-label {
          font-size: 10.5px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #5c6584;
          padding: 0 10px 6px;
          font-weight: 700;
        }
        .nav .nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 10px;
          border-radius: var(--radius-md);
          font-size: 13.5px;
          font-weight: 500;
          color: #b9c0d4 !important;
          margin-bottom: 2px;
        }
        .nav .nav-item:hover { background: var(--navy-800); color: var(--white) !important; }
        .nav .nav-item.active {
          background: var(--navy-700);
          color: var(--white) !important;
          box-shadow: inset 3px 0 0 var(--amber-500);
        }
        @media (max-width: 900px) {
          .sidebar {
            left: -260px;
            transition: left 0.2s ease;
            box-shadow: 8px 0 24px rgba(0,0,0,0.2);
          }
          .sidebar.open { left: 0; }
          .sidebar-close { display: inline-flex; }
        }
      
}
`}</style>
    </aside>
  );
}