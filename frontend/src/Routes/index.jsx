import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Signup from "../pages/Signup";
import DashBoard from "../pages/DashBoard";
import ProtectedPages from "./ProtectedPages";
import Login from "../pages/Login";
import { useAuth } from "../provider/AuthProvider";
import Home from "../pages/Home";

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
    ...(token ? routesForAuthenticated : []),
  ]);

  return <RouterProvider router={router} />;
};
export default Routes;
