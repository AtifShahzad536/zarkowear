import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
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

  // Premium Skeleton Loader Component
  const SkeletonCard = () => (
    <div className="border border-slate-200/90 rounded-[5px] overflow-hidden bg-white flex flex-col shadow-2xs">
      <div className="w-full h-40 sm:h-48 bg-slate-100 animate-pulse" />
      <div className="p-3.5 sm:p-4 space-y-2 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          <div className="h-3.5 bg-slate-200 rounded-[5px] w-1/3 animate-pulse"></div>
          <div className="h-4 bg-slate-200 rounded-[5px] w-3/4 animate-pulse"></div>
          <div className="h-3 bg-slate-100 rounded-[5px] w-full animate-pulse"></div>
        </div>
        <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
          <div className="h-3 bg-slate-200 rounded-[5px] w-1/4 animate-pulse"></div>
          <div className="w-6 h-6 rounded-full bg-slate-100 animate-pulse"></div>
        </div>
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
          items.map((cat, index) => (
            <MotionLink
              key={index}
              to={`/${cat.slug}`}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="relative bg-white border border-slate-200/90 hover:border-indigo-500/60 rounded-[5px] overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-xl transition-all duration-300 group"
            >
              {/* Subtle Animated Top Gradient Line on Hover */}
              <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-20" />

              {/* Image Area - Pure white background */}
              <div className="relative w-full h-40 sm:h-48 bg-white flex items-center justify-center p-3 sm:p-4 overflow-hidden border-b border-slate-100">
                <span className="absolute top-2.5 left-2.5 text-[9px] font-extrabold uppercase tracking-wider text-indigo-700 bg-slate-50 px-2 py-0.5 rounded-[5px] border border-indigo-100 shadow-2xs z-10">
                  Custom Kit
                </span>

                <img
                  src={imageUrl(cat.image || '/uploads/placeholder.jpg', { width: 800, quality: 'auto:best' })}
                  alt={cat.name || cat.slug}
                  title={cat.name || cat.slug}
                  width={350}
                  height={350}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain transform group-hover:scale-108 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Title & Info Area - Clean typography & 1-line truncated description */}
              <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-1.5 bg-white">
                <div>
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block mb-0.5">
                    Pro Athletic Wear
                  </span>
                  <h3 className="text-xs sm:text-sm font-black tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors uppercase truncate" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {cat.name || cat.slug}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-medium leading-normal mt-1 truncate" title={cat.description || `Discover premium ${cat.name || cat.slug} with export-grade fabrics and custom options.`}>
                    {cat.description || `Discover premium ${cat.name || cat.slug} with export-grade fabrics and custom options.`}
                  </p>
                </div>

                {/* Bottom Row with Sleek Micro-Interaction */}
                <div className="pt-2.5 mt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10.5px] sm:text-xs font-bold text-slate-800 group-hover:text-indigo-600 uppercase tracking-wider transition-colors">
                    Explore Kits
                  </span>
                  <span className="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-indigo-600 text-slate-600 group-hover:text-white flex items-center justify-center text-[9px] transition-all duration-300 shadow-2xs group-hover:translate-x-0.5">
                    <FaArrowRight />
                  </span>
                </div>
              </div>
            </MotionLink>
          ))
        )}
      </div>
    </section>
  );
};

export default FeaturedCategories;
