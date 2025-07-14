import { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { client } from "../../services";

interface AboutCompany {
  id: number;
  title: string | null;
  image: string | null;
}

interface BriefAbout {
  id: number;
  title: string | null;
  description: string | null;
  image: string | null;
}

const AboutSagSection = () => {
  const { t, language } = useLanguage();
  const [aboutCompany, setAboutCompany] = useState<AboutCompany | null>(null);
  const [briefAbout, setBriefAbout] = useState<BriefAbout | null>(null);

  const mapLang = (lang: string) =>
    lang === "rus" ? "ru" : lang === "uzb" ? "uz" : "en";

  useEffect(() => {
    const fetchAboutData = async () => {
      const lang = mapLang(language);

      try {
        const [companyRes, briefRes] = await Promise.all([
          client.get(`/${lang}/api/v1/about/get_about_company/`),
          client.get(`/${lang}/api/v1/about/get_brief_about/`),
        ]);

        setAboutCompany(companyRes.data);
        setBriefAbout(briefRes.data);
      } catch (err) {
        console.error("About fetch error:", err);
      }
    };

    fetchAboutData();
  }, [language]);

  return (
    <div className="min-h-screen md:pt-28 pt-24 ">
      <div className="container mx-auto px-4 py-8">
        <h1 className="md:text-4xl text-xl font-semibold mb-8 text-center">
          {t("about.title")}
        </h1>

        {aboutCompany?.image && (
          <img
            src={aboutCompany.image}
            alt="About Company"
            className="w-full lg:h-96  mx-auto mb-6 rounded"
          />
        )}

        {aboutCompany?.title && (
          <p className="md:text-3xl text-gray-700 text-center text-xl pb-16 max-w-[900px] mx-auto font-semibold mt-20 mb-6">
            {aboutCompany.title}
          </p>
        )}

        <div className="flex flex-col md:flex-row gap-6">
          {briefAbout?.image && (
            <img
              src={briefAbout.image}
              alt="Brief About"
              className="w-full lg:h-[382px] md:w-1/3 object-cover rounded"
            />
          )}

          <div className="text-gray-700 text-base md:text-lg">
            <p className="font-semibold md:text-2xl text-xl pb-4">
              {briefAbout?.title}
            </p>
            <p className="max-w-[721px]">{briefAbout?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSagSection;
