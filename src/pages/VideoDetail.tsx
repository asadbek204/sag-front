import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/ui/Footer";
import video1 from "../assets/video.mp4";
import video2 from "../assets/video2.mp4";

import {
  Eye,
  Clock,
   Send ,
  Link as LinkIcon,
  ArrowLeft,
} from "lucide-react";
import { ContactInfoSection } from "../screens/HomePage/sections/ContactInfoSection";
import { useLanguage } from "../contexts/LanguageContext";

const VideoDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const videoMap: { [key: string]: string } = {
    "1": video1,
    "2": video2,
    "3": video1,
    "4": video2,
    "5": video1,
    "6": video2,
  };

  const videoTitles: { [key: string]: string } = {
    "1": "SAG XL kengashi",
    "2": "Silver Mercury va White Square Festivalda uchta g'oliba",
    "3": "SAG 25 yillik munozabati, tumanlar orasida hamkorlik",
    "4": "SAG darajasi — bu shubhasiz g'alaba",
    "5": "SAG darajasi — madaniyat bilan hamkorlik zaminayuvlik",
    "6": "SAG darajasi — bu ishonchli yag'dirajsi",
  };

  const defaultId = "1";
  const videoSrc = id && videoMap[id] ? videoMap[id] : videoMap[defaultId];
  const title = id && videoTitles[id] ? videoTitles[id] : videoTitles[defaultId];

  const date = "2025-06-19";
  const views = 668;

  // Handle browser back button
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Optional: Add any cleanup here if needed
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return (
    <div className="md:pt-28 pt-24 bg-[#FFFCE0] min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-8 flex-1">
        {/* Back Button - Mobile Only */}
        <button
          onClick={() => navigate('/videos')}
          className="md:hidden flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm">{t('video.back')}</span>
        </button>

        <div className="flex items-center justify-between mb-6">
          <h1 className="md:text-3xl text-xl font-semibold text-gray-800">{title}</h1>
          {/* Back Button - Desktop */}
          <button
            onClick={() => navigate('/videos')}
            className="hidden md:flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft size={18} />
            <span className="text-sm">{t('video.back_to_videos')}</span>
          </button>
        </div>

        <div className="mb-4">
          <video
            src={videoSrc}
            controls
            className="w-full h-[300px] md:h-[600px] object-cover rounded-lg"
            onError={(e) => console.error("Video load error:", e)}
            playsInline
          >
            Your browser does not support the video tag.
          </video>
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
              href="https://t.me/example"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600"
            >
              <Send  size={18} />
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
          Bu video SAGning so'nggi tadbirlaridan biri bo'lib, kompaniyaning yangi loyihalari va hamkorliklarini ko'rsatadi.
          Tadbirda yetakchi mutaxassislar ishtirok etib, innovatsion g'oyalar muhokama qilindi.
          Qo'shimcha ma'lumotlar uchun veb-saytimizni kuzating!
        </p>
      </div>
     <ContactInfoSection/>
      <Footer />
    </div>
  );
};

export default VideoDetail;
