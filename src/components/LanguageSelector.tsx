import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

type LanguageCode = 'uzb' | 'rus' | 'en';



interface LanguageSelectorProps {
  className?: string;
  navActive: boolean;
}

export const LanguageSelector = ({ className = "", navActive }: LanguageSelectorProps): JSX.Element => {
  const {t, language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: { code: LanguageCode; label: string }[] = [
  { code: 'uzb', label: t('uz') },
  { code: 'rus', label: t('ru') },
  { code: 'en', label: t('en') },
];

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currentLang = languages.find((l) => l.code === language);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`text-[13.8px] ${navActive ? 'text-black' : 'text-white'} font-semibold`}
      >
        {currentLang?.label}
      </button>

      {isOpen && (
        <div className="absolute mt-2 right-0 bg-white shadow-lg border rounded z-50">
          {languages
            .filter((lang) => lang.code !== language) // tanlangan tilni chiqarma
            .map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className="block px-4 py-2 text-sm text-left w-full text-black hover:bg-gray-100"
              >
                {lang.label}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};
