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
  {
    title: "Dashboard",
    href: "dashboard",
    icon: Home,
  },
  {
    title: "All User Info",
    href: "all-user-info",
    icon: User,
  },
  {
    title: "All Keys",
    href: "all-keys",
    icon: FaAllergies,
  },
  {
    title: "Key Table",
    href: "key-table",
    icon: Table,
  },
  {
    title: "Subscribe Plan",
    href: "key-generate",
    icon: Key,
  },
  {
    title: "Payment History",
    href: "payment-history",
    icon: History,
  },
];

export function DashboardSidebar() {
  const [toggle, setToggle] = useState<boolean>(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { logout_user } = userStore();
  // _id can be fetched from wherever it's stored, e.g., from localStorage, context, or passed down via props
  const _id = "67dba028db1c02bb0270ffd7"; // Example _id value (replace with dynamic one as needed)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `https://guidemc.vercel.app/api/v1/user/single-user/${_id}`
        );
        const data = await response.json();
        if (data.success) {
          setUser(data.data[0]); // Assuming the user data is an array and the first item contains the user data
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };
    fetchUser();
  }, [_id]); // Depend on _id if it's dynamic

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

      {/* Overlay to prevent background interaction */}
      {toggle && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setToggle(false)}
        ></div>
      )}

      {/* Mobile Sidebar */}
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
              src="https://lh3.googleusercontent.com/a/ACg8ocJYO2z0aV3cT15IeV9_txuD04rcmJOVffuQD2WhH9OHs75WOyk=s288-c-no"
              alt="Profile picture"
              className="object-cover"
            />
          </div>
          <p className="font-semibold mt-3">
            Name: {loading ? "Loading..." : user?.name}
          </p>
          <p className="text-xs text-gray-400">
            Email: {loading ? "Loading..." : user?.email}
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
              onClick={() => setToggle(false)} // Close sidebar on click
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

      {/* Large Screens Sidebar */}
      <aside className="md:flex w-72 flex-col text-black border-r p-6 shadow-lg hidden">
        <div className="flex flex-col items-center border-b pb-6 mb-6">
          <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-gray-500">
            <img
              src="https://lh3.googleusercontent.com/a/ACg8ocJYO2z0aV3cT15IeV9_txuD04rcmJOVffuQD2WhH9OHs75WOyk=s288-c-no"
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

/* 
import { History, Home, Key, LogOut, Table, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  {
    title: "Home Dashboard",
    href: "dashboard",
    icon: Home,
  },
  {
    title: "User Info",
    href: "user-info",
    icon: User,
  },
  {
    title: "Key Table",
    href: "key-table",
    icon: Table,
  },
  {
    title: "Key Generate",
    href: "key-generate",
    icon: Key,
  },
  {
    title: "Payment History",
    href: "payment-history",
    icon: History,
  },
];

export function DashboardSidebar() {
  return (
    <aside className="flex w-96 flex-col border-r bg-white px-12">
      <div className="flex flex-col items-center border-y py-6">
        <div className="relative h-16 w-16 overflow-hidden rounded-full">
          <img
            src="https://lh3.googleusercontent.com/a/ACg8ocJYO2z0aV3cT15IeV9_txuD04rcmJOVffuQD2WhH9OHs75WOyk=s288-c-no"
            alt="Profile picture"
            width={80}
            height={80}
            className="object-cover"
          />
        </div>
        <p className="font-medium">Admin_Arfin Mia</p>
        <p className="text-xs text-gray-500">arfin.cse.edu.bd@gmail.com</p>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              "hover:bg-gray-500 hover:text-white",
              item.title === "Dashboard" &&
                "text-white hover:bg-[#1B8D1B] hover:text-white"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
        ))}
      </nav>

      <div className="p-4">
        <Button variant="ghost" className="w-full justify-start gap-3" asChild>
          <Link to="/logout">
            <LogOut className="h-4 w-4" />
            Logout
          </Link>
        </Button>
      </div>
    </aside>
  );
}

export default DashboardSidebar; */
