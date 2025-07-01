import { useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface FilterProps {
  filters: any;
  onFilterChange: (filters: any) => void;
  onClearFilters: () => void;
  onClose?: () => void;
}

interface FilterCheckboxProps {
  category: string;
  value: string;
  label: string;
  type?: string;
}

const Filter = ({ filters, onFilterChange, onClearFilters, onClose }: FilterProps) => {
  const { t } = useLanguage();
  const [expandedSections, setExpandedSections] = useState<{
    shape: boolean;
    price: boolean;
    delivery: boolean;
    style: boolean;
    room: boolean;
    size: boolean;
    color: boolean;
  }>({
    shape: false,
    price: false,
    delivery: false,
    style: false,
    room: false,
    size: false,
    color: false
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCheckboxChange = (category: string, value: string) => {
    const newFilters = { ...filters };
    if (newFilters[category].includes(value)) {
      newFilters[category] = newFilters[category].filter((item: string) => item !== value);
    } else {
      newFilters[category] = [...newFilters[category], value];
    }
    onFilterChange(newFilters);
  };

  const handleSizeChange = (field: string, value: string) => {
    const newFilters = {
      ...filters,
      size: {
        ...filters.size,
        [field]: value
      }
    };
    onFilterChange(newFilters);
  };

  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      "Ko'k": 'bg-blue-500',
      "Krem rang": 'bg-amber-100',
      "Kulrang": 'bg-gray-400',
      "Qaymoqrang": 'bg-amber-50',
      "Qizil": 'bg-red-500',
      "Qora": 'bg-black',
      "Yashil": 'bg-green-500'
    };
    return colorMap[color] || 'bg-gray-300';
  };

  const FilterCheckbox = ({ category, value, label, type = 'default' }: FilterCheckboxProps) => (
    <label className="flex items-center gap-3 py-1 cursor-pointer">
      <input
        type="checkbox"
        checked={filters[category].includes(value)}
        onChange={() => handleCheckboxChange(category, value)}
        className="hidden"
      />
      {type === 'color' ? (
        <>
          <div className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center ${
            filters[category].includes(value) ? 'border-blue-500' : 'border-gray-300'
          }`}>
            {filters[category].includes(value) && (
              <div className="w-2 h-2 bg-blue-500"></div>
            )}
          </div>
          <div className={`w-4 h-4 rounded-sm ${getColorClass(value)}`}></div>
          <span className="text-sm">{label}</span>
        </>
      ) : (
        <>
          <div className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center ${
            filters[category].includes(value) ? 'border-blue-500' : 'border-gray-300'
          }`}>
            {filters[category].includes(value) && (
              <div className="w-2 h-2 bg-blue-500"></div>
            )}
          </div>
          <span className="text-sm">{label}</span>
        </>
      )}
    </label>
  );

  return (
    <div className="bg-[#FAF9F7] p-6 ">
     
      
       <div className="mb-6 border-b pb-4">
        <button
          onClick={() => toggleSection('room')}
          className="flex items-center justify-between w-full text-left font-medium"
        >
          <span>Kolleksiyalar</span>
          {expandedSections.room ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {expandedSections.room && (
          <div className="mt-3 space-y-2">
            {["ANATOLIAN SILK", "MOVAROUNNAHR", "ENIGMA", "ISFAHAN", "TAMERLAN", "CREANTE BLACK", "CREANTE GREY"].map((room: string) => (
              <FilterCheckbox 
                key={room} 
                category="room" 
                value={room} 
                label={room} 
              />
            ))}
          </div>
        )}
      </div>

      <div className="mb-6 border-b pb-4">
        <button
          onClick={() => toggleSection('style')}
          className="flex items-center justify-between w-full text-left font-medium"
        >
          <span>{t('filter.styles')}</span>
          {expandedSections.style ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {expandedSections.style && (
          <div className="mt-3 space-y-2">
            {["Klassik dizayn", "Neoklassik dizayn", "Zamonaviy dizayn", "Bolalar dizayni"].map((style: string) => (
              <FilterCheckbox 
                key={style} 
                category="style" 
                value={style} 
                label={style} 
              />
            ))}
          </div>
        )}
      </div>

      <div className="mb-6 border-b pb-4">
        <button
          onClick={() => toggleSection('room')}
          className="flex items-center justify-between w-full text-left font-medium"
        >
          <span>{t('filter.rooms')}</span>
          {expandedSections.room ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {expandedSections.room && (
          <div className="mt-3 space-y-2">
            {["Mehmonxona", "Yotoqxona", "Oshxona", "Bolalar xonasi"].map((room: string) => (
              <FilterCheckbox 
                key={room} 
                category="room" 
                value={room} 
                label={room} 
              />
            ))}
          </div>
        )}
      </div>

      <div className="mb-6 border-b pb-4">
        <button
          onClick={() => toggleSection('size')}
          className="flex items-center justify-between w-full text-left font-medium"
        >
          <span>{t('filter.sizes')}</span>
          {expandedSections.size ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {expandedSections.size && (
          <div className="mt-3 space-y-3">
            <div>
              <label className="block text-sm mb-1">Eni:</label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={filters.size.width}
                  onChange={(e) => handleSizeChange('width', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50"
                  placeholder="sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1">Uzunligi:</label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={filters.size.height}
                  onChange={(e) => handleSizeChange('height', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50"
                  placeholder="sm"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mb-6 border-b pb-4">
        <button
          onClick={() => toggleSection('color')}
          className="flex items-center justify-between w-full text-left font-medium"
        >
          <span>{t('filter.colors')}</span>
          {expandedSections.color ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {expandedSections.color && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {["Ko'k", "Krem rang", "Kulrang", "Qaymoqrang", "Qizil", "Qora", "Yashil"].map((color: string) => (
              <FilterCheckbox 
                key={color} 
                category="color" 
                value={color} 
                label={color} 
                type="color"
              />
            ))}
          </div>
        )}
      </div>

      <div className="mb-6 border-b pb-4">
        <button
          onClick={() => toggleSection('shape')}
          className="flex items-center justify-between w-full text-left font-medium"
        >
          <span>{t('filter.shapes')}</span>
          {expandedSections.shape ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {expandedSections.shape && (
          <div className="mt-3 space-y-2">
            {["Oval", "To'rtburchak", "Metril", "Kvadrat", "Noodatiy"].map((shape: string) => (
              <FilterCheckbox 
                key={shape} 
                category="shape" 
                value={shape} 
                label={shape} 
              />
            ))}
          </div>
        )}
      </div>

      <div className="mb-6 border-b pb-4">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-left font-medium"
        >
          <span>{t('filter.price')}</span>
          {expandedSections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {expandedSections.price && (
          <div className="mt-3 space-y-2">
            {["1 - 100 000 uzs", "100 000 - 200 000 uzs", "200 000 - 300 000 uzs", "300 000 - 655 000 uzs"].map((price: string) => (
              <FilterCheckbox 
                key={price} 
                category="price" 
                value={price} 
                label={price} 
              />
            ))}
          </div>
        )}
      </div>

     

      <div className="flex flex-col space-y-3">
        <button
          onClick={() => onFilterChange(filters)}
          className="w-full py-3 bg-[#C89B71] text-white hover:bg-[#BCAAA4]"
        >
          {t('filter.apply')}
        </button>
        <button
          onClick={onClearFilters}
          className="w-full py-3 bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          {t('filter.clear')}
        </button>
      </div>
    </div>
  );
};

export default Filter;