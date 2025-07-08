import { Navbar } from "../components/Navbar";
import { Footer } from "../components/ui/Footer";
import { ContactInfoSection } from "../screens/HomePage/sections/ContactInfoSection";
import MethodSagPage from "../screens/VideosPage/NewsPage";

const MethodSag = () => {

  return (
    <div className="md:pt-28 pt-24 bg-[#FAF9F7]">
      <Navbar />
       <MethodSagPage/>
      <ContactInfoSection />
      <Footer />
    </div>
  );
};

export default MethodSag;
