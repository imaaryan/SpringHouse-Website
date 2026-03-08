import React from "react";
import Header from "@/app/components/home/Header";
import LocationHero from "@/app/components/location/LocationHero";
import AboutLocation from "@/app/components/location/AboutLocation";
import PropertiesList from "@/app/components/location/PropertiesList";
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

  return (
    <>
      <Header />
      <LocationHero location={city} />
      <AboutLocation location={city} />
      <PropertiesList location={city} />
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
