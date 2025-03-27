import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import { Navbar } from "./Navbar";

export default function ProtectedLayout() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="max-w-[96rem] mx-auto px-6 sm:px-12">
      <Navbar />
      <Outlet />
    </div>
  );
}
