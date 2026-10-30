import React from 'react';
import { Link } from 'react-router-dom';
import { imageUrl } from '../services/api';
import { FaArrowRight, FaEye } from 'react-icons/fa';
import { FiCheckCircle } from 'react-icons/fi';

const ProductCard = ({
  id,
  image,
  name,
  description,
  price,
  isTopSelling = false,
  discount,
  categorySlug = '',
  sportName = 'Sportswear',
  onQuickView,
  viewMode = 'grid',
}) => {
  const displayImage = imageUrl(image || '/images/placeholder.jpg', { width: 800, quality: 'auto:best' });
  const productSlug = id || (name ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : 'sportswear-item');

  const productData = { id, name, image, description, price, discount, categorySlug, sportName };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(productData);
    }
  };

  // ── LIST VIEW MODE ──
  if (viewMode === 'list') {
    return (
      <div className="group relative bg-white rounded-[5px] border border-slate-200/90 hover:border-slate-900/40 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row items-center justify-between p-4 gap-4">
        <div className="relative h-40 sm:h-32 w-full sm:w-40 shrink-0 bg-white rounded-[5px] border border-slate-100 p-2 flex items-center justify-center overflow-hidden">
          <img
            alt={name || 'Custom Team Uniform'}
            src={displayImage}
            className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/images/placeholder.jpg';
            }}
          />
          <button
            onClick={handleQuickViewClick}
            className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1.5 backdrop-blur-2xs cursor-pointer rounded-[5px]"
          >
            <FaEye className="text-xs" />
            <span>Quick View</span>
          </button>
        </div>

        <div className="flex-1 space-y-1.5 text-left w-full">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-100/60 px-2 py-0.5 rounded-[4px]">
              {sportName.toUpperCase()} • OEM ATELIER
            </span>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-[4px]">
              15-Set MOQ
            </span>
          </div>

          <h3
            className="font-black text-slate-900 text-sm sm:text-base uppercase tracking-tight group-hover:text-indigo-600 transition"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {name}
          </h3>

          <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
            {description || 'Export-grade moisture-wicking team kit engineered with reinforced bar-tack stitching and 4K Italian dye-sublimation.'}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-0.5 text-[10px] font-semibold text-slate-600">
            <span className="bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-[4px]">Heavy Interlock 240 GSM</span>
            <span className="bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-[4px]">4K Sublimation</span>
            <span className="bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-[4px]">NFHS & NCAA Ready</span>
          </div>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2.5 shrink-0 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          <div className="text-left sm:text-right">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Order MOQ</span>
            <span className="text-xs font-black text-slate-900 uppercase">
              15 Sets / Design
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleQuickViewClick}
              className="px-3 py-1.5 rounded-[5px] bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider transition cursor-pointer"
            >
              Quick View
            </button>
            <Link
              to={`/detail?product=${encodeURIComponent(productSlug)}`}
              state={{ product: productData }}
              className="px-3.5 py-1.5 rounded-[5px] bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 shadow-2xs"
            >
              <span>Specs</span>
              <FaArrowRight className="text-[9px]" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── GRID VIEW MODE (Clean, Modern, Rounded 5px) ──
  return (
    <div className="group relative bg-white rounded-[5px] border border-slate-200/90 hover:border-slate-900/40 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between w-full h-full">
      {/* Top Image Container - Pure White (#ffffff) without cluttering badges */}
      <div 
        className="relative aspect-[4/5] sm:aspect-[1/1] w-full p-3.5 sm:p-4 flex items-center justify-center overflow-hidden border-b border-slate-100 select-none"
        style={{ backgroundColor: '#ffffff' }}
      >
        {/* Product Image with smooth hover zoom */}
        <Link
          to={`/detail?product=${encodeURIComponent(productSlug)}`}
          state={{ product: productData }}
          className="h-full w-full flex items-center justify-center"
          style={{ backgroundColor: '#ffffff' }}
        >
          <img
            alt={`${name || 'Custom Sportswear'} - Custom Uniform | Zarko`}
            src={displayImage}
            title={`${name || 'Custom Sportswear'} - Custom Uniform | Zarko`}
            loading="lazy"
            className="h-full w-full object-contain transform group-hover:scale-106 transition-transform duration-300 ease-out filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.06)]"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/images/placeholder.jpg';
            }}
          />
        </Link>

        {/* Quick View Button Hover Action (Rounded 5px) */}
        <div className="absolute bottom-2.5 inset-x-0 flex justify-center z-10">
          <button
            onClick={handleQuickViewClick}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[5px] bg-white/95 hover:bg-slate-900 text-slate-900 hover:text-white text-[11px] font-bold uppercase tracking-wider shadow-sm border border-slate-200/60 backdrop-blur-xs transition-all duration-150 cursor-pointer"
          >
            <FaEye className="text-[10px]" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Details Body */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5">
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-1.5">
            <span className="text-[9.5px] font-black uppercase tracking-wider text-slate-400">
              {sportName.toUpperCase()} • OEM BESPOKE
            </span>
            <span className="text-[9.5px] font-bold text-indigo-600 flex items-center gap-1">
              <FiCheckCircle className="text-[10px]" />
              <span>Direct Factory</span>
            </span>
          </div>

          <Link
            to={`/detail?product=${encodeURIComponent(productSlug)}`}
            state={{ product: productData }}
          >
            <h3
              className="font-black text-slate-900 text-xs sm:text-sm leading-snug group-hover:text-indigo-600 transition-colors line-clamp-1 uppercase tracking-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {name}
            </h3>
          </Link>

          <p className="text-slate-500 text-[11px] font-normal line-clamp-2 leading-relaxed">
            {description || 'Export-grade moisture-wicking team jersey engineered with reinforced stitching and vibrant Italian 4K dye-sublimation.'}
          </p>
        </div>

        {/* Specs Chips */}
        <div className="flex flex-wrap gap-1 pt-0.5">
          <span className="text-[8.5px] font-bold text-slate-600 bg-slate-50 border border-slate-200/80 px-1.5 py-0.5 rounded-[4px]">
            Dri-FIT
          </span>
          <span className="text-[8.5px] font-bold text-slate-600 bg-slate-50 border border-slate-200/80 px-1.5 py-0.5 rounded-[4px]">
            4K Sublimation
          </span>
          <span className="text-[8.5px] font-bold text-slate-600 bg-slate-50 border border-slate-200/80 px-1.5 py-0.5 rounded-[4px]">
            NFHS Ready
          </span>
        </div>

        {/* Card Footer: Wholesale indicator & View Button */}
        <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <span className="block text-[8.5px] font-bold uppercase tracking-wider text-slate-400">Order MOQ</span>
            <span className="text-[10.5px] font-black text-slate-900 uppercase">
              15 Sets / Design
            </span>
          </div>

          <Link
            to={`/detail?product=${encodeURIComponent(productSlug)}`}
            state={{ product: productData }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] bg-slate-900 group-hover:bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider transition-colors shadow-2xs"
          >
            <span>View</span>
            <FaArrowRight className="text-[7px] group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
