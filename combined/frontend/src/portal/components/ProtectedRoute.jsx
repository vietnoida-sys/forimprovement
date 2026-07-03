import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center", color: "var(--slate-500)" }}>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/portal/login" state={{ from: location.pathname }} replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/portal" replace />;
  }

  return children;
}
