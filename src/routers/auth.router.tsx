import { RouteObject } from "react-router-dom";

// const SignInPage = Loadable(lazy(() => import("@src/pages/Auth/SignIn")));
// const ForgetPWPage = Loadable(lazy(() => import("@pages/Auth/ForgetPassword")));
// const ResetPWPage = Loadable(lazy(() => import("@pages/Auth/ResetPassword")));

const AuthRoutes: RouteObject = {
  path: "/",
  //   element: <MinimalLayout />,
  //   children: [
  //     {
  //       path: PATH_LOGIN,
  //       element: <SignInPage />,
  //     },
  //     {
  //       path: PATH_FORGET_PASSWORD,
  //       element: <ForgetPWPage />,
  //     },
  //     {
  //       path: PATH_RESET_PASSWORD,
  //       element: <ResetPWPage />,
  //     },
  //   ],
};

export default AuthRoutes;
