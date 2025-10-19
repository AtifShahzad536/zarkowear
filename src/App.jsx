import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import Hero from './components/Hero'
import ChatbotWidget from './components/ChatbotWidget'
import ScrollTopButton from './components/ScrollTopButton'

function App() {
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
