import React, { useEffect, useRef } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { setAuthToken } from '../../services/api';

export default function AdminLayout() {
  const navigate = useNavigate();
  const timerRef = useRef(null);
  const IDLE_MS = 1 * 60 * 1000; // 1 minute (test)

  useEffect(() => {
    const reset = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        try { setAuthToken(''); } catch {}
        navigate('/admin/login?idle=1', { replace: true });
      }, IDLE_MS);
    };
    const events = ['mousemove','keydown','click','touchstart','scroll','visibilitychange'];
    events.forEach(ev => window.addEventListener(ev, reset, { passive: true }));
    reset();
    return () => {
      events.forEach(ev => window.removeEventListener(ev, reset));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [navigate]);

  // Clear token only when the page is really being left (tab close/refresh/navigation away from SPA)
  useEffect(() => {
    const clearOnLeave = () => { try { setAuthToken(''); } catch {} };
    window.addEventListener('pagehide', clearOnLeave);
    window.addEventListener('beforeunload', clearOnLeave);
    return () => {
      window.removeEventListener('pagehide', clearOnLeave);
      window.removeEventListener('beforeunload', clearOnLeave);
    };
  }, []);
  const link = ({ isActive }) =>
    `block px-3 py-2 rounded border text-sm ${isActive ? 'bg-black text-white border-black' : 'bg-white hover:bg-gray-50'}`;

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <aside className="md:col-span-3 lg:col-span-2">
          <div className="border rounded-lg p-4 sticky top-4 bg-white">
            <div className="text-lg font-bold mb-3">Admin Panel</div>
            <nav className="flex flex-col gap-2">
              <NavLink to="/admin/home" className={link} end>
                Hero Images
              </NavLink>
              <NavLink to="/admin/testimonials" className={link}>
                Testimonials
              </NavLink>
              <NavLink to="/admin/top-selling" className={link}>
                Top Selling
              </NavLink>
            </nav>
          </div>
        </aside>
        <section className="md:col-span-9 lg:col-span-10">
          <Outlet />
        </section>
      </div>
    </main>
  );
}
