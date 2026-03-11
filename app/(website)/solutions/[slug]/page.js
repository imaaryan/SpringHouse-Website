import connectDB from "@/utils/db";
import { Solution } from "@/model/solution.model";
import { Property } from "@/model/property.model";
import { City } from "@/model/city.model";
import { Testimonial } from "@/model/testimonial.model";
import { notFound } from "next/navigation";

import Header from "@/app/components/home/Header";
import Footer from "@/app/components/home/Footer";
import ContactForm from "@/app/components/home/ContactForm";
import Testimonials from "@/app/components/home/Testimonials";
import AvailableProperties from "@/app/components/solutions/AvailableProperties";
import OtherSolutions from "@/app/components/solutions/OtherSolutions";
import OurCommunity from "@/app/components/home/OurCommunity";
import Networking from "@/app/components/home/Networking";
import GlobalBanner from "@/app/components/home/GlobalBanner";
import SolutionIntro from "@/app/components/solutions/SolutionIntro";
import ManagedOfficeStatic from "@/app/components/solutions/ManagedOfficeStatic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  await connectDB();
  const solution = await Solution.findOne({ slug, isActive: true }).lean();
  
  if (!solution) return {};
  
  return {
    title: solution.seo?.metaTitle || `${solution.name} | SpringHouse`,
    description: solution.seo?.metaDescription || solution.description,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  await connectDB();

  const rawSolution = await Solution.findOne({ slug, isActive: true })
    .populate("testimonials")
    .lean();

  if (!rawSolution) {
    notFound();
  }
  
  // Serialize to plain JavaScript object to avoid Next.js "Only plain objects can be passed to Client Components" error
  const solution = JSON.parse(JSON.stringify(rawSolution));

  const description = solution.description?.split("\r\n").filter(Boolean) || [];

  // Fetch properties where this solution is active
  const rawProperties = await Property.find({
    activeSolutions: rawSolution._id,
    isActive: true,
  })
    .populate("city")
    .lean();
    
  const solutionProperties = JSON.parse(JSON.stringify(rawProperties));

  return (
    <>
      <Header />

      {/* Banner Component */}
      <GlobalBanner
        title={solution.name}
        imageSrc={solution.image}
      />

      {/* Clean Intro Component */}
      <SolutionIntro
        description={description}
        fourPoints={solution.fourPoints}
      />

      {/* Render testimonials dynamically */}
      {solution.testimonials && solution.testimonials.length > 0 && (
        <Testimonials data={solution.testimonials} />
      )}

      {/* Static Section for specific solutions if needed */}
      {slug === "managed-office" && (
        <ManagedOfficeStatic />
      )}

      {/* Properties Component */}
      {solutionProperties && solutionProperties.length > 0 && (
        <AvailableProperties properties={solutionProperties} showTabs={true} />
      )}

      {/* Render Our Community dynamically */}
      {solution.ourCommunity && solution.ourCommunity.length > 0 && (
        <OurCommunity data={solution.ourCommunity} />
      )}

      {/* Render Networking dynamically */}
      {solution.networking && (solution.networking.title || solution.networking.content) && (
        <Networking data={solution.networking} />
      )}

      {/* Global Elements */}
      <OtherSolutions />
      <ContactForm />
      <Footer />
    </>
  );
}
