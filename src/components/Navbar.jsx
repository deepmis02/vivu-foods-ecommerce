import React from 'react';
import { Search, ShoppingCart, User, MapPin, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();

  return (
    <nav className="bg-[#2874f0] text-white p-3 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <Link to="/" className="flex flex-col items-start cursor-pointer hover:opacity-90">
          <h1 className="text-xl font-extrabold tracking-tight leading-none">VIVU FOODS</h1>
          <span className="text-[#ffe500] text-[10px] font-bold italic">India's Fresh Pantry ✦</span>
        </Link>

        <div className="hidden md:flex items-center ml-6 space-x-1 cursor-pointer hover:bg-blue-600 p-1 rounded">
          <MapPin size={16} />
          <span className="text-xs font-semibold">Deliver to 452001</span>
        </div>

        <div className="flex-1 max-w-xl mx-6 flex shadow-sm">
          <input type="text" placeholder="Search Masala, Daal, Rice..." className="w-full px-4 py-2 text-black text-sm outline-none rounded-l-sm" />
          <button className="bg-[#ffe500] px-4 py-2 rounded-r-sm text-[#2874f0] font-bold"><Search size={20} /></button>
        </div>

        <div className="flex items-center space-x-6 font-semibold text-sm">
          
          {user ? (
            <div className="flex items-center space-x-4">
              {/* Yahan humne Link laga diya MyOrders page ke liye */}
              <Link to="/myorders" className="flex items-center space-x-1 cursor-pointer hover:text-gray-200 transition">
                <User size={18} />
                <span>Hi, {user.name.split(' ')[0]}</span>
              </Link>
              <button onClick={logout} className="flex items-center space-x-1 text-red-200 hover:text-white transition-colors">
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-white text-[#2874f0] px-6 py-1 rounded-sm hover:bg-gray-100 shadow-sm transition-colors">
              Login
            </Link>
          )}

          <Link to="/cart" className="flex items-center space-x-1 cursor-pointer relative hover:text-gray-200">
            <ShoppingCart size={18} /><span>Cart</span>
            <span className="absolute -top-2 -left-2 bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded-full border border-white">
              {cartCount}
            </span>
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;