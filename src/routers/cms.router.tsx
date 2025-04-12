import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import Loadable from "../components/common/Loadable";
import {
  Dashboard,
  Product,
  ProductNew,
  ProductUpdate,
  MasterData,
  AccountAdmin,
  AccountUser,
  Voucher,
} from "../config/routeConfig";

const DashboardPage = Loadable(lazy(() => import("../pages/dashboard/index")));
const ProductPage = Loadable(lazy(() => import("../pages/products/index")));
const NewProductPage = Loadable(lazy(() => import("../pages/products/Create")));
const UpdateProductPage = Loadable(
  lazy(() => import("../pages/products/Update"))
);
const MasterDataPage = Loadable(
  lazy(() => import("../pages/master-data/index"))
);
const AdminPage = Loadable(lazy(() => import("../pages/users/admin")));
const CustomerPage = Loadable(lazy(() => import("../pages/users/customer")));
const VoucherPage = Loadable(lazy(() => import("../pages/vouchers")));

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
  {
    path: MasterData,
    element: <MasterDataPage />,
  },
  {
    path: AccountAdmin,
    element: <AdminPage />,
  },
  {
    path: AccountUser,
    element: <CustomerPage />,
  },
  {
    path: Voucher,
    element: <VoucherPage />,
  },
];

export default CMSRoutes;
