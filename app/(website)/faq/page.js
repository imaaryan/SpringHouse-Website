export const metadata = {
  title: "Frequently Asked Questions | SpringHouse",
  description:
    "Got questions? We have answers. Find everything you need to know about SpringHouse coworking, access, billing, and solutions.",
};

import React from "react";
import Header from "@/app/components/home/Header";
import Footer from "@/app/components/home/Footer";

// Modularized FAQ Section Components
import FaqHero from "@/app/components/faq/FaqHero";
import FaqAccordion from "@/app/components/faq/FaqAccordion";

// Dummy JSON mimicking the /api/faqs endpoint schema
const DUMMY_FAQ_DATA = [
  {
    _id: "sec-1",
    sectionName: "General Information",
    questions: [
      {
        _id: "q-1-1",
        question: "What is SpringHouse Coworking?",
        answer:
          "SpringHouse is a community-driven workspace provider offering managed offices, coworking desks, and meeting rooms tailored for growing teams.",
      },
      {
        _id: "q-1-2",
        question: "What are your operating hours?",
        answer:
          "Most of our hubs operate 24x7 for dedicated desk and private office members. Hot desk access varies by location, typically from 8 AM to 8 PM.",
      },
    ],
  },
  {
    _id: "sec-2",
    sectionName: "Billing & Contracts",
    questions: [
      {
        _id: "q-2-1",
        question: "Is there a lock-in period?",
        answer:
          "No, our coworking plans are flexible. We offer monthly rolling contracts with a standard 30-day notice period. Enterprise setups may vary.",
      },
      {
        _id: "q-2-2",
        question: "Are there any hidden charges?",
        answer:
          "Our pricing is transparent. Your monthly membership includes high-speed internet, housekeeping, power backup, and beverages. Printing and meeting room credits are allocated based on your plan.",
      },
    ],
  },
];

export default function FAQRoutePage() {
  return (
    <>
      <Header />

      <FaqHero />
      <FaqAccordion faqData={DUMMY_FAQ_DATA} />

      <Footer />
    </>
  );
}
