import { ContactInfoSection } from './sections/ContactInfoSection/ContactInfoSection';
import { Navbar } from '../../components/Navbar';
import hero from '../../assets/hero.png';

export const HomePage = () => {
  return (
    <div className="min-h-screen w-full">
      {/* Hero-блок с фоном */}
      <div
        className="relative w-full h-[700px] bg-cover bg-center"
        style={{ backgroundImage: `url(${hero})` }}
      >
        <Navbar />
        {/* Здесь можно добавить HeroSection, если нужно */}
      </div>
      {/* ContactInfoSection на обычном фоне */}
      <div className="bg-white">
        <ContactInfoSection />
      </div>
    </div>
  );
}; 