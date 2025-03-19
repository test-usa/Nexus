import { GoX } from "react-icons/go";
import { FcMenu } from "react-icons/fc";
import { useEffect, useState } from "react";
import { FaOpencart } from "react-icons/fa";
import { motion } from "framer-motion";
import CommonWrapper from "@/wrapper/CommonWrapper";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<boolean>(false);
  // Add scroll effect for sticky navbar
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setScrollY(true);
      } else {
        setScrollY(false);
      }
    });
  }, []);

  const links = [
    {
      id: 1,
      link: "Feature",
    },
    {
      id: 2,
      link: "Review",
    },
    {
      id: 3,
      link: "Pricing",
    },
    {
      id: 4,
      link: "Blog",
    },
    {
      id: 5,
      link: "FAQ",
    },
    {
      id: 6,
      link: "Support",
    },
  ];

  return (
    <div
      className={`${
        scrollY ? "bg-black/20 backdrop-blur-lg fixed z-30 w-full transform translate-all duration-200" : "bg-transparent"
      }`}
    >
      <CommonWrapper>
        <div className="w-full flex items-center gap-x-4 justify-between font-montserrat">
          {/***** IMAGE START *****/}
          <div className="max-w-16">
            <img
              src="https://framerusercontent.com/images/VpiZF9i56wEWOzd8opBM90AzSfA.png"
              alt="logo"
            />
          </div>
          {/***** NAVIGATIONBAR START *****/}
          <div className="md:flex items-center lg:gap-x-8 gap-x-6 text-gray-400 hidden">
            {links?.map((link) => {
              return (
                <Link
                  smooth
                  duration={1200}
                  to={link?.link}
                  className="hover:text-white cursor-pointer translate transform duration-300 text-sm lg:text-[16px]"
                >
                  {link?.link}
                </Link>
              );
            })}
          </div>

          {/**** AUTH OR PURCHASING ****/}
          <div className="md:flex items-center gap-x-4 text-gray-400 hidden">
            <NavLink
              to="/purchase"
              className="flex items-center gap-x-2 hover:text-white translate transform duration-300 bg-slate-800 hover:bg-slate-500 cursor-pointer py-2 px-2 lg:px-4 text-sm lg:text-[16px] border border-gray-600 rounded-md"
            >
              <FaOpencart />
              Purchase
            </NavLink>
            <NavLink
              to="/signup"
              className="bg-slate-800 hover:bg-slate-500 hover:text-white translate transform duration-300 cursor-pointer py-2 px-3 lg:px-4 text-sm lg:text-[16px] border border-gray-600 rounded-md"
            >
              Signup
            </NavLink>
          </div>
          {/**** TOGGLE BAR, ONLY FOR SM-MD DEVICE ****/}
          <div className="relative md:hidden block">
            {/* Toggle Button */}
            <button
              onClick={() => setToggle(!toggle)}
              className="relative z-50"
            >
              {toggle ? (
                <GoX className="text-3xl cursor-pointer text-white transition-all duration-300 transform hover:scale-110" />
              ) : (
                <FcMenu className="text-3xl cursor-pointer text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110" />
              )}
            </button>

            {/* Toggle Bar */}
            <motion.div
              initial={{ opacity: 0, x: "100%", backdropFilter: "blur(0px)" }}
              animate={{
                opacity: toggle ? 1 : 0,
                x: toggle ? 0 : "100%",
                backdropFilter: toggle ? "blur(10px)" : "blur(0px)",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`fixed top-0 left-0 w-full z-20 bg-black/50 backdrop-blur-lg text-white p-6 flex flex-col items-center justify-center ${
                toggle ? "pointer-events-auto" : "pointer-events-none"
              }`}
            >
              <div className=" w-full h-screen flex flex-col items-center justify-center">
                <div className="flex flex-col items-start  gap-3">
                  {links?.map((link) => {
                    return (
                      <Link
                        to={link?.link}
                        className="hover:text-white transition-transform duration-300 text-[16px]"
                      >
                        {link?.link}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default Navbar;
