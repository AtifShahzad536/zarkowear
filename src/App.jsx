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
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 1.5),
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
