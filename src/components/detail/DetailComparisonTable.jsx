import React from 'react';
import { FiCheck, FiX, FiAward } from 'react-icons/fi';

export default function DetailComparisonTable({ cleanSport = 'Soccer' }) {
  const comparisons = [
    {
      feature: 'Fabric Weight & Tech',
      standard: '160–180 GSM Micro-Mesh (Lightweight)',
      vNeck: '200–220 GSM Interlock (Balanced)',
      reversible: 'Dual-ply 160 GSM Mesh (Double Layer)',
      tackleTwill: '240–260 GSM Pro-Interlock (Heavyweight)'
    },
    {
      feature: 'Best Competitive Level',
      standard: 'Youth Rec & Summer Leagues',
      vNeck: 'Club Academies & Travel Teams',
      reversible: 'AAU Tournaments & Scrimmages',
      tackleTwill: 'High School Varsity & College NFHS'
    },
    {
      feature: 'Decoration Method',
      standard: 'Full Dye-Sublimation (Included)',
      vNeck: 'Full Dye-Sublimation (Included)',
      reversible: '2-Color Sublimation on both sides',
      tackleTwill: 'Heavy Computerized Stitched Twill'
    },
    {
      feature: 'Tear & Friction Resistance',
      standard: 'Good (Standard turf use)',
      vNeck: 'High (Bar-tacked stress points)',
      reversible: 'Moderate (Reversible seam play)',
      tackleTwill: 'Maximum (Multi-season high impact)'
    },
    {
      feature: 'Artwork & Vector Cost',
      standard: '$0.00 (Zero Artwork Fee)',
      vNeck: '$0.00 (Zero Artwork Fee)',
      reversible: '$0.00 (Zero Artwork Fee)',
      tackleTwill: '$0.00 (Digitization included)'
    },
    {
      feature: 'Factory MOQ',
      standard: '15 Sets per design',
      vNeck: '15 Sets per design',
      reversible: '15 Sets per design',
      tackleTwill: '15 Sets per design'
    }
  ];

  return (
    <section className="bg-white rounded-xl border border-slate-200/90 p-5 sm:p-7 shadow-2xs space-y-5">
      <div className="text-center max-w-2xl mx-auto space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600 block">
          ✦ Cut &amp; Construction Guide
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
          Standard vs. V-Neck vs. Reversible vs. Tackle Twill
        </h2>
        <p className="text-xs text-slate-500 font-normal">
          Compare specifications to choose the exact jersey style engineered for your squad's season.
        </p>
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-700">
              <th className="py-3 px-3.5">Specification</th>
              <th className="py-3 px-3.5 text-indigo-950 font-extrabold bg-indigo-50/60">Standard Match Kit</th>
              <th className="py-3 px-3.5">V-Neck Club Cut</th>
              <th className="py-3 px-3.5">Reversible AAU</th>
              <th className="py-3 px-3.5">Varsity Tackle Twill</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {comparisons.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/70 transition">
                <td className="py-3 px-3.5 font-semibold text-slate-900 whitespace-nowrap bg-slate-50/40">
                  {row.feature}
                </td>
                <td className="py-3 px-3.5 font-medium text-slate-800 bg-indigo-50/20">
                  {row.standard}
                </td>
                <td className="py-3 px-3.5">
                  {row.vNeck}
                </td>
                <td className="py-3 px-3.5">
                  {row.reversible}
                </td>
                <td className="py-3 px-3.5 font-semibold text-slate-900">
                  {row.tackleTwill}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 border-t border-slate-100">
        <span>Need a custom hybrid cut (e.g. V-neck with heavy interlock)? We custom pattern any cut in Sialkot.</span>
        <span className="font-semibold text-indigo-600">Free 12h digital mockup for all 4 cut styles</span>
      </div>
    </section>
  );
}

