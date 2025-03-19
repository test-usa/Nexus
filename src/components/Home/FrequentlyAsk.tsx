import { useState } from "react";
import Title from "./Shared/Title";

export function FrequentlyAsk() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-10">
      <Title
        title="Frequently Asked Questions"
        subtitle="Get quick answers to the most common questions about Nexus."
      />
      <div className="max-w-2xl mx-auto p-6">
        <div className=" p-6 rounded-lg shadow-lg">
          <div className="mt-6 space-y-4 text-white">
            <div>
              <button
                className="w-full font-montserrat text-left font-semibold text-lg flex justify-between items-center hover:text-gray-300"
                onClick={() => toggleFAQ(1)}
              >
                Is Nexus detectable by Edgenuity?
                <span>{openIndex === 1 ? "−" : "+"}</span>
              </button>
              {openIndex === 1 && (
                <div className=" text-gray-500">
                  Nexus is not detectable by Edgenuity, and you cannot get
                  caught using Nexus as long as you use safe delays.
                </div>
              )}
            </div>
            <hr className="border-0 h-px bg-gray-800 my-4" />
            <div>
              <button
                className="w-full font-montserrat text-left font-semibold text-lg flex justify-between items-center hover:text-gray-300"
                onClick={() => toggleFAQ(2)}
              >
                What is an Edgenuity bot?
                <span>{openIndex === 2 ? "−" : "+"}</span>
              </button>
              {openIndex === 2 && (
                <div className=" text-gray-500">
                  An Edgenuity bot is an automation tool that assists students
                  in navigating and completing their coursework on Edgenuity.
                </div>
              )}
            </div>
            <hr className="border-0 h-px bg-gray-800 my-4" />
            <div>
              <button
                className="w-full text-left font-montserrat font-semibold text-lg flex justify-between items-center hover:text-gray-300"
                onClick={() => toggleFAQ(3)}
              >
                What payment methods do you accept?
                <span>{openIndex === 3 ? "−" : "+"}</span>
              </button>
              {openIndex === 3 && (
                <div className=" text-gray-500">
                  We accept all major payment gateways such as Credit/Debit
                  Card, PayPal, Apple Pay, and Cryptocurrency.
                </div>
              )}
            </div>
            <hr className="border-0 h-px bg-gray-800 my-4" />
            <div>
              <button
                className="w-full font-montserrat text-left  font-semibold text-lg flex justify-between items-center hover:text-gray-300"
                onClick={() => toggleFAQ(4)}
              >
                What is a service key?
                <span>{openIndex === 4 ? "−" : "+"}</span>
              </button>
              {openIndex === 4 && (
                <div className=" text-gray-500">
                  A service key lets you use Nexus for up to 5 different
                  Edgenuity accounts.
                </div>
              )}
            </div>
            <hr className="border-0 h-px bg-gray-800 my-4" />

            <div>
              <button
                className="w-full font-montserrat text-left  font-semibold text-lg flex justify-between items-center hover:text-gray-300"
                onClick={() => toggleFAQ(5)}
              >
                How often do y'all push updates?
                <span>{openIndex === 5 ? "−" : "+"}</span>
              </button>
              {openIndex === 5 && (
                <div className="text-gray-500">
                  We try to push updates every few days to fix bugs and add new
                  features.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
