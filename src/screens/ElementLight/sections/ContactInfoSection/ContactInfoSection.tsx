import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const ContactInfoSection = (): JSX.Element => {
  // Category data
  const categories = [
    { name: "Gilamlar" },
    { name: "Kovrolin" },
    { name: "Gazon" },
  ];

  // Information data
  const information = [
    { name: "SAG haqida" },
    { name: "Do'konlar" },
    { name: "Bloglar" },
  ];

  // Contact data
  const contactNumbers = [
    { number: "+ 998 (55) 701-04-04" },
    { number: "+ 998 (66) 230-40-04" },
  ];

  // Social media data
  const socialMedia = [
    { name: "LinkedIn", bgImage: "bg-[url(/linkedin-w3mrgj2-png.png)]" },
    { name: "Pinterest", bgImage: "bg-[url(/pinterest-png.png)]" },
    { name: "YouTube", bgImage: "bg-[url(/youtube-png.png)]" },
    { name: "Instagram", bgImage: "bg-[url(/instagram-png.png)]" },
    { name: "Telegram", bgImage: "bg-[url(/telegram-png.png)]" },
    { name: "Facebook", bgImage: "bg-[url(/facebook-png.png)]" },
  ];

  return (
    <footer className="w-full flex justify-center bg-transparent py-8">
      <Card className="border-none shadow-none max-w-[1206px] w-full">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Categories Column */}
            <div className="flex flex-col gap-2 p-4">
              <h3 className="font-normal text-[21.8px] text-[#01091c] leading-[33px] font-['Inter',Helvetica]">
                Kategoriyalar
              </h3>
              <div className="flex flex-col gap-1">
                {categories.map((category, index) => (
                  <a
                    key={index}
                    href="#"
                    className="font-normal text-base text-[#01091c] leading-6 font-['Inter',Helvetica]"
                  >
                    {category.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Information Column */}
            <div className="flex flex-col gap-2 p-4">
              <h3 className="font-normal text-[22px] text-[#01091c] leading-[33px] font-['Inter',Helvetica]">
                Ma'lumotlar
              </h3>
              <div className="flex flex-col gap-1">
                {information.map((info, index) => (
                  <a
                    key={index}
                    href="#"
                    className="font-normal text-base text-[#01091c] leading-6 font-['Inter',Helvetica] whitespace-nowrap"
                  >
                    {info.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Call Center Column */}
            <div className="flex flex-col gap-2 p-4">
              <h3 className="font-normal text-[21.5px] text-[#01091c] leading-[33px] font-['Inter',Helvetica]">
                Call-center
              </h3>
              <div className="flex flex-col gap-1">
                {contactNumbers.map((contact, index) => (
                  <a
                    key={index}
                    href={`tel:${contact.number.replace(/\s+/g, "")}`}
                    className="font-normal text-sm text-[#01091c] leading-6 font-['Inter',Helvetica] whitespace-nowrap"
                  >
                    {contact.number}
                  </a>
                ))}
              </div>
            </div>

            {/* Social Media Column */}
            <div className="flex flex-col p-4">
              <div className="flex items-center gap-2.5">
                {socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className="inline-flex flex-col items-start pt-[4.08px] pb-[1.92px]"
                    aria-label={social.name}
                  >
                    <div
                      className={`relative w-[18px] h-[18px] ${social.bgImage} bg-cover bg-[50%_50%]`}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </footer>
  );
};
