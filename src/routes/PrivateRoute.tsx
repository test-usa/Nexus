import userStore from "@/store/userStore";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { user } = userStore();
  if (user) {
    return children;
  }

  return <Navigate state={location?.pathname} to="/login" replace></Navigate>;
};

export default PrivateRoute;
