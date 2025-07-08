import { Link } from "react-router-dom";
// import { useLanguage } from "../../contexts/LanguageContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLanguage } from "../../../../contexts/LanguageContext";
// import { useTransition } from "react";

const NewsSection = () => {
  const { t } = useLanguage()

  const imageData = [
    { id: 1, title: "SAG XL kengashi", image: "https://www.sagexpress.uz/media/images/anatolian_silk_2.jpg", path: "/news/1" },
    { id: 2, title: "Silver Mercury va White Square Festivalda uchta g'oliba", image: "https://www.sagexpress.uz/media/images/Tamerlan.jpg", path: "/news/2" },
    { id: 3, title: "SAG 25 yillik munozabati, tumanlar orasida hamkorlik", image: "https://www.sagexpress.uz/media/images/tressor_beige.jpg", path: "/news/3" },
    { id: 4, title: "SAG darajasi — bu shubhasiz g'alaba", image: "https://www.sagexpress.uz/media/images/tumaris.jpg", path: "/news/4" },
    { id: 5, title: "SAG darajasi — madaniyat bilan hamkorlik zaminayuvlik", image: "https://www.sagexpress.uz/media/product/faf698b1-b866-49f2-940c-42e7bf7b1acd.jpg", path: "/news/5" },
    { id: 6, title: "SAG darajasi — bu ishonchli yag'dirajsi", image: "https://www.sagexpress.uz/media/product/b93a7f94-87ef-4207-ad7a-7132c8bd43dd.png", path: "/news/6" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024, // <1024px
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768, // <768px
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480, // <480px
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="container mt-9 mx-auto py-8">
      <h1 className="md:text-3xl text-lg font-semibold text-gray-800 mb-6 text-center">
        {t('nav.methods')}
      </h1>
      <Slider {...settings}>
        {imageData.map((item) => (
          <div key={item.id} className="px-2">
            <Link to={item.path}>
              <div className="relative  overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[250px] object-cover "
                  loading="lazy"
                />
                <div className="absolute top-0 left-0 w-full p-2 m-2 mr-3 bg-black bg-opacity-50 text-white text-sm md:text-base line-clamp-3">
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
