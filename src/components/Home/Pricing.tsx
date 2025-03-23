import CommonWrapper from "@/wrapper/CommonWrapper";
import { useEffect, useState } from "react";
import Title from "./Shared/Title";
import { Link } from "react-router-dom";
import { Element } from "react-scroll";
import useFetch from "@/hooks/shared/useFetch";

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
  const { data, isSuccess, isLoading, refetch } = useFetch("/key/all-key");
  const [pricingData, setPricingData] = useState<[]>([]);
  useEffect(() => {
    fetch("/pricing.json")
      .then((res) => res.json())
      .then((data) => setPricingData(data));
  }, []);

  console.log(data?.data, "allll keyyysss");

  return (
    <Element name="Pricing" className="font-montserrat mt-20">
      <CommonWrapper>
        {/**** PRICING HEADING SECTION START ****/}
        <Title
          title="All hacks and features for Edgenuity, for every price."
          subtitle="After purchase, your key will be sent to the email you provided at
            checkout. To purchase using PayPal, Venmo, or Zelle, please open a
            ticket on our Discord server."
        />

        {/**** PRICING CARD SECTION START ****/}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {/*** CARDS ***/}
          {data?.data?.map((price: PricingData) => {
            return (
              <div
                key={price?._id}
                className="rounded-lg min-w-[280px] relative sm:max-w-full border border-gray-700 shadow-lg hover:shadow-gray-500 space-y-3 p-5 transform translate duration-200"
              >
                <p
                  className={`text-white absolute right-1.5 -top-3.5 rounded-lg bg-gradient-to-bl from-gray-800 to-black/50 py-2 px-3 text-xs sm:text-sm ${
                    price.badge === "Most Popular" &&
                    `bg-gradient-to-bl from-green-700 to-gray-600`
                  }`}
                >
                  {price.badge} Most Popular
                </p>
                <h1 className="text-2xl sm:text-3xl font-semibold text-white">
                  {price?.keyName}
                </h1>
                <p className="text-sm sm:text-[16px] text-gray-500">
                  {price.description} "Perfect for quick access and trying us
                  out with minimal cost."
                </p>
                <p className="text-xl sm:text-3xl font-semibold text-orange-400">
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
