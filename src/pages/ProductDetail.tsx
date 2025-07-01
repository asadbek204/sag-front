import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/ui/Footer";
import { ContactInfoSection } from "../screens/HomePage/sections/ContactInfoSection";
import { ChevronLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from '../contexts/LanguageContext';

const images = [
  "https://www.sagexpress.uz/media/images/products/LU5238_BS73.png",
  "https://www.sagexpress.uz/media/product/4a954f20-09cf-4723-a319-655ecfd3b494.jpg",
  "https://www.sagexpress.uz/media/product/19fc13a8-be99-4359-a191-c42c5ef86ec7.png",
  "https://www.sagexpress.uz/media/product/aca98c26-90bd-414d-babf-e64731443c24.png",
  "https://www.sagexpress.uz/media/product/80f61506-f726-4337-bf54-d3cd7379e30f.png"
];

const ProductDetail = () => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const location = useLocation();
  const fromSales = location.state?.from === 'sales';
  const { t } = useLanguage();

  // 🔁 Autoplay effect
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedImage(prev => {
        const currentIndex = images.indexOf(prev);
        const nextIndex = (currentIndex + 1) % images.length;
        return images[nextIndex];
      });
    }, 2000); 

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="bg-[#FAF9F7] md:pt-32 pt-28">
      <Navbar />

      <div className="flex flex-wrap  items-center container mx-auto text-base text-gray-600 mb-4 px-4">
        <ChevronLeft size={20} className="text-gray-600" /> <Link to="/">{t('nav.home')}</Link>
        {fromSales ? (
          <div className="pl-3 flex items-center font-semibold">
            <ChevronLeft size={20} className="text-gray-600" />
            {t('product.breadcrumb.product')}
          </div>
        ) : (
          <>
            <div className="pl-3 flex items-center cursor-pointer" onClick={() => window.history.back()}>
              <ChevronLeft size={20} className="text-gray-600" />
              {t('product.breadcrumb.carpets')}
            </div>
            <div className="pl-3 flex items-center" onClick={() => window.history.back()}>
              <ChevronLeft size={20} className="text-gray-600" />
              {t('product.breadcrumb.collection')}
            </div>
            <div className="pl-3 flex items-center font-semibold">
              <ChevronLeft size={20} className="text-gray-600" />
              {t('product.breadcrumb.product')}
            </div>
          </>
        )}
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className=" gap-8">
          <div className="md:flex gap-4 w-full ">
     
            <div className="flex md:flex-col gap-2 overflow-x-auto lg:overflow-visible">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 object-cover cursor-pointer border ${
                    selectedImage === img ? "border-blue-600" : "border-gray-300"
                  }`}
                  alt={`thumb-${index}`}
                />
              ))}
            </div>

           
            <div className="flex-1 md:pt-0 pt-9">
              <img
                src={selectedImage}
                alt="Product"
                className="w-full h-[500px] object-contain rounded"
              />
              <div className="flex justify-center gap-2 mt-3">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      selectedImage === images[index] ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  ></div>
                ))}
              </div>
            </div>

         
            <div className="md:w-[40%] md:pt-0 pt-9">
              <h1 className="text-xl font-semibold text-gray-800 mb-2">TRESOR BEIGE #7203</h1>
              <p className="text-sm text-gray-500 mb-4">#JG7203_PE32</p>

              <div className="bg-[#CDAA7D] text-white font-semibold text-center py-2 rounded mb-4">
                {t('product.shape.rectangle')}
              </div>

              <table className="w-full text-sm text-left mb-4">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="py-2">{t('product.sizes')}</th>
                    <th className="py-2">{t('product.price')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2">
                      <input type="checkbox" className="mr-2" /> 300 x 400
                    </td>
                    <td className="py-2 font-bold text-gray-800">4 512 000 uzs</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2">
                      <input type="checkbox" className="mr-2" /> 300 x 600
                    </td>
                    <td className="py-2 font-bold text-gray-800">7 512 000 uzs</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2">
                      <input type="checkbox" className="mr-2" /> 400 x 700
                    </td>
                    <td className="py-2 font-bold text-gray-800">8 512 000 uzs</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2">
                      <input type="checkbox" className="mr-2" /> 500 x 1000
                    </td>
                    <td className="py-2 font-bold text-gray-800">10 512 000 uzs</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <ContactInfoSection />
      <Footer />
    </div>
  );
};

export default ProductDetail;
