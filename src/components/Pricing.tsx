import CommonWrapper from "@/wrapper/CommonWrapper";
import { motion } from "framer-motion";
const Pricing = () => {
  return (
    <div>
      <CommonWrapper>
        {/**** PRICING HEADING SECTION START ****/}
        <section className="space-y-3">
          <h1 className="text-white text-4xl text-center">
            All hacks and features for Edgenuity, for every price.
          </h1>
          <p className="w-2/3 px-10 text-center mx-auto text-gray-500">
            After purchase, your key will be sent to the email you provided at
            checkout. To purchase using PayPal, Venmo, or Zelle, please open a
            ticket on our Discord server.
          </p>
           
        </section>
        {/**** PRICING CARD SECTION START ****/}
        <div>
          {/*** CARDS ***/}
          <div className="relative rounded-lg min-w-[300px] max-w-[320px] border border-gray-700 shadow-lg hover:shadow-gray-500 space-y-3 p-5 transform translate duration-200">
            <h1 className="text-3xl font-semibold text-white">Day Key</h1>
            <p className="text-[16px] text-gray-500">
              Perfect for quick access and trying us out with{" "}
              <span className="font-semibold">minimal cost</span>.
            </p>
            <p className="text-3xl font-semibold text-orange-400">${2.5} USD</p>
            <motion.button
              initial="initial"
              whileHover="hovered"
              className="w-full relative overflow-hidden bg-gradient-to-tr from-gray-800 to-gray-500 text-white py-2 rounded-lg text-[16px]"
            >
              <motion.span
                variants={{
                  initial: { y: 0 },
                  whileHover:{y:"-100"}
                }}
               
              >
                Purchase Now
              </motion.span>
              <motion.span initial={{ y: "100%" }} whileHover={{ y: 0 }}>
                Purchase Now
              </motion.span>
            </motion.button>
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default Pricing;
