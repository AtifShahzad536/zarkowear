import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getBlogs, imageUrl } from '../services/api';
import SeoHead from '../components/SeoHead';
import { motion } from 'framer-motion';
import { FaSearch, FaCalendarAlt, FaUser, FaTags, FaArrowRight } from 'react-icons/fa';

export default function Blogs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  // Sync state with URL params
  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
  }, [searchParams]);

  useEffect(() => {
    let active = true;
    const fetchBlogList = async () => {
      try {
        setLoading(true);
        const q = searchParams.get('q') || '';
        const data = await getBlogs(q);
        if (active) {
          setBlogs(data);
          setError('');
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Failed to fetch blogs');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchBlogList();
    return () => { active = false; };
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    } else {
      setSearchParams({});
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchParams({});
  };

  return (
    <>
      <SeoHead
        title="Zarko Wear Blogs | Sports & Teamwear Styling Guides"
        description="Explore the latest sports styling guides, sportswear technology, fabric customization tips, and team uniform trends from Zarko Sportswear."
        keywords="sportswear blog, custom uniforms guide, jersey customization tips, sialkot sports factory, zarko wear blogs"
      />

      <main className="min-h-screen bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-[94%] px-6">
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl font-black text-indigo-950 uppercase tracking-tight mb-4"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Zarko Wear <span className="text-indigo-600">Blogs & Stories</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-slate-600 font-medium text-base sm:text-lg leading-relaxed"
            >
              Learn about premium sportswear materials, manufacturing secrets, custom uniform design tips, and global athletic styling trends.
            </motion.p>
          </div>

          {/* Search bar */}
          <div className="max-w-xl mx-auto mb-16">
            <form onSubmit={handleSearchSubmit} className="relative flex shadow-md rounded-2xl overflow-hidden bg-white border border-indigo-100/80 focus-within:border-indigo-400 transition-colors">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search blogs by title, keywords or tags..."
                className="w-full pl-6 pr-12 py-4 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center transition-colors"
                aria-label="Search"
              >
                <FaSearch size={14} />
              </button>
            </form>
            {searchParams.get('q') && (
              <div className="text-center mt-4">
                <span className="text-xs font-semibold text-slate-500">
                  Showing results for "{searchParams.get('q')}"
                </span>
                <button
                  onClick={clearSearch}
                  className="ml-2 text-xs font-bold text-indigo-600 hover:underline"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>

          {/* Blogs Grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-slate-500 font-semibold text-sm">Loading blogs...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-red-100 p-8 max-w-lg mx-auto shadow-sm">
              <p className="text-red-500 font-bold mb-2">Error loading posts</p>
              <p className="text-slate-600 text-sm mb-4">{error}</p>
              <button
                onClick={() => setSearchParams(searchParams)}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition"
              >
                Try Again
              </button>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-indigo-50/50 p-8 max-w-lg mx-auto shadow-sm">
              <p className="text-indigo-950 font-black text-lg mb-2">No Blog Posts Found</p>
              <p className="text-slate-500 text-sm mb-6">We couldn't find any articles matching your search criteria. Try using different keywords.</p>
              <button
                onClick={clearSearch}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition"
              >
                View All Blogs
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {blogs.map((blog, idx) => (
                <motion.article
                  key={blog._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                  className="flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-indigo-100 hover:shadow-[0_20px_40px_rgba(79,70,229,0.06)] transition-all duration-300 group h-full"
                >
                  <Link to={`/blogs/${blog.slug}`} className="block overflow-hidden relative aspect-video bg-indigo-50">
                    {blog.coverImage ? (
                      <img
                        src={imageUrl(blog.coverImage, { width: 600 })}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-indigo-900/5 text-indigo-400 font-extrabold text-xs tracking-widest uppercase">
                        Zarko Wear
                      </div>
                    )}
                  </Link>

                  <div className="flex-1 p-6 sm:p-8 flex flex-col">
                    {/* Meta info */}
                    <div className="flex flex-wrap items-center gap-4 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-4">
                      <span className="flex items-center gap-1.5">
                        <FaCalendarAlt size={10} className="text-indigo-500" />
                        {new Date(blog.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                      <span className="h-3 w-px bg-slate-200" />
                      <span className="flex items-center gap-1.5">
                        <FaUser size={10} className="text-indigo-500" />
                        {blog.author}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg sm:text-xl font-bold text-indigo-950 group-hover:text-indigo-600 transition-colors mb-3 leading-snug line-clamp-2">
                      <Link to={`/blogs/${blog.slug}`}>{blog.title}</Link>
                    </h2>

                    {/* Excerpt */}
                    <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed mb-6 line-clamp-3">
                      {blog.excerpt}
                    </p>

                    {/* Tags & Action */}
                    <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                        {blog.tags && blog.tags.slice(0, 2).map((tag, tIdx) => (
                          <span key={tIdx} className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link
                        to={`/blogs/${blog.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex-shrink-0 group/link"
                      >
                        <span>Read</span>
                        <FaArrowRight size={10} className="transition-transform group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
