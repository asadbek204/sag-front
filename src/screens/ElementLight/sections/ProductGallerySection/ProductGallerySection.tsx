import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../../../components/ui/navigation-menu";

export const ProductGallerySection = (): JSX.Element => {
  // Navigation menu items data
  const navigationItems = [
    { text: "Katalog", className: "text-base" },
    { text: "Do'konlar", className: "text-[15.9px]" },
    { text: "Blog", className: "text-[15.4px]" },
    { text: "SAG haqida", className: "text-base" },
    { text: "SAG method", className: "text-[15.8px]" },
  ];

  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex flex-col max-w-[1206px] w-full items-start px-[15px] py-0 relative">
        <header className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto] bg-transparent">
          {/* Top bar with location and language */}
          <div className="flex items-center justify-end pt-4 pb-0 px-0 relative self-stretch w-full">
            {/* Location */}
            <div className="relative flex items-center h-6">
              <img className="w-4 h-4" alt="Location icon" src="/svg.svg" />
              <div className="ml-5 [font-family:'Inter',Helvetica] font-normal text-white text-base tracking-[0] leading-6 whitespace-nowrap">
                Samarqand viloyati
              </div>
            </div>

            {/* Language selector */}
            <div className="inline-flex flex-col items-start pl-[19px] pr-0 py-0 relative">
              <div className="inline-flex items-center justify-center relative">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-white text-[13.8px] text-center tracking-[0] leading-6 whitespace-nowrap">
                  O`z
                </div>
              </div>
            </div>
          </div>

          {/* Main navigation bar */}
          <div className="flex items-center justify-between pt-[15px] pb-[30px] px-0 relative self-stretch w-full">
            {/* Logo */}
            <div className="flex flex-col w-[90px] h-[35px] items-start">
              <div className="flex flex-col w-[90px] h-[35px] items-start pl-0 pr-1 pt-0 pb-1.5">
                <img
                  className="w-[86px] h-[29px]"
                  alt="Logo"
                  src="/logo-741fc36d60d50eb55c82-svg.svg"
                />
              </div>
            </div>

            {/* Navigation menu */}
            <NavigationMenu className="max-w-none">
              <NavigationMenuList className="flex gap-8">
                {navigationItems.map((item, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      className={`${item.className} [font-family:'Inter',Helvetica] font-normal text-white tracking-[0] leading-6 whitespace-nowrap`}
                    >
                      {item.text}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Icons section */}
            <div className="flex items-center gap-4">
              {/* Search icon */}
              <div className="w-7 h-[34px] flex items-center justify-center">
                <img className="w-3.5 h-4" alt="Search icon" src="/image.svg" />
              </div>

              {/* Cart icon */}
              <div className="pt-[4.58px] pb-[2.42px]">
                <img
                  className="w-[22px] h-[17px]"
                  alt="Cart icon"
                  src="/svg-1.svg"
                />
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};
