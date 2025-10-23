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

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.9fr] items-start">
            <div className="space-y-10">
              <div className="grid gap-10 md:grid-cols-2">
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-indigo-800">Our Mission</h2>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    To engineer high-performance sportswear that empowers clubs of every level with consistent quality, rapid customization, and reliable export fulfillment. Discover real results in our <Link to="/" className="text-indigo-600 hover:underline">top selling section</Link>.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-indigo-800">Our Promise</h2>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    Every kit we ship carries meticulous craftsmanship, modern fabrication technology, and hands-on customer service backed by a responsive export support desk.
                  </p>
                </div>
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

              <div className="relative overflow-hidden rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6 md:p-8 shadow-lg">
                <div className="absolute -top-24 -right-10 h-56 w-56 rounded-full bg-indigo-100/60 blur-3xl" />
                <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-purple-100/60 blur-3xl" />
                <div className="relative flex flex-col gap-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="max-w-2xl space-y-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-indigo-500">
                        Leadership
                      </span>
                      <h2 className="text-2xl md:text-3xl font-semibold text-indigo-900">Meet the Co-Founders</h2>
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                        Brothers <span className="font-semibold text-indigo-700">Atif Shahzad</span> and <span className="font-semibold text-indigo-700">Hurairah Shahzad</span> graduated together from the <span className="font-semibold">University of Sialkot</span> and turned a shared passion for sport into a modern export powerhouse. Their complementary strengths keep Zarko agile—from concept sketches to global shipments.
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-3 w-full max-w-xs mx-auto">
                      <div className="group relative flex items-center gap-3 rounded-xl border border-indigo-100 bg-white p-3 pr-5 shadow-sm transition hover:shadow-md w-full">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-sm font-semibold group-hover:bg-indigo-200 transition">AS</div>
                        <div className="text-left">
                          <p className="text-xs font-medium text-gray-500">Co-Founder</p>
                          <p className="text-sm font-semibold text-indigo-900">Atif Shahzad</p>
                        </div>
                        <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 text-white text-[10px] shadow-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        </div>
                      </div>
                      <div className="group relative flex items-center gap-3 rounded-xl border border-indigo-100 bg-white p-3 pr-5 shadow-sm transition hover:shadow-md w-full">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600 text-sm font-semibold group-hover:bg-purple-200 transition">HS</div>
                        <div className="text-left">
                          <p className="text-xs font-medium text-gray-500">Co-Founder</p>
                          <p className="text-sm font-semibold text-indigo-900">Hurairah Shahzad</p>
                        </div>
                        <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-purple-500 text-white text-[10px] shadow-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="overflow-hidden rounded-3xl border border-indigo-100 shadow-xl">
                <img src="/images/slide1.jpg" alt="Zarko production floor" className="h-full w-full object-cover" />
              </div>
              <div className="rounded-3xl border border-indigo-100 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-indigo-900">Leadership Philosophy</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  Atif and Hurairah stay closely involved with sampling, production, and customer care, ensuring every project reflects the craftsmanship and timeliness they demand from their own teams.
                </p>
                <div className="mt-4 grid gap-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-sm font-semibold">1</span>
                    <p className="text-sm text-gray-600">Founder-led QC walkthroughs on every export batch.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-sm font-semibold">2</span>
                    <p className="text-sm text-gray-600">Weekly huddles with design and logistics teams for rapid decisions.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-sm font-semibold">3</span>
                    <p className="text-sm text-gray-600">Direct line of communication for international distributors.</p>
                  </div>
                </div>
              </div>
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
