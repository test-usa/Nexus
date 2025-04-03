import { Button } from "../ui/button";
import bgphoto from "../../assets/bacgroundcard.avif";

const FreeKeyCard = () => {
  return (
    <div
      className="h-96 relative flex items-center justify-center rounded-xl border border-gray-300 shadow-lg overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgphoto})`,
      }}
    >
      <div
        className="absolute inset-0 bg-black opacity-40"
        style={{ zIndex: -1 }} // This ensures the overlay stays behind the content
      ></div>
      <div className="bg-opacity-60 p-6 rounded text-center text-white w-full max-w-md">
        <Button
          className="relative bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-4 rounded-[100px] shadow-[rgba(255,255,255,0.05)_0px_1px_10px_0px_inset]"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.02)", opacity: 50 }}
        >
          Discord Server
        </Button>
        <h1 className="text-white text-[30px] sm:text-4xl text-center ">
          Want a Free Key?
        </h1>
        <p className="text-[16px] text-gray-300 mb-4">
          Join our Discord to participate in occasional giveaways and drops!
        </p>
      </div>
    </div>
  );
};

export default FreeKeyCard;
