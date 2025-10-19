import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../services/api';
import {
  adminListCategories,
  adminCreateProduct,
  adminUpdateProduct,
  adminDeleteProduct,
  adminUploadFile,
} from '../services/api';

export default function Admin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState('');
  const [products, setProducts] = useState([]);

  // product form state
  const [form, setForm] = useState({ id: '', name: '', image: '', description: '' });

  const selectedCategory = useMemo(
    () => categories.find((c) => c.slug === selectedSlug),
    [categories, selectedSlug]
  );

  useEffect(() => {
    // auth guard for this page if accessed directly
    const tok = getAuthToken();
    if (!tok) {
      navigate('/admin/login', { replace: true, state: { from: '/admin' } });
      return;
    }
    let alive = true;
    setLoading(true);
    adminListCategories()
      .then((list) => {
        if (!alive) return;
        // list contains full Category documents with products
        setCategories(list);
        if (list.length && !selectedSlug) setSelectedSlug(list[0].slug);
      })
      .catch((e) => alive && setError(e.message || 'Failed to load'))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!selectedCategory) return setProducts([]);
    setProducts(selectedCategory.products || []);
  }, [selectedCategory]);

  async function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setLoading(true);
      const res = await adminUploadFile(file);
      setForm((f) => ({ ...f, image: res.url }));
    } catch (e) {
      setError(e.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateProduct(e) {
    e.preventDefault();
    if (!selectedSlug) return;
    try {
      setLoading(true);
      await adminCreateProduct(selectedSlug, form);
      // refresh categories
      const list = await adminListCategories();
      setCategories(list);
      setForm({ id: '', name: '', image: '', description: '' });
    } catch (e) {
      setError(e.message || 'Create failed');
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteProduct(id) {
    if (!selectedSlug) return;
    try {
      setLoading(true);
      await adminDeleteProduct(selectedSlug, id);
      const list = await adminListCategories();
      setCategories(list);
    } catch (e) {
      setError(e.message || 'Delete failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Admin</h1>

      {loading && <div className="mb-4 text-sm text-gray-500">Working...</div>}
      {error && (
        <div className="mb-4 p-3 rounded bg-rose-50 text-rose-700 border border-rose-200">{error}</div>
      )}

      {/* Category selector */}
      <div className="mb-6 flex gap-3 items-center">
        <label className="text-sm text-gray-600">Category</label>
        <select
          className="border rounded px-3 py-2"
          value={selectedSlug}
          onChange={(e) => setSelectedSlug(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Create product */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Create Product</h2>
        <form onSubmit={handleCreateProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="border rounded px-3 py-2"
            placeholder="ID (unique)"
            value={form.id}
            onChange={(e) => setForm({ ...form, id: e.target.value })}
            required
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
          <input type="file" accept="image/*" onChange={handleUpload} />
          <textarea
            className="border rounded px-3 py-2 md:col-span-2"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <div className="md:col-span-2">
            <button
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
              type="submit"
              disabled={loading}
            >
              Create
            </button>
          </div>
        </form>
      </section>

      {/* Products list */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p.id} className="border rounded p-4 flex flex-col gap-2">
              <div className="font-semibold">{p.name}</div>
              {p.image && (
                <img src={p.image} alt={p.name} className="w-full h-36 object-cover rounded" />
              )}
              <div className="text-sm text-gray-500">ID: {p.id}</div>
              <div className="text-sm text-gray-600 line-clamp-2">{p.description}</div>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleDeleteProduct(p.id)}
                  className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
