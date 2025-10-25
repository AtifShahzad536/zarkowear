import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { motion } from 'framer-motion';
import { getTopSelling, imageUrl } from '../../services/api';

const fallbackItems = [
  { image: '/images/slide1.jpg', name: 'Pro Football Jersey', link: '/football' },
  { image: '/images/slide2.jpg', name: 'Cricket ODI Kit', link: '/cricket' },
  { image: '/images/slide1.jpg', name: 'Basketball Sleeveless Set', link: '/basketball' },
  { image: '/images/slide2.jpg', name: 'Hockey Team Jersey', link: '/hockey' },
  { image: '/images/slide1.jpg', name: 'Rugby Pro Shorts', link: '/rugby' },
  { image: '/images/slide2.jpg', name: 'Tennis Performance Polo', link: '/tennis' },
];

const TopSellingProducts = () => {
  const [items, setItems] = useState(fallbackItems);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await getTopSelling(); // { topSelling: [...] }
        const list = (data?.topSelling || []).map((x) => ({
          name: x.name || '',
          image: x.image || '',
          link: x.link || '',
        }));
        if (alive && list.length) {
          setItems(list);
        }
      } catch (_) {
        // ignore, fallback will be used
      } finally {
        if (alive) setLoaded(true);
      }
    })();
    return () => { alive = false; };
  }, []);

  const displayedItems = useMemo(() => items, [items]);

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-14">
      <div className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.18),_transparent_70%)]" />
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 flex w-fit flex-col items-center gap-3"
        >
          <motion.div
            initial={{ clipPath: 'polygon(12% 0%, 88% 0%, 100% 100%, 0% 100%)' }}
            whileInView={{ clipPath: 'polygon(0% 0%, 100% 0%, 92% 100%, 8% 100%)' }}
            transition={{ duration: 0.9, ease: [0.6, 0.05, 0.01, 0.99] }}
            className="relative overflow-hidden rounded-[18px] bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-500 px-12 py-5 text-white shadow-2xl"
          >
            <motion.div
              initial={{ x: '-130%' }}
              whileInView={{ x: '120%' }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
              aria-hidden
              className="absolute inset-y-0 left-0 w-20 bg-white/25 blur-2xl"
            />
            <h2 className="relative text-3xl font-bold tracking-wide sm:text-4xl">Top Selling Products</h2>
          </motion.div>
          <p className="text-sm text-gray-500">Handpicked bestsellers that teams reorder season after season.</p>
        </motion.div>

        {/* Product Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="rounded-[32px] border border-indigo-100/80 bg-white/90 p-6 shadow-xl backdrop-blur"
        >
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={24}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
          >
            {displayedItems.map((item, i) => (
              <SwiperSlide key={i}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-[20px] border border-indigo-100 bg-white shadow-md transition hover:shadow-2xl"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-indigo-600 to-blue-500 opacity-0 transition group-hover:opacity-100" />
                  <img
                    loading="lazy"
                    src={imageUrl(item.image)}
                    alt={item.name}
                    className="h-72 w-full bg-white object-contain transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-75 group-hover:opacity-90 transition duration-300" />
                  <div className="absolute inset-0 z-20 flex flex-col justify-between p-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-sm font-semibold text-indigo-700 shadow group-hover:bg-white">
                      <span className="inline-block group-hover:translate-x-1 transition">{item.name || 'Top Product'}</span>
                    </div>
                    <div className="space-y-3 text-white">
                      <p className="text-xs md:text-sm leading-relaxed opacity-0 transition duration-300 group-hover:opacity-100">
                        {item.description || `Explore premium ${item.name || 'sports'} gear engineered for pro-level performance.`}
                      </p>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center gap-3 w-full rounded-full border border-white/40 bg-white/20 py-3 text-sm font-semibold tracking-wide backdrop-blur hover:bg-white/30 transition"
                        onClick={() => {
                          if (item.link) {
                            navigate(item.link);
                          }
                        }}
                      >
                        View Details
                        <motion.span aria-hidden initial={{ x: 0 }} whileHover={{ x: 6 }} className="inline-block">
                          →
                        </motion.span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default TopSellingProducts;