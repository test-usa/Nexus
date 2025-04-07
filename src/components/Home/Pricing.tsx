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
            return (
              <div
                key={price?._id}
                className={`rounded-[var(--radius-card)] hover:border-[1px] hover:hover:border-[#CDADFA]  min-w-[280px] relative sm:max-w-full border border-gray-700 shadow-sm hover:shadow-[#CDADFA] hover:bg-[#312344]  space-y-3 p-5 transform transition duration-500`}
              >
                {price?.badge && (
                  <p className="absolute right-1.5 -top-3.5 rounded bg-gradient-to-bl from-[#5c3991] via-gray-600 to-green-700 py-2 px-3 text-xs sm:text-sm text-[var(--color-textcolor)]">
                    {price?.badge}
                  </p>
                )}

                <h1 className="text-2xl sm:text-3xl font-semibold text-[var(--color-textcolor)]">
                  {price?.keyName}
                </h1>
                <p className="text-sm sm:text-[16px] text-[var(--color-textsecondarycolor)]">
                  {price?.description} "Perfect for quick access and trying us
                  out with minimal cost."
                </p>
                <p className="text-xl sm:text-3xl font-semibold bg-gradient-to-r from-gray-400 to-slate-600 via-green-500 text-transparent bg-clip-text">
                  ${price.prices.regularKey} {price.currency} USD
                </p>
                <Link
                  to={`/buy/${price._id}`}
                  className="w-full cursor-pointer hover:-rotate-z-1  bg-gradient-to-r from-[#5c3991]  to-[#3a2b49] text-[var(--color-textcolor)] py-2 inline-block text-center rounded text-sm sm:text-[16px]"
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
