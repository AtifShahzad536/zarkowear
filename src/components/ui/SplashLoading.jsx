import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashLoading = ({ progress = 0, onComplete }) => {
  const [step, setStep] = useState(0); // 0: WELCOME, 1: Out, 2: ZARKO SPORTSWEAR
  const [localProgress, setLocalProgress] = useState(0);

  // Smooth sequential steps
  useEffect(() => {
    const t1 = setTimeout(() => {
      setStep(1);
    }, 1800);

    const t2 = setTimeout(() => {
      setStep(2);
    }, 2300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Snappy progress loader calculation
  useEffect(() => {
    if (step === 2) {
      const interval = setInterval(() => {
        setLocalProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          const next = prev + 3;
          return next > 100 ? 100 : next;
        });
      }, 25);
      return () => clearInterval(interval);
    }
  }, [step]);

  // Complete splash sequence when fully loaded
  useEffect(() => {
    if (localProgress >= 100 && step === 2) {
      const finishTimeout = setTimeout(() => {
        if (onComplete) onComplete();
      }, 1500);
      return () => clearTimeout(finishTimeout);
    }
  }, [localProgress, step, onComplete]);

  return (
    <div className="fixed inset-0 z-[99999] bg-white flex flex-col items-center justify-center overflow-hidden select-none">
      
      {/* Light Theme Glitch & Water Fill CSS Styles */}
      <style>{`
        /* Welcome Water Wave Fill */
        .welcome-water-text {
          color: rgba(30, 64, 175, 0.08);
          -webkit-text-stroke: 2.2px #1e40af;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 28'%3E%3Cpath fill='%231E40AF' d='M0,15 C30,5 30,20 60,15 C90,5 90,20 120,15 L120,28 L0,28 Z'%3E%3C/path%3E%3C/svg%3E");
          background-size: 140px 100%;
          background-repeat: repeat-x;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: wave-horizontal 2.5s linear infinite, wave-rise-once 1.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        /* Zarko Interactive Progress Water Fill */
        .zarko-water-text {
          color: rgba(15, 23, 42, 0.05);
          -webkit-text-stroke: 2px #0f172a;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 28'%3E%3Cpath fill='%231E40AF' d='M0,15 C30,5 30,20 60,15 C90,5 90,20 120,15 L120,28 L0,28 Z'%3E%3C/path%3E%3C/svg%3E");
          background-size: 180px 100%;
          background-repeat: repeat-x;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: wave-horizontal 2s linear infinite;
          transition: background-position-y 0.15s ease-out;
        }

        @keyframes wave-horizontal {
          0% { background-position-x: 0px; }
          100% { background-position-x: 1000px; }
        }

        @keyframes wave-rise-once {
          0% { background-position-y: 110%; }
          100% { background-position-y: -10%; }
        }
      `}</style>

      {/* Main Content Area */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-5xl px-8 text-center">
        <AnimatePresence mode="wait">
          
          {/* ── 1. WELCOME with Water Wave Fill ── */}
          {step === 0 && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="flex flex-col items-center justify-center w-full"
            >
              <h1 
                className="text-[34px] sm:text-[52px] md:text-[115px] font-black tracking-[0.08em] sm:tracking-[0.15em] md:tracking-[0.25em] uppercase leading-none welcome-water-text py-2 whitespace-nowrap"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                WELCOME
              </h1>
              <div className="h-[2px] w-20 md:w-24 bg-gradient-to-r from-indigo-500 to-purple-500 mt-4 rounded-full" />
            </motion.div>
          )}

          {/* ── 2. ZARKO SPORTSWEAR with Simple 3D Text Highlight ── */}
          {step === 2 && (
            <motion.div
              key="zarko-brand"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              className="flex flex-col items-center justify-center gap-2 w-full"
            >
              <div className="flex flex-col items-center justify-center w-full">
                <h2 
                  className="text-[36px] sm:text-[54px] md:text-[100px] font-black tracking-[0.10em] md:tracking-[0.18em] uppercase leading-none zarko-water-text py-2 whitespace-nowrap"
                  style={{ 
                    fontFamily: "'Outfit', sans-serif",
                    backgroundPositionY: `${110 - localProgress * 1.2}%`
                  }}
                >
                  ZARKO
                </h2>
                
                <h3 
                  className="text-[12px] sm:text-[16px] md:text-[26px] font-extrabold tracking-[0.25em] md:tracking-[0.45em] text-slate-800 uppercase whitespace-nowrap"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  SPORTSWEAR
                </h3>
              </div>

              {/* Simple Highlight Subtitle (Pure typography, no borders, no divs, no boundaries) */}
              <p 
                className="text-[10px] md:text-[12px] font-bold text-indigo-600 tracking-[0.4em] uppercase mt-2 select-none animate-pulse"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                3D Custom Jersey Builder
              </p>

              {/* Snappy Progress Loader */}
              <div className="w-56 h-[3px] bg-slate-100 rounded-full overflow-hidden mt-8 relative">
                <div 
                  className="h-full bg-indigo-600 transition-all duration-150 rounded-full"
                  style={{ width: `${localProgress}%` }}
                />
              </div>
              <span 
                className="text-[11px] font-extrabold text-slate-400 tracking-widest uppercase mt-2.5"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {localProgress}%
              </span>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
};

export default SplashLoading;
