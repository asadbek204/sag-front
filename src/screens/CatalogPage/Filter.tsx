import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

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

interface FilterProps {
  filters: {
    room: number[];
    color: number[];
    shape: number[];
    style: number[];
    size: { width: string; height: string };
    price: number[];
    delivery: number[];
  };
  onFilterChange: (filters: any) => void;
  onClearFilters: () => void;
  onClose: () => void;
  filterOptions: FilterOptions;
}

const Filter = ({ filters, onFilterChange, onClearFilters, filterOptions }: FilterProps) => {
  const { t } = useLanguage();
  
  const [expandedSections, setExpandedSections] = useState({
    shape: false,
    room: false,
    color: false,
    style: false,
  });

  const [localFilters, setLocalFilters] = useState({ ...filters });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCheckboxChange = (category: string, id: number) => {
    if (category === 'size') return; // size is not an array
    
    const updatedFilters = {
      ...localFilters,
      [category]: (localFilters[category as keyof typeof localFilters] as number[]).includes(id)
        ? (localFilters[category as keyof typeof localFilters] as number[]).filter((item: number) => item !== id)
        : [...(localFilters[category as keyof typeof localFilters] as number[]), id]
    };
    setLocalFilters(updatedFilters);
    // Apply filter immediately
    onFilterChange(updatedFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      room: [],
      color: [],
      shape: [],
      style: [],
      size: { width: "", height: "" },
      price: [],
      delivery: [],
    };
    setLocalFilters(clearedFilters);
    onClearFilters();
  };

  const renderCheckboxSection = (
    label: string,
    sectionKey: keyof typeof expandedSections,
    options: FilterOption[],
    categoryKey: string
  ) => (
    <div className="mb-6 border-b pb-4">
      <button 
        onClick={() => toggleSection(sectionKey)} 
        className="flex justify-between w-full font-medium py-2"
      >
        <span>{label}</span>
        {expandedSections[sectionKey] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {expandedSections[sectionKey] && (
        <div className="mt-3 space-y-2">
          {options.map((option) => (
            <label key={option.id} className="flex items-center gap-3 py-1 cursor-pointer">
              <input
                type="checkbox"
                checked={(localFilters[categoryKey as keyof typeof localFilters] as number[]).includes(option.id)}
                onChange={() => handleCheckboxChange(categoryKey, option.id)}
                className="hidden"
              />
              <div
                className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center ${
                  (localFilters[categoryKey as keyof typeof localFilters] as number[]).includes(option.id) ? "border-blue-500" : "border-gray-300"
                }`}
              >
                {(localFilters[categoryKey as keyof typeof localFilters] as number[]).includes(option.id) && (
                  <div className="w-2 h-2 bg-blue-500 rounded-sm"></div>
                )}
              </div>
              <span className="text-sm">{option.name}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-[#FFFCE0] p-6 rounded-lg">
      <div className="mb-6">
        
        {renderCheckboxSection(
          filterOptions.labels.rooms || "Xonalar", 
          "room", 
          filterOptions.rooms || [], 
          "room"
        )}
        
        {renderCheckboxSection(
          filterOptions.labels.colors || "Ranglar", 
          "color", 
          filterOptions.colors || [], 
          "color"
        )}
        
        {renderCheckboxSection(
          filterOptions.labels.shapes || "Shakllar", 
          "shape", 
          filterOptions.shapes || [], 
          "shape"
        )}
        
     {renderCheckboxSection(
  filterOptions.labels.styles || "Uslublar", 
  "style", 
  Array.isArray(filterOptions.styles?.[0]) 
    ? (filterOptions.styles[0] as FilterOption[]) 
    : (filterOptions.styles as FilterOption[]), 
  "style"
)}


      </div>

      <div className="flex flex-col space-y-3">
        <button 
          onClick={clearFilters} 
          className="w-full py-3 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg transition-colors"
        >
          {t("filter.clear") || "Tozalash"}
        </button>
      </div>
    </div>
  );
};

export default Filter;