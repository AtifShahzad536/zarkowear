import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getHome, imageUrl } from '../../services/api';

const FeaturedCategories = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    setLoading(true);
    getHome()
      .then((d) => { if (!alive) return; setItems(d.quickCategories || []); setError(''); })
      .catch((e) => alive && setError(e.message || 'Failed to load'))
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, []);

  return (
    <section className="w-full px-4 py-10 bg-gradient-to-b from-white to-gray-50 m-0">
      {/* Clipped Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative bg-indigo-600 text-white px-6 py-4 mb-10 rounded-lg shadow-lg heading-clip w-fit mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-center">Explore Sports Categories</h2>
      </motion.div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
        {loading && (
          <div className="col-span-full text-center text-gray-500">Loading categories...</div>
        )}
        {error && (
          <div className="col-span-full text-center text-rose-600">{error}</div>
        )}
        {items.map((cat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="relative group overflow-hidden rounded-3xl shadow-md hover:shadow-2xl transition cursor-pointer ring-1 ring-gray-200 hover:-translate-y-1"
            onClick={()=> navigate(`/${cat.slug}`)}
          >
            <img
              src={imageUrl(cat.image || '/uploads/placeholder.jpg')}
              alt={cat.name || cat.slug}
              className="w-full h-72 object-contain bg-white transform group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/75 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition duration-300" />
            <div className="absolute inset-0 z-20 flex flex-col justify-between p-4">
              <div className="bg-white/90 backdrop-blur px-4 py-2 text-base font-semibold tracking-wide rounded-lg shadow-md text-indigo-700 w-fit">
                {cat.name || cat.slug}
              </div>
              <div className="space-y-3 text-white">
                <p className="text-sm md:text-base leading-relaxed opacity-0 group-hover:opacity-100 transition duration-300 line-clamp-3">
                  {cat.description || `Discover premium ${cat.name || cat.slug} with export-grade fabrics and custom options.`}
                </p>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-white/20 border border-white/40 py-3 text-sm md:text-base font-semibold tracking-wide backdrop-blur hover:bg-white/30 transition"
                >
                  Shop Collection
                  <span aria-hidden>→</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;