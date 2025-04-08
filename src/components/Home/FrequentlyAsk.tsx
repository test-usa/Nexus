import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Element } from "react-scroll";
import Title from "./Shared/Title";
import CommonWrapper from "@/wrapper/CommonWrapper";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

export function FrequentlyAsk() {
  // const [openIndex, setOpenIndex] = useState<number | null>(null);

  // const toggleFAQ = (index: number) => {
  //   setOpenIndex(openIndex === index ? null : index);
  // };

  return (
    <Element name="FAQ" className="mt-10 relative z-30">
      <CommonWrapper>
        <Title
          title="Frequently Asked Questions"
          subtitle="Get quick answers to the most common questions about Exodus."
        />
        <div className="max-w-2xl mx-auto p-6 border-1 border-[#292727] rounded mt-5 mb-5">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem
              value="item-1"
              className="group border-b border-gray-500 transition-all duration-300 ease-in-out"
            >
              <AccordionTrigger className="text-[var(--color-textcolor)] text-[16px] sm:text-md">
                Is Exodus detectable by Edgenuity?
              </AccordionTrigger>
              <AccordionContent className="text-[var(--color-textsecondarycolor)] text-sm sm:tex-md">
                Exodus is not detectable by Edgenuity, and you cannot get caught
                using Exodus as long as you use safe delays.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-b border-gray-500">
              <AccordionTrigger className="text-[var(--color-textcolor)] text-[16px] sm:text-md">
                What is an Edgenuity bot?
              </AccordionTrigger>
              <AccordionContent className="text-[var(--color-textsecondarycolor)] text-sm sm:tex-md">
                An Edgenuity bot is an automation tool that assists students in
                navigating and completing their coursework on Edgenuity. These
                bots handle repetitive tasks like skipping videos, answering
                quiz questions, and advancing lessons, making online learning
                more manageable.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-b border-gray-500">
              <AccordionTrigger className="text-[var(--color-textcolor)] text-[16px] sm:text-md">
                What payment methods do you accept?
              </AccordionTrigger>
              <AccordionContent className="text-[var(--color-textsecondarycolor)] text-sm sm:tex-md">
                We accept all major payment gateways such as Credit/Debit Card
                through Stripe, Cash App, Venmo, PayPal, Zelle, Apple Pay,
                Cryptocurrency, etc. Please open a ticket on our Discord server
                for alternative payment methods.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-b border-gray-500">
              <AccordionTrigger className="text-[var(--color-textcolor)] text-[16px] sm:text-md">
                What is an Edgenuity bot?
              </AccordionTrigger>
              <AccordionContent className="text-[var(--color-textsecondarycolor)] text-sm sm:tex-md">
                Exodus is not detectable by Edgenuity, and you cannot get caught
                using Exodus as long as you use safe delays.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="border-b border-gray-500">
              <AccordionTrigger className="text-[var(--color-textcolor)] text-[16px] sm:text-md">
                Is Exodus detectable by Edgenuity?
              </AccordionTrigger>
              <AccordionContent className="text-[var(--color-textsecondarycolor)] text-sm sm:tex-md">
                We accept all major payment gateways such as Credit/Debit Card
                through Stripe, Cash App, Venmo, PayPal, Zelle, Apple Pay,
                Cryptocurrency, etc. Please open a ticket on our Discord server
                for alternative payment methods.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </CommonWrapper>
      <motion.div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={250} factor={1} fade speed={2} />
        </Canvas>
      </motion.div>
    </Element>
  );
}
