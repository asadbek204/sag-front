import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";
import video1 from "../assets/video.mp4";
import video2 from "../assets/video2.mp4";
import video3 from "../assets/video.mp4";
import video4 from "../assets/video2.mp4";
import video5 from "../assets/video.mp4";
import video6 from "../assets/video2.mp4";
import { Footer } from "../components/ui/Footer";
import { ContactInfoSection } from "../screens/HomePage/sections/ContactInfoSection";

const Videos = () => {
  const videoData = [
    { id: 1, title: "SAG XL kengashi", poster: video1, path: "/videos/1" },
    { id: 2, title: "Silver Mercury va White Square Festivalda uchta g'oliba", poster: video2, path: "/videos/2" },
    { id: 3, title: "SAG 25 yillik munozabati, tumanlar orasida hamkorlik", poster: video3, path: "/videos/3" },
    { id: 4, title: "SAG darajasi — bu shubhasiz g'alaba", poster: video4, path: "/videos/4" },
    { id: 5, title: "SAG darajasi — madaniyat bilan hamkorlik zaminayuvlik", poster: video5, path: "/videos/5" },
    { id: 6, title: "SAG darajasi — bu ishonchli yag'dirajsi", poster: video6, path: "/videos/6" },
  ];

  return (
    <div className="md:pt-28 pt-24 bg-[#FAF9F7]">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="md:text-3xl text-lg  font-semibold text-gray-800 mb-6 text-center">Videolavhalar</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {videoData.map((video) => (
            <Link to={video.path} key={video.id} className="block">
              <div className="relative overflow-hidden ">
                <video
                  src={video.poster}
                  className="w-full md:h-[271px] object-cover"
                  muted
                  preload="metadata"
                />
                <div className="absolute top-3 left-2  text-white p-1 rounded text-lg">
                  {video.title}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <ContactInfoSection/>
      <Footer/>
    </div>
  );
};

export default Videos;