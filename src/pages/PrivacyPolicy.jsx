import React, { useEffect } from 'react';
import SeoHead from '../components/SeoHead';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-white py-16 md:py-24">
      <SeoHead
        title="Privacy Policy | Zarko Sportswear"
        description="Read the Privacy Policy of Zarko Sportswear to understand how we protect, collect, and use your personal team order details."
        canonical="https://www.zarkosportswear.com/privacy-policy"
        robots="index, follow"
      />

      <div className="mx-auto max-w-[94%] px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl space-y-8"
        >
          <div className="border-b border-slate-100 pb-6">
            <h1 className="text-4xl font-black text-indigo-950 uppercase tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>Privacy Policy</h1>
            <p className="text-xs text-slate-400 font-semibold mt-2">Last updated: August 13, 2026</p>
          </div>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-indigo-900 uppercase tracking-wide">1. Introduction</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Zarko Sportswear ("we", "us", "our") respects your privacy and is committed to protecting the personal data you share with us. This Privacy Policy explains how we collect, process, secure, and disclose your personal details when you visit our website, design sports kits using our builder, or submit custom order inquiries.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-indigo-900 uppercase tracking-wide">2. Information We Collect</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We collect information that you voluntarily provide when placing orders or using our custom product quote desks:
            </p>
            <ul className="list-disc pl-6 text-sm text-slate-600 space-y-2">
              <li><strong>Contact Information:</strong> Name, business or school team name, email address, phone number, and physical shipping address.</li>
              <li><strong>Design & Order Details:</strong> Vector logos, custom colors, sizing sheets, team roster sheets, and uniform design layouts uploaded to our builders.</li>
              <li><strong>Device & Usage Data:</strong> IP addresses, browser specs, page interactions, and analytics cookies to optimize performance.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-indigo-900 uppercase tracking-wide">3. How We Use Your Information</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We process collected data to deliver export-grade customized uniforms and verify order details:
            </p>
            <ul className="list-disc pl-6 text-sm text-slate-600 space-y-2">
              <li>To produce, stitch, and dye-sublimate custom team kits per mockups.</li>
              <li>To facilitate tracked shipping door-to-door (handled via express couriers like DHL/FedEx).</li>
              <li>To reply to product inquiries, quote requests, and customer service reviews.</li>
              <li>To verify compliance with global sportswear marking and numbering rules.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-indigo-900 uppercase tracking-wide">4. Data Sharing & Third-Parties</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We do not sell, rent, or lease your private design information or email addresses. We share shipping addresses and invoices strictly with customs clearing brokers and transport companies (FedEx, DHL) to verify seamless import into destination countries.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-indigo-900 uppercase tracking-wide">5. Cookies & Analytics</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We use analytics cookies (e.g., Google Analytics 4) to monitor website loading times, layout responsiveness, and click paths to optimize search experience. You can manage cookies directly through your browser configuration menus.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-indigo-900 uppercase tracking-wide">6. Security Measures</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We secure digital transfers and transactions using industry-grade SSL encryption and secure firewalls. Raw customer design files and branding kits are stored securely inside private folders to prevent unauthorized access.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-indigo-900 uppercase tracking-wide">7. Contact Details</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              If you have questions regarding this policy or wish to delete your custom design information from our server, please contact:
            </p>
            <p className="text-sm text-slate-600">
              <strong>Zarko Sportswear Desk</strong><br />
              Email: <a href="mailto:zarkosportswear@gmail.com" className="text-indigo-600 hover:underline">zarkosportswear@gmail.com</a><br />
              WhatsApp: +92-303-9220750
            </p>
          </section>
        </motion.div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
