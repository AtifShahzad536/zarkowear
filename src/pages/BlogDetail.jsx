import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogBySlug, imageUrl } from '../services/api';
import SeoHead from '../components/SeoHead';
import { FaCalendarAlt, FaUser, FaArrowLeft, FaTags, FaPalette, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    const fetchPost = async () => {
      try {
        setLoading(true);
        const data = await getBlogBySlug(slug);
        if (active) {
          setBlog(data);
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

    fetchPost();
    return () => { active = false; };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 py-24">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-semibold text-sm">Loading article...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 py-24 px-6">
        <div className="text-center bg-white rounded-3xl border border-red-100 p-8 max-w-lg shadow-sm">
          <p className="text-red-500 font-bold mb-2">Error</p>
          <p className="text-slate-600 text-sm mb-6">{error || 'Article not found.'}</p>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-2xl transition shadow-md shadow-indigo-600/10"
          >
            <FaArrowLeft size={12} />
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

      <article className="min-h-screen bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6">
          {/* Back button */}
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors mb-8"
          >
            <FaArrowLeft size={12} />
            <span>All Articles</span>
          </Link>

          {/* Cover image */}
          {blog.coverImage && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full aspect-[21/9] rounded-3xl overflow-hidden shadow-sm mb-10 border border-slate-100 bg-indigo-50"
            >
              <img
                src={imageUrl(blog.coverImage, { width: 1200 })}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-black text-indigo-950 leading-tight mb-6"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {blog.title}
            </h1>

            {/* Author and Date Meta */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-wider text-slate-400">
              <span className="flex items-center gap-2">
                <FaCalendarAlt className="text-indigo-500" />
                {new Date(blog.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span className="h-3 w-px bg-slate-200" />
              <span className="flex items-center gap-2">
                <FaUser className="text-indigo-500" />
                By {blog.author}
              </span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-12 shadow-sm mb-12"
          >
            <div
              className="prose prose-indigo max-w-none text-slate-700 font-medium text-sm sm:text-base leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Tags footer */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-10 pt-8 border-t border-slate-100 flex items-center gap-3">
                <FaTags className="text-indigo-400" size={14} />
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* CTA Widget (Convert readers to custom builder) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-gradient-to-r from-indigo-900 to-indigo-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative z-10 space-y-3 max-w-lg text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.25em] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full">
                <FaPalette size={10} />
                <span>3D Jersey Builder</span>
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wide leading-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Ready to customize your own teamwear?
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed">
                Design custom kits online using our live 3D customizer. Choose colors, upload your logos, add numbers, and request a factory quote instantly!
              </p>
            </div>
            <Link
              to="/builder"
              className="relative z-10 inline-flex items-center gap-2 px-6 py-4 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-wider rounded-2xl transition shadow-lg shadow-indigo-600/35 hover:-translate-y-0.5"
            >
              <span>Launch 3D Customizer</span>
              <FaChevronRight size={10} />
            </Link>
          </motion.div>
        </div>
      </article>
    </>
  );
}
