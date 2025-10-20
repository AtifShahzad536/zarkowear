import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import Hero from './components/Hero'
import ChatbotWidget from './components/ChatbotWidget'
import ScrollTopButton from './components/ScrollTopButton'

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.6,
      easing: (t) => t,
      smoothWheel: true,
      smoothTouch: false
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Header />
      <ChatbotWidget/>
      <Outlet />
      <ScrollTopButton />
      <Footer />
    </>
  )
}

export default App
