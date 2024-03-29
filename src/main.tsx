import ReactDOM from "react-dom/client";

import "./index.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Login from "./pages/LoginPage.tsx";
import { CreateAccount } from "./pages/CreateAccount.tsx";
import HomePage from "./pages/protected.pages.tsx/Home.tsx";
import { Protected } from "./pages/protected.pages.tsx/components/Protected.tsx";
import UnProtected from "./pages/protected.pages.tsx/components/UnProtected.tsx";
import Campaings from "./pages/protected.pages.tsx/Campaigns.tsx";
import DM_Campaings from "./pages/protected.pages.tsx/DM_Campaings.tsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <UnProtected>
        <Login />
      </UnProtected>
    ),
  },
  {
    path: "/campanhas",
    element: (
      <Protected>
        <Campaings />
      </Protected>
    ),
  },
  {
    path: "/mestrando",
    element: (
      <Protected>
        <DM_Campaings />
      </Protected>
    ),
  },
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/create-account",
    element: (
      <UnProtected>
        <CreateAccount />
      </UnProtected>
    ),
  },
  {
    path: "/home",
    element: (
      <Protected>
        <HomePage />
      </Protected>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
