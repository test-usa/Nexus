import { Button } from "../ui/button";

const CustomerReviews = () => {
  return (
    <div>
      <div className="text-white">
        <Button
          className="relative bg-blue-500 hover:bg-blue-600 text-gray-400 font-medium px-4 py-4 rounded-[100px] shadow-[rgba(255,255,255,0.05)_0px_1px_10px_0px_inset]"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.02)", opacity: 2 }}
        >
          Customer Reviews
        </Button>
        <h1 className="text-4xl mt-4 mb-4">
          People love Nexus,{" "}
          <span className="text-gray-400">and there's a good reason.</span>{" "}
        </h1>
        <p className="text-gray-400">
          Skeptical of us? We have tons of positive reviews from our customers
          that use <br /> Edgenuity. We want to help you get out of this online
          school mess.
        </p>
      </div>
    </div>
  );
};

export default CustomerReviews;
