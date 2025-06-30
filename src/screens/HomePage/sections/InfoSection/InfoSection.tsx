import { useLanguage } from '../../../../contexts/LanguageContext';
import gilamImg from '../../../../assets/Gilamlar.png'; // замените на свои пути
import kovrolinImg from '../../../../assets/Kovrolin.png';
import lawnImg from '../../../../assets/Gazon.png';
import runnerImg from '../../../../assets/Gazon.png';

export const InfoSection = () => {
  const { t } = useLanguage();

  return (
    <section className="flex flex-wrap gap-4 py-8 container my-8 justify-center">
      <div className="relative w-[275px] h-[375px] rounded overflow-hidden shadow group">
        <img src={gilamImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 p-6 flex flex-col h-full justify-start">
          <h2 className="text-white text-3xl font-normal mb-6">{t('info.carpets')}</h2>
          <ul className="flex flex-col gap-2">
            <li><a href="#" className="text-white underline">{t('info.carpets.classic')}</a></li>
            <li><a href="#" className="text-white underline">{t('info.carpets.neoclassic')}</a></li>
            <li><a href="#" className="text-white underline">{t('info.carpets.modern')}</a></li>
            <li><a href="#" className="text-white underline">{t('info.carpets.kids')}</a></li>
          </ul>
        </div>
      </div>
      {/* Kovrolin */}
      <div className="relative w-[275px] h-[375px] rounded overflow-hidden shadow group">
        <img src={kovrolinImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 p-6 flex flex-col h-full justify-start">
          <h2 className="text-white text-3xl font-normal">{t('info.covrolin')}</h2>
        </div>
      </div>
      {/* Gazon */}
      <div className="relative w-[275px] h-[375px] rounded overflow-hidden shadow group">
        <img src={lawnImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 p-6 flex flex-col h-full justify-start">
          <h2 className="text-white text-3xl font-normal">{t('info.lawn')}</h2>
        </div>
      </div>
      {/* Metrlik yo'lak */}
      <div className="relative w-[275px] h-[375px] rounded overflow-hidden shadow group">
        <img src={runnerImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 p-6 flex flex-col h-full justify-start">
          <h2 className="text-white text-3xl font-normal">{t('info.runner')}</h2>
        </div>
      </div>
    </section>
  );
};
