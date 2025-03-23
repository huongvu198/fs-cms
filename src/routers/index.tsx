import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layouts";
import CMSRoutes from "./cms.router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // errorElement: <ErrorPage />,
    children: [...CMSRoutes],
  },
  {
    path: "*",
    // element: <NotFound />,
  },
]);

export default router;
