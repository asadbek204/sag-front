import { useEffect, useState } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { useLanguage } from "../../../../contexts/LanguageContext";
import { client } from "../../../../services";

interface PhoneData {
  id: number;
  phone_number: string;
}

interface SocialData {
  id: number;
  image: string; // URL
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

    // Fetch phone numbers
    const fetchPhones = async () => {
      try {
        const res = await client.get(`/${lang}/api/v1/footer/get_phone_number/`);
        setPhones(res.data);
      } catch (err) {
        console.error("Error fetching phone numbers:", err);
      }
    };

    // Fetch social media
    const fetchSocials = async () => {
      try {
        const res = await client.get(`/${lang}/api/v1/footer/get_social_media/`);
        setSocials(res.data);
      } catch (err) {
        console.error("Error fetching social media:", err);
      }
    };

    // Fetch categories
    const fetchCategories = async () => {
      try {
        const res = await client.get(`/${lang}/api/v1/catalog/get_catalogs/`);
        console.log("Categories API response:", res.data);
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        // Fallback static categories in case of error
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
    // Misol: +998662304004 → + 998 (66) 230-40-04
    const cleaned = phone.replace(/[^\d]/g, "");
    if (cleaned.length === 12 && cleaned.startsWith("998")) {
      const code = cleaned.slice(3, 5); // 66
      const part1 = cleaned.slice(5, 8); // 230
      const part2 = cleaned.slice(8, 10); // 40
      const part3 = cleaned.slice(10, 12); // 04
      return `+ 998 (${code}) ${part1}-${part2}-${part3}`;
    }
    return phone; // fallback
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
                  <a
                    key={category.id}
                    href={`/catalog/${category.id}`}
                    className="text-base text-[#01091c] leading-6"
                  >
                    {category.name}
                  </a>
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
                  <a
                    key={index}
                    href={info.href}
                    className="text-base text-[#01091c] leading-6 whitespace-nowrap"
                  >
                    {info.name}
                  </a>
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
                      className="w-[20px] h-[20px] object-contain"
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