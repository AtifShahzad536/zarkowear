import React, { useEffect, useState } from 'react';
import { getBlogs, adminCreateBlog, adminUpdateBlog, adminDeleteBlog, adminUploadFile, imageUrl } from '../services/api';
import toast from 'react-hot-toast';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaUpload, FaCheckCircle, FaFileAlt } from 'react-icons/fa';

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form/Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null); // null means creating new
  const [form, setForm] = useState({
    title: '',
    slug: '',
    coverImage: '',
    excerpt: '',
    content: '',
    author: 'ZarkoWear Admin',
    tags: ''
  });
  
  const [uploadingImage, setUploadingImage] = useState(false);

  // Fetch blogs on mount
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await getBlogs();
      setBlogs(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const openCreateModal = () => {
    setEditingBlog(null);
    setForm({
      title: '',
      slug: '',
      coverImage: '',
      excerpt: '',
      content: '',
      author: 'ZarkoWear Admin',
      tags: ''
    });
    setModalOpen(true);
  };

  const openEditModal = (blog) => {
    setEditingBlog(blog);
    setForm({
      title: blog.title || '',
      slug: blog.slug || '',
      coverImage: blog.coverImage || '',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      author: blog.author || 'ZarkoWear Admin',
      tags: blog.tags ? blog.tags.join(', ') : ''
    });
    setModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      setUploadingImage(true);
      const res = await adminUploadFile(file);
      setForm(prev => ({ ...prev, coverImage: res.url }));
      toast.success('Cover image uploaded successfully!');
    } catch (err) {
      toast.error(err.message || 'Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.content || !form.excerpt) {
      toast.error('Title, Excerpt and Content are required!');
      return;
    }

    const payload = {
      ...form,
      tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : []
    };

    try {
      setLoading(true);
      if (editingBlog) {
        await adminUpdateBlog(editingBlog._id, payload);
        toast.success('Blog post updated successfully!');
      } else {
        await adminCreateBlog(payload);
        toast.success('Blog post created successfully!');
      }
      setModalOpen(false);
      fetchBlogs();
    } catch (err) {
      toast.error(err.message || 'Failed to save blog post');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    try {
      setLoading(true);
      await adminDeleteBlog(id);
      toast.success('Blog post deleted successfully!');
      fetchBlogs();
    } catch (err) {
      toast.error(err.message || 'Failed to delete blog post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-indigo-950 uppercase tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Manage Blogs
          </h1>
          <p className="text-slate-500 text-sm font-semibold">Publish articles, style guides, and team uniform design tips.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-wider rounded-2xl transition shadow-md shadow-indigo-600/20"
        >
          <FaPlus size={12} />
          <span>New Article</span>
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-xs font-semibold">
          {error}
        </div>
      )}

      {/* Blogs Table */}
      {loading && blogs.length === 0 ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
          <FaFileAlt size={40} className="text-indigo-200 mx-auto mb-4" />
          <p className="text-indigo-950 font-bold mb-2">No Articles Found</p>
          <p className="text-slate-500 text-xs mb-6">Create your first blog post to show styling guides to customers.</p>
          <button
            onClick={openCreateModal}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition"
          >
            Create First Post
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-55 border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="p-4 pl-6">Cover</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Author</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-xs font-semibold text-slate-700">
                {blogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="w-16 aspect-video rounded-lg overflow-hidden bg-slate-50 border border-slate-100 flex-shrink-0">
                        {blog.coverImage ? (
                          <img
                            src={imageUrl(blog.coverImage, { width: 150 })}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-slate-200 flex items-center justify-center text-[8px] text-slate-400 font-bold uppercase">No Image</div>
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-bold text-indigo-950 max-w-xs sm:max-w-md truncate">
                      {blog.title}
                    </td>
                    <td className="p-4 text-slate-500">{blog.author}</td>
                    <td className="p-4 text-slate-450">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 pr-6 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(blog)}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition"
                        title="Edit Article"
                      >
                        <FaEdit size={12} />
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(blog._id)}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-650 transition"
                        title="Delete Article"
                      >
                        <FaTrash size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Editor Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-indigo-950/20 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-3xl border border-slate-100 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-base font-black text-indigo-950 uppercase tracking-wider" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {editingBlog ? 'Edit Blog Post' : 'Create Blog Post'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                <FaTimes size={14} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs font-semibold text-slate-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div>
                  <label className="block mb-2 text-slate-500 uppercase tracking-wider text-[10px]">Article Title *</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. The Ultimate Guide to Sublimated Team Jerseys"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block mb-2 text-slate-500 uppercase tracking-wider text-[10px]">URL Slug (Optional)</label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="e.g. guide-to-sublimated-jerseys"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Author */}
                <div>
                  <label className="block mb-2 text-slate-500 uppercase tracking-wider text-[10px]">Author</label>
                  <input
                    type="text"
                    value={form.author}
                    onChange={(e) => setForm(prev => ({ ...prev, author: e.target.value }))}
                    placeholder="ZarkoWear Admin"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block mb-2 text-slate-500 uppercase tracking-wider text-[10px]">Tags (Comma separated)</label>
                  <input
                    type="text"
                    value={form.tags}
                    onChange={(e) => setForm(prev => ({ ...prev, tags: e.target.value }))}
                    placeholder="uniforms, design tips, styling"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Cover Image Upload */}
              <div>
                <label className="block mb-2 text-slate-500 uppercase tracking-wider text-[10px]">Cover Image *</label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <label className="w-full sm:w-auto px-5 py-3 border-2 border-dashed border-indigo-200 rounded-xl flex items-center justify-center gap-2 cursor-pointer bg-indigo-50/20 hover:bg-indigo-50/50 transition-colors text-indigo-650 hover:border-indigo-400">
                    <FaUpload size={12} />
                    <span>Upload Cover Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  {uploadingImage && <div className="text-slate-400 text-[11px] animate-pulse">Uploading to Cloudinary...</div>}
                  {form.coverImage && (
                    <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-250 px-3 py-1.5 rounded-lg text-[11px]">
                      <FaCheckCircle size={12} className="text-emerald-500" />
                      <a href={imageUrl(form.coverImage)} target="_blank" rel="noopener noreferrer" className="underline font-bold truncate max-w-[200px]">
                        View Uploaded Image
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block mb-2 text-slate-500 uppercase tracking-wider text-[10px]">Excerpt (Brief Summary) *</label>
                <textarea
                  required
                  rows={2}
                  value={form.excerpt}
                  onChange={(e) => setForm(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Summarize the article in 2-3 sentences for listing card previews..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block mb-2 text-slate-500 uppercase tracking-wider text-[10px]">Content (HTML Supported) *</label>
                <p className="text-[10px] text-slate-450 mb-2 font-medium">Tip: You can use HTML tags like &lt;h2&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;ul&gt;, &lt;li&gt;, and &lt;a href="..."&gt; to style your blog post nicely.</p>
                <textarea
                  required
                  rows={10}
                  value={form.content}
                  onChange={(e) => setForm(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Write the full body content here..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors font-mono"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-3 border border-slate-200 text-slate-500 rounded-2xl hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || uploadingImage}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl transition disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? 'Saving...' : 'Save Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
