import { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import logo from '../assets/logo.png'
import { useLanguage } from '../contexts/LanguageContext';
import { RegionModal } from './RegionModal';
import { translations } from '../translations';

export const Navbar = (): JSX.Element => {
  const { language, setLanguage, t } = useLanguage();
  const regionsAvailable = translations[language]['region.regions_available'] as string[];
  const regionsSoon = translations[language]['region.regions_soon'] as string[];
  const defaultRegion = regionsAvailable && regionsAvailable.length > 0 ? regionsAvailable[0] : '';

  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);

  // region logic
  const [region, setRegion] = useState<string>(() => {
    const saved = localStorage.getItem('selectedRegion');
    return saved || defaultRegion;
  });
  const [showRegionQuestion, setShowRegionQuestion] = useState(false);
  const [showRegionSelect, setShowRegionSelect] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('selectedRegion')) {
      setShowRegionQuestion(true);
    }
  }, [defaultRegion]);

  // Сохранять регион в localStorage при изменении
  useEffect(() => {
    if (region) {
      localStorage.setItem('selectedRegion', region);
    }
  }, [region]);

  const handleAcceptRegion = () => {
    if (!defaultRegion) return;
    setRegion(defaultRegion);
    localStorage.setItem('selectedRegion', defaultRegion);
    setShowRegionQuestion(false);
  };
  const handleDeclineRegion = () => {
    setShowRegionQuestion(false);
    setShowRegionSelect(true);
  };
  const handleSelectRegion = (reg: string) => {
    setRegion(reg);
  };
  const handleCloseSelect = () => {
    localStorage.setItem('selectedRegion', region);
    setShowRegionSelect(false);
  };
  const handleRegionClick = () => {
    setShowRegionSelect(true);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Navigation menu items data with translation keys
  const navigationItems = [
    { 
      key: 'nav.catalog',
      className: "text-base" 
    },
    { 
      key: 'nav.video_clips',
      className: "text-[15.9px]" 
    },
    { 
      key: 'nav.about',
      className: "text-base" 
    },
    { 
      key: 'nav.methods',
      className: "text-[15.8px]" 
    },
    { 
      key: 'nav.sales',
      className: "text-[15.4px]" 
    },
  ];

  const navActive = scrolled || hovered;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-20 transition-colors duration-300 container ${
          navActive ? "bg-white text-black shadow" : "bg-transparent text-white"
        }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex flex-col w-full items-center">
          <div className="flex flex-col container w-full items-center py-0 ">
            <header className="flex flex-col items-start  self-stretch w-full flex-[0_0_auto] bg-transparent">
              <div className="flex items-center justify-end pt-4 pb-0 px-0  self-stretch w-full">
                {/* Location */}
                <div className="flex items-center h-6 cursor-pointer" onClick={handleRegionClick}>
                  {/* Location icon */}
                  <svg className="w-4 h-4 text-current" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 9.75c0 7.22-7.5 11.25-7.5 11.25s-7.5-4.03-7.5-11.25a7.5 7.5 0 1 1 15 0Z"/></svg>
                  <div className="ml-2 [font-family:'Inter',Helvetica] font-normal text-base tracking-[0] leading-6 whitespace-nowrap">
                    {region}
                  </div>
                </div>

                {/* Language selector */}
                <div className="inline-flex flex-col items-start pl-[19px] pr-0 py-0 ">
                  <div className="inline-flex items-center justify-center  gap-2">
                    <button
                      className={`text-[13.8px] ${language === 'uzb' ? 'font-bold underline' : ''}`}
                      onClick={() => setLanguage('uzb')}
                    >O'z</button>
                    <button
                      className={`text-[13.8px] ${language === 'rus' ? 'font-bold underline' : ''}`}
                      onClick={() => setLanguage('rus')}
                    >Ru</button>
                    <button
                      className={`text-[13.8px] ${language === 'en' ? 'font-bold underline' : ''}`}
                      onClick={() => setLanguage('en')}
                    >En</button>
                  </div>
                </div>
              
              </div>

              {/* Main navigation bar */}
              <div className="flex items-center justify-between pt-[15px] pb-[30px] px-0 w-full">
                {/* Logo */}
                <div className="flex flex-col w-[90px] h-[35px] items-start">
                  <div className="flex flex-col w-[90px] h-[35px] items-start pl-0 pr-1 pt-0 pb-1.5">
                    <img
                      className="w-[86px] h-[29px]"
                      alt="Logo"
                      src={logo}
                    />
                    {showRegionQuestion && (
                      <div className="mt-4">
                        <RegionModal
                          showQuestion={showRegionQuestion}
                          onAccept={handleAcceptRegion}
                          onDecline={handleDeclineRegion}
                          showSelect={false}
                          regionsAvailable={[]}
                          regionsSoon={[]}
                          selectedRegion={region}
                          onSelectRegion={() => {}}
                          onCloseSelect={() => {}}
                          t={t}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Navigation menu */}
                <NavigationMenu className="max-w-none">
                  <NavigationMenuList className="flex gap-8">
                    {navigationItems.map((item, index) => (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuLink
                          className={`${item.className} [font-family:'Inter',Helvetica] font-normal tracking-[0] leading-6 whitespace-nowrap pb-1 hover:border-b-2 hover:border-black transition-all duration-75`}
                        >
                          {t(item.key)}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>

                <div className="flex items-center gap-4 ml-6">
                  {/* Search icon */}
                  <button aria-label="Search">
                    <svg className="w-5 h-5 text-current" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 6.75 6.75a7.5 7.5 0 0 0 9.9 9.9Z"/></svg>
                  </button>
                  {/* Cart icon */}
                  <button aria-label="Cart">
                    <svg className="w-5 h-5 text-current" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437m0 0L7.05 13.607A2.25 2.25 0 0 0 9.246 15h5.508a2.25 2.25 0 0 0 2.196-1.607l2.044-7.335a1.125 1.125 0 0 0-1.087-1.435H5.106Zm0 0L4.068 6.68M6 20.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm10.5 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"/></svg>
                  </button>
                </div>
              </div>
            </header>
          </div>
        </div>
      </nav>
      {showRegionSelect && (
        <RegionModal
          showQuestion={false}
          onAccept={handleAcceptRegion}
          onDecline={handleDeclineRegion}
          showSelect={showRegionSelect}
          regionsAvailable={regionsAvailable}
          regionsSoon={regionsSoon}
          selectedRegion={region}
          onSelectRegion={handleSelectRegion}
          onCloseSelect={handleCloseSelect}
          t={t}
        />
      )}
    </>
  );
};
