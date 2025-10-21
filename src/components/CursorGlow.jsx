import React, { useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const CursorGlow = () => {
  const x = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const y = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

  const springConfig = useMemo(() => ({ stiffness: 120, damping: 18, mass: 0.4 }), []);
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const opacity = useTransform(springY, [0, window.innerHeight / 2, window.innerHeight], [0.45, 0.6, 0.25]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let ignore = false;
    const handleMove = (event) => {
      if (ignore) return;
      springX.set(event.clientX);
      springY.set(event.clientY);
    };

    const handleVisibility = () => {
      ignore = document.hidden;
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [springX, springY]);

  // Hide the effect on very small viewports to avoid distractions on mobile
  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  if (isTouchDevice || typeof window === 'undefined' || window.innerWidth < 768) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-10"
    >
      <motion.div
        className="absolute h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.35),rgba(99,102,241,0))] blur-3xl"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%', opacity }}
      />
      <motion.div
        className="absolute h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.25),rgba(56,189,248,0))] blur-[90px]"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%', opacity }}
      />
      <motion.div
        className="absolute h-3 w-3 rounded-full bg-indigo-400/80 shadow-[0_0_18px_rgba(99,102,241,0.8)]"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: [0.7, 1, 0.7] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      />
    </motion.div>
  );
};

export default CursorGlow;
