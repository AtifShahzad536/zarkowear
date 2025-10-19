import React from 'react';

const CategoryHero = ({ title, description, className = '' }) => (
  <section className={`mb-12 mt-8 ${className}`}>
    {/* Blue gradient background */}
    <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white rounded-xl p-8 shadow-lg">
      <h1 className="text-4xl font-bold mb-2 drop-shadow-md">{title}</h1>
      {description ? (
        <p className="text-blue-50 text-lg">{description}</p>
      ) : null}
    </div>
  </section>
);

export default CategoryHero;
