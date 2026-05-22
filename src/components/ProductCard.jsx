import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  // MongoDB database se aaye hue weights array ka pehla item default set kiya hai
  const [selectedWeight, setSelectedWeight] = useState(product.weights[0]);
  const [quantity, setQuantity] = useState(0);
  
  // Context API se addToCart function nikala
  const { addToCart } = useCart(); 

  const handleAdd = () => {
    setQuantity(1);
    addToCart(product, selectedWeight); // Item ko Global Cart mein bhej diya
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100 hover:shadow-lg transition-shadow w-full sm:w-64">
      
      {/* Product Image / Icon */}
      <div className="h-40 bg-gray-50 mb-3 flex items-center justify-center relative rounded-md overflow-hidden">
        <span className="text-5xl">{product.icon}</span>
        {product.discount && (
          <span className="absolute top-2 left-2 bg-green-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
            {product.discount} OFF
          </span>
        )}
      </div>

      {/* Product Details & Weight Selector */}
      <div className="mb-2">
        <h3 className="font-bold text-gray-800 text-sm truncate">{product.name}</h3>
        <p className="text-xs text-gray-500 mb-2">VIVU Foods India</p>
        
        {/* Weight Dropdown (MongoDB ke _id ke sath) */}
        <select 
          className="w-full p-1 text-xs border rounded-sm outline-none bg-gray-50 mb-3"
          value={selectedWeight._id}
          onChange={(e) => setSelectedWeight(product.weights.find(w => w._id === e.target.value))}
        >
          {product.weights.map(w => (
            <option key={w._id} value={w._id}>
              {w.label} - ₹{w.price}
            </option>
          ))}
        </select>
      </div>

      {/* Price & Add to Cart Button */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-lg font-bold text-gray-900">₹{selectedWeight.price}</span>
          <span className="text-[10px] text-gray-400 line-through">₹{selectedWeight.mrp}</span>
        </div>

        {quantity === 0 ? (
          <button 
            onClick={handleAdd}
            className="bg-[#2874f0] text-white px-6 py-1.5 rounded-sm text-sm font-bold shadow-sm hover:bg-blue-700 transition-colors"
          >
            ADD
          </button>
        ) : (
          <div className="flex items-center space-x-3 bg-[#2874f0] text-white rounded-sm px-2 py-1">
            <button onClick={() => setQuantity(quantity - 1)}>
              <Minus size={16} />
            </button>
            <span className="font-bold text-sm">{quantity}</span>
            <button onClick={() => {
              setQuantity(quantity + 1);
              addToCart(product, selectedWeight);
            }}>
              <Plus size={16} />
            </button>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default ProductCard;