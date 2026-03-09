export const metadata = {
  title: "About Us | SpringHouse Coworking Offices",
  description:
    "Learn about SpringHouse Coworking spaces, our history, mission, and the thriving professional community we serve.",
};

import React from "react";
import Header from "@/app/components/home/Header";
import Footer from "@/app/components/home/Footer";
import PresenceCounter from "@/app/components/home/PresenceCounter";

// Modularized About Section Components
import AboutHero from "@/app/components/about-us/AboutHero";
import AboutTimeline from "@/app/components/about-us/AboutTimeline";
import AboutWhyUs from "@/app/components/about-us/AboutWhyUs";
import AboutWhoWeAre from "@/app/components/about-us/AboutWhoWeAre";
import AboutCta from "@/app/components/about-us/AboutCta";

export default function AboutUsPage() {
  return (
    <>
      <Header />

      <AboutHero />
      <AboutTimeline />

      <PresenceCounter />

      <AboutWhyUs />
      <AboutWhoWeAre />
      <AboutCta />

      <Footer />
    </>
  );
}
