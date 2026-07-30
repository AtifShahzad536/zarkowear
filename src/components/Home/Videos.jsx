import React, { useEffect, useState } from 'react';
import { getHome, imageUrl } from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaTimes } from 'react-icons/fa';

const Videos = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    getHome()
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
      <div className="py-16 text-center text-gray-500">
        <div className="inline-block w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-2"></div>
        <p className="text-sm">Loading behind the scenes...</p>
      </div>
    );
  }

  if (error || !list.length) return null;

  return (
    <section className="relative py-20 bg-slate-950 text-white overflow-hidden">
      {/* Dynamic background highlights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold uppercase tracking-widest text-indigo-400"
          >
            Behind the Scenes
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-3xl md:text-5xl font-black tracking-tight"
          >
            How We Work & Our Team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-gray-400 max-w-2xl mx-auto text-base md:text-lg"
          >
            Take a look inside Zarko Sportswear. Discover our manufacturing process, design engineering, and the passionate team crafting your custom kits.
          </motion.p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="group relative cursor-pointer rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl transition-all duration-300"
              onClick={() => setActiveVideo(video)}
            >
              {/* Aspect Ratio Box */}
              <div className="aspect-video relative overflow-hidden bg-black">
                {video.thumbnailUrl ? (
                  <img
                    src={imageUrl(video.thumbnailUrl)}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-400">
                    No Thumbnail
                  </div>
                )}
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-300 group-hover:bg-black/60">
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg transition-colors group-hover:bg-indigo-500 text-white"
                  >
                    <FaPlay className="text-lg ml-1" />
                  </motion.div>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                  {video.title}
                </h3>
                {video.description && (
                  <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                    {video.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Lightbox Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-4xl rounded-2xl overflow-hidden bg-black shadow-2xl border border-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors border border-white/10"
                onClick={() => setActiveVideo(null)}
              >
                <FaTimes />
              </button>

              {/* Video Player */}
              <div className="aspect-video w-full">
                <video
                  src={imageUrl(activeVideo.url)}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                  poster={activeVideo.thumbnailUrl ? imageUrl(activeVideo.thumbnailUrl) : undefined}
                />
              </div>

              {/* Info panel inside modal */}
              <div className="p-6 bg-slate-900 border-t border-slate-800 text-left">
                <h4 className="text-2xl font-black text-white">{activeVideo.title}</h4>
                {activeVideo.description && (
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed">{activeVideo.description}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Videos;
