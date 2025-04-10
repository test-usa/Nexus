import DashboardContent from "@/components/Admin/AdminSideBar/DashboardContent";
import KeyGeneratorForm from "@/components/Admin/KeyGeneratorForm";
import AdminLayout from "@/layout/AdminLayout";
import App from "@/pages/App";
import Home from "@/pages/Home";
import SignIn from "@/pages/SignIn";
// import SignUp from "@/pages/SignUp";
import { createBrowserRouter } from "react-router-dom";
import PaymentHistory from "@/components/Admin/PaymentHistory";
// import UserLayout from "@/layout/UserLayout";
// import UserProfile from "@/components/User/UserProfile";
// import UserPayment from "@/components/User/UserPayment";
import BuyingPage from "@/pages/BuyingPage";
import AllKeys from "@/components/Admin/AllKeys";
import AllUserInfo from "@/components/Admin/AllUserInfo";
// import { MyKeys } from "../components/User/userKeys/MyKeys";
// import PrivateRoute from "./PrivateRoute";
import AdminPrivateRoute from "./AdminPrivateRoute";
import Purchase from "@/pages/Purchase";
import PaymentSuccess from "@/pages/paymentSucces";
import Success from "@/pages/Success";
import DownloadInstallProcess from "@/components/Home/DownloadInstallProcess";
import Troubleshoot from "@/components/Home/Troubleshoot";
import KeyManagement from "@/components/Admin/UserkeyTable/userKeys";
import GeneratedKeys from "@/components/Admin/GeneratedKeyTable/GeneratedKeyTable";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: "not found page",
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "download",
        element: <DownloadInstallProcess />,
      },
      {
        path: "troubleshoot",
        element: <Troubleshoot />,
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path: "/buy/:id",
        element: <BuyingPage />,
      },
    ],
  },
  /* UserLayout */
  // {
  //   path: "user",
  //   element: (
  //     <PrivateRoute>
  //       <UserLayout />
  //     </PrivateRoute>
  //   ),
  //   children: [
  //     {
  //       path: "profile",
  //       element: (
  //         <PrivateRoute>
  //           <UserProfile />
  //         </PrivateRoute>
  //       ),
  //     },
  //     {
  //       path: "my-key",
  //       element: (
  //         <PrivateRoute>
  //           <MyKeys />
  //         </PrivateRoute>
  //       ),
  //     },
  //     {
  //       path: "user-payment",
  //       element: (
  //         <PrivateRoute>
  //           <UserPayment />
  //         </PrivateRoute>
  //       ),
  //     },
  //   ],
  // },

  {
    path: "/payment-success",
    element: <PaymentSuccess />,
  },
  {
    path: "/buy",
    element: <Purchase />,
  },

  /* Admin Layout */
  {
    path: "admin",
    element: (
      <AdminPrivateRoute>
        <AdminLayout />
      </AdminPrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <AdminPrivateRoute>
            <DashboardContent />
          </AdminPrivateRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <AdminPrivateRoute>
            <DashboardContent />
          </AdminPrivateRoute>
        ),
      },
      {
        path: "all-user-info",
        element: (
          <AdminPrivateRoute>
            <AllUserInfo />
          </AdminPrivateRoute>
        ),
      },
      {
        path: "all-keys",
        element: (
          <AdminPrivateRoute>
            <AllKeys />
          </AdminPrivateRoute>
        ),
      },
      {
        path: "my-generated-keys",
        element: (
          <AdminPrivateRoute>
            {/* <GeneratedKeyTable /> */}
            <GeneratedKeys />
          </AdminPrivateRoute>
        ),
      },
      {
        path: "key-generate",
        element: (
          <AdminPrivateRoute>
            <KeyGeneratorForm />
          </AdminPrivateRoute>
        ),
      },
      {
        path: "key-table",
        element: (
          <AdminPrivateRoute>
            <KeyManagement />
          </AdminPrivateRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <AdminPrivateRoute>
            <PaymentHistory />
          </AdminPrivateRoute>
        ),
      },
    ],
  },
  // {
  //   path: "/signup",
  //   element: <SignUp />,
  // },
  {
    path: "/signin",
    element: <SignIn />,
  },
]);

export default routes;
