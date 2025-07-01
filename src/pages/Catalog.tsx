import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/ui/Footer";
import Filter from "../screens/CatalogProductsPage/Filters";
import ProductCard from "../screens/CatalogProductsPage/ProductCard";
import { Filter as FilterIcon, ChevronLeft } from 'lucide-react';
import { ContactInfoSection } from "../screens/HomePage/sections/ContactInfoSection";
import { Link } from "react-router-dom";
import { useLanguage } from '../contexts/LanguageContext';

const Catalog = () => {
  const rugData = [
    { id: 1, name: "ANATOLIAN SILK", price: 240000, originalPrice: 325000, shape: "Oval", size: "1 - 100 000 uzs", delivery: "1 - 2 kun oraligi", style: "Klassik dizayn", room: "Mehmonxona", color: "Qizil", isNew: false, isOnSale: true, salesCount: 50 },
    { id: 2, name: "MOVAROUNNAHR", price: 240000, originalPrice: 325000, shape: "To'rtburchak", size: "100 000 - 200 000 uzs", delivery: "3 - 6 kun oraligi", style: "Neoklassik dizayn", room: "Yotoqxona", color: "Yashil", isNew: false, isOnSale: true, salesCount: 30 },
    { id: 3, name: "ENIGMA", price: 240000, originalPrice: 325000, shape: "Metril", size: "200 000 - 300 000 uzs", delivery: "7 - 15 kun oraligi", style: "Zamonaviy dizayn", room: "Oshxona", color: "Qora", isNew: true, isOnSale: false, salesCount: 10 },
    { id: 4, name: "EMOMA", price: 240000, originalPrice: 325000, shape: "Kvadrat", size: "300 000 - 655 000 uzs", delivery: "1 - 2 kun oraligi", style: "Bolalar dizayni", room: "Bolalar xonasi", color: "Kulrang", isNew: false, isOnSale: true, salesCount: 70 },
    { id: 5, name: "ANATOLIAN SILK", price: 180000, originalPrice: 250000, shape: "Oval", size: "1 - 100 000 uzs", delivery: "3 - 6 kun oraligi", style: "Klassik dizayn", room: "Mehmonxona", color: "Ko'k", isNew: false, isOnSale: false, salesCount: 20 },
    { id: 6, name: "MOVAROUNNAHR", price: 320000, originalPrice: 420000, shape: "To'rtburchak", size: "200 000 - 300 000 uzs", delivery: "7 - 15 kun oraligi", style: "Neoklassik dizayn", room: "Yotoqxona", color: "Krem rang", isNew: false, isOnSale: true, salesCount: 40 },
    { id: 7, name: "ENIGMA CLASSIC", price: 150000, originalPrice: null, shape: "Noodatiy", size: "100 000 - 200 000 uzs", delivery: "1 - 2 kun oraligi", style: "Zamonaviy dizayn", room: "Oshxona", color: "Qaymoqrang", isNew: true, isOnSale: true, salesCount: 15 },
    { id: 8, name: "ANATOLIAN SILK", price: 280000, originalPrice: 350000, shape: "Metril", size: "200 000 - 300 000 uzs", delivery: "3 - 6 kun oraligi", style: "Klassik dizayn", room: "Mehmonxona", color: "Qizil", isNew: false, isOnSale: true, salesCount: 60 },
  ];

  const { t } = useLanguage()

  const [showFilters, setShowFilters] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("barchasi");

  const [filters, setFilters] = useState({
    shape: [],
    price: [],
    delivery: [],
    style: [],
    room: [],
    size: { width: "", height: "" },
    color: []
  });

  const itemsPerPage = 21;

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      shape: [],
      price: [],
      delivery: [],
      style: [],
      room: [],
      size: { width: "", height: "" },
      color: []
    });
  };

  const filteredRugs = rugData.filter(rug => {
    if (filters.shape.length > 0 && !filters.shape.includes(rug.shape)) return false;
    if (filters.price.length > 0 && !filters.price.includes(rug.size)) return false;
    if (filters.delivery.length > 0 && !filters.delivery.includes(rug.delivery)) return false;
    if (filters.style.length > 0 && !filters.style.includes(rug.style)) return false;
    if (filters.room.length > 0 && !filters.room.includes(rug.room)) return false;
    if (filters.color.length > 0 && !filters.color.includes(rug.color)) return false;
    return true;
  });

  const sortedRugs = [...filteredRugs].sort((a, b) => {
    switch (sortOption) {
      case "yangilik":
        return b.isNew - a.isNew; 
      case "chegirma":
        return b.isOnSale - a.isOnSale; 
      case "kop":
        return b.salesCount - a.salesCount;
      default:
        return 0; 
    }
  });

  const totalPages = Math.ceil(sortedRugs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRugs = sortedRugs.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-[#FAF9F7] md:pt-28 pt-24">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center text-base text-gray-600 mb-4">
            <ChevronLeft size={20} className="text-gray-600" /> <Link to="/">Bosh sahifa</Link>
            <div className="pl-3 flex items-center font-semibold"> <ChevronLeft size={20} className="text-gray-600" /> Gilamlar</div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg w-fit"
            >
              <FilterIcon size={16} />
              <span>Filtr</span>
            </button>
            
            <div className="flex overflow-x-auto gap-4 pb-2">
              {[
                { label: t('catalog.all'), value: "barchasi" },
                { label: t('catalog.new'), value: "yangilik" },
                { label: t('catalog.bestseller'), value: "kop" },
                { label: t('catalog.discount'), value: "chegirma" },
              ].map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => setSortOption(value)}
                  className={`px-4 py-2 whitespace-nowrap border-b-2 transition-colors ${
                    sortOption === value
                      ? "text-gray-800 font-semibold border-gray-800"
                      : "text-gray-600 border-transparent hover:border-gray-300"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter Sidebar - Only shown when showFilters is true */}
          {showFilters && (
            <div className="md:w-80">
              <Filter 
                filters={filters} 
                onFilterChange={handleFilterChange} 
                onClearFilters={clearFilters}
                onClose={() => setShowFilters(true)}
              />
            </div>
          )}
          
          {/* Products Grid */}
          <div className={`${showFilters ? 'md:w-[calc(100%-320px)]' : 'w-full'}`}>
            {sortedRugs.length > 0 ? (
              <>
                <div className={`grid grid-cols-2 sm:grid-cols-2 ${showFilters ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-4`}>
                  {currentRugs.map((rug) => (
                    <ProductCard 
                      key={rug.id}
                      id={rug.id}
                      name={rug.name}
                      price={rug.price}
                      originalPrice={rug.originalPrice}
                      isNew={rug.isNew}
                      isOnSale={rug.isOnSale}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50"
                    >
                      ←
                    </button>
                    
                    {(() => {
                      const visiblePages = 5;
                      const halfVisible = Math.floor(visiblePages / 2);
                      let startPage = Math.max(1, currentPage - halfVisible);
                      let endPage = Math.min(totalPages, currentPage + halfVisible);

                      if (endPage - startPage < visiblePages - 1) {
                        startPage = Math.max(1, endPage - (visiblePages - 1));
                      }

                      const pages = [];
                      if (startPage > 1) {
                        pages.push(
                          <button
                            key={1}
                            onClick={() => setCurrentPage(1)}
                            className={`px-3 py-2 rounded ${
                              currentPage === 1
                                ? 'bg-[#D7CCC8] text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            1
                          </button>
                        );
                        if (startPage > 2) pages.push(<span key="start-ellipsis" className="px-2">...</span>);
                      }

                      for (let i = startPage; i <= endPage; i++) {
                        pages.push(
                          <button
                            key={i}
                            onClick={() => setCurrentPage(i)}
                            className={`px-3 py-2 rounded ${
                              currentPage === i
                                ? 'bg-[#D7CCC8] text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            {i}
                          </button>
                        );
                      }

                      if (endPage < totalPages) {
                        if (endPage < totalPages - 1) pages.push(<span key="end-ellipsis" className="px-2">...</span>);
                        pages.push(
                          <button
                            key={totalPages}
                            onClick={() => setCurrentPage(totalPages)}
                            className={`px-3 py-2 rounded ${
                              currentPage === totalPages
                                ? 'bg-[#D7CCC8] text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            {totalPages}
                          </button>
                        );
                      }

                      return pages;
                    })()}
                    
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50"
                    >
                      →
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Hech qanday mahsulot topilmadi. Filtrlarni o'zgartirib ko'ring.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <ContactInfoSection />
      <Footer />
    </div>
  );
};

export default Catalog;