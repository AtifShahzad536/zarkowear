import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { getHomeSettings, imageUrl } from '../services/api';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Hero = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    setLoading(true);
    getHomeSettings()
      .then((d) => { if (!alive) return; setImages(d.heroImages || []); setError(''); })
      .catch((e) => alive && setError(e.message || 'Failed to load'))
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, []);

  const socialLinks = [
    { icon: <FaFacebookF />, url: 'https://facebook.com/zarkosportswear' },
    { icon: <FaInstagram />, url: 'https://www.instagram.com/zarko_sports.wear/' },
    { icon: <FaLinkedinIn />, url: 'https://www.linkedin.com/in/atif-shahzad903/' },
   
  ];

  return (
    <section className="relative w-full h-[80vh] overflow-hidden">
      <Swiper modules={[Navigation, Autoplay]} autoplay={{ delay: 3000, disableOnInteraction: false }} navigation loop={true} className="w-full h-full">
        {(images.length ? images : ['/images/slide1.jpg']).map((src, index) => (
          <SwiperSlide key={index}>
            <img src={imageUrl(src)} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="absolute bottom-6 left-4 md:bottom-10 md:left-10 z-40 flex flex-wrap items-center gap-2 md:gap-3"
      >
        <span className="text-5xl md:text-6xl font-extrabold text-indigo-500 animate-pulse drop-shadow-lg">Zarko</span>
        <span className="text-white text-2xl md:text-4xl font-bold bg-gradient-to-r from-black/60 to-black/30 px-4 md:px-6 py-2 md:py-3 rounded-lg shadow-lg hover:shadow-indigo-500/50 transition drop-shadow-md">SportsWear</span>
        <motion.span
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="text-indigo-400 text-xl md:text-3xl drop-shadow"
        >
          ➤
        </motion.span>
      </motion.div>

      <div className="absolute bottom-6 right-4 md:top-[65%] md:right-6 z-30 flex flex-col space-y-3 bg-white bg-opacity-80 p-2 rounded shadow">
        {socialLinks.map((link, idx) => (
          <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 text-lg md:text-xl">
            {link.icon}
          </a>
        ))}
      </div>
    </section>
  );
};

export default Hero;