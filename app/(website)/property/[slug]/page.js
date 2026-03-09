import "@/app/components/property/property.css";
import Header from "@/app/components/home/Header";
import Footer from "@/app/components/home/Footer";
import PropertyHero from "@/app/components/property/PropertyHero";
import PropertyDescription from "@/app/components/property/PropertyDescription";
import PropertyAmenities from "@/app/components/property/PropertyAmenities";
import PropertySolutions from "@/app/components/property/PropertySolutions";
import PropertyLocationMap from "@/app/components/property/PropertyLocationMap";
import AvailableProperties from "@/app/components/solutions/AvailableProperties";
import Link from "next/link";
import React from "react";
import connectDB from "@/utils/db";
import FooterModel from "@/model/footer.model";
import { getDropdownOptions } from "@/utils/dropdowns";

// DUMMY DATA FOR SINGLE PROPERTY TESTING (Layout Architecture Verification before APIs)
const DUMMY_SINGLE_PROPERTY = {
  _id: "prop-golf-course",
  name: "SpringHouse Golf Course",
  propertyCode: "SH-GUR-01",
  slug: "golf-course",
  size: 4500,
  area: { name: "Golf Course Extension Road" },
  city: { slug: "gurugram", name: "Gurugram" },
  fullAddress:
    "Golf Course Extension Road, Sector 56, Gurugram, Haryana - 122002",
  description:
    "Experience premium coworking at SpringHouse Golf Course with breathtaking views...",
  images: [
    "/assets/locationdetail/banner/1747119868_gurugram.jpg",
    "/assets/locationdetail/banner/1747118432_gurugram.jpg",
  ],
  activeSolutions: [
    {
      _id: "sol-1",
      name: "Coworking",
      image: "/assets/locationdetail/banner/1747118432_gurugram.jpg",
    },
    {
      _id: "sol-2",
      name: "Managed Office",
      image: "/assets/locationdetail/banner/1747307186_delhilocation.jpg",
    },
  ],
  amenities: [
    {
      _id: "am-1",
      name: "Meeting Rooms",
      featuredIcon: "/assets/amenities/cafeteria.png", // using known local assets
    },
    {
      _id: "am-2",
      name: "High Speed WiFi",
      featuredIcon: "/assets/amenities/wifi.png",
    },
  ],
  locationOnMap: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.348873210499!2d77.10098551508493!3d28.408711382506725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d21e06f157777%3A0xe5a3c98d63321db8!2sSpringHouse%20Coworking%20Golf%20Course%20Road!5e0!3m2!1sen!2sin!4v1628169123456!5m2!1sen!2sin" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`,
};

const DUMMY_RELATED_PROPERTIES = [
  {
    _id: "prop2",
    city: { slug: "gurugram", name: "Gurugram" },
    activeSolutions: [{ slug: "managed-office" }],
    name: "SpringHouse DLF Phase 5",
    images: ["/assets/locationdetail/banner/1747118432_gurugram.jpg"],
    propertyCode: "SH-GUR-02",
    fullAddress: "Plot No 530, DLF Phase 5, Gurugram",
  },
];

const OTHER_CITIES = [
  { name: "Noida", slug: "noida" },
  { name: "Delhi", slug: "delhi" },
];

export default async function PropertyDetailPage({ params }) {
  const { slug } = await params;

  // We are currently rendering strictly STATIC DUMMY DATA mapping identical structure for UI verification.
  const property = DUMMY_SINGLE_PROPERTY;
  const relatedProperties = DUMMY_RELATED_PROPERTIES;

  await connectDB();
  const footerData = (await FooterModel.findOne({}).lean()) || {};
  const phone = footerData?.contactInfo?.phone || "";
  const dropdownOptions = await getDropdownOptions();

  return (
    <>
      <Header />

      <PropertyHero property={property} />
      <PropertyDescription
        property={property}
        phone={phone}
        dropdownOptions={dropdownOptions}
      />
      <PropertyAmenities amenities={property.amenities} />
      <PropertySolutions activeSolutions={property.activeSolutions} />
      <PropertyLocationMap locationOnMap={property.locationOnMap} />

      {/* Relational Content using central wrapper layout  */}
      <AvailableProperties properties={relatedProperties} />

      <section className="specfic-prop amenities pt60 pb60">
        <div className="container-fluid">
          <div className="row mb-4">
            <div className="col-lg-6 col-12">
              <span className="section-title-span">Other locations</span>
            </div>
          </div>
          <div className="row">
            {OTHER_CITIES.map((city) => (
              <div key={city.slug} className="col-md-6 col-6">
                <div className="box-loc mb-lg-0 mb-md-0 mb-3">
                  <Link href={`/location/${city.slug}`}>{city.name}</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
