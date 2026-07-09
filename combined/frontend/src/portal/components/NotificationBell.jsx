import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import api from "../api/axiosClient";

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

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [unread, setUnread] = useState(0);
  const navigate = useNavigate();
  const ref = useRef(null);

  const loadUnread = async () => {
    try {
      const res = await api.get("/notifications/unread-count");
      setUnread(res.data.count);
    } catch {
      /* ignore */
    }
  };

  const loadList = async () => {
    try {
      const res = await api.get("/notifications");
      setItems(res.data.slice(0, 8));
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    loadUnread();
    const interval = setInterval(loadUnread, 20000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (open) loadList();
  }, [open]);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleItemClick = async (n) => {
    if (!n.read) {
      try {
        await api.patch(`/notifications/${n._id}/read`);
        setUnread((u) => Math.max(0, u - 1));
      } catch {
        /* ignore */
      }
    }
    setOpen(false);
    if (n.link) navigate(n.link.startsWith("/portal") ? n.link : `/portal${n.link}`);
  };

  const handleMarkAll = async () => {
    try {
      await api.patch("/notifications/read-all");
      setItems((list) => list.map((n) => ({ ...n, read: true })));
      setUnread(0);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="notif-bell" ref={ref}>
      <button className="icon-btn notif-trigger" onClick={() => setOpen((v) => !v)} aria-label="Notifications">
        <Bell size={19} />
        {unread > 0 && <span className="notif-dot">{unread > 9 ? "9+" : unread}</span>}
      </button>

      {open && (
        <>
          <div className="notif-backdrop" onClick={() => setOpen(false)} />
          <div className="notif-panel">
            <div className="notif-panel-header">
              <span>Notifications</span>
              {unread > 0 && (
                <button className="notif-markall" onClick={handleMarkAll}>Mark all read</button>
              )}
            </div>
            <div className="notif-panel-list">
              {items.length === 0 && <div className="notif-empty">No notifications yet.</div>}
              {items.map((n) => (
                <button key={n._id} className={`notif-item ${n.read ? "" : "unread"}`} onClick={() => handleItemClick(n)}>
                  <div className="notif-item-title">{n.title}</div>
                  <div className="notif-item-msg">{n.message}</div>
                  <div className="notif-item-time">{timeAgo(n.createdAt)}</div>
                </button>
              ))}
            </div>
            <button
              className="notif-viewall"
              onClick={() => { setOpen(false); navigate("/portal/notifications"); }}
            >
              View all
            </button>
          </div>
        </>
      )}

      <style>{`
.portal-app {

        .notif-bell { position: relative; }
        .notif-trigger { position: relative; }
        .notif-dot {
          position: absolute;
          top: 1px;
          right: 1px;
          min-width: 16px;
          height: 16px;
          padding: 0 3px;
          border-radius: 999px;
          background: var(--red-500);
          color: var(--white);
          font-size: 10px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }
        .notif-backdrop {
          display: none;
        }
        .notif-panel {
          position: absolute;
          right: 0;
          top: 44px;
          width: 320px;
          max-width: 88vw;
          background: var(--white);
          border: 1px solid var(--slate-200);
          border-radius: var(--radius-md);
          box-shadow: 0 10px 30px rgba(15,23,41,0.14);
          z-index: 200;
          overflow: hidden;
        }
        .notif-panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          border-bottom: 1px solid var(--slate-200);
          font-size: 13px;
          font-weight: 700;
          color: white;
        }
        .notif-markall {
          border: none;
          background: transparent;
          color: white;
          font-size: 11.5px;
          font-weight: 600;
        }
        .notif-markall:hover { text-decoration: underline; }
        .notif-panel-list { max-height: 340px; overflow-y: auto; }
        .notif-item {
          display: block;
          width: 100%;
          text-align: left;
          border: none;
          background: transparent;
          padding: 10px 14px;
          border-bottom: 1px solid var(--slate-100);
        }
        .notif-item:hover { background: var(--slate-50); }
        .notif-item.unread { background: #f3f4ff; }
        .notif-item.unread:hover { background: #ececff; }
        .notif-item-title { font-size: 12.5px; font-weight: 700; color: var(--slate-900); }
        .notif-item-msg { font-size: 12px; color: var(--slate-500); margin-top: 2px; }
        .notif-item-time { font-size: 10.5px; color: var(--slate-300); margin-top: 4px; }
        .notif-empty { padding: 24px 14px; text-align: center; font-size: 12.5px; color: var(--slate-500); }
        .notif-viewall {
          width: 100%;
          border: none;
          border-top: 1px solid var(--slate-200);
          background: var(--slate-50);
          padding: 10px;
          font-size: 12.5px;
          font-weight: 600;
          color: var(--indigo-600);
        }
        .notif-viewall:hover { background: var(--slate-100); }

        /* ── RESPONSIVE: tablet ── */
        @media (max-width: 768px) {
          .notif-panel {
            width: 300px;
            max-width: 90vw;
          }
        }

        /* ── RESPONSIVE: mobile — panel becomes a centered sheet with backdrop ── */
        @media (max-width: 480px) {
          .notif-backdrop {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(15,23,41,0.35);
            z-index: 199;
          }
          .notif-panel {
            position: fixed;
            top: 64px;
            left: 10px;
            right: 10px;
            width: auto;
            max-width: none;
            max-height: 80vh;
            display: flex;
            flex-direction: column;
          }
          .notif-panel-list {
            max-height: none;
            flex: 1;
            overflow-y: auto;
          }
          .notif-panel-header {
            padding: 14px 16px;
            font-size: 14px;
          }
          .notif-item {
            padding: 12px 16px;
          }
          .notif-item-title { font-size: 13px; }
          .notif-item-msg { font-size: 12.5px; }
          .notif-viewall { padding: 12px; font-size: 13px; }
        }
      
}
`}</style>
    </div>
  );
}