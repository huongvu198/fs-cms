import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import Loadable from "../components/common/Loadable";
import { Dashboard, Product, ProductNew } from "../config/routeConfig";

const DashboardPage = Loadable(lazy(() => import("../pages/Dashboard/index")));
const ProductPage = Loadable(lazy(() => import("../pages/Products/index")));
const NewProductPage = Loadable(lazy(() => import("../pages/Products/Create")));

const CMSRoutes: RouteObject[] = [
  {
    path: Dashboard,
    element: <DashboardPage />,
  },
  {
    path: Product,
    element: <ProductPage />,
  },
  {
    path: ProductNew,
    element: <NewProductPage />,
  },
];

export default CMSRoutes;
