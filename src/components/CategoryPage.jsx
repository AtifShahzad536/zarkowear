import React, { useEffect, useState } from 'react';
import { getCategory, imageUrl } from '../services/api';
import ProductCard from './ProductCard';
import Custom from '../pages/Custom';

const CategoryPage = ({ slug }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getCategory(slug)
      .then((d) => { if (mounted) { setData(d); setError(''); } })
      .catch((e) => mounted && setError(e.message || 'Failed to load'))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [slug]);

  useEffect(() => { window.scrollTo(0,0); }, [slug]);

  if (loading) return <main className="max-w-6xl mx-auto px-4 py-12"><div>Loading...</div></main>;
  if (error) return <main className="max-w-6xl mx-auto px-4 py-12"><div className="text-red-600">{error}</div></main>;
  if (!data) return null;

  const { name, featured, products } = data;
  const heroGradientClasses = 'from-blue-600 via-blue-500 to-blue-400';

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-12 mt-8">
        <div className={`bg-gradient-to-r ${heroGradientClasses} text-white rounded-xl p-8 shadow-lg`}>
          <h1 className="text-4xl font-bold mb-2">{name}</h1>
          <p className="opacity-90 text-lg">Premium quality, customization options, and export-grade durability.</p>
        </div>
      </section>

      {/* Featured Product */}
      {featured && (
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Product</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div className="relative group w-full flex justify-center items-start">
              <div className="relative w-full h-[450px] overflow-hidden rounded-xl shadow-xl">
                <img
                  src={imageUrl(featured.image)}
                  alt={featured.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src = imageUrl('/images/placeholder.jpg'); }}
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8`}>
                  <span className="text-white text-2xl font-bold">{featured.name}</span>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800">{featured.name}</h3>
              <p className="text-gray-700 text-lg leading-relaxed">{featured.description}</p>
              {Array.isArray(featured.details) && featured.details.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {featured.details.map((point, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-gray-700 mr-2 mt-1">✓</span>
                        <span className="text-gray-600">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {Array.isArray(featured.sizes) && featured.sizes.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Available Sizes:</h4>
                  <div className="flex gap-3 flex-wrap">
                    {featured.sizes.map((size, i) => (
                      <span key={i} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold">{size}</span>
                    ))}
                  </div>
                </div>
              )}
              <button className="w-full md:w-auto bg-gray-900 text-white font-semibold px-8 py-3 rounded-lg hover:bg-black transition-colors shadow-md">Request Quote</button>
            </div>
          </div>
        </section>
      )}

      {/* Products Grid */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} image={p.image} name={p.name} onQuote={() => alert('Request quote: ' + p.name)} />
          ))}
        </div>
      </section>

      {/* Custom Section */}
      <section className="mt-16">
        <Custom />
      </section>
    </main>
  );
};

export default CategoryPage;
