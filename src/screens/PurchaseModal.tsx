import { X } from "lucide-react";
import React from "react";

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const cities = [
  "Toshkent", "Toshkent vil", "Andijon", "Buxoro", "Fargʻona", "Jizzax", "Xorazm",
  "Namangan", "Navoiy", "Qashqadaryo", "Samarqand", "Sirdaryo", "Surxondaryo"
];

const PurchaseModal: React.FC<PurchaseModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackgroundClick}
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    >
      <div className="bg-[#FFFCE0] p-6 rounded-md w-full max-w-2xl relative shadow-lg">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">Sotib olish</h2>

        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Ism</label>
              <input type="text" className="w-full bg-[#FFFCE0] border border-gray-300 p-2 rounded" placeholder="Ismingiz" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Telefon raqam</label>
              <input type="tel" className="w-full bg-[#FFFCE0] border border-gray-300 p-2 rounded" placeholder="+998901234567" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Shahar / Viloyat</label>
              <select className="w-full border bg-[#FFFCE0] border-gray-300 p-2 rounded">
                <option value="">Tanlang</option>
                {cities.map((city, idx) => (
                  <option key={idx} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Manzil</label>
              <input type="text" className="w-full bg-[#FFFCE0] border border-gray-300 p-2 rounded" placeholder="To‘liq manzil" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Izoh</label>
            <textarea className="w-full border bg-[#FFFCE0] border-gray-300 p-2 rounded" rows={3} placeholder="Qo‘shimcha izohlar..." />
          </div>

          <button type="submit" className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2 rounded">
            Yuborish
          </button>
        </form>
      </div>
    </div>
  );
};

export default PurchaseModal;
