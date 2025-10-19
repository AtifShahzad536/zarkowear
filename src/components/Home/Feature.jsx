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
            className="relative group overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition cursor-pointer ring-1 ring-gray-200"
            onClick={()=> navigate(`/${cat.slug}`)}
          >
            <img
              src={imageUrl(cat.image || '/uploads/placeholder.jpg')}
              alt={cat.name || cat.slug}
              className="w-full h-60 object-contain bg-white transform group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition duration-300" />
            <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between">
              <div className="bg-white/90 backdrop-blur px-3 py-2 text-sm md:text-base font-semibold tracking-wide rounded-md shadow-md text-indigo-700">
                {cat.name || cat.slug}
              </div>
              <span className="text-white text-xs border border-white/70 rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition">Shop →</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;