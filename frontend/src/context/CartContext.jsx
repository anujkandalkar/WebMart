import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  
  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    alert(`${product.title} added to cart!`);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter(item => item._id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// This is the line Vite was complaining about
export const useCart = () => useContext(CartContext);