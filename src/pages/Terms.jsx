import React, { useEffect } from 'react';
import SeoHead from '../components/SeoHead';
import { motion } from 'framer-motion';

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-white py-16 md:py-24">
      <SeoHead
        title="Terms of Service | Zarko Sportswear USA"
        description="Review the Terms of Service for Zarko Sportswear custom sports uniforms manufacturing orders, turnaround times, payments, mockups, and USA delivery policies."
        canonical="https://www.zarkosportswear.com/terms"
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
            <h1 className="text-4xl font-black text-indigo-950 uppercase tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>Terms of Service</h1>
            <p className="text-xs text-slate-400 font-semibold mt-2">Last updated: August 13, 2026</p>
          </div>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-indigo-900 uppercase tracking-wide">1. Acceptance of Terms</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              By accessing our website, configuring uniforms on our 3D builder, or approving mockups for manufacture, you agree to comply with and be bound by these Terms of Service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-indigo-900 uppercase tracking-wide">2. Custom Manufacturing Orders & MOQs</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              As a direct sportswear manufacturer, we operate customized dye-sublimation and cut-and-sew lines:
            </p>
            <ul className="list-disc pl-6 text-sm text-slate-600 space-y-2">
              <li><strong>Minimum Order Quantity (MOQ):</strong> Our standard MOQ is 15 pieces per customized design layout, unless specialized sampling packages are approved beforehand.</li>
              <li><strong>Mockup Approval:</strong> Production only commences after you explicitly approve the digital layout files showing colors, dimensions, and logo placements.</li>
              <li><strong>Intellectual Property:</strong> You certify that you own or possess permissions for all team logos, custom graphics, or sponsor marks uploaded to our system.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-indigo-900 uppercase tracking-wide">3. Timeline & Delivery Commitments</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We work hard to meet delivery times, but custom manufacturing relies on design approvals:
            </p>
            <ul className="list-disc pl-6 text-sm text-slate-600 space-y-2">
              <li><strong>Production Turnaround:</strong> Standard manufacturing takes 8-12 business days from the approval date of the mockup.</li>
              <li><strong>Transit Times:</strong> International door-to-door express shipping to the USA takes 3-5 business days via DHL/FedEx. We are not liable for custom delays or severe weather disruptions.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-indigo-900 uppercase tracking-wide">4. Returns & Cancellations</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Because all kits, singlets, and tracksuits are custom-tailored with specific player names, team colors, and custom sizing sheets:
            </p>
            <ul className="list-disc pl-6 text-sm text-slate-600 space-y-2">
              <li>Orders cannot be cancelled once raw material cutting and dye-sublimation starts.</li>
              <li>Returns are accepted only in case of structural manufacturing defects (e.g. broken zippers, torn seams) or graphic printing errors that deviate from your approved mockup.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-indigo-900 uppercase tracking-wide">5. Governing Law</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              These terms are governed by standard export agreements. Any dispute arising from customized contracts will be handled through mutual consultation before legal action.
            </p>
          </section>
        </motion.div>
      </div>
    </main>
  );
};

export default Terms;
