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
    <div
      onClick={handleCardClick}
      className="group relative bg-white rounded-2xl border border-slate-200/80 hover:border-indigo-500/30 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between max-w-[290px] w-full mx-auto"
    >
      {/* Top Accent Line on Hover */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

      {/* Compact Image Area - Pure White Background */}
      <div className="relative h-52 w-full bg-white p-4 flex items-center justify-center overflow-hidden border-b border-slate-100">
        <img
          loading="lazy"
          src={displayImage}
          alt={name} title={name}
          className="h-full w-full object-contain transform group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = imageUrl('/images/placeholder.jpg');
          }}
        />

        {/* Top Selling Badge */}
        {isTopSelling && (
          <div className="absolute left-2.5 top-2.5 z-10">
            <span className="inline-flex items-center rounded-lg bg-amber-500/90 backdrop-blur-md px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white shadow-sm">
              ★ Top Seller
            </span>
          </div>
        )}

        {/* Discount Badge */}
        {discount && (
          <div className="absolute right-2.5 top-2.5 z-10">
            <span className="inline-flex items-center rounded-lg bg-rose-500/90 backdrop-blur-md px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white shadow-sm">
              -{discount}%
            </span>
          </div>
        )}
      </div>

      {/* Info Area - Compact Spacing */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-indigo-600 transition-colors line-clamp-1">
              {name}
            </h3>
            <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full shrink-0">
              Pro
            </span>
          </div>
          <p className="text-slate-500 text-xs font-normal line-clamp-1 leading-relaxed">
            {description || `Export quality custom uniform kit.`}
          </p>
        </div>

        {/* Rating and Price */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1">
            <span className="text-xs text-amber-400">★</span>
            <span className="text-xs font-semibold text-slate-700">{rating}</span>
            <span className="text-[10px] text-slate-400">({reviewCount})</span>
          </div>
          <div>
            <span className="text-xs font-semibold text-indigo-900 uppercase tracking-wider">
              {price ? `$${price.toFixed(2)}` : 'Custom Quote'}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center pt-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/custom?product=${encodeURIComponent(name)}`);
            }}
            className="px-6 py-2 bg-indigo-50 group-hover:bg-indigo-600 text-indigo-700 group-hover:text-white text-xs font-semibold rounded-xl border border-indigo-100 group-hover:border-transparent transition-all duration-200 text-center shadow-sm"
          >
            Customize Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
