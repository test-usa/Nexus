import CommonWrapper from "@/wrapper/CommonWrapper";
import { useEffect, useState } from "react";

type PricingData = {
  name: string;
  description: string;
  currency: string;
  price: string;
  badge: string;
  buttonText: string;
};
const Pricing = () => {
  const [pricingData, setPricingData] = useState<[]>([]);
  useEffect(() => {
    fetch("/pricing.json")
      .then((res) => res.json())
      .then((data) => setPricingData(data));
  }, []);

  console.log(pricingData, "pricing data 12");
  return (
    <div className="font-montserrat my-16">
      <CommonWrapper>
        {/**** PRICING HEADING SECTION START ****/}
        <section className="space-y-5">
          <h1 className="text-white text-[30px] sm:text-4xl text-center ">
            All hacks and features for Edgenuity, for every price.
          </h1>
          <p className="w-5/6 sm:w-2/3 px-10 text-center text-sm sm:text-[16px] mx-auto text-gray-500">
            After purchase, your key will be sent to the email you provided at
            checkout. To purchase using PayPal, Venmo, or Zelle, please open a
            ticket on our Discord server.
          </p>
           
        </section>
        {/**** PRICING CARD SECTION START ****/}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-">
          {/*** CARDS ***/}
          {pricingData?.map((price: PricingData) => {
            return (
              <div
                key={price?.price}
                className="rounded-lg min-w-[300px] relative sm:max-w-full border border-gray-700 shadow-lg hover:shadow-gray-500 space-y-3 p-5 transform translate duration-200"
              >
                <p className={`text-white absolute right-1.5 -top-3.5 rounded-lg bg-gradient-to-bl from-gray-800 to-black/50 py-2 px-3 text-xs sm:text-sm ${price.badge === "Most Popular" && `bg-gradient-to-bl from-green-700 to-gray-600`}`}>{price.badge}</p>
                <h1 className="text-2xl sm:text-3xl font-semibold text-white">
                  {price?.name}
                </h1>
                <p className="text-sm sm:text-[16px] text-gray-500">{price.description}</p>
                <p className="text-xl sm:text-3xl font-semibold text-orange-400">
                  ${price.price} {price.currency}
                </p>
                <button className="w-full cursor-pointer hover:-rotate-z-1 bg-gradient-to-tr from-gray-800 to-gray-500 text-white py-2 rounded-lg text-sm sm:text-[16px]">
                  Purchase Now
                </button>
              </div>
            );
          })}
        </div>
      </CommonWrapper>
    </div>
  );
};

export default Pricing;
