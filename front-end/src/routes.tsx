import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/public/LandingPage";
import Dashboard from "./pages/private/Dashboard";
import Login from "./pages/public/Login";
import ProtectedLayout from "./components/ProtectedLayout";

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
    path: "/panel",
    element: <ProtectedLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);
