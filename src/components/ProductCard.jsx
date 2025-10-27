import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { imageUrl } from '../services/api';

const ProductCard = ({ 
  image, 
  name, 
  description, 
  price, 
  isTopSelling = false,
  discount,
  rating = 4.5,
  reviewCount = 24
}) => {
  const displayImage = imageUrl(image || '/images/placeholder.jpg');
  
  return (
    <motion.div
      className="group relative overflow-hidden rounded-3xl shadow-md hover:shadow-2xl transition cursor-pointer ring-1 ring-gray-200 hover:-translate-y-1"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      onClick={() => {/* handle click if needed */}}
    >
      <motion.img
        loading="lazy"
        src={displayImage}
        alt={name}
        className="w-full h-72 object-contain bg-white transform group-hover:scale-105 transition duration-500"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = imageUrl('/images/placeholder.jpg');
        }}
      />

      {/* Top Badge */}
      {isTopSelling && (
        <div className="absolute left-4 top-4 z-30">
          <span className="inline-flex items-center rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
            🔥 Top Selling
          </span>
        </div>
      )}

      {/* Discount Badge */}
      {discount && (
        <div className="absolute right-3 top-3 z-30">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 text-xs font-bold text-white shadow-lg">
            -{discount}%
          </span>
        </div>
      )}

      {/* Overlay Gradient */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/75 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition duration-300" />

      {/* Content Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-4">
        {/* Title Badge */}
        <div className="bg-white/90 backdrop-blur px-4 py-2 text-base font-semibold tracking-wide rounded-lg shadow-md text-indigo-700 w-fit">
          {name}
        </div>

        {/* Bottom Content */}
        <div className="space-y-3 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold">
                {price ? `$${price.toFixed(2)}` : 'Get Quote'}
              </p>
              <div className="flex items-center">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-3 w-3 ${i < Math.floor(rating) ? 'text-amber-400' : 'text-gray-400'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-1 text-xs text-gray-300">({reviewCount})</span>
              </div>
            </div>
          </div>

          <div className="text-sm md:text-base leading-relaxed opacity-0 group-hover:opacity-100 transition duration-300 line-clamp-3">
            {description || `Premium ${name} with export-grade fabrics and customizable options.`}
          </div>

          <Link
            to={`/custom?product=${encodeURIComponent(name)}`}
            className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-white/20 border border-white/40 py-3 text-sm md:text-base font-semibold tracking-wide backdrop-blur hover:bg-white/30 transition"
            onClick={(e) => e.stopPropagation()}
          >
            Customize Now
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;