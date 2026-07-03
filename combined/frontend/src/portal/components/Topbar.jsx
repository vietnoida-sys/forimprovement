import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, LogOut, ChevronDown, Home } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import NotificationBell from "./NotificationBell";

export default function Topbar({ onToggleSidebar }) {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="icon-btn mobile-toggle" onClick={onToggleSidebar} aria-label="Toggle menu">
          <Menu size={20} />
        </button>
        <Link to="/" className="home-link" aria-label="Home">
          <Home size={16} />
          <span>Home</span>
        </Link>
      </div>

      <div className="topbar-right">
        <NotificationBell />
        <div className="user-menu" ref={menuRef}>
          <button className="user-btn" onClick={() => setMenuOpen((v) => !v)}>
            <div className="avatar">{user?.name?.[0]?.toUpperCase() || "A"}</div>
            <div className="user-info">
              <div className="user-name">{user?.name}</div>
              <div className="user-role">{user?.role}</div>
            </div>
            <ChevronDown size={15} />
          </button>
          {menuOpen && (
            <div className="dropdown">
              <button className="dropdown-item" onClick={logout}>
                <LogOut size={15} /> Log out
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`

      
.portal-app {
.body{
padding-top:0px;
}

  .topbar {
    height: 64px;
    background: var(--white);
    border-bottom: 1px solid var(--slate-200);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 22px;
    position: sticky;
    top: 0;
    width: 100%;
    box-sizing: border-box;
    z-index: 60;
    p
  }
  .topbar-left { display: flex; align-items: center; gap: 14px; min-width: 0; }
  .mobile-toggle { display: none; flex-shrink: 0; }
  @media (max-width: 900px) { .mobile-toggle { display: inline-flex; } }

  .home-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 12px;
    border-radius: var(--radius-md);
    font-size: 13px;
    font-weight: 600;
    color: var(--slate-700);
    background: var(--slate-100);
    white-space: nowrap;
    flex-shrink: 0;
  }
  .home-link:hover { background: var(--slate-200); color: var(--slate-900); }

  .topbar-right { display: flex; align-items: center; gap: 14px; margin-left: auto; flex-shrink: 0; }
  .user-menu { position: relative; }
  .user-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    background: transparent;
    border: none;
    padding: 6px 8px;
    border-radius: var(--radius-md);
  }
  .user-btn:hover { background: var(--slate-50); }
  .avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: #012819;
    color: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 14px;
    flex-shrink: 0;
  }
  .user-info { text-align: left; }
  .user-name { font-size: 13px; font-weight: 600; color: var(--slate-900); }
  .user-role { font-size: 11.5px; color: var(--slate-500); text-transform: capitalize; }

  .dropdown {
    position: absolute;
    right: 0;
    top: 48px;
    background: var(--white);
    border: 1px solid var(--slate-200);
    border-radius: var(--radius-md);
    box-shadow: 0 10px 30px rgba(15,23,41,0.12);
    min-width: 150px;
    padding: 6px;
    z-index: 200;
  }
  .dropdown-item {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    background: transparent;
    border: none;
    border-radius: var(--radius-sm);
    font-size: 13px;
    color: var(--slate-700);
    text-align: left;
  }
  .dropdown-item:hover { background: var(--red-100); color: #b3413d; }

  /* Tablet */
  @media (max-width: 900px) {
    .topbar { padding: 0 14px; gap: 10px; }
    .topbar-left { gap: 8px; }
    .home-link span { display: none; }
    .home-link { padding: 8px; }
  }

  /* Small phones */
  @media (max-width: 480px) {
    .topbar { padding: 0 10px; }
    .topbar-right { gap: 8px; }
    .user-info { display: none; }
    .user-btn { padding: 6px 4px; gap: 0; }
    .dropdown { min-width: 130px; }
  }
}
`}</style>
    </header>
  );
}