import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";
import { ContactInfoSection } from "./sections/ContactInfoSection";
import { HeroSection } from "./sections/HeroSection";
import { ProductGallerySection } from "./sections/ProductGallerySection";

export const ElementLight = (): JSX.Element => {
  // Location confirmation dialog data
  const locationData = {
    region: "Samarqand viloyati",
    progressValue: 100, // Full progress bar
    options: [
      { text: "Да", isSelected: true, className: "bg-[#0942c3] text-white" },
      { text: "Нет", isSelected: false, className: "bg-[#e3e3e3] text-black" },
    ],
  };

  return (
    <div className="flex flex-col min-h-[900px] items-start relative bg-white">
      <div className="relative self-stretch w-full">
        {/* Main sections */}
        <ProductGallerySection />
        <HeroSection />
        <ContactInfoSection />

        {/* Footer */}
        <div className="flex flex-col w-full items-center py-4 bg-[#c6b3a3]">
          <div className="flex flex-col max-w-[1206px] w-full items-start px-[15px]">
            <div className="flex items-start relative self-stretch w-full">
              <div className="inline-flex flex-col items-start relative self-stretch">
                <div className="flex flex-col items-start relative self-stretch w-full">
                  <p className="font-normal text-white text-[15.1px] leading-6 whitespace-nowrap">
                    ©2021-2025 &#39;SAM-ANTEP-GILAM&#39; MChJ STIR 203212614.
                    Barcha huquqlar himoyalangan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Location confirmation dialog */}
      <Card className="max-w-[274px] w-[276px] absolute top-[98px] left-[39px] border border-solid border-[#00000033] p-0 rounded-none">
        <CardContent className="flex flex-col items-center gap-1 pt-[13px] pb-2.5 px-2 p-0">
          <div className="flex flex-col items-start px-3 py-2 relative self-stretch w-full bg-white rounded-[3.8px_3.8px_0px_0px]">
            <p className="font-normal text-[#212529] text-[15.9px] leading-6">
              hududingiz {locationData.region}?
              <br />
              viloyati?
            </p>
          </div>

          <div className="relative w-[234px] h-[5px]">
            <Progress
              value={locationData.progressValue}
              className="h-[5px] bg-[#d9d9d9]"
            />
          </div>

          <div className="flex items-center justify-center gap-6 pt-3 pb-2 px-3 relative self-stretch w-full">
            {locationData.options.map((option, index) => (
              <Button
                key={index}
                className={`w-[105px] h-[33px] px-2.5 py-1.5 border-2 border-solid border-[#6c757d] rounded-none ${option.className}`}
              >
                <span
                  className={`text-${index === 0 ? "white" : "black"} text-${index === 0 ? "sm" : "[13.1px]"} text-center leading-[21px] font-normal`}
                >
                  {option.text}
                </span>
              </Button>
            ))}
          </div>

          <div className="absolute w-4 h-2 top-[-9px] left-[129px]" />
          <div className="absolute w-4 h-px top-0 left-[129px] border-b [border-bottom-style:solid] border-[#f6f6f6]" />
        </CardContent>
      </Card>
    </div>
  );
};
