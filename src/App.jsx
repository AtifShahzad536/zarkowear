import { Suspense, lazy, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import ScrollTopButton from './components/ScrollTopButton'
import CursorGlow from './components/CursorGlow'

const ChatbotWidget = lazy(() => import('./components/ChatbotWidget'))

function App() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    let lenis;
    let raf;
    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({ duration: 0.6, easing: t => t, smoothWheel: true, smoothTouch: false });
      const loop = (time) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      lenis?.destroy?.();
    };
  }, []);

  return (
    <>
      <Header />
      <CursorGlow />
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
