import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Signup from "../pages/Signup";
import DashBoard from "../pages/DashBoard";
import ProtectedPages from "./ProtectedPages";
import Login from "../pages/Login";
import { useAuth } from "../provider/AuthProvider";
import Home from "../pages/Home";
import DashBoardAdmin from "../pages/DashBoardAdmin";
import { Navigate } from "react-router-dom";

const Routes = () => {
  const [token, _] = useAuth();

  const routesForAuthenticated = [
    {
      path: "/",
      element: <ProtectedPages />,
      children: [
        {
          path: "/dashboard",
          element: <DashBoard />,
        },
        {
          path: "/admin/dashboard",
          element: <DashBoardAdmin />,
        },
      ],
    },
  ];

  const routesForPublic = [
    {
      path: "/signup",
      element: <Signup />,
    },

    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Home />,
    },
  ];
  const router = createBrowserRouter([
    ...routesForPublic,
    // ...routesForAuthenticated,
    ...(token ? routesForAuthenticated : []),
    { path: "*", element: <Navigate to={"/login"} /> },
  ]);

  return <RouterProvider router={router} />;
};
export default Routes;
