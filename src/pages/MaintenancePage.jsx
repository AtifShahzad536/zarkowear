import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaArrowLeft, FaTools, FaClock, FaEnvelope } from 'react-icons/fa';
import SeoHead from '../components/SeoHead';

const MaintenancePage = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(d => d.length >= 3 ? '' : d + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <SeoHead
        title="3D Custom Builder – Under Maintenance | Zarko Sportswear"
        description="Our 3D Custom Builder is temporarily under maintenance. We'll be back soon with an even better experience!"
        canonical="https://www.zarkosportswear.com/builder"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex flex-col items-center justify-center px-6 relative overflow-hidden">

        {/* Animated background orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
          {/* Floating particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-indigo-400/30 rounded-full"
              style={{ left: `${10 + i * 12}%`, top: `${20 + (i % 3) * 25}%` }}
              animate={{ y: [-10, 10, -10], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative z-10 max-w-lg w-full text-center"
        >
          {/* Icon */}
          <motion.div
            className="mx-auto mb-8 w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-[0_20px_60px_rgba(99,102,241,0.4)]"
            animate={{ rotate: [0, -5, 5, -3, 3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FaTools className="text-white text-4xl" />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Under Maintenance
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-black text-white leading-tight mb-4"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            3D Custom
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
              Builder
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-slate-400 text-base leading-relaxed mb-2"
          >
            We're currently upgrading our 3D Customizer to give you
            an even better experience.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-indigo-300 font-semibold text-sm mb-10"
          >
            <FaClock className="inline mr-1.5 text-xs" />
            It will be available soon{dots}
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent mb-10"
          />

          {/* Alternate Action */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-slate-400 text-sm mb-6"
          >
            In the meantime, you can still place a
            <span className="text-white font-semibold"> Custom Order</span> directly:
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <a
              href="https://wa.me/923039200750"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-bold rounded-2xl shadow-lg shadow-emerald-900/30 transition-all hover:-translate-y-0.5 hover:shadow-emerald-900/50 w-full sm:w-auto justify-center"
            >
              <FaWhatsapp className="text-base" />
              Chat on WhatsApp
            </a>
            <Link
              to="/custom"
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-2xl border border-white/10 hover:border-white/20 transition-all hover:-translate-y-0.5 w-full sm:w-auto justify-center backdrop-blur"
            >
              <FaEnvelope className="text-sm" />
              Submit Custom Order
            </Link>
          </motion.div>

          {/* Back Home */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-10"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 text-xs font-semibold uppercase tracking-widest transition-colors"
            >
              <FaArrowLeft className="text-[10px]" />
              Back to Homepage
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default MaintenancePage;
