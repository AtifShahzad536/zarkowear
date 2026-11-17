import React, { useState, useMemo } from 'react';
import { FiCheckCircle, FiCalendar, FiClock, FiDollarSign, FiTruck, FiShield, FiArrowRight } from 'react-icons/fi';

const PRICING_DATA = {
  soccer: {
    sportName: 'Soccer',
    leadTitle: 'Soccer uniforms before your first whistle.',
    items: [
      { id: 'full-kit', name: 'Matchday Kit (Sublimated Jersey + Shorts)', t1: 34.99, t2: 29.99, t3: 26.99, t4: 23.99 },
      { id: 'jersey', name: 'Pro Game Jersey Only', t1: 22.99, t2: 19.99, t3: 17.99, t4: 15.99 },
      { id: 'gk-kit', name: 'Padded Goalkeeper Kit (Elbow/Hip Pads)', t1: 42.99, t2: 37.99, t3: 34.99, t4: 31.99 },
      { id: 'socks', name: 'Custom Sublimated Team Socks', t1: 9.99, t2: 8.49, t3: 7.49, t4: 6.49 },
    ]
  },
  basketball: {
    sportName: 'Basketball',
    leadTitle: 'Team jerseys before your next tip-off.',
    items: [
      { id: 'full-kit', name: 'Game Uniform (Pro-Mesh Top + Shorts)', t1: 36.99, t2: 31.99, t3: 27.99, t4: 24.99 },
      { id: 'reversible', name: 'Dual-Layer Reversible Set (Home & Away)', t1: 46.99, t2: 41.99, t3: 37.99, t4: 33.99 },
      { id: 'jersey', name: 'Wide-Armhole Game Jersey Only', t1: 23.99, t2: 20.99, t3: 18.49, t4: 16.49 },
      { id: 'warmup', name: 'Shooting Shirt / Warmup Top', t1: 27.99, t2: 24.99, t3: 21.99, t4: 18.99 },
    ]
  },
  football: {
    sportName: 'American Football',
    leadTitle: 'Gridiron battle-ready uniforms before opening kickoff.',
    items: [
      { id: 'full-kit', name: 'Full Uniform (Heavy Dazzle Jersey + 7-Pad Pants)', t1: 64.99, t2: 57.99, t3: 51.99, t4: 46.99 },
      { id: 'jersey', name: 'Championship Game Jersey (Double-Ply Yoke)', t1: 38.99, t2: 34.99, t3: 30.99, t4: 26.99 },
      { id: 'pants', name: 'Integrated 7-Pad Slotted Game Pants', t1: 34.99, t2: 30.99, t3: 27.49, t4: 24.49 },
      { id: 'practice', name: 'Porthole Mesh Practice / Fan Jersey', t1: 24.99, t2: 21.99, t3: 19.49, t4: 16.99 },
    ]
  },
  baseball: {
    sportName: 'Baseball',
    leadTitle: 'Bespoke jerseys before opening day.',
    items: [
      { id: 'full-kit', name: 'Full-Button Set (Piped Jersey + Knickers/Pants)', t1: 54.99, t2: 48.99, t3: 43.99, t4: 38.99 },
      { id: 'jersey', name: 'Full Button-Down Jersey (Tackle Twill/Sub)', t1: 32.99, t2: 28.99, t3: 25.49, t4: 22.49 },
      { id: 'twobutton', name: 'Two-Button Pullover Travel Jersey', t1: 24.99, t2: 21.99, t3: 19.49, t4: 16.99 },
      { id: 'pants', name: 'Heavy Double-Knit Piped Baseball Pants', t1: 28.99, t2: 25.49, t3: 22.99, t4: 19.99 },
    ]
  },
  volleyball: {
    sportName: 'Volleyball',
    leadTitle: 'Court uniforms before your first March tournament.',
    items: [
      { id: 'full-kit', name: 'Match Set (Racerback/Sleeveless Top + Spandex Shorts)', t1: 38.99, t2: 33.99, t3: 29.99, t4: 26.49 },
      { id: 'jersey', name: 'Sleeveless / Short Sleeve Game Jersey', t1: 24.99, t2: 21.99, t3: 19.49, t4: 16.99 },
      { id: 'longsleeve', name: 'Active Long-Sleeve Sublimated Jersey', t1: 28.99, t2: 25.49, t3: 22.99, t4: 19.99 },
      { id: 'libero', name: 'Contrasting Libero Regulation Jersey', t1: 24.99, t2: 21.99, t3: 19.49, t4: 16.99 },
    ]
  }
};

const DEFAULT_SPORT_DATA = {
  sportName: 'Sportswear',
  leadTitle: 'Custom team uniforms before your first match.',
  items: [
    { id: 'full-kit', name: 'Full Custom Team Uniform Set', t1: 39.99, t2: 34.99, t3: 29.99, t4: 26.99 },
    { id: 'jersey', name: 'Sublimated Game Jersey Only', t1: 24.99, t2: 21.99, t3: 18.99, t4: 16.99 },
    { id: 'shorts', name: 'Custom Team Shorts / Bottoms', t1: 18.99, t2: 16.49, t3: 14.49, t4: 12.99 },
    { id: 'warmup', name: 'Team Warmup / Tracksuit Top', t1: 32.99, t2: 28.99, t3: 25.49, t4: 22.99 },
  ]
};

export default function CategoryPricingCalculator({ slug = 'soccer', cleanSport = 'Soccer' }) {
  const sportData = PRICING_DATA[slug] || {
    ...DEFAULT_SPORT_DATA,
    sportName: cleanSport,
    leadTitle: `${cleanSport} uniforms before your first match.`
  };

  // State for live price calculator
  const [selectedItemId, setSelectedItemId] = useState(sportData.items[0]?.id || 'full-kit');
  const [quantity, setQuantity] = useState(20);

  // State for deadline calculator (default 35 days from today)
  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);
  const defaultEventDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 35);
    return d.toISOString().split('T')[0];
  }, []);
  const [firstMatchDate, setFirstMatchDate] = useState(defaultEventDate);

  // Selected item object
  const activeItem = useMemo(() => {
    return sportData.items.find(i => i.id === selectedItemId) || sportData.items[0];
  }, [selectedItemId, sportData.items]);

  // Pricing tier calculation
  const { unitPrice, tierLabel, savingsPercent } = useMemo(() => {
    const q = Math.max(15, Number(quantity) || 15);
    let price = activeItem.t1;
    let label = 'Tier 1 (15–24 Sets)';
    let savings = 0;

    if (q >= 101) {
      price = activeItem.t4;
      label = 'Tier 4 (101+ Sets - Mega Bulk)';
      savings = Math.round(((activeItem.t1 - activeItem.t4) / activeItem.t1) * 100);
    } else if (q >= 51) {
      price = activeItem.t3;
      label = 'Tier 3 (51–100 Sets)';
      savings = Math.round(((activeItem.t1 - activeItem.t3) / activeItem.t1) * 100);
    } else if (q >= 25) {
      price = activeItem.t2;
      label = 'Tier 2 (25–50 Sets)';
      savings = Math.round(((activeItem.t1 - activeItem.t2) / activeItem.t1) * 100);
    }

    return { unitPrice: price, tierLabel: label, savingsPercent: savings };
  }, [quantity, activeItem]);

  const totalEstimatedCost = useMemo(() => {
    const q = Math.max(15, Number(quantity) || 15);
    return (q * unitPrice).toFixed(2);
  }, [quantity, unitPrice]);

  // Deadline calculation
  const deadlineAnalysis = useMemo(() => {
    if (!firstMatchDate) return null;
    const matchDate = new Date(firstMatchDate);
    const now = new Date();
    const diffDays = Math.ceil((matchDate - now) / (1000 * 60 * 60 * 24));

    // Standard timeline: 12 days production + 4 days DHL = 16 calendar days minimum required
    const approveByDate = new Date(matchDate);
    approveByDate.setDate(approveByDate.getDate() - 16);

    const dispatchDate = new Date(approveByDate);
    dispatchDate.setDate(dispatchDate.getDate() + 11);

    const format = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    let status = 'safe'; // safe, tight, urgent
    let statusText = 'Optimal Timing — Standard Production';
    let statusColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';

    if (diffDays < 16) {
      status = 'urgent';
      statusText = 'Rush Order Required (< 16 Days)';
      statusColor = 'text-rose-700 bg-rose-50 border-rose-200';
    } else if (diffDays <= 22) {
      status = 'tight';
      statusText = 'Tight Timeline — Order Approval Needed This Week';
      statusColor = 'text-amber-800 bg-amber-50 border-amber-200';
    }

    return {
      daysRemaining: diffDays,
      approveBy: format(approveByDate),
      dispatchBy: format(dispatchDate),
      status,
      statusText,
      statusColor
    };
  }, [firstMatchDate]);

  return (
    <section className="w-full my-12 pt-8 pb-12 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="max-w-[96%] xl:max-w-[98%] 2xl:max-w-[1560px] mx-auto px-4 sm:px-6">

        {/* ── 1. LEAD HEADER (HAMCO MODEL) ── */}
        <div className="mb-8 border-b border-slate-100 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
            <FiDollarSign className="text-sm" />
            <span>Factory-Direct Wholesale Pricing (No Middleman Markups)</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {cleanSport} Team Uniform Pricing &amp; Estimated Timeline
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            <strong className="text-slate-900 font-bold">{sportData.leadTitle}</strong> Sourced factory-direct from Sialkot with low 15-set minimums, free 12-hour digital mockups, and transparent tiered wholesale rates for US schools and athletic leagues.
          </p>
        </div>

        {/* ── 2. FOUR-TIER PUBLISHED PRICING TABLE ── */}
        <div className="mb-10 overflow-hidden border border-slate-200 rounded-lg shadow-2xs">
          <div className="bg-slate-900 text-white px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              <FiShield className="text-indigo-400" />
              <span>Official 2026 Wholesale Tier Matrix (Prices in USD per Player)</span>
            </div>
            <div className="text-[11px] text-slate-400 font-medium">
              All prices include full custom 4K sublimation, player names &amp; roster numbers
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200 text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4 sm:px-6">Uniform Component</th>
                  <th className="py-3 px-4 text-center bg-indigo-50/50 text-indigo-900">Tier 1 (15–24 Sets)</th>
                  <th className="py-3 px-4 text-center">Tier 2 (25–50 Sets)</th>
                  <th className="py-3 px-4 text-center">Tier 3 (51–100 Sets)</th>
                  <th className="py-3 px-4 text-center text-emerald-800 font-black">Tier 4 (101+ Mega)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {sportData.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-900 flex items-center gap-2">
                      <FiCheckCircle className="text-emerald-500 text-xs shrink-0" />
                      <span>{item.name}</span>
                    </td>
                    <td className="py-3.5 px-4 text-center bg-indigo-50/30 font-bold text-slate-900">
                      ${item.t1.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-slate-900">
                      ${item.t2.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-slate-900">
                      ${item.t3.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 text-center font-extrabold text-emerald-700">
                      ${item.t4.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-slate-50 p-4 border-t border-slate-200 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded">All-Inclusive:</span>
              <span>Sublimated crest, player names, 4K numbers, and unlimited Pantone colors included.</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-slate-700">
              <FiTruck className="text-indigo-600" />
              <span>Door-to-door USA air express (duties paid). Low 15-set minimum order.</span>
            </div>
          </div>
        </div>

        {/* ── 3. INTERACTIVE CALCULATORS ROW (PRICE + DEADLINE) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* ── LIVE PRICE ESTIMATOR ── */}
          <div className="bg-slate-50/70 border border-slate-200/90 rounded-xl p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 block">Instant Estimate</span>
                <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Team Uniform Price Calculator
                </h3>
              </div>
              {savingsPercent > 0 && (
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  Save {savingsPercent}%
                </span>
              )}
            </div>

            {/* Select Uniform Item */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Select Uniform Package
              </label>
              <select
                value={selectedItemId}
                onChange={(e) => setSelectedItemId(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-indigo-600 shadow-2xs"
              >
                {sportData.items.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} — from ${item.t4.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity Selector with slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Roster Quantity (MOQ: 15 Sets)
                </label>
                <span className="text-sm font-black text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">
                  {quantity} Units
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="200"
                step="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
                <span>15 (Min)</span>
                <span>50</span>
                <span>100</span>
                <span>200+</span>
              </div>
            </div>

            {/* Price Output Breakdown */}
            <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-2">
              <div className="flex justify-between items-center text-xs text-slate-600">
                <span>Active Wholesale Tier:</span>
                <span className="font-bold text-slate-900">{tierLabel}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-600">
                <span>Price Per Player / Unit:</span>
                <span className="text-sm font-extrabold text-slate-900">${unitPrice.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-slate-100 flex justify-between items-baseline">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Total Estimated Cost:</span>
                <div className="text-right">
                  <span className="text-2xl sm:text-3xl font-black text-indigo-600 leading-none">
                    ${totalEstimatedCost}
                  </span>
                  <span className="block text-[10px] text-slate-400 font-medium">USD (Exclusive of local sales tax)</span>
                </div>
              </div>
            </div>

            <a
              href="#quote-form-section"
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              <span>Lock In This Tier &amp; Get Free 3D Mockup</span>
              <FiArrowRight />
            </a>
          </div>

          {/* ── DEADLINE CALCULATOR ── */}
          <div className="bg-slate-50/70 border border-slate-200/90 rounded-xl p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 block">Season Planner</span>
                <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Uniform Delivery Deadline Calculator
                </h3>
              </div>
              <FiCalendar className="text-indigo-600 text-xl" />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                When is your First Match or Season Tip-Off?
              </label>
              <input
                type="date"
                min={todayStr}
                value={firstMatchDate}
                onChange={(e) => setFirstMatchDate(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-indigo-600 shadow-2xs"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Select your tournament or season opener date to calculate production and dispatch milestones.
              </p>
            </div>

            {deadlineAnalysis && (
              <div className="space-y-3">
                <div className={`p-3 rounded-lg border text-xs font-bold flex items-center gap-2 ${deadlineAnalysis.statusColor}`}>
                  <FiClock className="shrink-0 text-sm" />
                  <span>{deadlineAnalysis.statusText} ({deadlineAnalysis.daysRemaining} days to opening whistle)</span>
                </div>

                <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-2.5 text-xs">
                  <div className="flex justify-between items-center text-slate-700">
                    <span className="font-medium">1. Final Roster &amp; Mockup Approval By:</span>
                    <span className="font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                      {deadlineAnalysis.approveBy}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700">
                    <span className="font-medium">2. Factory Production Completed:</span>
                    <span className="font-bold text-slate-800">{deadlineAnalysis.dispatchBy}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700 border-t border-slate-100 pt-2">
                    <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                      <FiTruck />
                      <span>3. Guaranteed Doorstep Arrival in USA:</span>
                    </span>
                    <span className="font-extrabold text-emerald-700">
                      Before {new Date(firstMatchDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="p-3 bg-indigo-50/50 rounded-lg border border-indigo-100 text-[11px] text-indigo-900 leading-relaxed">
              <strong>Need it faster?</strong> We offer expedited rush slots for tournament emergencies (6–8 business days production + 3 days DHL Express). Contact our team via WhatsApp for same-day production scheduling.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
