import DashboardContent from "@/components/Admin/AdminSideBar/DashboardContent";
import KeyManagementTable from "@/components/Admin/KeyManagementTable";
import KeyGeneratorForm from "@/components/Admin/KeyGeneratorForm";
import AdminLayout from "@/layout/AdminLayout";
import App from "@/pages/app";
import Home from "@/pages/Home";
import Purchase from "@/pages/Purchase";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import { createBrowserRouter } from "react-router-dom";
import UserData from "@/components/Admin/UserData";
import PaymentHistory from "@/components/Admin/PaymentHistory";

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
        path: "/purchase",
        element: <Purchase />,
      },
    ],
  },
  /* Admin Layout */
  {
    path: "admin",
    element: <AdminLayout></AdminLayout>,
    children: [
      {
        path: "dashboard",
        element: <DashboardContent></DashboardContent>,
      },
      {
        path: "user-info",
        element: <UserData></UserData>,
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
