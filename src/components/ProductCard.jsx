import React from 'react';
import { Link } from 'react-router-dom';
import { imageUrl } from '../services/api';

const ProductCard = ({ image, name, description, onQuote }) => {
  return (
    <div className="group relative overflow-hidden rounded-[10px] border border-indigo-100/70 bg-white/90 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/8 via-transparent to-indigo-500/15 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative flex h-60 items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-white">
        <img
          src={imageUrl(image)}
          alt={name}
          className="max-h-[80%] max-w-[80%] object-contain transition-transform duration-500 group-hover:scale-105"
          onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src = imageUrl('/images/placeholder.jpg'); }}
        />
      </div>
      <div className="relative space-y-3 px-6 pb-6 pt-5">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-indigo-400">
          <span className="inline-flex items-center gap-1 rounded-full border border-indigo-100/80 bg-indigo-50/70 px-3 py-1 text-[10px] font-semibold text-indigo-500">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
            Premium
          </span>
          <span>Custom ready</span>
        </div>
        <h4 className="text-lg font-semibold tracking-tight text-indigo-900">{name}</h4>
        {description && <p className="text-sm text-gray-600 line-clamp-2">{description}</p>}
        <Link
          to={`/custom?product=${encodeURIComponent(name)}&image=${encodeURIComponent(image)}`}
          className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-indigo-500"
        >
          Request quote
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
