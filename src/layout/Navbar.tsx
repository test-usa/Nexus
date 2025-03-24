import { GoX } from "react-icons/go";
import { FcMenu } from "react-icons/fc";
import { useState } from "react";
import { FaOpencart } from "react-icons/fa";
import { motion } from "framer-motion";
import CommonWrapper from "@/wrapper/CommonWrapper";
import { Link as ScrollLink } from "react-scroll";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import userStore from "@/store/userStore";
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
              <img
                src="https://framerusercontent.com/images/VpiZF9i56wEWOzd8opBM90AzSfA.png"
                alt="logo"
              />
            </ScrollLink>
            {/***** NAVIGATIONBAR START *****/}
            <div className="md:flex items-center lg:gap-x-8 gap-x-6 text-gray-400 hidden">
              {links?.map((link, index) =>
                index === links.length - 1 ? (
                  // Last link should be a NavLink
                  <NavLink
                    key={link.id}
                    to={link?.link}
                    className="hover:text-white cursor-pointer translate transform duration-300 text-sm lg:text-[16px]"
                  >
                    {link?.link}
                  </NavLink>
                ) : (
                  // All other links are ScrollLink
                  <ScrollLink
                    key={link.id}
                    smooth
                    duration={1200}
                    to={link?.link}
                    className="hover:text-white cursor-pointer translate transform duration-300 text-sm lg:text-[16px]"
                    activeClass="text-green-400 font-bold"
                  >
                    {link?.link}
                  </ScrollLink>
                )
              )}
            </div>

            {/**** AUTH OR PURCHASING ****/}
            <div className="md:flex items-center gap-x-4 text-gray-400 hidden">
              <ScrollLink
                to="Pricing"
                smooth
                duration={1200}
                className="flex items-center gap-x-2 hover:text-white translate transform duration-300 bg-slate-800 hover:bg-slate-500 cursor-pointer py-2 px-2 lg:px-4 text-sm lg:text-[16px] border border-gray-600 rounded-md"
              >
                <FaOpencart />
                Purchase
              </ScrollLink>
              {user && token ? (
                <button
                  onClick={() => logout_user()}
                  className="bg-slate-800 hover:bg-slate-500 hover:text-white translate transform duration-300 cursor-pointer py-2 px-3 lg:px-4 text-sm lg:text-[16px] border border-gray-600 rounded-md"
                >
                  Sign out
                </button>
              ) : (
                <NavLink
                  to="/signup"
                  className="bg-slate-800 hover:bg-slate-500 hover:text-white translate transform duration-300 cursor-pointer py-2 px-3 lg:px-4 text-sm lg:text-[16px] border border-gray-600 rounded-md"
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
              {links?.map((link) => {
                return (
                  <Link
                    key={link.id}
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
  );
};

export default Navbar;
