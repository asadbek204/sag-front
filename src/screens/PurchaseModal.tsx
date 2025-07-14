import { X } from "lucide-react";
import React, { useState } from "react";
import { client } from "../services";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const cities = [
  "Toshkent", "Toshkent vil", "Andijon", "Buxoro", "Fargʻona", "Jizzax", "Xorazm",
  "Namangan", "Navoiy", "Qashqadaryo", "Samarqand", "Sirdaryo", "Surxondaryo"
];

const PurchaseModal: React.FC<PurchaseModalProps> = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    full_name: "",
    phone_number: "",
    city: "",
    address: "",
    comment: "",
  });

  const [errors, setErrors] = useState({
    full_name: "",
    phone_number: "",
    city: "",
    address: ""
  });

  if (!isOpen) return null;

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const validate = () => {
    const errs = { full_name: "", phone_number: "", city: "", address: "" };
    const nameRegex = /^[^\d]+$/;
    const phoneRegex = /^\+998\d{9}$/;

    if (!form.full_name.trim()) {
      errs.full_name = "Ism to‘ldirilishi shart";
    } else if (!nameRegex.test(form.full_name)) {
      errs.full_name = "Ismda raqam bo‘lishi mumkin emas";
    }

    if (!form.phone_number.trim()) {
      errs.phone_number = "Telefon raqam to‘ldirilishi shart";
    } else if (!phoneRegex.test(form.phone_number)) {
      errs.phone_number = "Telefon raqam +998 bilan va to‘liq raqamlardan iborat bo‘lishi kerak";
    }

    if (!form.city.trim()) {
      errs.city = "Shahar tanlanishi shart";
    }

    if (!form.address.trim()) {
      errs.address = "Manzil to‘ldirilishi shart";
    }

    setErrors(errs);
    return Object.values(errs).every((err) => err === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Iltimos, barcha majburiy maydonlarni to‘ldiring");
      return;
    }

    try {
      await client.post("/uz/api/v1/contact/contact/", {
        full_name: form.full_name,
        phone_number: form.phone_number,
        city: cities.indexOf(form.city) + 1 || null,
        address: form.address,
        comment: form.comment || null
      });

      toast.success("Muvaffaqiyatli yuborildi!");
      setForm({ full_name: "", phone_number: "", city: "", address: "", comment: "" });
      onClose();
    } catch (err) {
      toast.error("Xatolik yuz berdi!");
      console.error(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div
      onClick={handleBackgroundClick}
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    >
      <ToastContainer position="top-right" />
      <div className="bg-[#FFFCE0] p-6 rounded-md w-full max-w-2xl relative shadow-lg">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={onClose}>
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">Sotib olish</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Ism</label>
              <input
                type="text"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                className={`w-full bg-[#FFFCE0] border p-2 rounded ${errors.full_name ? "border-red-500" : "border-gray-300"}`}
                placeholder="Ismingiz"
              />
              {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Telefon raqam</label>
              <input
                type="tel"
                name="phone_number"
                value={form.phone_number}
                onChange={handleChange}
                className={`w-full bg-[#FFFCE0] border p-2 rounded ${errors.phone_number ? "border-red-500" : "border-gray-300"}`}
                placeholder="+998901234567"
              />
              {errors.phone_number && <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Shahar / Viloyat</label>
              <select
                name="city"
                value={form.city}
                onChange={handleChange}
                className={`w-full bg-[#FFFCE0] border p-2 rounded ${errors.city ? "border-red-500" : "border-gray-300"}`}
              >
                <option value="">Tanlang</option>
                {cities.map((city, idx) => (
                  <option key={idx} value={city}>{city}</option>
                ))}
              </select>
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Manzil</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className={`w-full bg-[#FFFCE0] border p-2 rounded ${errors.address ? "border-red-500" : "border-gray-300"}`}
                placeholder="To‘liq manzil"
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Izoh</label>
            <textarea
              name="comment"
              value={form.comment}
              onChange={handleChange}
              className="w-full border bg-[#FFFCE0] border-gray-300 p-2 rounded"
              rows={3}
              placeholder="Qo‘shimcha izohlar..."
            />
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
