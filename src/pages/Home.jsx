import React, { useEffect } from 'react';
import SeoHead from '../components/SeoHead';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import TopSellingProducts from '../components/Home/Top';
import FeaturedCategories from '../components/Home/Feature';
import LimitedTimeOffer from '../components/Home/LimitedTimeOffer';
import Testimonials from '../components/Home/Customer';
import { Link } from 'react-router-dom';
import { FaFootballBall, FaBasketballBall, FaRunning, FaAward, FaPalette, FaGlobeAmericas, FaHatCowboy, FaShoppingBag, FaArrowRight, FaPhoneAlt } from 'react-icons/fa';
import { MdSportsHockey, MdSportsRugby } from 'react-icons/md';
import { GiCricketBat, GiTennisRacket, GiWeightLiftingUp, GiRunningShoe, GiGloves } from 'react-icons/gi';

const Home = () => {
  const path = window.location.pathname;
  useEffect(() => {
    window.scrollTo(0, 0);
}, [path]);
  return (
    <main className="min-h-screen">
      <SeoHead
        title="Zarko Sportswear | Custom Export-Grade Sports Uniforms"
        description="Shop custom football, cricket, basketball, and rugby uniforms with export-grade fabrics and global shipping from Zarko Sportswear."
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
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'SportsTeam',
          name: 'Zarko Sportswear',
          description: 'Manufacturer and exporter of custom sports uniforms, accessories, and athletic apparel.',
          url: 'https://www.zarkosportswear.com/',
          logo: 'https://www.zarkosportswear.com/logo.png',
          telephone: '+92-3039200750',
          email: 'zarkosportswear@gmail.com',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '123 Export Avenue',
            addressLocality: 'Sialkot',
            addressRegion: 'Punjab',
            postalCode: '51310',
            addressCountry: 'PK',
          },
          sameAs: [
            'https://facebook.com/zarkosportswear',
            'https://www.instagram.com/zarko_sports.wear/',
            'https://www.linkedin.com/in/atif-shahzad903/',
          ],
          makesOffer: [
            { '@type': 'Offer', name: 'Football Kits' },
            { '@type': 'Offer', name: 'Cricket Uniforms' },
            { '@type': 'Offer', name: 'Basketball Jerseys' },
            { '@type': 'Offer', name: 'Rugby Apparel' },
          ],
        }}
      />

      <Hero />

      {/* Quick Categories */}
      <section className="relative bg-white">
        {/* subtle background bloom */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50/70 via-white to-white" />
        <div className="relative max-w-6xl mx-auto px-4 py-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden:{}, show:{ transition:{ staggerChildren:0.05 }}}}
            className="flex items-center justify-between flex-wrap gap-3"
          >
            {[
              { to: '/football', label: 'Football', Icon: FaFootballBall },
              { to: '/cricket', label: 'Cricket', Icon: GiCricketBat },
              { to: '/basketball', label: 'Basketball', Icon: FaBasketballBall },
              { to: '/hockey', label: 'Hockey', Icon: MdSportsHockey },
              { to: '/rugby', label: 'Rugby', Icon: MdSportsRugby },
              { to: '/tennis', label: 'Tennis', Icon: GiTennisRacket },
              { to: '/running', label: 'Running', Icon: FaRunning },
              { to: '/gym', label: 'Gym', Icon: GiWeightLiftingUp },
              { to: '/shoes', label: 'Shoes', Icon: GiRunningShoe },
              { to: '/gloves', label: 'Gloves', Icon: GiGloves },
              { to: '/caps', label: 'Caps', Icon: FaHatCowboy },
              { to: '/bags', label: 'Bags', Icon: FaShoppingBag }
            ].map((chip,i)=> (
              <motion.div
                key={i}
                variants={{ hidden:{opacity:0, y:8}, show:{opacity:1, y:0}}}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to={chip.to}
                  className="px-4 py-2 rounded-full backdrop-blur bg-white/70 hover:bg-white text-gray-800 text-sm font-medium shadow-sm ring-1 ring-indigo-100/70 hover:ring-indigo-200 transition flex items-center gap-2"
                >
                  <chip.Icon className="text-indigo-600 text-lg" />
                  <span>{chip.label}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
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
      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-sm border flex items-start gap-4">
            <FaAward className="text-indigo-600 text-3xl" />
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Export-Grade Quality</h4>
              <p className="text-gray-600 text-sm">Durable fabrics, precise stitching, and long-lasting sublimation prints.</p>
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm border flex items-start gap-4">
            <FaPalette className="text-indigo-600 text-3xl" />
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Customizations</h4>
              <p className="text-gray-600 text-sm">Logos, names, numbers, and full team colorways available.</p>
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm border flex items-start gap-4">
            <FaGlobeAmericas className="text-indigo-600 text-3xl" />
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Global Shipping</h4>
              <p className="text-gray-600 text-sm">Reliable delivery and support for clubs and distributors worldwide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners / Clients */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <motion.p initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} className="text-center text-gray-500 text-sm tracking-wide uppercase">Trusted by clubs and distributors</motion.p>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ hidden:{}, show:{ transition:{ staggerChildren:0.12 }}}}
            className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 items-center"
          >
            {['Club One','Elite Sports','ProGear','SwiftWear','Prime Kits',"Los Angeles Lakers",
  "Golden State Warriors",
  "Chicago Bulls",
  "Boston Celtics",
  "Miami Heat",
  "WN",
  "AEW",
  "NWA",
  "Impact Wrestling",
  "Ohio Valley Wrestling"].map((name, i)=> (
              <motion.div key={i} variants={{ hidden:{opacity:0, y:10}, show:{opacity:1, y:0}}} className="h-14 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg flex items-center justify-center text-gray-600 text-sm shadow-sm ring-1 ring-gray-200">
                <span className="font-semibold">{name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <FeaturedCategories />
      </section>
      {/* Short About */}
      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold text-indigo-700 mb-3">About ZarkoSportsWear</h3>
            <p className="text-gray-600 mb-4">
              We specialize in designing and exporting high-performance sports team wear worldwide. 
              From football and cricket to running and gym wear, our products are crafted with durable fabrics, 
              precise stitching, and export-grade quality standards.
            </p>
            <div className="flex gap-3">
              <Link to="/about" className="px-5 py-3 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700">Learn More</Link>
              <Link to="/contact" className="px-5 py-3 rounded-md border border-indigo-600 text-indigo-700 font-semibold hover:bg-indigo-50">Contact Us</Link>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden shadow-md">
            <img src="/images/slide2.jpg" alt="About WearConnect" className="w-full h-full object-cover" />
          </div>
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

