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
      className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {/* Top Badge */}
      {isTopSelling && (
        <div className="absolute left-4 top-4 z-10">
          <span className="inline-flex items-center rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
            🔥 Top Selling
          </span>
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-72 bg-white p-6">
        <motion.div 
          className="h-full w-full flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.img
            loading="lazy"
            src={displayImage}
            alt={name}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
            onError={(e) => { 
              e.currentTarget.onerror = null; 
              e.currentTarget.src = imageUrl('/images/placeholder.jpg'); 
            }}
          />
        </motion.div>
        {discount && (
          <div className="absolute right-3 top-3 z-10">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 text-xs font-bold text-white shadow-lg">
              -{discount}%
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6 pt-4 bg-white">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900">{name}</h3>
          {description && (
            <p className="mt-2 text-sm text-gray-700 line-clamp-2">
              {description}
            </p>
          )}
        </div>

        {/* Price & Rating */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xl font-bold text-indigo-700">
              {price ? `$${price.toFixed(2)}` : 'Get Quote'}
            </p>
          </div>
          <div className="flex items-center">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-amber-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-1 text-xs text-gray-500">({reviewCount})</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-4">
          <Link
            to={`/custom?product=${encodeURIComponent(name)}`}
            className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-700 px-4 py-3 text-sm font-medium text-white shadow-md transition-all hover:shadow-lg hover:shadow-indigo-200"
          >
            Customize Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;