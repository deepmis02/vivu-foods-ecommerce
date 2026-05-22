import React, { useState, useEffect } from 'react';
import { ShieldCheck, Leaf, Sparkles, Award, ArrowRight } from 'lucide-react';
import Categories from '../components/Categories';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Data fetch karne mein error:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Categories />
      <main className="max-w-7xl mx-auto p-4">
        
        {/* 1. BRAND STORYTELLING HERO SECTION */}
        <div className="bg-gradient-to-r from-amber-800 to-orange-700 rounded-md mb-8 flex flex-col md:flex-row items-center justify-between text-white p-8 md:p-12 shadow-lg relative overflow-hidden">
          <div className="max-w-xl z-10 text-center md:text-left">
            <span className="bg-amber-500 text-amber-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              100% Pure & Stone-Ground
            </span>
            <h2 className="text-3xl md:text-5xl font-black mt-3 leading-tight">
              Dadi Maa Ke Haath Jaisa Shuddh Masala ✨
            </h2>
            <p className="text-amber-100 mt-4 text-base md:text-lg opacity-90 leading-relaxed">
              VIVU Masala mein hum khade masalon ko bina unka natural oil nikale, thande taapman par (Stone-Ground) piste hain. Taaki aapke khane ko mile asli swaad aur shuddhata.
            </p>
            <button className="mt-6 bg-white text-orange-800 font-bold px-6 py-3 rounded shadow hover:bg-amber-50 transition-all flex items-center gap-2 mx-auto md:mx-0">
              ASLI SWAAD DEKHEIN <ArrowRight size={18} />
            </button>
          </div>
          <div className="text-8xl md:text-9xl mt-8 md:mt-0 opacity-80 animate-pulse z-10">
            🌶️
          </div>
          {/* Background subtle design element */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-orange-600 rounded-full opacity-20 blur-2xl"></div>
        </div>

        {/* 2. TRUST BADGES SECTION (Building Customer Trust) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="p-3 bg-green-50 text-green-600 rounded-full"><Leaf size={24} /></div>
            <div>
              <h4 className="font-bold text-gray-800 text-sm">100% Organic</h4>
              <p className="text-xs text-gray-500">Khet se seedhe aap tak</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-full"><Sparkles size={24} /></div>
            <div>
              <h4 className="font-bold text-gray-800 text-sm">No Artificial Color</h4>
              <p className="text-xs text-gray-500">Bilkul prakritik rang</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-full"><ShieldCheck size={24} /></div>
            <div>
              <h4 className="font-bold text-gray-800 text-sm">Lab Tested Pure</h4>
              <p className="text-xs text-gray-500">Har batch chemical-free</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-full"><Award size={24} /></div>
            <div>
              <h4 className="font-bold text-gray-800 text-sm">VIVU Promise</h4>
              <p className="text-xs text-gray-500">Bhorosa shuddhata ka</p>
            </div>
          </div>
        </div>

        {/* 3. OUR HERITAGE STORY BLOCK */}
        <div className="bg-amber-50 border border-amber-100 p-6 rounded-md mb-10 flex flex-col md:flex-row items-center gap-6">
          <div className="text-4xl">🥣</div>
          <div className="flex-1">
            <h3 className="font-extrabold text-amber-900 text-lg mb-1">Kyun khass hai VIVU Masala?</h3>
            <p className="text-amber-800 text-sm leading-relaxed">
              Aam taur par baki masale badi machino mein tez garam karke pise jate hain, jisse unki khushbu aur faydemand ayurvedic gun ud jate hain. VIVU Foods India mein hum purani parampara ke mutabik unhe dheere-dheere piste hain taaki unka asli swaad aur sehat hamesha barkarar rahe.
            </p>
          </div>
        </div>

        {/* 4. FLIPKART STYLE PRODUCT SELECTION ENGINE */}
        <div className="bg-white p-5 rounded-md shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-2xl font-extrabold text-gray-800">Explore VIVU Fresh Range</h2>
            <button className="text-[#2874f0] font-bold text-sm hover:underline">VIEW ALL</button>
          </div>
          
          {loading ? (
            <div className="text-center p-10 text-xl font-bold text-gray-500">Loading Fresh Products... ⏳</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map(prod => (
                <ProductCard key={prod._id} product={prod} />
              ))}
            </div>
          )}
        </div>

      </main>
    </>
  );
};

export default Home;