import UserSidebar from "@/components/User/UserSideBar/UserSidebar";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <div className="flex min-h-screen">
      <UserSidebar />
      <main className="flex-1 mt-20 p-4  transition-all duration-300 ease-in-out">
        <Outlet />
      </main>
    </div>
  );
}
