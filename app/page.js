'use client'
import React, { useContext } from 'react';
import ProductCard from './components/ProductCard';
import { CartContext } from './context/CartContext';
import axios from 'axios';
import { useEffect, useState } from 'react';


export default function HomePage() {
  const { addToCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get('https://dummyjson.com/products').then((response) => {
      console.log(response.data);
      setProducts(response.data.products);
    });
  },[]);
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Product Listing</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {products && products.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}
