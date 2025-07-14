import { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { client } from "../../services";

interface GalleryItem {
  id: number;
  image: string | null;
}

const Gallery = () => {
  const { language } = useLanguage();
  const [galleryData, setGalleryData] = useState<GalleryItem[]>([]);

  const mapLang = (lang: string) =>
    lang === "rus" ? "ru" : lang === "uzb" ? "uz" : "en";

  useEffect(() => {
    const fetchGallery = async () => {
      const lang = mapLang(language);
      try {
        const res = await client.get(`/${lang}/api/v1/about/get_gallery/`);
        setGalleryData(res.data);
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      }
    };

    fetchGallery();
  }, [language]);

  if (galleryData.length === 0) {
    return null; // yoki loading holat qo‘shishingiz mumkin
  }

  return (
    <div className="mb-20 main_color">
      <div className="container mx-auto px-4 py-16 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {galleryData.slice(0, 3).map((item) => (
            <img
              key={item.id}
              src={item.image || ""}
              alt={`Gallery Image ${item.id}`}
              className="w-full h-[300px] lg:h-[372px] object-cover"
            />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {galleryData.slice(3).map((item) => (
            <img
              key={item.id}
              src={item.image || ""}
              alt={`Gallery Image ${item.id}`}
              className="w-full h-[300px] lg:h-[372px] object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
