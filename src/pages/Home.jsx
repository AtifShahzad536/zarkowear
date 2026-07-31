import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import SeoHead from '../components/SeoHead';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '../components/Hero';
import TopSellingProducts from '../components/Home/Top';
import FeaturedCategories from '../components/Home/Feature';
import LimitedTimeOffer from '../components/Home/LimitedTimeOffer';
import Testimonials from '../components/Home/Customer';
import Videos from '../components/Home/Videos';
import { Link } from 'react-router-dom';
import { FaAward, FaPalette, FaGlobeAmericas, FaRunning, FaArrowRight, FaPhoneAlt, FaStar, FaCheckCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FiLayers, FiGlobe, FiSliders, FiShoppingBag } from 'react-icons/fi';
import homeSeo from '../seo/homeSeo';
import { clubs } from '../data/home/partners';
import { categoryChips } from '../data/home/categoryChips';

const JERSEYS = [
  '/images/hero_football.png',
  '/images/hero_basketball.png',
  '/images/hero_wrestling.png',
  '/images/hero_cricket.png',
  '/images/hero_gym.png'
];

const Home = () => {
  const path = window.location.pathname;
  const [activeJerseyIndex, setActiveJerseyIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  // categoryChips now imported from data/home/categoryChips
  return (
    <main className="min-h-screen">
      <SeoHead {...homeSeo} />

      <Hero />

      <FeaturedCategories />
      {/* Redesigned Premium Teamwear Section */}
      <section className="relative overflow-hidden bg-[#0A0C16] text-white py-16 sm:py-24">
        {/* Deep background purple/indigo spotlight glows */}
        <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] bg-indigo-600/10 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] bg-purple-600/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative max-w-[94%] mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[0.35fr_0.35fr_0.3fr] items-start">
            
            {/* LEFT COLUMN (35%) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 text-left"
            >
              <span className="inline-block px-3 py-1 bg-white/10 text-white text-[9px] uppercase tracking-[0.2em] font-extrabold rounded-none">
                WHY TEAMS CHOOSE ZARKO
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase leading-tight">
                Premium Teamwear,<br />Built to Win.
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 font-medium leading-relaxed max-w-xs">
                Premium custom sportswear trusted by teams across USA, UK, Australia, KSA and Europe.
              </p>

              {/* 4 Premium Feature Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                {/* Feature 1 */}
                <div className="flex items-start gap-3">
                  <span className="p-2.5 bg-white/5 border border-white/10 text-white rounded-none flex-shrink-0 mt-0.5">
                    <FiLayers className="text-sm" />
                  </span>
                  <div>
                    <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">Premium Fabrics</h4>
                    <p className="text-[10px] text-gray-400 font-semibold mt-0.5 leading-tight">High-performance materials.</p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-start gap-3">
                  <span className="p-2.5 bg-white/5 border border-white/10 text-white rounded-none flex-shrink-0 mt-0.5">
                    <FiGlobe className="text-sm" />
                  </span>
                  <div>
                    <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">Global Shipping</h4>
                    <p className="text-[10px] text-gray-400 font-semibold mt-0.5 leading-tight">Worldwide delivery.</p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex items-start gap-3">
                  <span className="p-2.5 bg-white/5 border border-white/10 text-white rounded-none flex-shrink-0 mt-0.5">
                    <FiSliders className="text-sm" />
                  </span>
                  <div>
                    <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">Custom Designs</h4>
                    <p className="text-[10px] text-gray-400 font-semibold mt-0.5 leading-tight">Unlimited customization.</p>
                  </div>
                </div>

                {/* Feature 4 */}
                <div className="flex items-start gap-3">
                  <span className="p-2.5 bg-white/5 border border-white/10 text-white rounded-none flex-shrink-0 mt-0.5">
                    <FiShoppingBag className="text-sm" />
                  </span>
                  <div>
                    <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">Bulk Orders</h4>
                    <p className="text-[10px] text-gray-400 font-semibold mt-0.5 leading-tight">Low MOQ available.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CENTER COLUMN (35%) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative flex flex-col items-center justify-center min-h-[360px] select-none"
            >
              {/* Purple Glow Spotlight */}
              <div className="absolute w-64 h-64 bg-[#0A0C16]/10 rounded-full blur-[80px] pointer-events-none" />

              {/* Glowing Platform */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 h-6 bg-[#0A0C16]/30 rounded-full blur-md animate-pulse transform -rotate-[3deg]" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-36 h-4 bg-[#818cf8]/40 rounded-full blur-sm transform -rotate-[3deg]" />

              {/* Previous / Next Arrows on both sides */}
              <button
                onClick={() => setActiveJerseyIndex((prev) => (prev - 1 + JERSEYS.length) % JERSEYS.length)}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-none bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition active:scale-95 border border-white/10 cursor-pointer"
                aria-label="Previous Jersey"
              >
                <FaChevronLeft className="text-xs" />
              </button>

              <button
                onClick={() => setActiveJerseyIndex((prev) => (prev + 1) % JERSEYS.length)}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-none bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition active:scale-95 border border-white/10 cursor-pointer"
                aria-label="Next Jersey"
              >
                <FaChevronRight className="text-xs" />
              </button>

              {/* Floating Jersey */}
              <div className="relative z-10 w-full flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeJerseyIndex}
                    src={JERSEYS[activeJerseyIndex]}
                    initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.9, rotate: 4 }}
                    transition={{ duration: 0.45 }}
                    // Floating animation + hover lift / slight rotation
                    className="w-56 h-56 md:w-64 md:h-64 object-contain filter drop-shadow-[0_20px_40px_rgba(79,70,229,0.3)] hover:scale-105 hover:rotate-3 transition duration-300 cursor-pointer select-none"
                    style={{
                      animation: 'floatJersey 4s ease-in-out infinite'
                    }}
                  />
                </AnimatePresence>
              </div>

              {/* Inject Float Animation styles */}
              <style>{`
                @keyframes floatJersey {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(-10px); }
                }
              `}</style>
            </motion.div>

            {/* RIGHT COLUMN (30%) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-white/5 border border-white/10 p-7 md:p-8 rounded-none shadow-2xl backdrop-blur-md text-left space-y-6">
                <div className="space-y-1">
                  <span className="inline-block px-2.5 py-0.5 bg-indigo-500/10 text-[#818cf8] text-[9px] uppercase tracking-wider font-extrabold rounded-none">
                    How It Works
                  </span>
                  <h3 className="text-lg font-black tracking-tight uppercase text-white mt-1 leading-tight">
                    Launch your custom kit<br />in 3 easy steps
                  </h3>
                </div>

                {/* Vertical Timeline */}
                <div className="relative border-l border-white/10 pl-6 ml-3 space-y-6 text-left">
                  {/* Step 1 */}
                  <div className="relative">
                    <span className="absolute -left-[33px] top-0.5 flex items-center justify-center w-4 h-4 rounded-none bg-[#0A0C16] text-white text-[8px] font-black">
                      1
                    </span>
                    <h4 className="font-extrabold text-white text-[11px] uppercase tracking-wider">Step 1</h4>
                    <p className="text-[10px] text-gray-400 font-semibold mt-0.5 leading-tight">
                      Upload your logo or idea.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="relative">
                    <span className="absolute -left-[33px] top-0.5 flex items-center justify-center w-4 h-4 rounded-none bg-[#0A0C16] text-white text-[8px] font-black">
                      2
                    </span>
                    <h4 className="font-extrabold text-white text-[11px] uppercase tracking-wider">Step 2</h4>
                    <p className="text-[10px] text-gray-400 font-semibold mt-0.5 leading-tight">
                      Approve the mockup.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="relative">
                    <span className="absolute -left-[33px] top-0.5 flex items-center justify-center w-4 h-4 rounded-none bg-[#0A0C16] text-white text-[8px] font-black">
                      3
                    </span>
                    <h4 className="font-extrabold text-white text-[11px] uppercase tracking-wider">Step 3</h4>
                    <p className="text-[10px] text-gray-400 font-semibold mt-0.5 leading-tight">
                      Production & Worldwide Delivery.
                    </p>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-3 pt-2">
                  <Link
                    to="/football"
                    className="inline-flex items-center justify-center gap-2 rounded-none bg-[#0A0C16] hover:bg-[#4338ca] text-white font-bold py-3 text-[10px] tracking-widest shadow-md transition duration-150 uppercase"
                  >
                    Shop Sports Wear
                    <FaArrowRight className="text-[8px]" />
                  </Link>
                  <Link
                    to="/custom"
                    className="inline-flex items-center justify-center gap-2 rounded-none bg-white/5 hover:bg-white/10 text-white font-bold py-3 text-[10px] tracking-widest border border-white/15 transition duration-150 uppercase"
                  >
                    Custom Orders
                    <FaArrowRight className="text-[8px]" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          {/* BOTTOM STRIP - TRUST BAR */}
          <div className="mt-20 pt-10 border-t border-white/10 text-center space-y-6">
            <span className="text-[9px] uppercase tracking-[0.25em] font-extrabold text-indigo-400 block">
              Trusted by Clubs & Leagues Across
            </span>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-items-center max-w-5xl mx-auto">
              {/* USA */}
              <div className="flex items-center gap-2.5">
                <img src="https://flagcdn.com/us.svg" alt="USA" className="w-6 h-4 object-cover border border-white/10" />
                <div className="text-left">
                  <span className="text-[10px] font-extrabold text-white uppercase tracking-wider">USA</span>
                  <span className="text-[8px] text-gray-400 block font-semibold leading-none mt-0.5">Leagues</span>
                </div>
              </div>

              {/* UK */}
              <div className="flex items-center gap-2.5">
                <img src="https://flagcdn.com/gb.svg" alt="UK" className="w-6 h-4 object-cover border border-white/10" />
                <div className="text-left">
                  <span className="text-[10px] font-extrabold text-white uppercase tracking-wider">UK</span>
                  <span className="text-[8px] text-gray-400 block font-semibold leading-none mt-0.5">Leagues</span>
                </div>
              </div>

              {/* KSA */}
              <div className="flex items-center gap-2.5">
                <img src="https://flagcdn.com/sa.svg" alt="KSA" className="w-6 h-4 object-cover border border-white/10" />
                <div className="text-left">
                  <span className="text-[10px] font-extrabold text-white uppercase tracking-wider">KSA</span>
                  <span className="text-[8px] text-gray-400 block font-semibold leading-none mt-0.5">Leagues</span>
                </div>
              </div>

              {/* Australia */}
              <div className="flex items-center gap-2.5">
                <img src="https://flagcdn.com/au.svg" alt="Australia" className="w-6 h-4 object-cover border border-white/10" />
                <div className="text-left">
                  <span className="text-[10px] font-extrabold text-white uppercase tracking-wider">Australia</span>
                  <span className="text-[8px] text-gray-400 block font-semibold leading-none mt-0.5">Leagues</span>
                </div>
              </div>

              {/* Europe */}
              <div className="flex items-center gap-2.5">
                <img src="https://flagcdn.com/eu.svg" alt="Europe" className="w-6 h-4 object-cover border border-white/10" />
                <div className="text-left">
                  <span className="text-[10px] font-extrabold text-white uppercase tracking-wider">Europe</span>
                  <span className="text-[8px] text-gray-400 block font-semibold leading-none mt-0.5">Leagues</span>
                </div>
              </div>

              {/* Italy */}
              <div className="flex items-center gap-2.5">
                <img src="https://flagcdn.com/it.svg" alt="Italy" className="w-6 h-4 object-cover border border-white/10" />
                <div className="text-left">
                  <span className="text-[10px] font-extrabold text-white uppercase tracking-wider">Italy</span>
                  <span className="text-[8px] text-gray-400 block font-semibold leading-none mt-0.5">Leagues</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        <TopSellingProducts />

      {/* Quick Categories */}
      <section className="bg-white">
        <div className="max-w-[94%] mx-auto px-4 py-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-500">Shop by sport</p>
              <h2 className="mt-2 text-3xl font-bold text-indigo-900">Elite kits and accessories for every squad</h2>
              <p className="mt-2 text-sm text-gray-500">Browse export-grade uniforms, footwear, and gear bundles, or learn more about our <Link to="/about" className="text-indigo-600 hover:underline">sportswear manufacturing</Link>.</p>
            </div>
            <Link to="/custom" className="inline-flex items-center gap-2 rounded-xl border border-indigo-200 bg-white px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300">
              Build your own collection
              <FaArrowRight className="text-base" />
            </Link>
          </div>

          <div className="relative mt-8 group">
            {/* Navigation Buttons */}
            <button className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg border border-indigo-100 flex items-center justify-center text-indigo-600 hover:bg-indigo-50 transition-all duration-300 opacity-0 group-hover:opacity-100">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg border border-indigo-100 flex items-center justify-center text-indigo-600 hover:bg-indigo-50 transition-all duration-300 opacity-0 group-hover:opacity-100">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }}
              loop={true}
              spaceBetween={16}
              slidesPerView={2}
              breakpoints={{
                480: { slidesPerView: 2.5 },
                640: { slidesPerView: 3 },
                768: { slidesPerView: 3.5 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 5 },
                1536: { slidesPerView: 6 }
              }}
              className="py-4"
            >
              {categoryChips.map((chip, i) => (
                <SwiperSlide key={`${chip.label}-${i}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: i * 0.025, duration: 0.35 }}
                    whileHover={{ y: -6, scale: 1.03 }}
                    className="h-full"
                  >
                    <Link
                      to={chip.to}
                      className="group block h-full rounded-2xl border border-indigo-100 bg-white/95 px-4 py-4 text-left shadow-sm transition hover:-translate-y-1.5 hover:border-indigo-200 hover:shadow-lg"
                    >
                      <div className="flex items-center justify-between gap-2 h-full">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 via-white to-indigo-50 text-indigo-600 flex-shrink-0">
                            <chip.Icon />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-indigo-900 truncate">{chip.label}</p>
                            <p className="text-xs text-gray-500 truncate">{chip.tagline}</p>
                          </div>
                        </div>
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 text-indigo-500 transition group-hover:bg-indigo-600 group-hover:text-white flex-shrink-0">
                          <FaArrowRight className="text-xs" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Progress bar */}
            <div className="mt-6 flex justify-center">
              <div className="w-32 h-1 rounded-full bg-indigo-100">
                <div className="h-1 rounded-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-blue-500 transition-all duration-300 w-1/3"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

    

      {/* Value Props */}
      <section className="bg-gradient-to-b from-white via-indigo-50/20 to-white">
        <div className="max-w-[94%] mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <span className="inline-flex items-center justify-center rounded-full border border-indigo-200 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-indigo-500">
              Why teams choose us
            </span>
            <h3 className="mt-3 text-3xl font-bold text-indigo-900">Export-ready craftsmanship from concept to delivery</h3>
          </motion.div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[{
              title: 'Export-Grade Quality',
              copy: 'Durable fabrics, precision stitching, and colorfast sublimation built for elite play.',
              Icon: FaAward,
              badge: 'ISO-aligned'
            }, {
              title: 'Customizations',
              copy: 'Logos, names, numbering, and bespoke trims engineered around your club identity.',
              Icon: FaPalette,
              badge: 'Brand-matched'
            }, {
              title: 'Global Delivery',
              copy: 'Fast, secure shipping door-to-door to USA, UK, Australia, Italy, Saudi Arabia, and Europe with all customs clearances handled.',
              Icon: FaGlobeAmericas,
              badge: 'KSA & Global'
            }].map(({ title, copy, Icon, badge }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
                className="relative overflow-hidden rounded-2xl border border-indigo-100 bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-indigo-500/15 opacity-0 transition group-hover:opacity-100" />
                <div className="relative flex items-start gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 via-white to-indigo-50 text-indigo-600 text-2xl">
                    <Icon />
                  </span>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-indigo-900 text-lg">{title}</h4>
                      <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-indigo-500">
                        {badge}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-6">{copy}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Videos section */}
      <Videos />

      <section className="max-w-[94%] mx-auto px-4 py-12">
        <Testimonials />
      </section>

     
    

      
    </main>
  );
};

export default Home;
