import { useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';

export const FAQSection = () => {
  const { t } = useLanguage();

  const questions = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
    { q: t('faq.q5'), a: t('faq.a5') },
    { q: t('faq.q6'), a: t('faq.a6') },
  ];

  // Две колонки
  const left = questions.slice(0, 3);
  const right = questions.slice(3);

  // Состояние для открытия dropdown
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="container mx-auto py-12">
      <h2 className="text-4xl font-normal mb-10 text-[#23272F]">{t('faq.title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {[left, right].map((col, colIdx) => (
          <div key={colIdx}>
            {col.map((item, i) => {
              const idx = colIdx * 3 + i;
              return (
                <div
                  key={idx}
                  className="border-b border-[#E6E6E6] py-4"
                >
                  <button
                    className="w-full flex items-center justify-between focus:outline-none group"
                    onClick={() => setOpen(open === idx ? null : idx)}
                  >
                    <span className={`text-[20px] font-normal text-left transition-colors
                      ${open === idx ? 'text-[#0057FF]' : 'text-[#23272F]'}
                      group-hover:text-[#0057FF]`}>
                      {item.q}
                    </span>
                    <span className={`text-xl ml-4 transition-transform ${open === idx ? 'rotate-180' : ''} text-[#23272F]`}>
                      &#x25BE;
                    </span>
                  </button>
                  {open === idx && (
                    <div className="mt-2 text-sm text-[#23272F]">{item.a}</div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
};
