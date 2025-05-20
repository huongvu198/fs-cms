import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "../layouts";
import CMSRoutes from "./cms.router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      ...CMSRoutes,
    ],
  },
  {
    path: "*",
    // element: <NotFound />,
  },
]);

export default router;
