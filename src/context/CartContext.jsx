import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, selectedWeight) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product._id === product._id && item.weight._id === selectedWeight._id
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.product._id === product._id && item.weight._id === selectedWeight._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, weight: selectedWeight, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, weightId, change) => {
    setCart((prevCart) => 
      prevCart.map((item) => {
        if (item.product._id === productId && item.weight._id === weightId) {
          return { ...item, quantity: item.quantity + change };
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (productId, weightId) => {
    setCart((prevCart) => 
      prevCart.filter(item => !(item.product._id === productId && item.weight._id === weightId))
    );
  };

  // Naya function: Order place hone par cart zero karna
  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);