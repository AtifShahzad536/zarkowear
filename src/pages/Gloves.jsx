import React, { useEffect } from 'react';
import ProductCard from '../components/ProductCard';

const products = [
  { name: 'Goalkeeper Gloves', image: '/images/slide1.jpg' },
  { name: 'Cricket Batting Gloves', image: '/images/slide2.jpg' },
  { name: 'Gym Grip Gloves', image: '/images/slide1.jpg' },
  { name: 'Hockey Gloves', image: '/images/slide2.jpg' },
];

const Gloves = () => {
   const path = window.location.pathname;
    useEffect(() => {
      window.scrollTo(0, 0);
  }, [path]);
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <section className="mb-8">
        <div className="bg-gradient-to-r from-gray-800 to-gray-600 text-white rounded-xl p-8 shadow">
          <h1 className="text-3xl font-bold">Gloves</h1>
          <p className="text-gray-100 mt-2">High-grip, protective gloves for multiple sports.</p>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p, i) => (
          <ProductCard key={i} image={p.image} name={p.name} onQuote={() => alert('Request quote: ' + p.name)} />
        ))}
      </section>
    </main>
  );
};

export default Gloves;
