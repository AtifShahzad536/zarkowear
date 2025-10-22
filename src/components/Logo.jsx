import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Logo() {
  const config = {
    waveHeight: 6, 
    waveSpeed: 0.6,
    perpetualBounce: {
      height: 4, 
      speed: 3 
    },
    wordDelay: 0.2,
    colors: {
      start: '#4f46e5',
      end: '#7c3aed',
      dotStart: '#6366f1',
      dotEnd: '#8b5cf6',
      reflection: 'rgba(255,255,255,0.3)'
    },
    effects: {
      glow: true,
      reflection: true, 
      depth: true 
    }
  };

  const words = ["Zarko", "Sportswear"];
  
  const wordContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3
      }
    }
  };

  const letter = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring", 
        damping: 15, 
        stiffness: 150 
      }
    },
    perpetual: {
      y: [0, -config.perpetualBounce.height, 0],
      transition: {
        duration: config.perpetualBounce.speed,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    },
    interactive: {
      y: [null, -config.waveHeight, 0],
      transition: {
        duration: config.waveSpeed,
        ease: "easeOut"
      }
    }
  };

  const word = {
    perpetual: {
      y: [0, -config.perpetualBounce.height/2, 0],
      transition: {
        delay: (i) => i * config.wordDelay,
        duration: config.perpetualBounce.speed,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    },
    interactive: {
      y: [null, -config.waveHeight/2, 0],
      transition: {
        duration: config.waveSpeed,
        ease: "easeOut"
      }
    }
  };

  return (
    <Link to="/" className="flex items-center group">
      <motion.div 
        className="flex items-center relative"
        initial="hidden"
        animate="show"
      >
        {/* Enhanced gradient background */}
        <motion.div 
          className="absolute h-12 w-12 rounded-full"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${config.colors.start}15, transparent 70%)`,
            filter: config.effects.glow ? `blur(10px)` : 'none'
          }}
          initial={{ scale: 0, rotate: -45 }}
          animate={{ 
            scale: 1,
            rotate: 0,
            transition: { 
              type: "spring", 
              stiffness: 300, 
              damping: 15,
              delay: 0.1
            }
          }}
        />
        
        {/* Words with depth effect */}
        <motion.div className="flex items-baseline relative">
          {words.map((wordText, wordIndex) => (
            <motion.div 
              key={wordIndex}
              className="flex items-center relative"
              variants={word}
              animate="perpetual"
              whileHover="interactive"
              whileTap="interactive"
            >
              {/* 3D text effect */}
              {config.effects.depth && (
                <motion.span 
                  className="absolute text-2xl font-extrabold"
                  style={{
                    background: `linear-gradient(90deg, ${config.colors.start}30, ${config.colors.end}30)`,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    filter: 'blur(1px)'
                  }}
                  initial={{ x: 1, y: 1, opacity: 0.6 }}
                  animate={{
                    x: 1.5,
                    y: 1.5,
                    transition: {
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: config.perpetualBounce.speed
                    }
                  }}
                >
                  {wordText}
                </motion.span>
              )}
              
              {/* Main letters */}
              <motion.div 
                className="flex"
                variants={wordContainer}
              >
                {wordText.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    className="relative text-2xl font-extrabold"
                    style={{
                      background: `linear-gradient(90deg, ${config.colors.start}, ${config.colors.end})`,
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent',
                      textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                    variants={letter}
                    animate="perpetual"
                    whileHover="interactive"
                    whileTap="interactive"
                  >
                    {char}
                    {/* Light reflection */}
                    {config.effects.reflection && (
                      <motion.span
                        className="absolute left-0 top-0 h-full w-1/3 bg-white opacity-0"
                        style={{
                          background: `linear-gradient(90deg, ${config.colors.reflection}, transparent)`,
                          maskImage: 'linear-gradient(90deg, black, transparent)'
                        }}
                        animate={{
                          opacity: [0, 0.4, 0],
                          left: ['0%', '100%']
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatDelay: 5,
                          delay: i * 0.1 + wordIndex * 0.5
                        }}
                      />
                    )}
                  </motion.span>
                ))}
              </motion.div>
              
              {/* Space between words */}
              {wordIndex < words.length - 1 && (
                <span className="w-2"></span>
              )}
            </motion.div>
          ))}
        </motion.div>
        
        {/* Enhanced dot */}
        <motion.div
          className="h-2 w-2 rounded-full ml-1 relative"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${config.colors.dotEnd}, ${config.colors.dotStart})`,
            boxShadow: '0 0 8px rgba(99, 102, 241, 0.5)'
          }}
          initial={{ scale: 0 }}
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.8, 1, 0.8],
            y: [0, -2, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </Link>
  );
}
