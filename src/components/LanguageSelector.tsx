import { useLanguage } from '../contexts/LanguageContext';

interface LanguageSelectorProps {
  navActive: boolean; // To style buttons based on navbar background
  className?: string; // Optional for additional styling
}
type LanguageCode = 'uzb' | 'rus' | 'en';

export const LanguageSelector = ({ navActive, className = "" }: LanguageSelectorProps): JSX.Element => {
  const { language, setLanguage } = useLanguage();

 const languages: { code: LanguageCode; label: string }[] = [
  { code: 'uzb', label: "O'z" },
  { code: 'rus', label: 'Ru' },
  { code: 'en', label: 'En' },
];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          className={`text-[13.8px] ${language === lang.code ? 'font-bold underline' : ''} ${
            navActive ? 'text-black' : 'text-white'
          }`}
          onClick={() => setLanguage(lang.code)}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};