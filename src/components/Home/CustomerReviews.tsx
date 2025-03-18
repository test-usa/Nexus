import profile1 from "../../assets/profile1.png";
import profile2 from "../../assets/profile2.png";
import profile3 from "../../assets/profile3.png";
import Title from "./Shared/Title";

const CustomerReviews = () => {
  return (
    <div className="w-full mt-10 mb-10 text-white ">
      <div>
        <Title
          title="People love Nexus
         and there's a good reason."
          subtitle="Skeptical of us? We have tons of positive reviews from our customers
          that use Edgenuity. We want to help you get out of this online
          school mess "
        />
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="max-w-[350px] sm:max-w-full lg:max-w-[500px] xl:max-w-[600px] mx-auto rounded-lg relative border border-gray-700 shadow-lg hover:shadow-lg space-y-3 p-5 transform transition-all duration-200 hover:shadow-gray-500 translate ">
          <div>
            <p className="text-gray-400 text-[16px]">
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
                className="h-14 w-14 rounded-full border-1 border-orange-400"
              />
            </div>

            <div className="ml-4">
              <h3>Arfin Mia</h3>
              <p className="text-gray-400">Customer</p>
            </div>
          </div>
        </div>
        <div className="max-w-[350px] sm:max-w-full lg:max-w-[500px] xl:max-w-[600px] mx-auto rounded-lg relative border border-gray-700 shadow-lg hover:shadow-lg space-y-3 p-5 transform transition-all duration-200 hover:shadow-gray-500 translate ">
          <div>
            <p className="text-gray-400 text-[16px]">
              "10/10 can make the bot believeable to a snoopy teacher by
              adjusting some of the settings. Works great hope to complete all
              my classes with easeamet consectetur adipisicing elit. "
            </p>
          </div>
          <div className="flex mt-4">
            <div>
              <img
                src={profile2}
                alt="Profile 2"
                className="h-14 w-14 rounded-full border-1 border-orange-400"
              />
            </div>
            <div className="ml-4">
              <h3>Sabbir Rahman</h3>
              <p className="text-gray-400">Customer</p>
            </div>
          </div>
        </div>
        <div className="max-w-[350px] sm:max-w-full lg:max-w-[500px] xl:max-w-[600px] mx-auto rounded-lg relative border border-gray-700 shadow-lg hover:shadow-lg space-y-3 p-5 transform transition-all duration-200 hover:shadow-gray-500 translate ">
          <div>
            <p className="text-gray-400 text-[16px]">
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
                className="h-14 w-14 rounded-full border-1 border-orange-400"
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
