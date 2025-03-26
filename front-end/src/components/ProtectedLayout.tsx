import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";

export default function ProtectedLayout() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
