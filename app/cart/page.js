'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, getTotalPrice, applyDiscount, getDiscountedTotal, discount } = useCart();
  const [discountCode, setDiscountCode] = useState('');

  const handleApplyDiscount = () => {
    // For example purposes, let's assume:
    // "SAVE10" applies a 10% discount
    // "FIXED10" applies a $10 discount
    if (discountCode === 'SAVE10') {
      applyDiscount('percentage', 10);
    } else if (discountCode === 'FIXED10') {
      applyDiscount('fixed', 10);
    } else {
      alert('Invalid discount code');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-4">
              <img src={item.images} alt={item.title} className="w-16 h-16 object-cover" />
              <span>{item.title}</span>
              <span>${item.price}</span>
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                className="w-12 text-center border rounded"
              />
              <button onClick={() => removeFromCart(item.id)} className="text-red-500">
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4">
            <h2 className="text-xl font-bold">Summary</h2>
            <p>Subtotal: ${getTotalPrice().toFixed(2)}</p>
            {discount.type && (
              <p>
                Discount ({discount.type === 'percentage' ? `${discount.value}%` : `$${discount.value}`}): -$
                {(getTotalPrice() - getDiscountedTotal()).toFixed(2)}
              </p>
            )}
            <p>Total: ${getDiscountedTotal().toFixed(2)}</p>
          </div>

          <div className="mt-4">
            <input
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="Enter discount code"
              className="border rounded p-2 mr-2"
            />
            <button onClick={handleApplyDiscount} className="bg-blue-500 text-white p-2 rounded">
              Apply Discount
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
