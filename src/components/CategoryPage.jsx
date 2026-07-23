import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategory, imageUrl } from '../services/api';
import ProductCard from './ProductCard';
import Custom from '../pages/Custom';
import CategoryHero from './CategoryHero';
import { categoryConfigs } from '../data/categories';

const normalizeData = (slug) => {
  const config = categoryConfigs[slug];
  if (!config) return null;
  const { name, heroDescription, gradient, accent, featured = {}, products = [] } = config;
  return {
    name,
    description: heroDescription,
    gradient,
    accent,
    featured,
    products,
  };
};

const defaultGradient = 'from-indigo-600 via-indigo-500 to-blue-500';
const defaultAccent = {
  check: 'text-indigo-500',
  chip: 'bg-indigo-100 text-indigo-700',
  button: 'bg-indigo-600 hover:bg-indigo-700',
};

const SectionTitle = ({ eyebrow, title, description }) => (
  <div className="mx-auto max-w-3xl text-center">
    {eyebrow && (
      <span className="inline-flex items-center justify-center rounded-full border border-indigo-200 bg-white/80 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-indigo-500">
        {eyebrow}
      </span>
    )}
    <h2 className="mt-5 text-3xl font-bold tracking-tight text-indigo-950 sm:text-4xl">{title}</h2>
    {description && <p className="mt-3 text-base text-gray-600 sm:text-lg">{description}</p>}
  </div>
);

const CategoryPage = ({ slug }) => {
  const fallbackConfig = useMemo(() => normalizeData(slug), [slug]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getCategory(slug)
      .then((d) => {
        if (!mounted) return;
        setData({
          ...d,
          description: d.description || fallbackConfig?.description || fallbackConfig?.heroDescription,
          gradient: d.gradient || fallbackConfig?.gradient,
          accent: d.accent || fallbackConfig?.accent,
        });
        setError('');
      })
      .catch((e) => {
        if (!mounted) return;
        if (fallbackConfig) {
          setData(fallbackConfig);
          setError('');
        } else {
          setError(e.message || 'Failed to load');
        }
      })
      .finally(() => mounted && setLoading(false));

    return () => { mounted = false; };
  }, [slug, fallbackConfig]);

  if (loading) {
    return (
      <main className="min-h-[60vh] bg-gradient-to-b from-white via-indigo-50/40 to-white">
        <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-32">
          <div className="relative flex h-20 w-20 items-center justify-center">
            <div className="absolute h-full w-full animate-[spin_2.2s_linear_infinite] rounded-full border-4 border-indigo-200/70" />
            <div className="absolute h-full w-full animate-[spin_1.6s_linear_infinite] rounded-full border-4 border-transparent border-t-indigo-500" />
            <div className="absolute h-10 w-10 animate-pulse rounded-full bg-indigo-500/20" />
            <span className="relative text-xs font-semibold uppercase tracking-[0.4em] text-indigo-500">Loading</span>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-24 text-center">
        <div className="inline-flex items-center gap-3 rounded-full border border-rose-200 bg-rose-50 px-6 py-3 text-sm font-semibold text-rose-600">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      </main>
    );
  }

  if (!data) return null;

  const {
    name = 'Category',
    description,
    gradient,
    accent = {},
    featured,
    products = [],
  } = data;

  const resolvedGradient = gradient || fallbackConfig?.gradient || defaultGradient;
  const resolvedAccent = {
    ...defaultAccent,
    ...(fallbackConfig?.accent || {}),
    ...accent,
  };

  const checkClass = resolvedAccent.check || defaultAccent.check;
  const chipClass = resolvedAccent.chip || defaultAccent.chip;
  const buttonClass = resolvedAccent.button || defaultAccent.button;

  return (
    <main className="bg-slate-50/50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* TOP PRODUCT DETAIL HERO CONTAINER (Left: Picture, Right: Details) */}
        <section className="bg-transparent overflow-hidden py-4 sm:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT CONTAINER: FULL PICTURE DISPLAY (Pure White Background) */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="relative w-full h-[400px] sm:h-[460px] rounded-2xl bg-white p-6 flex items-center justify-center shadow-sm overflow-hidden group">
                {/* Subtle background glow */}
                <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
                
                <img
                  src={imageUrl(featured?.image || products[0]?.image || '/images/placeholder.jpg')}
                  alt={name}
                  className="relative z-10 max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = imageUrl('/images/placeholder.jpg');
                  }}
                />

                {/* Floating Badges */}
                <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/90 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    Customizable Pro Kit
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT CONTAINER: CATEGORY & PRODUCT DETAILS */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-100 px-3.5 py-1 text-xs font-semibold text-indigo-600 uppercase tracking-widest">
                  ⚽ Category Spotlight
                </div>
                <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-normal leading-tight">
                  {name}
                </h1>
                <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
                  {description || featured?.description || 'Match-ready, breathable, and durable kits engineered for professional clubs, academies, and brands.'}
                </p>
              </div>

              {/* Specifications / Highlights Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Fabric Tech</div>
                  <div className="text-sm font-semibold text-slate-800 mt-0.5">Moisture-Wicking</div>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Printing</div>
                  <div className="text-sm font-semibold text-slate-800 mt-0.5">4K Sublimation</div>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Min Order (MOQ)</div>
                  <div className="text-sm font-semibold text-slate-800 mt-0.5">25 Kits</div>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Dispatch</div>
                  <div className="text-sm font-semibold text-slate-800 mt-0.5">Worldwide Express</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4 border-t border-slate-100">
                <Link
                  to={`/custom?product=${encodeURIComponent(name)}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 text-sm font-semibold shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02]"
                >
                  <span>Customize Your Kit</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>
                <a
                  href="#related-products"
                  className="inline-flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 text-sm font-semibold transition-all"
                >
                  View All Kits ↓
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* RELATED PRODUCTS GRID */}
        <section id="related-products" className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">Explore Collection</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {name} Designs & Sets
              </h2>
            </div>
            <span className="text-xs font-bold text-slate-400 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
              {products.length} Items Available
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product, index) => (
              <ProductCard
                key={product.id || `${product.name}-${index}`}
                image={product.image}
                name={product.name}
                description={product.description}
                price={product.price}
                discount={product.discount}
              />
            ))}
          </div>
        </section>

        <section className="mt-24">
          <SectionTitle
            eyebrow="Custom lab"
            title="Need something fully bespoke?"
            description="Share your concept, tech packs, or references and our product team will engineer export-grade samples."
          />
          <div className="mt-8">
            <Custom />
          </div>
        </section>
      </div>
    </main>
  );
};

export default CategoryPage;
