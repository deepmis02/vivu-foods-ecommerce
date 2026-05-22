import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import OrderSuccess from './pages/OrderSuccess';
import Login from './pages/UserLogin';
import MyOrders from './pages/MyOrders'; // Naya page import kiya
import { CartProvider } from './context/CartContext'; 
import { AuthProvider } from './context/AuthContext'; 

function App() {
  return (
    <AuthProvider>
      <CartProvider> 
        <Router>
          <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/success" element={<OrderSuccess />} />
              <Route path="/login" element={<Login />} />
              <Route path="/myorders" element={<MyOrders />} /> {/* Naya rasta */}
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;