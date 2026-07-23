import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import SeoHead from '../components/SeoHead';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import TopSellingProducts from '../components/Home/Top';
import FeaturedCategories from '../components/Home/Feature';
import LimitedTimeOffer from '../components/Home/LimitedTimeOffer';
import Testimonials from '../components/Home/Customer';
import { Link } from 'react-router-dom';
import { FaAward, FaPalette, FaGlobeAmericas, FaRunning, FaArrowRight, FaPhoneAlt, FaStar, FaCheckCircle } from 'react-icons/fa';
import homeSeo from '../seo/homeSeo';
import { clubs } from '../data/home/partners';
import { categoryChips } from '../data/home/categoryChips';

const Home = () => {
  const path = window.location.pathname;

  // clubs now imported from data/home/partners

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  // categoryChips now imported from data/home/categoryChips
  return (
    <main className="min-h-screen">
      <SeoHead {...homeSeo} />

      <Hero />

      <FeaturedCategories />
      {/* CTA Strip */}
      <section className="relative overflow-hidden bg-indigo-600 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_120%,_rgba(255,255,255,0.1),_transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <motion.div initial={{opacity:0, x:-30}} whileInView={{opacity:1, x:0}} viewport={{once:true, amount:0.4}} transition={{duration:0.6}}>
              <motion.span initial={{opacity:0, y:-12}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0.5}} transition={{delay:0.1, duration:0.4}} className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-white">
                Elite Performance Kits
              </motion.span>
              <motion.h2 initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0.5}} transition={{delay:0.2, duration:0.6}} className="mt-5 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-tight text-white">
                Premium Team Wear engineered for USA, UK, Australia, KSA & European leagues.
              </motion.h2>
              <motion.p initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0.5}} transition={{delay:0.3, duration:0.6}} className="mt-5 text-white/85 text-base md:text-lg max-w-2xl leading-relaxed">
                Design winning looks and outfit entire clubs with export-grade fabrics. Trusted by professional academies, football clubs, wrestling leagues, and hockey associations across the United States, United Kingdom, Australia, Italy, Saudi Arabia, and greater Europe.
              </motion.p>
              <motion.ul initial={{opacity:0, y:24}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0.4}} transition={{delay:0.4, duration:0.6}} className="mt-10 grid gap-6 sm:grid-cols-2">
                <li className="flex items-start gap-4">
                  <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 border border-white/20 text-white">
                    <FaAward className="text-lg" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-white text-base">Export-grade craftsmanship</h3>
                    <p className="text-xs sm:text-sm text-white/80 mt-1">Sublimated, stitched, and finished to meet US, UK, Gulf, and European league specifications.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 border border-white/20 text-white">
                    <FaPalette className="text-lg" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-white text-base">Custom wrestling & hockey gear</h3>
                    <p className="text-xs sm:text-sm text-white/80 mt-1">Bespoke singlets, jerseys, naming, and graphics tailored for your squad.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 border border-white/20 text-white">
                    <FaGlobeAmericas className="text-lg" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-white text-base">Global delivery (USA, UK, KSA, EU, AU)</h3>
                    <p className="text-xs sm:text-sm text-white/80 mt-1">Express shipping directly to USA, UK, Australia, Saudi Arabia, Italy, and Europe with customs clearances handled.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 border border-white/20 text-white">
                    <FaRunning className="text-lg" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-white text-base">Performance-tested fabrics</h3>
                    <p className="text-xs sm:text-sm text-white/80 mt-1">Refined moisture management and mobility built for elite competition.</p>
                  </div>
                </li>
              </motion.ul>
            </motion.div>
            
            <motion.div initial={{opacity:0, x:30}} whileInView={{opacity:1, x:0}} viewport={{once:true, amount:0.4}} transition={{duration:0.6}} className="relative">
              <div className="relative rounded-2xl border border-white/15 bg-white/10 p-8 md:p-10 shadow-2xl backdrop-blur-sm">
                <span className="text-xs uppercase tracking-widest text-white/80 font-semibold">Your next drop</span>
                <h3 className="mt-3 text-2xl font-bold text-white">Launch custom kits in 3 easy steps</h3>
                <ul className="mt-8 space-y-5 text-white/90 text-sm md:text-base">
                  <li className="flex items-center gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-center text-xs font-bold text-indigo-600">1</span>
                    <span>Share your concept, logo, or inspiration.</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-center text-xs font-bold text-indigo-600">2</span>
                    <span>Approve mockups tailored to your team identity.</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-center text-xs font-bold text-indigo-600">3</span>
                    <span>Receive export-ready uniforms with global shipping.</span>
                  </li>
                </ul>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link to="/football" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-gray-150 text-indigo-700 px-6 py-3.5 text-sm font-bold shadow-md transition duration-300">
                    Shop Sports Wear
                    <FaArrowRight className="text-xs" />
                  </Link>
                  <Link to="/custom" className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-950/20 hover:bg-indigo-950/30 px-6 py-3.5 text-sm font-bold text-white border border-white/20 transition duration-300">
                    Custom Orders
                    <FaArrowRight className="text-xs" />
                  </Link>
                </div>
                <div className="mt-6 flex items-center gap-3 text-xs text-white/80">
                  <FaPhoneAlt className="text-white" />
                  <span>Need help? Call +92-303-9200750 for a production specialist.</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
        <TopSellingProducts />

      {/* Quick Categories */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
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
        <div className="max-w-7xl mx-auto px-4 py-12">
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


      
     

  <section className="max-w-7xl mx-auto px-4 py-12">
        <Testimonials />
      </section>

     
    

      
    </main>
  );
};

export default Home;
