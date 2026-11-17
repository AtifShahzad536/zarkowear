import React from 'react';
import { FiCheckCircle, FiShield, FiAlertCircle, FiDroplet, FiSun } from 'react-icons/fi';

export default function DetailCareGuide({ cleanSport = 'Sports' }) {
  const checks = [
    {
      num: '01',
      title: 'Determine Fit & Biomechanics',
      desc: 'Choose between athletic semi-fitted cuts for competitive mobility or loose traditional cuts for practice layering. Ensure shoulder seams accommodate pads if required for your sport.'
    },
    {
      num: '02',
      title: 'Verify Federation Regulation Compliance',
      desc: 'Check NFHS or NCAA number sizing rules (e.g., minimum 8-inch back numbers, 4-inch front numbers) and home/away color contrast before approving artwork.'
    },
    {
      num: '03',
      title: 'Select Appropriate GSM Fabric Weight',
      desc: 'High friction turf sports perform best with 220–260 GSM interlock, while indoor high-ventilation sports excel with 160–180 GSM open-cell air-mesh.'
    },
    {
      num: '04',
      title: 'Schedule Around Season Deadlines',
      desc: 'Order 3 to 4 weeks before your team’s media day or first scrimmage to allow standard 8–12 business day manufacturing and 3–5 day DDP air express transit.'
    },
    {
      num: '05',
      title: 'Collect Exact Player Roster Sizes Early',
      desc: 'Use our printable measurement guide so parents and players test chest widths directly rather than guessing retail shirt sizes.'
    }
  ];

  const careTips = [
    { title: 'Cold Water Wash Only', desc: 'Wash inside-out in cold water (max 30°C / 85°F) to protect dye vibrancy.' },
    { title: 'No Fabric Softener', desc: 'Liquid softeners coat polyester wicking pores and reduce sweat breathability.' },
    { title: 'Air Hang Dry', desc: 'Hang dry in shade or tumble dry on ultra-low heat. High heat can damage spandex elastane.' },
    { title: 'Zero Ironing on Graphics', desc: 'Never iron directly over sublimation or tackle twill embroidery patches.' },
  ];

  return (
    <section className="space-y-6">
      {/* 5-Step Buying Checklist */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 sm:p-7 shadow-2xs space-y-5">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600 block mb-1">
            ✦ Coach &amp; Athletic Director Guide
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
            How To Choose The Perfect Custom {cleanSport} Uniform (5 Essential Checks)
          </h2>
          <p className="text-xs text-slate-500 font-normal mt-0.5">
            Key factors verified by over 500 US high schools and competitive clubs before placing bulk team orders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {checks.map((chk) => (
            <div key={chk.num} className="p-4 rounded-lg bg-slate-50/80 border border-slate-200/70 space-y-2">
              <span className="text-xs font-black text-indigo-600 bg-white border border-indigo-100 px-2 py-0.5 rounded-[4px] inline-block">
                Check {chk.num}
              </span>
              <h3 className="text-sm font-bold text-slate-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {chk.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {chk.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Care & Durability Guidelines */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 sm:p-7 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600 block">
              ✦ Long-Lasting Durability
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Garment Care &amp; Multi-Season Wash Instructions
            </h2>
          </div>
          <span className="text-xs text-slate-500">Sublimation will never crack, peel, or bleed when washed properly</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
          {careTips.map((tip, i) => (
            <div key={i} className="p-3.5 rounded-lg border border-slate-100 bg-slate-50 space-y-1">
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs">
                <FiCheckCircle className="text-sm" />
                <span>{tip.title}</span>
              </div>
              <p className="text-[11px] text-slate-600 font-normal leading-relaxed">
                {tip.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
