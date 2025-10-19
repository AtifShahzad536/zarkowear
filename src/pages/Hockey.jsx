import React, { useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Custom from './Custom';
import CategoryHero from '../components/CategoryHero';

const products = [
  { name: 'Hockey Kit A', image: '/images/slide2.jpg' },
  { name: 'Hockey Kit B', image: '/images/slide1.jpg' },
  { name: 'Training Jersey', image: '/images/slide2.jpg' },
  { name: 'Goalie Set', image: '/images/slide1.jpg' },
];

const featuredProduct = {
  name: 'Pro Hockey Kit Elite',
  image: '/images/slide2.jpg',
  description:
    'Built for speed and protection. Our hockey kits combine durable fabrics with flexible panels to keep you agile on the ice while resisting wear and tear.',
  details: [
    'Abrasion-resistant fabric for durability',
    'Mesh ventilation zones for cooling',
    'Reinforced stitching at stress points',
    'Moisture-wicking, quick-dry properties',
    'Custom team colors and branding',
    'Lightweight for unrestricted movement',
    'Sublimated graphics that never fade',
    'Available as full kit or separates',
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
};

const Hockey = () => {
   const path = window.location.pathname;
  useEffect(() => {
    window.scrollTo(0, 0);
}, [path]);
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <CategoryHero
        title="Hockey Kits & Apparel"
        description="Durable, flexible uniforms engineered for fast-paced play."
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
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
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
                    <span className="text-blue-600 mr-2 mt-1">✓</span>
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
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-200 transition-colors cursor-pointer"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>

            <button className="w-full md:w-auto bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md">
              Request Quote
            </button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Hockey Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p, i) => (
            <ProductCard key={i} image={p.image} name={p.name} onQuote={() => alert('Request quote: ' + p.name)} />
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

export default Hockey;
