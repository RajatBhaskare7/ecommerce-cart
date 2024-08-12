'use client';

import React from 'react';

export default function CartItem({ item, removeFromCart, updateQuantity }) {
  return (
    <div className="flex items-center justify-between p-4 border">
      <img src={`${item.images}`} alt={item.title} className="w-16 h-16 object-cover" />
      <div>
        <h2 className="text-lg font-semibold">{item.title}</h2>
        <p className="text-gray-600">${item.price.toFixed(2)}</p>
      </div>
      <div>
        <input
          type="number"
          value={item.quantity}
          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
          className="w-16 p-2 border"
        />
      </div>
      <button
        onClick={() => removeFromCart(item.id)}
        className="bg-red-600 text-white px-4 py-2"
      >
        Remove
      </button>
    </div>
  );
}
