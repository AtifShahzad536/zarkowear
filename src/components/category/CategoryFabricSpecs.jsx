import React from 'react';
import { FiCheck, FiCpu, FiLayers, FiShield, FiTruck, FiBox, FiActivity } from 'react-icons/fi';

/**
 * Standard Fabric & Manufacturing Specs by Sport
 * Google rewards exact technical details (GSM, fabric weave, seam construction, ink types, certifications).
 */
const SPORT_SPECS = {
  football: {
    heroFabric: '240–260 GSM Pro-Interlock + 220 GSM Dazzle Cowl',
    stitching: 'Triple-needle bar-tacked shoulder yoke & multi-panel flatlock',
    printTech: '4K Italian J-Teck Sublimation + Multi-Layer Stitched Tackle Twill',
    compliance: 'NFHS Rule 1-5 & NCAA Gridiron Pad-Clearance Compliant',
    durability: 'High-tensile tear test >450N (Pad & tackle resistant)',
    features: [
      { label: 'Primary Fabric', val: '240–260 GSM Pro-Interlock Polyester' },
      { label: 'Accent / Cowl', val: '220 GSM High-Shine Dazzle Fabric' },
      { label: 'Ventilation', val: '180 GSM Porthole Poly-Spandex Mesh Inserts' },
      { label: 'Stitching', val: 'Multi-needle bar-tacked at collar, armhole & yoke' },
      { label: 'Pad Clearance', val: 'Ergonomic 3D articulated shoulder cut for shoulder pads' },
      { label: 'Pants Fabric', val: '280 GSM Heavy Stretch Lycra with 7-pad slotting' },
      { label: 'MOQ & Turnaround', val: '15 Sets Low MOQ | 8–12 Days Production' }
    ]
  },
  soccer: {
    heroFabric: '160 GSM Featherlight Dri-FIT Micro-Interlock',
    stitching: 'Ergonomic 4-thread overlock with anti-friction flatlock neck tape',
    printTech: '4K Molecular Dye Sublimation (Zero Pore Clogging / 100% Breathable)',
    compliance: 'IFAB Law 4 & NFHS Soccer Rule 4 Compliant',
    durability: 'ISO 105-C06 Level 4.5 color fastness to wash & sweat',
    features: [
      { label: 'Primary Fabric', val: '160 GSM Dri-FIT Micro-Poly Interlock' },
      { label: 'Breathability', val: 'Laser-perforated side ventilation panels' },
      { label: 'Inks Used', val: 'Non-toxic Italian Kiian / J-Teck high-density ink' },
      { label: 'Shorts Fabric', val: '160 GSM lightweight poly with elastic drawstring' },
      { label: 'Keeper Option', val: 'Integrated 8mm EVA foam elbow & hip pads' },
      { label: 'Crests & Badges', val: 'Sublimated, 3D Silicone, or Woven Heat-Seal' },
      { label: 'MOQ & Turnaround', val: '15 Sets Low MOQ | 8–12 Days Production' }
    ]
  },
  wrestling: {
    heroFabric: '280 GSM Heavyweight 4-Way Stretch Lycra Spandex',
    stitching: 'Reinforced 6-thread anti-burn flatlock seam construction',
    printTech: 'Full-Dye Deep Molecular Sublimation (Mat-Safe, Smooth Finish)',
    compliance: 'USA Wrestling, UWW & NFHS Dual Meet Rulebook Compliant',
    durability: '4-Way Elastic Memory Recovery >98% after intensive stretch',
    features: [
      { label: 'Primary Fabric', val: '280 GSM 82% Poly / 18% Spandex Heavy Lycra' },
      { label: 'Leg Grippers', val: 'Integrated stay-put silicone micro-dot elastic bands' },
      { label: 'Seam Tech', val: '6-needle flatlock prevents mat burn & skin chafe' },
      { label: 'Cut Styles', val: 'High-Cut, Low-Cut, or Modern 2-Piece Compression' },
      { label: 'Mat Safety', val: 'Zero rough embroidered patches (100% smooth sublimation)' },
      { label: 'Youth / Adult', val: 'Sizes YXS through Adult 4XL with reinforced crotch gusset' },
      { label: 'MOQ & Turnaround', val: '15 Pieces Low MOQ | 8–12 Days Production' }
    ]
  },
  softball: {
    heroFabric: '200 GSM Heavyweight Flatback Slide-Resistant Mesh',
    stitching: 'Reinforced bar-tacking + double-layer knee sliding protection',
    printTech: 'Full Sublimation or Traditional Stitched Tackle Twill',
    compliance: 'USA Softball (ASA), USSSA & NFHS Fastpitch Compliant',
    durability: 'Abrasion-resistant slide knit tested for dirt friction',
    features: [
      { label: 'Primary Fabric', val: '200 GSM Heavy-Duty Poly Flatback Mesh' },
      { label: 'Cut Profiles', val: 'Female-specific athletic taper, two-button, or full-button' },
      { label: 'Knee Reinforcement', val: 'Double-ply padded knees on sliding knickers' },
      { label: 'Waistband', val: '2.25" Non-roll elastic with silicone inner team grip' },
      { label: 'Moisture Control', val: 'Hydrophobic quick-dry treatment for hot doubleheaders' },
      { label: 'Inclusions', val: 'Jersey, knickers/pants, custom matching socks & visors' },
      { label: 'MOQ & Turnaround', val: '15 Sets Low MOQ | 8–12 Days Production' }
    ]
  },
  basketball: {
    heroFabric: '180–220 GSM Pro-Air Mesh or Ultra-Smooth Micro-Interlock',
    stitching: 'Double-needle reinforced armholes and wide ribbed neck trim',
    printTech: '4K Sublimation or Stitched Multi-Color Tackle Twill',
    compliance: 'NFHS Rule 3-4 (Legal 0-5, 00, 10-15 numbering) & NCAA Compliant',
    durability: 'Tear-resistant knit with high rebound flexibility',
    features: [
      { label: 'Primary Fabric', val: '180 GSM Pro-Air Pinhole Mesh or Interlock' },
      { label: 'Reversible Option', val: 'Dual-layer featherweight reversible scrimmage tops' },
      { label: 'Shoulder Cut', val: 'Wide-armhole athletic cut for unrestricted shooting motion' },
      { label: 'Shorts Length', val: 'Modern 7" or 9" inseams with 2" heavyweight elastic waistband' },
      { label: 'Customization', val: 'Multi-color team wordmarks, front/back numbers, player names' },
      { label: 'Warmup Gear', val: 'Matching shooting shirts, snap-down warm-up pants, hoodies' },
      { label: 'MOQ & Turnaround', val: '15 Sets Low MOQ | 8–12 Days Production' }
    ]
  },
  baseball: {
    heroFabric: '200–220 GSM Heavy Pro-Flatback Mesh & Interlock',
    stitching: 'Heavy-gauge multi-needle stitching on button plackets & seams',
    printTech: 'Authentic Stitched Tackle Twill or 4K Digital Sublimation',
    compliance: 'NFHS, Little League, USSSA & NCAA Baseball Compliant',
    durability: 'Double-knit slide-tested knee & hip durability',
    features: [
      { label: 'Jersey Styles', val: 'Full Button-Down, 2-Button Placket, Crew Neck, V-Neck' },
      { label: 'Pants Fabric', val: '260–280 GSM Heavy Pro-Double Knit Polyester' },
      { label: 'Piping & Braid', val: 'Classic 1/8" or 1/4" braided trim along neck and placket' },
      { label: 'Reinforcement', val: 'Double-layer articulated slide knees on game pants' },
      { label: 'Cage Jackets', val: 'Windproof ripstop outer shell with breathable mesh lining' },
      { label: 'Headwear', val: 'Custom matching 3D puff embroidered 6-panel team caps' },
      { label: 'MOQ & Turnaround', val: '15 Sets Low MOQ | 8–12 Days Production' }
    ]
  },
  'ice-hockey': {
    heroFabric: '240–260 GSM Heavyweight Pro-Air Knit Polyester Mesh',
    stitching: 'Reinforced double-ply shoulders, double elbows & fight straps',
    printTech: 'Heavy Tackle Twill Embroidered Crests or 4K Sublimation',
    compliance: 'USA Hockey & NCAA Hockey Jersey Regulation Compliant',
    durability: 'Abrasion-resistant knit engineered to glide over body armour',
    features: [
      { label: 'Primary Fabric', val: '240–260 GSM Pro-Air Knit snag-resistant mesh' },
      { label: 'Reinforcements', val: 'Double-layer fabric over shoulders & elbows' },
      { label: 'Fight Strap', val: 'Sewn-in authentic fight strap with heavy-duty snap' },
      { label: 'Collars', val: 'Pro lace-up V-neck or heavy ribbed crossover knit collar' },
      { label: 'Goalie Cut', val: 'Wide paddle sleeves and extended torso for chest protectors' },
      { label: 'Matching Socks', val: 'Sublimated pro-air knit hockey socks with velcro tabs' },
      { label: 'MOQ & Turnaround', val: '15 Sweaters Low MOQ | 8–12 Days Production' }
    ]
  },
  volleyball: {
    heroFabric: '180–200 GSM 4-Way Stretch Poly-Spandex Blend',
    stitching: 'Flatlock ergonomic anti-chafe seams for diving & sliding',
    printTech: 'Vibrant 4K Dye Sublimation (Weightless & Non-Fading)',
    compliance: 'USAV, NFHS Volleyball & NCAA Libero Contrast Compliant',
    durability: 'High-stretch recovery designed for court dives and spikes',
    features: [
      { label: 'Jersey Cuts', val: 'Sleeveless, Short Sleeve, or Active Long Sleeve' },
      { label: 'Libero Uniforms', val: 'Contrasting colorways produced in matching team cuts' },
      { label: 'Spandex Shorts', val: '4-Way stretch compression shorts with 3" or 4" inseam' },
      { label: 'Waistband', val: 'Wide comfort elastic that stays locked during dives' },
      { label: 'Zero Drag', val: 'Hydrophilic moisture-wicking weave prevents sweat cling' },
      { label: 'MOQ & Turnaround', val: '15 Sets Low MOQ | 8–12 Days Production' }
    ]
  },
  cricket: {
    heroFabric: '150–160 GSM Micro-Honeycomb Jacquard Quick-Dry Mesh',
    stitching: 'Reinforced side vents and multi-stitch polo plackets',
    printTech: '4K High-Definition All-Over Sublimation',
    compliance: 'ICC & USA Cricket Domestic League Regulation Ready',
    durability: 'UPF 50+ Sun Protection with Anti-Bacterial Odor Defense',
    features: [
      { label: 'Kit Formats', val: 'Colored T20 Kits, 50-Over Uniforms, Traditional Test Whites' },
      { label: 'Fabric Weave', val: '150 GSM Micro-Honeycomb breathability for hot climates' },
      { label: 'Sun Protection', val: 'Built-in UPF 50+ ultraviolet radiation barrier' },
      { label: 'Pants Fabric', val: '200 GSM Interlock trousers with deep ball pockets & drawstrings' },
      { label: 'Sponsor Branding', val: 'Unlimited chest, back, sleeve & trouser sponsor logos included' },
      { label: 'MOQ & Turnaround', val: '15 Sets Low MOQ | 8–12 Days Production' }
    ]
  },
  lacrosse: {
    heroFabric: '180 GSM Pro-Vented Lacrosse Mesh',
    stitching: 'Reinforced armhole and neck openings for pad clearance',
    printTech: '4K Italian Dye Sublimation (Zero Weight Addition)',
    compliance: 'USA Lacrosse & NFHS Lacrosse Rule Compliant',
    durability: 'Snag-resistant mesh designed for cross-checking & stick contact',
    features: [
      { label: 'Jersey Cuts', val: 'Wide shoulder cuts designed for shoulder pad clearance' },
      { label: 'Game Shorts', val: 'Lightweight poly-mesh with side split vents & inner drawstring' },
      { label: 'Shooter Shirts', val: 'Ultra-light 140 GSM moisture-wicking warmup shirts' },
      { label: 'Womens Skorts', val: 'Athletic match skorts with built-in spandex compression shorts' },
      { label: 'MOQ & Turnaround', val: '15 Sets Low MOQ | 8–12 Days Production' }
    ]
  },
  rugby: {
    heroFabric: '280–320 GSM High-Tensile Heavy Poly-Elastane Blend',
    stitching: 'Triple-needle bar-tacked stress zones & reinforced neck loop',
    printTech: '4K Deep-Fiber Sublimation (Scrum & Tackle Gripping Safe)',
    compliance: 'World Rugby Regulation 12 Compliant',
    durability: 'Tensile tear strength >600N (Engineered for scrums and rucks)',
    features: [
      { label: 'Primary Fabric', val: '280–320 GSM High-Tensile Ripstop Poly-Elastane' },
      { label: 'Reinforced Yoke', val: 'Double-ply shoulder and collar construction' },
      { label: 'Collar Style', val: 'Anti-grab mandarin or stretch loop collar' },
      { label: 'Rugby Shorts', val: 'Heavy cotton-twill or reinforced ripstop with stretch gusset' },
      { label: 'Grip Enhancements', val: 'Optional silicone chest grip dots for wet ball control' },
      { label: 'MOQ & Turnaround', val: '15 Sets Low MOQ | 8–12 Days Production' }
    ]
  }
};

const DEFAULT_SPECS = {
  heroFabric: '180–240 GSM High-Performance Athletic Interlock / Poly-Spandex',
  stitching: 'Industrial reinforced multi-thread overlock with bar-tacked stress points',
  printTech: '4K Italian Molecular Sublimation & High-Density Embroidery',
  compliance: 'USA Scholastic & Club Tournament Regulation Compliant',
  durability: 'Anti-snag, anti-chafe with Level 4.5 color-fastness guarantee',
  features: [
    { label: 'Primary Material', val: 'Performance moisture-wicking athletic polyester' },
    { label: 'Inks Used', val: '100% Genuine Italian J-Teck / Kiian eco-friendly inks' },
    { label: 'Print Durability', val: 'Infused molecular print — guaranteed never to crack or peel' },
    { label: 'Customization', val: 'Team logos, player names, roster numbers & sponsors included' },
    { label: 'Factory Direct', val: 'Manufactured in Sialkot, Pakistan for direct export to USA' },
    { label: 'MOQ & Turnaround', val: '15 Sets Low MOQ | 8–12 Days Production' }
  ]
};

export default function CategoryFabricSpecs({ cleanSport, slug }) {
  const sportKey = (slug || '').toLowerCase();
  const specs = SPORT_SPECS[sportKey] || DEFAULT_SPECS;

  return (
    <section className="my-10 bg-white rounded-[5px] border border-slate-200/90 p-5 sm:p-7 shadow-2xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 text-xs font-black uppercase tracking-[0.2em] mb-1">
            <FiActivity className="text-sm" />
            <span>TECHNICAL SPECIFICATIONS &amp; MATERIAL DATASHEET</span>
          </div>
          <h3 
            className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Custom {cleanSport} Fabric, GSM &amp; Construction Standards
          </h3>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[5px] bg-slate-900 text-white text-xs font-bold uppercase tracking-wider shrink-0 self-start sm:self-center">
          <FiShield className="text-emerald-400" />
          <span>Sialkot Factory-Direct</span>
        </div>
      </div>

      {/* 3 Core Highlight Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-6">
        <div className="p-4 rounded-[5px] bg-slate-50 border border-slate-200/60">
          <div className="flex items-center gap-2 text-indigo-600 text-xs font-black uppercase tracking-wider mb-1">
            <FiLayers />
            <span>Fabric Weight &amp; Weave</span>
          </div>
          <div className="text-sm font-bold text-slate-900 leading-snug">{specs.heroFabric}</div>
          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
            Engineered moisture-wicking yarns designed for unrestricted kinetic motion and sweat dispersal.
          </p>
        </div>

        <div className="p-4 rounded-[5px] bg-slate-50 border border-slate-200/60">
          <div className="flex items-center gap-2 text-indigo-600 text-xs font-black uppercase tracking-wider mb-1">
            <FiCpu />
            <span>Seam Construction</span>
          </div>
          <div className="text-sm font-bold text-slate-900 leading-snug">{specs.stitching}</div>
          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
            Multi-needle bar-tacked reinforcement on every stress intersection to prevent blowouts during play.
          </p>
        </div>

        <div className="p-4 rounded-[5px] bg-slate-50 border border-slate-200/60">
          <div className="flex items-center gap-2 text-indigo-600 text-xs font-black uppercase tracking-wider mb-1">
            <FiShield />
            <span>Color &amp; Inks Standard</span>
          </div>
          <div className="text-sm font-bold text-slate-900 leading-snug">{specs.printTech}</div>
          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
            Molecular infusion into polyester yarns. Zero peeling, zero cracking, zero added garment weight.
          </p>
        </div>
      </div>

      {/* Structured Technical Specs Table */}
      <div className="overflow-x-auto rounded-[5px] border border-slate-200/90">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900 text-white uppercase text-[11px] tracking-wider font-bold">
            <tr>
              <th className="py-2.5 px-4 w-1/3 border-r border-slate-800">Manufacturing Parameter</th>
              <th className="py-2.5 px-4">Zarko Factory Certified Specification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700 bg-white">
            {specs.features.map((item, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                <td className="py-2.5 px-4 font-bold text-slate-900 border-r border-slate-100 flex items-center gap-2">
                  <FiCheck className="text-indigo-600 shrink-0" />
                  <span>{item.label}</span>
                </td>
                <td className="py-2.5 px-4 text-slate-700 font-semibold">{item.val}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Compliance & Export Verification Row */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-800">Certified Compliance:</span>
          <span className="text-slate-600">{specs.compliance}</span>
        </div>
        <div className="flex items-center gap-2">
          <FiTruck className="text-emerald-600" />
          <span className="font-semibold text-emerald-800">DDP Door-to-Door Delivery to All 50 US States</span>
        </div>
      </div>
    </section>
  );
}

