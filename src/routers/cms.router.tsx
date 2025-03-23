import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import Loadable from "../components/Loadable";
import { Dashboard } from "../config/routeConfig";

const DashboardPage = Loadable(lazy(() => import("../pages/dashboard/index")));

const CMSRoutes: RouteObject[] = [
  {
    path: Dashboard,
    element: <DashboardPage />,
  },
];

export default CMSRoutes;
