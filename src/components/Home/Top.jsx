import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { motion } from 'framer-motion';
import { getTopSelling, imageUrl } from '../../services/api';

const fallbackItems = [
  { image: '/images/slide1.jpg', name: 'Pro Football Jersey' },
  { image: '/images/slide2.jpg', name: 'Cricket ODI Kit' },
  { image: '/images/slide1.jpg', name: 'Basketball Sleeveless Set' },
  { image: '/images/slide2.jpg', name: 'Hockey Team Jersey' },
  { image: '/images/slide1.jpg', name: 'Rugby Pro Shorts' },
  { image: '/images/slide2.jpg', name: 'Tennis Performance Polo' },
];

const TopSellingProducts = () => {
  const [items, setItems] = useState(fallbackItems);
  const [loaded, setLoaded] = useState(false);

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
                  className="relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition overflow-hidden group ring-1 ring-gray-200"
                >
                  <img
                    src={imageUrl(item.image)}
                    alt={item.name}
                    className="w-full h-60 object-contain bg-white"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 w-full p-3 flex items-center justify-between">
                    <span className="text-white text-sm font-semibold tracking-wide bg-black/50 px-2 py-0.5 rounded">{item.name}</span>
                    <span className="text-white text-xs opacity-0 group-hover:opacity-100 transition">View →</span>
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