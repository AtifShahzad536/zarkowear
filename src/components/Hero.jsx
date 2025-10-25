import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { getHomeSettings, imageUrl } from '../services/api';

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

  const slides = useMemo(() => {
    const validImages = (images || []).filter((src) => typeof src === 'string' && src.trim().length > 0);
    return validImages.length ? validImages : ['/images/slide1.jpg'];
  }, [images]);

  return (
    <section className="relative w-full h-[80vh] overflow-hidden">
      <Swiper
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation
        loop
        className="w-full h-full"
      >
        {slides.map((src, index) => (
          <SwiperSlide key={`${src || 'fallback'}-${index}`}>
            <img
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchpriority={index === 0 ? 'high' : 'auto'}
              decoding="async"
              src={imageUrl(src) || '/images/slide1.jpg'}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover md:object-cover"
              style={{ objectPosition: 'center 30%' }}
              sizes="(min-width: 1024px) 100vw, 100vw"
              width="1920"
              height="1080"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute bottom-6 left-3 right-3 sm:left-6 sm:right-auto md:bottom-12 md:left-12 z-40 flex max-w-xl flex-col gap-3 bg-black/45 backdrop-blur-md px-5 py-4 rounded-2xl text-white">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-wide">Zarko Sportswear</h1>
        <span className="inline-flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-indigo-200">
          Export-grade team uniforms
        </span>
        <p className="max-w-md text-xs sm:text-sm text-white/85 leading-relaxed">
          Made in Sialkot with rapid sampling and global shipping. Learn more on our <Link to="/about" className="underline decoration-indigo-200 underline-offset-4 hover:text-white">About</Link> page or start a brief on the <Link to="/custom" className="underline decoration-indigo-200 underline-offset-4 hover:text-white">Custom Orders</Link> hub.
        </p>
      </div>
    </section>
  );
};

export default Hero;