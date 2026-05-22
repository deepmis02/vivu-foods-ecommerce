import React, { useState, useEffect } from 'react';
import { Package, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MyOrders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Agar user login nahi hai toh Home par bhej do
    if (!user) {
      navigate('/');
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/user/${user.id}`);
        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error("Orders fetch error:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  if (loading) {
    return <div className="text-center mt-20 text-xl font-bold text-gray-500">Loading Orders... ⏳</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4 mt-6">
      <h2 className="text-2xl font-extrabold text-gray-800 mb-6 border-b pb-4">My Orders</h2>

      {orders.length === 0 ? (
        <div className="bg-white p-10 text-center rounded shadow-sm">
          <Package className="mx-auto text-gray-300 mb-4" size={64} />
          <h3 className="text-xl font-bold text-gray-700">Aapne abhi tak koi order nahi kiya hai</h3>
          <Link to="/" className="inline-block mt-4 bg-[#2874f0] text-white px-6 py-2 rounded font-bold hover:bg-blue-600 transition">
            START SHOPPING
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-md shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
              
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500 font-semibold">
                    Order Placed: {new Date(order.createdAt).toLocaleDateString('en-IN')}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Order ID: {order._id}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">₹{order.totalAmount}</p>
                  <span className="inline-block mt-1 bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-50 rounded border flex items-center justify-center text-xl">
                        📦
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{item.productName}</p>
                        <p className="text-xs text-gray-500">Weight: {item.weightLabel} | Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-sm font-bold text-gray-700">₹{item.price * item.quantity}</div>
                  </div>
                ))}
              </div>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;