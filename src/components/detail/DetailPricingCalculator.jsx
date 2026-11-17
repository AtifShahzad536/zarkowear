import React, { useState, useMemo } from 'react';
import { FiDollarSign, FiClock, FiShield, FiTruck, FiArrowRight, FiCheck } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const SPORT_BASE_PRICES = {
  soccer: { jersey: 34.0, set: 58.0 },
  football: { jersey: 42.0, set: 72.0 },
  basketball: { jersey: 32.0, set: 54.0 },
  baseball: { jersey: 36.0, set: 62.0 },
  softball: { jersey: 35.0, set: 60.0 },
  volleyball: { jersey: 30.0, set: 52.0 },
  cricket: { jersey: 28.0, set: 48.0 },
  rugby: { jersey: 36.0, set: 58.0 },
  wrestling: { jersey: 34.0, set: 55.0 },
  'ice-hockey': { jersey: 48.0, set: 78.0 },
};

export default function DetailPricingCalculator({ productName = 'Custom Team Uniform', sportSlug = 'soccer', cleanSport = 'Soccer' }) {
  const [itemType, setItemType] = useState('set'); // 'jersey' | 'set'
  const [quantity, setQuantity] = useState(25);
  const [decoration, setDecoration] = useState('sublimation'); // 'sublimation' | 'tackle-twill'

  const basePrice = useMemo(() => {
    const prices = SPORT_BASE_PRICES[sportSlug] || { jersey: 34.0, set: 58.0 };
    return itemType === 'set' ? prices.set : prices.jersey;
  }, [sportSlug, itemType]);

  const discountMultiplier = useMemo(() => {
    if (quantity >= 250) return 0.70; // 30% off
    if (quantity >= 100) return 0.80; // 20% off
    if (quantity >= 50) return 0.88;  // 12% off
    return 1.0; // 15-49 sets
  }, [quantity]);

  const decoAddon = useMemo(() => {
    return decoration === 'tackle-twill' ? 6.5 : 0;
  }, [decoration]);

  const unitPrice = useMemo(() => {
    return Number(((basePrice * discountMultiplier) + decoAddon).toFixed(2));
  }, [basePrice, discountMultiplier, decoAddon]);

  const totalEstimate = useMemo(() => {
    return Number((unitPrice * quantity).toFixed(2));
  }, [unitPrice, quantity]);

  // Production turnaround logic
  const turnaroundDays = useMemo(() => {
    if (quantity >= 250) return '14–18 Business Days';
    if (quantity >= 100) return '10–14 Business Days';
    return '8–12 Business Days';
  }, [quantity]);

  const arrivalDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + (quantity >= 100 ? 19 : 14));
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }, [quantity]);

  return (
    <section className="bg-white rounded-xl border border-slate-200/90 p-5 sm:p-7 shadow-2xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600 block mb-1">
            ✦ Factory-Direct Pricing System
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Instant Wholesale Price &amp; Delivery Calculator
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            100% transparent Sialkot manufacturing cost with pre-paid DDP air shipping to USA.
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-800 text-xs font-semibold shrink-0">
          <FiTruck className="text-emerald-600 text-sm" />
          <span>DDP USA (Duties Pre-Paid)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-4">
          {/* Item Type Selector */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
              1. Uniform Configuration
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setItemType('set')}
                className={`py-2 px-3 rounded-[6px] text-xs font-semibold uppercase tracking-wider border transition cursor-pointer flex items-center justify-center gap-1.5 ${
                  itemType === 'set'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>Full Match Kit (Jersey + Shorts)</span>
              </button>
              <button
                type="button"
                onClick={() => setItemType('jersey')}
                className={`py-2 px-3 rounded-[6px] text-xs font-semibold uppercase tracking-wider border transition cursor-pointer flex items-center justify-center gap-1.5 ${
                  itemType === 'jersey'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>Jersey / Top Only</span>
              </button>
            </div>
          </div>

          {/* Quantity Slider */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                2. Order Quantity (MOQ 15 sets)
              </label>
              <span className="text-xs font-black text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-[4px]">
                {quantity} Sets / Units
              </span>
            </div>
            <input
              type="range"
              min="15"
              max="350"
              step="5"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-semibold text-slate-400 mt-1">
              <span>15 (Low MOQ)</span>
              <span>50 (12% off)</span>
              <span>100 (20% off)</span>
              <span>250+ (30% off)</span>
            </div>
          </div>

          {/* Decoration Method */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
              3. Customization &amp; Decoration
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setDecoration('sublimation')}
                className={`py-2 px-3 rounded-[6px] text-xs font-semibold border transition cursor-pointer text-left ${
                  decoration === 'sublimation'
                    ? 'bg-indigo-50/80 border-indigo-300 text-indigo-950 ring-1 ring-indigo-400'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold uppercase text-[11px]">4K Dye-Sublimation</div>
                <div className="text-[10px] text-slate-500 font-normal">All logos, names &amp; numbers included</div>
              </button>
              <button
                type="button"
                onClick={() => setDecoration('tackle-twill')}
                className={`py-2 px-3 rounded-[6px] text-xs font-semibold border transition cursor-pointer text-left ${
                  decoration === 'tackle-twill'
                    ? 'bg-indigo-50/80 border-indigo-300 text-indigo-950 ring-1 ring-indigo-400'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold uppercase text-[11px]">Stitched Tackle Twill</div>
                <div className="text-[10px] text-slate-500 font-normal">+ $6.50 / set pro embroidery</div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Live Estimate Output */}
        <div className="lg:col-span-5 bg-slate-900 text-white rounded-lg p-5 space-y-4 shadow-md">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest block">
              Estimated Landed Cost
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                ${unitPrice.toFixed(2)}
              </span>
              <span className="text-xs text-slate-400">/ per set</span>
            </div>
            <div className="text-xs text-slate-300 pt-1">
              Estimated Total: <span className="font-bold text-amber-300">${totalEstimate.toLocaleString()}</span> for {quantity} units
            </div>
          </div>

          <div className="space-y-2 pt-3 border-t border-slate-800 text-xs text-slate-300">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Production Time:</span>
              <span className="font-semibold text-white">{turnaroundDays}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Estimated Delivery USA:</span>
              <span className="font-semibold text-emerald-400">{arrivalDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">US Import Duties:</span>
              <span className="font-semibold text-emerald-400">100% Pre-Paid (DDP)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Digital 3D Mockup:</span>
              <span className="font-semibold text-white">Free in 12 Hours</span>
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <a
              href={`https://wa.me/923039200750?text=${encodeURIComponent(`Hi Zarko Sportswear, I'm reviewing ${productName} and need a quote for ${quantity} sets with ${decoration} decoration.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-[5px] bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-xs"
            >
              <FaWhatsapp className="text-base" />
              <span>Lock This Price on WhatsApp</span>
            </a>
            <p className="text-[10px] text-center text-slate-400 font-normal">
              Official PDF invoice with final freight sent within 2 hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
