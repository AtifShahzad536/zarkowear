import React, { useEffect, useMemo, useState } from 'react';
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
    <main className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <CategoryHero title={name} description={description} gradient={resolvedGradient} />

        {featured && (
          <section className="mt-12 rounded-2xl border border-indigo-100 bg-white p-6 shadow-lg sm:p-10">
            <div className="px-2 sm:px-4">
              <SectionTitle
                eyebrow="Signature release"
                title={featured.name}
                description={featured.tagline || 'Export-ready sets crafted for premium clubs and distributors.'}
              />
              <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
                <div className="relative group overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-white">
                  <div className="relative h-[420px]">
                    <img
                      src={imageUrl(featured.image || '/images/placeholder.jpg')}
                      alt={featured.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src = imageUrl('/images/placeholder.jpg'); }}
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-indigo-950/80 via-indigo-900/40 to-transparent px-6 py-6 text-white">
                      <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-200">
                        <span>Ultra-light</span>
                        <span>Customizable</span>
                        <span>Global export</span>
                      </div>
                      <h3 className="mt-3 text-3xl font-bold">{featured.name}</h3>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {featured.description && (
                    <p className="text-base leading-7 text-gray-600 sm:text-lg">
                      {featured.description}
                    </p>
                  )}

                  {Array.isArray(featured.details) && featured.details.length > 0 && (
                    <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-6">
                      <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-500">Key capabilities</h4>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {featured.details.map((point, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <span className={`${checkClass} mt-1.5`}>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 0 0-1.22-.872l-3.236 4.53-1.71-1.71a.75.75 0 0 0-1.06 1.061l2.25 2.25a.75.75 0 0 0 1.14-.094l3.836-5.165Z" clipRule="evenodd" /></svg>
                            </span>
                            <span className="text-sm text-gray-600">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {Array.isArray(featured.sizes) && featured.sizes.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-500">Available sizes</h4>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {featured.sizes.map((size, i) => (
                          <span key={i} className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase ${chipClass}`}>
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-4">
                    <button className={`inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 ${buttonClass}`}>
                      Request quote
                    </button>
                    <p className="text-xs text-gray-400">MOQ from 25 units · Sampling in 10-12 days · Worldwide fulfillment</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="mt-20">
          <SectionTitle
            eyebrow="Collections"
            title="Ready-to-customize designs"
            description="Choose a base silhouette and we will tailor fabrics, trims, and prints to your club specs."
          />
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {products.map((product, index) => (
              <ProductCard
                key={product.id || `${product.name}-${index}`}
                image={product.image}
                name={product.name}
                description={product.description}
                onQuote={() => alert('Request quote: ' + product.name)}
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
