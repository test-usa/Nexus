import DashboardContent from "@/components/Admin/AdminSideBar/DashboardContent";
import KeyManagementTable from "@/components/Admin/KeyManagementTable";
import KeyGeneratorForm from "@/components/Admin/KeyGeneratorForm";
import AdminLayout from "@/layout/AdminLayout";
import App from "@/pages/App";
import Home from "@/pages/Home";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import { createBrowserRouter } from "react-router-dom";
import PaymentHistory from "@/components/Admin/PaymentHistory";
import UserLayout from "@/layout/UserLayout";

import UserProfile from "@/components/User/UserProfile";
import UserPayment from "@/components/User/UserPayment";
import BuyingPage from "@/pages/BuyingPage";
import AllKeys from "@/components/Admin/AllKeys";
import AllUserInfo from "@/components/Admin/AllUserInfo";
import PaymentSuccess from "@/pages/paymentSucces";
import { MyKeys } from '../components/User/userKeys/MyKeys';
import PrivateRoute from './PrivateRoute';
import AdminPrivateRoute from './AdminPrivateRoute';

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
    ],
  },
  /* UserLayout */
  {
    path: "user",
    element: <PrivateRoute><UserLayout></UserLayout></PrivateRoute>,
    children: [
      {
        path: "profile",
        element: <PrivateRoute><UserProfile></UserProfile></PrivateRoute>,
      },
      {
        path: "my-key",
        element: <PrivateRoute><MyKeys/></PrivateRoute>,
      },
      {
        path: "user-payment",
        element: <PrivateRoute><UserPayment /></PrivateRoute>,
      },
    ],
  },

  {
    path: "/buy/:id",
    element: <BuyingPage />,
  },
  {
    path: "/payment-success",
    element: <PaymentSuccess />,
  },
  /* Admin Layout */
  {
    path: "admin",
    element: <AdminPrivateRoute><AdminLayout></AdminLayout></AdminPrivateRoute>,
    children: [
      {
        index: true,
        element: <AdminPrivateRoute><DashboardContent></DashboardContent></AdminPrivateRoute>,
      },
      {
        path: "dashboard",
        element: <AdminPrivateRoute><DashboardContent></DashboardContent></AdminPrivateRoute>,
      },
      {
        path: "all-user-info",
        element: <AdminPrivateRoute><AllUserInfo></AllUserInfo></AdminPrivateRoute>,
      },
      {
        path: "all-keys",
        element: <AdminPrivateRoute><AllKeys></AllKeys></AdminPrivateRoute>,
      },
      {
        path: "key-generate",
        element: <AdminPrivateRoute><KeyGeneratorForm></KeyGeneratorForm></AdminPrivateRoute>,
      },
      {
        path: "key-table",
        element: <AdminPrivateRoute><KeyManagementTable></KeyManagementTable></AdminPrivateRoute>,
      },
      {
        path: "payment-history",
        element: <AdminPrivateRoute><PaymentHistory /></AdminPrivateRoute>,
      },
    ],
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
]);

export default routes;
