import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import { motion } from 'framer-motion';
import { FaUpload, FaFileAlt, FaInbox } from 'react-icons/fa';

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
    const formEl = e.currentTarget; // capture before await
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
      setStatus('Your request has been submitted. We will contact you soon.');
      formEl.reset();
      setFileName('');
    } catch (err) {
      setError(err.message || 'Submit failed');
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <SeoHead
        title="Custom Sportswear Orders | Design Export-Grade Team Kits"
        description="Submit custom sportswear requests to Zarko Sportswear for export-grade jerseys, shorts, and accessories."
        canonical="https://www.zarkosportswear.com/custom"
        openGraph={{
          'og:title': 'Custom Sportswear Orders | Design Export-Grade Team Kits',
          'og:description': 'Submit custom sportswear requests with Zarko Sportswear and get export-grade jerseys, shorts, and accessories tailored to your team.',
          'og:url': 'https://www.zarkosportswear.com/custom',
        }}
        twitter={{
          'twitter:title': 'Custom Sportswear Orders | Design Export-Grade Team Kits',
          'twitter:description': 'Submit custom sportswear requests with Zarko Sportswear and get export-grade jerseys, shorts, and accessories tailored to your team.',
        }}
      />
      <section>
        <div className="mx-auto max-w-5xl px-4 pb-16 pt-12">
          <motion.header initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.6 }} className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">
              Custom manufacturing
            </span>
            <h1 className="mt-5 text-3xl sm:text-4xl font-bold text-indigo-900">Design export-grade sportswear with us</h1>
            <p className="mt-3 text-base md:text-lg text-gray-600">
              Submit your concept, upload inspiration, and our team will ship production-ready kits globally. Need inspiration? Explore our <Link to="/" className="text-indigo-600 hover:underline">top-selling collections</Link> first.
            </p>
          </motion.header>

          {status && <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6 px-4 py-3 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 text-sm">{status}</motion.div>}
          {error && <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6 px-4 py-3 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 text-sm">{error}</motion.div>}

          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            onSubmit={onSubmit}
            className="mt-12 rounded-2xl border border-indigo-100 bg-white p-8 shadow-md space-y-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-semibold text-gray-700">
                Full name
                <input name="name" className="w-full rounded-xl border border-indigo-100 px-4 py-3 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500" type="text" placeholder="Jane Smith" required />
              </label>
              <label className="space-y-2 text-sm font-semibold text-gray-700">
                Email
                <input name="email" className="w-full rounded-xl border border-indigo-100 px-4 py-3 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500" type="email" placeholder="you@club.com" required />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-semibold text-gray-700">
                Phone (optional)
                <input name="phone" className="w-full rounded-xl border border-indigo-100 px-4 py-3 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500" type="tel" placeholder="+92 303 9200750" />
              </label>
              <label className="space-y-2 text-sm font-semibold text-gray-700">
                Company / Team name
                <input name="company" className="w-full rounded-xl border border-indigo-100 px-4 py-3 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500" type="text" placeholder="Sialkot Strikers" />
              </label>
            </div>
            <label className="space-y-2 text-sm font-semibold text-gray-700 block">
              Project brief
              <textarea name="message" className="w-full rounded-xl border border-indigo-100 px-4 py-3 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500" rows="5" placeholder="Sport, quantities, sizes, fabrics, colors, logos, deadline…" required />
            </label>

            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.7fr)]">
              <label className="flex flex-col gap-3 rounded-2xl border border-indigo-100 bg-indigo-50/40 p-6 text-sm text-indigo-700 hover:border-indigo-200 hover:bg-indigo-50 transition cursor-pointer" htmlFor="file-upload">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600/10 text-indigo-600 text-xl">
                  <FaUpload />
                </span>
                <div>
                  <p className="font-semibold">Upload design files</p>
                  <p className="text-xs text-indigo-500">PDF, PNG, JPG up to 10MB</p>
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
              <div className="rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm text-sm text-gray-600">
                <div className="flex items-center gap-3 text-indigo-600 font-semibold text-base">
                  <FaInbox />
                  What happens next?
                </div>
                <ul className="mt-3 space-y-2 text-xs text-gray-500">
                  <li>• We review your brief and files within 24h.</li>
                  <li>• Receive design mockups and production timeline.</li>
                  <li>• Approve, then we begin manufacturing and export.</li>
                </ul>
                {fileName && (
                  <div className="mt-3 flex items-center gap-2 text-indigo-700">
                    <FaFileAlt />
                    <span className="text-xs">{fileName}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-gray-500">We keep your assets confidential and can sign NDAs on request.</p>
              <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-500">
                Submit request
              </button>
            </div>
          </motion.form>
        </div>
      </section>
    </main>
  );
};

export default Custom;
