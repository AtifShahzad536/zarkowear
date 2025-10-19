import React from 'react';
import { Link } from 'react-router-dom';
import { imageUrl } from '../services/api';

const ProductCard = ({ image, name, description, onQuote }) => {
  return (
    <div className="group rounded-2xl p-[1px] bg-gradient-to-br from-indigo-200/70 via-white to-indigo-50 shadow-sm hover:shadow-xl transition-transform hover:-translate-y-1">
      <div className="rounded-2xl bg-white overflow-hidden ring-1 ring-gray-200/60">
        <div className="w-full h-80 flex items-center justify-center bg-white">
          <img
            src={imageUrl(image)}
            alt={name}
            className="max-h-full max-w-full object-contain"
            onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src = imageUrl('/images/placeholder.jpg'); }}
          />
        </div>
        <div className="p-5">
          <h4 className="font-semibold text-gray-800 text-lg tracking-tight">{name}</h4>
          {description && <p className="text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>}
          <Link
            to={`/custom?product=${encodeURIComponent(name)}&image=${encodeURIComponent(image)}`}
            className="inline-block mt-4 px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700"
          >
            Request Quote
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
