import { useEffect, useState } from "react";

interface AppartmentProductsProps {
  id: number;
  name: string;
  image: string; // ✅ Dinamik rasm URL
  price: number;
  originalPrice?: number | null;
  isNew?: boolean;
  isOnSale?: boolean;
}

const AppartmentProducts = ({ id, name, image }: AppartmentProductsProps) => {
  const [showImage, setShowImage] = useState(false);

  const handleCardClick = () => setShowImage(true);
  const handleOverlayClick = () => setShowImage(false);

    useEffect(() => {
    if (showImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Komponent unmount bo‘lganda scrollni tiklash
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showImage]);
  
  return (
    <>
      <div className="group cursor-pointer" onClick={handleCardClick}>
        <div className="shadow-md border-gray-200 overflow-hidden transition-shadow hover:shadow-md">
          <div className="relative h-[200px] sm:h-[360px] md:h-[430px] bg-gray-100 ">
            <img
              src={image}
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

      {showImage && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-70 flex items-center justify-center z-50"
          onClick={handleOverlayClick}
        >
          <img
            src={image}
            alt={name}
            className="md:w-[500px] md:h-[600px] object-cover"
          />
        </div>
      )}
    </>
  );
};

export default AppartmentProducts;
