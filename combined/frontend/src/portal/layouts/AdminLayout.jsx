import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="portal-app admin-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {sidebarOpen && <div className="scrim" onClick={() => setSidebarOpen(false)} />}
      <div className="admin-main">
        <Topbar onToggleSidebar={() => setSidebarOpen((v) => !v)} />
        <main className="admin-content">
          <Outlet />
        </main>
      </div>

      <style>{`
       body{
  padding-top:0px;
}
.portal-app {

        .admin-shell { display: flex; min-height: 100vh; }
        .admin-main {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          margin-left: 250px;
          width: calc(100% - 250px);
        }
        .admin-content { padding: 24px 26px 40px; flex: 1; }
        .scrim {
          position: fixed;
          top: 64px;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15,23,41,0.4);
          z-index: 80;
        }
        @media (min-width: 901px) { .scrim { display: none; } }
        @media (max-width: 900px) {
          .admin-main { margin-left: 0; width: 100%; }
          .admin-content { padding-top: 0; }
        }
      
}
`}</style>
    </div>
  );
}