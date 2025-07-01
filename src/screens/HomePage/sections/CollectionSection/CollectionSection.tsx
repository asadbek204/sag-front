import { useEffect, useState } from 'react';

export const CollectionSection = () => {
  const collections = [
    { img: 'https://www.sagexpress.uz/media/images/banner/Artboard_7.jpg' },
    { img: 'https://www.sagexpress.uz/media/images/banner/Artboard_11.png' },
    {  img: 'https://www.sagexpress.uz/media/images/banner/Artboard_17_.png' },
    {  img: 'https://www.sagexpress.uz/media/images/banner/Artboard_6.jpg' },
  ];

  const collectionLinks = [
    '/collection/versus',
    '/collection/movaro',
    '/collection/toronto',
    '/collection/enigma',
  ];

  const [index, setIndex] = useState(0);

  // Автопрокрутка
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % collections.length);
    }, 3000); // 3 секунды
    return () => clearInterval(timer);
  }, [collections.length]);

  return (
    <section className="w-full bg-[#cab6a3] py-8 my-[100px]">
      <div className="container w-full">
        <div className="w-full overflow-x-hidden">
          <div
            className="flex flex-nowrap gap-8 transition-transform duration-700 justify-center"
            style={{
              width: '100%',
              transform: `translateX(-${index * 50}%)`,
            }}
          >
            {[...collections, ...collections].map((col, i) => (
              <a
                key={i}
                href={collectionLinks[i % collections.length]}
                className="w-1/2 h-[260px] flex-shrink-0 block group"
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