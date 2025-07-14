import { useEffect, useState } from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { ChevronDown, ChevronUp } from "lucide-react";
import { client } from '../../../../services';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export const FAQSection = () => {
  const { t, language } = useLanguage();

  const [faqData, setFaqData] = useState<FAQItem[]>([]);
  const [open, setOpen] = useState<number | null>(null);

  // language nomini URL uchun mos formatga o‘zgartirish
  const mapLangToPrefix = (lang: string): string => {
    switch (lang) {
      case "uzb": return "uz";
      case "rus": return "ru";
      case "en": return "en";
      default: return "uz";
    }
  };

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const langPrefix = mapLangToPrefix(language);
        const res = await client.get(`/${langPrefix}/api/v1/home/get_questions/`);
        setFaqData(res.data);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };

    fetchFaqs();
  }, [language]);

  // Har 3 tadan ikkiga bo‘lish
  const left = faqData.slice(0, 3);
  const right = faqData.slice(3);

  return (
    <section className="container mx-auto py-12">
      <h2 className="text-4xl font-normal mb-10 text-[#23272F]">{t('faq.title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {[left, right].map((col, colIdx) => (
          <div key={colIdx}>
            {col.map((item, i) => {
              const idx = colIdx * 3 + i;
              return (
                <div key={item.id} className="border-b border-[#E6E6E6] py-4">
                  <button
                    className="w-full flex items-center justify-between focus:outline-none group"
                    onClick={() => setOpen(open === idx ? null : idx)}
                  >
                    <span className={`text-[20px] font-normal text-left transition-colors
                      ${open === idx ? 'text-[#0057FF]' : 'text-[#23272F]'}
                      group-hover:text-[#0057FF]`}>
                      {item.question}
                    </span>
                    <span className="text-xl ml-4 transition-transform text-[#23272F]">
                      {open === idx ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                    </span>
                  </button>
                  {open === idx && (
                    <div className="mt-2 text-sm text-[#23272F]">
                      {item.answer}
                    </div>
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
