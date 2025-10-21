import React from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';

const NotFound = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-white">
      <SeoHead
        title="Page Not Found | Zarko Sportswear"
        description="The page you are looking for could not be found on Zarko Sportswear."
        canonical="https://www.zarkosportswear.com/404"
      />
      <section className="mx-auto flex max-w-4xl flex-col items-center px-6 py-24 text-center">
        <div className="relative">
          <div className="absolute -inset-6 rounded-full bg-indigo-500/10 blur-2xl" />
          <div className="relative inline-flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-xl">
            <span className="text-4xl font-bold text-indigo-600">404</span>
          </div>
        </div>
        <h1 className="mt-10 text-4xl font-bold tracking-tight text-indigo-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 max-w-2xl text-base text-gray-600 sm:text-lg">
          The link you clicked may be broken or the page may have been removed. If you typed the URL, please check that the spelling is correct.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-indigo-500">
            Go back home
          </Link>
          <Link to="/custom" className="inline-flex items-center gap-2 rounded-full border border-indigo-200 px-6 py-3 text-sm font-semibold text-indigo-700 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300">
            Start a custom order
          </Link>
        </div>
        <div className="mt-16 grid gap-6 rounded-3xl border border-indigo-100 bg-white/90 p-8 shadow-lg sm:grid-cols-3">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-500">Contact</p>
            <p className="text-sm text-gray-600">Email us at <a className="text-indigo-600 hover:underline" href="mailto:zarkosportswear@gmail.com">zarkosportswear@gmail.com</a></p>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-500">Call</p>
            <p className="text-sm text-gray-600">+92-303-9200750</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-500">Explore</p>
            <p className="text-sm text-gray-600">Discover our <Link to="/about" className="text-indigo-600 hover:underline">story</Link> or browse <Link to="/football" className="text-indigo-600 hover:underline">top kits</Link>.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
