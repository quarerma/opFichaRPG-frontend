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
