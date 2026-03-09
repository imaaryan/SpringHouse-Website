import Header from "../components/home/Header";
import HeroBanner from "../components/home/HeroBanner";
import PresenceCounter from "../components/home/PresenceCounter";
import SolutionsDesktop from "../components/home/SolutionsDesktop";
import SolutionsMobile from "../components/home/SolutionsMobile";
import LocationCards from "../components/home/LocationCards";
import DesignYourIdealWorkNest from "../components/home/DesignYourIdealWorkNest";
import LifeAtSpringHouse from "../components/home/LifeAtSpringHouse";
import OurCommunity from "../components/home/OurCommunity";
import Networking from "../components/home/Networking";
import Testimonials from "../components/home/Testimonials";
import Blogs from "../components/home/Blogs";
import ContactForm from "../components/home/ContactForm";
import Footer from "../components/home/Footer";
import FooterModel from "@/model/footer.model";
import connectDB from "@/utils/db";
import { getDropdownOptions } from "@/utils/dropdowns";

export default async function Home() {
  await connectDB();
  const footerData = (await FooterModel.findOne({}).lean()) || {};
  const phone = footerData?.contactInfo?.phone || "";
  const dropdownOptions = await getDropdownOptions();

  return (
    <>
      <Header />
      <HeroBanner />
      <PresenceCounter />
      <LocationCards />
      <DesignYourIdealWorkNest />
      <LifeAtSpringHouse />
      <SolutionsDesktop />
      <SolutionsMobile />
      <Networking />
      <OurCommunity />
      <Testimonials />
      <Blogs />
      <ContactForm phone={phone} dropdownOptions={dropdownOptions} />
      <Footer />
    </>
  );
}
