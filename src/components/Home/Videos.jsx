import React, { useEffect, useState, useRef } from 'react';
import { getHomeSettings, imageUrl } from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaArrowRight, FaWhatsapp } from 'react-icons/fa';
import { FiMaximize2, FiX } from 'react-icons/fi';

const PinterestVideoCard = ({ video, index, onOpenModal }) => {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Staggered Pinterest-style aspect ratios
  const aspectRatios = [
    'aspect-[9/14]',
    'aspect-[4/5]',
    'aspect-[9/15]',
    'aspect-[1/1]',
    'aspect-[9/13]',
    'aspect-[4/5]',
  ];
  const aspectClass = aspectRatios[index % aspectRatios.length];

  const defaultTags = [
    'Factory Floor',
    'Laser Cutting',
    '4K Sublimation',
    'Tackle Twill',
    'Precision Stitching',
    'Final QC Inspection'
  ];
  const tag = defaultTags[index % defaultTags.length];

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: (index % 4) * 0.08, duration: 0.45 }}
      className="break-inside-avoid mb-4 sm:mb-6"
    >
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onOpenModal(video)}
        className={`relative ${aspectClass} rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 group cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1.5`}
      >
        {/* Background Video */}
        <video
          ref={videoRef}
          src={imageUrl(video.url)}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Pinterest Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 opacity-80 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
          <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider border border-white/20 shadow-sm flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            <span>{tag}</span>
          </span>

          {/* Fullscreen Expand Action */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal(video);
            }}
            className="w-8 h-8 rounded-full bg-white/95 hover:bg-white text-slate-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:scale-110 active:scale-95"
            title="Watch Fullscreen"
          >
            <FiMaximize2 className="text-xs" />
          </button>
        </div>

        {/* Center Floating Play Icon */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div
            className={`w-14 h-14 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center transition-all duration-300 ${
              isHovered ? 'scale-100 opacity-100' : 'scale-90 opacity-0 sm:opacity-50'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-xl">
              <FaPlay className="text-xs ml-0.5 text-slate-900" />
            </div>
          </div>
        </div>

        {/* Bottom Details Pill (Pinterest Aesthetic) */}
        <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 flex flex-col justify-end text-left">
          <span className="text-[9.5px] uppercase font-bold text-slate-300 tracking-wider">
            Zarko Sportswear OEM
          </span>

          <h3
            className="text-white text-sm sm:text-base font-black uppercase tracking-tight line-clamp-1 leading-snug group-hover:text-indigo-300 transition-colors mt-0.5"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {video.title || 'Inside Our Factory'}
          </h3>

          {video.description && (
            <p className="text-slate-300 text-xs font-normal line-clamp-2 mt-1 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
              {video.description}
            </p>
          )}

          {/* Watch Reel Action Link */}
          <div className="mt-3 flex items-center gap-2 pt-2 border-t border-white/15">
            <span className="text-[11px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5 group-hover:text-indigo-300 transition-colors">
              <span>Watch Reel</span>
              <FaArrowRight className="text-[9px] group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Videos = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeModalVideo, setActiveModalVideo] = useState(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    getHomeSettings()
      .then((d) => {
        if (!alive) return;
        setList(d.videos || []);
        setError('');
      })
      .catch((e) => alive && setError(e.message || 'Failed to load videos'))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500 bg-[#FAFAFC]">
        <div className="inline-block w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mb-2"></div>
        <p className="text-xs uppercase tracking-wider font-bold">Loading factory reels...</p>
      </div>
    );
  }

  if (error || !list.length) return null;

  return (
    <section className="w-full py-20 sm:py-24 bg-[#FAFAFC] border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-[94%] xl:max-w-7xl 2xl:max-w-[1440px] mx-auto px-4">
        
        {/* Header Area */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-indigo-600 block">
            Inside Zarko Sportswear
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 uppercase"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            How We Work & Our Team
          </h2>
          <div className="w-12 h-1 bg-indigo-600 mt-1 rounded-full" />
          <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-xl mx-auto leading-relaxed pt-1">
            Watch direct behind-the-scenes videos of our sportswear factory in Pakistan, showing how our dedicated team crafts your custom kits with elite Sialkot manufacturing standards.
          </p>
        </div>

        {/* Pinterest-Style Masonry Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-3 xl:columns-4 gap-4 sm:gap-6">
          {list.map((video, index) => (
            <PinterestVideoCard
              key={index}
              video={video}
              index={index}
              onOpenModal={(v) => setActiveModalVideo(v)}
            />
          ))}
        </div>

      </div>

      {/* Fullscreen Video Modal (Pinterest Lightbox) */}
      <AnimatePresence>
        {activeModalVideo && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
            onClick={() => setActiveModalVideo(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalVideo(null)}
                className="absolute top-3.5 right-3.5 z-30 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-all shadow-md cursor-pointer"
                title="Close"
              >
                <FiX className="text-base" />
              </button>

              {/* Video Player */}
              <div className="relative aspect-video sm:aspect-[16/10] bg-black max-h-[68vh] flex items-center justify-center">
                <video
                  src={imageUrl(activeModalVideo.url)}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Video Details & CTA */}
              <div className="p-5 sm:p-6 bg-slate-900 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 block mb-1">
                    Sialkot Factory Behind-The-Scenes
                  </span>
                  <h3
                    className="text-base sm:text-xl font-black text-white uppercase leading-snug"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {activeModalVideo.title}
                  </h3>
                  {activeModalVideo.description && (
                    <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
                      {activeModalVideo.description}
                    </p>
                  )}
                </div>

                <a
                  href="https://wa.me/923039200750?text=Hi%20Zarko%20Sportswear,%20I%20saw%20your%20factory%20video%20and%20want%20to%20inquire%20about%20custom%20teamwear."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shrink-0 transition-colors shadow-lg active:scale-95"
                >
                  <FaWhatsapp className="text-sm" />
                  <span>Inquire On WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Videos;


