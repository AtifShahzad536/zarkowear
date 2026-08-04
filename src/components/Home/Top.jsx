import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { getTopSelling, imageUrl } from '../../services/api';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MotionLink = motion(Link);

const fallbackItems = [
  { image: '/images/slide1.jpg', name: 'Pro Football Jersey', link: '/football' },
  { image: '/images/slide2.jpg', name: 'Cricket ODI Kit', link: '/cricket' },
  { image: '/images/slide1.jpg', name: 'Basketball Sleeveless Set', link: '/basketball' },
  { image: '/images/slide2.jpg', name: 'Hockey Team Jersey', link: '/hockey' },
  { image: '/images/slide1.jpg', name: 'Rugby Pro Shorts', link: '/rugby' },
  { image: '/images/slide2.jpg', name: 'Tennis Performance Polo', link: '/tennis' },
];

const TopSellingProducts = () => {
  const containerRef = useRef(null);
  const isSwiperInView = useInView(containerRef, { once: true, margin: "200px" });
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
        className="max-w-[94%] mx-auto px-4"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.25em] text-indigo-600 block mb-2">
              POPULAR ITEMS
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Our Bestselling Sportswear
            </h2>
            <div className="w-12 h-0.5 bg-indigo-600 mt-2" />
          </div>
          
          {/* Custom Nav buttons top right */}
          <div className="flex gap-2 relative z-20">
            <button aria-label="Previous Slide" className="custom-prev-top p-3 border border-slate-200 rounded-none bg-white text-slate-800 hover:bg-slate-50 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button aria-label="Next Slide" className="custom-next-top p-3 border border-slate-200 rounded-none bg-white text-slate-800 hover:bg-slate-50 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Product Carousel */}
        <div className="relative group">
          {loading || !isSwiperInView ? (
            <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 px-2 min-h-[400px]">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="group relative bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm h-full">
                  <div className="aspect-[4/5] bg-gray-100 animate-pulse relative"></div>
                  <div className="p-5 relative z-10 bg-white">
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-100 rounded-full animate-pulse"></div>
                      <div className="h-3 bg-gray-100 rounded-full w-5/6 animate-pulse"></div>
                      <div className="h-3 bg-gray-100 rounded-full w-2/3 animate-pulse"></div>
                    </div>
                    <div className="h-10 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-none animate-pulse mt-4"></div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          ) : (
            <div ref={containerRef}>
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={{
                nextEl: '.custom-next-top',
                prevEl: '.custom-prev-top',
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
                    <MotionLink
                      to={item.link || '#'}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                      className="group relative overflow-hidden rounded-none shadow-md hover:shadow-2xl transition cursor-pointer hover:-translate-y-1 block"
                    >
                      <motion.img
                        src={imageUrl(item.image, { width: 500 }) || item.image}
                        alt={item.name}
                        width={500}
                        height={500}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-80 object-contain bg-white transform group-hover:scale-110 transition duration-700 ease-out"
                        onError={(e) => {
                          e.target.src = '/images/placeholder.jpg';
                        }}
                      />
                      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition duration-500" />
                      <div className="absolute inset-0 z-20 flex flex-col justify-end p-5">
                        <div className="space-y-1">
                          <h3 className="text-lg md:text-xl font-bold tracking-wide text-white drop-shadow-lg transition duration-300 group-hover:-translate-y-1">
                            {item.name}
                          </h3>
                          <div className="max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 overflow-hidden transition-all duration-500 ease-in-out">
                            <p className="text-xs md:text-sm text-gray-200/90 leading-relaxed line-clamp-2 mt-2">
                              {item.description || `Premium ${item.name} with export-grade fabrics and customizable options.`}
                            </p>
                            <span className="inline-flex items-center justify-center gap-2 w-full rounded-none bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 text-xs md:text-sm tracking-wide shadow-md transition duration-300 mt-3">
                              Customize Now
                              <span aria-hidden>→</span>
                            </span>
                          </div>
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
                    </MotionLink>
                  </SwiperSlide>
                ))}
              </AnimatePresence>
            </Swiper>
            </div>
          )}
        </div>

        
      </motion.div>
    </section>
  );
};

export default TopSellingProducts;