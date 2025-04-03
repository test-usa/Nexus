import CommonWrapper from "@/wrapper/CommonWrapper";
import { CiSettings } from "react-icons/ci";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { Element, Link } from "react-scroll";
import Video from "../Video";
import { gsap } from "gsap";
import MainLogo from "../../../../public/mainLogo.png";
const Banner = () => {
  const [service, setService] = useState([]);
  const [toggle, setToggle] = useState<boolean>(false);
  useEffect(() => {
    fetch("/service.json")
      .then((res) => res.json())
      .then((data) => setService(data));
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll(".feature-card");

    gsap.fromTo(
      cards,
      { x: "-100%", opacity: 1 }, // Start from left side
      {
        x: "0%", // Move to normal position
        opacity: 1,
        duration: 3,
        ease: "power3.out",
      }
    );
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
    "https://tse2.mm.bing.net/th?id=OIP.7pbaYFsnAEXn266BHappVwHaEK&pid=Api",
    "https://tse1.mm.bing.net/th?id=OIP.P5ncWi8Xay4tKTScsH3lygHaEK&pid=Api",
  ];

  return (
    <Element name="banner" className="font-montserrat">
      <CommonWrapper>
        <div className="mt-44">
          <div className="flex group items-center   justify-between">
            {/**** TEXT SECTION ****/}
            <div className="space-y-5 lg:text-start text-center">
              <h1
                className="text-4xl sm:text-5xl
                 inline-block
               text-white"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-slate-600 via-green-400">
                  ExoBot
                </span>{" "}
                Fastest Edgenuity Bot.
              </h1>
              <p className=" w-5/6 sm:w-2/3 lg:mx-0 mx-auto text-sm sm:text-[16px] text-gray-500">
                ExoBot is your ultimate companion for online learning,
                turbocharging your Edgenuity experience by helping you breeze
                through courses faster and master the material with ease.
              </p>
              <div className="flex items-center justify-center lg:justify-self-start gap-5">
                <Link
                  smooth
                  duration={1200}
                  to="Pricing"
                  className="relative inline-block hover:shadow-lg hover:shadow-cyan-800 overflow-hidden  cursor-pointer text-white text-sm rounded bg-gradient-to-bl from-gray-600 to-slate-800 py-2.5 px-4 sm:py-3 sm:px-5 transform transition-all duration-300 shadow-md border border-transparent hover:border-white/50"
                >
                  Purchase Now
                </Link>
                <button
                  onClick={() => setToggle(!toggle)}
                  className="relative inline-block hover:shadow-lg hover:shadow-cyan-800 overflow-hidden  cursor-pointer text-white text-sm rounded bg-gradient-to-bl from-gray-600 to-slate-800 py-2.5 px-4 sm:py-3 sm:px-5 transform transition-all duration-300 shadow-md border border-transparent hover:border-white/50"
                >
                  Quick setup
                </button>
              </div>
            </div>

            {/**** BANNER CARD SECTION ****/}
            <div className="feature-card backdrop-blur-2xl lg:block hidden border border-white/20 rounded p-4  group-hover:border-cyan-500 transform translate-all duration-200  group-hover:-rotate-z-3 -skew-y-2 group-hover:shadow-lg group-hover:drop-shadow-lg group-hover:shadow-cyan-500 ">
              {/* hover:-rotate-z-2 -rotate-3 skew-y-3 */}
              <div className="flex items-center gap-x-2">
                <img
                  src={MainLogo}
                  alt="logo"
                  className="max-w-14 rounded-xl"
                />
                <div className="space-y-3">
                  <h1 className="text-sm  text-white font-semibold">Exobot</h1>
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
                  {service?.map((item: any, index) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gradient-to-r from-gray-500 to-slate-800 via-green-700 rounded px-4 py-1.5"
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
            </div>
          </div>
          {toggle && <Video isModalOpen={toggle} setModalOpen={setToggle} />}
          {/**** FOR MOBILE AND TABLE DEVICE ONLY ****/}
          <div className="slider-container cursor-pointer lg:hidden block mt-12">
            <Slider {...settings}>
              {images.map((src, index) => (
                <div key={index} className="p-2">
                  <img
                    src={src}
                    alt={`Nexus Slide ${index + 1}`}
                    className="rounded-xl min-w-[310px] mx-auto h-[250px] shadow-lg"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </CommonWrapper>
    </Element>
  );
};

export default Banner;
