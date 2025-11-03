import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTshirt, FaStar, FaRunning, FaMedal, FaShieldAlt } from 'react-icons/fa';
import { containerVariants, itemVariants, logoVariants } from './splash/variants';

const SplashLoading = ({ size = 'md', logoSrc, progress = 0, message = 'Loading...', subMessage = 'Please wait', logoScale = 1.5 }) => {
  const [currentFeature, setCurrentFeature] = useState(0);
  
  const features = [
    {
      icon: <FaTshirt className="text-3xl text-indigo-500" />,
      title: 'Premium Quality',
      description: 'Export-grade fabrics for ultimate comfort'
    },
    {
      icon: <FaMedal className="text-3xl text-amber-500" />,
      title: 'Custom Designs',
      description: 'Tailored to your team\'s identity'
    },
    {
      icon: <FaShieldAlt className="text-3xl text-emerald-500" />,
      title: 'Durable',
      description: 'Built to last through intense gameplay'
    },
    {
      icon: <FaRunning className="text-3xl text-rose-500" />,
      title: 'Performance',
      description: 'Engineered for athletes'
    }
  ];

  // Rotate through features
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  const sizeMap = { sm: 160, md: 200, lg: 240 };
  const diameter = sizeMap[size] || 200;
  const strokeWidth = 10;
  const radius = diameter / 2 - strokeWidth - 4;
  const circumference = 2 * Math.PI * radius;
  const clampedProgress = Math.max(0, Math.min(100, progress));
  const dashOffset = circumference * (1 - clampedProgress / 100);
  const dashSize = Math.max(4, Math.round(circumference / 80));
  const accent1 = '#2563eb';
  const accent2 = '#60a5fa';

  return (
    <div className="fixed inset-0 text-slate-800 flex items-center justify-center z-[9999] overflow-hidden bg-gradient-to-br from-stone-100 via-stone-50 to-stone-200">
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0.2 }}
        animate={{ opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.06), transparent 60%)' }}
      />
      <motion.div
        className="relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Logo/Brand */}
        <motion.div 
          className="mb-8"
          variants={logoVariants}
          animate={['visible', 'pulse']}
        >
          {/* Circular badge with logo and circle loading */}
          <motion.div
            className="relative mx-auto rounded-full shadow-xl"
            style={{ width: diameter, height: diameter }}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Glow halo */}
            <motion.div
              className="absolute -inset-6 rounded-full blur-2xl"
              style={{ background: `linear-gradient(135deg, ${accent1}22, ${accent2}22)` }}
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.03, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Circular progress track and rings */}
            <motion.svg
              width={diameter}
              height={diameter}
              className="absolute inset-0 -rotate-90"
              initial={{ rotate: 0 }}
              animate={{ rotate: progress >= 100 ? 0 : 360 }}
              transition={{ duration: 6, ease: 'linear', repeat: progress >= 100 ? 0 : Infinity }}
            >
              <defs>
                <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={accent1} />
                  <stop offset="100%" stopColor={accent2} />
                </linearGradient>
                <linearGradient id="dashGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={accent2} />
                  <stop offset="100%" stopColor={accent1} />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <circle
                cx={diameter / 2}
                cy={diameter / 2}
                r={radius}
                fill="none"
                stroke="#e5e7eb"
                strokeWidth={strokeWidth}
              />
              <motion.circle
                cx={diameter / 2}
                cy={diameter / 2}
                r={radius}
                fill="none"
                stroke="url(#ringGrad)"
                strokeLinecap="round"
                strokeWidth={strokeWidth}
                style={{ strokeDasharray: circumference, strokeDashoffset: dashOffset }}
                animate={{ strokeDashoffset: dashOffset }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                filter="url(#glow)"
              />
              <motion.circle
                cx={diameter / 2}
                cy={diameter / 2}
                r={radius - strokeWidth * 0.6}
                fill="none"
                stroke="url(#dashGrad)"
                strokeWidth={Math.max(2, strokeWidth * 0.6)}
                strokeLinecap="round"
                style={{ strokeDasharray: `${dashSize} ${dashSize * 1.2}` }}
                animate={{ strokeDashoffset: [0, dashSize * 2] }}
                transition={{ duration: 0.9, ease: 'linear', repeat: Infinity }}
                opacity={0.7}
              />
              {/* Sweeping highlight arc */}
              <motion.circle
                cx={diameter / 2}
                cy={diameter / 2}
                r={radius - strokeWidth * 0.25}
                fill="none"
                stroke="#ffffff"
                strokeOpacity="0.5"
                strokeWidth={2}
                style={{ strokeDasharray: `${Math.max(20, circumference * 0.12)} ${circumference}` }}
                animate={{ strokeDashoffset: [0, circumference] }}
                transition={{ duration: 2.0, ease: 'linear', repeat: Infinity }}
              />
              {/* Orbiting glow dots */}
              <motion.g
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2.4, ease: 'linear', repeat: Infinity }}
                style={{ originX: '50%', originY: '50%' }}
              >
                <circle
                  cx={diameter / 2}
                  cy={(diameter / 2) - (radius - strokeWidth * 0.2)}
                  r={3}
                  fill={accent2}
                  stroke={accent1}
                  strokeWidth={1}
                  filter="url(#glow)"
                />
              </motion.g>
              <motion.g
                initial={{ rotate: 0 }}
                animate={{ rotate: -360 }}
                transition={{ duration: 3.6, ease: 'linear', repeat: Infinity }}
                style={{ originX: '50%', originY: '50%' }}
              >
                <circle
                  cx={diameter / 2}
                  cy={(diameter / 2) - (radius - strokeWidth * 0.55)}
                  r={2.5}
                  fill={accent1}
                  stroke={accent2}
                  strokeWidth={1}
                  filter="url(#glow)"
                />
              </motion.g>
              {/* Outer faint ring for depth */}
              <circle
                cx={diameter / 2}
                cy={diameter / 2}
                r={radius + 4}
                fill="none"
                stroke={accent1}
                strokeOpacity="0.15"
                strokeWidth="2"
              />
            </motion.svg>

            {/* Inner content */}
            <div className="absolute inset-3 rounded-full bg-white shadow-xl ring-1 ring-black/5 overflow-hidden">
              {logoSrc ? (
                <>
                  <img
                    src={logoSrc}
                    alt="Brand logo"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ transform: `scale(${logoScale})`, transformOrigin: 'center' }}
                  />
                </>
              ) : (
                <div className="flex h-full w-full items-center justify-center flex-col">
                  <div className="text-3xl font-extrabold tracking-wide">ZARKO</div>
                  <div className="text-sm opacity-60 -mt-1">SPORTSWEAR</div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SplashLoading;
