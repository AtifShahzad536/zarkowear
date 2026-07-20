import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { imageUrl } from '../services/api';

const ProductCard = ({ 
  image, 
  name, 
  description, 
  price, 
  isTopSelling = false,
  discount,
  rating = 4.8,
  reviewCount = 18
}) => {
  const navigate = useNavigate();
  const displayImage = imageUrl(image || '/images/placeholder.jpg');

  const handleCardClick = () => {
    navigate('/detail', { 
      state: { 
        product: { name, image, description, price, discount } 
      } 
    });
  };
  
  return (
    <motion.div
      onClick={handleCardClick}
      className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4 }}
    >
      {/* Image Area */}
      <div className="relative aspect-square w-full bg-slate-50/80 overflow-hidden flex items-center justify-center p-6 border-b border-slate-100/50">
        <img
          loading="lazy"
          src={displayImage}
          alt={name}
          className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = imageUrl('/images/placeholder.jpg');
          }}
        />

        {/* Top Selling Badge */}
        {isTopSelling && (
          <div className="absolute left-3 top-3 z-10">
            <span className="inline-flex items-center rounded-full bg-amber-400 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-white shadow-sm">
              Top Seller
            </span>
          </div>
        )}

        {/* Discount Badge */}
        {discount && (
          <div className="absolute right-3 top-3 z-10">
            <span className="inline-flex items-center rounded-full bg-rose-500 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-white shadow-sm">
              -{discount}%
            </span>
          </div>
        )}
      </div>

      {/* Info Area */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <h3 className="font-extrabold text-slate-800 text-base leading-tight group-hover:text-indigo-600 transition-colors">
            {name}
          </h3>
          <p className="text-slate-400 text-xs font-medium line-clamp-2 leading-relaxed">
            {description || `Premium custom ${name.toLowerCase()} crafted from elite materials for maximum breathability and stretch.`}
          </p>
        </div>

        {/* Rating and Price */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100/50">
          <div className="flex items-center gap-1">
            <span className="text-[11px] font-bold text-amber-500">★</span>
            <span className="text-[10px] font-bold text-slate-500">{rating}</span>
            <span className="text-[9px] text-slate-400 font-medium">({reviewCount})</span>
          </div>
          <div>
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
              {price ? `$${price.toFixed(2)}` : 'Get Quote'}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/custom?product=${encodeURIComponent(name)}`);
          }}
          className="w-full py-2.5 bg-slate-50 group-hover:bg-indigo-600 text-slate-700 group-hover:text-white text-xs font-bold rounded-xl border border-slate-150 group-hover:border-transparent transition-all duration-200 text-center block"
        >
          Customize Design
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;