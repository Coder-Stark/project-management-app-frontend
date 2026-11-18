import { Navigate, Route, Routes } from "react-router-dom";
import GuestRoute from "./GuestRoute.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import AppLayout from "../layouts/AppLayout.jsx";
import LoginPage from "../../features/auth/pages/LoginPage.jsx";
import SignupPage from "../../features/auth/pages/SignupPage.jsx";
import ProjectsPage from "../../features/projects/pages/ProjectsPage.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/projects" element={<ProjectsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/projects" replace />} />
    </Routes>
  );
}