import { Suspense, lazy, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import ScrollTopButton from './components/ScrollTopButton'

const ChatbotWidget = lazy(() => import('./components/ChatbotWidget'))

function App() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (prefersReduced || !hasFinePointer) return undefined;

    let lenis;
    let raf;
    let cancelled = false;

    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({
        duration: 0.6,
        easing: (t) => t,
        smoothWheel: true,
        smoothTouch: false,
      });

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
    <>
      <Header />
      <Outlet />
      <ScrollTopButton />
      <Suspense fallback={null}>
        <ChatbotWidget/>
      </Suspense>
      <Footer />
    </>
  )
}

export default App
