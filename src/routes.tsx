import { Navigate, useRoutes } from "react-router-dom";
import { PrivateRoute } from "./utils/PrivateRoutes";
// layouts
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
// pages
import DashboardApp from "./pages/DashboardApp";
import Transaction from "./pages/Transaction";
import User from "./pages/User";
import Settings from "./pages/Settings";
import Page404 from "./pages/Page404";
import Login from "./pages/Login";
import Redirect from "./pages/Redirect";
import VaultedCard from "./pages/VaultedCard";
import PaymentPage from "./pages/PaymentPage";
import { useCheckAuthToken } from "./hooks/useCheckAuthToken";

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },

        {
          path: "app",
          element: (
            <PrivateRoute
              element={<DashboardApp />}
              isAuthenticated={useCheckAuthToken}
            />
          ),
        },

        {
          path: "transactions",
          element: (
            <PrivateRoute
              element={<Transaction />}
              isAuthenticated={useCheckAuthToken}
            />
          ),
        },

        {
          path: "users",
          element: (
            <PrivateRoute
              element={<User />}
              isAuthenticated={useCheckAuthToken}
            />
          ),
        },

        {
          path: "settings/:dealerId",
          element: (
            <PrivateRoute
              element={<Settings />}
              isAuthenticated={useCheckAuthToken}
            />
          ),
        },

        // {
        //   path: "vaulted-card",
        //   element: (
        //     <PrivateRoute
        //       element={<VaultedCard />}
        //       isAuthenticated={useCheckAuthToken}
        //     />
        //   ),
        // },
      ],
    },

    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        // {
        //   path: "vaulted-card",
        //   element: <VaultedCard />,
        // },
        {
          path: "settings/:dealerId",
          element: <Settings />,
        },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },

    {
      path: "payment-page",
      element: <PaymentPage />,
    },

    {
      path: "redirect",
      element: <Redirect />,
    },

    {
      path: "login",
      element: <Login />,
    },

    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
