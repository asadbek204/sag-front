import { useEffect, useState } from 'react';

export const CollectionSection = () => {
  const collections = [
    { img: 'https://www.sagexpress.uz/media/images/banner/Artboard_7.jpg' },
    { img: 'https://www.sagexpress.uz/media/images/banner/Artboard_11.png' },
    {  img: 'https://www.sagexpress.uz/media/images/banner/Artboard_17_.png' },
    {  img: 'https://www.sagexpress.uz/media/images/banner/Artboard_6.jpg' },
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
        <div
          className="flex gap-8 transition-transform duration-700"
          style={{
            width: `${collections.length * 2 * 50}%`,
            transform: `translateX(-${index * (100 / collections.length)}%)`,
          }}
        >
          {[...collections, ...collections].map((col, i) => (
            <div
              key={i}
              className="w-1/2"
            >
              <img src={col.img} className="w-full h-full object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 