import React, { useEffect, useState } from 'react';
import SeoHead from '../components/SeoHead';

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
    <main className="max-w-6xl mx-auto px-4 py-12">
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
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-indigo-700">Contact Us</h1>
        <p className="text-gray-600 mt-2">We'd love to hear from you. Send a message or find us at our office.</p>
      </header>

      {status && <div className="mb-4 px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">{status}</div>}
      {error && <div className="mb-4 px-4 py-2 bg-rose-50 text-rose-700 border border-rose-200 rounded">{error}</div>}

      <section className="grid md:grid-cols-2 gap-8">
        <form onSubmit={onSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" type="text" placeholder="Name" className="border rounded-md px-4 py-3" required />
            <input name="email" type="email" placeholder="Email" className="border rounded-md px-4 py-3" required />
          </div>
          <input name="phone" type="tel" placeholder="Phone" className="border rounded-md px-4 py-3 w-full" />
          <textarea name="message" rows="5" placeholder="Message" className="border rounded-md px-4 py-3 w-full" required />
          <button type="submit" className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-700">Send Message</button>
        </form>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800">Office</h3>
            <p className="text-gray-600 mt-2">123 Export Avenue, Sialkot, Pakistan</p>
            <p className="text-gray-600">Phone: +92 3039200750</p>
            <p className="text-gray-600">Email: zarkosportswear@gmail.com</p>
          </div>
          <div className="rounded-lg overflow-hidden shadow">
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
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
