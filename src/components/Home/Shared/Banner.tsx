import CommonWrapper from "@/wrapper/CommonWrapper";
import { CiSettings } from "react-icons/ci";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-scroll";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";
import { FaOpencart } from "react-icons/fa";
import {
  useTime,
  useTransform,
  motion,
  useInView,
  useMotionValue,
  useMotionTemplate,
  animate,
} from "framer-motion";

import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import axios, { AxiosResponse } from "axios";
import Video from "../Video";
const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];
const Banner = () => {
  const [service, setService] = useState([]);
  // const [data, setData] = useState();
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

  const time = useTime();
  const rotate = useTransform(time, [0, 3000], [0, 360], {
    clamp: false,
  });
  const rotateBg = useTransform(rotate, (r) => {
    return `conic-gradient(from ${r}deg, rgba(255, 255, 255, 0.8), #7f5af0)`;
  });
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  //**** MOUSEMOVEMENT EFFECT ****//
  const url = import.meta.env.VITE_API_BASE_URL;
  
  const fetchData = async () => {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `${url}/payment/get-all-payment`
      );
      const data = response.data;
      console.log(data)
      // setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  fetchData();

  const color = useMotionValue(COLORS[0]);

  const backgroundImage = useMotionTemplate`radial-gradient(
    125% 125% at 50% 0%, #020617 50%, ${color}
  )`;

  // const border = useMotionTemplate`1px solid ${color}`;
  // const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  useEffect(() => {
    animate(color, COLORS, {
      ease: "easeInOut",
      duration: 5,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  return (
    <div>
      <motion.div
        style={{
          backgroundImage,
        }}
        className="font-montserra bg-black  min-h-screen"
      >
        {" "}
        <CommonWrapper>
          <div className=" z-10">
            <div className="flex group  items-center justify-between xl:mt-56 mt-36">
              {/**** TEXT SECTION ****/}
              <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                className="space-y-5 w-3/4 mx-auto lg:mx-0  lg:text-start text-center"
              >
                <h1
                  className="text-4xl sm:text-5xl
                 inline-block
               text-[var(--color-textcolor)]"
                >
                  <span className="text-6xl font-semibold inline-block text-[#5c3991]">
                    Exodus
                  </span>{" "}
                  Fastest Edgenuity Bot.
                </h1>
                <p className=" w-5/6 sm:w-2/3 lg:mx-0 mx-auto text-sm sm:text-[16px] text-[var(--color-textcolor)] leading-relaxed">
                  Exodus is your ultimate companion for online learning,
                  turbocharging your Edgenuity experience by helping you breeze
                  through courses faster and master the material with ease.
                </p>
                <div className="flex items-center justify-center lg:justify-self-start gap-5">
                  <Link
                    smooth
                    duration={1200}
                    to="Pricing"
                    className="relative hover:shadow-sm hover:shadow-[#CDADFA] overflow-hidden  cursor-pointer text-white text-xs sm:text-sm rounded bg-gradient-to-r from-[#5c3991] to-[#3a2b49] z-10 py-2.5 px-4 sm:py-3 sm:px-5 transform transition-all duration-300 shadow-md border border-transparent hover:border-[#CDADFA] flex items-center gap-x-2"
                  >
                    <FaOpencart className="w-5 h-5" />
                    <p>Purchase Now</p>
                  </Link>
                  <button
                    onClick={() => setToggle(!toggle)}
                    className="relative hover:shadow-sm hover:shadow-[#CDADFA] overflow-hidden hover:border-[#CDADFA]  cursor-pointer text-white text-xs sm:text-sm rounded bg-gradient-to-r from-[#5c3991] z-10 to-[#3a2b49] py-2.5 px-4 sm:py-3 sm:px-5 transform transition-all duration-300 shadow-md border border-transparent flex items-center gap-x-1.5"
                  >
                    <p> Quick setup</p>
                    <Play className="w-4.5 h-4.5 animate-" />
                  </button>
                </div>

                <div className="mt-8 flex items-center gap-x-12 lg:justify-self-start justify-center z-10">
                  <div className="space-y-2">
                    {" "}
                    <h1 className="text-5xl font-semibold text-[#7d57b5]">
                      13K
                    </h1>
                    <p className="text-[var(--color-textcolor)] text-[16px]">
                      Active Exodus Users
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h1 className="text-5xl font-semibold text-[#7d57b5]">
                      19K+
                    </h1>
                    <p className="text-[var(--color-textcolor)] text-[16px]">
                      Questions Answered
                    </p>
                  </div>
                </div>
              </motion.div>

              {/**** BANNER CARD SECTION ****/}
              <div
                className={`feature-card backdrop-blur-2xl w-1/3 lg:block hidden transform translate-all duration-200 group-hover:-rotate-z-3 -skew-y-3 group-hover:shadow-lg group-hover:drop-shadow-lg min-h-[460px] group-hover:scale-105 relative rounded-lg`}
              >
                <div className="relative z-30 min-h-[460px] bg-gradient-to-r from-[#5c3991] to-[#3a2b49] p-4 border-white/20 rounded-lg  group-hover:border-cyan-500">
                  <div className=" flex items-center gap-x-2">
                    <img
                      src="https://i.postimg.cc/zfCvqNvy/exoduspro.png"
                      alt="logo"
                      className="max-w-14 rounded-xl"
                    />
                    <div className="">
                      <h1 className="text-xl text-white font-semibold">
                        Exodus
                      </h1>
                      <p className="text-sm text-white">Open beta 1.4.3.3</p>
                    </div>
                  </div>

                  <div className=" space-y-3 w-full p-3 mt-3">
                    {service?.map((item: any, index) => {
                      return (
                        <div
                          key={index}
                          className={cn(
                            `flex items-center justify-between rounded-lg px-4 py-1.5 w-full`,
                            Math.floor(index / 2) % 2 === 0
                              ? "bg-[#9881c2]"
                              : "bg-[#ac8eec]"
                          )}
                        >
                          <h1
                            className={cn("text-sm  font-semibold text-white")}
                          >
                            {item?.name}
                          </h1>
                          <CiSettings className="text-white text-2xl group-hover:animate-spin" />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <motion.div
                  style={{
                    background: rotateBg,
                  }}
                  className="absolute -inset-[2px] rounded-lg pointer-events-none"
                />
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
      </motion.div>
      <motion.div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={250} factor={4} fade speed={2} />
        </Canvas>
      </motion.div>
    </div>
  );
};

export default Banner;
