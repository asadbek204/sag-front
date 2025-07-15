import { useEffect, useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { client } from '../../../../services';
import { useNavigate } from "react-router-dom";

interface NewsItem {
  id: number;
  name: string;
  model?: string;
  collection?: string;
  image: string;
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

  const normalizeType = (value?: string) => {
  if (!value) return "";

  const cleaned = value.toLowerCase().trim();

  if (
    cleaned === "модель ковра" ||
    cleaned === "carpet_model" ||
    cleaned === "model"
  ) {
    return "carpet_model";
  }

  if (
    cleaned === "коллекция" ||
    cleaned === "collection"
  ) {
    return "collection";
  }

  return "";
};


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
            {visible.map((item) =>
              item ? (
                <div
                  key={item.id}
                  className="relative w-full max-w-[600px] h-[260px] group overflow-hidden rounded shadow-lg cursor-pointer"
                 onClick={() => {
  const type = normalizeType(item.model || item.collection);

  if (type === "carpet_model") {
    navigate(`/product/${item.id}`);
  } else if (type === "collection") {
    navigate(`/catalog/${item.id}/product/${item.id}`);
  }
}}

                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:opacity-80 transition"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end pl-6 pb-8 text-white">
                    <h3 className="text-3xl font-bold">{item.name}</h3>
                    <div className="text-xl opacity-90 flex gap-4 items-center flex-wrap">
                      {item.model && <span> {item.model}</span>}
                      {item.collection && <span>{item.collection}</span>}
                    </div>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
