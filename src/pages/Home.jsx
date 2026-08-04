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
import FAQ from '../components/Home/Faq';
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
              viewport={{ once: true }}
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
                Best custom sportswear manufacturer in Sialkot, trusted by B2B athletic teams across the USA, UK, Australia, KSA and Europe.
              </p>

              {/* 4 Premium Feature Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                {/* Feature 1 */}
                <div className="flex items-start gap-3">
                  <span className="p-2.5 bg-white/5 border border-white/10 text-white rounded-none flex-shrink-0 mt-0.5">
                    <FiLayers className="text-sm" />
                  </span>
                  <div>
                    <h3 className="font-extrabold text-white text-xs uppercase tracking-wider">Premium Fabrics</h3>
                    <p className="text-[10px] text-gray-400 font-semibold mt-0.5 leading-tight">High-performance materials.</p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-start gap-3">
                  <span className="p-2.5 bg-white/5 border border-white/10 text-white rounded-none flex-shrink-0 mt-0.5">
                    <FiGlobe className="text-sm" />
                  </span>
                  <div>
                    <h3 className="font-extrabold text-white text-xs uppercase tracking-wider">Global Shipping</h3>
                    <p className="text-[10px] text-gray-400 font-semibold mt-0.5 leading-tight">Worldwide delivery.</p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex items-start gap-3">
                  <span className="p-2.5 bg-white/5 border border-white/10 text-white rounded-none flex-shrink-0 mt-0.5">
                    <FiSliders className="text-sm" />
                  </span>
                  <div>
                    <h3 className="font-extrabold text-white text-xs uppercase tracking-wider">Custom Designs</h3>
                    <p className="text-[10px] text-gray-400 font-semibold mt-0.5 leading-tight">Unlimited customization.</p>
                  </div>
                </div>

                {/* Feature 4 */}
                <div className="flex items-start gap-3">
                  <span className="p-2.5 bg-white/5 border border-white/10 text-white rounded-none flex-shrink-0 mt-0.5">
                    <FiShoppingBag className="text-sm" />
                  </span>
                  <div>
                    <h3 className="font-extrabold text-white text-xs uppercase tracking-wider">Bulk Orders</h3>
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
                    alt="Zarko Custom Premium Sportswear Jersey"
                    width={280}
                    height={280}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.35 }}
                    className="w-56 h-56 md:w-64 md:h-64 object-contain filter drop-shadow-[0_20px_40px_rgba(79,70,229,0.3)] hover:scale-105 transition duration-300 cursor-pointer select-none float-jersey-anim"
                  />
                </AnimatePresence>
              </div>


            </motion.div>

            {/* RIGHT COLUMN (30%) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
                <img src="/images/flags/us.svg" alt="USA" className="w-6 h-4 object-cover border border-white/10" width={24} height={16} loading="lazy" />
                <div className="text-left">
                  <span className="text-[10px] font-extrabold text-white uppercase tracking-wider">USA</span>
                  <span className="text-[8px] text-gray-400 block font-semibold leading-none mt-0.5">Leagues</span>
                </div>
              </div>

              {/* UK */}
              <div className="flex items-center gap-2.5">
                <img src="/images/flags/gb.svg" alt="UK" className="w-6 h-4 object-cover border border-white/10" width={24} height={16} loading="lazy" />
                <div className="text-left">
                  <span className="text-[10px] font-extrabold text-white uppercase tracking-wider">UK</span>
                  <span className="text-[8px] text-gray-400 block font-semibold leading-none mt-0.5">Leagues</span>
                </div>
              </div>

              {/* KSA */}
              <div className="flex items-center gap-2.5">
                <img src="/images/flags/sa.svg" alt="KSA" className="w-6 h-4 object-cover border border-white/10" width={24} height={16} loading="lazy" />
                <div className="text-left">
                  <span className="text-[10px] font-extrabold text-white uppercase tracking-wider">KSA</span>
                  <span className="text-[8px] text-gray-400 block font-semibold leading-none mt-0.5">Leagues</span>
                </div>
              </div>

              {/* Australia */}
              <div className="flex items-center gap-2.5">
                <img src="/images/flags/au.svg" alt="Australia" className="w-6 h-4 object-cover border border-white/10" width={24} height={16} loading="lazy" />
                <div className="text-left">
                  <span className="text-[10px] font-extrabold text-white uppercase tracking-wider">Australia</span>
                  <span className="text-[8px] text-gray-400 block font-semibold leading-none mt-0.5">Leagues</span>
                </div>
              </div>

              {/* Europe */}
              <div className="flex items-center gap-2.5">
                <img src="/images/flags/eu.svg" alt="Europe" className="w-6 h-4 object-cover border border-white/10" width={24} height={16} loading="lazy" />
                <div className="text-left">
                  <span className="text-[10px] font-extrabold text-white uppercase tracking-wider">Europe</span>
                  <span className="text-[8px] text-gray-400 block font-semibold leading-none mt-0.5">Leagues</span>
                </div>
              </div>

              {/* Italy */}
              <div className="flex items-center gap-2.5">
                <img src="/images/flags/it.svg" alt="Italy" className="w-6 h-4 object-cover border border-white/10" width={24} height={16} loading="lazy" />
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

      {/* Quick Categories Redesign (Option 1) */}
      <section className="bg-[#0A0C16] text-white border-b border-white/5 py-20 sm:py-28 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[600px] h-[300px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[94%] mx-auto px-4 relative z-10">
          
          {/* Header area */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-indigo-400">Shop by sport</p>
              <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Elite kits and accessories for every squad
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
                Browse export-grade uniforms and gear packages optimized for professional club play, or customize your designs.
              </p>
            </div>
            <Link 
              to="/custom" 
              className="inline-flex items-center gap-2 rounded-none border border-white/10 bg-white/5 hover:bg-white/10 px-6 py-3 text-xs font-bold text-white transition-all uppercase tracking-wider shrink-0"
            >
              Build your own collection →
            </Link>
          </div>

          {/* Option 1 Sports Grid - 4 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Football',
                tagline: 'Professional match kits & gear',
                to: '/football',
                image: '/images/sports/football.webp'
              },
              {
                title: 'Cricket',
                tagline: 'Premium club uniforms & wear',
                to: '/cricket',
                image: '/images/sports/cricket.webp'
              },
              {
                title: 'Basketball',
                tagline: 'Elite sublimated jerseys',
                to: '/basketball',
                image: '/images/sports/basketball.webp'
              },
              {
                title: 'Wrestling',
                tagline: 'Heavy-duty performance singlets',
                to: '/wrestling',
                image: '/images/sports/wrestling.webp'
              }
            ].map((sport, i) => (
              <motion.div
                key={sport.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="relative h-96 w-full overflow-hidden rounded-none border border-white/10 border-l-4 border-l-transparent hover:border-l-indigo-500 cursor-pointer group transition-all duration-300"
              >
                <Link to={sport.to} className="block w-full h-full">
                  {/* Full size action image */}
                  <img
                    src={sport.image}
                    alt={sport.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-85 group-hover:opacity-90 transition-all duration-500 z-10" />

                  {/* White Typography inside bottom card */}
                  <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                    <div>
                      <h3 className="text-xl font-black text-white uppercase tracking-wider drop-shadow-md" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        {sport.title}
                      </h3>
                      <p className="text-[11px] text-slate-300 font-semibold leading-relaxed mt-2 opacity-80 max-h-0 group-hover:max-h-16 group-hover:opacity-100 overflow-hidden transition-all duration-500 ease-in-out">
                        {sport.tagline}
                      </p>
                    </div>
                    <div className="pt-4 text-xs font-bold text-indigo-400 group-hover:text-indigo-300 flex items-center gap-1">
                      Explore <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

    

      {/* Value Props & Stats Redesign */}
      <section className="bg-white border-b border-slate-200 py-20 sm:py-28">
        <div className="max-w-[94%] mx-auto px-4">
          
          {/* Header Area */}
          <div className="flex flex-col items-center text-center mb-16 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-indigo-600 block">
              Why Teams Choose Us
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Export Ready Craftsmanship
            </h2>
            <div className="w-16 h-0.5 bg-indigo-600 mt-2" />
          </div>

          {/* Cards Grid - 4 Columns */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                num: '01',
                title: 'Export Grade Quality',
                bullets: ['Heavy GSM fabrics', 'Precision flatlock stitching', 'Colorfast sublimation print']
              },
              {
                num: '02',
                title: 'Unlimited Customization',
                bullets: ['Design proofs in 12 hours', 'Names, numbers, & logos', 'Dye-sublimation styling']
              },
              {
                num: '03',
                title: 'USA & Global Shipping',
                bullets: ['3-5 Days delivery to USA', 'Customs clearance handled', 'Fully tracked door-to-door']
              },
              {
                num: '04',
                title: 'Rapid Production',
                bullets: ['8-12 Days standard turnaround', 'Rush orders accepted', 'Bulk logistics managed']
              }
            ].map(({ num, title, bullets }) => (
              <div
                key={num}
                className="relative bg-white border border-slate-200 p-8 flex flex-col justify-between h-72 rounded-none transition-all duration-300 hover:border-indigo-500 group overflow-hidden"
              >
                {/* Background Giant Number */}
                <div className="absolute top-4 right-6 text-7xl font-black text-slate-100 select-none group-hover:text-indigo-50 transition-colors pointer-events-none z-0">
                  {num}
                </div>

                <div className="relative z-10 space-y-6">
                  <p className="font-extrabold text-slate-900 text-lg uppercase tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {title}
                  </p>
                  <ul className="space-y-2">
                    {bullets.map((bullet, idx) => (
                      <li key={idx} className="text-xs text-slate-500 font-bold flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-indigo-600 block shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative z-10 text-xs font-bold text-indigo-600 flex items-center gap-1 group-hover:text-indigo-700 mt-4">
                  Explore Options <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            ))}
          </div>

          {/* Thin Horizontal Divider */}
          <div className="border-t border-slate-200 my-16" />

          {/* Mini Stats Grid - Vertical Dividers, No Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-slate-200 text-center">
            {[
              { stat: '95%', label: 'Customer Satisfaction' },
              { stat: '30+', label: 'Countries Served' },
              { stat: '7-9 Days', label: 'Rapid Turnaround' },
              { stat: '500+', label: 'Athletic Teams Served' }
            ].map(({ stat, label }) => (
              <div key={label} className="px-6 flex flex-col items-center justify-center space-y-1">
                <span className="text-4xl sm:text-5xl font-black text-slate-900 uppercase tracking-tight block" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {stat}
                </span>
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-600">
                  {label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* Videos section */}
      <Videos />

      {/* FAQ section */}
      <FAQ />

      <section className="max-w-[94%] mx-auto px-4 py-12">
        <Testimonials />
      </section>

     
    

      
    </main>
  );
};

export default Home;
