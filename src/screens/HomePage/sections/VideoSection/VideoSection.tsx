import { useEffect, useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { client } from '../../../../services';
import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate

interface Poster {
  id: number;
  image: string;
  collection: string | number; // Allow string or number
}

interface Video {
  id: number;
  image: string;
  content: string;
  title: string;
}

function useSlidesToShow() {
  const [slidesToShow, setSlidesToShow] = useState(1);
  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(window.innerWidth >= 1024 ? 3 : 1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return slidesToShow;
}

export const VideoSection = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate(); // Add navigate hook
  const [posters, setPosters] = useState<Poster[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [index, setIndex] = useState(0);
  const slidesToShow = useSlidesToShow();

  const mapLang = (lang: string) =>
    lang === 'rus' ? 'ru' : lang === 'uzb' ? 'uz' : 'en';

  // Map collection to sort_by value
  const mapCollectionToSortBy = (collection: string | number): string => {
    const collectionMap: { [key: string]: string } = {
      sale: '3',
      hit: '2',
      new: '1',
    };
    return collectionMap[String(collection).toLowerCase()] || '';
  };

  const mapCollectionTitle = (collection: string | number) => {
    switch (String(collection).toLowerCase()) {
      case 'sale':
      case '3':
        return t('badge.sale');
      case 'hit':
      case '2':
        return t('catalog.bestseller');
      case 'new':
      case '1':
        return t('badge.new');
      default:
        return String(collection);
    }
  };

  useEffect(() => {
    const lang = mapLang(language);

    const fetchPosters = async () => {
      try {
        const res = await client.get(`/${lang}/api/v1/home/get_collections/`);
        setPosters(res.data);
      } catch (err) {
        console.error('Poster error:', err);
      }
    };

    const fetchVideos = async () => {
      try {
        const res = await client.get(`/${lang}/api/v1/home/get_blogs/`);
        setVideos(res.data);
      } catch (err) {
        console.error('Video error:', err);
      }
    };

    fetchPosters();
    fetchVideos();
  }, [language]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % videos.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [videos]);

  const visible = videos.length > 0
    ? Array.from({ length: slidesToShow }, (_, i) => videos[(index + i) % videos.length])
    : [];

  return (
    <section className="w-full main_color py-8 my-[100px]">
      <div className="container w-full">
        {/* Poster banners */}
        <div className="flex items-center overflow-x-hidden w-full justify-between mb-[30px] flex-col lg:flex-row gap-4">
          {posters.map((poster) => (
            <a
              key={poster.id}
              href={`/search?sort_by=${mapCollectionToSortBy(poster.collection)}`}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/search?sort_by=${mapCollectionToSortBy(poster.collection)}`);
              }}
              className="relative w-full max-w-[400px] h-[250px] rounded overflow-hidden shadow-lg m-auto block group"
              style={{ minWidth: 0 }}
              tabIndex={0}
            >
              <img
                src={poster.image}
                alt={`Collection ${poster.collection}`}
                className="absolute inset-0 w-full h-full object-cover group-hover:opacity-80 transition"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute left-[30%] top-[40%] bottom-[50%] z-10 p-6">
                <div className="text-white text-xl font-semibold drop-shadow-lg">
                  {mapCollectionTitle(poster.collection)}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Video blogs */}
        <h2 className="text-4xl pl-2 font-normal mb-8 text-white text-center lg:text-left">
          {t('nav.video_clips')}
        </h2>
        <div className="relative flex items-center overflow-x-hidden w-full">
          <div
            className={`flex ${slidesToShow > 1 ? 'flex-row' : 'flex-col'} gap-8 justify-between items-center w-full transition-all`}
          >
            {visible.length > 0 &&
              visible.map((video) => (
                <Link
                  key={video.id}
                  to={`/videos/${video.id}`}
                  className="relative w-full max-w-[400px] h-[350px] rounded shadow-lg m-auto block group"
                  style={{ minWidth: 0 }}
                  tabIndex={0}
                >
                  <video
                    className="absolute inset-0 w-full h-full object-cover group-hover:opacity-80 transition"
                    src={video.content}
                    poster={video.image}
                    muted
                    playsInline
                    preload="metadata"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute left-0 bottom-0 z-10 p-6">
                    <div className="text-white text-xl font-semibold drop-shadow-lg">
                      {video.title}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};