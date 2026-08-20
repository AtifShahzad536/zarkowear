import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import { motion } from 'framer-motion';
import { FaUpload, FaFileAlt, FaInbox, FaTruck, FaPalette, FaTags, FaClock, FaCheckCircle, FaShieldAlt } from 'react-icons/fa';

const Custom = () => {
  const [fileName, setFileName] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const path = window.location.pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  async function onSubmit(e) {
    e.preventDefault();
    setStatus(''); setError('');
    const formEl = e.currentTarget;
    const apiBase = (import.meta.env.VITE_API_BASE || '').trim();
    const endpoint = apiBase ? `${apiBase}/api/inquiry/custom` : '/api/inquiry/custom';
    const fd = new FormData(formEl);
    try {
      const res = await fetch(endpoint, { method: 'POST', body: fd });
      const contentType = res.headers.get('content-type') || '';
      const isJson = contentType.includes('application/json');
      let payload;
      try {
        payload = isJson ? await res.json() : await res.text();
      } catch (parseErr) {
        payload = null;
      }

      if (!res.ok) {
        const message = isJson ? payload?.error : (payload || 'Submit failed');
        throw new Error(message || 'Submit failed');
      }

      if (isJson && payload?.message) {
        setStatus(payload.message);
      } else {
        setStatus('Your request has been submitted. We will contact you soon.');
      }
      formEl.reset();
      setFileName('');
    } catch (err) {
      setError(err.message || 'Submit failed');
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <SeoHead
        title="Custom Sportswear USA | Free Design & Fast Delivery Zarko"
        description="Order custom sportswear online built for USA teams, no minimums, free design mockups. Get a free quote in minutes from Zarko Sportswear."
        canonical="https://www.zarkosportswear.com/custom"
        keywords="custom sportswear USA, custom sports uniforms USA, custom teamwear USA, private label teamwear, custom wrestling singlets, custom soccer jerseys USA, custom basketball uniforms"
        openGraph={{
          'og:title': 'Custom Sportswear USA | Free Design & Fast Delivery - Zarko',
          'og:description': 'Order custom sportswear online built for USA teams, no minimums, free design mockups. Get a free quote in minutes from Zarko Sportswear.',
          'og:url': 'https://www.zarkosportswear.com/custom',
        }}
        twitter={{
          'twitter:title': 'Custom Sportswear USA | Free Design & Fast Delivery Zarko',
          'twitter:description': 'Order custom sportswear online built for USA teams, no minimums, free design mockups. Get a free quote in minutes from Zarko Sportswear.',
        }}
      />

      {/* Hero Header Section */}
      <section className="bg-[#0A0C16] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.15),transparent_45%)]" />
        <div className="mx-auto max-w-[94%] px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-indigo-400 rounded-none">
              USA Teamwear Supplier
            </span>
            <h1 className="mt-6 text-3xl sm:text-4xl font-semibold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
              Custom Sportswear & Team Uniforms Built for USA Teams
            </h1>
            <p className="mt-6 text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Zarko Sportswear manufactures high-performance custom jerseys, uniforms, and fitness apparel. Get factory-direct USD pricing, no minimums, and quick DHL door-to-door shipping to CA, TX, NY, FL, and nationwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust & Benefits Grid */}
      <section className="py-12 mx-auto max-w-[94%] px-4 -mt-10 relative z-20">
        <div className="grid gap-6 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-8 border border-slate-200 shadow-sm flex flex-col items-start gap-4 rounded-none"
          >
            <div className="h-12 w-12 bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl font-semibold rounded-none">
              <FaPalette />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 text-sm">Free Design & Mockups</h3>
              <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                Send us your logos, sketches, or design ideas. Our professional design squad will draft digital mockups for your team within 24 hours — completely free.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 border border-slate-200 shadow-sm flex flex-col items-start gap-4 rounded-none"
          >
            <div className="h-12 w-12 bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl font-semibold rounded-none">
              <FaTags />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 text-sm">No Minimum Quantities</h3>
              <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                Whether you need to outfit a roster of 100 players or simply want a single replacement jersey, we support low and no MOQ orders to keep sizing flexible.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white p-8 border border-slate-200 shadow-sm flex flex-col items-start gap-4 rounded-none"
          >
            <div className="h-12 w-12 bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl font-semibold rounded-none">
              <FaTruck />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 text-sm">Fast Door-to-Door Delivery</h3>
              <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                We handle the manufacturing and export directly. All custom shipments are sent via express DHL/FedEx air courier with tracking straight to your clubhouse or home.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-12 bg-white border-y border-slate-200/50">
        <div className="mx-auto max-w-[94%] px-4">
          <div className="text-center mb-12">
            <h2 className="text-xl font-semibold text-slate-800">How It Works</h2>
            <p className="text-[11px] text-slate-500 mt-1">Get custom uniforms manufactured and shipped in 4 simple steps</p>
          </div>
          <div className="grid gap-6 md:grid-cols-4 relative">
            <div className="flex flex-col items-center text-center p-4">
              <div className="h-10 w-10 bg-indigo-600 text-white flex items-center justify-center font-bold text-sm mb-4 rounded-none">1</div>
              <h4 className="font-semibold text-xs text-slate-700">Submit Details</h4>
              <p className="text-[10px] text-slate-400 mt-2">Fill the secure form below with your sport, sizes, and design notes.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="h-10 w-10 bg-indigo-600 text-white flex items-center justify-center font-bold text-sm mb-4 rounded-none">2</div>
              <h4 className="font-semibold text-xs text-slate-700">Approve Design</h4>
              <p className="text-[10px] text-slate-400 mt-2">Our team sends high-resolution mockups within 24h for your signoff.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="h-10 w-10 bg-indigo-600 text-white flex items-center justify-center font-bold text-sm mb-4 rounded-none">3</div>
              <h4 className="font-semibold text-xs text-slate-700">Dye-Sub Production</h4>
              <p className="text-[10px] text-slate-400 mt-2">Factory production processes layout, printing, cutting, and stitching.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="h-10 w-10 bg-indigo-600 text-white flex items-center justify-center font-bold text-sm mb-4 rounded-none">4</div>
              <h4 className="font-semibold text-xs text-slate-700">Express Delivery</h4>
              <p className="text-[10px] text-slate-400 mt-2">DHL Courier ships directly to your USA doorstep with live GPS tracking.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Request Form & Information */}
      <section className="py-16 mx-auto max-w-[94%] px-4">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] items-start">
          
          {/* Form */}
          <div className="bg-white border border-slate-200 p-8 shadow-sm space-y-6 rounded-none">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Request a Free Custom Quote</h2>
              <p className="text-[11px] text-slate-500 mt-1">Provide your details and custom uniform requirements below. We reply within 12 hours.</p>
            </div>

            {status && <div className="p-4 bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100 flex items-center gap-2 rounded-none"><FaCheckCircle /> {status}</div>}
            {error && <div className="p-4 bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-100 flex items-center gap-2 rounded-none">{error}</div>}

            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-xs font-semibold text-slate-700 flex flex-col">
                  Full Name
                  <input name="name" className="w-full border border-slate-200 px-4 py-3 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-none" type="text" placeholder="Jane Smith" required />
                </label>
                <label className="space-y-2 text-xs font-semibold text-slate-700 flex flex-col">
                  Email Address
                  <input name="email" className="w-full border border-slate-200 px-4 py-3 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-none" type="email" placeholder="you@club.com" required />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-xs font-semibold text-slate-700 flex flex-col">
                  Phone (Optional)
                  <input name="phone" className="w-full border border-slate-200 px-4 py-3 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-none" type="tel" placeholder="+1 (555) 000-0000" />
                </label>
                <label className="space-y-2 text-xs font-semibold text-slate-700 flex flex-col">
                  Team / Club Name
                  <input name="company" className="w-full border border-slate-200 px-4 py-3 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-none" type="text" placeholder="LA Mavericks" />
                </label>
              </div>

              <label className="space-y-2 text-xs font-semibold text-slate-700 flex flex-col">
                Project Details
                <textarea name="message" className="w-full border border-slate-200 px-4 py-3 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-none" rows="5" placeholder="Specify sport, estimated quantities, sizes required, design notes, colors..." required />
              </label>

              <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                <label className="flex flex-col items-center justify-center gap-3 border border-dashed border-indigo-300 bg-indigo-50/20 p-6 text-center text-indigo-700 hover:bg-indigo-50/40 transition cursor-pointer rounded-none" htmlFor="file-upload">
                  <span className="inline-flex h-10 w-10 items-center justify-center bg-indigo-100 text-indigo-600 text-lg rounded-none">
                    <FaUpload />
                  </span>
                  <div>
                    <p className="font-semibold text-xs">Upload layout, logos or drafts</p>
                    <p className="text-[10px] text-indigo-500 mt-1">PDF, PNG, JPG up to 10MB</p>
                  </div>
                  <input
                    id="file-upload"
                    name="file"
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
                    className="hidden"
                  />
                </label>
                
                <div className="border border-slate-200 bg-slate-50/50 p-5 text-slate-600 flex flex-col justify-between rounded-none">
                  <div>
                    <h4 className="font-semibold text-slate-700 text-xs flex items-center gap-2">
                      <FaInbox className="text-indigo-600" /> What's Next?
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
                      We evaluate your requirements and generate design drafts with a customized direct-factory USD invoice within 12h.
                    </p>
                  </div>
                  {fileName && (
                    <div className="mt-3 flex items-center gap-2 text-indigo-700 font-medium text-xs bg-white p-2 border rounded-none">
                      <FaFileAlt />
                      <span className="truncate max-w-[150px]">{fileName}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <p className="text-[10px] text-slate-400 flex items-center gap-1.5"><FaShieldAlt /> 100% Secure Team Order Processing</p>
                <button type="submit" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-8 py-3 text-xs font-bold text-white shadow-sm hover:shadow transition rounded-none">
                  Submit Mockup Request
                </button>
              </div>
            </form>
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 p-6 shadow-sm space-y-4 rounded-none">
              <h3 className="font-semibold text-slate-800 text-xs">Design Assets Checklist</h3>
              <p className="text-[11px] text-slate-500">Ensure fast processing by sharing the following elements if available:</p>
              <ul className="space-y-3 text-[11px] text-slate-600">
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-emerald-500 mt-0.5" />
                  <span><strong>High-Resolution Logos:</strong> Vector formats (.AI, .EPS, .PDF) are ideal for dye sublimation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-emerald-500 mt-0.5" />
                  <span><strong>HEX Color Codes:</strong> Specify exact color schemes to guarantee uniform matching.</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-emerald-500 mt-0.5" />
                  <span><strong>Size Breakdown:</strong> Provide size ratios based on standard US athletic fits.</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#0A0C16] text-white p-6 shadow-sm space-y-4 relative overflow-hidden rounded-none">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(79,70,229,0.1),transparent_50%)]" />
              <div className="relative z-10 space-y-3">
                <div className="h-8 w-8 bg-indigo-600/20 text-indigo-400 flex items-center justify-center text-sm rounded-none">
                  <FaClock />
                </div>
                <h4 className="font-semibold text-xs">Urgent League Deadline?</h4>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  If you have a tournament or league season commencing shortly, we offer expedited factory lines. Mark your required deadline in the project details.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
};

export default Custom;
