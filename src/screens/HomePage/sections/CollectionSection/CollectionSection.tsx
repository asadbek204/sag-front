import { useEffect, useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { client } from '../../../../services';
import { useNavigate } from "react-router-dom";

interface NewsItem {
  image: string;
  model: number | {
    id: number;
    name: string;
    catalog: number;
  };
  type: "collection" | "detail";
}

function useSlidesToShow() {
  const [slidesToShow, setSlidesToShow] = useState(1);
  useEffect(() => {
    function handleResize() {
      setSlidesToShow(window.innerWidth >= 1024 ? 2 : 1);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return slidesToShow;
}

export const CollectionSection = () => {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [index, setIndex] = useState(0);
  const slidesToShow = useSlidesToShow();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const mapLang = (lang: string) =>
    lang === "rus" ? "ru" : lang === "uzb" ? "uz" : "en";

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const lang = mapLang(language);
        const res = await client.get(`/${lang}/api/v1/home/get_news/`);
        setNewsData(res.data);
      } catch (error) {
        console.error("Yangiliklarni yuklashda xatolik:", error);
      }
    };

    fetchNews();
  }, [language]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % newsData.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [newsData]);

  const visible = Array.from({ length: slidesToShow }, (_, i) => newsData[(index + i) % newsData.length]);

  return (
    <section className="w-full main_color py-8 my-[100px]">
      <div className="container w-full">
        <div className="relative overflow-hidden flex items-center w-full">
          <div className={`flex ${slidesToShow > 1 ? 'flex-row' : 'flex-col'} gap-8 justify-center items-center w-full transition-all`}>
            {visible.map((item, i) =>
              item ? (
                <div
                  key={i}
                  className="relative w-full max-w-[600px] h-[260px] group overflow-hidden rounded shadow-lg cursor-pointer"
                 onClick={() => {
  if (item.type === "collection" && typeof item.model === "object") {
    navigate(`/catalog/${item.model.catalog}/product/${item.model.id}`, {
      state: { collectionId: item.model.id } // URLda bor, lekin state orqali ham yuboramiz
    });
  } else if (item.type === "detail" && typeof item.model === "number") {
    navigate(`/product/${item.model}`);
  }
}}

                >
                  <img
                    src={item.image}
                    alt={typeof item.model === "object" ? item.model.name : "Image"}
                    className="w-full  h-full  group-hover:opacity-80 transition"
                  />
                 
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
