import { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import logo from '../assets/imgSag2.png';
import logo2 from '../assets/imgSag.png'
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from "../contexts/LanguageContext";

export const Navbar = (): JSX.Element => {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCatalogDropdownOpen, setIsCatalogDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navRef = useRef<HTMLElement>(null);
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
        setIsCatalogDropdownOpen(false);
      }
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('button[aria-label="Search"]')
      ) {
        setIsSearchOpen(false);
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
    {
      key: 'nav.catalog',
      className: "text-base",
      subItems: [
        { key: 'nav.gilamlar', path: '/catalog', label: 'Gilamlar' },
        { key: 'nav.kovrolin', path: '/catalog', label: 'Kovrolin' },
        { key: 'nav.gazon', path: '/catalog', label: 'Gazon' },
        { key: 'nav.metrlik', path: '/catalog', label: "Metrlik yo'lak " },

      ],
    },
    { key: 'nav.rooms', path: '/rooms', className: "text-[15.9px]" },
    { key: 'nav.video_clips', path: '/videos', className: "text-[15.9px]" },
    { key: 'nav.sales', path: '/sales', className: "text-[15.4px]" },
    { key: 'nav.about', path: '/about', className: "text-base" },
    { key: 'nav.methods', path: '/methods', className: "text-[15.8px]" },
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

useEffect(() => {
  const html = document.documentElement;
  const body = document.body;

  if (isMenuOpen) {
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.width = '100%';
  } else {
    html.style.overflow = '';
    body.style.overflow = '';
    body.style.position = '';
    body.style.width = '';
  }

  return () => {
    html.style.overflow = '';
    body.style.overflow = '';
    body.style.position = '';
    body.style.width = '';
  };
}, [isMenuOpen]);




  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 md:py-5 py-3 w-full transition-colors z-30 duration-300 ${
        navActive ? "bg-[#FFFCE0] text-black shadow" : "bg-transparent text-white"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="container mx-auto px-4">
        <header className="flex items-center justify-between gap-4 ">
          {/* Logo */}
          <div className="flex items-center">
  <Link to="/">
    <img
      className="w-[78px] transition-all duration-300"
      alt="Logo"
      src={navActive ? logo2 : logo}
    />
  </Link>
</div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex max-w-none">
            <NavigationMenuList className="flex md:gap-14 gap-8">
              {navigationItems.map((item, index) => (
                <NavigationMenuItem
                  key={index}
                  onMouseEnter={() => item.key === 'nav.catalog' && setIsCatalogDropdownOpen(true)}
                  onMouseLeave={() => item.key === 'nav.catalog' && setIsCatalogDropdownOpen(false)}
                  className="relative"
                >
                  <NavigationMenuLink
                    asChild
                    className={`${item.className} font-['Inter'] font-normal tracking-[0] leading-6 whitespace-nowrap pb-1 hover:border-b-2 hover:border-black transition-all duration-75`}
                  >
                    <Link to={item.path}>{t(item.key)}</Link>
                  </NavigationMenuLink>
                  {item.key === 'nav.catalog' && isCatalogDropdownOpen && (
                    <div className="absolute w-32 top-full left-0 bg-[#FFFCE0] text-black shadow-lg z-40">
                      {item.subItems?.map((subItem) => (
                        <Link
                          key={subItem.key}
                          to={subItem.path}
                          className="block px-3 py-2 w-full   hover:bg-gray-200"
                          onClick={() => setIsCatalogDropdownOpen(false)}
                        >
                          {t(subItem.label)}
                        </Link>
                      ))}
                    </div>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Language Selector and Search */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex"><LanguageSelector navActive={navActive} /></div>

            <div className="relative flex items-center transition-all duration-300 gap-2">
              {/* Search Icon */}
              <button
                aria-label="Search"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                onMouseEnter={() => setHovered(false)}
                className="z-10"
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

              {/* Sliding Input Field */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isSearchOpen ? "md:w-48 opacity-100 ml-2" : "w-0 opacity-0 ml-0"
                }`}
              >
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchSubmit}
                  placeholder={t("search")}
                  className={`w-full px-2 py-1 border-b border-gray-400 outline-none bg-transparent text-sm ${
                    navActive ? 'text-black placeholder-gray-500' : 'text-white placeholder-gray-300'
                  }`}
                />
              </div>
            </div>

            {/* Burger Button */}
            <button
              className="lg:hidden"
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
    className="lg:hidden fixed top-0 right-0 w-[60%] h-full bg-white text-black shadow-lg transform transition-transform duration-300 ease-in-out z-40"
    style={{ transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)' }}
  >
    {/* Close button */}
    <div className="flex justify-end p-4">
      <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
        <X className="w-6 h-6 text-black" />
      </button>
    </div>

    {/* Navigation Items */}
    <div className="flex flex-col items-center py-4 mt-4">
      {navigationItems.map((item, index) => (
        <div key={index} className="w-full text-center">
          <Link
            to={item.path}
            className={`${item.className} font-['Inter'] font-normal tracking-[0] leading-6 py-2 hover:border-b-2 hover:border-black transition-all duration-75 block`}
            onClick={() => setIsMenuOpen(false)}
          >
            {t(item.key)}
          </Link>
          {item.key === 'nav.catalog' && (
            <div className="flex flex-col items-center">
              {item.subItems?.map((subItem) => (
                <Link
                  key={subItem.key}
                  to={subItem.path}
                  className="py-2 text-sm hover:bg-gray-100 w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(subItem.label)}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
      <LanguageSelector navActive={true} />
    </div>
  </div>
)}

      </div>
    </nav>
  );
};