import React from "react";
import { notFound } from "next/navigation";
import connectDB from "@/utils/db";
import { OtherPage } from "@/model/otherPage.model";
import Header from "@/app/components/home/Header";
import GlobalBanner from "@/app/components/home/GlobalBanner";
import Footer from "@/app/components/home/Footer";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  await connectDB();
  const page = await OtherPage.findOne({ slug, isActive: true }).lean();

  if (!page) {
    return { title: "Page Not Found" };
  }

  return {
    title: page.seo?.metaTitle || page.name || "Spring House",
    description: page.seo?.metaDescription || "",
  };
}

export default async function DynamicOtherPage({ params }) {
  const { slug } = await params;
  await connectDB();
  const page = await OtherPage.findOne({ slug, isActive: true }).lean();

  if (!page) {
    notFound();
  }

  return (
    <>
      <Header />
      <GlobalBanner
        title={page.name}
        imageSrc="/assets/bannerimage/1747035219_home-banner.jpg"
      />
      <section className="ptb60" data-aos="fade-up">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="rich-text-content"
                dangerouslySetInnerHTML={{ __html: page.content }}
              />
            </div>
          </div>
        </div>
      </section>
      {page.seo?.codeSnippet && (
        <div dangerouslySetInnerHTML={{ __html: page.seo.codeSnippet }} />
      )}
      <Footer />
    </>
  );
}
