import userStore from "@/store/userStore";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";


interface User {
  role: string;

}

const AdminPrivateRoute = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { user } = userStore();

  function isUser(obj: any): obj is User {
    return obj && typeof obj === "object" && "role" in obj;
  }

  if (isUser(user) && user.role === "ADMIN") {
    return children;
  }

  return <Navigate state={location?.pathname} to="/adminlogin" replace />;
};

export default AdminPrivateRoute;
