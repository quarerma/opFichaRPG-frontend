import ReactDOM from "react-dom/client";

import "./index.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Login from "./pages/unprotected-pages/login-page.tsx";
import { CreateAccount } from "./pages/unprotected-pages/create-account.tsx";
import { Protected } from "./pages/protected.pages.tsx/components/protected-page.tsx";
import UnProtected from "./pages/protected.pages.tsx/components/unprotected-page.tsx";
import Campaings from "./pages/protected.pages.tsx/campaign-user.tsx";
import DM_Campaings from "./pages/protected.pages.tsx/campaign-dm.tsx";
import HomePage from "./pages/protected.pages.tsx/home.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query.ts";
import CreateCampaign from "./pages/protected.pages.tsx/create-campaign-page.tsx";

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
    path: "/create-campaign",
    element: (
      <Protected>
        <CreateCampaign />
      </Protected>
    ),
  },
  {
    path: "/campanhas",
    element: (
      <QueryClientProvider client={queryClient}>
        <Protected>
          <Campaings />
        </Protected>
      </QueryClientProvider>
    ),
  },
  {
    path: "/mestrando",
    element: (
      <QueryClientProvider client={queryClient}>
        <Protected>
          <DM_Campaings />
        </Protected>
      </QueryClientProvider>
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
      <QueryClientProvider client={queryClient}>
        <Protected>
          <HomePage />
        </Protected>
      </QueryClientProvider>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
