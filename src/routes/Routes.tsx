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
import UserDashboard from "@/components/User/UserSideBar/UserDashboard";
import UserProfile from "@/components/User/UserProfile";
import MyOrder from "@/components/User/MyOrder";
import UserPayment from "@/components/User/UserPayment";
import BuyingPage from "@/pages/BuyingPage";
import AllKeys from "@/components/Admin/AllKeys";
import AllUserInfo from "@/components/Admin/AllUserInfo";

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
    element: <UserLayout></UserLayout>,
    children: [
      {
        index: true,
        element: <UserDashboard></UserDashboard>,
      },
      {
        path: "dashboard",
        element: <UserDashboard></UserDashboard>,
      },
      {
        path: "profile",
        element: <UserProfile></UserProfile>,
      },
      {
        path: "my-key",
        element: <MyOrder></MyOrder>,
      },
      {
        path: "user-payment",
        element: <UserPayment />,
      },
    ],
  },

  {
    path: "/buy/:id",
    element: <BuyingPage />,
  },
  /* Admin Layout */
  {
    path: "admin",
    element: <AdminLayout></AdminLayout>,
    children: [
      {
        index: true,
        element: <DashboardContent></DashboardContent>,
      },
      {
        path: "dashboard",
        element: <DashboardContent></DashboardContent>,
      },
      {
        path: "all-user-info",
        element: <AllUserInfo></AllUserInfo>,
      },
      {
        path: "all-keys",
        element: <AllKeys></AllKeys>,
      },
      {
        path: "key-generate",
        element: <KeyGeneratorForm></KeyGeneratorForm>,
      },
      {
        path: "key-table",
        element: <KeyManagementTable></KeyManagementTable>,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
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
