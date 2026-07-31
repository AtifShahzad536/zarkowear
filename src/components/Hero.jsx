import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaChevronLeft, 
  FaChevronRight,
  FaFootballBall, 
  FaBasketballBall,
  FaRunning,
  FaInstagram,
  FaFacebookF,
  FaWhatsapp
} from 'react-icons/fa';
import { GiCricketBat, GiWeightLiftingUp } from 'react-icons/gi';
import { FiAward, FiWind, FiFeather, FiInfo, FiSliders, FiMail } from 'react-icons/fi';

// Premium products definition (5 items)
const PRODUCTS = [
  {
    id: 'football',
    category: 'Football',
    name: 'Elite Football Jersey',
    tagline: 'Football Gear',
    description: 'Engineered using export-grade lightweight micro-polyester with advanced sweat-wicking properties. Features custom sublimation printing, heat-pressed logos, and double-stitched reinforcements for ultimate comfort and durability during high-intensity football matches.',
    image: '/images/hero_football.png',
    link: '/football',
    icon: FaFootballBall,
  },
  {
    id: 'basketball',
    category: 'Basketball',
    name: 'Pro Basketball Jersey',
    tagline: 'Basketball Gear',
    description: 'Crafted with high-ventilation mesh knit fabric designed to maximize airflow and keep athletes cool. Offers an optimized sleeveless cut for absolute arm mobility, combined with moisture-control technology to handle sweat on the court.',
    image: '/images/hero_basketball.png',
    link: '/basketball',
    icon: FaBasketballBall,
  },
  {
    id: 'wrestling',
    category: 'Wrestling',
    name: 'Elite Wrestling Singlet',
    tagline: 'Wrestling Gear',
    description: 'A professional-grade singlet constructed from heavy-duty 4-way stretch spandex. Offers compression support, reinforced flatlock seams to prevent chafing, and integrated anti-slip silicone leg grips to keep the singlet locked in place.',
    image: '/images/hero_wrestling.png',
    link: '/wrestling',
    icon: FaRunning,
  },
  {
    id: 'cricket',
    category: 'Cricket',
    name: 'Premium Cricket Jersey',
    tagline: 'Cricket Gear',
    description: 'Designed for long matches in the heat, featuring strategically placed mesh ventilation panels and UV-shielding fabric. The ultra-lightweight fabric allows free body rotation for batsmen and bowlers alike while keeping you cool.',
    image: '/images/hero_cricket.png',
    link: '/cricket',
    icon: GiCricketBat,
  },
  {
    id: 'gym',
    category: 'Gym',
    name: 'Performance Gym Hoodie',
    tagline: 'Gym Gear',
    description: 'The ultimate workout layering piece made of an ultra-soft fleeced flex fabric. Features moisture-wicking technology, a structured adjustable hood, utility zip pockets, and ergonomic stitching built to support stretching, lifting, and outdoor running.',
    image: '/images/hero_gym.png',
    link: '/gym',
    icon: GiWeightLiftingUp,
  }
];

const STEPS = [
  'Design & Sketching - Creating custom sublimation concepts & blueprint layouts',
  'Fabric Sourcing - Sourcing premium export-grade dry-fit, spandex & flex fleece',
  'Laser Cutting - Precision automated laser panel cutting for accurate sizing',
  'Sublimation Printing - High-definition ink transfers directly into fabric fibers',
  'Premium Sewing - Double-reinforced flatlock stitching for lifetime durability',
  'Quality Control - Multi-point manual inspection, labeling, and packaging'
];

const Hero = () => {
  const navigate = useNavigate();
  // Wrestling at index 2 is the default center product
  const [activeIndex, setActiveIndex] = useState(2);
  const [screenSize, setScreenSize] = useState('desktop');
  const [showPopup, setShowPopup] = useState(false);
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const autoplayTimerRef = useRef(null);
  const pauseTimerRef = useRef(null);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % STEPS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const seenModal = sessionStorage.getItem('seenManufacturingRules');
    if (!seenModal) {
      const timer = setTimeout(() => {
        setShowPromoModal(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClosePromoModal = () => {
    setShowPromoModal(false);
    sessionStorage.setItem('seenManufacturingRules', 'true');
  };

  useEffect(() => {
    setShowPopup(false);
  }, [activeIndex]);

  // Responsive screen size helper
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setScreenSize('mobile');
      } else if (window.innerWidth < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Autoplay Logic
  const startAutoplay = () => {
    if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    autoplayTimerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PRODUCTS.length);
    }, 4000);
  };

  useEffect(() => {
    if (!isAutoplayPaused) {
      startAutoplay();
    }
    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [isAutoplayPaused]);

  // Handle Category click / navigation controls
  const handleCategorySelect = (index) => {
    setActiveIndex(index);
    // Pause autoplay for 8 seconds
    setIsAutoplayPaused(true);
    if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);

    pauseTimerRef.current = setTimeout(() => {
      setIsAutoplayPaused(false);
    }, 8000);
  };

  const handleNext = () => {
    handleCategorySelect((activeIndex + 1) % PRODUCTS.length);
  };

  const handlePrev = () => {
    handleCategorySelect((activeIndex - 1 + PRODUCTS.length) % PRODUCTS.length);
  };

  const activeProduct = PRODUCTS[activeIndex];

  const productSpecs = useMemo(() => {
    switch (activeProduct.id) {
      case 'football':
        return { fabric: 'Dry-Fit Polyester', fit: 'Regular Athletic', tech: 'Sweat-Wicking', quality: 'Export Grade' };
      case 'basketball':
        return { fabric: 'Elite Mesh Knit', fit: 'Sleeveless Loose', tech: 'Max-Breathable', quality: 'Pro Standard' };
      case 'wrestling':
        return { fabric: '4-Way Spandex', fit: 'Compressive Fit', tech: 'Anti-Slip Grips', quality: 'Tournament Grade' };
      case 'cricket':
        return { fabric: 'AeroMesh Poly', fit: 'Regular Protective', tech: 'UV Protection', quality: 'Premium Finish' };
      case 'gym':
        return { fabric: 'Flex Cotton Blend', fit: 'Semi-Fit Cozy', tech: 'Moisture Control', quality: 'Heavy Fleece' };
      default:
        return { fabric: 'Premium Knit', fit: 'Standard Fit', tech: 'Performance', quality: 'Standard' };
    }
  }, [activeProduct]);

  // Dynamic spacing for full width V shape
  const spacingX = screenSize === 'mobile' ? 55 : screenSize === 'tablet' ? 110 : 170;
  const spacingY = screenSize === 'mobile' ? 18 : screenSize === 'tablet' ? 30 : 50;

  return (
    <section className="w-full min-h-[90vh] lg:min-h-screen relative overflow-hidden bg-white flex flex-col justify-between pt-20 pb-8 select-none">
      <style>{`
        @keyframes energy-ray-spin-cw {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.06); }
          100% { transform: rotate(360deg) scale(1); }
        }
        @keyframes energy-ray-spin-ccw {
          0% { transform: rotate(360deg) scale(1); }
          50% { transform: rotate(180deg) scale(0.94); }
          100% { transform: rotate(0deg) scale(1); }
        }
        .animate-energy-spin-cw {
          animation: energy-ray-spin-cw 12s linear infinite;
        }
        .animate-energy-spin-ccw {
          animation: energy-ray-spin-ccw 15s linear infinite;
        }
      `}</style>

      {/* Background Spotlight Glow & Ray Beams */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Glow behind center */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[300px] md:w-[550px] h-[90px] bg-slate-50/60 blur-[75px] rounded-full" />
        
        {/* Linear gradient light ray beams forming V shape */}
        <div className="absolute top-0 bottom-[20%] left-1/2 -translate-x-1/2 w-[600px] h-full">
          {/* Left angled ray */}
          <div className="absolute bottom-[28%] right-1/2 w-[90px] md:w-[130px] h-[380px] md:h-[520px] bg-gradient-to-t from-indigo-500/10 via-indigo-500/5 to-transparent origin-bottom rotate-[-26deg] blur-[6px]" />
          {/* Right angled ray */}
          <div className="absolute bottom-[28%] left-1/2 w-[90px] md:w-[130px] h-[380px] md:h-[520px] bg-gradient-to-t from-indigo-500/10 via-indigo-500/5 to-transparent origin-bottom rotate-[26deg] blur-[6px]" />
          {/* Center glow beam */}
          <div className="absolute bottom-[28%] left-1/2 -translate-x-1/2 w-[160px] md:w-[220px] h-[400px] md:h-[540px] bg-gradient-to-t from-indigo-500/15 via-indigo-500/5 to-transparent blur-[16px]" />
        </div>

        {/* Glow Ring under active product */}
        <div className="absolute top-[35%] md:top-[32%] left-1/2 -translate-x-1/2 w-44 md:w-[260px] h-6 md:h-9 rounded-full border border-yellow-400/20 bg-yellow-400/5 shadow-[0_0_20px_rgba(234,179,8,0.2)] transform -rotate-[3deg]" />
      </div>

      {/* Top Center: Minimal Looping Manufacturing Steps */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStepIndex}
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 25 }}
            transition={{ duration: 0.4 }}
            className="flex items-center select-none"
          >
            {/* Step Circle */}
            <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-black text-black flex items-center justify-center text-[7px] sm:text-[9px] font-semibold mr-1.5 sm:mr-2.5 flex-shrink-0">
              {currentStepIndex + 1}
            </span>
            
            {/* Step Title Label */}
            <span className="text-[7.2px] sm:text-[9px] uppercase tracking-wide sm:tracking-wider font-medium text-black whitespace-nowrap">
              {STEPS[currentStepIndex]}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Sparkle Particles around active product area */}
      <div className="absolute inset-x-0 bottom-[28%] top-0 overflow-hidden pointer-events-none z-10">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-yellow-400/40 shadow-[0_0_8px_rgba(234,179,8,0.8)]"
            animate={{
              y: [0, -140],
              x: [0, (i % 2 === 0 ? 40 : -40) * Math.random()],
              opacity: [0, 0.8, 0],
              scale: [0.6, 1.3, 0.6]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.9,
              ease: "easeOut"
            }}
            style={{
              bottom: "22%",
              left: `calc(50% + ${(i - 1.5) * 50}px)`
            }}
          />
        ))}
      </div>

      {/* Absolute edge arrows next to screen border for clean placement */}
      <button 
        onClick={handlePrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full border border-gray-150 bg-white/80 hover:bg-white text-gray-500 hover:text-gray-800 transition active:scale-95 shadow-md flex items-center justify-center"
        aria-label="Previous product"
      >
        <FaChevronLeft className="text-xs" />
      </button>
      
      {/* Top-Left controls: Vertical action toolbar (Info + Builder + Contact) */}
      <div className="absolute left-8 top-24 z-30 flex flex-col gap-3">
        {/* Specs Details Button */}
        <button
          onClick={() => setShowPopup(!showPopup)}
          className={`w-11 h-11 rounded-full border flex items-center justify-center transition active:scale-95 shadow-md hover:shadow-lg cursor-pointer ${
            showPopup 
              ? 'bg-[#0A0C16] text-white border-[#0A0C16]' 
              : 'bg-white text-gray-500 hover:text-[#0A0C16] border-gray-150'
          }`}
          title="Product Specifications"
        >
          <FiInfo className="text-sm" />
        </button>

        {/* 3D Customizer / Builder Button */}
        <button
          onClick={() => navigate('/builder')}
          className="w-11 h-11 rounded-full border bg-white text-gray-500 hover:text-[#0A0C16] border-gray-150 flex items-center justify-center transition active:scale-95 shadow-md hover:shadow-lg cursor-pointer"
          title="3D Jersey Builder"
        >
          <FiSliders className="text-sm" />
        </button>

        {/* Contact Us Form Button */}
        <button
          onClick={() => navigate('/contact')}
          className="w-11 h-11 rounded-full border bg-white text-gray-500 hover:text-[#0A0C16] border-gray-150 flex items-center justify-center transition active:scale-95 shadow-md hover:shadow-lg cursor-pointer"
          title="Contact Us"
        >
          <FiMail className="text-sm" />
        </button>

        {/* Floating Details Popup: Left Side Glassmorphism */}
        <AnimatePresence>
          {showPopup && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -20 }}
              className="absolute left-14 top-0 z-40 w-[310px] bg-white/95 backdrop-blur-2xl border border-gray-150 p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] text-left"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-0.5">
                    <span className="text-[9px] uppercase tracking-[0.18em] font-extrabold text-[#0A0C16] block">
                      {activeProduct.tagline}
                    </span>
                    <h4 className="text-sm font-black text-gray-900 leading-tight tracking-tight uppercase">
                      {activeProduct.name}
                    </h4>
                  </div>
                  <button 
                    onClick={() => setShowPopup(false)}
                    className="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 transition"
                  >
                    ✕
                  </button>
                </div>
                
                <p className="text-[10px] text-gray-500 leading-relaxed font-medium">
                  {activeProduct.description}
                </p>

                <div className="border-t border-gray-100 my-2 pt-3">
                  <span className="text-[8px] uppercase tracking-wider font-extrabold text-gray-400 block mb-2">
                    SPECIFICATIONS
                  </span>
                  
                  {/* Premium Specs Grid */}
                  <div className="grid grid-cols-2 gap-2 text-[9px] font-medium text-gray-700">
                    <div className="bg-slate-50 p-2 rounded">
                      <span className="text-gray-400 block text-[7px] uppercase font-bold tracking-wider mb-0.5">Fabric</span>
                      {productSpecs.fabric}
                    </div>
                    <div className="bg-slate-50 p-2 rounded">
                      <span className="text-gray-400 block text-[7px] uppercase font-bold tracking-wider mb-0.5">Fit</span>
                      {productSpecs.fit}
                    </div>
                    <div className="bg-slate-50 p-2 rounded">
                      <span className="text-gray-400 block text-[7px] uppercase font-bold tracking-wider mb-0.5">Technology</span>
                      {productSpecs.tech}
                    </div>
                    <div className="bg-slate-50 p-2 rounded">
                      <span className="text-gray-400 block text-[7px] uppercase font-bold tracking-wider mb-0.5">Quality</span>
                      {productSpecs.quality}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setShowPopup(false);
                    navigate(activeProduct.link);
                  }}
                  className="w-full text-center py-2.5 bg-[#0A0C16] hover:bg-[#4338ca] text-white font-bold text-[9px] tracking-wider rounded-lg transition shadow-sm uppercase"
                >
                  GO TO SHOP
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right margin controls: Next Arrow */}
      <button 
        onClick={handleNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full border border-gray-150 bg-white/80 hover:bg-white text-gray-500 hover:text-gray-800 transition active:scale-95 shadow-md flex items-center justify-center"
        aria-label="Next product"
      >
        <FaChevronRight className="text-xs" />
      </button>

      {/* Top-Right controls: Vertical social media toolbar */}
      <div className="absolute right-8 top-24 z-30 flex flex-col gap-3">
        {/* Instagram Link */}
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-full border bg-white text-gray-500 hover:text-[#e1306c] border-gray-150 flex items-center justify-center transition active:scale-95 shadow-md hover:shadow-lg cursor-pointer"
          title="Instagram"
        >
          <FaInstagram className="text-sm" />
        </a>

        {/* Facebook Link */}
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-full border bg-white text-gray-500 hover:text-[#1877f2] border-gray-150 flex items-center justify-center transition active:scale-95 shadow-md hover:shadow-lg cursor-pointer"
          title="Facebook"
        >
          <FaFacebookF className="text-xs" />
        </a>

        {/* WhatsApp Link */}
        <a
          href="https://wa.me/923039200750"
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-full border bg-white text-gray-500 hover:text-[#25d366] border-gray-150 flex items-center justify-center transition active:scale-95 shadow-md hover:shadow-lg cursor-pointer"
          title="WhatsApp"
        >
          <FaWhatsapp className="text-sm" />
        </a>
      </div>

      {/* 1. Upper Section: Wide V-shape Products (Center and spacious at top) */}
      <div className="w-full relative flex-1 flex flex-col items-center justify-center min-h-[350px] md:min-h-[440px] z-10 px-8 pt-6">
        <div className="relative w-full h-full flex items-center justify-center">
          {PRODUCTS.map((prod, idx) => {
            let diff = idx - activeIndex;
            const N = PRODUCTS.length;
            if (diff > N / 2) diff -= N;
            if (diff <= -N / 2) diff += N;

            const isActive = diff === 0;
            const xPos = diff * spacingX;
            const yPos = -Math.abs(diff) * spacingY;
            const scaleVal = isActive ? 1.25 : 0.72 - Math.abs(diff) * 0.08;
            const opacityVal = isActive ? 1 : 0.35 - Math.abs(diff) * 0.05;
            const rotVal = diff * 6;

            return (
              <motion.div
                key={prod.id}
                style={{ zIndex: 10 - Math.abs(diff) }}
                animate={{
                  x: xPos,
                  y: yPos,
                  scale: scaleVal,
                  opacity: opacityVal,
                  rotate: rotVal,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 140,
                  damping: 22,
                  mass: 0.8
                }}
                onClick={() => handleCategorySelect(idx)}
                className={`absolute cursor-pointer select-none origin-bottom filter ${
                  isActive ? 'pointer-events-auto' : 'pointer-events-auto hover:opacity-85'
                }`}
              >
                {/* Energy Rays & Lightning Effects directly emanating from the active dress */}
                {isActive && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none scale-110">
                    {/* Pulsing Backlight */}
                    <div className="absolute w-44 h-44 rounded-full bg-indigo-500/10 blur-xl animate-pulse" />
                    
                    {/* Pulsing Energy/Lightning Rings */}
                    <div className="absolute w-40 h-40 rounded-full border border-indigo-500/20 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite]" />
                    <div className="absolute w-40 h-40 rounded-full border border-yellow-400/15 animate-[ping_3.5s_cubic-bezier(0,0,0.2,1)_infinite_0.7s]" />

                    {/* Rotating Energy Ray lines */}
                    <div className="absolute w-[360px] h-[25px] bg-gradient-to-r from-transparent via-[#0A0C16]/10 to-transparent rotate-0 animate-energy-spin-cw" />
                    <div className="absolute w-[360px] h-[25px] bg-gradient-to-r from-transparent via-[#eab308]/10 to-transparent rotate-[45deg] animate-energy-spin-ccw" />
                    <div className="absolute w-[360px] h-[25px] bg-gradient-to-r from-transparent via-[#0A0C16]/10 to-transparent rotate-[90deg] animate-energy-spin-cw" />
                  </div>
                )}

                <motion.div
                  animate={isActive ? {
                    y: [0, -8, 0],
                  } : {}}
                  transition={isActive ? {
                    duration: 3.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  } : {}}
                  className="relative w-36 h-36 sm:w-52 sm:h-52 md:w-[280px] md:h-[280px] flex items-center justify-center"
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-contain pointer-events-none"
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Focused product information overlay bottom-center */}
        <div className="absolute bottom-[-15px] text-center w-full max-w-sm px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-0.5"
            >
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#0A0C16] bg-indigo-50 px-2 py-0.5 rounded-full inline-block">
                {activeProduct.tagline}
              </span>
              <h3 className="text-base sm:text-lg font-extrabold text-[#111827]">
                {activeProduct.name}
              </h3>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 2. Middle Section: Mini Bars indicators instead of dots */}
      <div className="flex justify-center items-center gap-2.5 mt-8 z-20">
        {/* Horizontal Mini Bars indicators */}
        {PRODUCTS.map((prod, idx) => {
          const isSelected = activeIndex === idx;
          return (
            <button
              key={prod.id}
              onClick={() => handleCategorySelect(idx)}
              className={`h-1 rounded-full transition-all duration-300 relative flex items-center justify-center ${
                isSelected 
                  ? 'w-8 bg-[#0A0C16]' 
                  : 'w-3.5 bg-gray-200 hover:bg-gray-300'
              }`}
              aria-label={`Select ${prod.category}`}
            >
              <span className="absolute bottom-5 text-[9px] font-bold text-gray-800 bg-white border border-gray-150 px-2 py-0.5 rounded shadow-sm opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                {prod.category}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Bottom Section: Copywriting (Bottom-Left) and Features (Bottom-Right) in a clean split layout */}
      <div className="max-w-7xl mx-auto px-8 w-full flex flex-col md:flex-row justify-between items-end gap-8 z-20 mt-10 pt-4 border-t border-gray-100">
        {/* Bottom-Left: Copywriting */}
        <div className="text-left space-y-2 max-w-sm">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-0.5"
          >
            <span className="text-[9px] uppercase tracking-[0.15em] text-[#0A0C16] font-semibold block">
              NEW SEASON GEAR
            </span>
            <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-[#111827] leading-tight tracking-tight uppercase">
              GEAR UP. <span className="text-[#0A0C16]">STAND OUT.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 text-xs leading-relaxed font-medium"
          >
            Premium sportswear for champions. Engineered with export-grade fabrics for elite performance, designed for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="pt-1"
          >
            <button
              onClick={() => navigate(activeProduct.link)}
              className="inline-flex items-center gap-1.5 rounded-md bg-[#0A0C16] hover:bg-[#4338ca] text-white font-semibold text-[10px] tracking-wider px-4 py-2 shadow-sm transition"
            >
              EXPLORE COLLECTION <span>→</span>
            </button>
          </motion.div>
        </div>

        {/* Bottom-Right: Features arranged side-by-side cleanly */}
        <div className="flex flex-col sm:flex-row gap-6 md:gap-8 justify-end items-start pb-1">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-start gap-2.5 max-w-[200px]"
          >
            <span className="text-[#eab308] text-base mt-0.5">
              <FiAward strokeWidth={1.5} />
            </span>
            <div>
              <h4 className="font-bold text-[#111827] text-[10px] tracking-wider uppercase">PREMIUM QUALITY</h4>
              <p className="text-[10px] text-gray-500 mt-0.5 leading-tight font-medium">Top quality fabrics for maximum performance.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-start gap-2.5 max-w-[200px]"
          >
            <span className="text-[#eab308] text-base mt-0.5">
              <FiFeather strokeWidth={1.5} />
            </span>
            <div>
              <h4 className="font-bold text-[#111827] text-[10px] tracking-wider uppercase">LIGHTWEIGHT</h4>
              <p className="text-[10px] text-gray-500 mt-0.5 leading-tight font-medium">Stay light. Move fast. Win more.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-start gap-2.5 max-w-[200px]"
          >
            <span className="text-[#eab308] text-base mt-0.5">
              <FiWind strokeWidth={1.5} />
            </span>
            <div>
              <h4 className="font-bold text-[#111827] text-[10px] tracking-wider uppercase">BREATHABLE</h4>
              <p className="text-[10px] text-gray-500 mt-0.5 leading-tight font-medium">Advanced technology keeps you cool.</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Manufacturing Policy & Sample Guidelines Delayed Modal Overlay */}
      <AnimatePresence>
        {showPromoModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 260 }}
              className="bg-white text-gray-900 p-8 max-w-lg w-full relative text-left space-y-6 rounded-none shadow-[0_25px_60px_rgba(0,0,0,0.15)] select-none"
            >
              {/* Header */}
              <div className="flex justify-between items-start border-b border-gray-100 pb-4">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-[0.25em] font-black text-[#0A0C16]">
                    OFFICIAL FACTORY NOTICE
                  </span>
                  <h3 className="text-lg font-black tracking-tight uppercase mt-1 text-gray-900">
                    Manufacturing Terms & Guidelines
                  </h3>
                </div>
                <button
                  onClick={handleClosePromoModal}
                  className="text-gray-400 hover:text-gray-900 transition text-sm font-bold cursor-pointer"
                  aria-label="Close rules dialog"
                >
                  ✕
                </button>
              </div>

              {/* Body Content */}
              <div className="space-y-4 text-[11px] text-gray-600 leading-relaxed font-medium">
                {/* Rule Item 1 */}
                <div className="bg-indigo-50/40 p-4 rounded-none border-l-4 border-[#0A0C16] space-y-1">
                  <strong className="text-[#0A0C16] block text-[10px] uppercase tracking-widest font-extrabold">
                    ★ FREE SAMPLES
                  </strong>
                  <p className="text-gray-900 text-xs font-semibold">
                    We provide physical product samples, but the shipping cost must be covered by the customer.
                  </p>
                </div>

                {/* Rule Item 2 */}
                <div className="bg-slate-50 p-4 rounded-none space-y-1">
                  <strong className="text-gray-900 block text-[10px] uppercase tracking-widest font-extrabold">
                    01. Minimum Order Quantity (MOQ)
                  </strong>
                  <p>
                    Standard tailoring orders require a minimum run of 15 pieces per customized design layout.
                  </p>
                </div>

                {/* Rule Item 3 */}
                <div className="bg-slate-50 p-4 rounded-none space-y-1">
                  <strong className="text-gray-900 block text-[10px] uppercase tracking-widest font-extrabold">
                    02. Factory Dispatches
                  </strong>
                  <p>
                    Standard customized tailoring dispatches within 8 to 12 working days post digital mockup sign-off.
                  </p>
                </div>
              </div>

              {/* Action dismissal CTA button */}
              <button
                onClick={handleClosePromoModal}
                className="w-full text-center py-4 bg-[#0A0C16] hover:bg-[#4338ca] text-white font-black text-xs tracking-widest transition duration-150 rounded-none shadow-md cursor-pointer uppercase"
              >
                I UNDERSTAND & PROCEED
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;