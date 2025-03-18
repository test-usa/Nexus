import { Button } from "../ui/button";

import profile1 from "../../assets/profile1.png";
import profile2 from "../../assets/profile2.png";
import profile3 from "../../assets/profile3.png";

const CustomerReviews = () => {
  return (
    <div className="text-white  sm:px-8 md:px-16">
      <div>
        <Button
          className="relative bg-blue-500 hover:bg-blue-600 text-gray-400 font-medium px-6 py-3 sm:px-8 sm:py-4 rounded-[100px] shadow-[rgba(255,255,255,0.05)_0px_1px_10px_0px_inset]"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.02)", opacity: 2 }}
        >
          Customer Reviews
        </Button>
        <h1 className="text-3xl sm:text-4xl mt-4 mb-4">
          People love Nexus,{" "}
          <span className="text-gray-400">and there's a good reason.</span>{" "}
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Skeptical of us? We have tons of positive reviews from our customers
          that use <br /> Edgenuity. We want to help you get out of this online
          school mess.
        </p>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="card border-gray-400 shadow-2xl p-4">
          <div>
            <p className="text-gray-400">
              "5/5 easily, no difficulty in learning the UI as it’s simple as
              can be; very effective in completing assignments with above 90%
              accuracy. The price is nothing short of amazing for this product."
            </p>
          </div>
          <div className="flex mt-4">
            <div>
              <img
                src={profile1}
                alt="Profile 1"
                className="h-14 w-14 rounded-full"
              />
            </div>
            <div className="ml-4">
              <h3>Arfin Mia</h3>
              <p className="text-gray-400">Customer</p>
            </div>
          </div>
        </div>
        <div className="card border-gray-400 shadow-2xl p-4">
          <div>
            <p className="text-gray-400">
              "10/10 can make the bot believeable to a snoopy teacher by
              adjusting some of the settings. Works great hope to complete all
              my classes with ease"
            </p>
          </div>
          <div className="flex mt-4">
            <div>
              <img
                src={profile2}
                alt="Profile 2"
                className="h-14 w-14 rounded-full"
              />
            </div>
            <div className="ml-4">
              <h3>Sabbir Rahman</h3>
              <p className="text-gray-400">Customer</p>
            </div>
          </div>
        </div>
        <div className="card border-gray-400 shadow-2xl p-4">
          <div>
            <p className="text-gray-400">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia
              voluptatibus ipsum iste soluta explicabo provident, maxime saepe
              facilis? Possimus labore quisquam tenetur doloribus?
            </p>
          </div>
          <div className="flex mt-4">
            <div>
              <img
                src={profile3}
                alt="Profile 3"
                className="h-14 w-14 rounded-full"
              />
            </div>
            <div className="ml-4">
              <h3>Shakib Mia</h3>
              <p className="text-gray-400">Haruto</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;
