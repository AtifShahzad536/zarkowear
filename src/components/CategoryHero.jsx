import React from 'react';
import { motion } from 'framer-motion';

const CategoryHero = ({ title, description, gradient = 'from-blue-600 via-indigo-600 to-purple-600', className = '' }) => (
  <section className={`relative overflow-hidden rounded-2xl bg-slate-950 p-6 sm:p-10 text-white shadow-2xl border border-slate-800 ${className}`}>
    {/* Animated background glows */}
    <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-500/30 to-blue-600/20 blur-3xl animate-pulse" />
    <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-gradient-to-tr from-violet-600/20 to-pink-500/20 blur-3xl" />
    <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

    <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
      <div className="max-w-2xl space-y-4">
        {/* Animated Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">
            Elite Sportswear Collection
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-indigo-200"
        >
          {title}
        </motion.h1>

        {/* Description */}
        {description && (
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-xl"
          >
            {description}
          </motion.p>
        )}
      </div>

      {/* Floating Interactive Stat Pills */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25 }}
        className="flex flex-wrap lg:flex-col gap-3 w-full lg:w-auto"
      >
        <div className="flex-1 lg:flex-none flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 px-5 py-3 backdrop-blur-xl shadow-lg">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400 font-bold">
            ⚡
          </div>
          <div>
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Sublimation Tech</div>
            <div className="text-sm font-extrabold text-white">100% Color Fast</div>
          </div>
        </div>

        <div className="flex-1 lg:flex-none flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 px-5 py-3 backdrop-blur-xl shadow-lg">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 font-bold">
            🌐
          </div>
          <div>
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Export Grade</div>
            <div className="text-sm font-extrabold text-white">Global Dispatch</div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CategoryHero;
