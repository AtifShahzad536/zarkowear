import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { adminLogin } from '../services/api';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/admin/home';

  // show toast on idle logout
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('idle') === '1') {
      setError('You were signed out due to inactivity');
    }
  }, [location.search]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      setLoading(true);
      await adminLogin({ email, password });
      navigate(from, { replace: true });
    } catch (e) {
      setError(e.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[70vh] grid place-items-center p-6">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow p-6 ring-1 ring-gray-200">
        <div className="mb-5 text-center">
          <div className="mx-auto w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xl font-bold">W</div>
          <h1 className="mt-3 text-xl font-semibold">Admin Login</h1>
          <p className="text-sm text-gray-500">Sign in to continue</p>
        </div>
        {error && <div className="mb-3 px-3 py-2 bg-rose-50 text-rose-700 border border-rose-200 rounded text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" required className="mt-1 w-full border rounded-md px-3 py-2" placeholder="admin@example.com" />
          </div>
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" required className="mt-1 w-full border rounded-md px-3 py-2" placeholder="••••••••" />
          </div>
          <button disabled={loading} className="w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">{loading ? 'Signing in…' : 'Sign In'}</button>
        </form>
      </div>
    </main>
  );
}
