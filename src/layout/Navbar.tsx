import { GoX } from "react-icons/go";
import { FcMenu } from "react-icons/fc";
import { useState } from "react";
import { FaOpencart } from "react-icons/fa";
import { motion } from "framer-motion";
import CommonWrapper from "@/wrapper/CommonWrapper";
import { Link as ScrollLink } from "react-scroll";
import { NavLink } from "react-router-dom";
import userStore from "@/store/userStore";
import logo from "../../public/image.png";
const Navbar = () => {
  const { user, logout_user } = userStore();
  const [toggle, setToggle] = useState<boolean>(false);
  const token = sessionStorage.getItem("token");

  // Add scroll effect for sticky navbar
  window.addEventListener("scroll", () => {
    const navbar = document.getElementById("nav-bar");
    if (window.scrollY > 50) {
      navbar?.classList?.add("bg-black/20", "backdrop-blur-lg");
      navbar?.classList?.remove("bg-transparent");
    } else {
      navbar?.classList?.add("bg-transparent");
      navbar?.classList?.remove("bg-black/20", "backdrop-blur-lg");
    }
  });

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
      id: 5,
      link: "FAQ",
    },
    {
      id: 6,
      link: "Support",
    },
    {
      id: 7,
      link: "Support",
    },
  ];

  return (
    <div className={`fixed z-50 w-full h-auto `}>
      <div id="nav-bar" className="">
        <CommonWrapper>
          <div className="w-full flex items-center gap-x-4 justify-between font-montserrat transform transition-all duration-200">
            {/***** IMAGE START *****/}
            <ScrollLink
              to="banner"
              smooth
              duration={1200}
              className="max-w-16 cursor-pointer"
            >
              <img src={logo} alt="logo" />
            </ScrollLink>
            {/***** NAVIGATIONBAR START *****/}
            <div className="md:flex items-center lg:gap-x-8 gap-x-6 text-gray-400 hidden">
              {/* // All other links are ScrollLink */}
              <ScrollLink
                smooth
                duration={1200}
                to="Feature"
                className="hover:text-white cursor-pointer translate transform duration-300 text-sm lg:text-[16px]"
                activeClass="text-green-400 font-bold"
              >
                Feature
              </ScrollLink>
              <ScrollLink
                smooth
                duration={1200}
                to="Review"
                className="hover:text-white cursor-pointer translate transform duration-300 text-sm lg:text-[16px]"
                activeClass="text-green-400 font-bold"
              >
                Review
              </ScrollLink>
              <ScrollLink
                smooth
                duration={1200}
                to="Pricing"
                className="hover:text-white cursor-pointer translate transform duration-300 text-sm lg:text-[16px]"
                activeClass="text-green-400 font-bold"
              >
                Pricing
              </ScrollLink>

              <ScrollLink
                smooth
                duration={1200}
                to="FAQ"
                className="hover:text-white cursor-pointer translate transform duration-300 text-sm lg:text-[16px]"
                activeClass="text-green-400 font-bold"
              >
                FAQ
              </ScrollLink>
              {user && (user as { role: string }).role === "ADMIN" && (
                <NavLink
                  to="/admin"
                  className="hover:text-white cursor-pointer translate transform duration-300 text-sm lg:text-[16px]"
                >
                  Dashboard
                </NavLink>
              )}
              {user && (user as { role: string }).role === "USER" && (
                <NavLink
                  to="/user"
                  className="hover:text-white cursor-pointer translate transform duration-300 text-sm lg:text-[16px]"
                >
                  Dashboard
                </NavLink>
              )}
              <NavLink
                to="Support"
                className="hover:text-white cursor-pointer translate transform duration-300 text-sm lg:text-[16px]"
              >
                Support
              </NavLink>
            </div>

            {/**** AUTH OR PURCHASING ****/}
            <div className="md:flex items-center gap-x-4 text-gray-400 hidden">
              <NavLink
                to="/buy"
                className="flex items-center gap-x-2 hover:text-white translate transform duration-300 bg-slate-800 hover:bg-slate-500 cursor-pointer py-2 px-2 lg:px-4 text-sm lg:text-[16px] border border-gray-600 rounded"
              >
                <FaOpencart />
                Purchase
              </NavLink>
              {user && token ? (
                <button
                  onClick={() => logout_user()}
                  className="bg-slate-800 hover:bg-slate-500 hover:text-white translate transform duration-300 cursor-pointer py-2 px-3 lg:px-4 text-sm lg:text-[16px] border border-gray-600 rounded"
                >
                  Sign out
                </button>
              ) : (
                <NavLink
                  to="/signup"
                  className="bg-slate-800 hover:bg-slate-500 hover:text-white translate transform duration-300 cursor-pointer py-2 px-3 lg:px-4 text-sm lg:text-[16px] border border-gray-600 rounded"
                >
                  Signup
                </NavLink>
              )}
            </div>

            <button
              onClick={() => setToggle(!toggle)}
              className="absolute right-0 z-50 md:hidden block"
            >
              {!toggle && (
                <FcMenu className="text-3xl cursor-pointer text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110" />
              )}
            </button>
          </div>
        </CommonWrapper>
      </div>
      {/**** TOGGLE BAR, ONLY FOR SM-MD DEVICE ****/}
      <div className="relative md:hidden block">
        {/* Toggle Bar */}
        <button
          onClick={() => setToggle(!toggle)}
          className="absolute right-3 -top-16 z-50 md:hidden block"
        >
          {toggle && (
            <GoX className="text-3xl cursor-pointer text-white transition-all duration-300 transform hover:scale-110" />
          )}
        </button>

        <motion.div
          initial={{ opacity: 0, x: "100%", backdropFilter: "blur(0px)" }}
          animate={{
            opacity: toggle ? 1 : 0,
            x: toggle ? 0 : "100%",
            backdropFilter: toggle ? "blur(50px)" : "blur(0px)",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`fixed h-screen top-0 left-0 w-full backdrop-blur-lg text-white flex flex-col items-center justify-center ${
            toggle ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <div className=" w-full h-full flex flex-col bg-black/50 items-center justify-center">
            <div className="flex flex-col items-start gap-3">
              <>
                {/* // All other links are ScrollLink */}
                <ScrollLink
                  to="Feature"
                  smooth
                  duration={1200}
                  onClick={() => setToggle(false)}
                  className="hover:text-white transition-transform duration-300 text-[16px]"
                >
                  Feature
                </ScrollLink>
                <ScrollLink
                  to="Review"
                  smooth
                  duration={1200}
                  onClick={() => setToggle(false)}
                  className="hover:text-white transition-transform duration-300 text-[16px]"
                >
                  Review
                </ScrollLink>
                <ScrollLink
                  to="Pricing"
                  smooth
                  duration={1200}
                  onClick={() => setToggle(false)}
                  className="hover:text-white transition-transform duration-300 text-[16px]"
                >
                  Pricing
                </ScrollLink>

                <ScrollLink
                  to="FAQ"
                  smooth
                  duration={1200}
                  onClick={() => setToggle(false)}
                  className="hover:text-white transition-transform duration-300 text-[16px]"
                >
                  FAQ
                </ScrollLink>
                {user && (user as { role: string }).role === "ADMIN" && (
                  <NavLink
                    to="/admin"
                    className="hover:text-white cursor-pointer translate transform duration-300 text-sm lg:text-[16px]"
                  >
                    Dashboard
                  </NavLink>
                )}
                {user && (user as { role: string }).role === "USER" && (
                  <NavLink
                    to="/user"
                    className="hover:text-white cursor-pointer translate transform duration-300 text-sm lg:text-[16px]"
                  >
                    Dashboard
                  </NavLink>
                )}
                <NavLink
                  to="Support"
                  className="hover:text-white cursor-pointer translate transform duration-300 text-sm lg:text-[16px]"
                >
                  Support
                </NavLink>
              </>

              {user && (user as { role: string }).role === "ADMIN" && (
                <NavLink
                  to="/admin"
                  className="hover:text-white cursor-pointer translate transform duration-300 text-sm lg:text-[16px]"
                >
                  Dashboard
                </NavLink>
              )}
              {user && (user as { role: string }).role === "USER" && (
                <NavLink
                  to="/user"
                  className="hover:text-white cursor-pointer translate transform duration-300 text-sm lg:text-[16px]"
                >
                  Dashboard
                </NavLink>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Navbar;
