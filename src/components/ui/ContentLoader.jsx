import React from 'react';
import { motion } from 'framer-motion';

const ContentLoader = ({ count = 1, className = '', cardType = 'default' }) => {
  const getLoaderContent = () => {
    switch (cardType) {
      case 'product':
        return (
          <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
            <div className="relative pb-[100%] bg-gray-100">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse"></div>
            </div>
            <div className="p-4">
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="flex justify-between items-center">
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="h-10 w-10 rounded-full bg-gray-200"></div>
              </div>
            </div>
          </div>
        );
      
      case 'category':
        return (
          <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
            <div className="p-6 text-center">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
              </div>
              <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 p-6">
            <div className="flex space-x-4">
              <div className="flex-1 space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`grid gap-6 ${className}`}
    >
      {[...Array(count)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { 
              delay: index * 0.05,
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1]
            }
          }}
        >
          {getLoaderContent()}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ContentLoader;
