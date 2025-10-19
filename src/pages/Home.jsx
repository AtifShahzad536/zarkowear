import React, { useEffect } from 'react';
import SeoHead from '../components/SeoHead';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import TopSellingProducts from '../components/Home/Top';
import FeaturedCategories from '../components/Home/Feature';
import LimitedTimeOffer from '../components/Home/LimitedTimeOffer';
import Testimonials from '../components/Home/Customer';
import { Link } from 'react-router-dom';
import { FaFootballBall, FaBasketballBall, FaRunning, FaAward, FaPalette, FaGlobeAmericas, FaHatCowboy, FaShoppingBag } from 'react-icons/fa';
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
      <section className="bg-indigo-600 text-white py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.h2 initial={{opacity:0, x:-20}} whileInView={{opacity:1, x:0}} viewport={{once:true}} className="text-2xl font-bold">
            Premium Team Wear for Every Sport
          </motion.h2>
          <motion.div initial={{opacity:0, x:20}} whileInView={{opacity:1, x:0}} viewport={{once:true}} className="flex gap-3">
            <Link to="/football" className="bg-white text-indigo-700 font-semibold px-5 py-3 rounded-md hover:bg-gray-100">Shop Sports Wear</Link>
            <Link to="/custom" className="bg-indigo-800 text-white font-semibold px-5 py-3 rounded-md hover:bg-indigo-900">Custom Orders</Link>
          </motion.div>
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

      {/* Newsletter CTA */}
      <section className="bg-indigo-50">
        <div className="max-w-3xl mx-auto px-4 py-10 text-center">
          <h3 className="text-2xl font-bold text-indigo-700">Stay updated with WearConnect</h3>
          <p className="text-gray-600 mt-2">Get product updates, seasonal offers, and customization tips.</p>
          <form onSubmit={(e)=>e.preventDefault()} className="mt-5 flex gap-2 max-w-md mx-auto">
            <input type="email" required placeholder="Enter your email" className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <button className="px-4 py-2 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700">Subscribe</button>
          </form>
        </div>
      </section>
    

      
    </main>
  );
};

export default Home;

