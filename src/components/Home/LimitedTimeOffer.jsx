import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LimitedTimeOffer = () => {
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
 const navigate = useNavigate();
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <section className="w-full bg-gradient-to-r from-indigo-700 to-purple-700 text-white py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left space-y-4"
        >
          <h2 className="text-4xl font-extrabold drop-shadow-lg">⏳ Limited Time Offer</h2>
          <p className="text-lg">
            Get <span className="text-yellow-300 font-bold">Amazing Discounts</span> on premium team sportswear — only for the next:
          </p>
          <div className="text-2xl font-semibold bg-white text-indigo-700 px-6 py-3 rounded-full inline-block shadow-lg">
            {formatTime(timeLeft)}
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 bg-yellow-300 text-indigo-900 font-bold px-6 py-3 rounded-full shadow hover:bg-yellow-400 transition"
            onClick={() => navigate('/custom')}
          >
            Grab the Deal
          </motion.button>
        </motion.div>

        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex justify-center md:justify-end"
        >
          <motion.div
            whileHover={{ rotate: -1.5, y: -4 }}
            className="relative w-72 h-72 md:w-80 md:h-80 rounded-xl overflow-hidden shadow-xl border-4 border-white bg-white"
          >
            <img
              src="/images/slide1.jpg"
              alt="Deal Product"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 bg-yellow-300 text-indigo-900 text-xs font-bold px-3 py-1 rounded-full shadow-md">
              Deal of the Day
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LimitedTimeOffer;