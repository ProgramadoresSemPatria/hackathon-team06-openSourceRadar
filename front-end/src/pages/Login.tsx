import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../lib/AuthContext";

export default function Login() {
  const { signIn } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGitHubLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      await signIn();
      navigate("/dashboard");
    } catch (err) {
      console.error("Erro no login:", err);
      setError("Failed to login with GitHub. Please, try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Log-in to Open Source Radar</h1>

        <p className="text-gray-600 mb-8 text-center">
          Connect your GitHub account to find open source projects that match your skills and interests.
        </p>

        {error && <div className="bg-red-50 text-red-600 p-4 rounded mb-4">{error}</div>}

        <button
          onClick={handleGitHubLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          {loading ? (
            "Loading..."
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Log-in with GitHub
            </>
          )}
        </button>
      </div>
    </div>
  );
}
