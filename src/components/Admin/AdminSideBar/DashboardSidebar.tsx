import { useEffect, useState } from "react";
import { History, Home, Key, LogOut, Table, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GoX } from "react-icons/go";
import { FcMenu } from "react-icons/fc";
import { FaAllergies } from "react-icons/fa";
import userStore from "@/store/userStore";
import useFetch from "@/hooks/shared/useFetch";

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
  { title: "Dashboard", href: "dashboard", icon: Home },
  { title: "All User Info", href: "all-user-info", icon: User },
  { title: "All Key Subscribtion", href: "all-keys", icon: FaAllergies },
  { title: "All User Keys", href: "key-table", icon: Table },
  { title: "Add Subscribe ", href: "key-generate", icon: Key },
  { title: "Payment History", href: "payment-history", icon: History },
];

export function DashboardSidebar() {
  const [toggle, setToggle] = useState<boolean>(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { data, isSuccess, isLoading, refetch } = useFetch("user/get-self");
  const { logout_user } = userStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (data?.success) {
          setUser(data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };
    fetchUser();
  }, [data]);

  return (
    <>
      <button
        className="md:hidden p-4 absolute top-4 left-4 z-50"
        onClick={() => setToggle(!toggle)}
      >
        {toggle ? (
          <GoX className="text-3xl text-white" />
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

      <motion.aside
        initial={{ opacity: 0, x: "-100%" }}
        animate={{
          opacity: toggle ? 1 : 0,
          x: toggle ? 0 : "-100%",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="md:hidden w-64 h-full fixed bg-gradient-to-r from-gray-800 to-gray-900 text-white border-r p-6 shadow-lg z-50"
      >
        <div className="flex flex-col items-center border-b pb-6 mb-6">
          <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-gray-500">
            <img
              src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
              alt="Profile picture"
              className="object-cover"
            />
          </div>
          <p className="font-semibold mt-3">
            {loading ? "Loading..." : user?.name}
          </p>
          <p className="text-xs text-gray-400">
            {loading ? "Loading..." : user?.email}
          </p>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-lg text-sm transition-all duration-300",
                "hover:bg-gray-700 hover:text-white"
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
            variant="ghost"
            className="w-full justify-start gap-3"
            asChild
          >
            <Link to="/logout">
              <LogOut className="h-5 w-5" />
              Logout
            </Link>
          </Button>
        </div>
      </motion.aside>

      <aside className="md:flex w-72 flex-col text-black border-r p-6 shadow-lg hidden">
        <div className="flex flex-col items-center border-b pb-6 mb-6">
          <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-gray-500">
            <img
              src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
              alt="Profile picture"
              className="object-cover"
            />
          </div>
          <p className="font-semibold mt-3">
            {loading ? "Loading..." : user?.name}
          </p>
          <p className="text-xs text-gray-800">
            {loading ? "Loading..." : user?.email}
          </p>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-lg text-sm transition-all duration-300",
                "hover:bg-gray-700 hover:text-white"
              )}
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
            className="w-full justify-start gap-3 hover:bg-gray-700 hover:text-white"
            asChild
          >
            <Link to="/logout">
              <LogOut className="h-5 w-5" />
              Logout
            </Link>
          </Button>
        </div>
      </aside>
    </>
  );
}

export default DashboardSidebar;
