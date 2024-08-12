'use client';
import React, { useContext } from 'react';
import CartItem from './CardItem.js';
import { CartContext } from '../context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useContext(CartContext);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="grid gap-6">
        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
          />
        ))}
      </div>
      <div className="mt-6 p-4 border-t">
        <h2 className="text-xl font-semibold">Total: ${getTotalPrice().toFixed(2)}</h2>
      </div>
    </div>
  );
}
