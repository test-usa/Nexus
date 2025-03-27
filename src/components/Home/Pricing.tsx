import CommonWrapper from "@/wrapper/CommonWrapper";
import { Link } from "react-router-dom";
import { Element } from "react-scroll";
import useFetch from "@/hooks/shared/useFetch";
import Title from "./Shared/Title";
type PricingData = {
  keyName: string;
  _id: string;
  prices: {
    regularKey: number;
    serviceKey: number;
  };
  description: string;
  currency: string;
  price: string;
  badge: string;
  buttonText: string;
};

const Pricing = () => {
  const { data } = useFetch("/key/all-key");
  const { data: popular } = useFetch("/user-key/most-popular");

  const keyComments = popular?.data?.keyDetails
    ? Object.entries(popular.data.keyDetails).reduce(
        (acc, [keyName, { comment, position }]: any[]) => {
          if (position !== undefined) {
            acc[keyName] = { comment, position };
          }
          return acc;
        },
        {} as Record<string, { comment: string; position: number }>
      )
    : {};

  return (
    <Element name="Pricing" className="font-montserrat mt-20">
      <CommonWrapper>
        <Title
          title="All hacks and features for Edgenuity, for every price."
          subtitle="After purchase, your key will be sent to the email you provided at checkout. To purchase using PayPal, Venmo, or Zelle, please open a ticket on our Discord server."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {/*** CARDS ***/}
          {data?.data?.map((price: PricingData) => {
            // Check if the comment exists for the keyName and position
            const keyDetail = keyComments[price?.keyName];
            const comment = keyDetail ? keyDetail.comment : ""; // Show comment if available, otherwise empty string

            // Highlight the card if the comment is "Most Popular"
            const isMostPopular = comment === "Most Popular";

            return (
              <div
                key={price?._id}
                className={`rounded-[var(--radius-card)] hover:border-[1px] hover:border-cyan-600 min-w-[280px] relative sm:max-w-full border border-[#45444d] shadow-lg hover:shadow-gray-500 space-y-3 p-5 transform transition duration-500 ${
                  isMostPopular ? "shadow-xl" : ""
                }`}
              >
                {comment && !isMostPopular && (
                  <p
                    className={`text-white absolute right-1.5 -top-3.5 rounded-lg bg-gradient-to-bl from-gray-800 to-black/50 py-2 px-3 text-xs sm:text-sm`}
                  >
                    {comment} {/* Display the comment if available */}
                  </p>
                )}

                {/* Most Popular Comment with Background */}
                {isMostPopular && (
                  <p className="absolute right-1.5 -top-3.5 rounded-lg bg-gradient-to-bl from-sky-600 via-gray-600 to-green-800 py-2 px-3 text-xs sm:text-sm text-white">
                    {comment} {/* Display "Most Popular" with background */}
                  </p>
                )}

                <h1 className="text-2xl sm:text-3xl font-semibold text-white">
                  {price?.keyName}
                </h1>
                <p className="text-sm sm:text-[16px] text-gray-500">
                  {price.description} "Perfect for quick access and trying us
                  out with minimal cost."
                </p>
                <p className="text-xl sm:text-3xl font-semibold bg-gradient-to-r from-gray-400 to-slate-600 via-green-500 text-transparent bg-clip-text">
                  ${price.prices.regularKey} {price.currency} USD
                </p>
                <Link
                  to={`/buy/${price._id}`}
                  className="w-full cursor-pointer hover:-rotate-z-1 bg-gradient-to-tr from-gray-800 to-gray-500 text-white py-2 inline-block text-center rounded-lg text-sm sm:text-[16px]"
                >
                  Purchase Now
                </Link>
              </div>
            );
          })}
        </div>
      </CommonWrapper>
    </Element>
  );
};

export default Pricing;
