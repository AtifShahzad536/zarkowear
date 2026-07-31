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

  // Premium Skeleton Loader Component
  const SkeletonCard = () => (
    <div className="relative group overflow-hidden rounded-none shadow-md bg-white/50 backdrop-blur-sm">
      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-200 rounded-full w-3/4 animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-100 rounded-full animate-pulse"></div>
          <div className="h-3 bg-gray-100 rounded-full w-5/6 animate-pulse"></div>
          <div className="h-3 bg-gray-100 rounded-full w-2/3 animate-pulse"></div>
        </div>
        <div className="h-10 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-none animate-pulse mt-4"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );

  return (
    <section className="w-full px-4 py-10 bg-gradient-to-b from-white to-gray-50 m-0">
      {/* Minimalist Theme-Matched Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="max-w-[94%] mx-auto mb-14 text-center space-y-2 select-none"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-[#0A0C16] block">
          Tailored Sportswear
        </span>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 uppercase">
          Explore Sports Categories
        </h2>
        <div className="w-12 h-1 bg-[#0A0C16] mx-auto mt-2" />
        <p className="text-xs sm:text-sm text-gray-500 font-medium pt-2">
          Discover our export-grade categories or customize your kit below.
        </p>
      </motion.div>

      {/* Category Grid */}
      <div className="max-w-[94%] mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 px-2 sm:px-0">
        {loading ? (
          // Show skeleton loaders when loading
          Array.from({ length: 4 }).map((_, index) => (
            <motion.div
              key={`skeleton-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <SkeletonCard />
            </motion.div>
          ))
        ) : error ? (
          <div className="col-span-full text-center text-rose-600">{error}</div>
        ) : (
          items.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative group overflow-hidden rounded-none shadow-md hover:shadow-2xl transition cursor-pointer hover:-translate-y-1"
              onClick={() => navigate(`/${cat.slug}`)}
            >
              <img
                src={imageUrl(cat.image || '/uploads/placeholder.jpg')}
                alt={cat.name || cat.slug}
                className="w-full h-44 sm:h-80 object-contain bg-white transform group-hover:scale-110 transition duration-700 ease-out"
              />
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition duration-500" />
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-5">
                <div className="space-y-1">
                  <h3 className="text-lg md:text-xl font-bold tracking-wide text-white drop-shadow-lg transition duration-300 group-hover:-translate-y-1">
                    {cat.name || cat.slug}
                  </h3>
                  <div className="max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 overflow-hidden transition-all duration-500 ease-in-out">
                    <p className="text-xs md:text-sm text-gray-200/90 leading-relaxed line-clamp-2 mt-2">
                      {cat.description || `Discover premium ${cat.name || cat.slug} with export-grade fabrics and custom options.`}
                    </p>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 w-full rounded-none bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 text-xs md:text-sm tracking-wide shadow-md transition duration-300 mt-3"
                    >
                      Customize Now
                      <span aria-hidden>→</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
};

export default FeaturedCategories;