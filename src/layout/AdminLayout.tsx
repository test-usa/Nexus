import DashboardSidebar from "@/components/Admin/AdminSideBar/DashboardSidebar";
import { Outlet } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar (always visible on large screens, collapsible on small screens) */}
      <DashboardSidebar />

      {/* Main Content */}
      <main className="flex-1 mt-20 p-4  transition-all duration-300 ease-in-out">
        {/* This is where the routed content will be injected */}
        <Outlet />
      </main>
    </div>
  );
}
