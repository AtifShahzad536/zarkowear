import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTshirt, FaStar } from 'react-icons/fa';

// ===================== Animation Variants =====================
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const spinnerVariants = {
  initial: { rotateY: 0, rotateX: 0 },
  animate: {
    rotateY: 360,
    rotateX: 15,
    transition: {
      rotateY: { duration: 3, repeat: Infinity, ease: "linear" },
      rotateX: { duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
    }
  }
};

const progressBarVariants = (progress) => ({
  initial: { width: '0%' },
  animate: {
    width: `${progress}%`,
    transition: { duration: 0.8, ease: "easeInOut" }
  }
});

// ===================== Component =====================
const LoadingSpinner = ({
  size = 'md',
  fullScreen = true,
  progress = 0,
  message = 'Loading Zarko Sportswear',
  subMessage = 'Preparing your experience...',
  seoFriendly = false
}) => {
  const [currentTip, setCurrentTip] = useState(0);
  const messageRef = useRef(message);
  const subMessageRef = useRef(subMessage);

  // Tips that cycle through while loading
  const loadingTips = [
    'Did you know? Zarko Sportswear uses only the highest quality fabrics for ultimate comfort.',
    'All our products are ethically manufactured in state-of-the-art facilities.',
    'We serve professional athletes and teams worldwide with custom sportswear solutions.'
  ];

  // Update refs when props change
  useEffect(() => {
    messageRef.current = message;
    subMessageRef.current = subMessage;
  }, [message, subMessage]);

  // Rotate through tips
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % loadingTips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [loadingTips.length]);

  // Size classes
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-24 w-24',
    lg: 'h-32 w-32',
  };

  // SEO-friendly version for bots
  if (seoFriendly || (typeof window !== 'undefined' && window.isBot)) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className={`${fullScreen ? 'fixed inset-0' : 'relative'} bg-gradient-to-br from-slate-900 to-slate-800/90 flex flex-col items-center justify-center p-6 z-50`}
        variants={containerVariants}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        {/* ====== Background Particles ====== */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/5"
              style={{
                width: Math.random() * 10 + 5,
                height: Math.random() * 10 + 5,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* ====== Main Content ====== */}
        <div className="relative z-10 w-full max-w-md mx-auto text-center">
          {/* Brand */}
          <motion.div className="mb-8" variants={itemVariants}>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Zarko Sportswear
            </h1>
            <p className="text-slate-400 text-sm mt-2">Premium Athletic Apparel</p>
          </motion.div>

          {/* Spinner */}
          <motion.div
            className={`${sizeClasses[size]} mx-auto relative`}
            variants={spinnerVariants}
            initial="initial"
            animate="animate"
          >
            {/* Outer ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-400 border-r-cyan-400"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            {/* Middle ring */}
            <motion.div
              className="absolute inset-2 rounded-full border-4 border-transparent border-b-cyan-400 border-l-blue-400"
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            {/* Inner ring */}
            <motion.div
              className="absolute inset-4 rounded-full border-4 border-transparent border-t-cyan-400 border-r-blue-400"
              animate={{ rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />
            {/* Center Icon */}
            <div className="w-full h-full flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <FaTshirt className="w-3/4 h-3/4 mx-auto text-cyan-400" />
              </motion.div>
            </div>
          </motion.div>

          {/* Progress Bar */}
          <motion.div className="mt-8" variants={itemVariants}>
            <div className="flex justify-between text-sm text-slate-300 mb-2">
              <span>Loading...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-slate-700/50 rounded-full h-2.5 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 rounded-full relative"
                variants={progressBarVariants(progress)}
                initial="initial"
                animate="animate"
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </motion.div>
            </div>
          </motion.div>

          {/* Loading Messages */}
          <motion.div className="mt-8" variants={itemVariants}>
            <motion.h2
              className="text-xl font-bold text-white mb-2"
              key={`msg-${message}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {message}
            </motion.h2>
            <motion.p
              className="text-slate-300 mb-4"
              key={`sub-${subMessage}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {subMessage}
            </motion.p>
            <motion.div
              className="text-sm text-slate-400 italic border-t border-slate-700 pt-4 mt-4"
              key={`tip-${currentTip}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <FaStar className="inline-block text-yellow-400 mr-2" />
              {loadingTips[currentTip]}
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className="absolute bottom-4 left-0 right-0 text-center text-xs text-slate-500"
          variants={itemVariants}
        >
          <p>© {new Date().getFullYear()} Zarko Sportswear. All rights reserved.</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingSpinner;
