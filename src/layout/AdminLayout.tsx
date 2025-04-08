import DashboardSidebar from "@/components/Admin/AdminSideBar/DashboardSidebar";
import { Outlet } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen font-manrope bg-[var(--color-dashboardbg)]">
      {/* Sidebar  */}
      <DashboardSidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto  font-manrope min-h-screen  transition-all duration-300 bg-[var(--color-dashboardbg)] ease-in-out">
        <Outlet />
      </main>
    </div>
  );
}
