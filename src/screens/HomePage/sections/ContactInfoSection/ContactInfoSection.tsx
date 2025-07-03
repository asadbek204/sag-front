import { Card, CardContent } from "../../../../components/ui/card";
import { 
  Linkedin, 
  // Pinterest, 
  Youtube, 
  Instagram, 
  MessageCircle, 
  Facebook 
} from 'lucide-react';
import { useLanguage } from '../../../../contexts/LanguageContext';

export const ContactInfoSection = (): JSX.Element => {
  const { t } = useLanguage();

  // Category data
  const categories = [
    { name: t('footer.categories'), href: '/catalog' },
    { name: "Kovrolin", href: '/catalog/kovrolin' },
    { name: "Gazon", href: '/catalog/gazon' },
  ];

  // Information data
  const information = [
    { name: t('footer.about'), href: '/about' },
    { name: t('nav.methods'), href: '/methods' },
    { name: t('nav.video_clips'), href: '/videos' },
    { name: t('footer.sales'), href: '/sales' },
  ];

  // Contact data
  const contactNumbers = [
    { number: "+ 998 (55) 701-04-04", href: 'tel:+998557010404' },
    { number: "+ 998 (66) 230-40-04", href: 'tel:+998662304004' },
  ];

  // Social media data
  const socialMedia = [
    { name: "LinkedIn", icon: <Linkedin className="w-[20px] h-[20px] text-black" />, link: "https://linkedin.com/" },
    // { name: "Pinterest", icon: <Pinterest className="w-[30px] h-[30px] text-black" />, link: "https://pinterest.com/" },
    { name: "YouTube", icon: <Youtube className="w-[20px] h-[20px] text-black" />, link: "https://youtube.com/" },
    { name: "Instagram", icon: <Instagram className="w-[20px] h-[20px] text-black" />, link: "https://instagram.com/" },
    { name: "Telegram", icon: <MessageCircle className="w-[20px] h-[20px] text-black" />, link: "https://t.me/" },
    { name: "Facebook", icon: <Facebook className="w-[20px] h-[20px] text-black" />, link: "https://facebook.com/" },
  ];

  return (
    <footer className=" bg-white  py-8">
      <Card className="border-none shadow-none container mx-auto ">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4 text-center md:text-left">
            {/* Categories Column */}
            <div className="flex flex-col gap-2 p-4 w-full md:w-auto">
              <h3 className="font-normal text-[21.8px] text-[#01091c] leading-[33px] font-['Inter',Helvetica]">
                {t('footer.categories')}
              </h3>
              <div className="flex flex-col gap-1">
                {categories.map((category, index) => (
                  <a
                    key={index}
                    href={category.href}
                    className="font-normal text-base text-[#01091c] leading-6 font-['Inter',Helvetica]"
                  >
                    {category.name}
                  </a>
                ))}
              </div>
            </div>
            {/* Information Column */}
            <div className="flex flex-col gap-2 p-4 w-full md:w-auto">
              <h3 className="font-normal text-[22px] text-[#01091c] leading-[33px] font-['Inter',Helvetica]">
                {t('footer.information')}
              </h3>
              <div className="flex flex-col gap-1">
                {information.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    className="font-normal text-base text-[#01091c] leading-6 font-['Inter',Helvetica] whitespace-nowrap"
                  >
                    {info.name}
                  </a>
                ))}
              </div>
            </div>
            {/* Call Center Column */}
            <div className="flex flex-col gap-2 p-4 w-full md:w-auto items-center md:items-start">
              <h3 className="font-normal text-[21.5px] text-[#01091c] leading-[33px] font-['Inter',Helvetica]">
                {t('footer.callcenter')}
              </h3>
              <div className="flex flex-col gap-1">
                {contactNumbers.map((contact, index) => (
                  <a
                    key={index}
                    href={contact.href}
                    className="font-normal text-sm text-[#01091c] leading-6 font-['Inter',Helvetica] whitespace-nowrap"
                  >
                    {contact.number}
                  </a>
                ))}
              </div>
            </div>
            {/* Social Media Column */}
            <div className="flex flex-col p-4 w-full md:w-auto items-center md:items-start">
              <div className="flex items-center justify-center md:justify-start gap-2.5">
                {socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    className="inline-flex flex-col items-start pt-[4.08px] pb-[1.92px]"
                    aria-label={social.name}
                    target="_blank" rel="noopener noreferrer"
                  >
                    {social.icon}
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