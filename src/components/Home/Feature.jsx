import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getHome, imageUrl } from '../../services/api';

const MotionLink = motion(Link);

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

  // Clean Minimal Skeleton Loader Component
  const SkeletonCard = () => (
    <div className="border border-slate-200/90 rounded-[6px] overflow-hidden bg-white flex flex-col shadow-xs">
      <div className="w-full aspect-[4/5] bg-slate-100 animate-pulse" />
      <div className="p-3 sm:p-4 space-y-2 bg-white">
        <div className="h-4 bg-slate-200 rounded w-3/4 animate-pulse"></div>
        <div className="h-3 bg-slate-100 rounded w-1/2 animate-pulse"></div>
      </div>
    </div>
  );

  return (
    <section className="w-full px-4 py-10 sm:py-14 bg-[#F8FAFC] m-0 border-b border-slate-200">
      {/* Minimalist Theme-Matched Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-[94%] xl:max-w-7xl 2xl:max-w-[1440px] mx-auto mb-8 text-center space-y-2 select-none"
      >
        <span className="text-[clamp(10px,0.8vw,12px)] uppercase tracking-[0.25em] font-extrabold text-[#0A0C16] block">
          Tailored Sportswear
        </span>
        <h2 className="text-[clamp(24px,2.5vw,36px)] font-black tracking-tight text-gray-900 uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
          Explore Sports Categories
        </h2>
        <div className="w-12 h-1 bg-[#0A0C16] mx-auto mt-2" />
        <p className="text-[clamp(12px,1vw,16px)] text-gray-500 font-medium pt-2">
          Discover our export-grade categories or customize your kit below.
        </p>
      </motion.div>

      {/* Category Grid */}
      <div className="max-w-[94%] xl:max-w-7xl 2xl:max-w-[1440px] mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6 px-2 sm:px-0">
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
          items.map((cat, index) => {
            const formattedName = cat.name || cat.slug || 'Sportswear';
            const categorySubtitle = cat.categoryGroup || `Sportswear, ${formattedName}`;

            return (
              <MotionLink
                key={index}
                to={`/${cat.slug}`}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="group relative bg-white border border-slate-200/80 hover:border-slate-300 rounded-[6px] overflow-hidden flex flex-col shadow-xs hover:shadow-md transition-all duration-300"
              >
                {/* Large Product / Category Image Area */}
                <div className="relative w-full aspect-[4/5] sm:aspect-square bg-white flex items-center justify-center p-4 sm:p-6 overflow-hidden">
                  <img
                    src={imageUrl(cat.image || '/uploads/placeholder.jpg', { width: 800, quality: 'auto:best' })}
                    alt={formattedName}
                    title={formattedName}
                    width={400}
                    height={400}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300 ease-out"
                  />
                </div>

                {/* Minimal Clean Details - Image + Less Text */}
                <div className="p-4 sm:p-5 pt-1 sm:pt-2 text-left bg-white">
                  <h3
                    className="text-sm sm:text-base font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors truncate"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {formattedName}
                  </h3>
                  <p className="text-xs text-slate-400 font-normal mt-1 truncate">
                    {categorySubtitle}
                  </p>
                </div>
              </MotionLink>
            );
          })
        )}
      </div>
    </section>
  );
};

export default FeaturedCategories;
