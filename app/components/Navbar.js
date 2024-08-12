'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cart } = useCart();
  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link href="/">E-commerce</Link>
        </h1>
        <div>
          <Link href="/cart"
             className="text-lg">
              Cart ({cart.length})
        
          </Link>
        </div>
      </div>
    </nav>
  );
}
