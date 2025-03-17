import { NavLink } from "react-router-dom";
import { GoX } from "react-icons/go";
import { FcMenu } from "react-icons/fc";
import { useState } from "react";
import { FaOpencart } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CommonWrapper from "@/wrapper/CommonWrapper";
const Navbar = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  console.log(toggle, "8 no line");
  return (
    <CommonWrapper>
      <div className="w-full h-16 flex items-center gap-x-4 justify-between font-montserrat">
        {/***** IMAGE START *****/}
        <div className="max-w-16">
          <img
            src="https://framerusercontent.com/images/VpiZF9i56wEWOzd8opBM90AzSfA.png"
            alt="logo"
          />
        </div>
        {/***** NAVIGATIONBAR START *****/}
        <div className="md:flex items-center lg:gap-x-8 gap-x-6 text-gray-400 hidden">
          <NavLink
            to=""
            className="hover:text-white translate transform duration-300 text-sm lg:text-[16px]"
          >
            Features
          </NavLink>
          <NavLink
            to=""
            className="hover:text-white translate transform duration-300 text-sm lg:text-[16px]"
          >
            Review
          </NavLink>
          <NavLink
            to=""
            className="hover:text-white translate transform duration-300 text-sm lg:text-[16px]"
          >
            Pricing
          </NavLink>
          <NavLink
            to=""
            className="hover:text-white translate transform duration-300 text-sm lg:text-[16px]"
          >
            FAQ
          </NavLink>
          <NavLink
            to=""
            className="hover:text-white translate transform duration-300 text-sm lg:text-[16px]"
          >
            Blog
          </NavLink>
          <NavLink
            to=""
            className="hover:text-white translate transform duration-300 text-sm lg:text-[16px]"
          >
            Support
          </NavLink>
        </div>

        {/**** AUTH OR PURCHASING ****/}
        <div className="md:flex items-center gap-x-4 text-gray-400 hidden">
          <Link
            to="/purchase"
            className="flex items-center gap-x-2 hover:text-white translate transform duration-300 bg-slate-800 hover:bg-slate-500 cursor-pointer py-2 px-2 lg:px-4 text-sm lg:text-[16px] border border-gray-600 rounded-md"
          >
            <FaOpencart />
            Purchase
          </Link>
          <Link
            to="/signin"
            className="bg-slate-800 hover:bg-slate-500 hover:text-white translate transform duration-300 cursor-pointer py-2 px-3 lg:px-4 text-sm lg:text-[16px] border border-gray-600 rounded-md"
          >
            SignIn
          </Link>
        </div>
        {/**** TOGGLE BAR, ONLY FOR SM-MD DEVICE ****/}
        <div className="relative md:hidden block">
          {/* Toggle Button */}
          <button onClick={() => setToggle(!toggle)} className="relative z-50">
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
            className={`fixed top-0 left-0 w-full h-dvh bg-black/60 backdrop-blur-lg text-white p-6 flex flex-col items-center justify-center ${
              toggle ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            <div className=" w-full h-dvh flex flex-col items-center justify-center">
              <div className="flex flex-col items-start gap-3">
                <NavLink
                  to=""
                  className="hover:text-white transition-transform duration-300 text-[16px]"
                >
                  Features
                </NavLink>
                <NavLink
                  to=""
                  className="hover:text-white transition-transform duration-300 text-[16px]"
                >
                  Review
                </NavLink>
                <NavLink
                  to=""
                  className="hover:text-white transition-transform duration-300 text-[16px]"
                >
                  Pricing
                </NavLink>
                <NavLink
                  to=""
                  className="hover:text-white transition-transform duration-300 text-[16px]"
                >
                  FAQ
                </NavLink>
                <NavLink
                  to=""
                  className="hover:text-white transition-transform duration-300 text-[16px]"
                >
                  Blog
                </NavLink>
                <NavLink
                  to=""
                  className="hover:text-white transition-transform duration-300 text-[16px]"
                >
                  Support
                </NavLink>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </CommonWrapper>
  );
};

export default Navbar;
