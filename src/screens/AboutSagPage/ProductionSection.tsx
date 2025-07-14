import { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { client } from "../../services";

interface ProductionVolume {
  id: number;
  year: string;
  volume: string;
}

interface ProductionAbout {
  id: number;
  title: string | null;
  description: string | null;
  image: string | null;
}

const ProductionSection = () => {
  const { t,language } = useLanguage();

  const [volumeData, setVolumeData] = useState<ProductionVolume[]>([]);
  const [aboutData, setAboutData] = useState<ProductionAbout | null>(null);

  const mapLang = (lang: string) =>
    lang === "rus" ? "ru" : lang === "uzb" ? "uz" : "en";

  useEffect(() => {
    const fetchData = async () => {
      const lang = mapLang(language);
      try {
        const [volumeRes, aboutRes] = await Promise.all([
          client.get(`/${lang}/api/v1/about/get_production_volume/`),
          client.get(`/${lang}/api/v1/about/get_about_production/`),
        ]);
        setVolumeData(volumeRes.data);
        setAboutData(aboutRes.data);
      } catch (error) {
        console.error("Error fetching production data:", error);
      }
    };

    fetchData();
  }, [language]);

  return (
    <div className="md:mt-[80px]">
      <div className="py-8">
        {/* Production Volume Header */}
        <div className="main_color w-full text-white mb-8">
          <div className="container pt-16 pb-20 mx-auto">
            <h1 className="text-3xl font-bold mb-4">
              {t('productionVolume')}
            </h1>

            <div className="md:flex md:gap-56 justify-between">
              <div className="w-full text-lg">
                {volumeData.slice(0, Math.ceil(volumeData.length / 2)).map((item) => (
                  <div
                    key={item.id}
                    className="flex pt-5 justify-between pb-2 border-b"
                  >
                    <div>{item.year} {t('year')}</div>
                    <div>{item.volume} {t('mln')}</div>
                  </div>
                ))}
              </div>
              <div className="w-full text-lg">
                {volumeData.slice(Math.ceil(volumeData.length / 2)).map((item) => (
                  <div
                    key={item.id}
                    className="flex pt-5 justify-between pb-2 border-b"
                  >
                     <div>{item.year} {t('year')}</div>
                    <div>{item.volume} {t('mln')}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex md:mt-[145px] mb-20 container justify-between mx-auto flex-col md:flex-row items-center gap-6">
          <div className="md:w-1/2 text-gray-700 text-base md:text-lg">
            <h2 className="text-2xl font-semibold mb-4">
              {aboutData?.title || "Ishlab chiqarish haqida"}
            </h2>
            <p>{aboutData?.description}</p>
          </div>
          <div>
            <img
              src={aboutData?.image || ""}
              alt="Production Facility"
              className="md:w-[382px] md:h-[382px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductionSection;
