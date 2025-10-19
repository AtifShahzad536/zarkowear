import React, { useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import CategoryHero from '../components/CategoryHero';

const products = [
  { name: 'Gym Duffel Bag', image: '/images/slide1.jpg' },
  { name: 'Team Backpack', image: '/images/slide2.jpg' },
  { name: 'Boot Bag', image: '/images/slide1.jpg' },
  { name: 'Kit Holdall', image: '/images/slide2.jpg' },
];

const Bags = () => {
   const path = window.location.pathname;
    useEffect(() => {
      window.scrollTo(0, 0);
  }, [path]);
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <CategoryHero
        title="Bags"
        description="Durable, spacious bags for kits and equipment."
      />

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p, i) => (
          <ProductCard key={i} image={p.image} name={p.name} onQuote={() => alert('Request quote: ' + p.name)} />
        ))}
      </section>
    </main>
  );
};

export default Bags;
