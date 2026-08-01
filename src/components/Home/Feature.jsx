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
    <div className="relative h-96 w-full border border-white/10 bg-slate-900 animate-pulse rounded-none">
      <div className="absolute inset-0 bg-slate-950/30" />
      <div className="absolute bottom-0 left-0 p-6 w-full space-y-3 z-20">
        <div className="h-6 bg-slate-800 rounded-none w-1/2"></div>
        <div className="h-3 bg-slate-800 rounded-none w-3/4"></div>
      </div>
    </div>
  );

  return (
    <section className="w-full px-4 py-20 bg-[#0A0C16] text-white m-0 border-b border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[600px] h-[300px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Minimalist Theme-Matched Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="max-w-[94%] mx-auto mb-12 text-center space-y-3 relative z-10 select-none"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-indigo-400 block">
          Tailored Sportswear
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
          Explore Sports Categories
        </h2>
        <div className="w-12 h-1 bg-indigo-500 mx-auto mt-4" />
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed pt-2">
          Discover our export-grade categories or customize your kit below.
        </p>
      </motion.div>

      {/* Category Grid - 4 Columns */}
      <div className="max-w-[94%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 px-2 sm:px-0">
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
          <div className="col-span-full text-center text-rose-500 font-bold">{error}</div>
        ) : (
          items.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative h-96 w-full overflow-hidden rounded-none border border-white/10 border-l-4 border-l-transparent hover:border-l-indigo-500 cursor-pointer group transition-all duration-300"
              onClick={() => navigate(`/${cat.slug}`)}
            >
              {/* Full height cover image */}
              <img
                src={imageUrl(cat.image || '/uploads/placeholder.jpg')}
                alt={cat.name || cat.slug}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-85 group-hover:opacity-90 transition-all duration-500 z-10" />

              {/* Text Area */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-wider drop-shadow-md" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {cat.name || cat.slug}
                  </h3>
                  <p className="text-[11px] text-slate-300 font-semibold leading-relaxed mt-2 opacity-80 max-h-0 group-hover:max-h-16 group-hover:opacity-100 overflow-hidden transition-all duration-500 ease-in-out">
                    {cat.description || `Discover premium ${cat.name || cat.slug} with export-grade fabrics and custom options.`}
                  </p>
                </div>
                <div className="pt-4 text-xs font-bold text-indigo-400 group-hover:text-indigo-300 flex items-center gap-1">
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