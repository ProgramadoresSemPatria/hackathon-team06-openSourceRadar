import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/private/Dashboard";
import Login from "./pages/public/Login";
import ProtectedLayout from "./components/ProtectedLayout";
import Onboarding from "./pages/private/Onboarding";
import Explore from "./pages/private/Explore";
import { LandingPage } from "./pages/public/LandingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <Login />,
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
    path: "panel",
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
