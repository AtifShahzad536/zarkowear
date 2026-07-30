import React, { useEffect, useState } from 'react';
import { getHomeSettings, imageUrl } from '../../services/api';
import { motion } from 'framer-motion';

const Videos = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
      <div className="py-16 text-center text-slate-500">
        <div className="inline-block w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-2"></div>
        <p className="text-sm">Loading videos...</p>
      </div>
    );
  }

  if (error || !list.length) return null;

  return (
    <section className="relative py-20 bg-gradient-to-b from-indigo-50/20 via-white to-indigo-50/20 overflow-hidden">
      {/* Decorative clean background blur */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-50/60 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold uppercase tracking-widest text-indigo-600 animate-pulse"
          >
            Inside Zarko Sportswear
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight text-indigo-900"
          >
            How We Work & Our Team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-500 max-w-2xl mx-auto text-base md:text-lg"
          >
            Watch direct behind-the-scenes videos of our manufacturing, design engineering, and the dedicated team crafting your custom kits.
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
              className="bg-white rounded-2xl overflow-hidden border border-indigo-100/80 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              {/* Direct Video Player (No Thumbnail required) */}
              <div className="aspect-video relative overflow-hidden bg-slate-900 border-b border-indigo-50">
                <video
                  src={imageUrl(video.url)}
                  controls
                  preload="metadata"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-indigo-950">
                    {video.title}
                  </h3>
                  {video.description && (
                    <p className="mt-2 text-sm text-slate-500 line-clamp-3 leading-relaxed">
                      {video.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Videos;
