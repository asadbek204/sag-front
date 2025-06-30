import { useLanguage } from '../../contexts/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-[#cab6a3] py-4">
      <div className="container text-white text-base font-normal font-['Inter',Helvetica]">
        {t('footer.copyright')}
      </div>
    </footer>
  );
};
