import React from 'react';
import { Link } from 'react-router-dom';
import { imageUrl } from '../services/api';
import { FaArrowRight, FaEye } from 'react-icons/fa';
import { FiCheckCircle } from 'react-icons/fi';
import { getProductUrl } from '../utils/seoUrls';

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
  const targetUrl = getProductUrl({ id, name, categorySlug, sport: sportName }, categorySlug);

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
              to={targetUrl}
              state={{ product: productData }}
              aria-label={`View ${name} specs and custom uniform details`}
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

  // ── GRID VIEW MODE (Competitor Hamco Style: Crisp White, Clean Border, Centered) ──
  return (
    <div className="group relative bg-white rounded-[4px] border border-slate-200 hover:border-slate-300 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between w-full h-full">
      {/* Top Image Container - Pure White (#ffffff) without cluttering badges */}
      <div 
        className="relative aspect-square w-full p-4 flex items-center justify-center overflow-hidden border-b border-slate-100 select-none bg-white"
      >
        {/* Product Image with smooth hover zoom */}
        <Link
          to={targetUrl}
          state={{ product: productData }}
          aria-label={`View ${name} product details`}
          className="h-full w-full flex items-center justify-center"
        >
          <img
            alt={`${name || 'Custom Sportswear'} - Custom Uniform | Zarko`}
            src={displayImage}
            title={`${name || 'Custom Sportswear'} - Custom Uniform | Zarko`}
            loading="lazy"
            className="h-full w-full object-contain transform group-hover:scale-105 transition-transform duration-300 ease-out"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/images/placeholder.jpg';
            }}
          />
        </Link>
      </div>

        {/* Card Details Body (Clean Centered Title, Subtitle, and Zarko Theme Indigo/Navy Action Button) */}
        <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between items-center text-center space-y-2">
          <div className="space-y-1 w-full">
            <Link
              to={targetUrl}
              state={{ product: productData }}
              aria-label={`View ${name} uniform details`}
              className="block"
            >
              <h3
                className="font-bold text-slate-900 text-xs sm:text-sm hover:text-indigo-600 transition-colors line-clamp-2 uppercase tracking-tight"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {name}
              </h3>
            </Link>

            <p className="text-slate-400 text-[10px] sm:text-[11px] font-medium tracking-wide uppercase">
              Custom {sportName} Uniform
            </p>
          </div>

          {/* Zarko Brand Indigo-Navy Action Button (NO RED) */}
          <Link
            to={targetUrl}
            state={{ product: productData }}
            aria-label={`Get quote for ${name}`}
            className="w-full mt-2 py-2 px-3 rounded-[4px] bg-slate-900 hover:bg-indigo-600 text-white text-[11px] font-bold uppercase tracking-wider transition-all duration-150 flex items-center justify-center gap-1.5 shadow-xs"
          >
            <span>View Design</span>
            <FaArrowRight className="text-[9px]" />
          </Link>
        </div>
    </div>
  );
};

export default ProductCard;
