import React, { useEffect, useState } from 'react';
import { getHome, imageUrl } from '../../services/api';
import { BsChatDots } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
const Testimonials = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    setLoading(true);
    getHome()
      .then((d) => { if (!alive) return; setList(d.testimonials || []); setError(''); })
      .catch((e) => alive && setError(e.message || 'Failed to load'))
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, []);

  return (
    <section className="relative p-6 w-full bg-gradient-to-br from-gray-50 via-white to-indigo-50 py-16 px-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.12),_transparent_55%)]" />
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 text-4xl md:text-5xl font-bold text-indigo-600"
          >
            <BsChatDots className="text-5xl md:text-6xl text-indigo-500 drop-shadow" />
            What Our Customers Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto"
          >
            Real voices, real results. Explore how teams around the world trust us with their kits.
          </motion.p>
        </div>

        {loading && <div className="text-center text-gray-500">Loading testimonials…</div>}
        {error && <div className="text-center text-rose-600">{error}</div>}
        {!loading && !error && !list.length && (
          <div className="text-center text-gray-400">No testimonials available yet.</div>
        )}

        {!loading && !error && list.length > 0 && (
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 5500, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            spaceBetween={24}
            slidesPerView={1.05}
            breakpoints={{
              768: { slidesPerView: 2 },
              1280: { slidesPerView: 2.6 },
            }}
            className="!pb-14"
          >
            {list.map((t, index) => (
              <SwiperSlide key={index} className="h-auto">
                <motion.article
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  className="relative h-full rounded-[28px] bg-white/95 backdrop-blur px-8 pt-14 pb-10 shadow-[0_20px_60px_-35px_rgba(79,70,229,0.8)] ring-1 ring-indigo-100/70 hover:ring-indigo-200 transition"
                >
                  <span className="absolute top-4 left-6 text-5xl text-indigo-100">“</span>
                  <motion.div
                    initial={{ opacity: 0, x: 16, y: -16, scale: 0.7 }}
                    whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.45, delay: 0.1 + index * 0.03 }}
                    className="absolute top-4 right-6 w-12 h-12 rounded-full overflow-hidden shadow-lg ring-4 ring-white bg-white"
                  >
                    <img
                      src={imageUrl(t.image || '/uploads/placeholder.jpg')}
                      alt={t.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {Array.from({ length: Math.max(1, Math.round(t.rating || 5)) }).map((_, starIndex) => (
                      <FaStar key={starIndex} className="drop-shadow" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 text-lg leading-relaxed tracking-tight mb-6">
                    {t.quote || 'Working with Zarko Sportswear has been a game changer for our team.'}
                  </blockquote>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xl font-semibold text-indigo-700">{t.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">{t.role || 'Sports Partner'}</p>
                    </div>
                    {(t.company || t.location) && (
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-500 bg-indigo-50 px-3 py-1.5 rounded-full">
                        {t.company || t.location}
                      </span>
                    )}
                  </div>
                </motion.article>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default Testimonials;