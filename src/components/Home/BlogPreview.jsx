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
        // Sort and get all recent blogs
        const sorted = (data || []).sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date));
        setBlogs(sorted);
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
  const sideBlogs = blogs.slice(1); // Show all remaining blogs in the scrollable panel

  return (
    <section className="w-full py-20 bg-white border-b border-slate-200">
      <style>{`
        .blog-scroll-container::-webkit-scrollbar {
          width: 5px;
        }
        .blog-scroll-container::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        .blog-scroll-container::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 0px;
        }
        .blog-scroll-container::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: One Large Main Featured Blog Post */}
          <div className="lg:col-span-7 flex flex-col h-full">
            {featuredBlog && (
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col bg-white border border-slate-200 rounded-none overflow-hidden hover:shadow-md transition-shadow duration-300 group"
              >
                {/* Large Thumbnail */}
                <Link to={`/blogs/${featuredBlog.slug}`} className="aspect-[1.8] relative overflow-hidden bg-slate-100 block rounded-none">
                  {featuredBlog.coverImage ? (
                    <img
                      src={imageUrl(featuredBlog.coverImage, { width: 800 })}
                      alt={featuredBlog?.title || "Featured Blog Article"}
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
                <div className="p-6 flex flex-col justify-between rounded-none min-h-[220px]">
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

          {/* Right Column: Other Blog Posts in a Scrollable Panel */}
          <div className="lg:col-span-5 flex flex-col gap-4 overflow-y-auto max-h-[550px] pr-2 blog-scroll-container">
            {sideBlogs.length > 0 ? (
              sideBlogs.map((blog, idx) => (
                <motion.article
                  key={blog.id || blog._id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + idx * 0.05, duration: 0.4 }}
                  className="flex flex-col sm:flex-row bg-white border border-slate-200 rounded-none overflow-hidden hover:shadow-md transition-shadow duration-300 group h-auto sm:h-32 shrink-0"
                >
                  {/* Small Thumbnail */}
                  <Link to={`/blogs/${blog.slug}`} className="w-full sm:w-32 aspect-[1.7] sm:aspect-square relative overflow-hidden bg-slate-100 block shrink-0 rounded-none">
                    {blog.coverImage ? (
                      <img
                        src={imageUrl(blog.coverImage, { width: 400 })}
                        alt={blog?.title || "Blog Article"}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 rounded-none"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-150 text-slate-400 font-black uppercase text-[10px] rounded-none">
                        ZARKO
                      </div>
                    )}
                  </Link>

                  {/* Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between rounded-none min-w-0">
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-bold text-indigo-600 uppercase tracking-widest block">
                        {new Date(blog.createdAt || blog.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                      <Link to={`/blogs/${blog.slug}`}>
                        <h3 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase leading-snug tracking-tight line-clamp-2 rounded-none" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          {blog.title}
                        </h3>
                      </Link>
                    </div>

                    <div className="pt-2 mt-2 border-t border-slate-100 flex justify-between items-center">
                      <Link
                        to={`/blogs/${blog.slug}`}
                        className="inline-flex items-center gap-1.5 text-[9px] font-bold text-slate-900 hover:text-indigo-600 transition-colors uppercase"
                      >
                        Read Article <span>→</span>
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 border border-dashed border-slate-200 text-slate-400 text-xs font-semibold uppercase tracking-wider rounded-none">
                More Articles Coming Soon
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
