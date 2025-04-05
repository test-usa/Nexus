import { GoX } from "react-icons/go";
import { FcMenu } from "react-icons/fc";
import { useState } from "react";
import { FaOpencart } from "react-icons/fa";
import { motion } from "framer-motion";
import CommonWrapper from "@/wrapper/CommonWrapper";
import { Link as ScrollLink } from "react-scroll";
import { NavLink } from "react-router-dom";
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

  return (
    <div className={`fixed z-50 w-full h-auto `}>
      <div id="nav-bar" className="">
        <CommonWrapper>
          <div className="w-full flex items-center gap-x-4 justify-between font-montserrat transform transition-all duration-200">
            {/***** IMAGE START *****/}
            <NavLink
              to="/"
              className="max-w-16 cursor-pointer hidden md:block "
            >
              <img
                src="https://i.postimg.cc/zfCvqNvy/exoduspro.png"
                alt="logo"
              />
            </NavLink>
            {/***** NAVIGATIONBAR START *****/}
            <div className="md:flex items-center lg:gap-x-8 gap-x-6 text-[var(--color-textsecondarycolor)] hidden">
              {/* // All other links are ScrollLink */}
              
                  <ScrollLink
                    smooth
                    duration={1200}
                    to="Feature"
                    className="text-[var(--color-textcolor)] hover:text-[#CDADFA] cursor-pointer translate transform duration-300 text-sm lg:text-[16px]"
                    activeClass="text-green-400 font-bold"
                  >
                    Feature
                  </ScrollLink>

              <ScrollLink
                smooth
                duration={1200}
                to="Review"
                className="text-[var(--color-textcolor)] hover:text-[#CDADFA] cursor-pointer translate transform duration-300 text-sm lg:text-[16px]"
              >
                Review
              </ScrollLink>
              {/* <ScrollLink
                smooth
                duration={1200}
                to="Pricing"
                className="text-[var(--color-textcolor)]  cursor-pointer translate transform duration-300 text-sm lg:text-[16px]"
              >
                Purchase
              </ScrollLink> */}

              <ScrollLink
                smooth
                duration={1200}
                to="FAQ"
                className="text-[var(--color-textcolor)] hover:text-[#CDADFA] cursor-pointer translate transform duration-300 text-sm lg:text-[16px]"
                activeClass="text-green-400 font-bold"
              >
                FAQ
              </ScrollLink>
              <NavLink
                to="/download"
                className="text-[var(--color-textcolor)] hover:text-[#CDADFA] cursor-pointer translate transform duration-300 text-sm lg:text-[16px]"
              >
                Download
              </NavLink>
              <NavLink
                to="/troubleshoot"
                className="text-[var(--color-textcolor)] hover:text-[#CDADFA] cursor-pointer translate transform duration-300 text-sm lg:text-[16px]"
              >
                Troubleshoot
              </NavLink>
              {user && (user as { role: string }).role === "ADMIN" && (
                <NavLink
                  to="/admin"
                  className="text-[var(--color-textcolor)] hover:text-[#CDADFA] cursor-pointer translate transform duration-300 text-sm lg:text-[16px]"
                >
                  Dashboard
                </NavLink>
              )}
              <NavLink
                to="Support"
                className="text-[var(--color-textcolor)] hover:text-[#CDADFA] cursor-pointer translate transform duration-300 text-sm lg:text-[16px]"
              >
                Support
              </NavLink>
            </div>

            {/**** AUTH OR PURCHASING ****/}
            <div className="md:flex items-center gap-x-4 text-gray-400 hidden">
              <ScrollLink
                smooth
                duration={1200}
                to="Pricing"
                className="flex items-center gap-x-2 text-[var(--color-textcolor)] transform transition-all duration-300 
                bg-gradient-to-r from-[#5c3991]  to-[#3a2b49] cursor-pointer py-2 px-2 xl:px-4 text-sm xl:text-[16px] 
                border border-transparent hover:border-[#CDADFA] 
                hover:bg-transparent hover:shadow-sm hover:shadow-[#CDADFA] rounded"
              >
                <FaOpencart />
                Purchase
              </ScrollLink>

              {user && token ? (
                <button
                  onClick={() => logout_user()}
                  className="text-[var(--color-textcolor)] transform transition-all duration-300 cursor-pointer 
                py-2 px-2 xl:px-4 text-sm xl:text-[16px] 
                border border-transparent hover:border-[#CDADFA] 
                hover:bg-transparent hover:shadow-sm hover:shadow-[#CDADFA] rounded
                bg-gradient-to-r from-[#5c3991]  to-[#3a2b49] "
                >
                  Sign out
                </button>
              ) : (
                <NavLink
                  to="/signin"
                  className="text-[var(--color-textcolor)] transform transition-all duration-300 cursor-pointer 
                  py-2 px-2 xl:px-4 text-sm xl:text-[16px] 
                  border border-transparent hover:border-[#CDADFA] 
                hover:bg-transparent hover:shadow-sm hover:shadow-[#CDADFA] rounded
                  bg-gradient-to-r from-[#5c3991]  to-[#3a2b49]"
                >
                  Signin
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
      <div className="relative lg:hidden block">
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
                  className="text-gray-400 transition-transform duration-300 text-[16px]"
                >
                  Feature
                </ScrollLink>
                <ScrollLink
                  to="Review"
                  smooth
                  duration={1200}
                  onClick={() => setToggle(false)}
                  className="text-gray-400 transition-transform duration-300 text-[16px]"
                >
                  Review
                </ScrollLink>
                <ScrollLink
                  to="Pricing"
                  smooth
                  duration={1200}
                  onClick={() => setToggle(false)}
                  className="text-gray-400 transition-transform duration-300 text-[16px]"
                >
                  Pricing
                </ScrollLink>

                <ScrollLink
                  to="FAQ"
                  smooth
                  duration={1200}
                  onClick={() => setToggle(false)}
                  className="text-gray-400 transition-transform duration-300 text-[16px]"
                >
                  FAQ
                </ScrollLink>

                <NavLink
                  to="/download"
                  onClick={() => setToggle(false)}
                  className="text-gray-400 cursor-pointer translate transform duration-300 text-sm lg:text-[16px]"
                >
                  Download
                </NavLink>
                <NavLink
                  to="/troubleshoot"
                  onClick={() => setToggle(false)}
                  className="text-gray-400 cursor-pointer translate transform duration-300 text-sm lg:text-[16px]"
                >
                  Troubleshoot
                </NavLink>

                <NavLink
                  to="Support"
                  className="text-gray-400 cursor-pointer translate transform duration-300 text-sm lg:text-[16px]"
                >
                  Support
                </NavLink>
                {user && (user as { role: string }).role === "ADMIN" && (
                  <NavLink
                    to="/admin"
                    onClick={() => setToggle(false)}
                    className="text-gray-400 cursor-pointer translate transform duration-300 text-sm lg:text-[16px]"
                  >
                    Dashboard
                  </NavLink>
                )}
              </>

              {user && token ? (
                <button
                  onClick={() => logout_user()}
                  className="text-gray-400 cursor-pointer translate transform duration-300 text-sm lg:text-[16px]"
                >
                  Sign out
                </button>
              ) : (
                <NavLink
                  to="/signin"
                  className="text-gray-400 cursor-pointer translate transform duration-300 text-sm lg:text-[16px]"
                >
                  Signin
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
