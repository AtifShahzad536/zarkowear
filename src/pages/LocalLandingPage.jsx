import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaTruck, FaShieldAlt, FaTshirt } from 'react-icons/fa';

const US_STATES = {
  california: {
    name: 'California',
    code: 'CA',
    desc: 'Powering Golden State athletic clubs, youth soccer clubs, high school varsity squads, and beach volleyball teams with elite, lightweight sublimated kits.',
    colleges: 'Serving sports organizations from Los Angeles to San Francisco, San Diego, and Sacramento.',
  },
  texas: {
    name: 'Texas',
    code: 'TX',
    desc: 'Outfitting Lone Star State football leagues, high school baseball teams, wrestling clubs, and recreational sports associations with high-durability apparel.',
    colleges: 'Trusted supplier for teams throughout Houston, Dallas, Austin, and San Antonio.',
  },
  'new-york': {
    name: 'New York',
    code: 'NY',
    desc: 'Supplying Empire State basketball leagues, corporate sports programs, scholastic athletic teams, and amateur football clubs with premium, breathable uniforms.',
    colleges: 'Outfitting leagues from NYC boroughs to Buffalo, Rochester, Albany, and Syracuse.',
  },
  florida: {
    name: 'Florida',
    code: 'FL',
    desc: 'Bringing moisture-wicking and UV-shielded dry-fit soccer, baseball, and athletic gear to Sunshine State sports leagues, training facilities, and academies.',
    colleges: 'Serving sports communities across Miami, Orlando, Tampa, and Jacksonville.',
  },
};

const LocalLandingPage = () => {
  const { state } = useParams();
  const slug = (state || 'california').toLowerCase();
  const stateData = US_STATES[slug] || {
    name: state ? state.charAt(0).toUpperCase() + state.slice(1) : 'USA',
    code: 'US',
    desc: `Premium custom team sportswear, soccer jerseys, wrestling singlets, and club apparel manufactured and delivered door-to-door in ${state || 'the USA'}.`,
    colleges: `Trusted supplier for scholastic leagues, sports clubs, and youth academies across the state of ${state || 'the USA'}.`,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const pageTitle = `Custom Sportswear & Sports Uniforms in ${stateData.name} | Zarko`;
  const pageDesc = `Get high-quality custom sports uniforms, custom soccer jerseys, and wrestling singlets in ${stateData.name} direct from the manufacturer. Fast shipping!`;
  const canonicalUrl = `https://www.zarkosportswear.com/custom-sportswear-${slug}`;

  // Structured Data Schema for Local SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `Zarko Sportswear - ${stateData.name} Division`,
    image: 'https://www.zarkosportswear.com/og-cover.jpg',
    url: canonicalUrl,
    telephone: '+92-303-9220750',
    email: 'zarkosportswear@gmail.com',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: stateData.name,
      addressCountry: 'US',
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: stateData.name,
    },
    description: `Custom sportswear manufacturer supplying high school teams, amateur leagues, and athletic clubs in ${stateData.name} with sublimated jerseys and singlets.`,
  };

  return (
    <main className="min-h-screen bg-[#0A0C16] text-white">
      <SeoHead
        title={pageTitle}
        description={pageDesc}
        canonical={canonicalUrl}
        keywords={`custom sportswear ${stateData.name}, sports uniforms ${stateData.name}, custom jerseys ${stateData.name}, local team apparel ${stateData.name}`}
        jsonLd={jsonLd}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 sm:py-32 border-b border-white/5">
        <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[500px] h-[250px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-[94%] mx-auto px-4 text-center relative z-10 space-y-6">
          <span className="inline-flex items-center gap-2 rounded-none border border-indigo-500/20 bg-indigo-500/5 px-4 py-1.5 text-xs font-black uppercase tracking-[0.25em] text-indigo-400">
            USA Regional Services • {stateData.code}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Custom Sportswear &<br />Team Uniforms in {stateData.name}
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
            {stateData.desc} {stateData.colleges} We offer factory-direct prices, free custom digital mockups, and low MOQs.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link
              to="/custom"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 text-xs uppercase tracking-widest transition duration-150"
            >
              Start Custom Design
            </Link>
            <Link
              to="/contact"
              className="bg-white/5 hover:bg-white/10 text-white font-bold px-8 py-4 text-xs uppercase tracking-widest border border-white/10 transition duration-150"
            >
              Get Free Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Local Advantages */}
      <section className="py-20 max-w-[94%] mx-auto px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white/5 border border-white/10 p-8 space-y-4 hover:border-indigo-500/50 transition">
            <div className="inline-flex p-3 bg-indigo-600/10 text-indigo-400 text-lg mb-2">
              <FaTruck />
            </div>
            <h3 className="text-lg font-bold uppercase tracking-wider">Fast Shipping to {stateData.name}</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-semibold">
              Leverage our direct express delivery agreements. Customized orders reach destinations in {stateData.name} in just 3-5 business days once shipped.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 space-y-4 hover:border-indigo-500/50 transition">
            <div className="inline-flex p-3 bg-indigo-600/10 text-indigo-400 text-lg mb-2">
              <FaShieldAlt />
            </div>
            <h3 className="text-lg font-bold uppercase tracking-wider">Compliance Assured</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-semibold">
              All layouts align precisely with local school sports divisions, high school athletic leagues, and varsity rules for size, colors, and marks.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 space-y-4 hover:border-indigo-500/50 transition">
            <div className="inline-flex p-3 bg-indigo-600/10 text-indigo-400 text-lg mb-2">
              <FaTshirt />
            </div>
            <h3 className="text-lg font-bold uppercase tracking-wider">Premium Fabrication</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-semibold">
              From heavy-duty Spandex for wrestling to aerated Dri-FIT mesh polyester for summer soccer, we use fabrics designed to perform.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Sports Kits */}
      <section className="py-20 bg-slate-950 border-t border-b border-white/5">
        <div className="max-w-[94%] mx-auto px-4 text-center space-y-12">
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-indigo-400 block">
              Trending Categories
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-white">
              Outfit Your Entire Program
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'Football Kits', to: '/football', desc: 'Breathable, double-stitch jerseys.' },
              { name: 'Soccer Jerseys', to: '/soccer', desc: 'Moisture-wicking aerated interlock.' },
              { name: 'Wrestling Singlets', to: '/wrestling', desc: '4-way high compression lycra.' },
              { name: 'Basketball Sets', to: '/basketball', desc: 'Oversized, lightweight pro mesh.' },
            ].map((sport) => (
              <div key={sport.name} className="border border-white/5 bg-white/[0.02] p-6 flex flex-col justify-between h-48 hover:border-indigo-500 transition">
                <div className="space-y-2 text-left">
                  <h4 className="font-extrabold text-white text-sm uppercase tracking-wider">{sport.name}</h4>
                  <p className="text-xs text-slate-400 font-semibold">{sport.desc}</p>
                </div>
                <Link to={sport.to} className="text-xs text-indigo-400 font-bold hover:text-indigo-300 text-left">
                  View Collection →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Contact Form link */}
      <section className="py-20 max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="text-3xl font-black uppercase text-white">Ready to Order in {stateData.name}?</h2>
        <p className="text-sm text-slate-300 font-semibold max-w-lg mx-auto">
          Contact our specialized USA support team to request layout designs, physical fabric swatches, or dynamic price lists tailored to your team size.
        </p>
        <div className="flex justify-center gap-8 pt-4 text-xs font-bold text-slate-400">
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-indigo-400" />
            <span>+92-303-9220750</span>
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-indigo-400" />
            <span>zarkosportswear@gmail.com</span>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-indigo-400" />
            <span>Sialkot, Pakistan (Production)</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LocalLandingPage;
