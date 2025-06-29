import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { translations, TranslationKey, Language } from '../translations';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps>({
  language: 'uzb',
  setLanguage: () => {},
  t: () => '',
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Восстанавливаем язык из localStorage при инициализации
    const savedLanguage = localStorage.getItem('selectedLanguage') as Language;
    return savedLanguage || 'uzb';
  });

  // Сохраняем язык в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('selectedLanguage', language);
  }, [language]);

  // Функция перевода
  const t = (key: string): string => {
    const value = translations[language][key as TranslationKey];
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}; 