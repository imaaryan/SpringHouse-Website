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

// Static Testing Data for Layout Checking
const DUMMY_SOLUTIONS = [
  {
    slug: "managed-office",
    name: "Managed Office",
    image: "/assets/locationdetail/banner/1747118432_gurugram.jpg", // Valid local image
    description:
      "MANAGED OFFICE - A Fully Serviced Office Without the Hassle\r\nSpringHouse transforms the way you work with our premium Managed Office solutions. Designed for growing startups, satellite teams, and established enterprises, our private offices offer the perfect blend of privacy, professionalism, and productivity. Get a dedicated workspace that reflects your brand identity, fully equipped with ergonomic furniture, high-speed internet, and enterprise-grade security.",
    fourPoints: [
      "Exclusive Office Space",
      "Operational Support",
      "Prime Locations across Delhi-NCR",
      "Designed for Growth",
    ],
  },
  {
    slug: "coworking",
    name: "Coworking",
    image: "/assets/locationdetail/banner/1747118432_gurugram.jpg", // Valid local image
    description:
      "COWORKING - The ultimate ecosystem for creators and innovators\r\n...",
    fourPoints: [
      "Flexible Desks",
      "Community events",
      "Fast WiFi",
      "Prime Location",
    ],
  },
];

const DUMMY_PROPERTIES = [
  {
    _id: "prop1",
    city: { slug: "delhi", name: "Delhi" },
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

export default async function Page({ params }) {
  const { slug } = await params;

  /* Using Static Testing Data Temporary */
  const solution = DUMMY_SOLUTIONS.find((item) => item.slug === slug);

  // Fallback to static props if slug is unknown simply for testing rendering
  const activeSolution = solution || DUMMY_SOLUTIONS[0];
  const description = activeSolution.description?.split("\r\n") || [];

  const solutionProperties = DUMMY_PROPERTIES.filter((property) =>
    property.activeSolutions?.some((sol) => sol.slug === slug),
  );

  return (
    <>
      <Header />

      {/* Banner Component */}
      <GlobalBanner
        title={activeSolution.name}
        imageSrc={activeSolution.image}
      />

      {/* Clean Intro Component */}
      <SolutionIntro
        description={description}
        fourPoints={activeSolution.fourPoints}
      />

      {/* Raw HTML 500 lines has been isolated */}
      {slug === "managed-office" && (
        <>
          <Testimonials />
          <ManagedOfficeStatic />
        </>
      )}

      {/* Properties Component */}
      <AvailableProperties properties={solutionProperties} showTabs={true} />

      {slug === "coworking" && (
        <>
          <OurCommunity />
          <Networking />
        </>
      )}

      {/* Global Elements */}
      <OtherSolutions />
      <ContactForm />
      <Footer />
    </>
  );
}
