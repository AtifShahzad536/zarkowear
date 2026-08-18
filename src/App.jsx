import React, { Suspense, lazy, useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import ScrollTopButton from './components/ScrollTopButton';

// Create a context to track content loading state
export const ContentLoadedContext = React.createContext({
  markAsLoaded: () => {},
  isContentLoaded: true
});

const ChatbotWidget = lazy(() => import('./components/ChatbotWidget'));

function App() {
  const [contentLoaded, setContentLoaded] = useState(true);
  const location = useLocation();

  const markContentAsLoaded = () => setContentLoaded(true);

  const isBuilderRoute = location.pathname.startsWith('/builder');
  const is3DEditor = /^\/builder\/.+/.test(location.pathname);

  const [loadChatbot, setLoadChatbot] = useState(false);

  useEffect(() => {
    const handleInteraction = () => setLoadChatbot(true);
    const events = ['scroll', 'mousemove', 'touchstart', 'click'];
    events.forEach(e => window.addEventListener(e, handleInteraction, { once: true, passive: true }));
    const timer = setTimeout(() => setLoadChatbot(true), 8000);
    return () => {
      events.forEach(e => window.removeEventListener(e, handleInteraction));
      clearTimeout(timer);
    };
  }, []);

  // Lenis smooth scrolling (initialized on demand without blocking React)
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

  return (
    <ContentLoadedContext.Provider value={{
      markAsLoaded: markContentAsLoaded,
      isContentLoaded: contentLoaded
    }}>
      {isBuilderRoute ? (
        <div className={`transition-opacity duration-500 opacity-100 ${is3DEditor ? 'h-[100vh] overflow-hidden' : 'min-h-screen'}`}>
          <main className="h-full w-full">
            <Outlet />
          </main>
        </div>
      ) : (
        <div className="transition-opacity duration-500 opacity-100">
          <Header />
          <main className="min-h-screen">
            {loadChatbot && (
              <Suspense fallback={null}>
                <ChatbotWidget />
              </Suspense>
            )}
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

