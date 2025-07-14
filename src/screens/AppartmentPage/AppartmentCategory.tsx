import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
// import { useLanguage } from "../contexts/LanguageContext";

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
}

const AppartmentCategory = ({ id, name, image }: ProductCardProps) => {
  const { t } = useLanguage();

  return (
    <Link
      to={`/product-rooms/${id}`}
      state={{ name, from: "sales" }} // Pass name in state
      className="group"
    >
      <div className="shadow-md border-gray-200 overflow-hidden transition-shadow hover:shadow-md">
        <div className="relative h-[200px] sm:h-[360px] md:h-[430px] bg-gray-100">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="font-medium text-gray-800 mb-2 group-hover:text-gray-500 transition-colors">
            {name || t("noName") || "Xona nomi mavjud emas"}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default AppartmentCategory;