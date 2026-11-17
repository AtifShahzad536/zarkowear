import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getCategory, imageUrl } from '../services/api';
import ProductCard from './ProductCard';
import Custom from '../pages/Custom';
import CategoryPricingCalculator from './category/CategoryPricingCalculator';
import CategoryBuyerSections from './category/CategoryBuyerSections';
import CategorySizeChart from './category/CategorySizeChart';
import CategorySeasonDeadlines from './category/CategorySeasonDeadlines';
import CategoryCaseStudies from './category/CategoryCaseStudies';
import { 
  FiSearch, 
  FiX, 
  FiSliders, 
  FiRefreshCw, 
  FiGrid, 
  FiList, 
  FiCheck, 
  FiArrowRight, 
  FiChevronDown, 
  FiChevronUp,
  FiShield,
  FiPackage,
  FiTruck,
  FiAward,
  FiClock
} from 'react-icons/fi';
import { FaWhatsapp, FaEye, FaRulerHorizontal } from 'react-icons/fa';
import { categoryConfigs } from '../data/categories';
import SeoHead from './SeoHead';

const SUBCATEGORY_MAP = {
  football: ['All', 'Jerseys', 'Pants', 'Elite Game Jerseys', 'Porthole Mesh Practice Jerseys', 'Integrated 7-Pad Pants', 'Slotted Game Pants', 'Compression Padded Girdles', 'Youth Tackle Football Kits'],
  baseball: ['All', 'Full Button Jerseys', 'Crew Neck Jerseys', 'Cage Batting Jackets', 'Piped Game Pants', 'Pro Team Socks', 'Pants', 'Socks'],
  softball: ['All', 'Two Button Jerseys', 'Crew Neck Jerseys', 'Knickers Pants', 'Padded Sliding Shorts', 'Fastpitch Caps & Visors', 'Shorts', 'Caps'],
  basketball: ['All', 'Pro Wide-Armhole Tops', 'Team Game Shorts', 'Shooting Warm-up Shirts', 'Snap-Down Warm-Up Suits', 'Youth Basketball Kits', 'Tops', 'Shorts'],
  soccer: ['All', 'Matchday Striker Jerseys', 'Performance Match Shorts', 'Padded Goalkeeper Kits', 'Club Training Tops & Bibs', 'Soccer Travel Tracksuits', 'Jerseys', 'Shorts'],
  volleyball: ['All', 'Elite Sleeveless Jerseys', 'Active Long Sleeve Jerseys', 'Lateral Agility Shorts', 'Libero Contrast Uniforms', 'Training Compression Tops', 'Jerseys', 'Shorts', 'Sleeveless Tops'],
  'ice-hockey': ['All', 'Heavy Pro-Knit Sweaters', 'Practice Mesh Jerseys', 'Pro Team Player Socks', 'Jerseys'],
  lacrosse: ['All', 'Lacrosse Game Jerseys', 'Lacrosse Team Shorts', 'Athletic Tank Tops', 'Game Skorts', 'Jerseys', 'Shorts', 'Skorts', 'Tanktops'],
  streetwear: ['All', 'Hoodies', 'Hoodie Shirts', 'Polo Shirts', 'Pullovers', 'Sleeveless Hoodies', 'Sweatshirts', 'Tracksuits', 'V Necks'],
  cricket: ['All', 'T20 Jerseys', 'Test Shirts', 'Match Pants', 'Training Kits'],
  rugby: ['All', 'Heavy Jerseys', 'Rugby Shorts', 'Training Tops'],
  wrestling: ['All', 'Singlets', '2-Piece Sets', 'Cheerleaders Uniforms', 'Netball Uniforms', 'Swimming & Water Polo', 'Compression Tops', 'Gear'],
  gym: ['All', 'Tops & Tees', 'Shorts', 'Compression Tights', 'Hoodies'],
  running: ['All', 'Running Singlets', 'Track Shorts', 'Jackets'],
  tennis: ['All', 'Polos', 'Skorts & Shorts', 'Warm-ups'],
  caps: ['All', 'Snapback Caps', 'Baseball Caps', 'Visors', 'Beanies'],
  bags: ['All', 'Duffel Bags', 'Backpacks', 'Team Gear Bags'],
  gloves: ['All', 'Batting Gloves', 'Goalkeeper Gloves', 'Training Gloves'],
  goalkeeper: ['All', 'Padded Jerseys', 'Padded Pants', 'Padded Shorts', 'Goalkeeper Gloves'],
  shoes: ['All', 'Pro Socks', 'Athletic Footwear'],
};

const matchesSubcategory = (prod, sub) => {
  if (!sub || sub === 'All') return true;
  const s = sub.trim().toLowerCase();

  // 1. Direct match on product's subcategory property if it exists
  if (prod.subcategory) {
    const pSub = prod.subcategory.trim().toLowerCase();
    if (pSub === s) return true;
    if (pSub.includes(s) || s.includes(pSub)) return true;
  }

  // 2. Search in product name, description, and subcategory
  const target = `${prod.name || ''} ${prod.description || ''} ${prod.subcategory || ''}`.toLowerCase();
  const words = s.split(/\s+|&|\/|-/).filter(w => w.length > 2 && w !== 'all' && w !== 'wear' && w !== 'custom');
  if (words.length === 0) return true;
  return words.some(w => {
    const stem = w.endsWith('s') ? w.slice(0, -1) : w;
    return target.includes(stem);
  });
};

const normalizeData = (slug) => {
  const config = categoryConfigs[slug];
  if (!config) return null;
  return {
    ...config,
    description: config.heroDescription || config.description,
  };
};

const SectionTitle = ({ eyebrow, title, description }) => (
  <div className="text-center max-w-3xl mx-auto">
    {eyebrow && (
      <span className="inline-flex items-center justify-center rounded-full border border-indigo-200 bg-white/80 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-indigo-500">
        {eyebrow}
      </span>
    )}
    <h2 className="mt-5 text-3xl font-bold tracking-tight text-indigo-950 sm:text-4xl">{title}</h2>
    {description && <p className="mt-3 text-base text-gray-600 sm:text-lg">{description}</p>}
  </div>
);

const CategoryPage = ({ slug }) => {
  const fallbackConfig = useMemo(() => normalizeData(slug), [slug]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedSub, setSelectedSub] = useState(searchParams.get('sub') || 'All');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Sidebar Filter States (Only available, real filters - NO price slider)
  const [selectedFabrics, setSelectedFabrics] = useState([]);
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [selectedCompliances, setSelectedCompliances] = useState([]);
  const [showSpecsAccordion, setShowSpecsAccordion] = useState(false);

  // Quick View Modal State
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [quickViewSize, setQuickViewSize] = useState('L');
  const [quickViewVolume, setQuickViewVolume] = useState('15 Sets (MOQ)');

  useEffect(() => {
    window.scrollTo(0, 0);
    const subParam = searchParams.get('sub');
    const qParam = searchParams.get('q');
    setSelectedSub(subParam || 'All');
    setSearchTerm(qParam || '');
    setSortBy('featured');
    setSelectedFabrics([]);
    setSelectedTechs([]);
    setSelectedCompliances([]);
  }, [slug, searchParams]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getCategory(slug)
      .then((d) => {
        if (!mounted) return;
        setData({
          ...(fallbackConfig || {}),
          ...d,
          heroVideo: d.heroVideo || fallbackConfig?.heroVideo || '',
          heroBadge: d.heroBadge || fallbackConfig?.heroBadge || '',
          description: d.description || fallbackConfig?.description || fallbackConfig?.heroDescription,
          gradient: d.gradient || fallbackConfig?.gradient,
          accent: d.accent || fallbackConfig?.accent,
          technicalSpecs: d.technicalSpecs || fallbackConfig?.technicalSpecs || categoryConfigs[slug]?.technicalSpecs || null,
        });
        setError('');
      })
      .catch((e) => {
        if (!mounted) return;
        if (fallbackConfig) {
          setData(fallbackConfig);
          setError('');
        } else {
          setError(e.message || 'Failed to load');
        }
      })
      .finally(() => mounted && setLoading(false));

    return () => { mounted = false; };
  }, [slug, fallbackConfig]);

  const cleanSport = useMemo(() => {
    const slugMap = {
      soccer: 'Soccer',
      football: 'American Football',
      basketball: 'Basketball',
      baseball: 'Baseball',
      volleyball: 'Volleyball',
      softball: 'Softball',
      'ice-hockey': 'Ice Hockey',
      hockey: 'Field Hockey',
      cricket: 'Cricket',
      wrestling: 'Wrestling',
      rugby: 'Rugby',
      tennis: 'Tennis',
      running: 'Running',
      gym: 'Gym & Activewear',
      lacrosse: 'Lacrosse',
      streetwear: 'Streetwear',
      shoes: 'Athletic Shoes',
      gloves: 'Sports Gloves',
      goalkeeper: 'Goalkeeper',
      caps: 'Caps & Headwear',
      bags: 'Sports Bags',
    };
    if (slug && slugMap[slug]) return slugMap[slug];
    if (!data?.name) return 'Sportswear';
    return data.name
      .replace(/( Kits & Uniforms| Uniforms & Kits| Kits & Apparel| Singlets & Gear| Apparel & Accessories| & Training Gear| & Footwear| & Hand Protection| & Headwear| & Gear Packs| Uniforms & Gear| Uniforms| Kits)/gi, '')
      .trim();
  }, [slug, data?.name]);

  const subcategories = useMemo(() => {
    const fromProducts = Array.isArray(data?.products)
      ? [...new Set(data.products.map(p => p.subcategory).filter(Boolean))]
      : [];
    let base = SUBCATEGORY_MAP[slug] ? [...SUBCATEGORY_MAP[slug]] : ['All', 'Jerseys'];
    const set = new Set(base);
    fromProducts.forEach(sub => set.add(sub));
    if (selectedSub && selectedSub !== 'All') {
      set.add(selectedSub);
    }
    return Array.from(set);
  }, [slug, data?.products, selectedSub]);

  // Dynamic Filtering based on Search, Subcategory, Price, and Sidebar Options
  const filteredProducts = useMemo(() => {
    const list = data?.products || [];
    if (!Array.isArray(list)) return [];

    let result = list.filter((p) => {
      // 1. Keyword Search
      const q = searchTerm.trim().toLowerCase();
      const matchesSearch = !q ||
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q));

      // 2. Subcategory Match
      const matchesSub = matchesSubcategory(p, selectedSub);

      // 3. Fabric filters (if any selected)
      let matchesFabric = true;
      if (selectedFabrics.length > 0) {
        const text = `${p.name || ''} ${p.description || ''}`.toLowerCase();
        matchesFabric = selectedFabrics.some((f) => {
          const key = f.toLowerCase().slice(0, 5);
          return text.includes(key) || text.includes('interlock') || text.includes('dazzle') || text.includes('mesh');
        });
      }

      // 4. Customization tech filters (if any selected)
      let matchesTech = true;
      if (selectedTechs.length > 0) {
        const text = `${p.name || ''} ${p.description || ''}`.toLowerCase();
        matchesTech = selectedTechs.some((t) => {
          const key = t.toLowerCase().slice(0, 5);
          return text.includes(key) || text.includes('sublimat') || text.includes('tackle') || text.includes('embroid');
        });
      }

      // 5. Compliance & Regulation filters (if any selected)
      let matchesCompliance = true;
      if (selectedCompliances.length > 0) {
        const text = `${p.name || ''} ${p.description || ''}`.toLowerCase();
        matchesCompliance = selectedCompliances.some((c) => {
          const key = c.toLowerCase().slice(0, 4);
          return text.includes(key) || true;
        });
      }

      return matchesSearch && matchesSub && matchesFabric && matchesTech && matchesCompliance;
    });

    // Sorting
    if (sortBy === 'name-asc') {
      result = [...result].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    } else if (sortBy === 'name-desc') {
      result = [...result].sort((a, b) => (b.name || '').localeCompare(a.name || ''));
    }

    return result;
  }, [data?.products, searchTerm, selectedSub, sortBy, selectedFabrics, selectedTechs, selectedCompliances]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedSub('All');
    setSortBy('featured');
    setSelectedFabrics([]);
    setSelectedTechs([]);
    setSelectedCompliances([]);
  };

  const toggleFabric = (fabric) => {
    setSelectedFabrics(prev => 
      prev.includes(fabric) ? prev.filter(f => f !== fabric) : [...prev, fabric]
    );
  };

  const toggleTech = (tech) => {
    setSelectedTechs(prev => 
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    );
  };

  const toggleCompliance = (comp) => {
    setSelectedCompliances(prev =>
      prev.includes(comp) ? prev.filter(c => c !== comp) : [...prev, comp]
    );
  };

  if (loading) {
    return (
      <main className="min-h-[60vh] bg-gradient-to-b from-white via-indigo-50/40 to-white">
        <div className="mx-auto flex max-w-[94%] items-center justify-center px-4 py-32">
          <div className="relative flex h-20 w-20 items-center justify-center">
            <div className="absolute h-full w-full animate-[spin_2.2s_linear_infinite] rounded-full border-4 border-indigo-200/70" />
            <div className="absolute h-full w-full animate-[spin_1.6s_linear_infinite] rounded-full border-4 border-transparent border-t-indigo-500" />
            <div className="absolute h-10 w-10 animate-pulse rounded-full bg-indigo-500/20" />
            <span className="relative text-xs font-semibold uppercase tracking-[0.4em] text-indigo-500">Loading</span>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-[94%] mx-auto px-4 py-24 text-center">
        <div className="inline-flex items-center gap-3 rounded-full border border-rose-200 bg-rose-50 px-6 py-3 text-sm font-semibold text-rose-600">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      </main>
    );
  }

  if (!data) return null;

  const {
    name = 'Category',
    description,
    products = [],
    technicalSpecs,
  } = data;

  const pageTitle = fallbackConfig?.seoTitle || `Custom ${cleanSport} Uniforms & Jerseys Manufacturer | Factory-Direct USA Wholesale | Zarko`;
  const pageDescription = fallbackConfig?.seoDescription || `Order factory-direct custom ${cleanSport.toLowerCase()} uniforms, sublimated jerseys, and team packages for USA high schools, youth travel leagues, and clubs. Low 15-set MOQ, NFHS compliant, 4K Italian sublimation, and express DDP delivery to USA.`;

  const pageKeywords = [
    `custom ${cleanSport.toLowerCase()} uniforms`,
    `custom ${cleanSport.toLowerCase()} jerseys wholesale`,
    `custom ${cleanSport.toLowerCase()} teamwear manufacturer usa`,
    `sublimated ${cleanSport.toLowerCase()} uniforms factory direct`,
    `high school ${cleanSport.toLowerCase()} uniforms wholesale`,
    `nfhs compliant ${cleanSport.toLowerCase()} uniforms`,
    `wholesale sports uniforms usa`,
    `custom sportswear manufacturer sialkot to usa`,
    `low moq custom teamwear usa`
  ].join(', ');

  const usaFaqItems = [
    {
      q: `What is the Minimum Order Quantity (MOQ) for custom ${cleanSport.toLowerCase()} uniforms for USA teams?`,
      a: `Our factory-direct MOQ is only 15 sets per design. You can mix any combination of player sizes (Youth YXS to Adult 5XL), with individual player names and roster numbers included at zero additional setup charge.`
    },
    {
      q: `Are your custom ${cleanSport.toLowerCase()} uniforms compliant with NFHS and NCAA regulations?`,
      a: `Yes, all our custom ${cleanSport.toLowerCase()} uniforms strictly adhere to NFHS (National Federation of State High School Associations) and NCAA rulebook standards for number contrast, pad clearances, and seam construction.`
    },
    {
      q: `How fast is turnaround and delivery to the United States?`,
      a: `We provide digital 3D mockup proofs within 12 hours. Physical pre-production sample prototypes take 5–7 business days, and bulk production is completed in 2–3 weeks, followed by 4–6 business days DDP Air Express delivery directly to your facility anywhere in the United States.`
    },
    {
      q: `Can we customize with team logos, sponsor crests, and individual player names?`,
      a: `Yes, our 4K digital Italian dye-sublimation includes unlimited team logos, sponsor graphics, high-definition crests, player names, and numbers directly infused into the fabric fibers with zero extra per-color fees.`
    },
    {
      q: `How do USA coaches and athletic directors request a digital mockup and price quote?`,
      a: `Simply reach out to our direct factory sales desk via WhatsApp at 03039200750 (+92 303 9200750) or submit your roster and logo sketch. Our atelier returns a photorealistic 3D uniform preview within 12 hours.`
    }
  ];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `https://www.zarkosportswear.com/${slug}#collection`,
      'name': pageTitle,
      'description': pageDescription,
      'url': `https://www.zarkosportswear.com/${slug}`,
      'about': {
        '@type': 'Thing',
        'name': `Custom ${cleanSport} Uniforms & Sportswear Wholesale`
      },
      'audience': {
        '@type': 'Audience',
        'audienceType': 'USA High School Athletic Directors, Coaches & League Commissioners',
        'geographicArea': {
          '@type': 'AdministrativeArea',
          'name': 'United States'
        }
      },
      'isPartOf': {
        '@type': 'WebSite',
        '@id': 'https://www.zarkosportswear.com/#website',
        'name': 'Zarko Sportswear',
        'url': 'https://www.zarkosportswear.com/'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `https://www.zarkosportswear.com/${slug}#breadcrumb`,
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://www.zarkosportswear.com/'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': `${cleanSport} Uniforms`,
          'item': `https://www.zarkosportswear.com/${slug}`
        }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `https://www.zarkosportswear.com/${slug}#faq`,
      'mainEntity': usaFaqItems.map(item => ({
        '@type': 'Question',
        'name': item.q,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.a
        }
      }))
    }
  ];

  return (
    <main className="bg-[#FAFBFD] min-h-screen">
      <SeoHead
        title={pageTitle}
        description={pageDescription}
        canonical={`https://www.zarkosportswear.com/${slug}`}
        keywords={pageKeywords}
        jsonLd={jsonLd}
        openGraph={{
          'og:title': pageTitle,
          'og:description': pageDescription,
          'og:url': `https://www.zarkosportswear.com/${slug}`,
        }}
        twitter={{
          'twitter:title': pageTitle,
          'twitter:description': pageDescription,
        }}
      />

      {/* ── CINEMATIC BRANDED HERO SECTION (MATCHING ZARKO INDIGO & CLEAN LUXURY PALETTE) ── */}
      <section className="relative bg-[#090C1A] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 overflow-hidden">
        {/* Subtle Background Sport Photography with Luxury Indigo/Navy Tinted Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={
              data?.featured?.image ||
              (slug === 'baseball' ? '/images/sports/baseball.webp' :
               slug === 'basketball' ? '/images/hero_basketball.webp' :
               slug === 'football' ? '/images/hero_football.webp' :
               slug === 'cricket' ? '/images/hero_cricket.webp' :
               slug === 'wrestling' ? '/images/hero_wrestling.webp' :
               slug === 'gym' ? '/images/hero_gym.webp' :
               slug === 'soccer' ? '/images/sports/soccer.webp' :
               '/images/sports/baseball.webp')
            }
            alt={cleanSport}
            className="w-full h-full object-cover object-center opacity-18 scale-105 filter blur-[1px]"
          />
          {/* Deep Navy/Indigo Gradient Vignette for high readability & elegance */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#090C1A] via-[#090C1A]/85 to-[#090C1A]/95" />
          <div className="absolute inset-0 bg-[radial-gradient(#312E81_1px,transparent_1px)] [background-size:28px_28px] opacity-20" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center space-y-4">
          {/* Clean Minimalist Breadcrumb Navigation */}
          <div className="flex items-center justify-center gap-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            <Link to="/" className="hover:text-indigo-300 transition">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">Sports Wear</span>
            <span className="text-slate-600">/</span>
            <span className="text-indigo-400 font-bold">{cleanSport}</span>
          </div>

          {/* Social Proof Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/90 border border-slate-700/70 text-[11px] text-slate-300 backdrop-blur-xs">
            <span className="text-amber-400">★★★★★</span>
            <span className="font-semibold text-white">4.9/5</span>
            <span className="text-slate-500">•</span>
            <span>Trusted by 500+ US Teams &amp; Clubs</span>
          </div>

          {/* Premium Headline (Balanced Size, Not Over-Sized) */}
          <h1 
            className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-wide text-white leading-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Custom {cleanSport} Jerseys &amp; Uniforms
          </h1>

          {/* Value Prop Description */}
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-300/90 leading-relaxed font-normal">
            {description || `Engineered for high-impact performance. NFHS & NCAA compliant custom ${cleanSport.toLowerCase()} uniforms featuring heavy double-knit dazzle, reinforced yoke, and integrated pad pants. Direct factory wholesale from Sialkot.`}
          </p>

          {/* Minimalist Trust Badges Pill Row (Unified Slate / Indigo Theme) */}
          <div className="pt-1 flex flex-wrap items-center justify-center gap-2 text-[11px] font-medium text-slate-300">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <FiCheck className="text-indigo-400 text-xs" />
              <span>15-Set Low MOQ</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <FiClock className="text-indigo-400 text-xs" />
              <span>Free 12h Digital Mockup</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <FiShield className="text-indigo-400 text-xs" />
              <span>NFHS &amp; NCAA Compliant</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <FiTruck className="text-indigo-400 text-xs" />
              <span>DDP Air Express to USA</span>
            </div>
          </div>

          {/* Refined Brand CTA Buttons (Matching Zarko Navy/Indigo + Emerald WhatsApp) */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#quote-form-section"
              className="px-5 py-2.5 rounded-[5px] bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <span>Request Free Team Quote</span>
              <FiArrowRight className="text-xs" />
            </a>

            <Link
              to="/custom"
              className="px-5 py-2.5 rounded-[5px] bg-white/10 hover:bg-white/15 text-white text-xs font-semibold uppercase tracking-wider border border-white/20 transition-all flex items-center gap-2"
            >
              <span>Launch 3D Customizer</span>
            </Link>

            <a
              href={`https://wa.me/923039200750?text=${encodeURIComponent(`Hi Zarko Sportswear, I'd like a wholesale team quote for custom ${cleanSport} uniforms with 12h mockups.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-[5px] bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm"
            >
              <FaWhatsapp className="text-sm" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── MAIN CATALOG CONTAINER (FULL WIDTH, CLEAN 4-COLUMN CARDS) ── */}
      <div className="mx-auto max-w-[96%] xl:max-w-[98%] 2xl:max-w-[1560px] px-3 sm:px-5 py-8 sm:py-10">
        
        {/* Section Heading & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <div className="text-indigo-600 text-xs font-bold uppercase tracking-[0.2em] mb-1">
            FACTORY-DIRECT DESIGNS &amp; STYLES
          </div>
          <h2 
            className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Popular {cleanSport} Cuts &amp; Sublimation Templates
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Pick any design below as a starting point. We customize colors, team logos, player numbers, and cut specs at zero extra artwork cost.
          </p>
        </div>

        {/* ── ULTRA-CLEAN STREAMLINED FILTER & SEARCH TOOLBAR (COMPACT 1-LINE / FULLY RESPONSIVE) ── */}
        <div className="bg-white rounded-[8px] border border-slate-200/90 p-2 sm:p-2.5 mb-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          {/* Left Controls: Subcategory Dropdown & Quick Reset */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {/* Category / Cut Dropdown Selector */}
            <div className="relative flex-1 sm:flex-initial sm:min-w-[210px] md:min-w-[240px]">
              <label htmlFor="category-cut-select" className="sr-only">Select Category Cut</label>
              <select
                id="category-cut-select"
                value={selectedSub}
                onChange={(e) => {
                  const sub = e.target.value;
                  setSelectedSub(sub);
                  const next = new URLSearchParams(searchParams);
                  if (sub === 'All') {
                    next.delete('sub');
                  } else {
                    next.set('sub', sub);
                  }
                  setSearchParams(next);
                }}
                className="w-full appearance-none pl-3 pr-8 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-[6px] text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1.5 focus:ring-indigo-600 transition cursor-pointer shadow-2xs truncate"
              >
                {subcategories.map((sub) => (
                  <option key={sub} value={sub} className="py-1">
                    {sub === 'All' ? `All ${cleanSport} Apparel` : sub}
                  </option>
                ))}
              </select>
              <FiChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs" />
            </div>

            {/* Quick Reset if filtered */}
            {(selectedSub !== 'All' || searchTerm) && (
              <button
                onClick={() => {
                  setSelectedSub('All');
                  setSearchTerm('');
                  const next = new URLSearchParams(searchParams);
                  next.delete('sub');
                  next.delete('q');
                  setSearchParams(next);
                }}
                className="shrink-0 px-2.5 py-2 rounded-[6px] border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-[11px] font-semibold text-slate-600 hover:text-slate-900 transition flex items-center gap-1 cursor-pointer"
                title="Reset filters"
              >
                <FiRefreshCw className="text-[10px]" />
                <span className="hidden md:inline">Reset</span>
              </button>
            )}
          </div>

          {/* Right Controls: Search Input + Sort Dropdown + Product Count */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Search Input with inline clear */}
            <div className="relative flex-1 sm:w-48 md:w-56">
              <FiSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Search ${cleanSport.toLowerCase()}...`}
                className="w-full pl-7 pr-6 py-2 bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 rounded-[6px] text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1.5 focus:ring-indigo-600 transition"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  title="Clear search"
                >
                  <FiX className="text-xs" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative shrink-0">
              <label htmlFor="sort-products-select" className="sr-only">Sort Products</label>
              <select
                id="sort-products-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-2.5 pr-6 py-2 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-[6px] text-xs font-semibold text-slate-700 focus:outline-none focus:ring-1.5 focus:ring-indigo-600 cursor-pointer transition shadow-2xs"
              >
                <option value="featured">Featured</option>
                <option value="name-asc">A → Z</option>
                <option value="name-desc">Z → A</option>
              </select>
              <FiChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[11px]" />
            </div>

            {/* Designs Count Pill */}
            <div className="hidden lg:flex items-center px-2.5 py-1.5 bg-slate-100 rounded-[6px] text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0 whitespace-nowrap">
              <span>{filteredProducts.length} Items</span>
            </div>
          </div>
        </div>

        {/* ── FULL-WIDTH PRODUCT CATALOG (4 CARDS PER ROW ON LARGE SCREENS) ── */}
        <div>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id || `${product.name}-${index}`}
                  id={product.id}
                  image={product.image}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  discount={product.discount}
                  categorySlug={slug}
                  sportName={cleanSport}
                  onQuickView={setQuickViewProduct}
                  viewMode="grid"
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-[5px] border border-slate-200/90 p-10 text-center max-w-lg mx-auto shadow-2xs">
              <div className="w-12 h-12 rounded-[5px] bg-slate-100 text-slate-800 flex items-center justify-center mx-auto mb-3 text-lg">
                <FiSearch />
              </div>
              <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">
                No Matching Products Found
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                We couldn&apos;t find any items matching your selected criteria. Try adjusting your keyword or reset filters.
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-4 px-4 py-2 bg-slate-900 hover:bg-red-600 text-white rounded-[5px] text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2 cursor-pointer shadow-2xs"
              >
                <FiRefreshCw className="text-xs" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </div>

        {/* ── 10-BLOCK BLUEPRINT: TIERED PRICING & INTERACTIVE CALCULATORS ── */}
        <CategoryPricingCalculator slug={slug} cleanSport={cleanSport} />

        {/* ── 10-BLOCK BLUEPRINT: BUYER-TYPE SECTIONS & SUB-PRODUCTS ── */}
        <CategoryBuyerSections slug={slug} cleanSport={cleanSport} />

        {/* ── 10-BLOCK BLUEPRINT: SIZE CHARTS & HOW TO MEASURE ── */}
        <CategorySizeChart cleanSport={cleanSport} />

        {/* ── 10-BLOCK BLUEPRINT: SEASON APPROVE-BY DEADLINES TABLE ── */}
        <CategorySeasonDeadlines cleanSport={cleanSport} />

        {/* ── 10-BLOCK BLUEPRINT: VERIFIED CASE STUDIES & REAL REVIEWS ── */}
        <CategoryCaseStudies cleanSport={cleanSport} />

        {/* ── USA B2B SOURCING AUTHORITY & SEO SECTION (FOR GOOGLE USA RANKINGS) ── */}
        <section className="mt-16 pt-10 border-t border-slate-200/90 space-y-8">
          
          {/* Section 1: Overview & Wholesale Advantage */}
          <div className="bg-white rounded-[5px] border border-slate-200/90 p-6 sm:p-8 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-indigo-600 text-xs font-black uppercase tracking-[0.2em]">
              <span>✦</span>
              <span>USA B2B SOURCING & CUSTOM OEM SPECIFICATION</span>
            </div>
            
            <h2 
              className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight uppercase"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Factory-Direct Custom {cleanSport} Uniforms for USA High Schools, Clubs & Travel Leagues
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Zarko Sportswear is an industrial sportswear atelier and export manufacturer based in Sialkot, Pakistan, engineered specifically to serve American high school athletic departments, collegiate teams, travel ball tournaments, and private label apparel brands. By sourcing direct from our specialized manufacturing floors, USA coaches and athletic directors bypass costly retail middlemen, saving up to 50% on bespoke sublimated team kits, tackle twill jerseys, and game pants.
            </p>

            {/* 4 Authority Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-4">
              <div className="p-3.5 rounded-[5px] bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 block">01. NFHS & NCAA COMPLIANT</span>
                <span className="text-xs font-bold text-slate-900 block">Regulation Ready</span>
                <p className="text-[11px] text-slate-500 font-normal leading-relaxed">
                  Engineered to meet NFHS uniform rules for number contrast, legal shoulder clearances, and pad pocket positioning.
                </p>
              </div>

              <div className="p-3.5 rounded-[5px] bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 block">02. 4K ITALIAN SUBLIMATION</span>
                <span className="text-xs font-bold text-slate-900 block">Zero Peel / Crack</span>
                <p className="text-[11px] text-slate-500 font-normal leading-relaxed">
                  Infused with genuine Italian J-Teck molecular inks. Roster names, numbers, and sponsor logos will never fade or crack.
                </p>
              </div>

              <div className="p-3.5 rounded-[5px] bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 block">03. LOW 15-SET FACTORY MOQ</span>
                <span className="text-xs font-bold text-slate-900 block">Small League Friendly</span>
                <p className="text-[11px] text-slate-500 font-normal leading-relaxed">
                  Low minimum order quantity allows varsity, JV, and freshman rosters to order custom colorways without high commitments.
                </p>
              </div>

              <div className="p-3.5 rounded-[5px] bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 block">04. DDP AIR EXPRESS TO USA</span>
                <span className="text-xs font-bold text-emerald-700 block">Delivered Duty Paid</span>
                <p className="text-[11px] text-slate-500 font-normal leading-relaxed">
                  Fast 4–6 day air delivery right to your facility door in Texas, Florida, California, Ohio, New York, or nationwide via DHL/FedEx.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: USA FAQ Section (Matching FAQPage Schema for Google Rich Snippets) */}
          <div className="bg-white rounded-[5px] border border-slate-200/90 p-6 sm:p-8 shadow-2xs space-y-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 block mb-1">
                Common Questions from USA Coaches & Athletic Directors
              </span>
              <h3 
                className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Frequently Asked Questions ({cleanSport} Team Orders)
              </h3>
            </div>

            <div className="space-y-3">
              {usaFaqItems.map((item, idx) => (
                <div key={idx} className="p-4 rounded-[5px] bg-slate-50 border border-slate-100 space-y-1.5">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="text-indigo-600 font-black">Q:</span>
                    <span>{item.q}</span>
                  </h4>
                  <p className="text-xs text-slate-600 font-normal leading-relaxed pl-5">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>

            {/* Direct WhatsApp Callout for USA Orders */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-[5px] bg-slate-900 text-white">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                  Direct Factory WhatsApp Desk
                </span>
                <p className="text-xs font-bold text-white mt-0.5">
                  Need a custom 3D uniform mockup or wholesale price sheet for your team?
                </p>
              </div>
              <a
                href={`https://wa.me/923039200750?text=${encodeURIComponent(`Hi Zarko Sportswear, I'm a coach/buyer in the USA and would like a quote and 3D digital mockup for custom ${cleanSport} uniforms.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-[5px] bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 shrink-0 cursor-pointer shadow-xs"
              >
                <FaWhatsapp className="text-sm" />
                <span>WhatsApp: 03039200750</span>
              </a>
            </div>
          </div>

        </section>

        {/* ── QUICK VIEW MODAL (ROUNDED 5PX WITH WHATSAPP 03039200750) ── */}
        {quickViewProduct && (
          <div 
            className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-fade-in"
            onClick={() => setQuickViewProduct(null)}
          >
            <div 
              className="relative w-full max-w-3xl bg-white rounded-[5px] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92vh] border border-slate-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-3 right-3 z-20 w-7 h-7 rounded-[5px] bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition cursor-pointer"
                title="Close"
              >
                <FiX className="text-sm" />
              </button>

              {/* Modal Left: Product Image (Pure White Background #FFFFFF) */}
              <div 
                className="md:w-1/2 p-6 sm:p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 relative min-h-[260px]"
                style={{ backgroundColor: '#ffffff' }}
              >
                <img
                  src={imageUrl(quickViewProduct.image || '/images/placeholder.jpg', { width: 800, quality: 'auto:best' })}
                  alt={quickViewProduct.name}
                  className="max-h-64 sm:max-h-72 object-contain filter drop-shadow-md"
                  style={{ backgroundColor: '#ffffff' }}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/images/placeholder.jpg';
                  }}
                />
              </div>

              {/* Modal Right: Product Details & Fast Action */}
              <div className="md:w-1/2 p-5 sm:p-6 flex flex-col justify-between overflow-y-auto space-y-3.5">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between pr-8">
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">
                      ✦ {cleanSport.toUpperCase()} • CUSTOM OEM
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-[4px] border border-emerald-100">
                      WA: 03039200750
                    </span>
                  </div>

                  <h3 
                    className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {quickViewProduct.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {quickViewProduct.description || `Export-grade 240 GSM ${cleanSport.toLowerCase()} uniform with reinforced flatlock stitching, pad clearance, and vibrant 4K sublimation.`}
                  </p>
                </div>

                {/* Specs Chips */}
                <div className="grid grid-cols-2 gap-1.5 text-[10px] font-semibold text-slate-700">
                  <div className="p-2 bg-slate-50 rounded-[5px] border border-slate-100">
                    <span className="text-slate-400 block text-[8.5px] uppercase">Fabric Tech</span>
                    <span className="font-bold text-slate-900">240 GSM Interlock</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-[5px] border border-slate-100">
                    <span className="text-slate-400 block text-[8.5px] uppercase">Compliance</span>
                    <span className="font-bold text-indigo-600">NFHS & NCAA Ready</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-[5px] border border-slate-100">
                    <span className="text-slate-400 block text-[8.5px] uppercase">Customization</span>
                    <span className="font-bold text-slate-900">4K Sublimation</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-[5px] border border-slate-100">
                    <span className="text-slate-400 block text-[8.5px] uppercase">Min Order (MOQ)</span>
                    <span className="font-bold text-slate-900">15 Sets / Design</span>
                  </div>
                </div>

                {/* Interactive Sample Size Selector */}
                <div className="space-y-1">
                  <span className="text-[9.5px] font-bold uppercase tracking-wider text-slate-500">
                    Sample Sizing:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'].map((s) => (
                      <button
                        key={s}
                        onClick={() => setQuickViewSize(s)}
                        className={`px-2 py-0.5 text-[11px] font-bold rounded-[5px] border transition cursor-pointer ${
                          quickViewSize === s
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Volume Selector */}
                <div className="space-y-1">
                  <span className="text-[9.5px] font-bold uppercase tracking-wider text-slate-500">
                    Estimated Volume:
                  </span>
                  <div className="grid grid-cols-2 gap-1">
                    {['15 Sets (MOQ)', '25 Sets', '50 Sets', '100+ Sets'].map((vol) => (
                      <button
                        key={vol}
                        onClick={() => setQuickViewVolume(vol)}
                        className={`p-1.5 text-center text-[11px] font-bold rounded-[5px] border transition cursor-pointer ${
                          quickViewVolume === vol
                            ? 'bg-indigo-50 border-indigo-600 text-indigo-700'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {vol}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Modal Action Buttons with 03039200750 */}
                <div className="pt-2 flex flex-col gap-2">
                  <a
                    href={`https://wa.me/923039200750?text=${encodeURIComponent(`Hi Zarko Sportswear, I would like to order a quote for: ${quickViewProduct.name} in size ${quickViewSize} with target volume ${quickViewVolume}. Please share factory rates and mockups.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-[5px] bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-2xs"
                  >
                    <FaWhatsapp className="text-base" />
                    <span>Inquire on WhatsApp (03039200750)</span>
                  </a>

                  <Link
                    to={`/detail?product=${encodeURIComponent(quickViewProduct.id || quickViewProduct.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}`}
                    state={{ product: quickViewProduct }}
                    className="w-full py-2 rounded-[5px] bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold uppercase tracking-wider text-center transition"
                  >
                    Open Full Specification Page →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── BESPOKE CUSTOM LAB SECTION ── */}
        <section id="quote-form-section" className="mt-24 border-t border-slate-200/60 pt-16 scroll-mt-20">
          <SectionTitle
            eyebrow="Custom OEM Atelier"
            title="Need something fully custom made?"
            description="Share your tech pack, uniform sketches, or sample photos. Our factory technicians engineer custom physical samples in 5-7 business days."
          />
          <div className="mt-8">
            <Custom isEmbedded={true} />
          </div>
        </section>

        {/* ── DYNAMIC CATEGORY FAQ ── */}
        <CategoryFaq slug={slug} cleanSport={cleanSport} />

        {/* ── SEO EXPANDED CONTENT ── */}
        <section className="mt-20 border-t border-slate-200/60 pt-16 pb-8">
          <div className="text-slate-700 space-y-6 w-full">
            <h3 className="text-2xl font-bold text-slate-900">
              Premium Custom {cleanSport} Uniforms & Gear Manufacturer | USA & Global Delivery
            </h3>
            <p className="text-sm sm:text-base leading-relaxed">
              At Zarko Sportswear, we engineer factory-direct custom {cleanSport.toLowerCase()} uniforms and team kits for American high schools, collegiate programs, semi-pro clubs, and sports brands across the USA and worldwide. Our manufacturing facility in Sialkot, Pakistan integrates high-definition Italian dye-sublimation machines, computerized tackle-twill embroidery, and heavy-duty interlock fabrics to produce uniforms that resist tearing, fading, and peeling.
            </p>
            <p className="text-sm sm:text-base leading-relaxed">
              Whether you require custom {cleanSport.toLowerCase()} game jerseys, moisture-wicking team sets, or complete sideline apparel, our factory guarantees 12-hour turnaround on digital design mockups, low 15-set MOQ, and fast Door-to-Door DDP air express shipping directly to your team headquarters.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

// ─── FAQ Dynamic Config Helpers & Components ───────────────────────────

const getCategoryFaqs = (slug, cleanSport) => {
  const defaults = [
    {
      question: `What materials do you use for custom ${cleanSport}?`,
      answer: `We use high-grade, moisture-wicking interlock polyester with reinforced stitching. This ensures maximum breathability, quick evaporation, and flexibility during intense gameplay.`
    },
    {
      question: "Can we submit our own team crests, sponsor logos, and player numbers?",
      answer: `Yes, absolutely. We use high-definition dye sublimation which infuses the inks directly into the fabric fibers, meaning your logos, numbers, and names will never crack, peel, or fade.`
    },
    {
      question: `What is your minimum order quantity (MOQ) for custom ${cleanSport.toLowerCase()}?`,
      answer: "Our standard MOQ starts at 15 to 25 units per design. However, we can accommodate smaller team rosters or replacement orders upon request."
    },
    {
      question: "How long does manufacturing and delivery to the USA take?",
      answer: "Once you approve the digital design mockups, production typically takes 2-3 weeks. Express DHL or FedEx shipping to the USA takes an additional 3-5 business days."
    }
  ];

  const key = slug.toLowerCase();
  if (key.includes('wrestling')) {
    return [
      {
        question: "Are your custom wrestling singlets compliance-approved?",
        answer: "Yes, our wrestling singlets are engineered strictly according to NFHS and NCAA regulations, featuring correct sizing boundaries, necklines, and side panel spacing requirements."
      },
      {
        question: "What fabric is used to ensure durability during intense grappling?",
        answer: "We utilize double-stitch 280 GSM Lycra fabric (80% polyester, 20% spandex) with flatlock seams to prevent chafing and withstand high-impact grappling matches."
      },
      {
        question: "Do you offer silicon gripper bands on the legs?",
        answer: "Yes, custom leg band grippers (both silicone elastic and compression bands) are available to keep the singlet securely in place during matches."
      },
      {
        question: "What is the MOQ and production timeline for wrestling singlets?",
        answer: "Our MOQ for wrestling singlets is 15 units. Production takes 2 weeks followed by 3-5 days DHL express delivery to USA destinations."
      }
    ];
  }

  if (key.includes('gym') || key.includes('running')) {
    return [
      {
        question: "What makes your private-label activewear suitable for brand launches?",
        answer: "We offer high-end fabric blends (nylon/spandex, combed cotton polyester), flatlock anti-chafe stitching, custom wash care labels, and low MOQs starting at 30 pieces."
      },
      {
        question: "Can you provide custom embroidery or screen printing?",
        answer: "Yes, we support premium embroidery, 3D silicone printing, heat-transfer, and screen printing options based on your brand's aesthetic guidelines."
      },
      {
        question: "Do you supply fabric swatches before bulk production?",
        answer: "Yes, we can send fabric swatches or produce a pre-production sample for your quality check before launching full-scale manufacturing."
      }
    ];
  }

  return defaults;
};

const CategoryFaq = ({ slug, cleanSport }) => {
  const [activeFaq, setActiveFaq] = useState(null);
  const faqs = useMemo(() => getCategoryFaqs(slug, cleanSport), [slug, cleanSport]);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <section className="mt-20 border-t border-slate-200/60 pt-16">
      <div className="text-center mb-12">
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-indigo-600 block">
          FAQ Section
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
          Frequently Asked Questions
        </h2>
        <p className="text-xs text-slate-500 mt-2">
          Everything you need to know about our custom {cleanSport.toLowerCase()} uniforms and teamwear.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column (Even Indexes) */}
        <div className="space-y-4">
          {faqs.filter((_, idx) => idx % 2 === 0).map((faq, idx) => {
            const actualIndex = idx * 2;
            const isOpen = activeFaq === actualIndex;
            return (
              <div key={actualIndex} className="border border-slate-200 bg-white rounded-xl shadow-2xs">
                <button
                  onClick={() => toggleFaq(actualIndex)}
                  className="w-full py-4 px-6 flex justify-between items-center text-left text-slate-800 font-semibold hover:bg-slate-50/50 transition-colors cursor-pointer"
                >
                  <span className="text-xs sm:text-sm pr-2">{faq.question}</span>
                  <span className="text-indigo-600 shrink-0 text-xs ml-4">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-4 border-t border-slate-100 pt-3">
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Column (Odd Indexes) */}
        <div className="space-y-4">
          {faqs.filter((_, idx) => idx % 2 !== 0).map((faq, idx) => {
            const actualIndex = idx * 2 + 1;
            const isOpen = activeFaq === actualIndex;
            return (
              <div key={actualIndex} className="border border-slate-200 bg-white rounded-xl shadow-2xs">
                <button
                  onClick={() => toggleFaq(actualIndex)}
                  className="w-full py-4 px-6 flex justify-between items-center text-left text-slate-800 font-semibold hover:bg-slate-50/50 transition-colors cursor-pointer"
                >
                  <span className="text-xs sm:text-sm pr-2">{faq.question}</span>
                  <span className="text-indigo-600 shrink-0 text-xs ml-4">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-4 border-t border-slate-100 pt-3">
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;
