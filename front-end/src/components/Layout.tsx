import { Outlet } from "react-router";
import { Link } from "react-router";
import { useAuth } from "../lib/AuthContext";

export default function Layout() {
  const { currentUser, userProfile, logout, loading } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar simplificado */}
      <header className="bg-primary text-white shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">
              Open Source Radar
            </Link>

            <div className="flex items-center space-x-4">
              {loading ? (
                <span>Loading...</span>
              ) : currentUser ? (
                <div className="flex items-center space-x-4">
                  <Link to="/dashboard">Dashboard</Link>
                  {userProfile?.photoURL && (
                    <img src={userProfile.photoURL} alt="Avatar" className="w-8 h-8 rounded-full" />
                  )}
                  <button
                    onClick={() => logout()}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Log-out
                  </button>
                </div>
              ) : (
                <Link to="/login" className="bg-white text-primary hover:bg-gray-100 px-4 py-2 rounded font-medium">
                  Log-in
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer simplificado */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Open Source Radar - Developed by Team 6 - Hackathon A BASE / Programadores Sem Pátria</p>
        </div>
      </footer>
    </div>
  );
}
