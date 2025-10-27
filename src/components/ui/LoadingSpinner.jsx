import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTshirt, FaStar } from 'react-icons/fa';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.5 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const spinnerVariants = {
  initial: { rotateY: 0, rotateX: 0 },
  animate: { 
    rotateY: 360,
    rotateX: 15,
    transition: {
      rotateY: {
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      },
      rotateX: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  }
};

const progressBarVariants = (progress) => ({
  initial: { width: '0%' },
  animate: { 
    width: `${progress}%`,
    transition: { duration: 0.8, ease: "easeInOut" }
  }
});

const LoadingSpinner = ({ 
  size = 'md', 
  fullScreen = true, 
  progress = 0, 
  message = 'Loading Zarko Sportswear', 
  subMessage = 'Preparing your experience...' 
}) => {
  const [currentTip, setCurrentTip] = useState(0);
  const messageRef = useRef(message);
  const subMessageRef = useRef(subMessage);
  
  // Tips that cycle through while loading
  const loadingTips = [
    'Did you know? Zarko Sportswear uses only the highest quality fabrics for ultimate comfort.',
    'All our products are ethically manufactured in state-of-the-art facilities.',
    'We serve professional athletes and teams worldwide with custom sportswear solutions.'
  ];
  
  // Update refs when props change
  useEffect(() => {
    messageRef.current = message;
    subMessageRef.current = subMessage;
  }, [message, subMessage]);
  
  // Rotate through tips
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % loadingTips.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [loadingTips.length]);
  
  // Size classes
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-24 w-24',
    lg: 'h-32 w-32',
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    },
  };

  // Spinner animation
  const spinnerVariants = {
    initial: {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
    },
    animate: {
      rotateY: 360,
      rotateX: 15,
      scale: [1, 1.05, 1],
      transition: {
        rotateY: {
          duration: 3,
          ease: "linear",
          repeat: Infinity,
        },
        rotateX: {
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        },
        scale: {
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }
      }
    }
  };

  // Progress bar animation
  const progressBarVariants = {
    initial: { width: '0%' },
    animate: {
      width: `${progress}%`,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // Brand colors from your website
  const brandGradient = 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 50%, #60a5fa 100%)';
  
  const gradientVariants = {
    initial: {
      backgroundPosition: '0% 50%',
    },
    animate: {
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      transition: {
        duration: 8,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop',
      },
    },
  };

  const spinnerVariants = {
    initial: {
      rotateY: 0,
      rotateX: 0,
      scale: 0.9,
    },
    animate: (i) => ({
      rotateY: 360,
      rotateX: 360,
      scale: [0.9, 1.05, 0.9],
      transition: {
        rotateY: {
          duration: 8,
          ease: 'linear',
          repeat: Infinity,
        },
        rotateX: {
          duration: 4,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse',
        },
        scale: {
          duration: 2,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'mirror',
        }
      },
    }),
  };

  const pulseVariants = {
    initial: {
      opacity: 0.6,
      scale: 0.8,
    },
    animate: {
      opacity: [0.6, 1, 0.6],
      scale: [0.8, 1.1, 0.8],
      transition: {
        duration: 2.5,
        ease: 'easeInOut',
        repeat: Infinity,
      },
    },
  };

  // Enhanced brand icons with more variety and colors
  const brandIcons = [
    { icon: <FaTshirt className="w-3/4 h-3/4" />, color: 'text-blue-600' },
    { icon: <GiSoccerBall className="w-3/4 h-3/4" />, color: 'text-emerald-500' },
    { icon: <FaRunning className="w-3/4 h-3/4" />, color: 'text-sky-500' },
    { icon: <FaMedal className="w-3/4 h-3/4" />, color: 'text-yellow-400' },
    { icon: <FaTrophy className="w-3/4 h-3/4" />, color: 'text-amber-500' },
    { icon: <FaAward className="w-3/4 h-3/4" />, color: 'text-indigo-400' },
    { icon: <GiRunningShoe className="w-3/4 h-3/4" />, color: 'text-blue-400' },
    { icon: <GiTennisRacket className="w-3/4 h-3/4" />, color: 'text-green-500' },
    { icon: <RiBasketballLine className="w-3/4 h-3/4" />, color: 'text-orange-500' },
    { icon: <MdOutlineSportsHandball className="w-3/4 h-3/4" />, color: 'text-red-400' },
  ];

  const [currentIcon, setCurrentIcon] = useState(0);

  // Progress and animation effects
  useEffect(() => {
    // Cycle through loading messages
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % loadingMessages.length);
    }, 4000);

    // Update progress
    progressInterval.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 0;
        }
        return Math.min(prev + (Math.random() * 10), 95); // Never reach 100% automatically
      });
    }, 600);

    // Particle animation
    const particleInterval = setInterval(() => {
      controls.start({
        opacity: [0, 1, 0],
        y: ['0%', '-100%'],
        x: [
          `${Math.random() * 100 - 50}%`,
          `${(Math.random() * 100 - 50) * 0.5}%`
        ],
        scale: [0.8, 1.2, 0.8],
        transition: {
          duration: 1.5,
          ease: 'easeOut'
        }
      });
    }, 300);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval.current);
      clearInterval(particleInterval);
    };
  }, []);

  // Generate floating particles with different shapes and colors
  const renderParticles = () => {
    const particleTypes = [
      { shape: 'rounded-full', color: 'from-blue-400/30 to-blue-200/20' },
      { shape: 'rounded-sm', color: 'from-emerald-400/25 to-emerald-200/20' },
      { shape: 'rounded-full', color: 'from-sky-400/25 to-sky-200/20' },
      { shape: 'rounded-sm', color: 'from-indigo-400/25 to-indigo-200/20' },
    ];

    return Array.from({ length: 20 }).map((_, i) => {
      const type = particleTypes[i % particleTypes.length];
      const size = Math.random() * 8 + 4;
      const duration = Math.random() * 3 + 2;
      const delay = Math.random() * 2;
      
      return (
        <motion.div
          key={i}
          className={`absolute ${type.shape} bg-gradient-to-br ${type.color}`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: [0, 0.8, 0],
            y: ['0%', '-100%'],
            x: [
              `${Math.random() * 100 - 50}%`,
              `${(Math.random() * 100 - 50) * 0.5}%`
            ],
            scale: [0.5, 1.2, 0.5],
            rotate: [0, 180],
          }}
          transition={{
            duration: duration,
            delay: delay,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        />
      );
    });
  };

  // Generate floating stars for background
  const renderStars = () => {
    return Array.from({ length: 15 }).map((_, i) => {
      const size = Math.random() * 2 + 1;
      const duration = Math.random() * 3 + 3;
      const delay = Math.random() * 2;
      const opacity = 0.1 + Math.random() * 0.3;
      
      return (
        <motion.div
          key={`star-${i}`}
          className="absolute text-yellow-300/70"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${size}px`,
            opacity: 0,
          }}
          animate={{
            opacity: [0, opacity, 0],
            scale: [0.5, 1.2, 0.5],
            rotate: [0, 180],
          }}
          transition={{
            duration: duration,
            delay: delay,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        >
          <FaStar className="w-full h-full" />
        </motion.div>
      );
    });
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className={`relative flex flex-col items-center justify-center ${fullScreen ? 'min-h-screen' : 'py-12'} bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden`}
        variants={container}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated gradient overlay */}
          <motion.div 
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/80 via-slate-900/90 to-slate-900"
            initial={{ opacity: 1 }}
            animate={{ 
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear',
            }}
            style={{
              backgroundSize: '200% 200%',
            }}
          />
          
          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />
          
          {renderParticles()}
          {renderStars()}
          
          {/* Pulsing glow effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5"
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Brand Logo/Header */}
        <motion.div 
          className="relative mb-8 text-center z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
          }}
        >
          <div className="relative">
            {/* Text shadow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg blur opacity-30"></div>
            
            <motion.h1 
              className="relative text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-cyan-200"
              initial={{ opacity: 0, y: -10 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                backgroundPosition: ['0% 0%', '100% 100%'],
                textShadow: [
                  '0 0 10px rgba(147, 197, 253, 0.5)',
                  '0 0 20px rgba(96, 165, 250, 0.7)',
                  '0 0 10px rgba(147, 197, 253, 0.5)',
                ],
                transition: { 
                  backgroundPosition: {
                    duration: 8,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'linear'
                  },
                  textShadow: {
                    duration: 3,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut'
                  }
                }
              }}
              style={{
                backgroundSize: '200% 200%',
              }}
            >
              ZARKO SPORTSWEAR
            </motion.h1>
          </div>
          <motion.div
            className="mt-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { 
                delay: 0.3,
                duration: 0.6,
                ease: 'easeOut'
              }
            }}
          >
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200 text-sm font-medium tracking-wider">
              CRAFTING EXCELLENCE IN SPORTSWEAR
            </p>
            <motion.div 
              className="h-0.5 bg-gradient-to-r from-blue-500/30 via-cyan-400/50 to-blue-500/30 mt-1.5"
              initial={{ scaleX: 0 }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            />
            
            {/* Main spinner */}
            <motion.div
              className="relative w-full h-full"
              variants={{
                hidden: { rotateY: 0, rotateX: 0 },
                visible: {
                  rotateY: 360,
                  rotateX: 360,
                  transition: {
                    rotateY: {
                      duration: 12,
                      ease: 'linear',
                      repeat: Infinity,
                    },
                    rotateX: {
                      duration: 8,
                      ease: 'easeInOut',
                      repeat: Infinity,
                      repeatType: 'reverse',
                    },
                  },
                },
              }}
            >
              {/* Enhanced spinner rings with gradients */}
              {[0, 1, 2].map((ring) => {
                const gradients = [
                  'from-blue-500 via-cyan-400 to-blue-600',
                  'from-emerald-500 via-teal-400 to-emerald-600',
                  'from-indigo-500 via-blue-400 to-indigo-600',
                ];
                
                return (
                  <motion.div
                    key={ring}
                    className={`absolute inset-0 rounded-full border-4 border-transparent`}
                    style={{
                      backgroundImage: `linear-gradient(white, white), linear-gradient(to right, var(--tw-gradient-stops))`,
                      backgroundOrigin: 'border-box',
                      backgroundClip: 'content-box, border-box',
                      transform: `rotateZ(${ring * 60}deg)`,
                      opacity: 1 - ring * 0.2,
                      '--tw-gradient-stops': gradients[ring % gradients.length],
                    }}
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 10 + ring * 3,
                      ease: 'linear',
                      repeat: Infinity,
                    }}
                  />
                );
              })}
              
              {/* Center dot */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-300 to-blue-500 shadow-lg" />
              </div>
              
              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIcon}
                    className={`${brandIcons[currentIcon].color} w-1/2 h-1/2 flex items-center justify-center`}
                    initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      rotate: 0,
                      transition: { 
                        type: 'spring', 
                        stiffness: 200, 
                        damping: 10 
                      } 
                    }}
                    exit={{ 
                      opacity: 0, 
                      scale: 1.2, 
                      rotate: 45,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {brandIcons[currentIcon].icon}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced progress bar with glow */}
          <div className="mt-12 w-full max-w-md px-6 relative">
            <div className="flex justify-between text-xs mb-2">
              <motion.span 
                className="text-blue-200 font-medium"
                initial={{ opacity: 0, x: -10 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { delay: 0.2 }
                }}
              >
                LOADING
              </motion.span>
              <motion.span 
                className="text-cyan-300 font-bold"
                initial={{ opacity: 0, x: 10 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { delay: 0.3 }
                }}
              >
                {Math.round(progress)}%
              </motion.span>
            </div>
            
            <div className="h-2.5 bg-slate-700/50 rounded-full overflow-hidden relative">
              {/* Track glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-400/10 to-blue-500/10 rounded-full" />
              
              {/* Progress fill with gradient */}
              <motion.div 
                className="h-full rounded-full relative overflow-hidden"
                initial={{ width: '0%' }}
                animate={{ 
                  width: `${progress}%`,
                  boxShadow: '0 0 10px rgba(96, 165, 250, 0.5)'
                }}
                transition={{ 
                  duration: 0.8,
                  ease: 'easeOut'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 rounded-full" />
                
                {/* Animated shine effect */}
                <motion.div 
                  className="absolute top-0 bottom-0 w-20 bg-white/30"
                  initial={{ left: '-20%' }}
                  animate={{ 
                    left: ['-20%', '120%'],
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                      ease: 'easeInOut'
                    }
                  }}
                />
              </motion.div>
              
              {/* Progress steps */}
              <div className="absolute inset-0 flex">
                {[...Array(10)].map((_, i) => (
                  <div 
                    key={i}
                    className="h-full border-r border-slate-600/30 last:border-r-0"
                    style={{ width: '10%' }}
                  />
                ))}
              </div>
            </div>
            
            {/* Status text */}
            <motion.div 
              className="mt-2 text-right text-xs text-slate-400"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                transition: { delay: 0.4 }
              }}
            >
              {progress < 30 && 'Initializing...'}
              {progress >= 30 && progress < 70 && 'Loading assets...'}
              {progress >= 70 && progress < 90 && 'Almost there...'}
              {progress >= 90 && 'Finalizing...'}
            </motion.div>
          </div>

          {/* Enhanced loading message with icon */}
          <motion.div 
            className="mt-8 text-center max-w-md mx-auto px-6 relative"
            key={currentMessage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.6, ease: 'easeOut' }
            }}
            exit={{ 
              opacity: 0, 
              y: -10,
              transition: { duration: 0.3 }
            }}
          >
            <motion.div 
              className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                rotate: [0, 10, -10, 0],
                transition: { 
                  delay: 0.2,
                  rotate: {
                    duration: 0.8,
                    ease: 'easeInOut'
                  }
                }
              }}
            >
              <FaStar className="text-white text-xl" />
            </motion.div>
            
            <div className="pt-6 pb-4 px-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 shadow-xl">
              <motion.h3 
                className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-300"
                initial={{ opacity: 0, y: 5 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.3 }
                }}
              >
                {loadingMessages[currentMessage].main}
              </motion.h3>
              
              <motion.p 
                className="mt-2 text-sm text-slate-300 leading-relaxed"
                initial={{ opacity: 0, y: 5 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.4 }
                }}
              >
                {loadingMessages[currentMessage].sub}
              </motion.p>
              
              <motion.div 
                className="mt-3 h-0.5 bg-gradient-to-r from-transparent via-slate-600/50 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ 
                  scaleX: 1,
                  transition: { 
                    delay: 0.5,
                    duration: 0.6,
                    ease: 'easeOut'
                  }
                }}
              />
              
              <motion.p 
                className="mt-3 text-xs text-slate-400 italic flex items-center justify-center space-x-1"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 0.8,
                  transition: { delay: 0.6 }
                }}
              >
                <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span>Did you know? {loadingMessages[currentMessage].tip}</span>
              </motion.p>
            </div>
          </motion.div>

          {/* Brand tagline with animated border */}
          <motion.div 
            className="mt-10 text-center relative"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 0.9,
              transition: { delay: 1 }
            }}
          >
            <div className="inline-flex items-center space-x-2 px-6 py-2 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
              <motion.div 
                className="w-2 h-2 rounded-full bg-cyan-400"
                animate={{
                  scale: [1, 1.2, 1],
                  boxShadow: ['0 0 0 0 rgba(56, 189, 248, 0.7)', '0 0 0 8px rgba(56, 189, 248, 0)'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <span className="text-xs font-medium bg-clip-text text-transparent bg-gradient-to-r from-slate-300 to-slate-100 tracking-wider">
                ZARKO SPORTSWEAR • CRAFTING EXCELLENCE SINCE 2010
              </span>
              <motion.div 
                className="w-2 h-2 rounded-full bg-cyan-400"
                animate={{
                  scale: [1, 1.2, 1],
                  boxShadow: ['0 0 0 0 rgba(56, 189, 248, 0.7)', '0 0 0 8px rgba(56, 189, 248, 0)'],
                }}
                transition={{
                  duration: 2,
                  delay: 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>
            
            {/* Decorative elements */}
            <motion.div 
              className="absolute -bottom-4 left-1/2 w-32 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: 1,
                opacity: 1,
                transition: {
                  delay: 1.2,
                  duration: 0.8,
                  ease: 'easeOut'
                }
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingSpinner;
