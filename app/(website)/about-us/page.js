import React from "react";
import connectDB from "@/utils/db";
import { AboutUs } from "@/model/aboutUs.model";
import { Homepage } from "@/model/homepage.model";

import Header from "@/app/components/home/Header";
import Footer from "@/app/components/home/Footer";
import PresenceCounter from "@/app/components/home/PresenceCounter";

// Modularized About Section Components
import AboutHero from "@/app/components/about-us/AboutHero";
import AboutTimeline from "@/app/components/about-us/AboutTimeline";
import AboutWhyUs from "@/app/components/about-us/AboutWhyUs";
import AboutWhoWeAre from "@/app/components/about-us/AboutWhoWeAre";
import AboutCta from "@/app/components/about-us/AboutCta";

export const revalidate = 0; // Disable caching to see immediate CMS changes

export async function generateMetadata() {
  await connectDB();
  const data = await AboutUs.findOne().lean();
  return {
    title: data?.seo?.metaTitle || "About Us | SpringHouse Coworking Offices",
    description:
      data?.seo?.metaDescription ||
      "Learn about SpringHouse Coworking spaces, our history, mission, and the thriving professional community we serve.",
  };
}

export default async function AboutUsPage() {
  await connectDB();
  const aboutData = await AboutUs.findOne().lean();
  const hpData = await Homepage.findOne().lean();

  // Next 16 Server Components cannot pass Mongoose ObjectIDs to Client Components. Serialize them.
  const safeData = aboutData ? JSON.parse(JSON.stringify(aboutData)) : {};
  const presenceData = hpData?.presence ? JSON.parse(JSON.stringify(hpData.presence)) : [];

  return (
    <>
      <Header />

      <AboutHero data={safeData} />
      <AboutTimeline data={safeData.history} />

      <PresenceCounter data={presenceData} />

      <AboutWhyUs data={safeData.whyUs} />
      <AboutWhoWeAre data={safeData.whoAreWe} />
      <AboutCta />

      <Footer />
    </>
  );
}
