import CommonWrapper from "@/wrapper/CommonWrapper";
import { CiSettings } from "react-icons/ci";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Slider from "react-slick";

const Banner = () => {
  const [service, setService] = useState([]);
  useEffect(() => {
    fetch("/service.json")
      .then((res) => res.json())
      .then((data) => setService(data));
  }, []);

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    pauseOnHover: true,
    arrows: false,
    centerMode: true,
    centerPadding: "0px",
    touchMove: true,
  };

  const images = [
    "https://tse3.mm.bing.net/th?id=OIP.ZB6sumZwwAtmZHx-xS0SCwAAAA&pid=Api",
    "https://tse2.mm.bing.net/th?id=OIP.SYHwXVZzL2474mDA_3frgAHaFt&pid=Api",
    "https://tse2.mm.bing.net/th?id=OIP.7pbaYFsnAEXn266BHappVwHaEK&pid=Api",
    "https://tse1.mm.bing.net/th?id=OIP.P5ncWi8Xay4tKTScsH3lygHaEK&pid=Api",
  ];
  return (
    <div className="font-montserrat">
      <CommonWrapper>
        <div className="">
          {/**** TEXT SECTION ****/}
          <div className="space-y-5 text-center">
            <h1
              className="text-4xl sm:text-5xl text-center
               text-white"
            >
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
          {/**** BANNER WITH CARD DESGIN SECTION (ONLY FOR LG++ DEVICE) ****/}
          <div className="relative group mt-12 lg:block hidden">
            <div className="relative p-1 my-10 rounded-sm bg-gradient-to-r from-gray-500 to-slate-800 via-green-700">
              <div className="bg-[#212020] rounded-sm p-32 border-2 border-transparent bg-clip-padding ">
                {/**** BANNER TEXT SECTION ****/}
                <div className="w-[60%] space-y-3">
                  <h1 className="text-white text-[16px] sm:text-3xl">
                    Welcome to{" "}
                    <span className="text-xl sm:text-3xl bg-gradient-to-tr from-gray-600 to-gray-400 text-transparent  bg-clip-text font-semibold">
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
            <div className="absolute -top-8 right-6 bg-slate-800/10 backdrop-blur-lg w-[33%] rounded-lg p-4 border border-transparent group-hover:border-gray-400 transform translate-all duration-200  group-hover:-rotate-z-2  -skew-y-2">

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

              <div className="space-y-3 w-full">
                <div className="bg-gray-900 flex items-center gap-1 xl:gap-5 mt-3 w-full">
                  <button className="cursor-pointer text-xs sm:text-sm bg-gradient-to-r from-gray-500 to-slate-800 via-green-700 text-white font-semibold py-2 px-3 xl:py-2.5 xl:px-6">
                    Features
                  </button>
                  <button className="cursor-pointer text-sm  text-white font-semibold py-2.5 px-6">
                    Settings
                  </button>
                  <button className="cursor-pointer text-sm text-white font-semibold py-2.5 px-6">
                    About
                  </button>
                </div>
                <div className="bg-gray-900 space-y-3 w-full p-2">
                  {service?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gradient-to-r from-gray-500 to-slate-800 via-green-700 rounded-lg px-4 py-1.5"
                      >
                        <h1 className="text-sm font-semibold text-white">
                          {item?.name}
                        </h1>
                        <CiSettings className="text-white text-2xl group-hover:animate-spin" />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-gray-900"></div>

            </div>
          </div>
          {/**** FOR MOBILE AND TABLE DEVICE ONLY ****/}
          <div className="slider-container cursor-pointer lg:hidden block mt-12">
            <Slider {...settings}>
            {images.map((src, index) => (
            <div key={index} className="p-2">
              <img src={src} alt={`Nexus Slide ${index + 1}`} className="rounded-xl min-w-[290px] mx-auto h-[250px] shadow-lg" />
            </div>
          ))}
            </Slider>
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default Banner;
