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

  const recentPosts = blogs.slice(0, 3);

  const categoriesList = [
    { name: 'Football', slug: 'football' },
    { name: 'Cricket', slug: 'cricket' },
    { name: 'Fitness', slug: 'gym' },
    { name: 'Sports', slug: 'wrestling' }
  ];

  return (
    <>
      <SeoHead
        title="Custom Sportswear Blog & Uniform Guides | Zarko Sportswear"
        description="Read expert sportswear manufacturing guides, sublimation jersey design tips, fabric comparisons, and team uniform care tutorials from Zarko Sportswear USA."
        canonical="https://www.zarkosportswear.com/blogs"
        keywords="sportswear blog, custom uniforms guide, jersey customization tips, sialkot sports factory, zarko wear blogs"
      />

      {/* Main Wrapper with sports stadium background overlay */}
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed relative py-8 md:py-12"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.90), rgba(248, 250, 252, 0.92)), url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1600&auto=format&fit=crop')`
        }}
      >
        <div className="mx-auto max-w-[94%] px-2 sm:px-4 space-y-8">

          {/* Header Banner Section - Completely flat corners */}
          <div className="bg-white rounded-none border border-slate-200/80 shadow-sm relative overflow-hidden h-[120px] sm:h-[150px] flex items-center justify-between px-6 sm:px-12">

            {/* Left side: Red and Blue stripes and Gear design - Flat corners */}
            <div className="absolute inset-y-0 left-0 w-2/3 pointer-events-none overflow-hidden rounded-none">
              {/* Red Diagonal Stripe */}
              <div
                className="absolute top-[-50px] left-[-30px] w-[50px] sm:w-[70px] h-[300px] -rotate-[45deg] rounded-none"
                style={{ backgroundColor: '#dc2626' }}
              />
              {/* White spacer */}
              <div
                className="absolute top-[-50px] left-[15px] sm:left-[35px] w-[15px] h-[300px] -rotate-[45deg] bg-white rounded-none"
              />
              {/* Blue Diagonal Stripe */}
              <div
                className="absolute top-[-50px] left-[30px] sm:left-[50px] w-[50px] sm:w-[70px] h-[300px] -rotate-[45deg] rounded-none"
                style={{ backgroundColor: '#2563eb' }}
              />

              {/* Gear Icons Overlay - Flat */}
              {/* Gear 1 (Blue/grey top left) */}
              <svg className="absolute left-[5px] sm:left-[10px] top-[10px] sm:top-[20px] text-slate-400 opacity-60 w-12 h-12 sm:w-16 sm:h-16 animate-spin rounded-none" style={{ animationDuration: '20s' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              </svg>
              {/* Gear 2 (Red bottom left) */}
              <svg className="absolute left-[70px] sm:left-[95px] bottom-[5px] sm:bottom-[10px] text-red-500 opacity-60 w-10 h-10 sm:w-12 sm:h-12 animate-spin rounded-none" style={{ animationDuration: '15s', animationDirection: 'reverse' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              </svg>
            </div>

            {/* Title: BLOG */}
            <div className="z-10 pl-[80px] sm:pl-[160px] rounded-none">
              <h1
                className="text-4xl sm:text-6xl font-black italic tracking-wider text-slate-800 rounded-none"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  color: '#1e293b',
                  textShadow: '2px 2px 0px #fff, -2px -2px 0px #fff, 2px -2px 0px #fff, -2px 2px 0px #fff'
                }}
              >
                BLOG
              </h1>
            </div>

            {/* Search Input Box - Flat corners */}
            <form onSubmit={handleSearchSubmit} className="z-10 hidden md:flex items-center bg-white rounded-none border border-slate-200 shadow-sm w-[40%] max-w-md overflow-hidden">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for articles, fabrics, or sports..."
                className="w-full px-4 py-2.5 text-xs font-semibold text-slate-700 placeholder-slate-400 focus:outline-none bg-transparent rounded-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 text-white flex items-center justify-center transition-colors rounded-none"
                style={{ backgroundColor: '#102A43' }}
                aria-label="Search"
              >
                <FaSearch size={12} />
              </button>
            </form>
          </div>

          {/* Mobile Search Bar - Flat corners */}
          <form onSubmit={handleSearchSubmit} className="md:hidden flex items-center bg-white rounded-none border border-slate-200 shadow-sm w-full overflow-hidden">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for articles, fabrics, or sports..."
              className="w-full px-4 py-3 text-xs font-semibold text-slate-700 placeholder-slate-400 focus:outline-none rounded-none"
            />
            <button
              type="submit"
              className="px-5 py-3 text-white flex items-center justify-center rounded-none"
              style={{ backgroundColor: '#102A43' }}
            >
              <FaSearch size={12} />
            </button>
          </form>

          {/* Main Grid Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start rounded-none">

            {/* Left Side: Blog Post Cards Grid (8 columns) - Flat corners */}
            <div className="lg:col-span-8 space-y-6 rounded-none">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-none border border-slate-200/80 shadow-sm">
                  <div className="w-8 h-8 border-4 border-slate-800 border-t-transparent rounded-full animate-spin mb-3"></div>
                  <p className="text-slate-500 font-semibold text-xs">Loading articles...</p>
                </div>
              ) : error ? (
                <div className="text-center py-16 bg-white rounded-none border border-slate-200/80 p-6 shadow-sm">
                  <p className="text-red-500 font-bold mb-2">Error loading posts</p>
                  <p className="text-slate-655 text-xs mb-4">{error}</p>
                  <button
                    onClick={() => setSearchParams(searchParams)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-none transition"
                  >
                    Try Again
                  </button>
                </div>
              ) : blogs.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-none border border-slate-200/80 p-8 shadow-sm">
                  <p className="text-slate-800 font-bold text-base mb-2">No Blog Posts Found</p>
                  <p className="text-slate-500 text-xs mb-6">We couldn't find any articles matching your search criteria. Try using different keywords.</p>
                  <button
                    onClick={() => { setSearchQuery(''); setSearchParams({}); }}
                    className="px-4 py-2 text-white text-xs font-bold rounded-none transition"
                    style={{ backgroundColor: '#102A43' }}
                  >
                    View All Blogs
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 rounded-none">
                  {blogs.map((blog) => (
                    <article
                      key={blog._id}
                      className="flex flex-col bg-white rounded-none border border-slate-200/80 shadow-sm hover:shadow-md transition duration-300 h-full"
                    >
                      {/* Card Image - Flat corners */}
                      <Link to={`/blogs/${blog.slug}`} className="block overflow-hidden relative aspect-[1.5] bg-slate-100 rounded-none">
                        {blog.coverImage ? (
                          <img
                            src={imageUrl(blog.coverImage, { width: 500 })}
                            alt={blog.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-103 rounded-none"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400 font-bold text-[10px] tracking-wider uppercase rounded-none">
                            Zarko Sportswear
                          </div>
                        )}
                      </Link>

                      {/* Card Content - Flat corners */}
                      <div className="flex-1 p-4 flex flex-col justify-between rounded-none">
                        <div>
                          {/* Tag & Date row - Flat corners */}
                          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-3 rounded-none">
                            <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded-none">
                              {blog.tags && blog.tags.length > 0 ? blog.tags[0] : 'Sportswear'}
                            </span>
                            <span>
                              {new Date(blog.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}
                            </span>
                          </div>

                          {/* Title */}
                          <h2 className="text-xs sm:text-[13px] font-bold text-slate-900 leading-tight mb-2 hover:text-indigo-650 transition-colors rounded-none">
                            <Link to={`/blogs/${blog.slug}`}>{blog.title}</Link>
                          </h2>

                          {/* Excerpt */}
                          <p className="text-slate-550 text-[11px] leading-relaxed line-clamp-3 mb-4 font-normal rounded-none">
                            {blog.excerpt}
                          </p>
                        </div>

                        {/* Read More Button - Flat corners */}
                        <div>
                          <Link
                            to={`/blogs/${blog.slug}`}
                            className="inline-block px-3 py-1.5 border border-slate-200 text-[10px] font-bold text-slate-700 rounded-none hover:bg-slate-50 transition-colors"
                          >
                            Read More
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            {/* Right Side: Sidebar Cards (4 columns) - Flat corners & Sticky */}
            <div className="lg:col-span-4 space-y-5 rounded-none lg:sticky lg:top-24">

              {/* Categories Card - Flat */}
              <div className="bg-white rounded-none p-5 border border-slate-200/80 shadow-sm space-y-3">
                <h3 className="text-[11px] font-extrabold text-slate-900 uppercase tracking-wider rounded-none">Categories</h3>
                <ul className="divide-y divide-slate-100 text-[11px] font-bold text-slate-600 space-y-1 rounded-none">
                  {categoriesList.map((cat, idx) => (
                    <li key={idx} className="pt-2.5 pb-2.5 first:pt-0 rounded-none">
                      <Link to={`/blogs?q=${cat.name}`} className="hover:text-indigo-655 transition-colors block rounded-none">
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent Posts Card - Flat */}
              <div className="bg-white rounded-none p-5 border border-slate-200/80 shadow-sm space-y-3">
                <h3 className="text-[11px] font-extrabold text-slate-900 uppercase tracking-wider rounded-none">Recent Posts</h3>
                <ul className="divide-y divide-slate-100 text-[11px] font-bold text-slate-600 space-y-1 rounded-none">
                  {loading ? (
                    <li className="py-2.5 text-slate-400 font-normal rounded-none">Loading recent...</li>
                  ) : recentPosts.length === 0 ? (
                    <li className="py-2.5 text-slate-400 font-normal rounded-none">No recent posts.</li>
                  ) : (
                    recentPosts.map((blog, idx) => (
                      <li key={idx} className="pt-2.5 pb-2.5 first:pt-0 rounded-none">
                        <Link to={`/blogs/${blog.slug}`} className="hover:text-indigo-655 transition-colors block leading-tight rounded-none">
                          {blog.title}
                        </Link>
                      </li>
                    ))
                  )}
                </ul>
              </div>



              {/* ZARKO Quick Links - Flat */}
              <div className="bg-white rounded-none p-5 border border-slate-200/80 shadow-sm space-y-3">
                <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-wider rounded-none" style={{ fontFamily: "'Outfit', sans-serif" }}>ZARKO</h3>
                <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-[10px] font-bold text-slate-500 rounded-none">
                  <Link to="/" className="hover:text-indigo-650 transition rounded-none">Home</Link>
                  <Link to="/about" className="hover:text-indigo-650 transition rounded-none">About</Link>
                  <Link to="/builder" className="hover:text-indigo-650 transition rounded-none">3D Builder</Link>
                  <Link to="/custom" className="hover:text-indigo-650 transition rounded-none">Custom Orders</Link>
                  <Link to="/football" className="hover:text-indigo-650 transition rounded-none">Football</Link>
                  <Link to="/cricket" className="hover:text-indigo-650 transition rounded-none">Cricket</Link>
                  <Link to="/wrestling" className="hover:text-indigo-650 transition rounded-none">Wrestling</Link>
                  <Link to="/baseball" className="hover:text-indigo-650 transition rounded-none">Baseball</Link>
                  <Link to="/privacy-policy" className="hover:text-indigo-650 transition rounded-none">Privacy Policy</Link>
                  <Link to="/terms" className="hover:text-indigo-650 transition rounded-none">Terms</Link>
                  <Link to="/contact" className="hover:text-indigo-650 transition rounded-none">Contact</Link>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}
