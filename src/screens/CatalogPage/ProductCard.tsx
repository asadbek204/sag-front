import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number | null;
  isNew?: boolean;
  isOnSale?: boolean;
}

const ProductCard = ({ id, name, isNew, isOnSale }: ProductCardProps) => {
  return (
    <Link to={`/product/${id}`} className="group">
      <div className="bg-white border border-gray-200 overflow-hidden transition-shadow hover:shadow-md">
        <div className="relative bg-gray-100 aspect-square">
          <img 
            src="https://api.cabinet.smart-market.uz/uploads/images/ff8081818b1036f7316dffe3" 
            alt={name}
            className="w-full h-full object-cover"
          />

      

           {isNew && (
            <div className="absolute top-0 right-0 w-0 h-0 border-t-green-500 border-l-[60px] border-l-transparent">
              <span className="absolute top-[-42px] right-[2px] rotate-[45deg] text-white text-[11px] font-bold">
                Yangi
              </span>
            </div>
          )}

          
          {/* Chegirma label (o‘ng yuqori) */}
          {isOnSale && (
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[60px] border-t-red-500 border-l-[60px] border-l-transparent">
              <span className="absolute top-[-42px] right-[2px] rotate-[45deg] text-white text-[11px] font-bold">
                Chegirma
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-medium text-gray-800 mb-2 group-hover:text-[#D7CCC8] transition-colors">
            {name}
          </h3>
         
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
