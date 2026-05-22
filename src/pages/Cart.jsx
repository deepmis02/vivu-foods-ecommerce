import React from 'react';
import { MapPin, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // User detail laane ke liye

const Cart = () => {
  const { cart, cartCount, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth(); // Check karenge ki user login hai ya nahi
  const navigate = useNavigate();

  const totalMRP = cart.reduce((sum, item) => sum + (item.weight.mrp * item.quantity), 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.weight.price * item.quantity), 0);
  const totalDiscount = totalMRP - totalPrice;

  // Jab user "Place Order" par click kare
  const handlePlaceOrder = async () => {
    // 1. Agar user login nahi hai, toh pehle Login page par bhejein
    if (!user) {
      alert("Order place karne ke liye pehle Login karna zaroori hai!");
      navigate('/login');
      return;
    }

    // 2. Order ka data taiyar karein
    const orderData = {
      userId: user.id,
      orderItems: cart.map(item => ({
        productName: item.product.name,
        weightLabel: item.weight.label,
        quantity: item.quantity,
        price: item.weight.price
      })),
      shippingAddress: "Indore, Madhya Pradesh", // Abhi ke liye fixed
      totalAmount: totalPrice
    };

    try {
      // 3. Backend (Database) ko order bhejein
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        clearCart(); // Cart khali karein
        navigate('/success'); // Success page par bhejein
      } else {
        alert("Order save nahi ho paya, please try again.");
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("Network Error!");
    }
  };

  if (cartCount === 0) {
    return (
      <div className="max-w-7xl mx-auto p-4 flex flex-col items-center justify-center mt-10 bg-white rounded-md shadow-sm py-20">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Aapka Cart Khali Hai!</h2>
        <p className="text-gray-500 mb-6">Lagta hai aapne apne fresh VIVU Foods abhi tak add nahi kiye.</p>
        <Link to="/" className="bg-[#2874f0] text-white px-8 py-3 rounded-sm font-bold shadow-md hover:bg-blue-700 transition-colors">
          SHOPPING SHURU KAREIN
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row gap-6 mt-4">
      <div className="flex-[2] bg-white rounded-md shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4 border-b pb-2">My Cart ({cartCount} Items)</h2>
        
        {cart.map((item) => (
          <div key={`${item.product._id}-${item.weight._id}`} className="flex flex-col sm:flex-row items-center justify-between border-b py-6 gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-20 h-20 bg-gray-50 flex items-center justify-center text-4xl rounded border shadow-sm">
                {item.product.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">{item.product.name}</h3>
                <p className="text-sm text-gray-500 mb-2">Weight: <span className="font-semibold text-gray-700">{item.weight.label}</span></p>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-gray-900">₹{item.weight.price}</span>
                  <span className="text-sm text-gray-400 line-through">₹{item.weight.mrp}</span>
                  <span className="text-sm font-bold text-green-600">{( ((item.weight.mrp - item.weight.price)/item.weight.mrp)*100 ).toFixed(0)}% Off</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3 mt-4 sm:mt-0">
              <div className="flex items-center space-x-4 bg-gray-50 border rounded px-3 py-1">
                <button onClick={() => updateQuantity(item.product._id, item.weight._id, -1)} className="font-bold px-2 text-lg hover:text-red-500">-</button>
                <span className="font-bold bg-white px-4 py-1 border rounded">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.product._id, item.weight._id, 1)} className="font-bold px-2 text-lg hover:text-green-500">+</button>
              </div>
              <button 
                onClick={() => removeFromCart(item.product._id, item.weight._id)}
                className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm font-semibold transition-colors"
              >
                <Trash2 size={16} /> REMOVE
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1">
        <div className="bg-white rounded-md shadow-sm p-6 sticky top-20 border border-gray-100">
          <h3 className="text-gray-500 font-bold border-b pb-3 mb-4 uppercase text-sm tracking-wide">Price Details</h3>
          
          <div className="flex justify-between mb-3 text-gray-700 text-base">
            <span>Price ({cartCount} items)</span>
            <span>₹{totalMRP}</span>
          </div>
          <div className="flex justify-between mb-3 text-gray-700 text-base">
            <span>Discount</span>
            <span className="text-green-600 font-bold">- ₹{totalDiscount}</span>
          </div>
          <div className="flex justify-between mb-3 text-gray-700 text-base">
            <span>Delivery Charges</span>
            <span className="text-green-600 font-bold border-b border-dashed pb-1">FREE</span>
          </div>
          
          <div className="flex justify-between font-extrabold text-xl border-t pt-4 mt-2 text-gray-900">
            <span>Total Amount</span>
            <span>₹{totalPrice}</span>
          </div>
          
          <p className="text-green-600 font-bold text-sm mt-4 bg-green-50 p-2 rounded text-center">
            You will save ₹{totalDiscount} on this order 🎉
          </p>
          
          <button 
            onClick={handlePlaceOrder}
            className="w-full bg-[#fb641b] text-white font-bold py-3.5 mt-6 rounded shadow-md hover:bg-[#e05615] transition-colors text-lg tracking-wide"
          >
            PLACE ORDER (COD)
          </button>
          
          <div className="mt-6 flex items-start gap-2 text-xs text-gray-500 bg-gray-50 p-3 rounded border">
            <MapPin size={18} className="text-green-600 shrink-0" />
            <p className="leading-relaxed">Delivering to Indore, Madhya Pradesh. 100% Freshness and Quality guaranteed.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;