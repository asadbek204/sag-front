import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";

interface ProductCardProps {
  id: number; 
  name: string;
  image: string;
  categoryId: number; 
  collectionId?: number;
  collectionType: string; 
  styleId: number
}

const ProductCard = ({ id, name, image, categoryId, collectionId, collectionType, styleId}: ProductCardProps) => {
  const { t } = useLanguage();

  const getCollectionTypeLabel = (type: string) => {
    switch (type.toLowerCase()) {
      case "new":
        return t("badge.new") || "Yangi";
      case "sale":
        return t("badge.sale") || "Chegirma";
      case "hit":
        return t("hit") || "Mashhur";
      case "default":
        return "";
      default:
        return "";
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "new":
        return "border-t-green-600";
      case "sale":
        return "border-t-red-500";
      case "hit":
        return "border-t-orange-500";
      case "default":
        return "border-t-gray-500";
      default:
        return "border-t-gray-500";
    }
  };

  return (
    <Link to={`/catalog/${categoryId}/product/${id}`} state={{ from: "catalog", name, collectionId, styleId }} className="group">
      <div className="shadow-md border-gray-200 overflow-hidden transition-shadow hover:shadow-md">
        <div className="relative h-[200px] sm:h-[360px] md:h-[430px] bg-gray-100">
          <img
            src={image}
            alt={name}
            
            className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
          />

          {collectionType && getCollectionTypeLabel(collectionType) && (
            <div className="absolute top-0 right-0 w-[30px] h-[30px] sm:w-[60px] sm:h-[60px]">
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[60px] border-t-[#FFFCE0] border-l-[60px] border-l-transparent z-10 sm:border-t-[100px] sm:border-l-[100px]" />
              <div
                className={`absolute top-0 right-0 w-0 h-0 border-t-[60px] border-l-[60px] border-l-transparent z-20 rotate-180 sm:border-t-[100px] sm:border-l-[100px] ${getBadgeColor(
                  collectionType
                )}`}
              />
              <span className="absolute top-[38px] right-[19px] text-white text-[8px] font-bold z-30 sm:top-[70px] sm:right-[37px] sm:text-[13px]">
                {getCollectionTypeLabel(collectionType)}
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-medium text-gray-800 mb-2 group-hover:text-gray-500 transition-colors">{name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;