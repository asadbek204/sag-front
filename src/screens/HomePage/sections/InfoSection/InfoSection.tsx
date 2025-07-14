import { useEffect, useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { client } from '../../../../services';
import { Link } from 'react-router-dom';

interface Style {
  id: number;
  name: string;
}

interface Catalog {
  id: number;
  name: string;
  image: string;
  styles: Style[];
}

export const InfoSection = () => {
  const { t, language } = useLanguage();
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);

  const mapLang = (lang: string) =>
    lang === 'rus' ? 'ru' : lang === 'uzb' ? 'uz' : 'en';

  useEffect(() => {
    const lang = mapLang(language);

    const fetchCatalogs = async () => {
      try {
        const res = await client.get(`/${lang}/api/v1/home/get_catalogs/`);
        setCatalogs(res.data);
      } catch (error) {
        console.error('Kataloglarni yuklashda xatolik:', error);
      }
    };

    fetchCatalogs();
  }, [language]);

  return (
    <section className="flex lg:flex-nowrap flex-wrap gap-5 py-8 container my-8 justify-center">
      {catalogs.map((catalog) => (
        <div
          key={catalog.id}
          className="relative w-[315px] h-[385px] rounded overflow-hidden shadow group"
        >
          {/* Katalog rasmi ustiga bosilsa umumiy catalog sahifasiga o'tadi */}
          <Link to={`/catalog/${catalog.id}`}>
            <img
              src={catalog.image}
              alt={catalog.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative z-10 p-6 flex flex-col h-full justify-start">
              <h2 className="text-white capitalize text-3xl font-normal mb-6">
                {catalog.name.toLowerCase()}
              </h2>
              <ul className="flex flex-col gap-2">
                {/* Har bir style ustiga bosilganda styles query bilan redirect bo'ladi */}
                {catalog.styles?.map((style) => (
                  <li className="underline" key={style.id}>
                    <Link
                      to={`/catalog/${catalog.id}?styles=${style.id}`}
                      className="text-white capitalize"
                    >
                      {style.name.toLowerCase()}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        </div>
      ))}
    </section>
  );
};
