import Slider from "react-slick";
import profile1 from "../../assets/photo1.jpg";
import profile2 from "../../assets/profile2.png";
import profile3 from "../../assets/profile3.png";
import { Element } from "react-scroll";
import Title from "./Shared/Title";
import CommonWrapper from "@/wrapper/CommonWrapper";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { motion } from "framer-motion";
const CustomerReviews = () => {
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    pauseOnHover: true,
    arrows: false,
    centerMode: true,
    centerPadding: "0px",
    touchMove: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const review = [
    {
      description:
        "5/5 easily, no difficulty in learning the UI as it’s simple ascan be; very effective in completing assignments with above 90%accuracy. The price is nothing short of amazing for thisproduct.",
      name: "Arfin Mia",
      user: "Cursotmer",
      image: profile1,
    },
    {
      description:
        "5/5 easily, no difficulty in learning the UI as it’s simple ascan be; very effective in completing assignments with above 90%accuracy. The price is nothing short of amazing for thisproduct.",
      name: "Mehedi Hasan",
      user: "Cursotmer",
      image: profile2,
    },
    {
      description:
        "5/5 easily, no difficulty in learning the UI as it’s simple ascan be; very effective in completing assignments with above 90%accuracy. The price is nothing short of amazing for thisproduct.",
      name: "Samsul Alim",
      user: "Cursotmer",
      image: profile3,
    },
  ];
  return (
    <Element name="Review" className="w-full text-white ">
      <CommonWrapper>
        <div className="mt-16 relative z-10">
          {" "}
          <div>
            <Title
              title="People love Exodus
         and there's a good reason."
              subtitle="Skeptical of us? We have tons of positive reviews from our customers
          that use Edgenuity. We want to help you get out of this online
          school mess "
            />
          </div>
          <div className="mt-10 w-full px-3">
            <Slider {...settings}>
              {review?.map((item) => {
                return (
                  <div key={item.user} className="p-3">
                    <div
                      className="max-w-[350px] shadow-lg hover:shadow-[#CDADFA] hover:hover:border-[#CDADFA]  transform transition duration-500 sm:max-w-full lg:max-w-[500px] xl:max-w-[580px] mx-auto rounded-[var(--radius-card)] relative border border-gray-700
                  hover:shadow-sm space-y-3 p-5 translate cursor-pointer"
                    >
                      <div>
                        <p className="text-[var(--color-textsecondarycolor)] text-[16px]">
                          {item?.description}
                        </p>
                      </div>
                      <div className="flex mt-4">
                        <div>
                          <img
                            src={item.image}
                            alt="Profile 2"
                            className="h-14 w-14 rounded-full border-1 border-cyan-700"
                          />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-[var(--color-textcolor)]">
                            {item.name}
                          </h3>
                          <p className="text-[var(--color-textsecondarycolor)]">
                            {item.user}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
        <motion.div className="absolute inset-0 z-0">
          <Canvas
            className="w-full h-full"
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            {/* Ensure Stars component is correctly set up */}
            <Stars radius={50} count={250} factor={4} fade speed={2} />
          </Canvas>
        </motion.div>
      </CommonWrapper>
    </Element>
  );
};

export default CustomerReviews;
