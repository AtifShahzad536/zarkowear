import React from 'react';

// ── SVG LOGOS FOR CERTIFICATES ──
const ScciLogo = () => (
  <svg viewBox="0 0 160 140" className="w-full h-full max-h-11 object-contain select-none" fill="currentColor">
    {/* Outer cog / gear rim with text */}
    <circle cx="80" cy="70" r="58" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeDasharray="4 2" />
    <circle cx="80" cy="70" r="51" fill="none" stroke="#0f172a" strokeWidth="1.5" />
    <circle cx="80" cy="70" r="37" fill="none" stroke="#0f172a" strokeWidth="1" />
    {/* Star and Crescent */}
    <path d="M78 50 A16 16 0 1 1 82 82 A20 20 0 1 0 78 50 Z" fill="#0f172a" />
    <polygon points="90,62 93,66 98,66 94,69 96,74 91,71 87,74 88,69 85,66 90,66" fill="#0f172a" />
    {/* Text around rim */}
    <text x="80" y="24" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#0f172a" letterSpacing="0.5">
      SIALKOT CHAMBER
    </text>
    <text x="80" y="34" textAnchor="middle" fontSize="7" fontWeight="800" fill="#334155" letterSpacing="0.8">
      OF COMMERCE &amp; INDUSTRY
    </text>
    <text x="80" y="128" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#0f172a" fontFamily="serif">
      ایوانِ صنعت و تجارت سیالکوٹ
    </text>
  </svg>
);

const FbrLogo = () => (
  <svg viewBox="0 0 160 100" className="w-full h-full max-h-10 object-contain select-none">
    {/* Green Arch Curve */}
    <path d="M15 72 Q80 15 145 72" fill="none" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
    {/* Sun / Star burst element */}
    <circle cx="80" cy="36" r="3.5" fill="#f59e0b" />
    <path d="M80 24 L80 48 M68 36 L92 36 M72 28 L88 44 M72 44 L88 28" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
    {/* FBR Text */}
    <text x="80" y="72" textAnchor="middle" fontSize="30" fontWeight="900" fill="#0369a1" fontFamily="sans-serif" letterSpacing="2">
      FBR
    </text>
    <text x="80" y="86" textAnchor="middle" fontSize="8" fontWeight="800" fill="#0284c7" letterSpacing="2.5">
      PAKISTAN
    </text>
  </svg>
);

const IsoLogo = () => (
  <svg viewBox="0 0 130 130" className="w-full h-full max-h-11 object-contain select-none">
    <circle cx="65" cy="65" r="58" fill="none" stroke="#0284c7" strokeWidth="3" />
    <circle cx="65" cy="65" r="51" fill="none" stroke="#0284c7" strokeWidth="1.2" strokeDasharray="3 2" />
    <text x="65" y="32" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#0369a1" letterSpacing="1.2">
      CERTIFIED
    </text>
    <text x="65" y="66" textAnchor="middle" fontSize="28" fontWeight="900" fill="#0369a1" letterSpacing="1">
      ISO
    </text>
    <text x="65" y="82" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0369a1">
      9001:2015
    </text>
    <text x="65" y="98" textAnchor="middle" fontSize="8" fontWeight="800" fill="#0369a1" letterSpacing="1">
      COMPANY
    </text>
  </svg>
);

const CeLogo = () => (
  <svg viewBox="0 0 150 110" className="w-full h-full max-h-11 object-contain select-none">
    {/* C */}
    <path
      d="M62 20 A42 42 0 1 0 62 90"
      fill="none"
      stroke="#0f172a"
      strokeWidth="11"
      strokeLinecap="round"
    />
    {/* E */}
    <path
      d="M136 20 A42 42 0 1 0 136 90 M94 55 L128 55"
      fill="none"
      stroke="#0f172a"
      strokeWidth="11"
      strokeLinecap="round"
    />
  </svg>
);

const NoChildLabourLogo = () => (
  <svg viewBox="0 0 150 110" className="w-full h-full max-h-11 object-contain select-none">
    {/* Red vintage stamp badge outline */}
    <rect
      x="8"
      y="10"
      width="134"
      height="90"
      rx="10"
      fill="none"
      stroke="#dc2626"
      strokeWidth="3.5"
      strokeDasharray="6 2"
    />
    <rect
      x="13"
      y="15"
      width="124"
      height="80"
      rx="7"
      fill="none"
      stroke="#dc2626"
      strokeWidth="1.5"
    />
    {/* Stars */}
    <g fill="#dc2626">
      <polygon points="56,31 57.5,35 62,35 58.5,38 60,42 56,39 52,42 53.5,38 50,35 54.5,35" transform="scale(0.8) translate(14, 5)" />
      <polygon points="75,28 77,33 83,33 78,37 80,42 75,38 70,42 72,37 67,33 73,33" transform="scale(0.9) translate(8, 2)" />
      <polygon points="94,31 95.5,35 100,35 96.5,38 98,42 94,39 90,42 91.5,38 88,35 92.5,35" transform="scale(0.8) translate(23, 5)" />
    </g>
    <text x="75" y="60" textAnchor="middle" fontSize="15" fontWeight="900" fill="#dc2626" letterSpacing="0.8">
      NO CHILD
    </text>
    <text x="75" y="80" textAnchor="middle" fontSize="16" fontWeight="900" fill="#dc2626" letterSpacing="1.2">
      LABOUR
    </text>
  </svg>
);

// ── SVG LOGOS FOR SHIPPING METHODS ──
const DhlLogo = () => (
  <svg viewBox="0 0 160 70" className="w-full h-full max-h-8 object-contain select-none">
    {/* DHL Red & Yellow Brand Signature */}
    <text x="80" y="48" textAnchor="middle" fontSize="38" fontWeight="900" fontStyle="italic" fill="#d40511" letterSpacing="-2" fontFamily="sans-serif">
      DHL
    </text>
    {/* Speed lines */}
    <line x1="14" y1="26" x2="38" y2="26" stroke="#d40511" strokeWidth="2.5" />
    <line x1="10" y1="34" x2="34" y2="34" stroke="#d40511" strokeWidth="2.5" />
    <line x1="6" y1="42" x2="30" y2="42" stroke="#d40511" strokeWidth="2.5" />
    <line x1="124" y1="26" x2="148" y2="26" stroke="#d40511" strokeWidth="2.5" />
    <line x1="128" y1="34" x2="152" y2="34" stroke="#d40511" strokeWidth="2.5" />
    <line x1="132" y1="42" x2="156" y2="42" stroke="#d40511" strokeWidth="2.5" />
  </svg>
);

const DpdLogo = () => (
  <svg viewBox="0 0 150 70" className="w-full h-full max-h-8 object-contain select-none">
    {/* Red Cube */}
    <g transform="translate(18, 12)">
      {/* 3D isometric cube */}
      <polygon points="22,6 40,16 22,26 4,16" fill="#dc2626" />
      <polygon points="4,16 22,26 22,46 4,36" fill="#b91c1c" />
      <polygon points="40,16 22,26 22,46 40,36" fill="#ef4444" />
    </g>
    {/* Text dpd */}
    <text x="74" y="47" fontSize="34" fontWeight="800" fill="#dc2626" fontFamily="sans-serif" letterSpacing="-1">
      dpd
    </text>
  </svg>
);

const FedexLogo = () => (
  <svg viewBox="0 0 150 70" className="w-full h-full max-h-8 object-contain select-none">
    <text x="18" y="48" fontSize="36" fontWeight="900" fill="#4d148c" fontFamily="sans-serif" letterSpacing="-1.5">
      Fed
    </text>
    <text x="79" y="48" fontSize="36" fontWeight="900" fill="#ff6600" fontFamily="sans-serif" letterSpacing="-1.5">
      Ex
    </text>
    <circle cx="132" cy="28" r="3" fill="#ff6600" />
  </svg>
);

const UpsLogo = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full max-h-11 object-contain select-none">
    {/* UPS Classic Shield */}
    <path
      d="M20 20 L100 20 L100 68 C100 95 60 112 60 112 C60 112 20 95 20 68 Z"
      fill="#351c15"
    />
    <path
      d="M25 24 L95 24 L95 66 C95 89 60 105 60 105 C60 105 25 89 25 66 Z"
      fill="#ffb500"
    />
    <path
      d="M29 27 L91 27 L91 64 C91 85 60 100 60 100 C60 100 29 85 29 64 Z"
      fill="#351c15"
    />
    <text x="60" y="68" textAnchor="middle" fontSize="32" fontWeight="900" fill="#ffb500" fontFamily="sans-serif" fontStyle="italic" letterSpacing="-0.5">
      ups
    </text>
  </svg>
);

const AramexLogo = () => (
  <div className="w-full h-full bg-[#DA291C] rounded-[5px] flex flex-col items-center justify-center p-1.5 shadow-xs">
    <span className="text-white font-black text-xs sm:text-sm tracking-tight leading-none lowercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
      aramex
    </span>
    <span className="text-white/85 text-[6.5px] sm:text-[7.5px] tracking-tight font-medium mt-0.5">
      delivery unlimited
    </span>
  </div>
);

const TrustBadges = () => {
  const certificates = [
    { name: 'Sialkot Chamber of Commerce & Industry', component: <ScciLogo /> },
    { name: 'Federal Board of Revenue Pakistan', component: <FbrLogo /> },
    { name: 'ISO 9001:2015 Certified Quality Management', component: <IsoLogo /> },
    { name: 'CE European Conformity Mark', component: <CeLogo /> },
    { name: '100% Ethical & No Child Labour Guarantee', component: <NoChildLabourLogo /> },
  ];

  const shippingMethods = [
    { name: 'DHL Express Worldwide', component: <DhlLogo /> },
    { name: 'DPD International Express', component: <DpdLogo /> },
    { name: 'FedEx Priority Air Freight', component: <FedexLogo /> },
    { name: 'UPS Worldwide Expedited', component: <UpsLogo /> },
    { name: 'Aramex Global Delivery', component: <AramexLogo />, isCustomCard: true },
  ];

  return (
    <section className="w-full bg-[#0A0C16] border-t border-b border-white/10 py-10 sm:py-12 select-none relative overflow-hidden">
      {/* Subtle Glows */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[150px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[150px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[94%] xl:max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* ── LEFT SIDE: CERTIFICATES ── */}
          <div className="flex flex-col items-center">
            <h3
              className="text-xs sm:text-sm font-black uppercase tracking-[0.25em] text-white mb-4 sm:mb-5 text-center flex items-center gap-2"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              Certificates
            </h3>
            
            <div className="grid grid-cols-5 gap-2 sm:gap-3 w-full max-w-md sm:max-w-xl">
              {certificates.map((item, idx) => (
                <div
                  key={idx}
                  title={item.name}
                  className="bg-white rounded-[6px] border border-slate-200/90 hover:border-indigo-400 p-2 sm:p-2.5 h-14 sm:h-18 md:h-20 flex items-center justify-center shadow-xs hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
                >
                  {item.component}
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT SIDE: SHIPPING METHOD ── */}
          <div className="flex flex-col items-center">
            <h3
              className="text-xs sm:text-sm font-black uppercase tracking-[0.25em] text-white mb-4 sm:mb-5 text-center flex items-center gap-2"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
              Shipping Method
            </h3>

            <div className="grid grid-cols-5 gap-2 sm:gap-3 w-full max-w-md sm:max-w-xl">
              {shippingMethods.map((item, idx) => (
                <div
                  key={idx}
                  title={item.name}
                  className={`rounded-[6px] transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer h-14 sm:h-18 md:h-20 flex items-center justify-center ${
                    item.isCustomCard
                      ? 'p-0 shadow-xs hover:shadow-md'
                      : 'bg-white border border-slate-200/90 hover:border-indigo-400 p-2 sm:p-2.5 shadow-xs hover:shadow-md'
                  }`}
                >
                  {item.component}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrustBadges;

