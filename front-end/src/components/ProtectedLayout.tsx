import { Navigate, Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function ProtectedLayout() {
  const { currentUser, userProfile, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !loading &&
      currentUser &&
      userProfile &&
      !userProfile.hasCompletedOnboarding &&
      !location.pathname.includes("/onboarding")
    ) {
      navigate("/onboarding");
    }
  }, [currentUser, userProfile, loading, location, navigate]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Carregando...
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
