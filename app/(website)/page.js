import Header from "../components/home/Header";
import HeroBanner from "../components/home/HeroBanner";
import PresenceCounter from "../components/home/PresenceCounter";
import SolutionsDesktop from "../components/home/SolutionsDesktop";
import SolutionsMobile from "../components/home/SolutionsMobile";
import LocationCards from "../components/home/LocationCards";
import DesignYourIdeal from "../components/home/DesignYourIdeal";
import OurCommunity from "../components/home/OurCommunity";
import Networking from "../components/home/Networking";
import Testimonials from "../components/home/Testimonials";
import Blogs from "../components/home/Blogs";
import ContactForm from "../components/home/ContactForm";
import Footer from "../components/home/Footer";
import ModalsAndScripts from "../components/home/ModalsAndScripts";

export default function Home() {
  return (
    <>
      <Header />
      <HeroBanner />
      <PresenceCounter />
      <LocationCards />
      <DesignYourIdeal />
      <SolutionsDesktop />
      <SolutionsMobile />
      <Networking />
      <OurCommunity />
      <Testimonials />
      <Blogs />
      <ContactForm />
      <Footer />
      <ModalsAndScripts />
    </>
  );
}
