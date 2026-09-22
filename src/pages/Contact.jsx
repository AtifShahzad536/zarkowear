import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import { motion } from 'framer-motion';
import { 
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp, 
  FaCheckCircle, FaPaperPlane, FaTshirt, FaGlobeAmericas, FaShieldAlt 
} from 'react-icons/fa';
import { useToast } from '../components/Toast.jsx';
import { COMPANY_DETAILS } from '../data/constants';

const SPORTS_CATEGORIES = [
  '⚽ Custom Football Uniforms & Jerseys',
  '🏀 Basketball Jerseys & Team Shorts',
  '🤼 Wrestling Singlets & Compression Gear',
  '🏏 Cricket Uniforms & Whites',
  '⚽ Soccer Sublimated Kits & Strips',
  '🏑 Field / Ice Hockey Uniforms',
  '🏉 Rugby Jerseys & Team Kits',
  '🏃 Tracksuits & Athletic Training Wear',
  '🥊 Boxing, MMA & Combat Sportswear',
  '👟 Custom Athletic Footwear & Turf Shoes',
  '🧢 Team Caps, Hoodies & Gear Bags',
  '❓ Other Custom Activewear / Sports Gear'
];

const ORDER_TYPES = [
  'Full Custom Sublimation & Teamwear',
  'OEM / Private Label Brand Manufacturing',
  'Bulk Wholesale Order (MOQ 10+ kits)',
  'Custom 3D Mockup & Sample Prototype',
  'Contract Embroidery & Screen Printing'
];

const QUANTITY_RANGES = [
  '10 – 25 Kits (Small Club / Squad)',
  '25 – 100 Kits (School / Academy)',
  '100 – 300 Kits (League / Tournament)',
  '300 – 1,000+ Kits (Wholesale / Brand)',
  '1,000+ Kits (Bulk Enterprise Order)'
];

const TIMELINES = [
  '⚡ Urgent / Rush Order (< 2 Weeks)',
  '📅 Standard Delivery (3–4 Weeks)',
  '🏆 Upcoming Season Prep (1–2 Months)',
  '🔍 Exploring Pricing & Sampling'
];

const Contact = () => {
  const path = window.location.pathname;
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const showToast = useToast();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    sport: SPORTS_CATEGORIES[0],
    orderType: ORDER_TYPES[0],
    quantity: QUANTITY_RANGES[0],
    timeline: TIMELINES[1],
    message: ''
  });

  useEffect(() => { 
    window.scrollTo(0, 0); 
  }, [path]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  async function onSubmit(e) {
    e.preventDefault();
    setStatus(''); 
    setError('');
    setLoading(true);

    const API = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

    // Structured message containing all sportswear B2B specifics
    const structuredMessage = [
      `🏟️ SPORT CATEGORY: ${formData.sport}`,
      `📦 ORDER TYPE: ${formData.orderType}`,
      `🔢 ESTIMATED QUANTITY: ${formData.quantity}`,
      `⏱️ TARGET TIMELINE: ${formData.timeline}`,
      `🏢 CLUB / BRAND: ${formData.company || 'Not Specified'}`,
      `----------------------------------------`,
      `📝 REQUIREMENTS & SPECS:`,
      formData.message || 'No additional details provided.'
    ].join('\n');

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      message: structuredMessage,
      type: 'contact',
      sport: formData.sport,
      quantity: formData.quantity
    };

    try {
      const res = await fetch(`${API}/api/inquiry/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Send failed');
      
      setStatus('Your custom sportswear inquiry has been received! Our production team will contact you with mockups & pricing within 24 hours.');
      showToast({ message: 'Inquiry submitted successfully! We will get back to you shortly.', tone: 'success' });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        sport: SPORTS_CATEGORIES[0],
        orderType: ORDER_TYPES[0],
        quantity: QUANTITY_RANGES[0],
        timeline: TIMELINES[1],
        message: ''
      });
    } catch (err) {
      setError(err.message || 'Failed to send inquiry. Please try WhatsApp for immediate quote.');
      showToast({ message: err.message || 'Send failed', tone: 'error' });
    } finally {
      setLoading(false);
    }
  }

  // Pre-formatted WhatsApp Message URL
  const getWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hi Zarko Sportswear! I'd like a quick quote for custom uniforms:\n` +
      `• Name: ${formData.name || 'Interested Buyer'}\n` +
      `• Club/Brand: ${formData.company || 'N/A'}\n` +
      `• Sport: ${formData.sport}\n` +
      `• Quantity: ${formData.quantity}\n` +
      `• Service: ${formData.orderType}\n` +
      `Please share B2B pricing and catalog!`
    );
    return `https://wa.me/923039200750?text=${text}`;
  };

  return (
    <main className="min-h-screen bg-slate-50/50">
      <SeoHead
        title="Contact Zarko Sportswear | Custom Sports Uniforms & Teamwear Quotes USA"
        description="Contact Zarko Sportswear for factory-direct custom team jerseys, wrestling singlets, football uniforms, and private label sportswear. Fast worldwide shipping to USA, UK & Europe."
        canonical="https://www.zarkosportswear.com/contact"
        keywords="order sports uniforms USA, custom teamwear factory, sportswear manufacturer Sialkot, custom football jerseys quote, wrestling singlets wholesale USA, private label athletic apparel"
        openGraph={{
          'og:title': 'Contact Zarko Sportswear | Custom Sports Uniforms & Teamwear Quotes USA',
          'og:description': 'Factory-direct custom team jerseys, wrestling singlets, football uniforms, and private label sportswear with fast USA express shipping.',
          'og:url': 'https://www.zarkosportswear.com/contact',
        }}
        twitter={{
          'twitter:title': 'Contact Zarko Sportswear | Custom Sports Uniforms & Teamwear Quotes USA',
          'twitter:description': 'Factory-direct custom team jerseys, wrestling singlets, football uniforms, and private label sportswear with fast USA express shipping.',
        }}
      />

      {/* ── HEADER BANNER ── */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-16 pb-20 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.25),rgba(255,255,255,0))] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#312e81_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

        <div className="relative mx-auto max-w-[94%] px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-indigo-400">
              ⚡ Factory-Direct Sportswear & Custom Teamwear
            </span>
            <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Request A Custom Uniform Quote
            </h1>
            <p className="mt-3 text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Partner with Zarko Sportswear for premium sublimation jerseys, wrestling singlets, and high-performance teamwear. Direct export manufacturing with express shipping to the USA, UK, Europe, & Worldwide.
            </p>

            {/* Quick Trust Highlights */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-semibold text-slate-300">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <FaCheckCircle className="text-emerald-400" /> Low MOQ (10 Kits)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <FaTshirt className="text-indigo-400" /> Free 3D Digital Mockup
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <FaGlobeAmericas className="text-blue-400" /> USA Express Door Delivery
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <FaShieldAlt className="text-amber-400" /> 100% Quality Inspected
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MAIN INQUIRY & CONTACT SECTION ── */}
      <section className="relative mx-auto max-w-[94%] px-4 -mt-10 pb-20 z-10">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          
          {/* 1. SPORTSWEAR DETAILED INQUIRY FORM */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 md:p-10 shadow-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">B2B & Team Inquiry</span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight mt-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Custom Order Specifications
                </h2>
              </div>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider shadow-sm transition shrink-0"
              >
                <FaWhatsapp className="text-base" />
                <span>Instant WhatsApp Quote</span>
              </a>
            </div>

            {status && (
              <div className="mt-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-3">
                <FaCheckCircle className="text-emerald-600 text-lg shrink-0" />
                <span>{status}</span>
              </div>
            )}

            {error && (
              <div className="mt-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm font-semibold flex items-center gap-3">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={onSubmit} className="mt-6 space-y-6">
              {/* Row 1: Name & Club/Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Your Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. John Doe / Coach Mike"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Club / Academy / Brand Name
                  </label>
                  <input
                    name="company"
                    type="text"
                    placeholder="e.g. Texas Storm Football / Elite Athletics"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition"
                  />
                </div>
              </div>

              {/* Row 2: Email & Phone/WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Business Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@team.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Phone / WhatsApp (with country code)
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="e.g. +1 555-019-2834"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition"
                  />
                </div>
              </div>

              {/* Row 3: Sport Category & Order Type (Dropdowns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Sport / Product Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="sport"
                    value={formData.sport}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition cursor-pointer"
                  >
                    {SPORTS_CATEGORIES.map(sport => (
                      <option key={sport} value={sport}>{sport}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Manufacturing Service Required
                  </label>
                  <select
                    name="orderType"
                    value={formData.orderType}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition cursor-pointer"
                  >
                    {ORDER_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 4: Quantity & Target Timeline (Dropdowns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Estimated Order Quantity <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition cursor-pointer"
                  >
                    {QUANTITY_RANGES.map(range => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Required Delivery Timeline
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition cursor-pointer"
                  >
                    {TIMELINES.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 5: Detailed Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Customization Details & Fabric Preferences <span className="text-rose-500">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your team colors, required sizes, logo placements (vector AI/PDF/PNG), fabric specs (Dri-FIT, 4-Way Lycra, Mesh), or any reference photos..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition"
                />
              </div>

              {/* Submit & Response Note */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <FaClock className="text-indigo-500" />
                  <span>Avg. response time: within 2 to 4 business hours.</span>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 text-xs font-bold uppercase tracking-wider shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all hover:-translate-y-0.5 disabled:opacity-60 cursor-pointer"
                >
                  <FaPaperPlane />
                  <span>{loading ? 'Submitting Inquiry...' : 'Submit Quote Request'}</span>
                </button>
              </div>
            </form>
          </motion.div>

          {/* 2. DIRECT CHANNELS & MANUFACTURING HEADQUARTERS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Quick Contact Info Cards */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl space-y-5">
              <h3 className="text-lg font-black uppercase tracking-tight text-slate-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Direct Contact Channels
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Connect directly with our export division for instant digital mockups, tech packs, fabric swatches, and wholesale price sheets.
              </p>

              <div className="space-y-4 pt-2">
                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${COMPANY_DETAILS.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Hi Zarko Sportswear, I'd like to discuss a custom teamwear order.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-2xl border border-emerald-100 bg-emerald-50/50 hover:bg-emerald-50 transition group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <FaWhatsapp className="text-lg" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-900">Direct WhatsApp</div>
                    <div className="text-sm font-bold text-emerald-700">{COMPANY_DETAILS.whatsapp}</div>
                    <div className="text-[11px] text-emerald-600 mt-0.5">Instant chat & 3D mockup consultation</div>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${COMPANY_DETAILS.email}`}
                  className="flex items-start gap-4 p-4 rounded-2xl border border-indigo-100 bg-indigo-50/50 hover:bg-indigo-50 transition group"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <FaEnvelope className="text-base" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-indigo-900">Email Inquiry</div>
                    <div className="text-sm font-bold text-indigo-700 break-all">{COMPANY_DETAILS.email}</div>
                    <div className="text-[11px] text-indigo-600 mt-0.5">Send tech packs, vector logos & bulk rosters</div>
                  </div>
                </a>

                {/* Factory HQ */}
                <div className="flex items-start gap-4 p-4 rounded-2xl border border-slate-200 bg-slate-50/70">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <FaMapMarkerAlt className="text-base" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-900">Manufacturing HQ</div>
                    <div className="text-sm font-bold text-slate-700">{COMPANY_DETAILS.address}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Sialkot Global Export Zone &bull; Direct to USA</div>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4 p-4 rounded-2xl border border-slate-200 bg-slate-50/70">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <FaClock className="text-base" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-900">Support Hours</div>
                    <div className="text-sm font-bold text-slate-700">Mon – Sat: 9:00 AM – 7:00 PM (PKT / EST Support)</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">24/7 WhatsApp quote desk available for USA clients</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom 3D Builder Teaser */}
            <div className="rounded-3xl bg-gradient-to-br from-indigo-900 to-slate-950 p-6 sm:p-7 text-white shadow-xl space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-[10px] font-bold uppercase tracking-widest text-indigo-300">
                ✨ Interactive 3D Studio
              </span>
              <h4 className="text-xl font-black uppercase tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Design In 3D Real-Time
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Prefer to customize your team kit visually? Use our 3D customizer to change colors, add team logos, player numbers, and request a factory sample.
              </p>
              <Link
                to="/builder"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-white text-indigo-950 hover:bg-indigo-50 px-5 py-2.5 rounded-xl transition shadow-sm"
              >
                <span>Launch 3D Builder</span>
                <span>→</span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ── 3. INTERACTIVE RELIABLE MAP & GLOBAL SHIPPING HUB ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl"
        >
          <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-indigo-400">Global Export Hub</div>
              <h3 className="text-xl font-black uppercase tracking-tight mt-0.5" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Sialkot Production & Logistics Center
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Direct export dispatch via DHL Express, FedEx, & Air Cargo to USA, UK, Europe, Australia, & GCC.
              </p>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Sialkot+Punjab+Pakistan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider shadow-sm transition shrink-0"
            >
              <FaMapMarkerAlt />
              <span>Open in Google Maps</span>
            </a>
          </div>

          <div className="relative w-full h-[360px] bg-slate-100">
            <iframe
              title="Zarko Sportswear Manufacturing Facility Sialkot"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107872.29654160408!2d74.45524673412586!3d32.49722363162799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391eebe469ad033f%3A0xc3b5e40c83a7c645!2sSialkot%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1711000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default Contact;
