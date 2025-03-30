import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/private/Dashboard";
import ProtectedLayout from "./components/ProtectedLayout";
import Onboarding from "./pages/private/Onboarding";
import Explore from "./pages/private/Explore";
import { LandingPage } from "./pages/public/LandingPage";
import Learn from "./pages/public/Learn";
import Privacy from "./pages/public/Privacy";
import Terms from "./pages/public/Terms";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "learn",
        element: <Learn />,
      },
      {
        path: "privacy",
        element: <Privacy />,
      },
      {
        path: "terms",
        element: <Terms />,
      },
    ],
  },
  {
    path: "onboarding",
    element: <ProtectedLayout />,
    children: [
      {
        index: true,
        element: <Onboarding />,
      },
    ],
  },
  {
    element: <ProtectedLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "explore",
        element: <Explore />,
      },
    ],
  },
]);
