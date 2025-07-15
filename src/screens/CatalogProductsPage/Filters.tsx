import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

interface FilterOption {
  id: number;
  name: string;
}

interface FilterLabels {
  catalog: string;
  collections: string;
  styles: string;
  rooms: string;
  colors: string;
  shapes: string;
}

interface FilterOptions {
  catalog: { id: number; name: string } | null;
  collections: FilterOption[];
  styles: FilterOption[];
  rooms: FilterOption[];
  colors: FilterOption[];
  shapes: FilterOption[];
  labels: FilterLabels;
}

interface Filters {
  collection: number[];
  style: number[];
  room: number[];
  color: number[];
  shape: number[];
}

interface FilterProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onClearFilters: () => void;
  filterOptions: FilterOptions;
}

type FilterCategory = keyof Filters;

const Filter = ({ filters, onFilterChange, onClearFilters, filterOptions }: FilterProps) => {
  const { t } = useLanguage();


  const getInitialExpanded = () => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      return {
        collection: true,
        style: false,
        room: false,
        color: false,
        shape: false,
      };
    }
    return {
      collection: false,
      style: false,
      room: false,
      color: false,
      shape: false,
    };
  };

  const [expandedSections, setExpandedSections] = useState(getInitialExpanded);

  useEffect(() => {
    const handleResize = () => {
      setExpandedSections((prev) => ({
        ...prev,
        collection: window.innerWidth >= 1024,
        style: false,
        room: false,
        color: false,
        shape: false,
      }));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCheckboxChange = (category: FilterCategory, value: number) => {
    const newFilters = { ...filters };
    if (newFilters[category].includes(value)) {
      newFilters[category] = newFilters[category].filter((item) => item !== value);
    } else {
      newFilters[category] = [...newFilters[category], value];
    }
    onFilterChange(newFilters);
  };

  const getColorClass = (colorName: string) => {
    const colorMap: { [key: string]: string } = {
      Red: "bg-red-500",
      White: "bg-white",
      Blue: "bg-blue-500",
      Brown: "bg-brown-500",
      Black: "bg-black",
      Qizil: "bg-red-500",
      Oq: "bg-white",
      Ko_k: "bg-blue-500",
      Krem_rang: "bg-amber-100",
      Kulrang: "bg-gray-400",
      Qaymoqrang: "bg-amber-50",
      Qora: "bg-black",
      Yashil: "bg-green-500",
    };
    return colorMap[colorName.replace(" ", "_")] || "bg-gray-300";
  };

  const FilterCheckbox = ({ category, value, label, type = "default" }: { category: FilterCategory; value: number; label: string; type?: string }) => (
    <label className="flex items-center gap-3 py-1 cursor-pointer">
      <input
        type="checkbox"
        checked={filters[category].includes(value)}
        onChange={() => handleCheckboxChange(category, value)}
        className="hidden"
      />
      {type === "color" ? (
        <>
          <div
            className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center ${
              filters[category].includes(value) ? "border-blue-500" : "border-gray-300"
            }`}
          >
            {filters[category].includes(value) && <div className="w-2 h-2 bg-blue-500"></div>}
          </div>
          <div className={`w-4 h-4 rounded-sm ${getColorClass(label)}`}></div>
          <span className="text-sm">{label}</span>
        </>
      ) : (
        <>
          <div
            className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center ${
              filters[category].includes(value) ? "border-blue-500" : "border-gray-300"
            }`}
          >
            {filters[category].includes(value) && <div className="w-2 h-2 bg-blue-500"></div>}
          </div>
          <span className="text-sm">{label}</span>
        </>
      )}
    </label>
  );

  const renderCheckboxSection = (
    label: string,
    sectionKey: keyof typeof expandedSections,
    options: FilterOption[] | undefined,
    category: FilterCategory,
    type?: string
  ) => (
    <div className="mb-6 border-b pb-4">
      <button onClick={() => toggleSection(sectionKey)} className="flex items-center justify-between w-full text-left font-medium">
        <span>{label}</span>
        {expandedSections[sectionKey] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {expandedSections[sectionKey] && (
        <div className={`mt-3 ${type === "color" ? "grid grid-cols-2 gap-2" : "space-y-2"}`}>
          {options && options.length > 0 ? (
            options.map((option) => (
              <FilterCheckbox key={option.id} category={category} value={option.id} label={option.name} type={type} />
            ))
          ) : (
            <p className="text-sm text-gray-500">{t("common.loading") || "Hech qanday opsiya mavjud emas"}</p>
          )}
        </div>
      )}
    </div>
  );

  if (!filterOptions) {
    return <p className="text-sm text-gray-500">{t("common.loading") || "Filtr opsiyalari mavjud emas"}</p>;
  }

  return (
    <div className="bg-[#FFFCE0] p-6">
      {renderCheckboxSection(filterOptions.labels.collections, "collection", filterOptions.collections, "collection")}
      {renderCheckboxSection(filterOptions.labels.styles, "style", filterOptions.styles, "style")}
      {renderCheckboxSection(filterOptions.labels.rooms, "room", filterOptions.rooms, "room")}
      {renderCheckboxSection(filterOptions.labels.colors, "color", filterOptions.colors, "color", "color")}
      {renderCheckboxSection(filterOptions.labels.shapes, "shape", filterOptions.shapes, "shape")}

      <div className="flex flex-col space-y-3">
        <button onClick={onClearFilters} className="w-full py-3 bg-gray-200 text-gray-700 hover:bg-gray-300">
          {t("filter.clear") || "Tozalash"}
        </button>
      </div>
    </div>
  );
};

export default Filter;