import ReactDOM from "react-dom/client";

import { QueryClientProvider } from "@tanstack/react-query";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./index.css";
import { queryClient } from "./lib/react-query.ts";
import { Protected } from "./pages/global-components/protected-page.tsx";
import UnProtected from "./pages/global-components/unprotected-page.tsx";
import ValidatePlayer from "./pages/global-components/wrap-validate-player.tsx";
import DM_Campaings from "./pages/protected-pages/campaign-dm/campaign-dm.tsx";
import CreateCampaign from "./pages/protected-pages/create-campaign/create-campaign-page.tsx";
import HomePage from "./pages/protected-pages/home/home.tsx";
import ViewCampaignDM from "./pages/protected-pages/view-campaign-dm/view-campaign-dm.tsx";
import { CreateAccount } from "./pages/unprotected-pages/create-account.tsx";
import Login from "./pages/unprotected-pages/login-page.tsx";
import ViewCampaign from "./pages/protected-pages/view-campaign-player/view-campaign.tsx";
import CreateCharacter from "./pages/protected-pages/view-campaign-player/subpages/create-character.tsx";
import EditCharacter from "./pages/protected-pages/view-campaign-player/subpages/editCharacter.tsx";
import { EditSkill } from "./pages/protected-pages/create-skill/create-skill.tsx";
import { NavBar } from "./pages/global-components/nav-bar.tsx";
import CampaignsPage from "./pages/protected-pages/campaigns-view-page/campaigns-page.tsx";
import CharactersPageView from "./pages/protected-pages/characters-view-page/characters-view-page.tsx";

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
          <NavBar>
            <CampaignsPage />
          </NavBar>
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
          <NavBar>
            <HomePage />
          </NavBar>
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
  {
    path: "createSkill",
    element: (
      <QueryClientProvider client={queryClient}>
        <Protected>
          <EditSkill />
        </Protected>
      </QueryClientProvider>
    ),
  },
  {
    path: "/personagens",
    element: (
      <QueryClientProvider client={queryClient}>
        <Protected>
          <NavBar>
            <CharactersPageView />
          </NavBar>
        </Protected>
      </QueryClientProvider>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
