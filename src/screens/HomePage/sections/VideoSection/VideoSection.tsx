import { useState, useEffect } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import top from '../../../../assets/top.png';
import neww from '../../../../assets/yangi.png'
import sales from '../../../../assets/sales.png'

const videos = [
  {
    img: 'https://www.sagexpress.uz/media/images/opportunities/Screenshot_5.png',
    textKey: 'video.tashkent_opening',
  },
  {
    img: 'https://www.sagexpress.uz/media/images/opportunities/sayt_uchun_1.jpg',
    textKey: 'video.silver_mercury',
  },
  {
    img: 'https://www.sagexpress.uz/media/images/opportunities/6.jpg',
    textKey: 'video.abu_dhabi',
  },
  {
    img: 'https://www.sagexpress.uz/media/images/opportunities/25_4.png',
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

export const VideoSection = () => {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);

  // Автослайдер: каждые 3 секунды
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % videos.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Получаем 3 видимых видео (слайс с циклическим смещением)
  const visible = [0, 1, 2].map((offset) => videos[(index + offset) % videos.length]);

  return (
    <section className="w-full bg-[#cab6a3] py-8 my-[100px]">
      <div className="container w-full">
      <div className='flex items-center w-full justify-between mb-[30px] flex-col md:flex-row gap-4'>
        {posters.map((img, i) => (
              <div
                key={i}
                className="relative w-full max-w-[400px] h-[250px] lg:h-[350px] rounded overflow-hidden shadow-lg flex-shrink-0 m-auto"
                style={{ minWidth: 0 }}
              >
                <img
                  src={img.img}
                  alt={t(img.textKey)}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute left-0 bottom-0 z-10 p-6">
                  <div className="text-white text-xl font-semibold drop-shadow-lg">
                    {t(img.textKey)}
                  </div>
                </div>
              </div>
            ))}
        </div>

        <h2 className="text-4xl font-normal mb-8 text-white text-left">{t('video.title')}</h2>
        <div className="relative flex items-center w-full">
          {/* Слайдер */}
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center w-full flex-wrap">
            {visible.map((video, i) => (
              <div
                key={i}
                className="relative w-full max-w-[400px] h-[350px] lg:h-[250px] rounded overflow-hidden shadow-lg flex-shrink-0 m-auto"
                style={{ minWidth: 0 }}
              >
                <img
                  src={video.img}
                  alt={t(video.textKey)}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute left-0 bottom-0 z-10 p-6">
                  <div className="text-white text-xl font-semibold drop-shadow-lg">
                    {t(video.textKey)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}; 