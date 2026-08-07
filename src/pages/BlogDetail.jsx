import React, { useEffect, useState } from 'react';
import { useParams, Link, useSearchParams, useNavigate } from 'react-router-dom';
import { getBlogBySlug, getBlogs, imageUrl } from '../services/api';
import SeoHead from '../components/SeoHead';
import { FaSearch } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function BlogDetail() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    let active = true;
    const fetchPostAndRelated = async () => {
      try {
        setLoading(true);
        const data = await getBlogBySlug(slug);
        const allBlogs = await getBlogs();
        if (active) {
          setBlog(data);
          setBlogs(allBlogs);
          setError('');
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Failed to load article details.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchPostAndRelated();
    return () => { active = false; };
  }, [slug]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/blogs?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing to our newsletter!', { icon: '✉️' });
      setEmail('');
    }
  };

  // Filter out current blog to get related articles
  const relatedArticles = blogs
    .filter(b => b.slug !== slug)
    .slice(0, 3);

  // If no related found, fallback to top 3
  const displayRelated = relatedArticles.length > 0 ? relatedArticles : blogs.slice(0, 3);

  const categoriesList = [
    { name: 'Football', slug: 'football' },
    { name: 'Cricket', slug: 'cricket' },
    { name: 'Fitness', slug: 'gym' },
    { name: 'Sports', slug: 'wrestling' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 py-24 rounded-none">
        <div className="w-8 h-8 border-4 border-slate-800 border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-slate-500 font-semibold text-xs">Loading article...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 py-24 px-6 rounded-none">
        <div className="text-center bg-white rounded-none border border-slate-200/80 p-8 max-w-lg shadow-sm">
          <p className="text-red-500 font-bold mb-2">Error</p>
          <p className="text-slate-600 text-sm mb-6">{error || 'Article not found.'}</p>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white text-xs font-bold rounded-none transition"
          >
            <span>Back to Blogs</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SeoHead
        title={`${blog.title} | Zarko Wear Blog`}
        description={blog.excerpt}
        keywords={blog.tags ? blog.tags.join(', ') : 'zarko wear blog, custom apparel, sports uniforms'}
      />

      {/* Styled rich text styling overlays for Quill HTML */}
      <style>{`
        .blog-content-body h1, .blog-content-body h2, .blog-content-body h3 {
          font-family: 'Poppins', sans-serif;
          font-weight: 800;
          color: #0f172a;
          margin-top: 1.75rem;
          margin-bottom: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.025em;
        }
        .blog-content-body h2 { font-size: 1.15rem; }
        .blog-content-body h3 { font-size: 1rem; }
        .blog-content-body p {
          font-size: 0.8rem;
          line-height: 1.6;
          color: #334155;
          margin-bottom: 1rem;
          font-weight: 500;
        }
        .blog-content-body ul {
          list-style-type: disc;
          list-style-position: outside !important;
          padding-left: 2rem !important;
          margin-top: 0.5rem !important;
          margin-bottom: 1rem !important;
        }
        .blog-content-body ul li {
          display: list-item !important;
          list-style-type: inherit !important;
          margin-bottom: 0.4rem !important;
          padding-left: 0.25rem !important;
          font-size: 0.8rem !important;
          color: #334155 !important;
          font-weight: 500 !important;
        }
        .blog-content-body ol {
          list-style-type: decimal;
          list-style-position: outside !important;
          padding-left: 2rem !important;
          margin-top: 0.5rem !important;
          margin-bottom: 1rem !important;
        }
        .blog-content-body ol li {
          display: list-item !important;
          list-style-type: inherit !important;
          margin-bottom: 0.4rem !important;
          padding-left: 0.25rem !important;
          font-size: 0.8rem !important;
          color: #334155 !important;
          font-weight: 500 !important;
        }
        .blog-content-body img {
          max-width: 100%;
          height: auto;
          display: inline-block;
          margin: 0.5rem 0;
        }
        .blog-content-body .ql-align-center {
          text-align: center;
        }
        .blog-content-body .ql-align-right {
          text-align: right;
        }
        .blog-content-body .ql-align-justify {
          text-align: justify;
        }
        /* Custom image floats to support left side text right side image */
        .blog-content-body img[style*="float: left"], 
        .blog-content-body img[style*="float:left"] {
          margin-right: 1.5rem;
          margin-bottom: 1rem;
          max-width: 45%;
        }
        .blog-content-body img[style*="float: right"], 
        .blog-content-body img[style*="float:right"] {
          margin-left: 1.5rem;
          margin-bottom: 1rem;
          max-width: 45%;
        }
      `}</style>

      {/* Main Wrapper with sports stadium background overlay */}
      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed relative py-8 md:py-12 rounded-none"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.90), rgba(248, 250, 252, 0.92)), url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1600&auto=format&fit=crop')`
        }}
      >
        <div className="mx-auto max-w-[94%] px-2 sm:px-4 space-y-8 rounded-none">
          
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
              
              {/* Gear Icons Overlay */}
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

            {/* Title: BLOG TITLE (Uppercase, italic, precisely styled) */}
            <div className="z-10 pl-[80px] sm:pl-[160px] pr-4 max-w-[50%]">
              <h1 
                className="text-lg sm:text-2xl font-black italic tracking-wide text-slate-800 uppercase line-clamp-2"
                style={{ 
                  fontFamily: "'Poppins', sans-serif", 
                  color: '#1e293b',
                  textShadow: '1px 1px 0px #fff, -1px -1px 0px #fff, 1px -1px 0px #fff, -1px 1px 0px #fff'
                }}
              >
                {blog.title}
              </h1>
            </div>

            {/* Search Input Box */}
            <form onSubmit={handleSearchSubmit} className="z-10 hidden md:flex items-center bg-white rounded-none border border-slate-200 shadow-sm w-[35%] max-w-sm overflow-hidden">
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

          {/* Main Grid Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start rounded-none">
            
            {/* Left Side: Article Body Block (8 columns) - Flat corners */}
            <div className="lg:col-span-8 bg-white border border-slate-200/80 shadow-sm p-5 sm:p-6 rounded-none space-y-6">
              
              {/* Back Button link */}
              <Link to="/blogs" className="inline-block text-[11px] font-bold text-slate-450 hover:text-indigo-650 transition mb-2 uppercase tracking-wider">
                &larr; Back to all blogs
              </Link>

              {/* Cover image */}
              {blog.coverImage && (
                <div className="w-full aspect-[2] overflow-hidden bg-slate-100 border border-slate-200/80 rounded-none">
                  <img
                    src={imageUrl(blog.coverImage, { width: 1200 })}
                    alt={blog.title}
                    className="w-full h-full object-cover rounded-none"
                  />
                </div>
              )}

              {/* Date & Author line */}
              <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 border-b border-slate-100 pb-4 rounded-none">
                <span>
                  {new Date(blog.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
                <span className="h-3 w-px bg-slate-200" />
                <span>By {blog.author}</span>
              </div>

              {/* Main Content Area */}
              <div 
                className="blog-content-body max-w-none rounded-none"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Tags at the bottom */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2 rounded-none">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Tags:</span>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-none uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Side: Sidebar Cards (4 columns) - Flat corners & Sticky */}
            <div className="lg:col-span-4 space-y-5 rounded-none lg:sticky lg:top-24">
              
              {/* Related Articles Card */}
              <div className="bg-white rounded-none p-5 border border-slate-200/80 shadow-sm space-y-3">
                <h3 className="text-[11px] font-extrabold text-slate-900 uppercase tracking-wider rounded-none">Related Articles</h3>
                <ul className="text-[11px] font-bold text-slate-600 space-y-3.5 rounded-none">
                  {displayRelated.map((rel, idx) => (
                    <li key={idx} className="flex gap-3 items-center rounded-none">
                      <Link to={`/blogs/${rel.slug}`} className="w-14 aspect-[1.3] bg-slate-100 overflow-hidden border border-slate-200/80 rounded-none flex-shrink-0">
                        {rel.coverImage ? (
                          <img src={imageUrl(rel.coverImage, { width: 150 })} alt="" className="w-full h-full object-cover rounded-none" />
                        ) : (
                          <div className="w-full h-full bg-slate-200 flex items-center justify-center text-[7px] text-slate-450 font-bold uppercase rounded-none">Zarko</div>
                        )}
                      </Link>
                      <Link to={`/blogs/${rel.slug}`} className="hover:text-indigo-650 transition-colors line-clamp-2 leading-snug rounded-none">
                        {rel.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Categories Card */}
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

              {/* Email Newsletter Card */}
              <div className="bg-white rounded-none p-5 border border-slate-200/80 shadow-sm space-y-3">
                <h3 className="text-[11px] font-extrabold text-slate-900 uppercase tracking-wider rounded-none">Email Newsletter</h3>
                <p className="text-[10px] text-slate-500 font-normal leading-relaxed rounded-none">
                  Signup up for emails to styling your email addresss.
                </p>
                <form onSubmit={handleSubscribe} className="space-y-2.5 rounded-none">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-none text-[11px] font-semibold text-slate-800 focus:outline-none focus:border-indigo-400"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 text-white text-[11px] font-black uppercase tracking-wider rounded-none transition shadow-sm"
                    style={{ backgroundColor: '#102A43' }}
                  >
                    Sign Up
                  </button>
                </form>
              </div>

              {/* ZARKO Sitemap Links */}
              <div className="bg-white rounded-none p-5 border border-slate-200/80 shadow-sm space-y-3">
                <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-wider rounded-none" style={{ fontFamily: "'Outfit', sans-serif" }}>ZARKO</h3>
                <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-[10px] font-bold text-slate-500 rounded-none">
                  <Link to="/" className="hover:text-indigo-655 transition rounded-none">Sitemap</Link>
                  <Link to="/" className="hover:text-indigo-655 transition rounded-none">Sitemap</Link>
                  <Link to="/about" className="hover:text-indigo-655 transition rounded-none">About</Link>
                  <Link to="/blogs?q=cricket" className="hover:text-indigo-655 transition rounded-none">Cricket</Link>
                  <Link to="/blogs" className="hover:text-indigo-655 transition rounded-none">Recent</Link>
                  <Link to="/blogs" className="hover:text-indigo-655 transition rounded-none">Categories</Link>
                  <Link to="/custom" className="hover:text-indigo-655 transition rounded-none">Custom</Link>
                  <Link to="/" className="hover:text-indigo-655 transition rounded-none">Sitemap</Link>
                  <Link to="/about" className="hover:text-indigo-655 transition rounded-none">About</Link>
                  <Link to="/privacy-policy" className="hover:text-indigo-655 transition rounded-none">Privacy Policy</Link>
                  <Link to="/contact" className="hover:text-indigo-655 transition rounded-none">Contact</Link>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}
