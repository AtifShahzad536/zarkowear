import React from 'react';
import { FiCalendar, FiClock, FiCheckCircle } from 'react-icons/fi';

const SEASON_SCHEDULE = [
  {
    season: 'Fall Season',
    sports: 'Soccer, Football, Cross Country, Volleyball',
    firstGame: 'Late August / Early September',
    orderDeadline: 'June 25 – July 10',
    productionWindow: '10–12 Business Days',
    deliveryDate: 'By August 10–15',
    status: 'Standard Production Ready'
  },
  {
    season: 'Winter Season',
    sports: 'Basketball, Wrestling, Ice Hockey',
    firstGame: 'Late November / Early December',
    orderDeadline: 'October 1 – October 15',
    productionWindow: '10–12 Business Days',
    deliveryDate: 'By November 10–15',
    status: 'Standard Production Ready'
  },
  {
    season: 'Spring Season',
    sports: 'Baseball, Softball, Track & Field, Lacrosse',
    firstGame: 'March / Early April',
    orderDeadline: 'January 15 – February 5',
    productionWindow: '10–12 Business Days',
    deliveryDate: 'By March 1–10',
    status: 'Standard Production Ready'
  },
  {
    season: 'Club Volleyball Circuit',
    sports: 'March National Qualifiers & Showcase Tournaments',
    firstGame: 'First Week of March',
    orderDeadline: 'January 20 – February 5',
    productionWindow: '10–12 Business Days',
    deliveryDate: 'By February 20–25',
    status: 'Standard Production Ready'
  }
];

export default function CategorySeasonDeadlines({ cleanSport = 'Soccer' }) {
  return (
    <section className="w-full my-12 pt-8 pb-10 bg-slate-900 text-white rounded-xl border border-slate-800 shadow-sm overflow-hidden relative">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[96%] xl:max-w-[98%] 2xl:max-w-[1560px] mx-auto px-4 sm:px-6 relative z-10">

        {/* Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
            <FiCalendar />
            <span>US Interscholastic &amp; Club Season Deadlines</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl font-black text-white tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            When to Order Custom {cleanSport} Uniforms (Approve-By Calendar)
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            To guarantee your team uniforms arrive ahead of official media days, scrimmages, and opening whistle matches, follow our standard factory order-by calendar below.
          </p>
        </div>

        {/* Schedule Table */}
        <div className="overflow-x-auto border border-slate-800 rounded-lg shadow-2xs mb-6">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-950 text-slate-300 font-bold text-[11px] uppercase tracking-wider border-b border-slate-800">
                <th className="py-3 px-4 sm:px-6">Sports Season</th>
                <th className="py-3 px-4">Primary Sports</th>
                <th className="py-3 px-4">First Match / Tip-Off</th>
                <th className="py-3 px-4 text-indigo-400">Order &amp; Proof Approval By</th>
                <th className="py-3 px-4 text-emerald-400 font-extrabold">Guaranteed USA Delivery</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-medium text-slate-300">
              {SEASON_SCHEDULE.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-white flex items-center gap-2">
                    <FiCheckCircle className="text-emerald-400 text-xs shrink-0" />
                    <span>{row.season}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 text-xs">{row.sports}</td>
                  <td className="py-3.5 px-4 text-slate-300">{row.firstGame}</td>
                  <td className="py-3.5 px-4 font-bold text-indigo-300 bg-indigo-950/30">
                    {row.orderDeadline}
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-emerald-400">
                    {row.deliveryDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Banner */}
        <div className="p-4 rounded-lg bg-slate-800/80 border border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2.5">
            <FiClock className="text-indigo-400 text-lg shrink-0" />
            <span>
              <strong>Emergency Tournament Rush Available:</strong> Need uniforms in under 14 days? We maintain dedicated rush lines for high school playoffs and sudden tournament qualifications.
            </span>
          </div>
          <a
            href="https://wa.me/923039200750?text=Hi%20Zarko%20Sportswear,%20we%20have%20an%20urgent%20rush%20team%20uniform%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-wider text-[11px] transition-colors"
          >
            Check Rush Availability
          </a>
        </div>

      </div>
    </section>
  );
}

