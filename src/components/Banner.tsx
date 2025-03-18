import CommonWrapper from "@/wrapper/CommonWrapper";
import { motion } from "framer-motion";
const Banner = () => {
  return (
    <div className="font-montserrat">
      <CommonWrapper>
        <div>
          {/**** TEXT SECTION ****/}
          <div className="space-y-5 text-center">
            <h1 className="text-white text-[30px] sm:text-5xl text-center ">
              The fastest Edgenuity bot.
            </h1>
            <p className="w-5/6 sm:w-2/3 px-10 text-center text-sm sm:text-[16px] mx-auto text-gray-500">
              Get your classes done fast with Nexus. Nexus is a fully
              customizable Edgenuity bot, designed to advance through your
              classes with ease.
            </p>
            <motion.div
              initial="initial"
              whileHover="hovered"
              className="group inline-block relative overflow-hidden whitespace-nowrap"
            >
              <button className="relative overflow-hidden block cursor-pointer text-white text-sm rounded-full bg-gradient-to-bl from-gray-600 to-slate-800 py-2.5 px-4 sm:py-3 sm:px-5 transform transition-all duration-300 shadow-md border border-transparent hover:border-white/50">
                {/* Motion Text (Sliding Out) */}
                <motion.span
                  variants={{
                    initial: { y: 0 },
                    hovered: { y: -100 },
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="relative z-10 block"
                >
                  Purchase Now
                </motion.span>

                {/* Motion Background (Sliding In) */}
                <motion.span
                  variants={{
                    initial: { y: 100 },
                    hovered: { y: 0 },
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-slate-400 to-gray-700 text-white"
                >
                  Purchase Now
                </motion.span>
              </button>
            </motion.div>
          </div>
          {/**** BANNER DESGIN SECTION ****/}
          <div>
            <div className="relative p-1 my-10 rounded-sm bg-gradient-to-r from-gray-500 to-slate-800 via-green-700">
              <div className="bg-[#212020] rounded-sm p-28 border-2 border-transparent bg-clip-padding ">
                {/**** BANNER TEXT SECTION ****/}
                <div className="w-[50%] space-y-3">
                  <h1 className="text-white text-[16px] sm:text-3xl">
                    Welcome to{" "}
                    <span className="text-xl sm:text-3xl text-orange-400 font-semibold">
                      Nexus
                    </span>
                  </h1>
                  <p className=" text-xs sm:text-[16px] text-gray-500">
                    EdgyPro is a powerful tool for online schools like
                    Edgenuity, helping students complete courses faster and
                    learn more efficiently.
                  </p>
                </div>
              </div>
            </div>
            {/**** BANNER CARD SECTION ****/}
            <div className="bg-slate-600/20 backdrop-blur-lg w-[35%] rounded-lg p-4 border border-transparent hover:border-gray-400 transform translate-all duration-200  hover:-rotate-z-2 -rotate-3 skew-y-3">
            {/* hover:-rotate-z-2 -rotate-3 skew-y-3 */}
              <div className="flex items-center gap-x-2">
                <img
                  src="https://framerusercontent.com/images/VpiZF9i56wEWOzd8opBM90AzSfA.png"
                  alt="logo"
                  className="max-w-14"
                />
                <div className="space-y-3">
                  <h1 className="text-sm  text-white font-semibold">Nexus</h1>
                  <p className="text-sm text-white">
                    Service key expires{" "}
                    <span className="font-semibold">1/3/2025</span> at{" "}
                    <span className="font-semibold">5.30 PM</span>
                  </p>
                </div>
              </div>
              <div className="bg-gray-900">
                
              </div>
            </div>
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default Banner;
