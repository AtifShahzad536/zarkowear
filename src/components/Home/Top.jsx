import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { motion, AnimatePresence } from 'framer-motion';
import { getTopSelling, imageUrl } from '../../services/api';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const fallbackItems = [
  { image: '/images/slide1.jpg', name: 'Pro Football Jersey', link: '/football' },
  { image: '/images/slide2.jpg', name: 'Cricket ODI Kit', link: '/cricket' },
  { image: '/images/slide1.jpg', name: 'Basketball Sleeveless Set', link: '/basketball' },
  { image: '/images/slide2.jpg', name: 'Hockey Team Jersey', link: '/hockey' },
  { image: '/images/slide1.jpg', name: 'Rugby Pro Shorts', link: '/rugby' },
  { image: '/images/slide2.jpg', name: 'Tennis Performance Polo', link: '/tennis' },
];

const TopSellingProducts = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let alive = true;
    const loadTopSelling = async () => {
      try {
        const data = await getTopSelling();
        if (alive) {
          setItems(Array.isArray(data?.topSelling) ? data.topSelling : fallbackItems);
        }
      } catch (error) {
        console.error('Error loading top selling products:', error);
        if (alive) setItems(fallbackItems);
      } finally {
        if (alive) setLoading(false);
      }
    };
    
    loadTopSelling();
    return () => { alive = false; };
  }, []);

  const displayedItems = useMemo(() => items, [items]);
  
  const handleProductClick = (product) => {
    if (product.link) {
      navigate(product.link);
    }
  };

  return (
    <section className="w-full py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4"
      >
        <div className="text-center mb-12">
          <motion.span 
            className="inline-block text-sm font-semibold text-indigo-600 mb-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            POPULAR ITEMS
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Our Bestselling Sportswear
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-indigo-600 mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
        </div>

        {/* Product Carousel */}
        <div className="relative group">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="relative group overflow-hidden rounded-3xl shadow-md bg-white/50 backdrop-blur-sm border border-gray-100">
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse rounded-t-3xl" />
                  <div className="p-4 space-y-3">
                    <div className="h-6 bg-gray-200 rounded-full w-3/4 animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-100 rounded-full animate-pulse"></div>
                      <div className="h-3 bg-gray-100 rounded-full w-5/6 animate-pulse"></div>
                      <div className="h-3 bg-gray-100 rounded-full w-2/3 animate-pulse"></div>
                    </div>
                    <div className="h-10 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full animate-pulse mt-4"></div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          ) : (
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              spaceBetween={20}
              slidesPerView={1.8}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }}
              loop={true}
              breakpoints={{
                480: { slidesPerView: 2.2, spaceBetween: 16 },
                640: { slidesPerView: 2.8, spaceBetween: 16 },
                768: { slidesPerView: 3.2, spaceBetween: 20 },
                1024: { slidesPerView: 3.8, spaceBetween: 20 },
                1280: { slidesPerView: 4.2, spaceBetween: 24 },
                1536: { slidesPerView: 4.5, spaceBetween: 24 }
              }}
              className="py-2 px-1 sm:px-2"
            >
              <AnimatePresence initial={false}>
                {displayedItems.map((item, i) => (
                  <SwiperSlide key={`${item.id || i}-${i}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                      className="group relative overflow-hidden rounded-3xl shadow-md hover:shadow-2xl transition cursor-pointer ring-1 ring-gray-200 hover:-translate-y-1"
                      onClick={() => navigate(item.link || '#')}
                    >
                      <motion.img
                        src={imageUrl(item.image) || item.image}
                        alt={item.name}
                        className="w-full h-72 object-contain bg-white transform group-hover:scale-105 transition duration-500"
                        onError={(e) => {
                          e.target.src = '/images/placeholder.jpg';
                        }}
                      />
                      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/75 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition duration-300" />
                      <div className="absolute inset-0 z-20 flex flex-col justify-between p-4">
                        <div className="bg-white/90 backdrop-blur px-4 py-2 text-base font-semibold tracking-wide rounded-lg shadow-md text-indigo-700 w-fit">
                          {item.name}
                        </div>
                        <div className="space-y-3 text-white">
                          <p className="text-sm md:text-base leading-relaxed opacity-0 group-hover:opacity-100 transition duration-300 line-clamp-3">
                            {item.description || `Premium ${item.name} with export-grade fabrics and customizable options.`}
                          </p>
                          <button
                            type="button"
                            className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-white/20 border border-white/40 py-3 text-sm md:text-base font-semibold tracking-wide backdrop-blur hover:bg-white/30 transition"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(item.link || '#');
                            }}
                          >
                            Customize Now
                            <span aria-hidden>→</span>
                          </button>
                        </div>
                      </div>
                      {item.discount && (
                        <motion.span
                          className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-30"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          -{item.discount}% OFF
                        </motion.span>
                      )}
                    </motion.div>
                  </SwiperSlide>
                ))}
              </AnimatePresence>
            </Swiper>
          )}
          
          {/* Navigation Buttons */}
          <button className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-indigo-600 hover:bg-indigo-50 transition-all duration-300 -ml-4 md:-ml-6 opacity-0 group-hover:opacity-100">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-indigo-600 hover:bg-indigo-50 transition-all duration-300 -mr-4 md:-mr-6 opacity-0 group-hover:opacity-100">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        
      </motion.div>
    </section>
  );
};

export default TopSellingProducts;