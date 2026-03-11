import React from "react";
import connectDB from "@/utils/db";
import { City } from "@/model/city.model";
import { Solution } from "@/model/solution.model";
import { Area } from "@/model/area.model";
import { Property } from "@/model/property.model";
import Header from "@/app/components/home/Header";
import GlobalBanner from "@/app/components/home/GlobalBanner";
import LocationContentWrapper from "@/app/components/location/LocationContentWrapper";
import LocationAmenities from "@/app/components/location/LocationAmenities";

import LifeAtSpringHouse from "@/app/components/home/LifeAtSpringHouse";
import SolutionsDesktop from "@/app/components/home/SolutionsDesktop";
import SolutionsMobile from "@/app/components/home/SolutionsMobile";
import OtherLocations from "@/app/components/location/OtherLocations";
import ContactForm from "@/app/components/home/ContactForm";
import Footer from "@/app/components/home/Footer";

export const metadata = {
  title: "Managed Workspaces and Coworking Spaces in Gurugram",
  description:
    "Find the perfect managed office or coworking space in Gurugram. Spring House offers flexible workspace solutions for growing teams and focused professionals.",
};

export default async function LocationPage({ params }) {
  // await params to get the slug (e.g., 'gurugram-coworking-space')
  const { slug } = await params;

  // We can parse the slug if needed, e.g. checking if it ends with '-coworking-space'
  const isCoworkingURL = slug.endsWith("-coworking-space");

  // If it's not a location route, we might want to return a 404 or something,
  // but for now, we'll let it render with the city name from the slug.
  const city = slug.replace("-coworking-space", "");

  // Fetch from DB
  await connectDB();
  let cityDataRaw = await City.findOne({ slug: city }).lean();
  let activeSolutionsRaw = await Solution.find({ isActive: true }).lean();
  
  let areasRaw = [];
  let propertiesRaw = [];

  if (cityDataRaw && cityDataRaw._id) {
    areasRaw = await Area.find({ city: cityDataRaw._id }).lean();
    propertiesRaw = await Property.find({ city: cityDataRaw._id, isActive: true })
      .populate("city", "slug name")
      .populate("area", "slug name")
      .populate("activeSolutions", "slug name")
      .lean();
  } 

  // Convert Mongoose ObjectIds and Dates to simple POJOs for Client Components
  // The easiest way is JSON serialize/deserialize, especially when using .lean()
  const cityData = cityDataRaw ? JSON.parse(JSON.stringify(cityDataRaw)) : null;
  const activeSolutions = activeSolutionsRaw ? JSON.parse(JSON.stringify(activeSolutionsRaw)) : [];
  const areas = areasRaw.length > 0 ? JSON.parse(JSON.stringify(areasRaw)) : [];
  const cityProperties = propertiesRaw.length > 0 ? JSON.parse(JSON.stringify(propertiesRaw)) : [];

  return (
    <>
      <Header />
      <GlobalBanner
        title={cityData ? cityData.name : city}
        imageSrc={cityData?.image || "/assets/locationdetail/banner/1747118432_gurugram.jpg"}
      />
      <LocationContentWrapper 
        city={cityData || { name: city }} 
        cityProperties={cityProperties} 
        activeSolutions={activeSolutions} 
        areas={areas}
      />
      <LocationAmenities location={city} />

      <LifeAtSpringHouse />
      <SolutionsDesktop />
      <SolutionsMobile />
      <OtherLocations location={city} />
      <ContactForm />
      <Footer />
    </>
  );
}
