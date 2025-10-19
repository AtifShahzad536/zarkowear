import React, { useEffect, useState } from 'react';
import SeoHead from '../components/SeoHead';

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
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submit failed');
      setStatus('Your request has been submitted. We will contact you soon.');
      formEl.reset();
      setFileName('');
    } catch (err) {
      setError(err.message || 'Submit failed');
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <SeoHead
        title="Custom Sportswear Orders | Design Export-Grade Team Kits"
        description="Submit custom sportswear requests with Zarko Sportswear and get export-grade jerseys, shorts, and accessories tailored to your team."
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
      <h1 className="text-3xl font-bold text-indigo-700 mb-2">Custom Orders</h1>
      <p className="text-gray-600 mb-2">Describe your custom design requirements and attach reference files.</p>
      {status && <div className="mb-4 px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">{status}</div>}
      {error && <div className="mb-4 px-4 py-2 bg-rose-50 text-rose-700 border border-rose-200 rounded">{error}</div>}

      <form onSubmit={onSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div className="grid md:grid-cols-2 gap-4">
          <input name="name" className="border rounded-md px-4 py-3" type="text" placeholder="Name" required />
          <input name="email" className="border rounded-md px-4 py-3" type="email" placeholder="Email" required />
        </div>
        <input name="phone" className="border rounded-md px-4 py-3 w-full" type="tel" placeholder="Phone" />
        <input name="company" className="border rounded-md px-4 py-3 w-full" type="text" placeholder="Company / Team Name" />
        <textarea name="message" className="border rounded-md px-4 py-3 w-full" rows="5" placeholder="Project details (sport, quantities, sizes, fabrics, colors, logos)..." required />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Attach design/file (PDF, PNG, JPG)</label>
          <input
            name="file"
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
          {fileName && <p className="text-xs text-gray-500 mt-1">Selected: {fileName}</p>}
        </div>

        <button type="submit" className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-700">Submit Request</button>
      </form>
    </main>
  );
};

export default Custom;
