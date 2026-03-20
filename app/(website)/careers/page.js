import React from "react";
import Header from "@/app/components/home/Header";
import GlobalBanner from "@/app/components/home/GlobalBanner";
import CareerForm from "@/app/components/careers/CareerForm";
import Footer from "@/app/components/home/Footer";
import connectDB from "@/utils/db";
import FooterModel from "@/model/footer.model";

export const metadata = {
  title: "Careers at Spring House | Join Our Team",
  description:
    "Explore career opportunities at Spring House. Join our team and be a part of creating exceptional coworking and managed workspace experiences.",
};

export default async function CareersPage() {
  await connectDB();
  const footerData = (await FooterModel.findOne({}).lean()) || {};
  const careerFormImage = footerData?.formImages?.careerFormImage || "";

  return (
    <>
      <Header />
      <GlobalBanner
        title="Careers"
        imageSrc="/assets/bannerimage/1747035219_home-banner.jpg"
      />
      <CareerForm careerFormImage={careerFormImage} />
      <Footer />
    </>
  );
}
