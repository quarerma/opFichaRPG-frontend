import ReactDOM from "react-dom/client";

import "./index.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Login from "./pages/unprotected-pages/login-page.tsx";
import { CreateAccount } from "./pages/unprotected-pages/create-account.tsx";
import { Protected } from "./pages/protected-pages/components/protected-page.tsx";
import UnProtected from "./pages/protected-pages/components/unprotected-page.tsx";
import { UserCampaigns } from "./pages/protected-pages/campaign-user.tsx";
import DM_Campaings from "./pages/protected-pages/campaign-dm.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query.ts";
import CreateCampaign from "./pages/protected-pages/create-campaign-page.tsx";
import HomePage from "./pages/protected-pages/Home.tsx";
import ViewCampaign from "./pages/protected-pages/view-campaign.tsx";
import CreateCharacter from "./pages/protected-pages/create-character.tsx";
import ViewCampaignDM from "./pages/protected-pages/view-campaign-dm.tsx";
import EditCharacter from "./pages/protected-pages/editCharacter.tsx";
import ValidatePlayer from "./pages/protected-pages/components/wrap-validate-player.tsx";

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
          <UserCampaigns />
        </Protected>
      </QueryClientProvider>
    ),
  },
  {
    path: "/campanhas/view/:id",
    element: (
      <QueryClientProvider client={queryClient}>
        <Protected>
          <ViewCampaign />
        </Protected>
      </QueryClientProvider>
    ),
  },
  {
    path: "/campanhas/:id/criar-personagem",
    element: (
      <QueryClientProvider client={queryClient}>
        <Protected>
          <ValidatePlayer>
            <CreateCharacter />
          </ValidatePlayer>
        </Protected>
      </QueryClientProvider>
    ),
  },
  {
    path: "/campanhas/mestre/:id",
    element: (
      <QueryClientProvider client={queryClient}>
        <Protected>
          <ViewCampaignDM />
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
  {
    path: "/campanhas/editCharacter/:id",
    element: (
      <QueryClientProvider client={queryClient}>
        <Protected>
          <ValidatePlayer>
            <EditCharacter />
          </ValidatePlayer>
        </Protected>
      </QueryClientProvider>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
