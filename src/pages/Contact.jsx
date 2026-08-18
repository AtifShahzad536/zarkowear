import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { useToast } from '../components/Toast.jsx';
import { COMPANY_DETAILS } from '../data/constants';

const Contact = () => {
  const path = window.location.pathname;
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const showToast = useToast();

  useEffect(() => { window.scrollTo(0, 0); }, [path]);

  async function onSubmit(e) {
    e.preventDefault();
    setStatus(''); setError('');
    const formEl = e.currentTarget; // capture before await
    const API = import.meta.env.VITE_API_BASE || 'http://localhost:4000';
    const f = new FormData(formEl);
    const payload = {
      name: f.get('name'),
      email: f.get('email'),
      phone: f.get('phone') || '',
      message: f.get('message'),
    };
    try {
      const res = await fetch(`${API}/api/inquiry/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Send failed');
      setStatus('Your message has been sent. We will reply shortly.');
      showToast({ message: 'Your message has been sent. We will reply shortly.', tone: 'success' });
      formEl.reset();
    } catch (err) {
      setError(err.message || 'Send failed');
      showToast({ message: err.message || 'Send failed', tone: 'error' });
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <SeoHead
        title="Contact Zarko Sportswear | Get Custom Uniform Quotes USA"
        description="Contact Zarko Sportswear for premium custom team jerseys, wrestling singlets, and athletic uniforms with fast shipping to the USA."
        canonical="https://www.zarkosportswear.com/contact"
        keywords="order sports uniforms USA, contact sportswear manufacturer, custom jerseys quote USA, team uniform pricing USA, custom sportswear distributor USA"
        openGraph={{
          'og:title': 'Contact Zarko Sportswear | Get Custom Uniform Quotes USA',
          'og:description': 'Contact Zarko Sportswear for premium custom team jerseys, wrestling singlets, and athletic uniforms with fast shipping to the USA.',
          'og:url': 'https://www.zarkosportswear.com/contact',
        }}
        twitter={{
          'twitter:title': 'Contact Zarko Sportswear | Get Custom Uniform Quotes USA',
          'twitter:description': 'Contact Zarko Sportswear for premium custom team jerseys, wrestling singlets, and athletic uniforms with fast shipping to the USA.',
        }}
      />
      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 -top-20 h-52 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.12),_transparent_60%)]" />
        <div className="relative mx-auto max-w-[94%] px-4 pb-14 pt-10">
          <motion.header initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}  transition={{ duration: 0.6 }} className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">
              USA Support Desk
            </span>
            <h1 className="mt-5 text-3xl sm:text-4xl font-bold text-indigo-900">Contact Zarko Sportswear</h1>
            <p className="mt-3 text-base md:text-lg text-gray-600">
              Connect with our production specialists for custom sports uniform quotes, custom sampling, and fast shipping logistics directly to the USA.
            </p>
          </motion.header>

          {(status || error) && (
            <div className="mt-4 text-sm text-gray-500">We have received your submission.</div>
          )}
         

          <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-indigo-100 bg-white/95 p-6 shadow-xl backdrop-blur-sm space-y-4"
            >
              <h3 className="text-lg font-semibold text-indigo-800">Talk to our team</h3>
              <p className="text-sm text-gray-500">Choose the channel that suits you best or review our <Link to="/about" className="text-indigo-600 hover:underline">manufacturing process</Link> and <Link to="/custom" className="text-indigo-600 hover:underline">custom order guide</Link>.</p>
              <div className="grid gap-4">
                {[{
                  title: 'WhatsApp Support',
                  content: COMPANY_DETAILS.whatsapp,
                  Icon: FaPhoneAlt,
                  sub: 'Direct chat for instant custom team uniform quotes',
                }, {
                  title: 'Email Address',
                  content: COMPANY_DETAILS.email,
                  Icon: FaEnvelope,
                  sub: 'Send design files and specs',
                }, {
                  title: 'Manufacturing HQ',
                  content: COMPANY_DETAILS.address,
                  Icon: FaMapMarkerAlt,
                  sub: 'Sialkot export factory direct to USA & Worldwide',
                }, {
                  title: 'Support Hours',
                  content: 'Mon – Sat, 9:00 – 18:00 EST Support',
                  Icon: FaClock,
                  sub: 'USA & UK timezone coordination available',
                }].map(({ title, content, Icon, sub }) => (
                  <div key={title} className="flex items-start gap-4 rounded-2xl border border-indigo-100 bg-white/95 p-4 shadow-sm">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600/10 text-indigo-600">
                      <Icon />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-indigo-800">{title}</h3>
                      <p className="text-sm text-gray-600">{content}</p>
                      <p className="text-xs text-gray-400">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              
              transition={{ duration: 0.6 }}
              onSubmit={onSubmit}
              className="rounded-2xl border border-indigo-100 bg-white/95 p-6 shadow-xl backdrop-blur-sm space-y-4"
            >
              <h2 className="text-lg font-semibold text-indigo-800">Send us a detailed brief</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="space-y-2 text-sm font-medium text-gray-700">
                  Full name
                  <input name="name" type="text" placeholder="John Doe" className="w-full rounded-xl border border-indigo-100 px-4 py-3 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                </label>
                <label className="space-y-2 text-sm font-medium text-gray-700">
                  Email
                  <input name="email" type="email" placeholder="you@company.com" className="w-full rounded-xl border border-indigo-100 px-4 py-3 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                </label>
              </div>
              <label className="space-y-2 text-sm font-medium text-gray-700 block">
                Phone (optional)
                <input name="phone" type="tel" placeholder="+92 303 9200750" className="w-full rounded-xl border border-indigo-100 px-4 py-3 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </label>
              <label className="space-y-2 text-sm font-medium text-gray-700 block">
                How can we help?
                <textarea name="message" rows="5" placeholder="Tell us about your team (USA, UK, AU, KSA, Italy, Europe), custom uniform requirements (football kits, wrestling gears, hockey uniforms, etc), order quantities, or specific delivery deadlines…" className="w-full rounded-xl border border-indigo-100 px-4 py-3 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
              </label>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs text-gray-500">Response time: within 24 hours on business days.</p>
                <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-500">
                  Send message
                </button>
              </div>
            </motion.form>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            
            transition={{ duration: 0.6 }}
            className="mt-10 overflow-hidden rounded-2xl border border-indigo-100 shadow-xl"
          >
            <iframe
              title="WearConnect Location"
              src="https://maps.google.com/maps?q=Sialkot,%20Pakistan&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="320"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Contact;

