import { Link } from "react-router";
import { useAuth } from "./lib/AuthContext";

function App() {
  const { currentUser } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to Open Source Radar</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl">
        Find open source projects that match your skills and enrichen your portfolio with relevant contributions.
      </p>

      <div className="flex gap-4">
        {currentUser ? (
          <Link
            to="/dashboard"
            className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-6 rounded-md transition-colors"
          >
            Go to Dashboard
          </Link>
        ) : (
          <Link
            to="/login"
            className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-6 rounded-md transition-colors"
          >
            Start Now
          </Link>
        )}

        <Link
          to="/learn"
          className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium py-2 px-6 rounded-md transition-colors"
        >
          Learn
        </Link>
      </div>
    </div>
  );
}

export default App;
