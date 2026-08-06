import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getBlogs, imageUrl } from '../services/api';
import SeoHead from '../components/SeoHead';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function Blogs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [email, setEmail] = useState('');

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

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing to our newsletter!', { icon: '✉️' });
      setEmail('');
    }
  };

  // Get recent 3 posts
  const recentPosts = blogs.slice(0, 3);

  // Categories list
  const categoriesList = [
    { name: 'Football', slug: 'football' },
    { name: 'Cricket', slug: 'cricket' },
    { name: 'Fitness', slug: 'gym' },
    { name: 'Sports', slug: 'wrestling' }
  ];

  return (
    <>
      <SeoHead
        title="Zarko Wear Blog | Sportswear Styling & Customization Guides"
        description="Explore the latest sports styling guides, sportswear technology, fabric customization tips, and team uniform trends from Zarko Sportswear."
        keywords="sportswear blog, custom uniforms guide, jersey customization tips, sialkot sports factory, zarko wear blogs"
      />

      {/* Main Wrapper with blurred sports stadium background */}
      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed relative py-12 sm:py-16"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.94), rgba(248, 250, 252, 0.96)), url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1600&auto=format&fit=crop')`
        }}
      >
        <div className="mx-auto max-w-[94%] px-4 sm:px-6 space-y-10">
          
          {/* Header Banner & Search Section */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-white/70 backdrop-blur-md rounded-[2.5rem] p-6 lg:p-8 border border-white/50 shadow-sm relative overflow-hidden">
            {/* Athletic Stripes & Gears Accent Background */}
            <div className="absolute inset-y-0 left-0 w-1/3 pointer-events-none overflow-hidden hidden md:block">
              {/* Red stripe */}
              <div 
                className="absolute top-[-100px] left-[-50px] w-[50px] h-[400px] bg-red-650 rotate-[25deg]"
                style={{ backgroundColor: '#D92D20' }}
              />
              {/* Blue stripe */}
              <div 
                className="absolute top-[-100px] left-[20px] w-[50px] h-[400px] bg-indigo-750 rotate-[25deg]"
                style={{ backgroundColor: '#1D4ED8' }}
              />
              
              {/* Gears outlines */}
              <svg className="absolute left-[80px] top-[15px] text-slate-350 opacity-20 w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h1.592c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-1.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.43l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 0 1 0-.255c.007-.378-.138-.75-.43-.991l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              <svg className="absolute left-[15px] top-[80px] text-slate-350 opacity-20 w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h1.592c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-1.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.43l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 0 1 0-.255c.007-.378-.138-.75-.43-.991l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </div>

            {/* Title / Logo banner */}
            <div className="z-10 pl-0 md:pl-28 flex flex-col items-center md:items-start text-center md:text-left">
              <h1 
                className="text-5xl sm:text-6xl font-black italic tracking-tight text-indigo-950 uppercase"
                style={{ fontFamily: "'Outfit', sans-serif", color: '#0F172A' }}
              >
                BLOG
              </h1>
            </div>

            {/* Search Input Box */}
            <form onSubmit={handleSearchSubmit} className="z-10 w-full lg:max-w-xl flex items-center bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm focus-within:border-indigo-500 transition-colors">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for articles, fabrics, or sports..."
                className="w-full px-5 py-3.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-indigo-950 hover:bg-indigo-900 text-white flex items-center justify-center transition-colors border-l border-slate-200"
                style={{ backgroundColor: '#0F172A' }}
                aria-label="Search"
              >
                <FaSearch size={14} />
              </button>
            </form>
          </div>

          {/* Two-Column Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Side: Blog List Card Grid (8 Cols) */}
            <div className="lg:col-span-8 space-y-8">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white/50 backdrop-blur rounded-[2rem] border border-slate-100">
                  <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-slate-500 font-semibold text-sm">Loading blogs...</p>
                </div>
              ) : error ? (
                <div className="text-center py-16 bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
                  <p className="text-red-500 font-bold mb-2">Error loading posts</p>
                  <p className="text-slate-600 text-sm mb-4">{error}</p>
                  <button
                    onClick={() => setSearchParams(searchParams)}
                    className="px-5 py-2.5 bg-indigo-650 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition"
                    style={{ backgroundColor: '#0F172A' }}
                  >
                    Try Again
                  </button>
                </div>
              ) : blogs.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
                  <p className="text-indigo-950 font-black text-lg mb-2">No Blog Posts Found</p>
                  <p className="text-slate-500 text-sm mb-6">We couldn't find any articles matching your search criteria. Try using different keywords.</p>
                  <button
                    onClick={() => { setSearchQuery(''); setSearchParams({}); }}
                    className="px-5 py-2.5 bg-indigo-650 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition"
                    style={{ backgroundColor: '#0F172A' }}
                  >
                    View All Blogs
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogs.map((blog, idx) => (
                    <motion.article
                      key={blog._id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05, duration: 0.35 }}
                      className="flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition duration-300 h-full"
                    >
                      <Link to={`/blogs/${blog.slug}`} className="block overflow-hidden relative aspect-[4/3] bg-indigo-50">
                        {blog.coverImage ? (
                          <img
                            src={imageUrl(blog.coverImage, { width: 500 })}
                            alt={blog.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-103"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400 font-extrabold text-[10px] tracking-wider uppercase">
                            Zarko Wear
                          </div>
                        )}
                      </Link>

                      <div className="flex-1 p-5 flex flex-col justify-between">
                        <div>
                          {/* Tag & Date row */}
                          <div className="flex items-center justify-between text-[11px] font-bold text-slate-450 mb-3.5">
                            <span className="bg-slate-100 text-slate-655 px-2.5 py-0.5 rounded-lg">
                              {blog.tags && blog.tags.length > 0 ? blog.tags[0] : 'Sportswear'}
                            </span>
                            <span>
                              {new Date(blog.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}
                            </span>
                          </div>

                          {/* Title */}
                          <h2 className="text-[14px] font-bold text-slate-900 leading-tight mb-2 hover:text-indigo-650 transition-colors">
                            <Link to={`/blogs/${blog.slug}`}>{blog.title}</Link>
                          </h2>

                          {/* Excerpt */}
                          <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 mb-4 font-medium">
                            {blog.excerpt}
                          </p>
                        </div>

                        {/* Read More button */}
                        <div>
                          <Link
                            to={`/blogs/${blog.slug}`}
                            className="inline-block px-4 py-2 border border-slate-200 text-[11px] font-bold text-slate-700 rounded-lg hover:bg-slate-50 hover:border-slate-350 transition-colors"
                          >
                            Read More
                          </Link>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}
            </div>

            {/* Right Side: Sidebar Cards (4 Cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Categories Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Categories</h3>
                <ul className="divide-y divide-slate-100 text-xs font-bold text-slate-600 space-y-1">
                  {categoriesList.map((cat, idx) => (
                    <li key={idx} className="pt-2.5 pb-2.5 first:pt-0">
                      <Link to={`/blogs?q=${cat.name}`} className="hover:text-indigo-600 transition-colors block">
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent Posts Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Recent Posts</h3>
                <ul className="divide-y divide-slate-100 text-xs font-bold text-slate-600 space-y-1">
                  {loading ? (
                    <li className="py-2.5 text-slate-450 font-normal">Loading recent...</li>
                  ) : recentPosts.length === 0 ? (
                    <li className="py-2.5 text-slate-450 font-normal">No recent posts.</li>
                  ) : (
                    recentPosts.map((blog, idx) => (
                      <li key={idx} className="pt-2.5 pb-2.5 first:pt-0">
                        <Link to={`/blogs/${blog.slug}`} className="hover:text-indigo-600 transition-colors block leading-tight">
                          {blog.title}
                        </Link>
                      </li>
                    ))
                  )}
                </ul>
              </div>

              {/* Email Newsletter Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Email Newsletter</h3>
                <p className="text-xs text-slate-450 font-medium leading-relaxed">
                  Signup up for emails to styling your email addresss.
                </p>
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-indigo-400"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 bg-indigo-950 hover:bg-indigo-900 text-white text-xs font-black uppercase tracking-wider rounded-xl transition shadow-sm"
                    style={{ backgroundColor: '#0F172A' }}
                  >
                    Sign Up
                  </button>
                </form>
              </div>

              {/* ZARKO Sitemap Links */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-950 uppercase tracking-wider" style={{ fontFamily: "'Outfit', sans-serif" }}>ZARKO</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px] font-bold text-slate-500">
                  <Link to="/" className="hover:text-indigo-650 transition">Sitemap</Link>
                  <Link to="/" className="hover:text-indigo-650 transition">Sitemap</Link>
                  <Link to="/about" className="hover:text-indigo-650 transition">About</Link>
                  <Link to="/cricket" className="hover:text-indigo-650 transition">Cricket</Link>
                  <Link to="/blogs" className="hover:text-indigo-650 transition">Recent</Link>
                  <Link to="/categories" className="hover:text-indigo-650 transition">Categories</Link>
                  <Link to="/custom" className="hover:text-indigo-650 transition">Custom</Link>
                  <Link to="/blogs" className="hover:text-indigo-650 transition">Sitemap</Link>
                  <Link to="/about" className="hover:text-indigo-650 transition">About</Link>
                  <Link to="/privacy-policy" className="hover:text-indigo-650 transition">Privacy Policy</Link>
                  <Link to="/contact" className="hover:text-indigo-650 transition">Contact</Link>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}
