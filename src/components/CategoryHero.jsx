import React from 'react';

const CategoryHero = ({ title, description, gradient = 'from-blue-600 via-blue-500 to-blue-400', className = '' }) => (
  <section className={`relative overflow-hidden rounded-[28px] border border-indigo-100 bg-white shadow-xl ${className}`}>
    <div className={`h-28 rounded-t-[28px] bg-gradient-to-r ${gradient}`} />
    <div className="relative -mt-12 px-6 pb-8 sm:px-10">
      <div className="relative rounded-3xl border border-indigo-100 bg-white px-6 py-8 shadow-lg sm:px-10 sm:py-10">
        <div className="absolute -top-16 -left-20 h-36 w-36 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute -bottom-16 -right-10 h-40 w-40 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="relative space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/60 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-indigo-500">
            Category spotlight
          </div>
          <h1 className="text-3xl font-bold leading-tight text-indigo-900 sm:text-4xl lg:text-[2.65rem]">
            {title}
          </h1>
          {description ? (
            <p className="max-w-2xl text-base text-gray-600 sm:text-lg">
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  </section>
);

export default CategoryHero;
