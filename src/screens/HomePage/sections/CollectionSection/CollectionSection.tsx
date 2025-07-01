import { useEffect, useState } from 'react';

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
  const collections = [
    { img: 'https://www.sagexpress.uz/media/images/banner/Artboard_7.jpg' },
    { img: 'https://www.sagexpress.uz/media/images/banner/Artboard_11.png' },
    {  img: 'https://www.sagexpress.uz/media/images/banner/Artboard_17_.png' },
    {  img: 'https://www.sagexpress.uz/media/images/banner/Artboard_6.jpg' },
  ];

  const collectionLinks = [
    '/collection/1',
    '/collection/2',
    '/collection/3',
    '/collection/4',
  ];

  const [index, setIndex] = useState(0);
  const slidesToShow = useSlidesToShow();

  // Автопрокрутка
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % collections.length);
    }, 3000); // 3 секунды
    return () => clearInterval(timer);
  }, [collections.length]);

  const visible = Array.from({length: slidesToShow}, (_, i) => collections[(index + i) % collections.length]);
  return (
    <section className="w-full bg-[#cab6a3] py-8 my-[100px]">
      <div className="container w-full">
        <div className="relative flex items-center w-full">
          <div className={`flex ${slidesToShow > 1 ? 'flex-row' : 'flex-col'} gap-8 justify-center items-center w-full transition-all`}>
            {visible.map((col, i) => (
              <a
                key={i}
                href={collectionLinks[(index + i) % collectionLinks.length]}
                className="w-full max-w-[600px] h-[260px] flex-shrink-0 block group"
                tabIndex={0}
              >
                <img src={col.img} className="w-full h-full object-contain group-hover:opacity-80 transition" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}; 