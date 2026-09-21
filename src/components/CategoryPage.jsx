import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategory, imageUrl } from '../services/api';
import ProductCard from './ProductCard';
import Custom from '../pages/Custom';
import CategoryHero from './CategoryHero';
import CategoryHeroVideo from './CategoryHeroVideo';
import { categoryConfigs } from '../data/categories';
import SeoHead from './SeoHead';

const normalizeData = (slug) => {
  const config = categoryConfigs[slug];
  if (!config) return null;
  const { name, heroDescription, gradient, accent, featured = {}, products = [] } = config;
  return {
    name,
    description: heroDescription,
    gradient,
    accent,
    featured,
    products,
  };
};

const defaultGradient = 'from-indigo-600 via-indigo-500 to-blue-500';
const defaultAccent = {
  check: 'text-indigo-500',
  chip: 'bg-indigo-100 text-indigo-700',
  button: 'bg-indigo-600 hover:bg-indigo-700',
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

const getSportHighlights = (sportName) => {
  const defaults = {
    fabric: 'Moisture-Wicking',
    printing: '4K Sublimation',
    moq: '10 Kits',
    dispatch: 'Worldwide Express'
  };

  const key = sportName.toLowerCase();
  if (key.includes('football') || key.includes('soccer')) {
    return {
      fabric: 'Dri-FIT Polyester',
      printing: '4K Sublimation',
      moq: '10 Kits',
      dispatch: 'Worldwide Express'
    };
  }
  if (key.includes('wrestling')) {
    return {
      fabric: '4-Way Stretch Lycra',
      printing: 'Double-Stitch Sublimation',
      moq: '10 Singlets',
      dispatch: 'Worldwide Express'
    };
  }
  if (key.includes('cricket')) {
    return {
      fabric: 'Breathable Dry-Fit Mesh',
      printing: 'Vibrant Sublimation',
      moq: '10 Kits',
      dispatch: 'Worldwide Express'
    };
  }
  if (key.includes('basketball')) {
    return {
      fabric: 'Pro-Mesh Athletic Fabric',
      printing: 'Sublimated Print',
      moq: '10 Kits',
      dispatch: 'Worldwide Express'
    };
  }
  if (key.includes('gym') || key.includes('running') || key.includes('fitness')) {
    return {
      fabric: 'Ultra-Light Anti-Chafe',
      printing: 'Reflective/Sublimated',
      moq: '10 Items',
      dispatch: 'Worldwide Express'
    };
  }
  if (key.includes('shoes')) {
    return {
      fabric: 'Breathable Mesh / Rubber',
      printing: 'Molded Branding',
      moq: '10 Pairs',
      dispatch: 'Worldwide Express'
    };
  }
  if (key.includes('gloves')) {
    return {
      fabric: 'Silicone Grip & Lycra',
      printing: 'High-Density Print',
      moq: '10 Pairs',
      dispatch: 'Worldwide Express'
    };
  }
  if (key.includes('caps')) {
    return {
      fabric: 'Premium Cotton/Twill',
      printing: '3D Embroidery',
      moq: '10 Caps',
      dispatch: 'Worldwide Express'
    };
  }
  if (key.includes('bags')) {
    return {
      fabric: 'Water-Resistant Cordura',
      printing: 'Embroidered/Screened',
      moq: '10 Bags',
      dispatch: 'Worldwide Express'
    };
  }
  return defaults;
};

const CategoryPage = ({ slug }) => {
  const fallbackConfig = useMemo(() => normalizeData(slug), [slug]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getCategory(slug)
      .then((d) => {
        if (!mounted) return;
        setData({
          ...d,
          heroVideo: d.heroVideo || fallbackConfig?.heroVideo || '',
          heroBadge: d.heroBadge || fallbackConfig?.heroBadge || '',
          description: d.description || fallbackConfig?.description || fallbackConfig?.heroDescription,
          gradient: d.gradient || fallbackConfig?.gradient,
          accent: d.accent || fallbackConfig?.accent,
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
    gradient,
    accent = {},
    heroVideo = '',
    heroBadge = '',
    featured,
    products = [],
  } = data;

  const resolvedGradient = gradient || fallbackConfig?.gradient || defaultGradient;
  const resolvedAccent = {
    ...defaultAccent,
    ...(fallbackConfig?.accent || {}),
    ...accent,
  };

  const checkClass = resolvedAccent.check || defaultAccent.check;
  const chipClass = resolvedAccent.chip || defaultAccent.chip;
  const buttonClass = resolvedAccent.button || defaultAccent.button;

  const cleanSport = name.replace(/( Kits & Apparel| Singlets & Gear| Apparel & Accessories| & Training Gear| & Footwear| & Hand Protection| & Headwear| & Gear Packs)/gi, '');
  const pageTitle = fallbackConfig?.seoTitle || `Custom ${cleanSport} Uniforms & Sportswear USA | Zarko Sportswear`;
  const pageDescription = fallbackConfig?.seoDescription || `Looking for custom uniform USA? Design & buy premium custom ${cleanSport.toLowerCase()} sportswear, jerseys, and team wear. Top quality, quick ship options, and custom gear for teams and businesses.`;

  const pageKeywords = fallbackConfig?.seoKeywords || [
    `custom sportswear USA`,
    `custom sports apparel usa`,
    `custom sportswear manufacturer usa`,
    `${cleanSport.toLowerCase()} sportswear factory`,
    `${cleanSport.toLowerCase()} sportswear supplier`,
    `private label ${cleanSport.toLowerCase()} sportswear`,
    `custom ${cleanSport.toLowerCase()} teamwear manufacturer`,
    `custom sportswear company`,
    `custom sportswear apparel`,
    `custom uniform USA`,
    `custom uniform usa ${cleanSport.toLowerCase()}`,
    `custom uniform usa ${cleanSport.toLowerCase()} jersey`,
    `custom uniform usa ${cleanSport.toLowerCase()} team`,
    `custom uniform usa gear`,
    `custom uniform usa for sale`,
    `custom uniform usa quick ship`,
    `custom uniform usa quality`,
    `custom ${cleanSport.toLowerCase()} sportswear`,
    `custom ${cleanSport.toLowerCase()} uniforms`,
    `design ${cleanSport.toLowerCase()} jerseys USA`
  ].join(', ');

  const mainSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': pageTitle,
    'description': pageDescription,
    'url': `https://www.zarkosportswear.com/${slug}`,
    'about': {
      '@type': 'Thing',
      'name': `Custom ${cleanSport} Sportswear`
    },
    'provider': {
      '@type': 'LocalBusiness',
      'name': 'Zarko Sportswear',
      'image': 'https://www.zarkosportswear.com/logo.png',
      'address': {
        '@type': 'PostalAddress',
        'addressCountry': 'US'
      }
    }
  };

  const technicalSpecs = fallbackConfig?.technicalSpecs;
  const jsonLd = technicalSpecs ? [
    mainSchema,
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      'name': pageTitle,
      'description': pageDescription,
      'image': `https://www.zarkosportswear.com${featured?.image || products[0]?.image || '/images/placeholder.jpg'}`,
      'brand': {
        '@type': 'Brand',
        'name': 'Zarko Sportswear'
      },
      'offers': {
        '@type': 'AggregateOffer',
        'priceCurrency': 'USD',
        'lowPrice': '15.00',
        'highPrice': '45.00',
        'offerCount': '10',
        'priceRange': '$$',
        'eligibleQuantity': {
          '@type': 'QuantitativeValue',
          'value': parseInt(technicalSpecs.moq) || 15,
          'unitCode': 'C62'
        }
      },
      'material': technicalSpecs.fabric,
      'productionDate': '2025'
    }
  ] : mainSchema;

  return (
    <main className="bg-slate-50/50 min-h-screen">
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

      {/* ── FULL-WIDTH CINEMATIC 3D HERO SECTION (Spanning 100% viewport width) ── */}
      <section className="w-full bg-[#0A0C16] text-white relative overflow-hidden py-12 sm:py-16 lg:py-20 border-b border-white/10">
        {/* Background Ambient Spotlight Glows */}
        <div className="absolute top-[10%] left-[15%] w-[450px] h-[450px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[15%] w-[450px] h-[450px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none" />

        <div className="max-w-[94%] mx-auto px-4 lg:px-6 relative z-10">
          
          {/* Top Headline & Category Badge Header */}
          <div className="mb-10 lg:mb-14 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-indigo-400 backdrop-blur-md mb-3 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{heroBadge || `Official ${cleanSport} 3D Uniform Spotlight • Factory Direct`}</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none mt-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Custom <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">{cleanSport}</span> Uniforms & Gear
            </h1>
            
            <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-300 font-medium max-w-3xl leading-relaxed">
              {description || featured?.description || `Engineered for high-intensity competitive play. Custom ${cleanSport.toLowerCase()} uniforms featuring premium dry-fit fabric, 4K sublimation printing, and factory-direct USD wholesale pricing.`}
            </p>
          </div>

          {/* Dual Column Grand 3D Stage & Technical Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT / CENTER: FULL-SCALE 3D SCROLL-CONTROLLED WEBM VIDEO ARENA */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <CategoryHeroVideo
                videoUrl={heroVideo}
                featuredImage={featured?.image || products[0]?.image}
                sportName={cleanSport || name}
                slug={slug}
                badgeText={heroBadge}
                className="h-[440px] sm:h-[520px] lg:h-[580px]"
              />
            </div>

            {/* RIGHT COLUMN: SPECS, COMPLIANCE & CTAs */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* 4 Specifications / Highlights Glass Cards */}
              {(() => {
                const highlights = getSportHighlights(cleanSport);
                return (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4 space-y-1 hover:border-indigo-500/40 transition">
                      <div className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider">Fabric Tech</div>
                      <div className="text-sm font-black text-white">{highlights.fabric}</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4 space-y-1 hover:border-indigo-500/40 transition">
                      <div className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider">Printing</div>
                      <div className="text-sm font-black text-white">{highlights.printing}</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4 space-y-1 hover:border-indigo-500/40 transition">
                      <div className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider">Min Order (MOQ)</div>
                      <div className="text-sm font-black text-white">{highlights.moq}</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4 space-y-1 hover:border-indigo-500/40 transition">
                      <div className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider">Dispatch</div>
                      <div className="text-sm font-black text-white">{highlights.dispatch}</div>
                    </div>
                  </div>
                );
              })()}

              {/* Technical B2B Specifications Details */}
              {technicalSpecs && (
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 space-y-3">
                  <div className="text-xs font-black text-indigo-300 uppercase tracking-widest flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-indigo-400" />
                    Technical B2B Manufacturing Specs
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-xs">
                    {technicalSpecs.fabric && (
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-slate-400 font-medium">Fabric</span>
                        <span className="text-white font-bold text-right max-w-[60%]">{technicalSpecs.fabric}</span>
                      </div>
                    )}
                    {technicalSpecs.printing && (
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-slate-400 font-medium">Customization</span>
                        <span className="text-white font-bold text-right max-w-[60%]">{technicalSpecs.printing}</span>
                      </div>
                    )}
                    {technicalSpecs.compliance && (
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-slate-400 font-medium">Compliance</span>
                        <span className="text-indigo-400 font-bold text-right max-w-[60%]">{technicalSpecs.compliance}</span>
                      </div>
                    )}
                    {technicalSpecs.moq && (
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-slate-400 font-medium">MOQ Limit</span>
                        <span className="text-white font-bold text-right max-w-[60%]">{technicalSpecs.moq}</span>
                      </div>
                    )}
                    {technicalSpecs.shipping && (
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-slate-400 font-medium">US Shipping</span>
                        <span className="text-emerald-400 font-bold text-right max-w-[60%]">{technicalSpecs.shipping}</span>
                      </div>
                    )}
                    {technicalSpecs.sizing && (
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-slate-400 font-medium">Size Range</span>
                        <span className="text-white font-bold text-right max-w-[60%]">{technicalSpecs.sizing}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to={`/custom?product=${encodeURIComponent(name)}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 text-xs font-black uppercase tracking-wider shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02]"
                >
                  <span>Request 3D Mockup</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>
                
                <a
                  href={`https://wa.me/923039220750?text=${encodeURIComponent(`Hi, I'm interested in ordering custom ${cleanSport} uniforms from Zarko Sportswear. Please share a B2B catalog and bulk price list.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 text-xs font-black uppercase tracking-wider shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02]"
                >
                  <span>WhatsApp Quote</span>
                </a>
                
                <a
                  href="#related-products"
                  className="inline-flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 px-5 py-3 text-xs font-bold uppercase tracking-wider transition-all"
                >
                  View Catalog ↓
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Trust Indicators Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/10 text-xs font-bold text-slate-300">
            <div className="flex items-center gap-2.5">
              <span className="text-indigo-400 text-base">🚚</span>
              <span>3–5 Days Express DHL Shipping</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-emerald-400 text-base">🛡️</span>
              <span>NFHS & NCAA Rule Compliant</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-purple-400 text-base">🎨</span>
              <span>Free Custom 3D Artwork Mockups</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-amber-400 text-base">⭐</span>
              <span>Factory Direct Sialkot Wholesale</span>
            </div>
          </div>

        </div>
      </section>

      {/* ── MAIN CONTENT CONTAINER (Catalog & Forms) ── */}
      <div className="mx-auto max-w-[94%] px-6 py-8">

        {/* RELATED PRODUCTS GRID */}
        <section id="related-products" className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">Explore Collection</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {name} Designs & Sets
              </h2>
            </div>
            <span className="text-xs font-bold text-slate-400 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
              {products.length} Items Available
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product, index) => (
              <ProductCard
                key={product.id || `${product.name}-${index}`}
                image={product.image}
                name={product.name}
                description={product.description}
                price={product.price}
                discount={product.discount}
              />
            ))}
          </div>
        </section>

        <section className="mt-24">
          <SectionTitle
            eyebrow="Custom lab"
            title="Need something fully bespoke?"
            description="Share your concept, tech packs, or references and our product team will engineer export-grade samples."
          />
          <div className="mt-8">
            <Custom isEmbedded={true} />
          </div>
        </section>

        {/* DYNAMIC FAQ SECTION */}
        <CategoryFaq slug={slug} cleanSport={cleanSport} />

        {/* SEO RICH CONTENT SECTION */}
        <section className="mt-20 border-t border-slate-100 pt-16">
          <div className="text-slate-700 space-y-6 w-full">
            <h3 className="text-2xl font-bold text-slate-900">
              Premium Custom {cleanSport} Uniforms & Gear in the USA
            </h3>
            <p className="text-sm sm:text-base leading-relaxed">
              At Zarko Sportswear, we specialize in designing and manufacturing top-tier custom {cleanSport.toLowerCase()} uniforms and sportswear tailored to the needs of professional teams, local clubs, schools, and corporate groups across the United States. Utilizing advanced sublimation printing techniques, we ensure your designs, team logos, and player numbers are permanently fused into the fabric, preventing any peeling, cracking, or fading over time.
            </p>
            <p className="text-sm sm:text-base leading-relaxed">
              Our custom {cleanSport.toLowerCase()} sportswear is engineered with high-performance, moisture-wicking materials designed to keep athletes dry, cool, and comfortable during intense training sessions and high-stakes matches. With quick-ship options available throughout the USA, we deliver premium quality athletic gear directly to your doorstep. Fill out our custom lab inquiry form above to receive a design mockup and personalized quote for your team bundle today.
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

  if (key.includes('shoes')) {
    return [
      {
        question: "Are the custom shoes suitable for turf and indoor athletic play?",
        answer: "Yes, our custom shoes feature vulcanized rubber traction outsoles, molded branding slots, and breathable mesh linings perfect for athletic turf or everyday team training."
      },
      {
        question: "What customization options are available for shoes?",
        answer: "You can fully customize the base colors, laces, side logos, and tongues with your team crests. Custom sizing ranges from US Youth 1 to Adult Mens 15."
      },
      {
        question: "What is the MOQ for custom footwear orders?",
        answer: "Due to custom sole molds, our minimum order quantity for custom shoes starts at 50 pairs per design layout."
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
    <section className="mt-20 border-t border-slate-100 pt-16">
      <div className="text-center mb-12">
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-indigo-600 block">
          FAQ Section
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-950 mt-2">
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
              <div key={actualIndex} className="border border-slate-200 bg-white rounded-none">
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
              <div key={actualIndex} className="border border-slate-200 bg-white rounded-none">
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

