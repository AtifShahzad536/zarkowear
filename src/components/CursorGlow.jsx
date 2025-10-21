import React, { useEffect, useMemo, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const CursorGlow = () => {
  const x = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const y = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

  const springConfig = useMemo(() => ({ stiffness: 120, damping: 18, mass: 0.4 }), []);
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const opacity = useTransform(springY, [0, window.innerHeight / 2, window.innerHeight], [0.45, 0.6, 0.25]);

  const [glowSize, setGlowSize] = useState(() => {
    if (typeof window === 'undefined') return 320;
    return window.innerWidth < 640 ? 220 : 320;
  });

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let ignore = false;
    const updateSize = () => {
      setGlowSize(window.innerWidth < 640 ? 220 : 320);
    };
    const handleMove = (event) => {
      if (ignore) return;
      springX.set(event.clientX);
      springY.set(event.clientY);
    };

    const handleVisibility = () => {
      ignore = document.hidden;
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    window.addEventListener('pointerdown', handleMove, { passive: true });
    window.addEventListener('touchmove', (event) => {
      if (!event.touches?.length) return;
      const touch = event.touches[0];
      springX.set(touch.clientX);
      springY.set(touch.clientY);
    }, { passive: true });
    window.addEventListener('resize', updateSize);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerdown', handleMove);
      window.removeEventListener('touchmove', () => {});
      window.removeEventListener('resize', updateSize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [springX, springY]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-10"
    >
      <motion.div
        className="absolute rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.35),rgba(99,102,241,0))] blur-3xl"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          opacity,
          width: glowSize,
          height: glowSize,
        }}
      />
      <motion.div
        className="absolute rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.25),rgba(56,189,248,0))] blur-[90px]"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          opacity,
          width: glowSize * 0.75,
          height: glowSize * 0.75,
        }}
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
