import React from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const product = {
  name: 'Festive Kurta Set',
  image: '/images/slide1.jpg',
  description:
    'This elegant kurta set is crafted with premium fabric and intricate embroidery. Perfect for festive occasions and formal gatherings.',
  details: [
    'Premium cotton blend fabric',
    'Hand-embroidered neckline',
    'Available in 4 colors',
    'Custom sizing available',
    'Delivery within 7–10 days',
    'Made-to-order craftsmanship',
  ],
  sizes: ['S', 'M', 'L', 'XL'],
};

const relatedProducts = [
  { name: 'Classic Shalwar', image: '/images/slide2.jpg' },
  { name: 'Formal Sherwani', image: '/images/slide1.jpg' },
  { name: 'Summer Lawn', image: '/images/slide2.jpg' },
  { name: 'Casual Tunic', image: '/images/slide1.jpg' },
];

const ProductInquiry = () => {
    const { pathname } = useLocation();
    useEffect(()=>{
        window.scrollTo(0,0)
    },[pathname])
  return (
    <section className="w-full px-4 py-10 bg-gray-50">
      {/* Product Name */}
      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-10">
        {product.name}
      </h1>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left: Details + Form */}
        <div className="space-y-6">
          <p className="text-gray-700 text-lg">{product.description}</p>

          {/* Detail Points */}
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            {product.details.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>

          {/* Sizes */}
          <div>
            <h4 className="text-md font-semibold mb-2">Available Sizes:</h4>
            <div className="flex gap-3 flex-wrap">
              {product.sizes.map((size, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>

          {/* Inquiry Form */}
          <form className="space-y-4 mt-6">
            <h3 className="text-xl font-bold text-indigo-600 mb-2">Place Your Inquiry</h3>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="text"
              placeholder="Your Address"
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <textarea
              rows="5"
              placeholder="Your Message or Custom Requirements"
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-indigo-600 text-white font-bold px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition"
            >
              Submit Inquiry
            </button>
          </form>
        </div>

        {/* Right: Product Image with Hover Overlay */}
        <div className="relative group w-full flex justify-center items-start">
          <div className="relative max-w-sm w-full h-[400px] overflow-hidden rounded-xl shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-blue-900/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
              <span className="text-white text-xl font-bold typing-text">{product.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          You May Also Like
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {relatedProducts.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden text-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="py-3 text-indigo-700 font-semibold text-sm">
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductInquiry;