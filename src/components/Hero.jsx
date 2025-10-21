import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
            <img loading="lazy" src={imageUrl(src)} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute bottom-6 left-4 md:bottom-12 md:left-12 z-40 flex max-w-xl flex-col gap-3"
      >
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 rounded-lg bg-black/55 px-5 py-3 text-3xl font-extrabold tracking-wide text-white drop-shadow-lg backdrop-blur sm:text-4xl md:text-5xl"
        >
          Zarko Sportswear
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          className="inline-flex items-center gap-2 rounded-full bg-black/45 px-4 py-2 text-xs font-medium uppercase tracking-[0.35em] text-indigo-200 backdrop-blur"
        >
          Export-grade team uniforms
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
          className="max-w-md rounded-lg bg-black/35 px-3 py-2 text-xs font-medium text-white/85 backdrop-blur sm:text-sm"
        >
          Made in Sialkot with rapid sampling and global shipping. Learn more on our <Link to="/about" className="underline decoration-indigo-200 underline-offset-4 hover:text-white">About</Link> page or start a brief on the <Link to="/custom" className="underline decoration-indigo-200 underline-offset-4 hover:text-white">Custom Orders</Link> hub.
        </motion.p>
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