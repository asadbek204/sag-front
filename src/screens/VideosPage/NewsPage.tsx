import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { client } from "../../services";

interface NewsItem {
  id: number;
  title: string;
  image: string;
}

const MethodSagPage = () => {
  const { t, language } = useLanguage();
  const [newsList, setNewsList] = useState<NewsItem[]>([]);

  const mapLang = (lang: string) =>
    lang === "rus" ? "ru" : lang === "uzb" ? "uz" : "en";

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const lang = mapLang(language);
        const res = await client.get(`/${lang}/api/v1/news/get_news/`);
        setNewsList(res.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [language]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="md:text-3xl text-lg font-semibold text-gray-800 mb-6 text-center">
        {t("nav.methods")}
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 min-h-[500px] gap-4">
        {newsList.map((item) => (
          <Link to={`/news/${item.id}`} key={item.id} className="block">
            <div className="relative overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[290px] md:h-[271px] object-cover"
                loading="lazy"
              />
              <div className="absolute top-3 left-2 text-white p-1 rounded text-sm line-clamp-3 md:text-lg bg-black bg-opacity-50">
                {item.title}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MethodSagPage;
