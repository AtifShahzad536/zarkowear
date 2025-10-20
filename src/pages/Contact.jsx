import React, { useEffect, useState } from 'react';
import SeoHead from '../components/SeoHead';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Contact = () => {
  const path = window.location.pathname;
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

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
      formEl.reset();
    } catch (err) {
      setError(err.message || 'Send failed');
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-indigo-50/30 to-white">
      <SeoHead
        title="Contact Zarko Sportswear | Request Quotes & Support"
        description="Contact Zarko Sportswear for custom sports uniform quotes, export inquiries, or customer support."
        canonical="https://www.zarkosportswear.com/contact"
        openGraph={{
          'og:title': 'Contact Zarko Sportswear | Request Quotes & Support',
          'og:description': 'Contact Zarko Sportswear for custom sports uniform quotes, export inquiries, or customer support.',
          'og:url': 'https://www.zarkosportswear.com/contact',
        }}
        twitter={{
          'twitter:title': 'Contact Zarko Sportswear | Request Quotes & Support',
          'twitter:description': 'Contact Zarko Sportswear for custom sports uniform quotes, export inquiries, or customer support.',
        }}
      />
      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 -top-20 h-52 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.12),_transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-10">
          <motion.header initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.6 }} className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">
              Let's collaborate
            </span>
            <h1 className="mt-5 text-3xl sm:text-4xl font-bold text-indigo-900">Contact Zarko Sportswear</h1>
            <p className="mt-3 text-base md:text-lg text-gray-600">
              Reach our production specialists for quotes, sampling timelines, and export support.
            </p>
          </motion.header>

          {status && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6 px-4 py-3 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 text-sm text-left">
              {status}
            </motion.div>
          )}
          {error && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6 px-4 py-3 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 text-sm text-left">
              {error}
            </motion.div>
          )}
         

          <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border border-indigo-100 bg-white/95 p-6 shadow-xl backdrop-blur-sm space-y-4"
            >
              <h2 className="text-lg font-semibold text-indigo-800">Talk to our team</h2>
              <p className="text-sm text-gray-500">Choose the channel that suits you best and we'll get back ASAP.</p>
              <div className="grid gap-4">
                {[{
                  title: 'Call us',
                  content: '+92 303 9200750',
                  Icon: FaPhoneAlt,
                  sub: 'Mon–Sat · 9am–6pm PKT',
                }, {
                  title: 'Email',
                  content: 'zarkosportswear@gmail.com',
                  Icon: FaEnvelope,
                  sub: 'Replies within one business day',
                }, {
                  title: 'Visit',
                  content: '123 Export Avenue, Sialkot, Pakistan',
                  Icon: FaMapMarkerAlt,
                  sub: 'Production HQ & sampling studio',
                }, {
                  title: 'Working hours',
                  content: 'Mon – Sat, 9:00 – 18:00 PKT',
                  Icon: FaClock,
                  sub: 'Custom appointments available',
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
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6 }}
              onSubmit={onSubmit}
              className="rounded-3xl border border-indigo-100 bg-white/95 p-6 shadow-xl backdrop-blur-sm space-y-4"
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
                <textarea name="message" rows="5" placeholder="Tell us about your team, quantities, fabrics, or timelines…" className="w-full rounded-xl border border-indigo-100 px-4 py-3 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
              </label>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs text-gray-500">Response time: within 24 hours on business days.</p>
                <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-500">
                  Send message
                </button>
              </div>
            </motion.form>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="mt-10 overflow-hidden rounded-[32px] border border-indigo-100 shadow-xl"
          >
            <iframe
              title="WearConnect Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13286.295826737072!2d74.535!3d32.492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f0b3e1f7f76d7%3A0xa3e91f!2sSialkot!5e0!3m2!1sen!2s!4v1700000000000"
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
