import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import Loadable from "../components/common/Loadable";
import {
  Dashboard,
  Product,
  ProductNew,
  ProductUpdate,
} from "../config/routeConfig";

const DashboardPage = Loadable(lazy(() => import("../pages/Dashboard/index")));
const ProductPage = Loadable(lazy(() => import("../pages/Products/index")));
const NewProductPage = Loadable(lazy(() => import("../pages/Products/Create")));
const UpdateProductPage = Loadable(
  lazy(() => import("../pages/Products/Update"))
);

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
  {
    path: ProductUpdate,
    element: <UpdateProductPage />,
  },
];

export default CMSRoutes;
