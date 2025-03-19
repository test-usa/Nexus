import App from "@/pages/App";
import Home from "@/pages/Home";
import Purchase from "@/pages/Purchase";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import { createBrowserRouter } from "react-router-dom";

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
