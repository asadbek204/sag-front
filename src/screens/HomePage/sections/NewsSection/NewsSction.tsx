import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLanguage } from "../../../../contexts/LanguageContext";
import { client } from "../../../../services";

interface NewsItem {
  id: number;
  title: string;
  image: string;
  path?: string;
}

const mapLangToPrefix = (lang: string): string => {
  switch (lang) {
    case "uzb":
      return "uz";
    case "rus":
      return "ru";
    case "en":
      return "en";
    default:
      return "uz"; 
  }
};

const NewsSection = () => {
  const { t, language } = useLanguage(); 
  const [newsData, setNewsData] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const langPrefix = mapLangToPrefix(language);
        const res = await client.get(`/${langPrefix}/api/v1/news/get_news/`);
        const data = res.data;

        const mappedData = data.map((item: any) => ({
          ...item,
          path: `/news/${item.id}`,
        }));

        setNewsData(mappedData);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [language]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ]
  };

  return (
    <div className="container mt-9 mx-auto py-8">
      <h1 className="md:text-3xl text-lg font-semibold text-gray-800 mb-6 text-center">
        {t('nav.methods')}
      </h1>
      <Slider {...settings}>
        {newsData.map((item) => (
          <div key={item.id} className="px-2">
            <Link to={item.path || `/news/${item.id}`}>
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[250px] object-cover"
                  loading="lazy"
                />
                <div className="absolute top-0 left-0 w-full p-2 m-2 bg-black bg-opacity-50 text-white text-sm md:text-base line-clamp-3">
                  {item.title}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewsSection;
