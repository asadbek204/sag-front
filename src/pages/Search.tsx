import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { client } from "../services";
import { Navbar } from "../components/Navbar";
import ProductCard from "../screens/CatalogProductsPage/ProductCard";
import { ContactInfoSection } from "../screens/HomePage/sections/ContactInfoSection";
import { Footer } from "../components/ui/Footer";
// import Filter from "../components/Filter"; // Adjust path as needed
import { Filter as FilterIcon, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import qs from 'query-string';

interface SearchResult {
  id: number;
  name: string;
  image: string;
  collection_type: number;
  price?: number;
  style?: number;
  room?: number;
  color?: number;
  shape?: number;
}

interface FilterOption {
  id: number;
  name: string;
}

interface FilterLabels {
  collections: string;
  styles: string;
  rooms: string;
  colors: string;
  shapes: string;
  prizes: string;
}

interface FilterOptions {
  collections: FilterOption[];
  styles: FilterOption[];
  rooms: FilterOption[];
  colors: FilterOption[];
  shapes: FilterOption[];
  prizes: FilterOption[];
  labels: FilterLabels;
}

interface FilterParams {
  query: string;
  sort_by: string;
  styles: number[];
  collections: number[];
  rooms: number[];
  colors: number[];
  shapes: number[];
  prizes: number[];
}

const SearchResults = () => {
  const { t, language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterParams>({
    query: "",
    sort_by: "4", // Default to "all"
    styles: [],
    collections: [],
    rooms: [],
    colors: [],
    shapes: [],
    prizes: [],
  });
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(() => typeof window !== "undefined" && window.innerWidth >= 1024);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    collections: [],
    styles: [],
    rooms: [],
    colors: [],
    shapes: [],
    prizes: [],
    labels: { collections: "", styles: "", rooms: "", colors: "", shapes: "", prizes: "" },
  });

  const itemsPerPage = 21;

  const mapLang = (lang: string) =>
    lang === "rus" ? "ru" : lang === "uzb" ? "uz" : "en";

  useEffect(() => {
    const handleResize = () => {
      setShowFilters(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
   const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q") || "";
  const sort_by = queryParams.get("sort_by") || "4";
  const styles = queryParams.get("styles")?.split(",").map(Number).filter(n => !isNaN(n)) || [];
  const collections = queryParams.get("collections")?.split(",").map(Number).filter(n => !isNaN(n)) || [];
  const rooms = queryParams.get("rooms")?.split(",").map(Number).filter(n => !isNaN(n)) || [];
  const colors = queryParams.get("colors")?.split(",").map(Number).filter(n => !isNaN(n)) || [];
  const shapes = queryParams.get("shapes")?.split(",").map(Number).filter(n => !isNaN(n)) || [];
  const prizes = queryParams.get("prizes")?.split(",").map(Number).filter(n => !isNaN(n)) || [];
    const updatedFilters = {
    query,
    sort_by,
    styles,
    collections,
    rooms,
    colors,
    shapes,
    prizes,
  };

  
  setSearchQuery(query);

  // 🔐 Cheksiz loop bo‘lmasligi uchun faqat farq bo‘lsa `setFilters` chaqiriladi
  setFilters((prev) => {
    const isSame = JSON.stringify(prev) === JSON.stringify(updatedFilters);
    return isSame ? prev : updatedFilters;
  });

  setSearchQuery(query);
    const fetchFilterOptions = async () => {
      try {
        const lang = mapLang(language);
        const res = await client.get(`/${lang}/api/v1/home/filter_choices/`);
        setFilterOptions({
          collections: res.data.collections || [],
          styles: Array.isArray(res.data.styles) ? (Array.isArray(res.data.styles[0]) ? res.data.styles[0] : res.data.styles) : [],
          rooms: res.data.rooms || [],
          colors: res.data.colors || [],
          shapes: res.data.shapes || [],
          prizes: res.data.prizes || [],
          labels: res.data.labels || {
            collections: "",
            styles: "",
            rooms: "",
            colors: "",
            shapes: "",
            prizes: "",
          },
        });
      } catch (err) {
        console.error("Error fetching filter options:", err);
        setError(t("catalog.error.filterOptions") || "Failed to load filter options");
      }
    };

    const fetchResults = async () => {
      try {
        setLoading(true);
        setError(null);
        const lang = mapLang(language);
        const queryParams = qs.stringify(
          {
            search: query || undefined,
            sort_by: sort_by !== "4" ? sort_by : undefined,
            styles: filters.styles.length > 0 ? filters.styles.join(",") : undefined,
            collections: filters.collections.length > 0 ? filters.collections.join(",") : undefined,
            rooms: filters.rooms.length > 0 ? filters.rooms.join(",") : undefined,
            colors: filters.colors.length > 0 ? filters.colors.join(",") : undefined,
            shapes: filters.shapes.length > 0 ? filters.shapes.join(",") : undefined,
            prizes: filters.prizes.length > 0 ? filters.prizes.join(",") : undefined,
          },
          { skipNull: true, skipEmptyString: true }
        );

        const response = await client.get(
          `/${lang}/api/v1/home/filter_and_sort_carpet_model_for_search/?${queryParams}`
        );
        setResults(response.data);
      } catch (err) {
        console.error("Search error:", err);
        setError(t("search.error") || "Search failed");
      } finally {
        setLoading(false);
      }
    };

    fetchFilterOptions();
    if (query || sort_by !== "4" || styles.length > 0 || collections.length > 0 || rooms.length > 0 || colors.length > 0 || shapes.length > 0 || prizes.length > 0) {
      fetchResults();
    }
  }, [location.search, language]);

  const mapCollectionType = (type: number): string => {
    const collectionMap: { [key: number]: string } = {
      1: "New",
      2: "Hit",
      3: "Sale",
      4: "Default",
    };
    return collectionMap[type] || "";
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    const params = new URLSearchParams({
      ...(newFilters.query && { q: newFilters.query }),
      ...(newFilters.sort_by !== "4" && { sort_by: newFilters.sort_by }),
      ...(newFilters.styles.length > 0 && { styles: newFilters.styles.join(",") }),
      ...(newFilters.collections.length > 0 && { collections: newFilters.collections.join(",") }),
      ...(newFilters.rooms.length > 0 && { rooms: newFilters.rooms.join(",") }),
      ...(newFilters.colors.length > 0 && { colors: newFilters.colors.join(",") }),
      ...(newFilters.shapes.length > 0 && { shapes: newFilters.shapes.join(",") }),
      ...(newFilters.prizes.length > 0 && { prizes: newFilters.prizes.join(",") }),
    });
    navigate(`/search?${params.toString()}`, { replace: true });
  };



  const totalPages = Math.ceil(results.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentResults = results.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-[#FFFCE0] md:pt-28 pt-24">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
       
        <div className="mb-6">
          <div className="flex md:mb-12 mb-7 items-center text-base text-gray-600">
            <ChevronLeft size={20} className="text-gray-600" />
            <Link to="/">{t("nav.home")}</Link>
           
            <div className="pl-3 flex items-center font-semibold cursor-pointer">
              <ChevronLeft size={20} className="text-gray-600" />
              {searchQuery || mapCollectionType(Number(filters.sort_by)) || t("product.breadcrumb.search")}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
           

            <div className="flex overflow-x-auto gap-4 pb-2">
              {[
                // { label: t("catalog.all"), value: "4" },
                { label: t("catalog.new"), value: "1" },
                { label: t("catalog.bestseller"), value: "2" },
                { label: t("catalog.sale"), value: "3" },
              ].map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => handleFilterChange({ ...filters, sort_by: value })}
                  className={`px-4 py-2 whitespace-nowrap border-b-2 transition-colors ${
                    filters.sort_by === value
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
          
          <div className={`${showFilters ? "md:w-[calc(100%-320px)]" : "w-full"}`}>
            {loading ? (
              <p className="text-center py-12">{t("catalog.loading") || "Yuklanmoqda..."}</p>
            ) : results.length > 0 ? (
              <>
                <div className={`grid grid-cols-4 sm:grid-cols-2 ${showFilters ? "lg:grid-cols-3" : "lg:grid-cols-4"} gap-8`}>
                  {currentResults.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      image={product.image}
                      price={product.price}
                      collection_type={mapCollectionType(product.collection_type)}
                      onClick={() => navigate(`/catalog/${product.collection_type}/product/${product.id}`)}
                    />
                  ))}
                </div>

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
                              currentPage === 1 ? "bg-[#D7CCC8] text-white" : "text-gray-600 hover:bg-gray-100"
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
                              currentPage === i ? "bg-[#D7CCC8] text-white" : "text-gray-600 hover:bg-gray-100"
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
                              currentPage === totalPages ? "bg-[#D7CCC8] text-white" : "text-gray-600 hover:bg-gray-100"
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
                <p className="text-gray-500">{t("catalog.noProducts") || "Mahsulot topilmadi"}</p>
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

export default SearchResults;