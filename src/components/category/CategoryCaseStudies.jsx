import React from 'react';
import { FiStar, FiCheckCircle, FiMapPin, FiCalendar, FiPackage } from 'react-icons/fi';

const REVIEWS = [
  {
    name: 'Coach Marcus Vance',
    role: 'Varsity Soccer Head Coach',
    team: 'North Texas Premier Elite Academy',
    location: 'Dallas, TX, USA',
    date: 'October 14, 2026',
    stars: 5,
    verified: true,
    text: 'We placed an order for 550 complete matchday kits across 14 age divisions. Zarko turned around the 3D mockups in under 12 hours, produced the entire run in 11 business days, and DHL delivered directly to our clubhouse with zero customs duty hassle. Quality of the sublimation and collar stitching matches our previous $80 Nike kits at half the cost.'
  },
  {
    name: 'David Reynolds',
    role: 'Athletic Director & Head Coach',
    team: 'Buckeye Youth Wrestling Association',
    location: 'Columbus, OH, USA',
    date: 'September 28, 2026',
    stars: 5,
    verified: true,
    text: 'Outfitted our entire district tournament squad with 1,200+ custom compression singlets. The 240 GSM poly-spandex didn’t tear once throughout an aggressive 3-day regional tournament. The silicone thigh grippers actually stay in place. Zarko is now our exclusive teamwear partner.'
  },
  {
    name: 'Elena Rostova',
    role: 'Club Director',
    team: 'SoCal Agility Volleyball Club',
    location: 'San Diego, CA, USA',
    date: 'August 19, 2026',
    stars: 5,
    verified: true,
    text: 'Finding regulation-compliant Libero jerseys that distinctly contrast while matching the club theme is normally a headache. Zarko nailed the NFHS color contrast rules on the first mockup. Delivery was 4 days via DHL Express.'
  }
];

export default function CategoryCaseStudies({ cleanSport = 'Soccer' }) {
  return (
    <section className="w-full my-12 pt-8 pb-10 bg-white rounded-xl border border-slate-200/90 shadow-xs">
      <div className="max-w-[96%] xl:max-w-[98%] 2xl:max-w-[1560px] mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
            <FiCheckCircle />
            <span>Verified US Customer Delivery Evidence</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Trusted by American Athletic Programs &amp; Clubs
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 font-normal">
            Real order case studies and verified delivery reviews from high school coaches, club directors, and team managers across the USA.
          </p>
        </div>

        {/* 2 Detailed Case Studies Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          {/* Case Study 1: Dallas Soccer */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 sm:p-7 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded">
                Case Study #01 • Soccer Club Tournament
              </span>
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                <FiMapPin className="text-slate-400" />
                <span>Dallas, Texas (USA)</span>
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Dallas Soccer Club: 550+ Sublimated Match Kits in 11 Working Days
            </h3>

            <div className="grid grid-cols-3 gap-2.5 text-center text-xs py-2 bg-white rounded-lg border border-slate-200/80">
              <div className="p-2 border-r border-slate-100">
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Order Size</span>
                <span className="text-sm font-extrabold text-slate-900">550+ Kits</span>
              </div>
              <div className="p-2 border-r border-slate-100">
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Turnaround</span>
                <span className="text-sm font-extrabold text-indigo-600">11 Work Days</span>
              </div>
              <div className="p-2">
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Delivery</span>
                <span className="text-sm font-extrabold text-emerald-700">DDP Air Express</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              When a major Dallas youth soccer tournament approached with just 3 weeks until opening ceremony, Zarko Sportswear mobilized high-speed Italian sublimation printers. All 550 match kits (jerseys + shorts) featuring individual roster names, numbers, and sponsor crests were completed, quality-checked, and delivered door-to-door in Texas with zero import duty surcharges.
            </p>
          </div>

          {/* Case Study 2: Midwest Wrestling */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 sm:p-7 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded">
                Case Study #02 • State Athletic Championship
              </span>
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                <FiMapPin className="text-slate-400" />
                <span>Columbus, Ohio (USA)</span>
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Midwest Wrestling Association: 1,200+ Heavyweight Sublimated Singlets
            </h3>

            <div className="grid grid-cols-3 gap-2.5 text-center text-xs py-2 bg-white rounded-lg border border-slate-200/80">
              <div className="p-2 border-r border-slate-100">
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Order Size</span>
                <span className="text-sm font-extrabold text-slate-900">1,200+ Singlets</span>
              </div>
              <div className="p-2 border-r border-slate-100">
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Fabric Spec</span>
                <span className="text-sm font-extrabold text-indigo-600">240 GSM Spandex</span>
              </div>
              <div className="p-2">
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Mat Tear Rate</span>
                <span className="text-sm font-extrabold text-emerald-700">0.0% Defect</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Engineered with 4-way stretch high-tension elastane and reinforced flatlock bar-tack stitching, the Midwest order equipped 48 regional high school wrestling teams for varsity qualifiers. Roster numbers and school insignias remained sharp with zero mat burn degradation across the entire wrestling season.
            </p>
          </div>

        </div>

        {/* 3 Named Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {REVIEWS.map((rev, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex text-amber-400 text-xs gap-0.5">
                    {[...Array(rev.stars)].map((_, i) => (
                      <FiStar key={i} className="fill-amber-400" />
                    ))}
                  </div>
                  {rev.verified && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                      <FiCheckCircle className="text-[9px]" /> Verified Coach
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 italic leading-relaxed">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 text-xs">
                <span className="font-bold text-slate-900 block">{rev.name}</span>
                <span className="text-[11px] text-slate-500 block">{rev.role} • {rev.team}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">{rev.location} • {rev.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
