import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import logo from '../assets/logo.png';
import { useLanguage } from '../contexts/LanguageContext';

export const Navbar = (): JSX.Element => {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const navigationItems = [
    { key: 'nav.catalog', path: '/catalog', className: "text-base" },
    { key: 'nav.video_clips', path: '/videos', className: "text-[15.9px]" },
    { key: 'nav.about', path: '/about', className: "text-base" },
    { key: 'nav.methods', path: '/methods', className: "text-[15.8px]" },
    { key: 'nav.sales', path: '/sales', className: "text-[15.4px]" },
  ];

  const navActive = scrolled || hovered || location.pathname !== "/";

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 md:py-5 py-3 w-full  transition-colors z-30 duration-300 ${
        navActive ? "bg-white  text-black shadow" : "bg-transparent text-white"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="container mx-auto px-4">
        <header className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img className="w-[86px] h-[29px]" alt="Logo" src={logo} />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex max-w-none">
            <NavigationMenuList className="flex gap-8">
              {navigationItems.map((item, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink
                    asChild
                    className={`${item.className} font-['Inter'] font-normal tracking-[0] leading-6 whitespace-nowrap pb-1 hover:border-b-2 hover:border-black transition-all duration-75`}
                  >
                    <Link to={item.path}>{t(item.key)}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Language Buttons and Search */}
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center gap-3">
              <button
                className={`text-[13.8px] ${language === 'uzb' ? 'font-bold underline' : ''}`}
                onClick={() => setLanguage('uzb')}
              >
                O'z
              </button>
              <button
                className={`text-[13.8px] ${language === 'rus' ? 'font-bold underline' : ''}`}
                onClick={() => setLanguage('rus')}
              >
                Ru
              </button>
              <button
                className={`text-[13.8px] ${language === 'en' ? 'font-bold underline' : ''}`}
                onClick={() => setLanguage('en')}
              >
                En
              </button>
            </div>
            <div className="relative">
              <button
                aria-label="Search"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <svg
                  className="w-5 h-5 text-current"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 6.75 6.75a7.5 7.5 0 0 0 9.9 9.9Z"
                  />
                </svg>
              </button>
              {isSearchOpen && (
                <div className="absolute right-0 top-10 bg-white text-black shadow-lg p-2 rounded-md flex items-center gap-2">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearchSubmit}
                    placeholder={t('search')}
                    className="outline-none border-none text-black w-48 py-1 px-2"
                  />
                  <button
                    onClick={handleClearSearch}
                    aria-label="Clear search"
                    className="text-red-500"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            {/* Burger Button */}
            <button
              className="md:hidden"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </header>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="md:hidden fixed top-0 right-0 w-[60%] h-full bg-white text-black shadow-lg transform transition-transform duration-300 ease-in-out"
            style={{ transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)' }}
          >
            <div className="flex flex-col items-center py-4 mt-16">
              {navigationItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`${item.className} font-['Inter'] font-normal tracking-[0] leading-6 py-2 hover:border-b-2 hover:border-black transition-all duration-75`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(item.key)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};