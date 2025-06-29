
import { useState, useEffect } from "react";
// Lucide React kutubxonasidan foydalanamiz
import { ArrowUp } from "lucide-react"; // yoki istalgan boshqa kutubxona
import { useLocation } from "react-router-dom";

const ScrollTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = (): void => {
    setIsVisible(window.pageYOffset > 300);
  };

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`fixed bottom-4 right-4 p-2 z-30 text-white bg-main-color rounded-full shadow-lg transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <ArrowUp className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
    </button>
  );
};

export default ScrollTop;



export const AutoScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};
