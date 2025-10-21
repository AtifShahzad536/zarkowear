import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getHomeSettings, imageUrl } from '../services/api';

const Hero = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [slider, setSlider] = useState(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    getHomeSettings()
      .then((d) => { if (!alive) return; setImages(d.heroImages || []); setError(''); })
      .catch((e) => alive && setError(e.message || 'Failed to load'))
      .finally(() => alive && setLoading(false));
    import('swiper/react').then(async ({ Swiper, SwiperSlide }) => {
      const modules = await import('swiper/modules');
      if (!alive) return;
      setSlider({ Swiper, SwiperSlide, modules: [modules.Navigation, modules.Autoplay] });
    });
    return () => { alive = false; };
  }, []);

  const slides = useMemo(() => (images.length ? images : ['/images/slide1.jpg']), [images]);

  return (
    <section className="relative w-full h-[80vh] overflow-hidden">
      {slider ? (
        <slider.Swiper
          modules={slider.modules}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          navigation
          loop
          className="w-full h-full"
        >
          {slides.map((src, index) => (
            <slider.SwiperSlide key={index}>
              <img
                loading="lazy"
                decoding="async"
                src={imageUrl(src)}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
                sizes="(min-width: 1024px) 100vw, 100vw"
              />
            </slider.SwiperSlide>
          ))}
        </slider.Swiper>
      ) : (
        <picture className="block h-full w-full">
          <source srcSet="/images/slide1.avif" type="image/avif" />
          <source srcSet="/images/slide1.webp" type="image/webp" />
          <img
            loading="lazy"
            decoding="async"
            src="/images/slide1.jpg"
            alt="Zarko Sportswear showcase"
            className="w-full h-full object-cover"
          />
        </picture>
      )}

      <div className="absolute bottom-6 left-4 md:bottom-12 md:left-12 z-40 flex max-w-xl flex-col gap-3 bg-black/40 backdrop-blur-md p-4 rounded-2xl text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide">Zarko Sportswear</h1>
        <span className="inline-flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-indigo-200">
          Export-grade team uniforms
        </span>
        <p className="max-w-md text-sm text-white/85">
          Made in Sialkot with rapid sampling and global shipping. Learn more on our <Link to="/about" className="underline decoration-indigo-200 underline-offset-4 hover:text-white">About</Link> page or start a brief on the <Link to="/custom" className="underline decoration-indigo-200 underline-offset-4 hover:text-white">Custom Orders</Link> hub.
        </p>
      </div>
    </section>
  );
};

export default Hero;