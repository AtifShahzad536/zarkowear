import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiChevronUp, FiChevronDown, FiCheck } from 'react-icons/fi';
import { FaArrowRight } from 'react-icons/fa';
import { getCategories, imageUrl } from '../../services/api';

const TOP_CATEGORIES = [
  {
    id: 'football',
    slug: 'football',
    name: 'Football',
    tag: '1999',
    eyebrow: 'GRIDIRON PRO SERIES',
    title: 'FOOTBALL UNIFORMS',
    watermark: 'FOOTBALL',
    productName: 'Championship American Football Game Uniform',
    productSubtitle: 'Heavyweight Dazzle Interlock with Double-Ply Pad Yoke',
    defaultImage: '/images/hero_football.webp',
    description:
      'Engineered for maximum tackle tear-resistance and speed. Features reinforced double-ply shoulder yoke for pad clearance, spandex flex side inserts, and integrated pad pants for high school, college, and semi-pro football programs.',
    link: '/football',
    specs: ['240-260 GSM Dazzle Interlock', 'Double-Ply Shoulder Yoke', 'Spandex Flex Panels', 'DDP USA Express']
  },
  {
    id: 'baseball',
    slug: 'baseball',
    name: 'Baseball',
    tag: '1985',
    eyebrow: 'WORLDWIDE OEM',
    title: 'BASEBALL GEAR',
    watermark: 'BASEBALL',
    productName: 'Legend Baseball Jersey Pro',
    productSubtitle: '250 GSM Double-Knit Polyester with Piped Front & Tackle Twill',
    defaultImage: '/images/sports/baseball.webp',
    description:
      'Zarko Sportswear manufactures pro-spec baseball jerseys and uniform sets for high schools, travel leagues, and clubs. Engineered with heavy 250 GSM double-knit polyester, reinforced button plackets, moisture-transport weave, and authentic tackle-twill embroidery.',
    link: '/baseball',
    specs: ['250 GSM Double Knit', 'NFHS Compliant', 'Tackle Twill & Sublimation', '15-Set MOQ']
  },
  {
    id: 'soccer',
    slug: 'soccer',
    name: 'Soccer',
    tag: '2014',
    eyebrow: 'PRO MATCHDAY KITS',
    title: 'SOCCER UNIFORMS',
    watermark: 'SOCCER',
    productName: 'Pro Matchday Sublimated Soccer Kit',
    productSubtitle: '160 GSM Dri-FIT Micro-Interlock Matchday Set',
    defaultImage: '/images/sports/soccer.webp',
    description:
      'Ultra-breathable Dri-FIT sublimated matchday sets engineered for competitive club play. Features dynamic anti-chafing flatlock seams, micro-mesh heat exhaust zones, and vibrant 4K Italian dye-sublimation.',
    link: '/soccer',
    specs: ['160 GSM Dri-FIT Interlock', '4K Italian Sublimation', 'Ergonomic Athletic Fit', '10-12 Days Production']
  },
  {
    id: 'softball',
    slug: 'softball',
    name: 'Softball',
    tag: '2020',
    eyebrow: 'FASTPITCH TOURNAMENT',
    title: 'SOFTBALL UNIFORMS',
    watermark: 'SOFTBALL',
    productName: 'Fastpitch Pro Softball Uniform Set',
    productSubtitle: 'High-Flex Women & Youth Cut with Reinforced Sliding Panels',
    defaultImage: '/images/sports/softball.webp',
    description:
      'Tailored fastpitch softball cut designed specifically for high mobility and sliding protection. Crafted with reinforced knee and hip zones, fade-proof full digital sublimation, and ultra-durable stretch stitching.',
    link: '/softball',
    specs: ['Tailored Fastpitch Cut', 'Reinforced Sliding Zones', 'Full Sublimation Inks', '15 Sets MOQ']
  },
  {
    id: 'volleyball',
    slug: 'volleyball',
    name: 'Volleyball',
    tag: '2023',
    eyebrow: 'COURT AGILITY SERIES',
    title: 'VOLLEYBALL SETS',
    watermark: 'VOLLEYBALL',
    productName: 'Elite High-Performance Volleyball Kit',
    productSubtitle: 'Featherweight 4-Way Stretch with Anti-Chafe Construction',
    defaultImage: '/images/sports/volleyball.webp',
    description:
      'Featherweight, moisture-evaporating volleyball jerseys and spandex shorts engineered for explosive vertical jumps, court dives, and swift lateral movement. Treated with anti-microbial fabric finish.',
    link: '/volleyball',
    specs: ['4-Way Stretch Spandex Blend', 'Featherweight Heat-Release', 'Anti-Chafe Flatlock Seams', 'Custom Team Logos']
  },
  {
    id: 'icehockey',
    slug: 'ice-hockey',
    name: 'Ice Hockey',
    tag: '2026',
    eyebrow: 'HEAVYWEIGHT TEAMWEAR',
    title: 'HOCKEY UNIFORMS',
    watermark: 'HOCKEY',
    productName: 'Pro Hockey Kit Elite Teamwear',
    productSubtitle: 'Abrasion-Resistant Pro Mesh with Fight-Strap Option',
    defaultImage: '/images/sports/ice-hockey.webp',
    description:
      'Built to withstand aggressive boards, ice abrasion, and extreme play. Features heavy pro-mesh weave, underarm ventilation inserts, pad-clearance elbows, and optional authentic sewn fight-straps.',
    link: '/ice-hockey',
    specs: ['Heavy Pro-Mesh Fabric', 'Fight-Strap Construction', 'Reinforced Elbow Yoke', 'Worldwide Express']
  }
];

const TopSellingProducts = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    getCategories()
      .then(data => {
        if (Array.isArray(data)) {
          setCategoriesData(data);
        }
      })
      .catch((err) => {
        console.error('Failed to load categories for Top showcase:', err);
      });
  }, []);

  const activeSport = TOP_CATEGORIES[activeIndex];

  // Match the category from backend database
  const currentDbCategory = categoriesData.find(c => 
    c.slug?.toLowerCase() === activeSport.slug?.toLowerCase() ||
    c.slug?.toLowerCase() === activeSport.id?.toLowerCase()
  );

  // Extract the 1st product from DB for this category
  const firstProduct = (currentDbCategory?.products && currentDbCategory.products.length > 0)
    ? currentDbCategory.products[0]
    : null;

  // Resolve Product Image: use 1st product image from DB if present, else fallback
  const activeImage = firstProduct?.image
    ? imageUrl(firstProduct.image, { width: 1200, quality: 'auto:best' })
    : activeSport.defaultImage;

  // Resolve Product Name: use 1st product name from DB, else fallback
  const activeProductName = firstProduct?.name
    ? firstProduct.name
    : activeSport.productName;

  // Resolve Product Subtitle: use 1st product description (trimmed) from DB, else fallback
  const activeProductSubtitle = firstProduct?.description
    ? (firstProduct.description.trim().length > 70 
        ? firstProduct.description.trim().slice(0, 70) + '...' 
        : firstProduct.description.trim())
    : activeSport.productSubtitle;

  // View link: if product has an id, can view detail, otherwise category page
  const productViewLink = firstProduct?.id
    ? `/detail?product=${encodeURIComponent(firstProduct.id)}`
    : activeSport.link;

  const handlePrev = () => {
    setActiveIndex(prev => (prev === 0 ? TOP_CATEGORIES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev === TOP_CATEGORIES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full py-16 sm:py-24 bg-white relative overflow-hidden border-b border-slate-200">
      <div className="max-w-[94%] xl:max-w-7xl 2xl:max-w-[1440px] mx-auto px-4">
        
        {/* Main 3-Column / Timeline Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Column 1: Vertical Timeline / Category Selector (Lg: 3 cols) */}
          <div className="lg:col-span-3 flex lg:flex-col items-center lg:items-start justify-between lg:justify-center relative">
            
            {/* Vertical Guide Line */}
            <div className="hidden lg:block absolute left-[15px] top-6 bottom-16 w-[1.5px] bg-slate-200 -z-0" />

            {/* Timeline Items */}
            <div className="flex flex-wrap lg:flex-col gap-3 lg:gap-6 relative z-10 w-full">
              {TOP_CATEGORIES.map((sport, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={sport.id}
                    onClick={() => setActiveIndex(idx)}
                    className="flex items-center gap-3.5 group text-left transition-all duration-300 focus:outline-none cursor-pointer"
                  >
                    {/* Timeline Node Indicator */}
                    <div className="hidden lg:flex items-center justify-center w-[30px] shrink-0">
                      <div
                        className={`transition-all duration-300 rounded-full ${
                          isActive
                            ? 'w-3 h-3 bg-indigo-600 ring-4 ring-indigo-600/20 shadow-sm'
                            : 'w-2 h-2 bg-slate-300 group-hover:bg-slate-400'
                        }`}
                      />
                    </div>

                    {/* Tag / Category Pill */}
                    {isActive ? (
                      <span className="px-3.5 py-1.5 rounded-[5px] bg-slate-900 text-white font-black text-xs uppercase tracking-wider shadow-sm transition-all duration-300 flex items-center gap-1.5">
                        <span>{sport.name}</span>
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 uppercase tracking-wider transition-colors px-2 py-1">
                        {sport.name}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Timeline Navigation Chevrons */}
            <div className="hidden lg:flex items-center gap-2 mt-10 ml-1 relative z-10">
              <button
                onClick={handlePrev}
                aria-label="Previous Category"
                className="w-8 h-8 rounded-[5px] border border-slate-200 bg-white hover:bg-slate-100 flex items-center justify-center text-slate-700 shadow-2xs transition active:scale-95 cursor-pointer"
              >
                <FiChevronUp className="text-base" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Category"
                className="w-8 h-8 rounded-[5px] border border-slate-200 bg-white hover:bg-slate-100 flex items-center justify-center text-slate-700 shadow-2xs transition active:scale-95 cursor-pointer"
              >
                <FiChevronDown className="text-base" />
              </button>
            </div>
          </div>

          {/* Column 2: Story, Headline, and Description with Giant Ghost Watermark (Lg: 5 cols) */}
          <div className="lg:col-span-5 relative z-10 text-left">
            {/* Giant Ghost Watermark (SVG vector graphic - decorative background artwork exempt from color-contrast rules) */}
            <div className="absolute -left-6 lg:-left-12 top-1/2 -translate-y-1/2 select-none pointer-events-none -z-10 leading-none overflow-hidden w-[600px] sm:w-[850px] lg:w-[1000px] max-w-none" aria-hidden="true">
              <svg
                viewBox="0 0 1200 240"
                className="w-full h-auto block select-none pointer-events-none"
                aria-hidden="true"
                role="presentation"
                focusable="false"
              >
                <text
                  x="0"
                  y="185"
                  fill="#e2e8f0"
                  fillOpacity="0.5"
                  fontWeight="900"
                  fontSize="200"
                  letterSpacing="-0.04em"
                  className="uppercase font-black"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {activeSport.watermark}
                </text>
              </svg>
            </div>

            {/* Small Eyebrow Tag */}
            <span className="text-xs font-black text-indigo-600 tracking-[0.25em] uppercase block mb-2">
              {activeSport.eyebrow}
            </span>

            {/* Main Headline */}
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-[#0B132B] tracking-tight uppercase leading-[1.05]"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {activeSport.title}
            </h2>

            {/* Descriptive Paragraph */}
            <p className="mt-4 sm:mt-5 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-lg">
              {activeSport.description}
            </p>

            {/* Key Technical Specs Chips */}
            <div className="grid grid-cols-2 gap-2 mt-6 max-w-md">
              {activeSport.specs.map(spec => (
                <div key={spec} className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700">
                  <FiCheck className="text-indigo-600 shrink-0 text-xs" />
                  <span className="truncate">{spec}</span>
                </div>
              ))}
            </div>

            {/* Action CTA Button */}
            <div className="mt-8 flex items-center gap-5">
              <Link
                to={activeSport.link}
                aria-label={`See more custom ${activeSport.name.toLowerCase()} uniforms and gear`}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-slate-900 hover:text-indigo-600 uppercase tracking-wider group transition-colors"
              >
                <span>SEE MORE {activeSport.name}</span>
                <FiChevronDown className="text-base group-hover:translate-y-0.5 transition-transform" />
              </Link>

              <Link
                to={activeSport.link}
                aria-label={`Explore custom ${activeSport.name.toLowerCase()} collection`}
                className="px-4 py-2 bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold rounded-[5px] uppercase tracking-wider transition-colors shadow-sm inline-flex items-center gap-1.5"
              >
                <span>Explore Collection</span>
                <FaArrowRight className="text-[10px]" />
              </Link>
            </div>
          </div>

          {/* Column 3: Featured First Product Showcase - Card removed, pure clean image with View button */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSport.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="w-full flex flex-col items-center justify-center"
              >
                {/* Product Image without Card Container */}
                <Link
                  to={productViewLink}
                  aria-label={`View ${activeProductName} specifications and custom quote`}
                  className="w-full flex items-center justify-center p-2 relative group cursor-pointer"
                  title={`View ${activeProductName}`}
                >
                  <img
                    src={activeImage}
                    alt={activeProductName}
                    title={activeProductName}
                    loading="lazy"
                    className="w-full h-auto max-h-[360px] sm:max-h-[400px] object-contain transform group-hover:scale-105 transition-transform duration-500 ease-out filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.09)]"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/placeholder.jpg"; }}
                  />
                </Link>

                {/* Just Below Image: Product Name & View Button */}
                <div className="mt-3 flex flex-col items-center text-center gap-2.5">
                  <h3
                    className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-wide truncate max-w-xs"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {activeProductName}
                  </h3>
                  <Link
                    to={productViewLink}
                    aria-label={`View ${activeProductName} details and pricing`}
                    className="px-6 py-2.5 bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold rounded-[5px] uppercase tracking-wider transition-all shadow-sm hover:shadow-md inline-flex items-center gap-2 group active:scale-95"
                  >
                    <span>View Product</span>
                    <FaArrowRight className="text-[10px] group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TopSellingProducts;


