import React from "react";
import Header from "@/app/components/home/Header";
import GlobalBanner from "@/app/components/home/GlobalBanner";
import AboutLocation from "@/app/components/location/AboutLocation";
import AvailableProperties from "@/app/components/solutions/AvailableProperties";
import LocationAmenities from "@/app/components/location/LocationAmenities";

import LifeAtSpringHouse from "@/app/components/home/LifeAtSpringHouse";
import SolutionsDesktop from "@/app/components/home/SolutionsDesktop";
import SolutionsMobile from "@/app/components/home/SolutionsMobile";
import OtherLocations from "@/app/components/location/OtherLocations";
import ContactForm from "@/app/components/home/ContactForm";
import Footer from "@/app/components/home/Footer";

// Temporary Mapping for testing UI logic reliably
const DUMMY_PROPERTIES = [
  {
    _id: "prop1",
    city: { slug: "new-delhi", name: "New Delhi" },
    activeSolutions: [{ slug: "managed-office" }, { slug: "coworking" }],
    name: "SpringHouse Naraina",
    images: [
      "/assets/locationdetail/banner/1747118432_gurugram.jpg",
      "/assets/locationdetail/banner/1747307186_delhilocation.jpg",
    ],
    propertyCode: "SH-DEL-01",
    fullAddress: "Arise Building, Naraina Vihar, New Delhi - 110028",
  },
  {
    _id: "prop2",
    city: { slug: "gurugram", name: "Gurugram" },
    activeSolutions: [{ slug: "managed-office" }],
    name: "SpringHouse Golf Course",
    images: ["/assets/locationdetail/banner/1747119868_gurugram.jpg"],
    propertyCode: "SH-GUR-01",
    fullAddress: "Golf Course Extension Road, Sector 56, Gurugram",
  },
];

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

  const cityProperties = DUMMY_PROPERTIES.filter(
    (property) => property.city?.slug === city,
  );

  return (
    <>
      <Header />
      <GlobalBanner
        title={city}
        imageSrc={"/assets/locationdetail/banner/1747118432_gurugram.jpg"}
      />
      <AboutLocation location={city} />
      <AvailableProperties properties={cityProperties} />
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
