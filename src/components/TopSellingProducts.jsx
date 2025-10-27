import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ProductCard from './ProductCard';

const TopSellingProducts = () => {
  const products = [
    {
      id: 1,
      name: 'Premium Football Jersey',
      description: 'High-quality football jersey with moisture-wicking fabric',
      price: 49.99,
      discount: 15,
      image: '/images/football-jersey.jpg'
    },
    {
      id: 2,
      name: 'Training Tracksuit',
      description: 'Comfortable tracksuit for training sessions',
      price: 79.99,
      image: '/images/tracksuit.jpg'
    },
    {
      id: 3,
      name: 'Goalkeeper Gloves',
      description: 'Professional grade goalkeeper gloves with latex palm',
      price: 59.99,
      discount: 20,
      image: '/images/goalkeeper-gloves.jpg'
    },
    {
      id: 4,
      name: 'Football Shorts',
      description: 'Breathable football shorts with side pockets',
      price: 29.99,
      image: '/images/football-shorts.jpg'
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Top Selling Products
          </h2>
          <p className="mt-2 text-gray-600">
            Premium quality sportswear for athletes
          </p>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 }
            }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className="py-4">
                <ProductCard {...product} isTopSelling={true} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-indigo-600 hover:bg-indigo-50 transition-colors -ml-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-indigo-600 hover:bg-indigo-50 transition-colors -mr-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="mt-8 text-center">
          <a
            href="/products"
            className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            View All Products
            <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TopSellingProducts;
