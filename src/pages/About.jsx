import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import { motion } from 'framer-motion';
import {
  FaGlobeAmericas,
  FaHandshake,
  FaAward,
  FaWarehouse,
  FaPeopleCarry,
} from 'react-icons/fa';

const timeline = [
  {
    year: '2012',
    title: 'Roots in Sialkot',
    description:
      'We launched as a small-scale manufacturer in the sports capital of Sialkot, focused on premium football and cricket kits.',
  },
  {
    year: '2016',
    title: 'Expanded Custom Capabilities',
    description:
      'Added sublimation, embroidery, and cut-and-sew facilities in-house, enabling full-scale customization for clubs.',
  },
  {
    year: '2019',
    title: 'Global Distribution Partners',
    description:
      'Built a trusted network of distributors across North America, Europe, and the Middle East for reliable export cycles.',
  },
  {
    year: '2024',
    title: 'Next-gen Performance Fabrics',
    description:
      'Invested in advanced moisture-wicking and recycled fibers to help teams perform sustainably.',
  },
];

const pillars = [
  {
    title: 'International Quality',
    Icon: FaAward,
    copy: 'Compliance-ready production with rigorous QC at every stitch, ensuring export-grade outcome.',
  },
  {
    title: 'Trusted Partnerships',
    Icon: FaHandshake,
    copy: 'Dedicated account managers that coordinate sampling, approvals, and recurring club orders.',
  },
  {
    title: 'Global Logistics',
    Icon: FaGlobeAmericas,
    copy: 'Door-to-door shipping solutions with customs documentation handled for you.',
  },
  {
    title: 'Scalable Production',
    Icon: FaWarehouse,
    copy: 'Multiple production lines capable of small-batch runs to large tournament drops.',
  },
  {
    title: 'Team-centric Design',
    Icon: FaPeopleCarry,
    copy: 'Collaborative design process to translate your club identity into performance-ready uniforms.',
  },
];

const About = () => {
  const path = window.location.pathname;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  return (
    <main className="min-h-screen bg-white">
      <SeoHead
        title="About Zarko Sportswear | Export-Grade Sportswear Manufacturer"
        description="Discover how Zarko Sportswear crafts export-grade custom sportswear for clubs worldwide."
        canonical="https://www.zarkosportswear.com/about"
        openGraph={{
          'og:title': 'About Zarko Sportswear | Export-Grade Sportswear Manufacturer',
          'og:description': 'Discover how Zarko Sportswear crafts premium custom sportswear for clubs worldwide with export-grade standards.',
          'og:url': 'https://www.zarkosportswear.com/about',
        }}
        twitter={{
          'twitter:title': 'About Zarko Sportswear | Export-Grade Sportswear Manufacturer',
          'twitter:description': 'Discover how Zarko Sportswear crafts premium custom sportswear for clubs worldwide with export-grade standards.',
        }}
      />
      <section>
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-16 md:pt-20">
          <div className="text-center">
            <span className="inline-flex items-center gap-3 rounded-full border border-indigo-200 bg-white/80 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">
              About Zarko Sportswear
            </span>
            <h1 className="mt-5 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-indigo-900 leading-tight">
              Export-grade custom uniforms built in Sialkot, trusted by clubs worldwide.
            </h1>
            <p className="mt-4 text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              We partner with ambitious teams, academies, and distributors to deliver bespoke sportswear that performs on the field and elevates your brand off it.
            </p>
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-[1.05fr_0.95fr] items-center">
            <div className="space-y-6 text-left">
              <div>
                <h2 className="text-2xl font-semibold text-indigo-800">Our Mission</h2>
                <p className="mt-2 text-gray-600">
                  To engineer high-performance sportswear that empowers clubs of every level with consistent quality, rapid customization, and reliable export fulfillment. Discover real results in our <Link to="/" className="text-indigo-600 hover:underline">top selling section</Link>.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-indigo-800">Our Promise</h2>
                <p className="mt-2 text-gray-600">
                  Every kit we ship carries meticulous craftsmanship, modern fabrication technology, and hands-on customer service.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm">
                  <p className="text-sm uppercase tracking-wide text-indigo-500">Exports</p>
                  <p className="mt-2 text-2xl font-bold text-indigo-900">40+</p>
                  <p className="text-xs text-gray-500">Countries served across 4 continents</p>
                </div>
                <div className="rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm">
                  <p className="text-sm uppercase tracking-wide text-indigo-500">Capacity</p>
                  <p className="mt-2 text-2xl font-bold text-indigo-900">12K+</p>
                  <p className="text-xs text-gray-500">Monthly uniforms with flexible MOQs</p>
                </div>
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl border border-indigo-100 shadow-xl">
              <img src="/images/slide1.jpg" alt="Zarko production floor" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="grid gap-6 md:grid-cols-3"
        >
          {pillars.map(({ title, Icon, copy }) => (
            <div key={title} className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600/10 text-indigo-600 text-xl">
                <Icon />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-indigo-900">{title}</h3>
              <p className="mt-2 text-sm text-gray-600">{copy}</p>
            </div>
          ))}
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl font-bold text-indigo-800 text-center"
        >
          Our journey to becoming a trusted export partner
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.1 }}
          className="mt-10 space-y-6"
        >
          {timeline.map((milestone) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              className="relative flex flex-col sm:flex-row gap-4 rounded-2xl border border-indigo-100 bg-white/90 p-6 shadow-sm"
            >
              <div className="sm:w-32">
                <p className="text-sm font-semibold uppercase tracking-wide text-indigo-500">{milestone.year}</p>
                <p className="text-lg font-semibold text-indigo-900">{milestone.title}</p>
              </div>
              <p className="text-sm text-gray-600 sm:flex-1">{milestone.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
};

export default About;
