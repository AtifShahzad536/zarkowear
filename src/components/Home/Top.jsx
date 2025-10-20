import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
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

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* Stylized Header with clip-path */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative bg-indigo-600 text-white px-6 py-5 mb-10 rounded-lg shadow-lg clip-polygon w-fit mx-auto"
      >
        <h2 className="text-3xl font-bold text-center tracking-wide">Top Selling Products</h2>
      </motion.div>

      {/* Product Rows */}
      {[...Array(1)].map((_, rowIndex) => (
        <motion.div
          key={rowIndex}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: rowIndex * 0.05 }}
          className="mb-10"
        >
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={20}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
          >
            {items.map((item, i) => (
              <SwiperSlide key={i}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="relative bg-white  rounded-[18px] shadow-sm hover:shadow-2xl transition overflow-hidden group ring-1 ring-gray-200"
                >
                  <img
                    src={imageUrl(item.image)}
                    alt={item.name}
                    className="w-full h-80 object-contain bg-white transform group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/35 to-transparent opacity-80 group-hover:opacity-95 transition duration-300" />
                  <div className="absolute inset-0 z-20 flex flex-col justify-between p-4">
                    <div className="bg-white/90 backdrop-blur px-5 py-2 text-base font-semibold rounded-xl text-indigo-700 w-fit shadow transform transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                      <span className="inline-block group-hover:translate-x-1 transition duration-300">{item.name || 'Top Product'}</span>
                    </div>
                    <div className="space-y-3 text-white">
                      <p className="text-sm md:text-base leading-relaxed opacity-0 group-hover:opacity-100 transition duration-300 line-clamp-3">
                        {item.description || `Explore premium ${item.name || 'sports'} gear engineered for pro-level performance.`}
                      </p>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center gap-3 w-full rounded-full bg-white/25 border border-white/40 py-3 text-sm md:text-base font-semibold tracking-wide backdrop-blur hover:bg-white/35 transition"
                        onClick={() => {
                          if (item.link) {
                            navigate(item.link);
                          }
                        }}
                      >
                        View Details
                        <motion.span
                          aria-hidden
                          initial={{ x: 0 }}
                          whileHover={{ x: 6 }}
                          className="inline-block"
                        >
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
      ))}
    </section>
  );
};

export default TopSellingProducts;