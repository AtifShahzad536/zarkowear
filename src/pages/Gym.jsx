import React, { useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Custom from './Custom';
import CategoryHero from '../components/CategoryHero';

const products = [
  { name: 'Gym T-Shirt A', image: '/images/slide1.jpg' },
  { name: 'Gym T-Shirt B', image: '/images/slide2.jpg' },
  { name: 'Tank Top', image: '/images/slide1.jpg' },
  { name: 'Training Shorts', image: '/images/slide2.jpg' },
  { name: 'Compression Shirt', image: '/images/slide1.jpg' },
  { name: 'Workout Leggings', image: '/images/slide2.jpg' },
  { name: 'Sports Bra', image: '/images/slide1.jpg' },
  { name: 'Complete Gym Set', image: '/images/slide2.jpg' },
];

const featuredProduct = {
  name: 'Premium Gym Wear Set',
  image: '/images/slide1.jpg',
  description:
    'Elevate your workout with our premium gym apparel. Designed with high-performance fabric technology that moves with you, keeping you comfortable and dry through the most intense training sessions.',
  details: [
    'Moisture-wicking performance fabric',
    'Four-way stretch for unrestricted movement',
    'Anti-odor technology',
    'Breathable mesh ventilation panels',
    'Flatlock seams to reduce chafing',
    'Lightweight yet durable construction',
    'Custom branding available',
    'Quick-dry and anti-pill finish',
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
};

const Gym = () => {
  const path = window.location.pathname;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <CategoryHero
        title="Gym Wear & Training Apparel"
        description="Performance-driven gym wear engineered for strength, conditioning, and endurance."
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
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
                    <span className="text-gray-700 mr-2 mt-1">✓</span>
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
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>

            <button className="w-full md:w-auto bg-gray-800 text-white font-semibold px-8 py-3 rounded-lg hover:bg-gray-900 transition-colors shadow-md">
              Request Quote
            </button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Gym Collection</h2>
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

export default Gym;
