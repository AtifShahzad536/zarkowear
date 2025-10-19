import React, { useEffect } from 'react';
import SeoHead from '../components/SeoHead';

const About = () => {
     const path = window.location.pathname;
      useEffect(() => {
        window.scrollTo(0, 0);
    }, [path]);
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <SeoHead
        title="About Zarko Sportswear | Export-Grade Sportswear Manufacturer"
        description="Learn about Zarko Sportswear's mission to deliver high-performance custom sports team wear to clubs worldwide."
        canonical="https://www.zarkosportswear.com/about"
        openGraph={{
          'og:title': 'About Zarko Sportswear | Export-Grade Sportswear Manufacturer',
          'og:description': "Learn about Zarko Sportswear's mission to deliver high-performance custom sports team wear to clubs worldwide.",
          'og:url': 'https://www.zarkosportswear.com/about',
        }}
        twitter={{
          'twitter:title': 'About Zarko Sportswear | Export-Grade Sportswear Manufacturer',
          'twitter:description': "Learn about Zarko Sportswear's mission to deliver high-performance custom sports team wear to clubs worldwide.",
        }}
      />
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-indigo-700">About Us</h1>
        <p className="text-gray-600 mt-2">Exporting premium sports team wear worldwide.</p>
      </header>

      <section className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Our Mission</h2>
          <p className="text-gray-600">To deliver world-class sportswear that enhances performance, comfort, and team identity. We blend cutting-edge fabrics with precision manufacturing for professional results.</p>

          <h2 className="text-xl font-semibold">Our Vision</h2>
          <p className="text-gray-600">To be the most trusted global partner for custom sports team wear, enabling teams of all levels to perform and look their best.</p>

          <h2 className="text-xl font-semibold">Export Markets</h2>
          <p className="text-gray-600">We export to North America, Europe, Middle East, and Oceania with reliable lead times and compliance to international standards.</p>
        </div>
        <div className="rounded-xl overflow-hidden shadow-md">
          <img src="/images/slide1.jpg" alt="About WearConnect" className="w-full h-full object-cover" />
        </div>
      </section>
    </main>
  );
};

export default About;
