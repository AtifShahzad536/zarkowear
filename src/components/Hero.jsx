import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
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
    <section className="relative w-full h-[32vh] sm:h-[50vh] md:h-[80vh] overflow-hidden">
      <Swiper
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation={{
          prevEl: '.hero-prev',
          nextEl: '.hero-next',
        }}
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
              className="w-full h-full object-contain sm:object-cover"
              style={{ objectPosition: 'center center' }}
              sizes="(min-width: 1024px) 100vw, 100vw"
              width="1920"
              height="1080"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Controls (Bottom Right) - Highly Visible Indigo Buttons */}
      <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 z-40 flex items-center gap-2">
        <button
          className="hero-prev w-10 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center transition duration-300 shadow-md active:scale-95 border border-indigo-500/30"
          aria-label="Previous slide"
        >
          <FaChevronLeft className="text-sm" />
        </button>
        <button
          className="hero-next w-10 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center transition duration-300 shadow-md active:scale-95 border border-indigo-500/30"
          aria-label="Next slide"
        >
          <FaChevronRight className="text-sm" />
        </button>
      </div>
    </section>
  );
};

export default Hero;