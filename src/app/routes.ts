import { createBrowserRouter } from "react-router";
import { MarketingSite } from "./pages/MarketingSite";
import { Login } from "./pages/Login";
import { PortalLayout } from "./portal/PortalLayout";
import { Dashboard } from "./portal/Dashboard";
import { Appointments } from "./portal/Appointments";
import { Documents } from "./portal/Documents";
import { Profile } from "./portal/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MarketingSite,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/portal",
    Component: PortalLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "appointments", Component: Appointments },
      { path: "documents", Component: Documents },
      { path: "profile", Component: Profile },
    ],
  },
]);
