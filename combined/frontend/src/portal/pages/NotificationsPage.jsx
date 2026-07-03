import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, FileCheck, FileX, Upload, GraduationCap, Award, ClipboardList } from "lucide-react";
import api from "../api/axiosClient";

const ICONS = {
  document_uploaded: Upload,
  document_verified: FileCheck,
  document_rejected: FileX,
  university_added: GraduationCap,
  scholarship_added: Award,
  application_status: ClipboardList,
};

function timeAgo(dateStr) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function NotificationsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/notifications");
      setItems(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleMarkAll = async () => {
    await api.patch("/notifications/read-all");
    setItems((list) => list.map((n) => ({ ...n, read: true })));
  };

  const handleClick = async (n) => {
    if (!n.read) {
      await api.patch(`/notifications/${n._id}/read`);
      setItems((list) => list.map((x) => (x._id === n._id ? { ...x, read: true } : x)));
    }
    if (n.link) navigate(n.link.startsWith("/portal") ? n.link : `/portal${n.link}`);
  };

  const unreadCount = items.filter((n) => !n.read).length;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Notifications</h1>
          <p>Everything that needs your attention, in one place.</p>
        </div>
        {unreadCount > 0 && (
          <button className="btn btn-secondary" onClick={handleMarkAll}>Mark all as read</button>
        )}
      </div>

      <div className="card">
        {!loading && items.length === 0 && (
          <div className="empty-state">
            <Bell size={28} strokeWidth={1.5} style={{ marginBottom: 8 }} />
            <div>No notifications yet.</div>
          </div>
        )}
        {items.map((n) => {
          const Icon = ICONS[n.type] || Bell;
          return (
            <button key={n._id} className={`notif-row ${n.read ? "" : "unread"}`} onClick={() => handleClick(n)}>
              <div className={`notif-row-icon ${n.read ? "" : "tint"}`}><Icon size={16} /></div>
              <div className="notif-row-body">
                <div className="notif-row-title">{n.title}</div>
                <div className="notif-row-msg">{n.message}</div>
              </div>
              <div className="notif-row-time">{timeAgo(n.createdAt)}</div>
            </button>
          );
        })}
      </div>

      <style>{`
.portal-app {

        .notif-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          width: 100%;
          text-align: left;
          border: none;
          border-bottom: 1px solid var(--slate-100);
          background: transparent;
          padding: 14px 18px;
        }
        .notif-row:last-child { border-bottom: none; }
        .notif-row:hover { background: var(--slate-50); }
        .notif-row.unread { background: #f7f8ff; }
        .notif-row-icon {
          width: 34px; height: 34px; flex-shrink: 0;
          border-radius: var(--radius-md);
          background: var(--slate-100);
          color: var(--slate-500);
          display: flex; align-items: center; justify-content: center;
        }
        .notif-row-icon.tint { background: #eceeff; color: var(--indigo-600); }
        .notif-row-body { flex: 1; min-width: 0; }
        .notif-row-title { font-size: 13.5px; font-weight: 700; color: var(--slate-900); }
        .notif-row-msg { font-size: 12.5px; color: var(--slate-500); margin-top: 2px; }
        .notif-row-time { font-size: 11.5px; color: var(--slate-300); white-space: nowrap; padding-top: 2px; }
      
}
`}</style>
    </div>
  );
}
