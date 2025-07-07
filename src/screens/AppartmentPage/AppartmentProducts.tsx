import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface AppartmentProductsProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number | null;
  isNew?: boolean;
  isOnSale?: boolean;
}

const AppartmentProducts = ({ id, name }: AppartmentProductsProps) => {
  const { t } = useLanguage();
  const [showImage, setShowImage] = useState(false);

  const handleCardClick = () => {
    setShowImage(true);
  };

  const handleOverlayClick = () => {
    setShowImage(false);
  };

  return (
    <>
      <div className="group cursor-pointer" onClick={handleCardClick}>
        <div className="bg-white shadow-sm border-gray-200 overflow-hidden transition-shadow hover:shadow-md">
          <div className="relative bg-gray-100">
            <img
              src="https://www.sagexpress.uz/media/product/c5c71e93-5878-4687-a3df-04bfa2157717.jpg"
              alt={name}
              className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="p-4">
            <h3 className="font-medium text-gray-800 mb-2 group-hover:text-gray-500 transition-colors">
              {name}
            </h3>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Overlay */}
      {showImage && (
        <div
          className="fixed inset-0 bg-gray-500  bg-opacity-70 flex items-center justify-center z-50"
          onClick={handleOverlayClick}
        >
          <img
            src="https://www.sagexpress.uz/media/product/c5c71e93-5878-4687-a3df-04bfa2157717.jpg"
            alt={name}
            className="max-w-full max-h-[90%] object-contain"
          />
        </div>
      )}
    </>
  );
};

export default AppartmentProducts;
