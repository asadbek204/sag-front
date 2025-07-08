import { useState, useEffect } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import top from '../../../../assets/top.png';
import neww from '../../../../assets/yangi.png'
import sales from '../../../../assets/sales.png'
import vd1 from '../../../../assets/vd1.png'
import vd2 from '../../../../assets/vd2.png'


const videos = [
  {
    img: vd1,
    textKey: 'video.tashkent_opening',
  },
  {
    img: vd2,
    textKey: 'video.silver_mercury',
  },
  {
    img: vd1,
    textKey: 'video.abu_dhabi',
  },
  {
    img: vd2,
    textKey: 'video.sag_win',
  },
];

const posters = [
    {
        img: top,
        textKey: 'video.new_collections',
      },
      {
        img: neww,
        textKey: 'video.top_collections',
      },
      {
        img: sales,
        textKey: 'video.sale',
      }
]

const posterLinks = [
  '/catalog',
  '/catalog/top',
  '/sales',
];

const videoLinks = [
  '/videos',
  '/videos',
  '/videos',
  '/videos',
];

function useSlidesToShow() {
  const [slidesToShow, setSlidesToShow] = useState(1);
  useEffect(() => {
    function handleResize() {
      setSlidesToShow(window.innerWidth >= 1024 ? 3 : 1);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return slidesToShow;
}

export const VideoSection = () => {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const slidesToShow = useSlidesToShow();


  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % videos.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);


  const visible = Array.from({length: slidesToShow}, (_, i) => videos[(index + i) % videos.length]);


  return (
    <section className="w-full bg-[#cab6a3] py-8 my-[100px]">
      <div className="container w-full">
        <div className='flex items-center overflow-x-hidden w-full justify-between mb-[30px] flex-col lg:flex-row gap-4'>
          {posters.map((img, i) => (
            <a
              key={i}
              href={posterLinks[i]}
              className="relative w-full max-w-[400px] h-[250px]  rounded overflow-hidden shadow-lg flex-shrink-0 m-auto block group"
              style={{ minWidth: 0 }}
              tabIndex={0}
            >
              <img
                src={img.img}
                alt={t(img.textKey)}
                className="absolute inset-0 w-full h-full object-cover group-hover:opacity-80 transition"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute left-0 bottom-0 z-10 p-6">
                <div className="text-white text-xl font-semibold drop-shadow-lg">
                  {t(img.textKey)}
                </div>
              </div>
            </a>
          ))}
        </div>
        <h2 className="text-4xl pl-2 font-normal mb-8 text-white text-center lg:text-left">{t('nav.video_clips')}</h2>
        <div className="relative flex items-center overflow-x-hidden w-full">
          <div className={`flex ${slidesToShow > 1 ? 'flex-row' : 'flex-col'} gap-8 justify-between items-center w-full transition-all`}>
            {visible.map((video, i) => (
              <a
                key={i}
                href={videoLinks[(index + i) % videoLinks.length]}
                className="relative w-full max-w-[400px] h-[350px] rounded  shadow-lg m-auto block group"
                style={{ minWidth: 0 }}
                tabIndex={0}
              >
                <img
                  src={video.img}
                  alt={t(video.textKey)}
                  className="absolute inset-0 w-full h-full object-cover group-hover:opacity-80 transition"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute left-0 bottom-0 z-10 p-6">
                  <div className="text-white text-xl font-semibold drop-shadow-lg">
                    {t(video.textKey)}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}; 