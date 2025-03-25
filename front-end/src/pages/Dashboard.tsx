import { useAuth } from "../lib/AuthContext";

export default function Dashboard() {
  const { userProfile } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {userProfile && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={userProfile.photoURL || "/user-placeholder.png"}
              alt={userProfile.displayName || "Usuário"}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h2 className="text-xl font-bold">{userProfile.displayName}</h2>
              <p className="text-gray-600">{userProfile.githubUsername}</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <p>Github login successful. This is a test page.</p>
            <p className="mt-2">UID: {userProfile.uid}</p>
          </div>
        </div>
      )}
    </div>
  );
}
