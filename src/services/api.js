const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

// Auth token helpers
const TOKEN_KEY = 'wc_admin_token';
export function setAuthToken(token) { try { localStorage.setItem(TOKEN_KEY, token || ''); } catch {} }
export function getAuthToken() { try { return localStorage.getItem(TOKEN_KEY) || ''; } catch { return ''; } }

export async function getCategory(slug) {
  const res = await fetch(`${API_BASE}/api/category/${encodeURIComponent(slug)}`);
  if (!res.ok) throw new Error(`Failed to load category ${slug}`);
  return res.json();
}

// Admin: list uploaded files
export async function adminListUploads() {
  const res = await fetch(`${API_BASE}/api/admin/uploads`, { headers: { Authorization: `Bearer ${getAuthToken()}` }});
  if (!res.ok) throw new Error('Failed to list uploads');
  return res.json();
}

// Admin: home settings
export async function adminGetHome() {
  const res = await fetch(`${API_BASE}/api/admin/home`, { headers: { Authorization: `Bearer ${getAuthToken()}` }});
  if (!res.ok) throw new Error('Failed to load home settings');
  return res.json();
}

export async function adminUpdateHome(payload) {
  const res = await fetch(`${API_BASE}/api/admin/home`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to update home settings');
  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${API_BASE}/api/categories`);
  if (!res.ok) throw new Error('Failed to load categories');
  return res.json();
}

export async function getHome() {
  const res = await fetch(`${API_BASE}/api/home`);
  if (!res.ok) throw new Error('Failed to load home');
  return res.json();
}

// Public home settings (heroImages, testimonials, partners, valueProps, topSelling)
export async function getHomeSettings() {
  const res = await fetch(`${API_BASE}/api/home/settings`);
  if (!res.ok) throw new Error('Failed to load home settings');
  return res.json();
}

// Public: Top Selling from Home settings
export async function getTopSelling() {
  const res = await fetch(`${API_BASE}/api/home/topSelling`);
  if (!res.ok) throw new Error('Failed to load top selling');
  return res.json(); // { topSelling: [...] }
}

export async function getProduct(id) {
  const res = await fetch(`${API_BASE}/api/product/${encodeURIComponent(id)}`);
  if (!res.ok) throw new Error(`Failed to load product ${id}`);
  return res.json();
}

// List products under a specific category (public)
export async function getCategoryProducts(slug) {
  const res = await fetch(`${API_BASE}/api/${encodeURIComponent(slug)}/products`);
  if (!res.ok) throw new Error(`Failed to load products for ${slug}`);
  return res.json();
}

// Admin APIs (optional usage in admin UI)
export async function adminListCategories() {
  const res = await fetch(`${API_BASE}/api/admin/categories`, { headers: { Authorization: `Bearer ${getAuthToken()}` }});
  if (!res.ok) throw new Error('Failed to list admin categories');
  return res.json();
}

export async function adminCreateProduct(slug, { id, name, image = '', description = '' }) {
  const res = await fetch(`${API_BASE}/api/admin/categories/${encodeURIComponent(slug)}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` },
    body: JSON.stringify({ id, name, image, description })
  });
  if (!res.ok) throw new Error('Failed to create product');
  return res.json();
}

export async function adminUpdateProduct(slug, id, patch) {
  const res = await fetch(`${API_BASE}/api/admin/categories/${encodeURIComponent(slug)}/products/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` },
    body: JSON.stringify(patch)
  });
  if (!res.ok) throw new Error('Failed to update product');
  return res.json();
}

export async function adminDeleteProduct(slug, id) {
  const res = await fetch(`${API_BASE}/api/admin/categories/${encodeURIComponent(slug)}/products/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getAuthToken()}` }
  });
  if (!res.ok) throw new Error('Failed to delete product');
  return res.json();
}

export async function adminUploadFile(file) {
  const form = new FormData();
  form.append('file', file);
  const res = await fetch(`${API_BASE}/api/admin/upload`, { method: 'POST', headers: { Authorization: `Bearer ${getAuthToken()}` }, body: form });
  if (!res.ok) throw new Error('Upload failed');
  return res.json();
}

// Auth APIs
export async function adminLogin({ email, password }) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  if (data?.token) setAuthToken(data.token);
  return data;
}

// Convert backend-relative image paths to absolute URLs for the frontend origin
export function imageUrl(path) {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path; // already absolute
  let p = String(path).replace(/\\/g, '/');
  if (p[0] !== '/') p = '/' + p;
  // Only prefix backend origin for known upload paths
  if (p.startsWith('/uploads/') || p.startsWith('/service/uploads/')) {
    return `${API_BASE}${p}`;
  }
  // Otherwise, treat as frontend public asset path
  return p;
}
