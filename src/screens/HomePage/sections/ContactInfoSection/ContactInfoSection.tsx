import { Card, CardContent } from "../../../../components/ui/card";
import linkendin from '../../../../assets/linkendin.png'
import yt from '../../../../assets/youtube.png'
import pinterest from '../../../../assets/pinterest.png'
import instagram from '../../../../assets/instagram.png'
import telegram from '../../../../assets/telegram.png'
import facebook from '../../../../assets/facbook.png'
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
    { name: t('footer.stores'), href: '/stores' },
    { name: t('footer.blogs'), href: '/blogs' },
    { name: t('footer.sales'), href: '/sales' },
  ];

  // Contact data
  const contactNumbers = [
    { number: "+ 998 (55) 701-04-04", href: 'tel:+998557010404' },
    { number: "+ 998 (66) 230-40-04", href: 'tel:+998662304004' },
  ];

  // Social media data
  const socialMedia = [
    { name: "LinkedIn", icon: linkendin, link: "https://linkedin.com/" },
    { name: "Pinterest", icon: pinterest, link: "https://pinterest.com/" },
    { name: "YouTube", icon: yt, link: "https://youtube.com/" },
    { name: "Instagram", icon: instagram, link: "https://instagram.com/" },
    { name: "Telegram", icon: telegram, link: "https://t.me/" },
    { name: "Facebook", icon: facebook, link: "https://facebook.com/" },
  ];

  return (
    <footer className="w-full bg-white  flex flex-col items-center  py-8">
      <Card className="border-none shadow-none container mx-auto w-full">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-4 justify-between gap-4">
            {/* Categories Column */}
            <div className="flex flex-col gap-2 p-4">
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
            <div className="flex flex-col gap-2 p-4">
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
            <div className="flex flex-col gap-2 p-4">
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
            <div className="flex flex-col p-4">
              <div className="flex items-center gap-2.5">
                {socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    className="inline-flex flex-col items-start pt-[4.08px] pb-[1.92px]"
                    aria-label={social.name}
                    target="_blank" rel="noopener noreferrer"
                  >
                    <img
                      src={social.icon}
                      alt={social.name}
                      className="w-[30px] h-[30px] object-cover"
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
