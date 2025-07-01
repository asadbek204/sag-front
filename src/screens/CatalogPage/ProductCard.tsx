import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number | null;
  isNew?: boolean;
  isOnSale?: boolean;
}

const ProductCard = ({ id, name, isNew, isOnSale }: ProductCardProps) => {
  const { t } = useLanguage();
  return (
<Link to={`/catalog/${id}`} className="group">
  <div className="bg-white shadow-sm  border-gray-200 overflow-hidden transition-shadow hover:shadow-md">
    <div className="relative bg-gray-100">
      <img
        src="https://www.sagexpress.uz/media/images/products/LU5238_BS73.png"
        alt={name}
        className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
      />

          {isNew && (
            <div className="absolute top-0 right-0 w-[60px] h-[60px]">
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[100px] border-t-white border-l-[100px] border-l-transparent z-10" />

              <div className="absolute top-0 right-0 w-0 h-0 border-t-[100px] border-t-green-600 border-l-[100px] border-l-transparent z-20 rotate-180" />

              <span className="absolute top-[70px] right-[50px]  text-white text-[13px] font-bold z-30">
                {t('badge.new')}
              </span>
            </div>
          )}

           {isOnSale && (
            <div className="absolute top-0 right-0 w-[60px] h-[60px]">
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[100px] border-t-white border-l-[100px] border-l-transparent z-10" />

              <div className="absolute top-0 right-0 w-0 h-0 border-t-[100px] border-t-red-500 border-l-[100px] border-l-transparent z-20 rotate-180" />

              <span className="absolute top-[70px] right-[37px]  text-white text-[13px] font-bold z-30">
                {t('badge.sale')}
              </span>
            </div>
          )}

        </div>

        <div className="p-4">
          <h3 className="font-medium text-gray-800 mb-2 group-hover:text-gray-500 transition-colors">
            {name}
          </h3>

        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
