import React, { useEffect, useState } from 'react';
import { getBlogs, imageUrl } from '../../services/api';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BlogPreview = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    getBlogs()
      .then((data) => {
        if (!alive) return;
        // Take the 3 most recent blogs
        const sorted = (data || []).sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date));
        setBlogs(sorted.slice(0, 3));
      })
      .catch(() => {})
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, []);

  if (loading || !blogs.length) return null;

  return (
    <section className="w-full py-20 bg-white border-b border-slate-200">
      <div className="max-w-[94%] mx-auto px-4">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-indigo-600 block">
              Zarko Education & News
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Latest Insights & Sportswear Guides
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-xl leading-relaxed">
              Read technical sizing guides, uniform compliance standards, and production insights direct from our industry experts.
            </p>
          </div>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider px-6 py-3.5 transition active:scale-95"
          >
            View All Articles →
          </Link>
        </div>

        {/* Blog Post Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, idx) => {
            const formattedDate = new Date(blog.createdAt || blog.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
            const linkPath = `/blogs/${blog.slug || blog.id}`;

            return (
              <motion.article
                key={blog.id || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
              >
                {/* Thumbnail Image */}
                <Link to={linkPath} className="h-48 sm:h-52 relative overflow-hidden bg-slate-100 block">
                  {blog.image ? (
                    <img
                      src={imageUrl(blog.image, { width: 500 })}
                      alt={blog.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300 font-black uppercase text-xl">
                      ZARKO
                    </div>
                  )}
                </Link>

                {/* Post Metadata & Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block">
                      {formattedDate}
                    </span>
                    <Link to={linkPath}>
                      <h3 className="text-base font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase leading-snug tracking-tight line-clamp-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        {blog.title}
                      </h3>
                    </Link>
                    {blog.summary && (
                      <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-3">
                        {blog.summary}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100">
                    <Link
                      to={linkPath}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-indigo-600 transition-colors uppercase"
                    >
                      Read Full Article <span>→</span>
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
