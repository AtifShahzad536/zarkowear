import React, { useState } from 'react';
import { FiCheck, FiInfo } from 'react-icons/fi';

const ADULT_SIZES = [
  { size: 'XS', chest: '34 – 36 in (86–91 cm)', waist: '28 – 30 in (71–76 cm)', length: '27 in (68 cm)', height: "5'4\" – 5'6\"" },
  { size: 'S', chest: '36 – 38 in (91–96 cm)', waist: '30 – 32 in (76–81 cm)', length: '28 in (71 cm)', height: "5'6\" – 5'8\"" },
  { size: 'M', chest: '38 – 40 in (96–101 cm)', waist: '32 – 34 in (81–86 cm)', length: '29 in (74 cm)', height: "5'8\" – 5'10\"" },
  { size: 'L', chest: '40 – 42 in (101–107 cm)', waist: '34 – 36 in (86–91 cm)', length: '30 in (76 cm)', height: "5'10\" – 6'0\"" },
  { size: 'XL', chest: '42 – 44 in (107–112 cm)', waist: '36 – 38 in (91–96 cm)', length: '31 in (79 cm)', height: "6'0\" – 6'2\"" },
  { size: '2XL', chest: '44 – 46 in (112–117 cm)', waist: '38 – 40 in (96–101 cm)', length: '32 in (81 cm)', height: "6'2\" – 6'4\"" },
  { size: '3XL', chest: '46 – 48 in (117–122 cm)', waist: '40 – 42 in (101–107 cm)', length: '33 in (84 cm)', height: "6'3\"+" },
  { size: '4XL', chest: '48 – 50 in (122–127 cm)', waist: '42 – 44 in (107–112 cm)', length: '34 in (86 cm)', height: "6'4\"+" },
];

const YOUTH_SIZES = [
  { size: 'YXS (4–5)', chest: '24 – 26 in (61–66 cm)', waist: '20 – 22 in (51–56 cm)', length: '19 in (48 cm)', approxAge: '4–6 yrs' },
  { size: 'YS (6–8)', chest: '26 – 28 in (66–71 cm)', waist: '22 – 24 in (56–61 cm)', length: '21 in (53 cm)', approxAge: '6–8 yrs' },
  { size: 'YM (10–12)', chest: '28 – 30 in (71–76 cm)', waist: '24 – 26 in (61–66 cm)', length: '23 in (58 cm)', approxAge: '9–11 yrs' },
  { size: 'YL (14–16)', chest: '30 – 32 in (76–81 cm)', waist: '26 – 28 in (66–71 cm)', length: '25 in (63 cm)', approxAge: '12–14 yrs' },
  { size: 'YXL (18–20)', chest: '32 – 34 in (81–86 cm)', waist: '28 – 30 in (71–76 cm)', length: '27 in (68 cm)', approxAge: '14–16 yrs' },
];

export default function CategorySizeChart({ cleanSport = 'Sportswear' }) {
  const [activeTab, setActiveTab] = useState('adult');

  return (
    <section className="w-full my-12 pt-8 pb-10 bg-white rounded-xl border border-slate-200/90 shadow-xs">
      <div className="max-w-[96%] xl:max-w-[98%] 2xl:max-w-[1560px] mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-slate-100 pb-5">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-600 block mb-1">
              Accurate Fit Guarantee
            </span>
            <h2
              className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Custom {cleanSport} Size Guide &amp; Measurement Table
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 font-normal">
              Official athletic dimensions in inches and centimeters for US schools, club rosters, and travel leagues.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="inline-flex rounded-lg bg-slate-100 p-1 border border-slate-200">
            <button
              onClick={() => setActiveTab('adult')}
              className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'adult' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Adult Men &amp; Women (XS–4XL)
            </button>
            <button
              onClick={() => setActiveTab('youth')}
              className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'youth' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Youth &amp; Rec League (YXS–YXL)
            </button>
          </div>
        </div>

        {/* Size Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-2xs mb-8">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white font-bold text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4 sm:px-6">Tag Size</th>
                <th className="py-3 px-4">Chest Circumference</th>
                <th className="py-3 px-4">Waist Circumference</th>
                <th className="py-3 px-4">Jersey Back Length</th>
                <th className="py-3 px-4">
                  {activeTab === 'adult' ? 'Recommended Player Height' : 'Approximate Age Range'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {(activeTab === 'adult' ? ADULT_SIZES : YOUTH_SIZES).map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 sm:px-6 font-extrabold text-indigo-700 bg-indigo-50/40">
                    {row.size}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900">{row.chest}</td>
                  <td className="py-3 px-4">{row.waist}</td>
                  <td className="py-3 px-4">{row.length}</td>
                  <td className="py-3 px-4 text-slate-600 font-normal">
                    {activeTab === 'adult' ? row.height : row.approxAge}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* How to Measure Instructions Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-7">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-3">
            <FiInfo className="text-indigo-600" />
            <span>How to Measure Players for Custom Teamwear</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-slate-600 leading-relaxed">
            <div className="p-3.5 bg-white rounded-lg border border-slate-200/80 space-y-1">
              <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider">1. Chest Measurement</span>
              <p>Place a flexible tape measure under the armpits and measure around the fullest part of the chest, keeping the tape level across the shoulder blades.</p>
            </div>

            <div className="p-3.5 bg-white rounded-lg border border-slate-200/80 space-y-1">
              <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider">2. Waist Measurement</span>
              <p>Measure around the natural waistline where athletic shorts are normally worn, keeping one finger between the tape and player's body for athletic slack.</p>
            </div>

            <div className="p-3.5 bg-white rounded-lg border border-slate-200/80 space-y-1">
              <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider">3. Jersey Length</span>
              <p>Measure from the highest point of the shoulder seam straight down to the hip line to confirm adequate jersey tuck-in length.</p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
            <span className="flex items-center gap-1.5 font-medium">
              <FiCheck className="text-emerald-500" />
              <span>Free sample sizing kit available for verified high schools and club programs upon quote submission.</span>
            </span>
            <span className="text-indigo-600 font-bold">100% Fit &amp; Tailoring Guarantee</span>
          </div>
        </div>

      </div>
    </section>
  );
}
