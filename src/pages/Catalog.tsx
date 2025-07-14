import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/ui/Footer";
import Filter from "../screens/CatalogPage/Filter";
import ProductCard from "../screens/CatalogPage/ProductCard";
import { Filter as FilterIcon, ChevronLeft } from "lucide-react";
import { ContactInfoSection } from "../screens/HomePage/sections/ContactInfoSection";
import { Link, useParams } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { client } from "../services";

interface Rug {
  id: number;
  catalog: number;
  name: string;
  image: string;
  collection_type: string;
}

interface FilterOption {
  id: number;
  name: string;
}

interface FilterOptions {
  rooms: FilterOption[];
  colors: FilterOption[];
  shapes: FilterOption[];
  styles: FilterOption[] | FilterOption[][];
  labels: {
    catalog: string;
    rooms: string;
    colors: string;
    shapes: string;
    styles: string;
  };
}

const Catalog = () => {
  const { t, language } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const [rugData, setRugData] = useState<Rug[]>([]);
  const [originalRugData, setOriginalRugData] = useState<Rug[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(() => {
    return typeof window !== "undefined" && window.innerWidth >= 1024;
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("all");
  const itemsPerPage = 21;

  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    rooms: [],
    colors: [],
    shapes: [],
    styles: [],
    labels: {
      catalog: "",
      rooms: "",
      colors: "",
      shapes: "",
      styles: "",
    },
  });

  const [filters, setFilters] = useState({
    shape: [],
    price: [],
    delivery: [],
    style: [],
    room: [],
    size: { width: "", height: "" },
    color: [],
  });

  const mapLang = (lang: string) => (lang === "rus" ? "ru" : lang === "uzb" ? "uz" : "en");

  // Sort mapping for API
  const getSortValue = (sortOption: string) => {
    switch (sortOption) {
      case "new": return "1";
      case "bestseller": return "2";
      case "sale": return "3";
      default: return null;
    }
  };

  useEffect(() => {
    const lang = mapLang(language);

    const fetchInitialCarpets = async () => {
      try {
        setLoading(true);
        const res = await client.get(`/${lang}/api/v1/catalog/get_carpets_by_catalog_id/${id}/`);
        const data = Array.isArray(res.data) ? res.data : res.data.results || [];
        setRugData(data);
        setOriginalRugData(data);
      } catch (err) {
        setError(t("common.error") || "Xatolik yuz berdi");
        setRugData([]);
        setOriginalRugData([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchFilterOptions = async () => {
      try {
        const res = await client.get(`/${lang}/api/v1/catalog/filter_choices/${id}/`);
        // Process styles if it's array of arrays
        let processedData = { ...res.data };
        if (processedData.styles && Array.isArray(processedData.styles) && processedData.styles.length > 0) {
          if (Array.isArray(processedData.styles[0])) {
            processedData.styles = processedData.styles[0];
          }
        }
        setFilterOptions(processedData);
      } catch (err) {
        console.error("Filter options fetch error:", err);
      }
    };

    if (id) {
      fetchInitialCarpets();
      fetchFilterOptions();
    }
  }, [id, language, t]);

  const handleFilterChange = async (newFilters: any) => {
    setFilters(newFilters);
    setCurrentPage(1);
    const lang = mapLang(language);
    
    try {
      setLoading(true);
      
      // Prepare query parameters
      const params = new URLSearchParams();
      
      // Add sort parameter if not "all"
      const sortValue = getSortValue(sortOption);
      if (sortValue) {
        params.append('sort_by', sortValue);
      }
      
      // Add filter parameters as comma-separated strings
      if (newFilters.room && newFilters.room.length > 0) {
        params.append('rooms', newFilters.room.join(','));
      }
      if (newFilters.color && newFilters.color.length > 0) {
        params.append('colors', newFilters.color.join(','));
      }
      if (newFilters.shape && newFilters.shape.length > 0) {
        params.append('shapes', newFilters.shape.join(','));
      }
      if (newFilters.style && newFilters.style.length > 0) {
        params.append('styles', newFilters.style.join(','));
      }
      
      const queryString = params.toString();
      const url = `/${lang}/api/v1/catalog/filter_and_sort_carpets/${id}/${queryString ? `?${queryString}` : ''}`;
      
      const res = await client.get(url);
      setRugData(Array.isArray(res.data) ? res.data : res.data.results || []);
    } catch (err) {
      console.error("Filter error:", err);
      setError(t("common.error") || "Filtrlashda xatolik");
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = async () => {
    const clearedFilters = {
      shape: [],
      price: [],
      delivery: [],
      style: [],
      room: [],
      size: { width: "", height: "" },
      color: [],
    };
    setFilters(clearedFilters);
    setCurrentPage(1);
    
    // If sort is not "all", apply only sort
    if (sortOption !== "all") {
      const lang = mapLang(language);
      try {
        setLoading(true);
        const sortValue = getSortValue(sortOption);
        const url = `/${lang}/api/v1/catalog/filter_and_sort_carpets/${id}/?sort_by=${sortValue}`;
        const res = await client.get(url);
        setRugData(Array.isArray(res.data) ? res.data : res.data.results || []);
      } catch (err) {
        console.error("Clear filter error:", err);
      } finally {
        setLoading(false);
      }
    } else {
      // Reset to original data
      setRugData(originalRugData);
    }
  };

  const handleSortChange = async (newSortOption: string) => {
    setSortOption(newSortOption);
    setCurrentPage(1);
    
    const lang = mapLang(language);
    try {
      setLoading(true);
      
      // Prepare query parameters
      const params = new URLSearchParams();
      
      // Add sort parameter if not "all"
      const sortValue = getSortValue(newSortOption);
      if (sortValue) {
        params.append('sort_by', sortValue);
      }
      
      // Add existing filter parameters
      if (filters.room && filters.room.length > 0) {
        params.append('rooms', filters.room.join(','));
      }
      if (filters.color && filters.color.length > 0) {
        params.append('colors', filters.color.join(','));
      }
      if (filters.shape && filters.shape.length > 0) {
        params.append('shapes', filters.shape.join(','));
      }
      if (filters.style && filters.style.length > 0) {
        params.append('styles', filters.style.join(','));
      }
      
      const queryString = params.toString();
      const url = `/${lang}/api/v1/catalog/filter_and_sort_carpets/${id}/${queryString ? `?${queryString}` : ''}`;
      
      const res = await client.get(url);
      setRugData(Array.isArray(res.data) ? res.data : res.data.results || []);
    } catch (err) {
      console.error("Sort error:", err);
      setError(t("common.error") || "Saralashda xatolik");
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(rugData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRugs = rugData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-[#FFFCE0] md:pt-28 pt-24">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex md:mb-12 mb-7 items-center text-base text-gray-600">
            <ChevronLeft size={20} className="text-gray-600" />
            <Link to="/">{t("nav.home") || "Bosh sahifa"}</Link>
            <div className="pl-3 flex items-center font-semibold">
              <ChevronLeft size={20} className="text-gray-600" />
              {t("product.breadcrumb.carpets") || "Gilamlar"}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg w-fit"
            >
              <FilterIcon size={16} />
              <span>{t("filter") || "Filtr"}</span>
            </button>

            <div className="flex overflow-x-auto gap-4 pb-2">
              {["all", "new", "bestseller", "sale"].map((value) => (
                <button
                  key={value}
                  onClick={() => handleSortChange(value)}
                  className={`px-4 py-2 whitespace-nowrap border-b-2 transition-colors ${
                    sortOption === value
                      ? "text-gray-800 font-semibold border-gray-800"
                      : "text-gray-600 border-transparent hover:border-gray-300"
                  }`}
                >
                  {t(`catalog.${value}`) || value}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {showFilters && (
            <div className="md:w-80">
              <Filter
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
                onClose={() => setShowFilters(true)}
                filterOptions={filterOptions}
              />
            </div>
          )}

          <div className={`${showFilters ? "md:w-[calc(100%-320px)]" : "w-full"}`}>
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">{t("loading") || "Yuklanmoqda..."}</p>
              </div>
            ) : error ? (
              <div className="text-center py-12 text-red-500">{error}</div>
            ) : rugData.length > 0 ? (
              <>
                <div className={`grid grid-cols-2 sm:grid-cols-2 ${showFilters ? "lg:grid-cols-3" : "lg:grid-cols-4"} gap-4`}>
                  {currentRugs.map((rug) => (
                    <ProductCard
                      key={rug.id}
                      id={rug.id}
                      name={rug.name}
                      image={rug.image}
                      categoryId={rug.catalog}
                      collectionType={rug.collection_type}
                    />
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8 space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
                    >
                      {t("pagination.previous") || "Oldingi"}
                    </button>
                    
                    <span className="px-4 py-2">
                      {currentPage} / {totalPages}
                    </span>
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
                    >
                      {t("pagination.next") || "Keyingi"}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  {t("common.noProducts") || "Hech qanday mahsulot topilmadi. Filtrlarni o'zgartirib ko'ring."}
                </p>
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