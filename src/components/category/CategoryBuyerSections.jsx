import React from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiAward, FiCompass, FiShield, FiCheck } from 'react-icons/fi';

const BUYER_CONTENT = {
  soccer: {
    youth: {
      title: 'Youth & Rec League Soccer Uniforms (Ages U6 to U18)',
      desc: 'Equipping youth soccer leagues and community rec programs requires durable, wash-tested materials that handle mud slides and weekly turf burns without fraying. Our youth soccer kits are tailored with featherweight 150 GSM micro-interlock fabric, anti-chafing flatlock seams, and elasticized drawstrings that keep young players focused on footwork rather than adjusting their gear.',
      bullets: ['Stain-resistant and machine-washable for easy parent care', 'Youth Extra Small (YXS) through Youth Extra Large (YXL)', 'Pre-numbered rosters to streamline volunteer coach distribution', 'Low 15-kit minimum order quantity with fast fill-in replacements']
    },
    highSchool: {
      title: 'High School Varsity & JV Soccer Kits (NFHS & State Compliant)',
      desc: 'High school athletic programs must navigate strict uniform guidelines established by state athletic associations and the NFHS rulebook. Zarko Sportswear manufactures high school matchday kits engineered with 100% compliant number contrast ratios, legal crest placements, and home/away color distinction. Our 4K Italian sublimation penetrates deep into the interlock fibers, ensuring varsity numbers and school mascots never peel during intense district play.',
      bullets: ['Meets NFHS uniform rule specifications for numbers and crest placement', 'Home white/light jerseys and away contrasting dark kits', 'Reinforced neck collars and bar-tacked stress points for physical challenges', 'Pre-season sample kits and bulk school purchase order (PO) support']
    },
    club: {
      title: 'Competitive Club & Travel Soccer Uniform Packages',
      desc: 'For elite academy squads competing in state cups, ECNL, and regional showcase tournaments, uniforms are both an athletic tool and a professional brand statement. We craft complete club identity packages including home jerseys, away kits, third alternate shirts, matching sideline travel tracksuits, and customized compression base layers.',
      bullets: ['Complete club packages: Home, Away, Goalkeeper & Training Bibs', 'Vibrant photo-realistic 4K digital dye-sublimation with Japanese inks', 'Ventilated laser-cut side panels for 90-minute moisture expulsion', 'Dedicated account manager for multi-team club orders across age brackets']
    },
    womens: {
      title: "Women's & Girls' Cut Soccer Uniforms",
      desc: "Female soccer players deserve uniforms engineered specifically for women's athletic biomechanics, not resized men's shirts. Our women's soccer jerseys feature tailored narrower shoulders, contoured side waists, anti-gape chest cuts, and ergonomic shorts with wider hip clearances and comfortable stay-put waistbands.",
      bullets: ['Tailored female athletic silhouette designed for high-speed mobility', 'Non-see-through double-knit interlock fabrics with zero transparency', 'Ergonomic short inseams optimized for aggressive lateral agility', 'Available in full youth girls and adult women sizing']
    },
    subProduct: {
      title: 'Padded Goalkeeper Kits & IFAB Law 4 Color Rules',
      desc: 'Under IFAB Law 4, goalkeepers must wear colors that distinctly separate them from outfield players, the opposing keeper, and the match officials. Zarko manufactures high-visibility neon and tonal keeper uniforms complete with high-density EVA foam elbow and hip padding. Pair your kit with our specialized German latex goalkeeper gloves for superior matchday protection.',
      linkText: 'Explore Goalkeeper Gear & Padded Uniforms →',
      linkTo: '/custom-goalkeeper-uniforms'
    }
  },
  basketball: {
    youth: {
      title: 'Youth & Rec Basketball Uniforms (YXS to YXL)',
      desc: 'For elementary and middle school leagues, youth basketball uniforms need to be lightweight, easy to slip on, and built to survive frequent floor falls and wash cycles. Our youth kits use breathable 160 GSM open-cell mesh that wicks perspiration instantly, keeping youth athletes comfortable through fast-break basketball.',
      bullets: ['Featherweight breathable poly-mesh with smooth inner lining', 'Elastic waistbands with reinforced inner drawstrings for growing players', 'Youth YXS through YXL standard court cuts', 'Low 15-set MOQ for neighborhood recreational leagues']
    },
    highSchool: {
      title: 'High School Varsity & JV Basketball Uniforms (NFHS Compliant)',
      desc: 'High school basketball demands strict compliance with NFHS Rule 3-4 regarding legal uniform numbers (0-5, 00, 10-15, etc.), contrast borders, and team name arching. Zarko Sportswear engineers varsity basketball uniforms that strictly adhere to all national federation criteria, utilizing pro-spec 180 GSM heavyweight micro-interlock and dynamic moisture-evaporation side ribbing.',
      bullets: ['100% compliant with NFHS Rule 3-4 number rules and legal color schemes', 'Pro wide-armhole cuts for unrestricted shooting release', 'Heavy-duty 2-inch non-roll elastic waistband on shorts', 'Authentic double-stitched tackle twill or ultra-lightweight sublimation']
    },
    club: {
      title: 'AAU Circuit & Travel Tournament Basketball Kits',
      desc: 'AAU basketball is synonymous with eye-catching visual identity, rapid tournament turnarounds, and grueling multi-game weekends. We specialize in custom AAU jersey designs featuring vibrant gradients, holographic accents, custom camo patterns, and matching reversible practice jerseys designed for weekend showcase tournaments.',
      bullets: ['Dual-layer reversible home/away scrimmage sets', 'Bold custom graphic overlays: carbon fiber, gradient drips, geometric fades', 'Reinforced neckline and armhole ribbing built for aggressive physical play', 'Fast 8–12 business day turnaround before national tournament qualifiers']
    },
    womens: {
      title: "Women's & Girls' Basketball Uniforms",
      desc: "Our female basketball uniforms feature tailored armholes that prevent sports bra exposure, contoured torso tapering, and court shorts with modern 5-inch to 7-inch inseams tailored specifically for female athletes.",
      bullets: ['Refined armhole radius engineered specifically for female ball-handlers', 'Anti-cling static-free moisture-wicking interlock fabric', 'Custom female court shorts with stay-put waistband construction', 'Youth girls through adult women 3XL']
    },
    subProduct: {
      title: 'Dual-Layer Reversible Scrimmage Sets & Pro Warmup Suits',
      desc: 'Maximize your equipment budget with two-in-one sublimated reversible jerseys. Engineered with micro-pinhole mesh on both sides, players simply flip the jersey from home light to away dark during practices, summer camps, or tournament pool play without needing two separate uniform kits.',
      linkText: 'Start a Custom Reversible Uniform Order →',
      linkTo: '/contact'
    }
  }
};

const DEFAULT_BUYER_CONTENT = {
  youth: {
    title: 'Youth & Rec League Uniforms',
    desc: 'Lightweight, durable athletic uniforms designed for young athletes. Easy-care machine-washable fabrics with reinforced stitching for full-season play.',
    bullets: ['Youth YXS to YXL sizing', 'Stain-resistant, high-durability interlock polyester', 'Pre-numbered player sets', 'Low 15-set minimum order']
  },
  highSchool: {
    title: 'High School Varsity & JV Teamwear (NFHS Compliant)',
    desc: 'Regulation-compliant uniforms engineered for scholastic athletics. Meets national rulebook requirements for number contrast and logo placement.',
    bullets: ['NFHS rulebook compliant designs', 'Heavyweight pro-grade athletic fabrics', 'Fade-proof 4K sublimation', 'School purchase order (PO) support']
  },
  club: {
    title: 'Club & Travel League Tournament Packages',
    desc: 'Complete branded team packages for travel squads and competitive tournament play. Home, away, and sideline apparel built to elevate team prestige.',
    bullets: ['Home, away, and travel kits', 'Custom roster names and sponsor logos', 'Moisture-wicking athletic performance weave', 'Express USA door-to-door fulfillment']
  },
  womens: {
    title: "Women's & Girls' Athletic Cut Teamwear",
    desc: "Ergonomically contoured uniforms tailored for female athletes. Engineered with athletic tapering, modified armholes, and comfortable mobility waistbands.",
    bullets: ['Female-specific athletic silhouette', 'Zero-transparency double-knit fabrics', 'Contoured mobility construction', 'Youth girls to adult women sizing']
  },
  subProduct: {
    title: 'Custom Sideline Apparel & Training Gear',
    desc: 'Complete your team package with matching coach polos, compression tights, and gear bags designed with consistent team branding.',
    linkText: 'View Custom Accessories & Sideline Gear →',
    linkTo: '/custom'
  }
};

export default function CategoryBuyerSections({ slug = 'soccer', cleanSport = 'Soccer' }) {
  const content = BUYER_CONTENT[slug] || DEFAULT_BUYER_CONTENT;

  return (
    <section className="w-full my-12 pt-8 pb-10 bg-slate-50/50 rounded-xl border border-slate-200/80">
      <div className="max-w-[96%] xl:max-w-[98%] 2xl:max-w-[1560px] mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-600 block mb-1">
            Engineered For Every Competitive Level
          </span>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Custom {cleanSport} Uniforms Tailored By Program Type
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            Whether outfitting a first-grade recreation team or competing for a varsity state championship, our factory engineers sport-specific cuts, compliant numbering, and high-tensile fabrics designed for your exact competitive requirements.
          </p>
        </div>

        {/* 4 Buyer-Type Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

          {/* 1. Youth & Rec */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-7 shadow-2xs flex flex-col justify-between space-y-4 hover:border-indigo-400 transition-colors">
            <div>
              <div className="flex items-center gap-2.5 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-2">
                <FiUsers className="text-base" />
                <span>01. Community &amp; Academy Programs</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {content.youth.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {content.youth.desc}
              </p>
            </div>
            <ul className="space-y-1.5 pt-3 border-t border-slate-100 text-xs text-slate-700 font-medium">
              {content.youth.bullets.map((b, i) => (
                <li key={i} className="flex items-center gap-2">
                  <FiCheck className="text-emerald-500 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. High School NFHS */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-7 shadow-2xs flex flex-col justify-between space-y-4 hover:border-indigo-400 transition-colors">
            <div>
              <div className="flex items-center gap-2.5 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-2">
                <FiAward className="text-base" />
                <span>02. Varsity &amp; JV Scholastic Athletics</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {content.highSchool.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {content.highSchool.desc}
              </p>
            </div>
            <ul className="space-y-1.5 pt-3 border-t border-slate-100 text-xs text-slate-700 font-medium">
              {content.highSchool.bullets.map((b, i) => (
                <li key={i} className="flex items-center gap-2">
                  <FiCheck className="text-emerald-500 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Club & Travel */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-7 shadow-2xs flex flex-col justify-between space-y-4 hover:border-indigo-400 transition-colors">
            <div>
              <div className="flex items-center gap-2.5 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-2">
                <FiCompass className="text-base" />
                <span>03. Tournament &amp; Travel Ball</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {content.club.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {content.club.desc}
              </p>
            </div>
            <ul className="space-y-1.5 pt-3 border-t border-slate-100 text-xs text-slate-700 font-medium">
              {content.club.bullets.map((b, i) => (
                <li key={i} className="flex items-center gap-2">
                  <FiCheck className="text-emerald-500 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Women's & Girls */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-7 shadow-2xs flex flex-col justify-between space-y-4 hover:border-indigo-400 transition-colors">
            <div>
              <div className="flex items-center gap-2.5 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-2">
                <FiShield className="text-base" />
                <span>04. Female-Specific Athletic Engineering</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {content.womens.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {content.womens.desc}
              </p>
            </div>
            <ul className="space-y-1.5 pt-3 border-t border-slate-100 text-xs text-slate-700 font-medium">
              {content.womens.bullets.map((b, i) => (
                <li key={i} className="flex items-center gap-2">
                  <FiCheck className="text-emerald-500 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Sub-Product Feature Block */}
        <div className="mt-8 bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 block">
              Specialized Sub-Product Category
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {content.subProduct.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {content.subProduct.desc}
            </p>
          </div>
          <Link
            to={content.subProduct.linkTo}
            className="shrink-0 px-5 py-3 rounded-lg bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
          >
            {content.subProduct.linkText}
          </Link>
        </div>

      </div>
    </section>
  );
}
