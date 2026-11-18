import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth.js";
import FullPageLoader from "../../shared/components/FullPageLoader.jsx";

export default function GuestRoute() {
  const { isAuthenticated, isRestoring } = useAuth();

  if (isRestoring) return <FullPageLoader />;
  if (isAuthenticated) return <Navigate to="/projects" replace />;

  return <Outlet />;
}