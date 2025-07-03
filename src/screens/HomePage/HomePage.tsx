import { ContactInfoSection } from './sections/ContactInfoSection/ContactInfoSection';
import { Navbar } from '../../components/Navbar';
import hero from '../../assets/hero.png';
import { Footer } from '../../components/ui/Footer';
import { InfoSection } from './sections/InfoSection';
import { FAQSection } from './sections/FAQSection';
import { CollectionSection } from './sections/CollectionSection';
import { VideoSection } from './sections/VideoSection';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F7] w-full">
      {/* Hero-блок с фоном */}
      <div
        className="relative w-full h-[100vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${hero})` }}
      >
        <Navbar />
      </div>
      <InfoSection/>
      <VideoSection/>
      <FAQSection/>
      <CollectionSection/>
        <ContactInfoSection />
      <Footer/>
    </div>
  );
}; 