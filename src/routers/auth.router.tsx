import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import MinimalLayout from "../layouts/MinimalLayout";
import Loadable from "../components/common/Loadable";
import { Login } from "../config/routeConfig";

const SignInPage = Loadable(lazy(() => import("../pages/auth/signin")));

const AuthRoutes: RouteObject = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: Login,
      element: <SignInPage />,
    },
  ],
};

export default AuthRoutes;
