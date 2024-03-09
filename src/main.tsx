import ReactDOM from "react-dom/client";

import "./index.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Login from "./pages/LoginPage.tsx";
import { CreateAccount } from "./pages/CreateAccount.tsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "create-account",
    element: <CreateAccount />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
