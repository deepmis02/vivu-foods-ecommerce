import React from 'react';

const categoriesData = [
  { name: "Atta & Anaj", image: "🌾" },
  { name: "Shuddh Masala", image: "🌶️" },
  { name: "Dal & Pulses", image: "🥣" },
  { name: "Cooking Oil", image: "🧴" },
  { name: "Rice Items", image: "🍚" },
  { name: "Sugar & Salt", image: "🧂" },
  { name: "Dry Fruits", image: "🥜" },
  { name: "Daily Kirana", image: "🛒" },
  { name: "Snacks", image: "🍪" },
];

const Categories = () => {
  return (
    <div className="bg-white mx-2 mt-2 p-3 shadow-sm flex items-center justify-between overflow-x-auto">
      {categoriesData.map((item, index) => (
        <div key={index} className="flex flex-col items-center cursor-pointer min-w-[90px] group">
          <div className="w-14 h-14 bg-green-50 group-hover:bg-yellow-50 rounded-full flex items-center justify-center text-2xl mb-1 border border-gray-100">
            {item.image}
          </div>
          <span className="text-[12px] font-bold text-gray-700 group-hover:text-[#2874f0] text-center">
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Categories;