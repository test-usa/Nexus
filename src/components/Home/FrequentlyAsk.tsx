import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Element } from "react-scroll";
import Title from "./Shared/Title";


export function FrequentlyAsk() {
  // const [openIndex, setOpenIndex] = useState<number | null>(null);

  // const toggleFAQ = (index: number) => {
  //   setOpenIndex(openIndex === index ? null : index);
  // };

  return (
    <Element name="FAQ" className="mt-10">
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
              Is Nexus detectable by Edgenuity?
            </AccordionTrigger>
            <AccordionContent className="text-[var(--color-textsecondarycolor)] text-sm sm:tex-md">
              Nexus is not detectable by Edgenuity, and you cannot get caught
              using Nexus as long as you use safe delays.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-b border-gray-500">
            <AccordionTrigger className="text-[var(--color-textcolor)] text-[16px] sm:text-md">
              What is an Edgenuity bot?
            </AccordionTrigger>
            <AccordionContent className="text-[var(--color-textsecondarycolor)] text-sm sm:tex-md">
              An Edgenuity bot is an automation tool that assists students in
              navigating and completing their coursework on Edgenuity. These
              bots handle repetitive tasks like skipping videos, answering quiz
              questions, and advancing lessons, making online learning more
              manageable.
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
              Nexus is not detectable by Edgenuity, and you cannot get caught
              using Nexus as long as you use safe delays.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5" className="border-b border-gray-500">
            <AccordionTrigger className="text-[var(--color-textcolor)] text-[16px] sm:text-md">
              Is Nexus detectable by Edgenuity?
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
    </Element>
  );
}
