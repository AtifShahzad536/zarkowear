import React, { useEffect, useRef, useState } from 'react';
import SeoHead from '../components/SeoHead';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import TopSellingProducts from '../components/Home/Top';
import FeaturedCategories from '../components/Home/Feature';
import LimitedTimeOffer from '../components/Home/LimitedTimeOffer';
import Testimonials from '../components/Home/Customer';
import { Link } from 'react-router-dom';
import { FaFootballBall, FaBasketballBall, FaRunning, FaAward, FaPalette, FaGlobeAmericas, FaHatCowboy, FaShoppingBag, FaArrowRight, FaPhoneAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MdSportsHockey, MdSportsRugby } from 'react-icons/md';
import { GiCricketBat, GiTennisRacket, GiWeightLiftingUp, GiRunningShoe, GiGloves } from 'react-icons/gi';

const Home = () => {
  const path = window.location.pathname;
  const sportRailRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  const categoryChips = [
    { to: '/football', label: 'Football', Icon: FaFootballBall, tagline: 'Club & academy kits' },
    { to: '/cricket', label: 'Cricket', Icon: GiCricketBat, tagline: 'Match + training wear' },
    { to: '/basketball', label: 'Basketball', Icon: FaBasketballBall, tagline: 'Court-ready sets' },
    { to: '/wrestling', label: 'Wrestling', Icon: FaRunning, tagline: 'Singlets & gear' },
    { to: '/hockey', label: 'Hockey', Icon: MdSportsHockey, tagline: 'Ice & field apparel' },
    { to: '/rugby', label: 'Rugby', Icon: MdSportsRugby, tagline: 'Contact proof kits' },
    { to: '/tennis', label: 'Tennis', Icon: GiTennisRacket, tagline: 'Court performance' },
    { to: '/running', label: 'Running', Icon: FaRunning, tagline: 'Lightweight layers' },
    { to: '/gym', label: 'Gym', Icon: GiWeightLiftingUp, tagline: 'Training essentials' },
    { to: '/shoes', label: 'Shoes', Icon: GiRunningShoe, tagline: 'Traction & support' },
    { to: '/gloves', label: 'Gloves', Icon: GiGloves, tagline: 'Grip & protection' },
    { to: '/caps', label: 'Caps', Icon: FaHatCowboy, tagline: 'Team headwear' },
    { to: '/bags', label: 'Bags', Icon: FaShoppingBag, tagline: 'Travel-ready packs' },
  ];

  useEffect(() => {
    const rail = sportRailRef.current;
    if (!rail) return;

    const updateState = () => {
      const maxScroll = rail.scrollWidth - rail.clientWidth;
      setScrollProgress(maxScroll <= 0 ? 0 : rail.scrollLeft / maxScroll);
      setCanScroll(rail.scrollWidth > rail.clientWidth + 4);
    };

    updateState();
    rail.addEventListener('scroll', updateState);
    window.addEventListener('resize', updateState);
    return () => {
      rail.removeEventListener('scroll', updateState);
      window.removeEventListener('resize', updateState);
    };
  }, []);

  const scrollRail = (direction) => {
    const rail = sportRailRef.current;
    if (!rail) return;
    const amount = rail.clientWidth * 0.6;
    rail.scrollBy({ left: direction * amount, behavior: 'smooth' });
  };
  return (
    <main className="min-h-screen">
      <SeoHead
        title="Zarko Sportswear | Custom Export-Grade Sports Uniforms"
        description="Custom football, cricket, basketball, and rugby uniforms with export-grade fabrics and worldwide shipping."
        canonical="https://www.zarkosportswear.com/"
        openGraph={{
          'og:title': 'Zarko Sportswear | Custom Export-Grade Sports Uniforms',
          'og:description': 'Premium team kits and sports accessories engineered for durability with worldwide delivery.',
          'og:url': 'https://www.zarkosportswear.com/',
          'og:image': 'https://www.zarkosportswear.com/og-cover.jpg',
          'og:type': 'website',
        }}
        twitter={{
          'twitter:title': 'Zarko Sportswear | Custom Export-Grade Sports Uniforms',
          'twitter:description': "WearConnect's Zarko Sportswear designs and exports professional-grade sports uniforms and accessories.",
          'twitter:card': 'summary_large_image',
          'twitter:image': 'https://www.zarkosportswear.com/og-cover.jpg',
        }}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Zarko Sportswear',
            image: 'https://www.zarkosportswear.com/logo.png',
            url: 'https://www.zarkosportswear.com/',
            telephone: '+92-303-9200750',
            email: 'zarkosportswear@gmail.com',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '123 Export Avenue',
              addressLocality: 'Sialkot',
              addressRegion: 'Punjab',
              postalCode: '51310',
              addressCountry: 'PK',
            },
            openingHours: ['Mo-Sa 09:00-18:00'],
            sameAs: [
              'https://www.facebook.com/zarkosportswear',
              'https://www.instagram.com/zarko_sports.wear/',
              'https://www.linkedin.com/in/atif-shahzad903/'
            ],
            makesOffer: [
              { '@type': 'Offer', name: 'Football Kits' },
              { '@type': 'Offer', name: 'Cricket Uniforms' },
              { '@type': 'Offer', name: 'Basketball Jerseys' },
              { '@type': 'Offer', name: 'Rugby Apparel' },
            ],
          },
        ]}
      />

      <Hero />

      {/* Quick Categories */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-500">Shop by sport</p>
              <h2 className="mt-2 text-3xl font-bold text-indigo-900">Elite kits and accessories for every squad</h2>
              <p className="mt-2 text-sm text-gray-500">Browse export-grade uniforms, footwear, and gear bundles, or learn more about our <Link to="/about" className="text-indigo-600 hover:underline">sportswear manufacturing</Link>.</p>
            </div>
            <Link to="/custom" className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300">
              Build your own collection
              <FaArrowRight className="text-base" />
            </Link>
          </div>

          <div className="relative mt-8">
            <div className="overflow-hidden rounded-[32px] border border-indigo-100/70 bg-gradient-to-r from-white via-indigo-50/60 to-white shadow-xl">
              <div className="relative px-4 pb-8 pt-4">
                <div className="pointer-events-none absolute inset-y-4 left-0 w-10 bg-gradient-to-r from-white via-white/70 to-transparent" />
                <div className="pointer-events-none absolute inset-y-4 right-0 w-10 bg-gradient-to-l from-white via-white/70 to-transparent" />
                <div
                  ref={sportRailRef}
                  className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-2 py-2 pr-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  {categoryChips.map((chip, i) => (
                    <motion.div
                      key={chip.label}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ delay: i * 0.025, duration: 0.35 }}
                      whileHover={{ y: -6, scale: 1.03 }}
                      className="snap-start"
                    >
                      <Link
                        to={chip.to}
                        className="group block min-w-[190px] rounded-2xl border border-indigo-100 bg-white/95 px-4 py-4 text-left shadow-sm transition hover:-translate-y-1.5 hover:border-indigo-200 hover:shadow-lg"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 via-white to-indigo-50 text-indigo-600">
                              <chip.Icon />
                            </span>
                            <div>
                              <p className="text-sm font-semibold text-indigo-900">{chip.label}</p>
                              <p className="text-xs text-gray-500">{chip.tagline}</p>
                            </div>
                          </div>
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 text-indigo-500 transition group-hover:bg-indigo-600 group-hover:text-white">
                            <FaArrowRight className="text-xs" />
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <div className="mx-2 mt-5 h-1 rounded-full bg-indigo-100">
                  <div
                    className="h-1 rounded-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-blue-500 transition-all duration-300"
                    style={{ width: `${Math.max(6, scrollProgress * 100)}%` }}
                  />
                </div>
              </div>
              {canScroll ? (
                <>
                  <button
                    type="button"
                    aria-label="Scroll sports left"
                    onClick={() => scrollRail(-1)}
                    className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/40 bg-white/80 p-3 text-indigo-700 shadow-md transition hover:-translate-y-1/2 hover:bg-white md:inline-flex"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    type="button"
                    aria-label="Scroll sports right"
                    onClick={() => scrollRail(1)}
                    className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/40 bg-white/80 p-3 text-indigo-700 shadow-md transition hover:-translate-y-1/2 hover:bg-white md:inline-flex"
                  >
                    <FaChevronRight />
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white">
        <div className="absolute inset-y-0 right-[-15%] w-2/3 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.28),_transparent_60%)] blur-3xl opacity-60" />
        <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        <div className="relative max-w-6xl mx-auto px-6 py-14">
          <div className="grid gap-12 md:grid-cols-[1.15fr_0.85fr] items-center">
            <motion.div initial={{opacity:0, x:-30}} whileInView={{opacity:1, x:0}} viewport={{once:true, amount:0.4}} transition={{duration:0.6}}>
              <motion.span initial={{opacity:0, y:-12}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0.5}} transition={{delay:0.1, duration:0.4}} className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium tracking-wide uppercase">
                Elite Performance Kits
              </motion.span>
              <motion.h2 initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0.5}} transition={{delay:0.2, duration:0.6}} className="mt-4 text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight">
                Premium Team Wear engineered for every sport and every season.
              </motion.h2>
              <motion.p initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0.5}} transition={{delay:0.3, duration:0.6}} className="mt-4 text-white/85 text-base md:text-lg max-w-2xl">
                Design winning looks, outfit entire clubs, and ship globally with fabrics that stand up to pro-level play.
              </motion.p>
              <motion.ul initial={{opacity:0, y:24}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0.4}} transition={{delay:0.4, duration:0.6}} className="mt-8 grid gap-4 sm:grid-cols-2">
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    <FaAward />
                  </span>
                  <div>
                    <p className="font-semibold">Export-grade craftsmanship</p>
                    <p className="text-sm text-white/80">Sublimated, stitched, and finished to international tournament specs.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    <FaPalette />
                  </span>
                  <div>
                    <p className="font-semibold">Unlimited customization</p>
                    <p className="text-sm text-white/80">Colors, graphics, and naming tailored for your roster or retail line.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    <FaGlobeAmericas />
                  </span>
                  <div>
                    <p className="font-semibold">Worldwide fulfillment</p>
                    <p className="text-sm text-white/80">Dedicated export support for distributors and club managers.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    <FaRunning />
                  </span>
                  <div>
                    <p className="font-semibold">Performance-tested fabrics</p>
                    <p className="text-sm text-white/80">Moisture management and mobility built for elite competition.</p>
                  </div>
                </li>
              </motion.ul>
            </motion.div>
            <motion.div initial={{opacity:0, x:30}} whileInView={{opacity:1, x:0}} viewport={{once:true, amount:0.4}} transition={{duration:0.6}} className="relative">
              <div className="absolute inset-0 rounded-3xl bg-white/15 blur-lg" />
              <div className="relative rounded-3xl border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur">
                <p className="text-sm uppercase tracking-[0.25em] text-white/70">Your next drop</p>
                <h3 className="mt-3 text-2xl font-semibold">Launch custom kits in 3 easy steps</h3>
                <ul className="mt-6 space-y-3 text-white/80 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="h-6 w-6 rounded-full bg-white/25 text-center text-xs font-semibold leading-6">1</span>
                    Share your concept, logo, or inspiration.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-6 w-6 rounded-full bg-white/25 text-center text-xs font-semibold leading-6">2</span>
                    Approve mockups tailored to your team identity.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-6 w-6 rounded-full bg-white/25 text-center text-xs font-semibold leading-6">3</span>
                    Receive export-ready uniforms with global shipping.
                  </li>
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/football" className="inline-flex items-center gap-2 rounded-full bg-white text-indigo-700 px-6 py-3 text-sm font-semibold shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">
                    Shop Sports Wear
                    <FaArrowRight className="text-base" />
                  </Link>
                  <Link to="/custom" className="inline-flex items-center gap-2 rounded-full bg-indigo-900/70 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/30 transition hover:bg-indigo-900">
                    Custom Orders
                    <FaArrowRight className="text-base" />
                  </Link>
                </div>
                <div className="mt-6 flex items-center gap-3 text-sm text-white/75">
                  <FaPhoneAlt className="text-white" />
                  <span>Need help? Call +92-303-9200750 for a production specialist.</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="bg-gradient-to-b from-white via-indigo-50/20 to-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
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
              title: 'Global Shipping',
              copy: 'Dedicated export desk handling documentation, freight, and delivery timelines.',
              Icon: FaGlobeAmericas,
              badge: 'Worldwide'
            }].map(({ title, copy, Icon, badge }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
                className="relative overflow-hidden rounded-3xl border border-indigo-100 bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-white to-gray-50/60" />
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

      {/* Partners / Clients */}
      <section className="bg-gradient-to-b from-white via-indigo-50/20 to-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-flex items-center justify-center rounded-full border border-indigo-200 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-indigo-500">
              Trusted by clubs & distributors
            </span>
            <h3 className="mt-4 text-3xl font-bold text-indigo-900">Global programs we proudly outfit</h3>
            <p className="mt-2 text-sm text-gray-500">From elite franchises to emerging academies, our export-ready kits power winning rosters.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
          >
            {[
              'Club One',
              'Elite Sports',
              'ProGear',
              'SwiftWear',
              'Prime Kits',
              'Los Angeles Lakers',
              'Golden State Warriors',
              'Chicago Bulls',
              'Boston Celtics',
              'Miami Heat',
              'WN',
              'AEW',
              'NWA',
              'Impact Wrestling',
              'Ohio Valley Wrestling',
              'Pro Rugby Europe'
            ].map((name, i) => (
              <motion.div
                key={name}
                variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="relative overflow-hidden rounded-2xl border border-indigo-100 bg-white px-5 py-4 shadow-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-indigo-500/15 opacity-0 transition group-hover:opacity-100" />
                <div className="relative flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-sm font-semibold">
                      {name.split(' ').map(word => word[0]).join('').slice(0,2)}
                    </span>
                    <span className="font-semibold text-indigo-900 text-sm md:text-base">{name}</span>
                  </div>
                  <span className="hidden text-[10px] uppercase tracking-[0.35em] text-indigo-400 md:inline-flex">Partner</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <FeaturedCategories />
      </section>
      {/* Brand Story */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto grid gap-10 px-4 py-16 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-white p-10 shadow-xl"
          >
            <div className="absolute inset-y-0 right-0 w-40 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.18),_transparent_55%)]" />
            <div className="relative space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-indigo-500">
                Our story
              </span>
              <h3 className="text-3xl font-bold text-indigo-900 leading-tight">
                About ZarkoSportsWear
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                We engineer export-grade team wear from Sialkot, serving clubs, academies, and distributors across the globe.
                Every collection pairs advanced fabrics, precision sublimation, and meticulous QC for performance on and off the field.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-indigo-100 bg-white/90 p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.25em] text-indigo-500">40+ Countries</p>
                  <p className="mt-2 text-lg font-semibold text-indigo-900">Global export footprint</p>
                  <p className="text-xs text-gray-500">Dedicated logistics and distributor support.</p>
                </div>
                <div className="rounded-2xl border border-indigo-100 bg-white/90 p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.25em] text-indigo-500">12k+ Units / Month</p>
                  <p className="mt-2 text-lg font-semibold text-indigo-900">Flexible production runs</p>
                  <p className="text-xs text-gray-500">From pro kits to grassroots academies.</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/about" className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-indigo-700">
                  Learn more
                  <FaArrowRight className="text-sm" />
                </Link>
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-indigo-200 px-6 py-3 text-sm font-semibold text-indigo-700 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300">
                  Contact us
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl shadow-xl"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-600/10 via-transparent to-indigo-900/10" />
            <img src="/images/slide2.jpg" alt="About WearConnect" className="h-full w-full object-cover" />
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/90 p-5 shadow-lg">
              <p className="text-xs uppercase tracking-[0.35em] text-indigo-500">Signature craftsmanship</p>
              <p className="mt-2 text-sm text-gray-600">
                Designed, stitched, and finished under one roof for consistent export quality.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      
      <section className="max-w-6xl mx-auto px-4 py-12">
        <TopSellingProducts />
      </section>

  <section className="max-w-6xl mx-auto px-4 py-12">
        <Testimonials />
      </section>

     
    

      
    </main>
  );
};

export default Home;

