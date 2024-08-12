'use client';

import React, { createContext, useState, useContext } from 'react';

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState({ type: null, value: 0 });

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: quantity > 0 ? quantity : 1 } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const applyDiscount = (type, value) => {
    setDiscount({ type, value });
  };

  const getDiscountedTotal = () => {
    const subtotal = getTotalPrice();
    if (discount.type === 'fixed') {
      return Math.max(subtotal - discount.value, 0); // Ensure the total doesn't go below 0
    } else if (discount.type === 'percentage') {
      return Math.max(subtotal * (1 - discount.value / 100), 0);
    } else {
      return subtotal; // No discount applied
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalPrice,
        applyDiscount,
        getDiscountedTotal,
        discount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
