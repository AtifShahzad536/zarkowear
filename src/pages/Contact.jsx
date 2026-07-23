import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { useToast } from '../components/Toast.jsx';

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
        title="Contact Zarko Sportswear | Custom Uniform Quotes USA, UK, KSA & Europe"
        description="Get in touch with Zarko Sportswear. We support sports clubs and distributors in the USA, UK, Australia, Italy, Saudi Arabia, and Europe with custom manufacturing and worldwide shipping."
        canonical="https://www.zarkosportswear.com/contact"
        keywords="contact sportswear manufacturer, order sports uniforms USA, wrestling gears exporter, hockey wear UK, team uniforms quote Saudi Arabia, sportswear supplier Europe"
        openGraph={{
          'og:title': 'Contact Zarko Sportswear | Custom Uniform Quotes USA, UK, KSA & Europe',
          'og:description': 'Get in touch with Zarko Sportswear. We support sports clubs and distributors in the USA, UK, Australia, Italy, Saudi Arabia, and Europe with custom manufacturing and worldwide shipping.',
          'og:url': 'https://www.zarkosportswear.com/contact',
        }}
        twitter={{
          'twitter:title': 'Contact Zarko Sportswear | Custom Uniform Quotes USA, UK, KSA & Europe',
          'twitter:description': 'Get in touch with Zarko Sportswear. We support sports clubs and distributors in the USA, UK, Australia, Italy, Saudi Arabia, and Europe with custom manufacturing and worldwide shipping.',
        }}
      />
      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 -top-20 h-52 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.12),_transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-10">
          <motion.header initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.6 }} className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">
              Global Support Desk
            </span>
            <h1 className="mt-5 text-3xl sm:text-4xl font-bold text-indigo-900">Contact Zarko Sportswear</h1>
            <p className="mt-3 text-base md:text-lg text-gray-600">
              Connect with our production specialists for quotes, custom sampling, and export logistics to USA, UK, Australia, Italy, Saudi Arabia, and Europe.
            </p>
          </motion.header>

          {(status || error) && (
            <div className="mt-4 text-sm text-gray-500">We have received your submission.</div>
          )}
         

          <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border border-indigo-100 bg-white/95 p-6 shadow-xl backdrop-blur-sm space-y-4"
            >
              <h3 className="text-lg font-semibold text-indigo-800">Talk to our team</h3>
              <p className="text-sm text-gray-500">Choose the channel that suits you best or review our <Link to="/about" className="text-indigo-600 hover:underline">manufacturing process</Link> and <Link to="/custom" className="text-indigo-600 hover:underline">custom order guide</Link>.</p>
              <div className="grid gap-4">
                {[{
                  title: 'Call us',
                  content: '+92 303 9200750',
                  Icon: FaPhoneAlt,
                  sub: 'Coordinating around USA, UK, Europe & Australia time zones',
                }, {
                  title: 'Email',
                  content: 'zarkosportswear@gmail.com',
                  Icon: FaEnvelope,
                  sub: 'Replies within one business day',
                }, {
                  title: 'Visit',
                  content: '123 Export Avenue, Sialkot, Pakistan',
                  Icon: FaMapMarkerAlt,
                  sub: 'Production HQ & global shipping hub',
                }, {
                  title: 'Working hours',
                  content: 'Mon – Sat, 9:00 – 18:00 PKT',
                  Icon: FaClock,
                  sub: 'Custom timezone appointments available',
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
                <textarea name="message" rows="5" placeholder="Tell us about your team (USA, UK, AU, KSA, Italy, Europe), custom uniform requirements (football kits, wrestling gears, hockey uniforms, etc), order quantities, or specific delivery deadlines…" className="w-full rounded-xl border border-indigo-100 px-4 py-3 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
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
