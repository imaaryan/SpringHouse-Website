import React from "react";
import Header from "@/app/components/home/Header";
import GlobalBanner from "@/app/components/home/GlobalBanner";
import CareerForm from "@/app/components/careers/CareerForm";
import Footer from "@/app/components/home/Footer";

export const metadata = {
  title: "Careers at Spring House | Join Our Team",
  description:
    "Explore career opportunities at Spring House. Join our team and be a part of creating exceptional coworking and managed workspace experiences.",
};

export default function CareersPage() {
  return (
    <>
      <Header />
      <GlobalBanner
        title="Careers"
        imageSrc="/assets/bannerimage/1747035219_home-banner.jpg"
      />
      <CareerForm />
      <Footer />
    </>
  );
}
