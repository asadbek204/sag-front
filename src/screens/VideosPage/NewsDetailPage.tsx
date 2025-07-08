import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/ui/Footer";
import img from "../../assets/Gazon.png"
import {
  Eye,
  Clock,
  Send,
  Link as LinkIcon,
  ArrowLeft, Instagram 
} from "lucide-react";
import { ContactInfoSection } from "../HomePage/sections/ContactInfoSection";
import { useLanguage } from "../../contexts/LanguageContext";

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const imageMap: { [key: string]: string } = {
    "1": "https://www.sagexpress.uz/media/images/tumaris.jpg",
    "2": "https://www.sagexpress.uz/media/images/anatolian_silk_2.jpg",
    "3": "https://www.sagexpress.uz/media/images/anatolian_silk_2.jpg",
    "4": "https://www.sagexpress.uz/media/images/opportunities/sayt_uchun_1.jpg",
    "5": "https://www.sagexpress.uz/media/images/opportunities/25_4.png",
    "6": img,
  };

  const imageTitles: { [key: string]: string } = {
    "1": "SAG XL kengashi",
    "2": "Silver Mercury va White Square Festivalda uchta g'oliba",
    "3": "SAG 25 yillik munozabati, tumanlar orasida hamkorlik",
    "4": "SAG darajasi — bu shubhasiz g'alaba",
    "5": "SAG darajasi — madaniyat bilan hamkorlik zaminayuvlik",
    "6": "SAG darajasi — bu ishonchli yag'dirajsi",
  };

  const defaultId = "1";
  const imageSrc = id && imageMap[id] ? imageMap[id] : imageMap[defaultId];
  const title = id && imageTitles[id] ? imageTitles[id] : imageTitles[defaultId];

  const date = "2025-06-19";
  const views = 668;

  useEffect(() => {
    const handleBeforeUnload = () => {
      // Optional cleanup
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return (
    <div className="md:pt-28 pt-24 bg-[#FAF9F7] min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-8 flex-1">
        {/* Back Button - Mobile Only */}
        <button
          onClick={() => navigate("/methods")}
          className=" flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="md:text-2xl">{t("video.back")}</span>
        </button>

        <div className="flex items-center justify-between mb-6">
          <h1 className="md:text-3xl text-xl font-semibold text-gray-800">{title}</h1>
        
        </div>

        <div className="mb-4">
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-[500px] md:h-[800px] object-cover rounded-lg"
            loading="lazy"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between text-[#8A6E4F] text-sm mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye size={16} />
              <span>{views}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600"
            >
              <Instagram  size={18} />
            </a>
            <a
              href="https://t.me/example"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600"
            >
              <Send size={18} />
            </a>
            <a
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600"
            >
              <LinkIcon size={18} />
            </a>
          </div>
        </div>

        <p className="text-gray-700 text-base">
          Bu rasm SAGning so'nggi tadbirlaridan birini aks ettiradi. Kompaniyaning yangi loyihalari va
          hamkorliklari haqida ko‘proq bilish uchun rasm ostidagi havolalar orqali qo‘shimcha ma’lumot olishingiz mumkin.
        </p>
      </div>

      <ContactInfoSection />
      <Footer />
    </div>
  );
};

export default NewsDetail;
