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
    <div className="border border-slate-200 rounded-none overflow-hidden bg-white flex flex-col">
      <div className="w-full h-56 sm:h-72 bg-slate-100 animate-pulse" />
      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="h-5 bg-slate-200 rounded-none w-3/4 animate-pulse"></div>
          <div className="h-3 bg-slate-100 rounded-none w-full animate-pulse"></div>
          <div className="h-3 bg-slate-100 rounded-none w-5/6 animate-pulse"></div>
        </div>
        <div className="h-4 bg-slate-200 rounded-none w-1/4 animate-pulse mt-4"></div>
      </div>
    </div>
  );

  return (
    <section className="w-full px-4 py-16 bg-[#F8FAFC] m-0 border-b border-slate-200">
      {/* Minimalist Theme-Matched Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="max-w-[94%] mx-auto mb-8 text-center space-y-2 select-none"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-[#0A0C16] block">
          Tailored Sportswear
        </span>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
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
              className="bg-white border border-slate-200 border-l-4 border-l-transparent hover:border-l-indigo-600 rounded-none overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={() => navigate(`/${cat.slug}`)}
            >
              {/* Image Area - 70% height equivalent */}
              <div className="w-full h-56 sm:h-72 bg-slate-50/50 flex items-center justify-center p-6 overflow-hidden border-b border-slate-100">
                <img
                  src={imageUrl(cat.image || '/uploads/placeholder.jpg')}
                  alt={cat.name || cat.slug}
                  className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Title & Info Area - 30% height */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="text-sm font-black tracking-tight text-slate-900 uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {cat.name || cat.slug}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-1">
                    {cat.description || `Discover premium ${cat.name || cat.slug} with export-grade fabrics and custom options.`}
                  </p>
                </div>
                <div className="pt-2 text-[11px] font-bold text-indigo-600 group-hover:text-indigo-700 flex items-center gap-1">
                  Explore <span className="group-hover:translate-x-1 transition-transform">→</span>
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