import { useEffect, useState } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { useLanguage } from "../../../../contexts/LanguageContext";
import { client } from "../../../../services";
import { Link } from "react-router-dom";

interface PhoneData {
  id: number;
  phone_number: string;
}

interface SocialData {
  id: number;
  image: string;
  url: string;
}

interface Category {
  id: number;
  name: string;
}

export const ContactInfoSection = (): JSX.Element => {
  const { t, language } = useLanguage();
  const [phones, setPhones] = useState<PhoneData[]>([]);
  const [socials, setSocials] = useState<SocialData[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const mapLang = (lang: string) =>
    lang === "rus" ? "ru" : lang === "uzb" ? "uz" : "en";

  useEffect(() => {
    const lang = mapLang(language);

    const fetchPhones = async () => {
      try {
        const res = await client.get(`/${lang}/api/v1/footer/get_phone_number/`);
        setPhones(res.data);
      } catch (err) {
        console.error("Error fetching phone numbers:", err);
      }
    };

    const fetchSocials = async () => {
      try {
        const res = await client.get(`/${lang}/api/v1/footer/get_social_media/`);
        setSocials(res.data);
      } catch (err) {
        console.error("Error fetching social media:", err);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await client.get(`/${lang}/api/v1/catalog/get_catalogs/`);
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategories([
          { id: 1, name: t("footer.categories") || "Kategoriyalar" },
          { id: 2, name: "Kovrolin" },
          { id: 3, name: "Gazon" },
        ]);
      }
    };

    fetchPhones();
    fetchSocials();
    fetchCategories();
  }, [language, t]);

  const information = [
    { name: t("footer.about") || "Biz haqimizda", href: "/about" },
    { name: t("nav.methods") || "Usullar", href: "/methods" },
    { name: t("nav.video_clips") || "Video kliplar", href: "/videos" },
    { name: t("footer.sales") || "Aksiyalar", href: "/sales" },
  ];

  const formatPhone = (phone: string): string => {
    const cleaned = phone.replace(/[^\d]/g, "");
    if (cleaned.length === 12 && cleaned.startsWith("998")) {
      const code = cleaned.slice(3, 5);
      const part1 = cleaned.slice(5, 8);
      const part2 = cleaned.slice(8, 10);
      const part3 = cleaned.slice(10, 12);
      return `+ 998 (${code}) ${part1}-${part2}-${part3}`;
    }
    return phone;
  };

  return (
    <footer className="bg-[#FFFCE0] py-8">
      <Card className="border-none shadow-none container mx-auto">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4 text-center md:text-left">
            {/* Categories */}
            <div className="flex flex-col gap-2 p-4 w-full md:w-auto">
              <h3 className="text-[21.8px] text-[#01091c] leading-[33px] font-semibold">
                {t("footer.categories") || "Kategoriyalar"}
              </h3>
              <div className="flex flex-col gap-1">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/catalog/${category.id}`}
                    className="text-base text-[#01091c] leading-6"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Information */}
            <div className="flex flex-col gap-2 p-4 w-full md:w-auto">
              <h3 className="text-[22px] text-[#01091c] leading-[33px] font-semibold">
                {t("footer.information") || "Ma'lumot"}
              </h3>
              <div className="flex flex-col gap-1">
                {information.map((info, index) => (
                  <Link
                    key={index}
                    to={info.href}
                    className="text-base text-[#01091c] leading-6 whitespace-nowrap"
                  >
                    {info.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Call Center */}
            <div className="flex flex-col gap-2 p-4 w-full md:w-auto items-center md:items-start">
              <h3 className="text-[21.5px] text-[#01091c] leading-[33px] font-semibold">
                {t("footer.callcenter") || "Call-markaz"}
              </h3>
              <div className="flex flex-col gap-1">
                {phones.map((phone) => (
                  <a
                    key={phone.id}
                    href={`tel:${phone.phone_number}`}
                    className="text-sm text-[#01091c] leading-6 whitespace-nowrap"
                  >
                    {formatPhone(phone.phone_number)}
                  </a>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="flex flex-col p-4 w-full md:w-auto items-center md:items-start">
              <div className="flex items-center justify-center md:justify-start gap-2.5 flex-wrap">
                {socials.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="social-icon"
                    className="inline-flex"
                  >
                    <img
                      src={social.image}
                      alt="social"
                      className="w-[22px] h-[22px] object-contain"
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
