import React, { useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Custom from './Custom';
import CategoryHero from '../components/CategoryHero';

const products = [
  { name: 'Basketball Kit A', image: '/images/slide1.jpg' },
  { name: 'Basketball Kit B', image: '/images/slide2.jpg' },
  { name: 'Slam Dunk Jersey', image: '/images/slide1.jpg' },
  { name: 'Training Shorts', image: '/images/slide2.jpg' },
  { name: 'Pro Basketball Set', image: '/images/slide1.jpg' },
  { name: 'Youth Kit', image: '/images/slide2.jpg' },
  { name: 'Shooting Shirt', image: '/images/slide1.jpg' },
  { name: 'Team Bundle', image: '/images/slide2.jpg' },
];

const featuredProduct = {
  name: 'Pro Basketball Kit Elite',
  image: '/images/slide1.jpg',
  description:
    'Dominate the court with our premium basketball uniforms. Featuring breathable mesh construction and moisture-wicking technology, these kits are designed for peak athletic performance during intense gameplay.',
  details: [
    'Breathable mesh fabric for maximum airflow',
    'Moisture-wicking technology keeps you dry',
    'Lightweight design for agility and speed',
    'Reinforced stitching for durability',
    'Vibrant sublimation printing',
    'Available in custom team colors',
    'Quick-dry material',
    'Perfect fit for unrestricted movement',
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
};

const Basketball = () => {
  const path = window.location.pathname;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <CategoryHero
        title="Basketball Kits & Apparel"
        description="Breathable mesh jerseys and shorts designed for indoor and outdoor basketball excellence."
      />

      {/* Featured Product Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Left: Product Image with Hover Overlay */}
          <div className="relative group w-full flex justify-center items-start">
            <div className="relative w-full h-[450px] overflow-hidden rounded-xl shadow-xl">
              <img
                src={featuredProduct.image}
                alt={featuredProduct.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-900/80 via-orange-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
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
                    <span className="text-orange-600 mr-2 mt-1">✓</span>
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
                    className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg text-sm font-semibold hover:bg-orange-200 transition-colors cursor-pointer"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>

            <button className="w-full md:w-auto bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors shadow-md">
              Request Quote
            </button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Basketball Collection</h2>
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

export default Basketball;
