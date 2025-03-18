import { Button } from "../ui/button";
import bgphoto from "../../assets/bacgroundcard.avif";

const FreeKeyCard = () => {
  return (
    <div
      className="h-96 relative flex items-center justify-center rounded-xl border border-gray-300 shadow-lg overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgphoto})`,
        backgroundColor: "rgba(0, 0, 255, 0.6)", // More visible blue color with 60% opacity
      }}
    >
      <div className="bg-opacity-60 p-6 rounded-lg text-center text-white w-full max-w-md">
        <Button
          className="relative bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-4 rounded-[100px] shadow-[rgba(255,255,255,0.05)_0px_1px_10px_0px_inset]"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.02)", opacity: 50 }}
        >
          Discord Server
        </Button>
        <h1 className="text-3xl font-bold mb-3">Want a Free Key?</h1>
        <p className="text-sm text-gray-300 mb-4">
          Join our Discord to participate in occasional giveaways and drops!
        </p>
      </div>
    </div>
  );
};

export default FreeKeyCard;
