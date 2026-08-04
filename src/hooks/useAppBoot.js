import { useEffect, useState } from 'react';
import { getHome, getCategories } from '../services/api';

export default function useAppBoot() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('Loading Zarko Sportswear');
  const [loadingSubMessage, setLoadingSubMessage] = useState('Preparing your experience...');

  const updateLoading = (progress, message, subMessage) => {
    setLoadingProgress(progress);
    if (message) setLoadingMessage(message);
    if (subMessage) setLoadingSubMessage(subMessage);
  };

  useEffect(() => {
    let isMounted = true;

    const finish = () => {
      if (!isMounted) return;
      updateLoading(100, 'Ready!', 'Welcome to Zarko Sportswear');
      setTimeout(() => { if (isMounted) setIsLoading(false); }, 400);
    };

    const loadInitialData = async () => {
      try {
        updateLoading(20, 'Loading Zarko Sportswear', 'Initializing application...');
        await Promise.all([
          getHome().catch(() => null),
          getCategories().catch(() => []),
        ]);
        updateLoading(80, 'Almost Ready', 'Loading content...');
        // Give browser one rAF to paint, then declare ready
        requestAnimationFrame(() => requestAnimationFrame(finish));
      } catch (error) {
        console.error('Error during app initialization:', error);
        if (isMounted) {
          updateLoading(100, 'Loading Complete', 'Some content may not be available');
          setTimeout(() => { if (isMounted) setIsLoading(false); }, 800);
        }
      }
    };

    loadInitialData();
    return () => { isMounted = false; };
  }, []);

  // Lenis smooth scrolling setup
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (prefersReduced || !hasFinePointer) return;

    let lenis;
    let raf;
    let cancelled = false;

    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ duration: 1.2, smoothWheel: true, smoothTouch: false });
      const loop = (time) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      lenis?.destroy?.();
    };
  }, []);

  return { isLoading, loadingProgress, loadingMessage, loadingSubMessage };
}
