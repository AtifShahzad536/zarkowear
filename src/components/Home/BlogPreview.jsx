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
        // Sort and get the 3 most recent blogs
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

  const featuredBlog = blogs[0];
  const sideBlogs = blogs.slice(1, 3);

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
            className="inline-flex items-center gap-2 rounded-none bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider px-6 py-3.5 transition active:scale-95"
          >
            View All Articles →
          </Link>
        </div>

        {/* 2-Column Split Layout - No Rounded Corners */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: One Large Main Blog Post */}
          <div className="lg:col-span-7 flex flex-col">
            {featuredBlog && (
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col h-full bg-white border border-slate-200 rounded-none overflow-hidden hover:shadow-md transition-shadow duration-300 group"
              >
                {/* Large Thumbnail */}
                <Link to={`/blogs/${featuredBlog.slug}`} className="aspect-[1.8] relative overflow-hidden bg-slate-100 block rounded-none">
                  {featuredBlog.coverImage ? (
                    <img
                      src={imageUrl(featuredBlog.coverImage, { width: 800 })}
                      alt={featuredBlog.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 rounded-none"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-150 text-slate-400 font-black uppercase text-2xl rounded-none">
                      ZARKO SPORTSWEAR
                    </div>
                  )}
                </Link>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between rounded-none">
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block">
                      {new Date(featuredBlog.createdAt || featuredBlog.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                    <Link to={`/blogs/${featuredBlog.slug}`}>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase leading-tight tracking-tight rounded-none" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        {featuredBlog.title}
                      </h3>
                    </Link>
                    {featuredBlog.summary && (
                      <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed line-clamp-3">
                        {featuredBlog.summary}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 mt-6 border-t border-slate-100">
                    <Link
                      to={`/blogs/${featuredBlog.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-indigo-600 transition-colors uppercase"
                    >
                      Read Full Article <span>→</span>
                    </Link>
                  </div>
                </div>
              </motion.article>
            )}
          </div>

          {/* Right Column: Other Blog Posts Stacked Vertically */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {sideBlogs.map((blog, idx) => (
              <motion.article
                key={blog.id || blog._id || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.1, duration: 0.5 }}
                className="flex flex-col sm:flex-row bg-white border border-slate-200 rounded-none overflow-hidden hover:shadow-md transition-shadow duration-300 group flex-1"
              >
                {/* Small Thumbnail */}
                <Link to={`/blogs/${blog.slug}`} className="w-full sm:w-40 aspect-[1.5] sm:aspect-square relative overflow-hidden bg-slate-100 block shrink-0 rounded-none">
                  {blog.coverImage ? (
                    <img
                      src={imageUrl(blog.coverImage, { width: 400 })}
                      alt={blog.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 rounded-none"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-150 text-slate-400 font-black uppercase text-xs rounded-none">
                      ZARKO
                    </div>
                  )}
                </Link>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between rounded-none">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block">
                      {new Date(blog.createdAt || blog.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                    <Link to={`/blogs/${blog.slug}`}>
                      <h3 className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase leading-snug tracking-tight line-clamp-2 rounded-none" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        {blog.title}
                      </h3>
                    </Link>
                  </div>

                  <div className="pt-3 mt-4 border-t border-slate-100">
                    <Link
                      to={`/blogs/${blog.slug}`}
                      className="inline-flex items-center gap-1.5 text-[10px] font-bold text-slate-900 hover:text-indigo-600 transition-colors uppercase"
                    >
                      Read Article <span>→</span>
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
