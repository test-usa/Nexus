import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { GoX } from "react-icons/go";
import { FcMenu } from "react-icons/fc";
import { GiHouseKeys } from "react-icons/gi";
import { LuGitPullRequestCreateArrow } from "react-icons/lu";
import { IoMdLogOut } from "react-icons/io";

import userStore from "@/store/userStore";
import useFetch from "@/hooks/shared/useFetch";
import { MdDashboard, MdPayments } from "react-icons/md";
import { FaInfo, FaUsers } from "react-icons/fa6";

interface UserData {
  name: string;
  email: string;
  role: string;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { title: "Dashboard", href: "dashboard", icon: MdDashboard },
  { title: "All User Info", href: "all-user-info", icon: FaUsers },
  { title: "All Key Subscription", href: "all-keys", icon: GiHouseKeys },
  { title: "All User Keys", href: "key-table", icon: FaInfo },
  {
    title: "Create Subscription",
    href: "key-generate",
    icon: LuGitPullRequestCreateArrow,
  },
  { title: "Payment History", href: "payment-history", icon: MdPayments },
];

export function DashboardSidebar() {
  const [toggle, setToggle] = useState<boolean>(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { data } = useFetch("user/get-self");
  const { logout_user } = userStore();
  const location = useLocation();

  useEffect(() => {
    if (data?.success) {
      setUser(data.data);
      setLoading(false);
    }
  }, [data]);

  return (
    <div className="h-full">
      <button
        className="md:hidden p-4 fixed top-4 left-8 z-50"
        onClick={() => setToggle(!toggle)}
      >
        {toggle ? (
          <GoX className="text-3xl text-red-700" />
        ) : (
          <FcMenu className="text-3xl text-gray-800" />
        )}
      </button>

      {toggle && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setToggle(false)}
        ></div>
      )}
      {/* Mobile Sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: "-100%" }}
        animate={{ opacity: toggle ? 1 : 0, x: toggle ? 0 : "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="md:hidden w-74 h-screen fixed bg-[var(--color-bghovercolor)] text-gray-700 border-r border-gray-600 p-6 shadow-lg z-50 flex flex-col"
      >
        <button
          className="absolute top-4 right-4 text-gray-700 text-2xl"
          onClick={() => setToggle(false)}
        >
          <GoX />
        </button>
        {/* Mobile: Admin Logo And User Name Email */}
        <div className="flex flex-col items-center border-b border-gray-700 pb-6 mb-6">
          <motion.div
            className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-blue-500"
            whileHover={{
              scale: 1.15,
              transition: { duration: 0.3 },
            }}
            style={{
              boxShadow: "0 0 30px rgba(135, 206, 235, 0.5)",
            }}
          >
            <img
              src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
              alt="Profile picture"
              className="object-cover p-1"
            />
          </motion.div>

          <p className="font-semibold mt-3 text-[18px] text-[var(--color-textcolor)]">
            {loading ? "Loading..." : user?.name}
          </p>
          <p className="text-xs text-[16px] text-[var(--color-textsecondarycolor)]">
            {loading ? "Loading..." : user?.email}
          </p>
        </div>

        <nav className="flex-grow space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded text-sm transition-all duration-300",
                location.pathname.includes(item.href)
                  ? "bg-[var(--color-bghovercolor)] text-[var(--color-hovertext)]"
                  : "hover:bg-[var(--color-bghovercolor)] hover:text-[var(--color-hovertext)] text-[var(--color-textsecondarycolor)]"
              )}
              onClick={() => setToggle(false)}
            >
              <item.icon className="h-5 w-5" />
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="mt-auto">
          <Button
            onClick={() => logout_user()}
            variant="destructive"
            className="w-full bg-[var(--color-dashboardsecondary)] text-[var(--color-textcolor)] hover:text-[var(--color-hovertext)] justify-start gap-3 hover:bg-[var(--color-bghovercolor)] "
            asChild
          >
            <Link to="/logout">
              <IoMdLogOut className="h-5 w-5" />
              Logout
            </Link>
          </Button>
        </div>
      </motion.aside>
      {/* Desktop Sidebar */}
      <aside className="md:flex w-72 flex-col text-[var(--color-textcolor)] border-r border-gray-700 p-6  hidden h-screen">
        {/* Desktop: Admin Logo And User Name Email */}
        <div className="flex flex-col items-center border-b border-gray-700 pb-6 mb-6">
          <motion.div
            className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-blue-500 transition-all duration-300 transform perspective-1000"
            whileHover={{
              scale: 1.15,
              boxShadow: "0 0 30px rgba(135, 206, 235, 0.5)",
              transition: { duration: 0.6 },
            }}
          >
            <img
              src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
              alt="Profile picture"
              className="object-cover p-1"
            />
          </motion.div>

          <p className="font-semibold mt-3 text-[18px] text-[var(--color-textcolor)]">
            {loading ? "Loading..." : user?.name}
          </p>
          <p className="text-xs text-[16px] text-[var(--color-textsecondarycolor)]">
            {loading ? "Loading..." : user?.email}
          </p>
        </div>

        <nav className="flex-grow space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded text-sm transition-all duration-300",
                location.pathname.includes(item.href)
                  ? "bg-[var(--color-bghovercolor)] text-[var(--color-hovertext)]"
                  : "hover:bg-[var(--color-bghovercolor)] hover:text-[var(--color-hovertext)] text-[var(--color-textsecondarycolor)]"
              )}
            >
              <item.icon className="h-5 w-5 text-[16px]" />
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="mt-auto">
          <Button
            onClick={() => logout_user()}
            variant="destructive"
            className="w-full bg-[var(--color-dashboardsecondary)] text-[var(--color-textcolor)] hover:text-[var(--color-hovertext)] justify-start gap-3 hover:bg-[var(--color-bghovercolor)]  "
            asChild
          >
            <Link to="/logout">
              <IoMdLogOut className="h-5 w-5" />
              Logout
            </Link>
          </Button>
        </div>
      </aside>
    </div>
  );
}

export default DashboardSidebar;
