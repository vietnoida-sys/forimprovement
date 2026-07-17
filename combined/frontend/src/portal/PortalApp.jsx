import { Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import StudentLayout from "./layouts/StudentLayout";
import "./portal.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UsersPage from "./pages/Users";
import Leads from "./pages/Leads";
import Universities from "./pages/Universities";
import Courses from "./pages/Courses";
import Applications from "./pages/Applications";
import Documents from "./pages/Documents";
import Scholarships from "./pages/Scholarships";
import Visas from "./pages/Visas";
import Appointments from "./pages/Appointments";
import Communication from "./pages/Communication";
import Reports from "./pages/Reports";
import Financial from "./pages/Financial";
import CMS from "./pages/CMS";
import Referral from "./pages/Referral";
import AIFeatures from "./pages/AIFeatures";
import ActivityLogs from "./pages/ActivityLogs";
import Settings from "./pages/Settings";
import NotificationsPage from "./pages/NotificationsPage";

import StudentDashboard from "./pages/student/StudentDashboard";
import StudentDocuments from "./pages/student/StudentDocuments";
import StudentUniversities from "./pages/student/StudentUniversities";
import StudentScholarships from "./pages/student/StudentScholarships";
import StudentApplications from "./pages/student/StudentApplications";


// Admin & counsellor experience — the existing full CRM.
function AdminApp() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
     
        <Route path="users" element={<ProtectedRoute roles={["admin"]}><UsersPage /></ProtectedRoute>} />
        <Route path="leads" element={<Leads />} />
        <Route path="universities" element={<Universities />} />
        <Route path="courses" element={<Courses />} />
        <Route path="applications" element={<Applications />} />
        <Route path="documents" element={<Documents />} />
        <Route path="scholarships" element={<Scholarships />} />
        <Route path="visas" element={<Visas />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="communication" element={<Communication />} />
        <Route path="reports" element={<Reports />} />
        <Route path="financial" element={<Financial />} />
        <Route path="cms" element={<CMS />} />
        <Route path="referral" element={<Referral />} />
        <Route path="ai-features" element={<AIFeatures />} />
        <Route path="activity-logs" element={<ActivityLogs />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

// Student portal — document upload, browsing, and notifications.
function StudentApp() {
  return (
    <Routes>
      <Route element={<StudentLayout />}>
        <Route index element={<StudentDashboard />} />
        <Route path="documents" element={<StudentDocuments />} />
        <Route path="applications" element={<StudentApplications />} />
        <Route path="universities" element={<StudentUniversities />} />
        <Route path="scholarships" element={<StudentScholarships />} />
        <Route path="notifications" element={<NotificationsPage />} />
         <Route path="appointments" element={<Appointments />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

function RoleGate() {
  const { user } = useAuth();
  return user?.role === "student" ? <StudentApp /> : <AdminApp />;
}

export default function PortalApp() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <RoleGate />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
