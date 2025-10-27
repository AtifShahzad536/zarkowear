import React, { Suspense, lazy, useEffect, useState, useRef } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import ScrollTopButton from './components/ScrollTopButton';
import LoadingSpinner from './components/ui/NewLoadingSpinner';
import { getHome, getCategories } from './services/api';
import { toast } from 'react-toastify';

// Create a context to track content loading state
export const ContentLoadedContext = React.createContext({
  markAsLoaded: () => {},
  isContentLoaded: false
});

const ChatbotWidget = lazy(() => import('./components/ChatbotWidget'));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('Loading Zarko Sportswear');
  const [loadingSubMessage, setLoadingSubMessage] = useState('Preparing your experience...');
  const [contentLoaded, setContentLoaded] = useState(false);
  const location = useLocation();
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

  const markContentAsLoaded = () => {
    setContentLoaded(true);
  };

  useEffect(() => {
    let isMounted = true;
    let loadingTimeout;

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

        const [homeData, categoriesData] = await Promise.all([
          getHome().catch(e => {
            console.error('Error loading home data:', e);
            return null;
          }),
          getCategories().catch(e => {
            console.error('Error loading categories:', e);
            return [];
          })
        ]);

        updateLoading(70, 'Preparing Content', 'Loading images and products...');

        if (isMounted) {
          setTimeout(() => {
            if (isMounted) startContentCheck();
          }, 300);
        }

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
      clearTimeout(loadingTimeout);
      if (contentCheckInterval.current) {
        clearInterval(contentCheckInterval.current);
      }
    };
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    console.log('Lenis check: prefersReduced=', prefersReduced, 'hasFinePointer=', hasFinePointer);
    if (prefersReduced || !hasFinePointer) {
      console.log('Lenis disabled');
      return;
    }

    let lenis;
    let raf;
    let cancelled = false;

    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
        smoothTouch: false,
      });

      console.log('Lenis initialized:', lenis);
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

  return (
    <ContentLoadedContext.Provider value={{
      markAsLoaded: markContentAsLoaded,
      isContentLoaded: contentLoaded
    }}>
      {isLoading ? (
        <LoadingSpinner 
          size="lg"
          fullScreen={true}
          progress={loadingProgress}
          message={loadingMessage}
          subMessage={loadingSubMessage}
        />
      ) : (
        <div className="transition-opacity duration-500 opacity-100">
          <Header />
          <main className="min-h-screen">
            <Suspense 
              fallback={
                <div className="fixed inset-0 bg-white/80 z-40 flex items-center justify-center">
                  <LoadingSpinner size="md" />
                </div>
              }
            >
              <ChatbotWidget />
            </Suspense>
            <Outlet />
          </main>
          <Footer />
          <ScrollTopButton />
        </div>
      )}
    </ContentLoadedContext.Provider>
  );
}

export default App;
