import { useEffect, useRef, useState } from 'react';
import { getHome, getCategories } from '../services/api';
import { toast } from 'react-toastify';

export default function useAppBoot() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('Loading Zarko Sportswear');
  const [loadingSubMessage, setLoadingSubMessage] = useState('Preparing your experience...');

  const contentCheckInterval = useRef(null);
  const contentCheckAttempts = useRef(0);
  const maxContentCheckAttempts = 30;

  const checkContentLoaded = () => {
    const heroImage = document.querySelector('.hero-image, [class*="hero"], [class*="Hero"] img');
    const isHeroLoaded = heroImage ? heroImage.complete : false;

    const productItems = document.querySelectorAll('.product-item, [class*="product"], [class*="Product"]');
    const hasEnoughProducts = productItems.length >= 3;

    const allImages = document.querySelectorAll('img');
    const allImagesLoaded = Array.from(allImages).every(img => img.complete);

    return isHeroLoaded && hasEnoughProducts && allImagesLoaded;
  };

  const updateLoading = (progress, message, subMessage) => {
    setLoadingProgress(progress);
    if (message) setLoadingMessage(message);
    if (subMessage) setLoadingSubMessage(subMessage);
  };

  useEffect(() => {
    let isMounted = true;

    const startContentCheck = () => {
      contentCheckInterval.current = setInterval(() => {
        contentCheckAttempts.current += 1;

        if (checkContentLoaded() || contentCheckAttempts.current >= maxContentCheckAttempts) {
          clearInterval(contentCheckInterval.current);
          if (isMounted) {
            updateLoading(100, 'Ready!', 'Welcome to Zarko Sportswear');
            setTimeout(() => {
              if (isMounted) setIsLoading(false);
            }, 500);
          }
        }
      }, 100);
    };

    const loadInitialData = async () => {
      try {
        updateLoading(20, 'Loading Zarko Sportswear', 'Initializing application...');

        await Promise.all([
          getHome().catch(() => null),
          getCategories().catch(() => []),
        ]);

        updateLoading(70, 'Preparing Content', 'Loading images and products...');
        setTimeout(() => {
          if (isMounted) startContentCheck();
        }, 300);
      } catch (error) {
        console.error('Error during app initialization:', error);
        toast.error('Failed to load some content. Please refresh the page.');
        if (isMounted) {
          updateLoading(100, 'Loading Complete', 'Some content may not be available');
          setTimeout(() => setIsLoading(false), 1000);
        }
      }
    };

    loadInitialData();

    return () => {
      isMounted = false;
      if (contentCheckInterval.current) clearInterval(contentCheckInterval.current);
    };
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
