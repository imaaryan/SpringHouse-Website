import React from "react";
import Header from "@/app/components/home/Header";
import Footer from "@/app/components/home/Footer";
import SolutionsDesktop from "@/app/components/home/SolutionsDesktop";
import ContactForm from "@/app/components/home/ContactForm";
import GlobalBanner from "@/app/components/home/GlobalBanner";
import AvailableProperties from "@/app/components/solutions/AvailableProperties";
import LocationAmenities from "@/app/components/location/LocationAmenities";
import "@/app/components/solutions/Solution.css";

// Temporary Dummy Data for Layout testing
const DUMMY_CITY = {
  _id: "city1",
  name: "Gurugram",
  slug: "gurugram",
  image: "assets/locationdetail/banner/1747118432_gurugram.jpg", // Valid Local Image
  description:
    "Discover premium Coworking logic in Gurugram! Find dedicated seating, high-speed Wi-Fi, and premium meeting rooms designed for your comfort and growth.",
};

const DUMMY_PROPERTIES = [
  {
    _id: "prop1",
    name: "SpringHouse Golf Course",
    slug: "golf-course",
    propertyCode: "SH-GUR-01",
    fullAddress: "Golf Course Extension Road, Sector 56, Gurugram",
    size: 4500,
    area: { name: "Golf Course Road" },
    city: { _id: "city1", name: "Gurugram", slug: "gurugram" },
    images: [
      "/assets/locationdetail/banner/1747119868_gurugram.jpg",
      "/assets/locationdetail/banner/1747118432_gurugram.jpg",
    ],
    activeSolutions: [{ _id: "sol1", name: "Coworking" }],
  },
  {
    _id: "prop2",
    name: "SpringHouse DLF Phase 5",
    slug: "dlf-phase-5",
    propertyCode: "SH-GUR-02",
    fullAddress: "Plot No 530, DLF Phase 5, Gurugram",
    size: 2000,
    area: { name: "DLF Phase 5" },
    city: { _id: "city1", name: "Gurugram", slug: "gurugram" },
    images: ["/assets/locationdetail/banner/1747118432_gurugram.jpg"],
    activeSolutions: [{ _id: "sol2", name: "Managed Office" }],
  },
];

const OTHER_CITIES = [
  { _id: "city2", name: "Delhi", slug: "delhi" },
  { _id: "city3", name: "Noida", slug: "noida" },
];

export default async function CityPage({ params }) {
  const { slug } = await params;

  // Use dummy static objects for testing layout
  const cityData = DUMMY_CITY.slug === slug ? DUMMY_CITY : DUMMY_CITY;

  const cityProps = DUMMY_PROPERTIES.filter(
    (prop) => prop.city._id === cityData._id,
  );

  // Group by area
  const groupedProperties = {};
  cityProps.forEach((prop) => {
    const areaName = prop.area?.name || "Other";
    if (!groupedProperties[areaName]) groupedProperties[areaName] = [];
    groupedProperties[areaName].push(prop);
  });

  const uniqueSolutions = [
    { _id: "sol1", name: "Coworking" },
    { _id: "sol2", name: "Managed Office" },
  ];

  const amenities = cityProps.flatMap((p) => p.amenities || []);

  return (
    <>
      <Header />

      {/* Hero Banner Component Unified */}
      <GlobalBanner title={cityData.name} imageSrc={cityData.image} />

      {/* City Description Section */}
      <section
        className="specfic-guru pt30 aos-init aos-animate"
        data-aos="fade-up"
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 mb-4">
              <h3 className="mb-3">{cityData.name}</h3>
              <div dangerouslySetInnerHTML={{ __html: cityData.description }} />
            </div>

            {/* Area Tabs */}
            <div className="col-md-8 col-12 mt-4">
              <div className="loaction-tab">
                {Object.keys(groupedProperties).map((areaName) => (
                  <a
                    key={areaName}
                    href={`#${areaName.replace(/\s+/g, "-").toLowerCase()}`}
                  >
                    {areaName}
                  </a>
                ))}
              </div>
            </div>

            {/* Solution Filter Dropdown */}
            <div className="col-md-4 mt-4">
              <div className="loaction-drop">
                <form id="filterForm">
                  <select className="form-select">
                    <option value="">Select a Solution</option>
                    {uniqueSolutions.map((solution) => (
                      <option key={solution._id} value={solution._id}>
                        {solution.name}
                      </option>
                    ))}
                  </select>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Cards using the Centralized Unified UI Slider Component */}
      <AvailableProperties properties={DUMMY_PROPERTIES} />

      {/* Global Location Amenities Component */}
      <LocationAmenities />

      <SolutionsDesktop />

      {/* Other Locations Section */}
      <section className="specfic-prop amenities pt60">
        <div className="container-fluid">
          <div className="row mb-4">
            <div className="col-lg-6 col-12">
              <span className="section-title-span">Other locations</span>
            </div>
          </div>
          <div className="row">
            {OTHER_CITIES.map((city) => (
              <div key={city._id} className="col-md-6 col-6">
                <div className="box-loc mb-lg-0 mb-md-0 mb-3">
                  <a href={`/coworking-space/${city.slug}`}>{city.name}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactForm />
      <Footer />
    </>
  );
}
