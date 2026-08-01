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
    <section className="w-full py-20 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-[94%] mx-auto px-4">
        
        {/* Header Area */}
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-indigo-600 block">
            Inside Zarko Sportswear
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
            How We Work & Our Team
          </h2>
          <div className="w-12 h-0.5 bg-indigo-600 mt-2" />
          <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-xl mx-auto leading-relaxed pt-1">
            Watch direct behind-the-scenes videos of our manufacturing, design engineering, and the dedicated team crafting your custom kits.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white border border-slate-200 rounded-none overflow-hidden transition-all duration-300 flex flex-col group"
            >
              {/* Direct Video Player (No Thumbnail required) */}
              <div className="h-64 sm:h-72 lg:h-80 relative overflow-hidden bg-slate-900">
                <video
                  src={imageUrl(video.url)}
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Info */}
              <div className="p-6 flex-1 flex flex-col justify-between border-t border-slate-100">
                <div>
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {video.title}
                  </h3>
                  {video.description && (
                    <p className="mt-2 text-[11px] text-slate-500 font-semibold line-clamp-3 leading-relaxed">
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
