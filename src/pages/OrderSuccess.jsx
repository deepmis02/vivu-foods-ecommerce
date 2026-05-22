import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 flex flex-col items-center justify-center mt-10 bg-white rounded-md shadow-sm py-24 text-center">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <span className="text-5xl">🎉</span>
      </div>
      <h1 className="text-3xl font-extrabold text-green-600 mb-2">Order Successfully Placed!</h1>
      <p className="text-gray-600 mb-8 text-lg">Thank you for choosing VIVU Foods. Aapka fresh saman jaldi hi deliver kiya jayega.</p>
      
      <Link to="/" className="bg-[#2874f0] text-white px-8 py-3 rounded-sm font-bold shadow-md hover:bg-blue-700 transition-colors">
        CONTINUE SHOPPING
      </Link>
    </div>
  );
};

export default OrderSuccess;