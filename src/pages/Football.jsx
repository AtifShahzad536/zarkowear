import React, { useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Custom from './Custom';
import { imageUrl } from '../services/api';
import CategoryHero from '../components/CategoryHero';

const products = [
  { name: 'Pro Football Kit A', image: '/images/slide1.jpg' },
  { name: 'Pro Football Kit B', image: '/images/slide2.jpg' },
  { name: 'Training Kit', image: '/images/slide1.jpg' },
  { name: 'Goalkeeper Set', image: '/images/slide2.jpg' },
  { name: 'Youth Football Kit', image: '/images/slide1.jpg' },
  { name: 'Away Jersey', image: '/images/slide2.jpg' },
  { name: 'Match Day Bundle', image: '/images/slide1.jpg' },
  { name: 'Training Shorts', image: '/images/slide2.jpg' },
];

const featuredProduct = {
  name: 'Elite Football Kit Pro',
  image: '/images/slide1.jpg',
  description:
    'Elevate your game with our professional football kits. Engineered with cutting-edge fabric technology, these kits provide exceptional breathability, durability, and comfort for match-ready performance on any pitch.',
  details: [
    'Premium polyester fabric for superior comfort',
    'Advanced moisture-wicking technology',
    'Ergonomic fit for unrestricted movement',
    'Sublimation printing for vibrant, long-lasting colors',
    'Reinforced seams for enhanced durability',
    'Lightweight and breathable design',
    'Custom team branding available',
    'Available in full kit or individual pieces',
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
};

const Football = () => {
  const path = window.location.pathname;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <CategoryHero
        title="Football Kits & Apparel"
        description="Match-ready, breathable, and durable kits for clubs, academies, and professional teams."
      />

      {/* Featured Product Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Left: Product Image with Hover Overlay */}
          <div className="relative group w-full flex justify-center items-start">
            <div className="relative w-full h-[520px] overflow-hidden rounded-xl shadow-xl bg-white">
              <img
                src={imageUrl(featuredProduct.image)}
                alt={featuredProduct.name}
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src = imageUrl('/images/placeholder.jpg'); }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 via-indigo-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                <span className="text-white text-2xl font-bold">{featuredProduct.name}</span>
              </div>
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">{featuredProduct.name}</h3>
            <p className="text-gray-700 text-lg leading-relaxed">{featuredProduct.description}</p>

            {/* Detail Points */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Key Features:</h4>
              <ul className="space-y-2">
                {featuredProduct.details.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-indigo-600 mr-2 mt-1">✓</span>
                    <span className="text-gray-600">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sizes */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Available Sizes:</h4>
              <div className="flex gap-3 flex-wrap">
                {featuredProduct.sizes.map((size, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-semibold hover:bg-indigo-200 transition-colors cursor-pointer"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>

            <button className="w-full md:w-auto bg-indigo-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md">
              Request Quote
            </button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Football Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p, i) => (
            <ProductCard
              key={i}
              image={p.image}
              name={p.name}
              onQuote={() => alert('Request quote: ' + p.name)}
            />
          ))}
        </div>
      </section>

      {/* Custom Order Section */}
      <section className="mt-16">
        <Custom />
      </section>
    </main>
  );
};

export default Football;
