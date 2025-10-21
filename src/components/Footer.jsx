import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from 'react-icons/fa';

const footerNav = [
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Our Process', to: '/custom' },
      { label: 'Testimonials', to: '/#testimonials' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Sports Wear',
    links: [
      { label: 'Football Kits', to: '/football' },
      { label: 'Cricket Uniforms', to: '/cricket' },
      { label: 'Basketball Jerseys', to: '/basketball' },
      { label: 'Gym & Training', to: '/gym' },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="relative w-full bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_55%)]" />
      <div className="relative mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-start gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">Stay in the loop</h3>
              <p className="text-sm text-white/70 max-w-md">
                Get seasonal drops, customization trends, and export timelines delivered to your inbox.
              </p>
            </div>
            <form className="flex w-full flex-col gap-3 sm:flex-row sm:items-center md:w-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="flex-1 rounded-full border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
              <button className="inline-flex items-center justify-center rounded-full bg-yellow-300 px-6 py-3 text-sm font-semibold text-indigo-900 transition hover:bg-yellow-200">
                Subscribe
              </button>
            </form>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr_0.9fr]">
            <div>
              <Link to="/" className="inline-flex items-center gap-2">
                <span className="text-2xl font-bold tracking-wide text-yellow-300">ZarkoSportsWear</span>
              </Link>
              <p className="mt-4 text-sm text-white/70 max-w-sm">
                Zarko Sportswear engineers export-grade custom uniforms and accessories for clubs, distributors, and retailers worldwide.
              </p>
              <div className="mt-5 space-y-3 text-sm text-white/70">
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-yellow-300" />
                  <span>Sialkot, Punjab, Pakistan</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaPhoneAlt className="text-yellow-300" />
                  <a href="tel:+923039200750" className="transition hover:text-yellow-300">+92 303 9200750</a>
                </div>
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-yellow-300" />
                  <a href="mailto:zarkosportswear@gmail.com" className="transition hover:text-yellow-300">zarkosportswear@gmail.com</a>
                </div>
              </div>
              <div className="mt-6 flex gap-4 text-xl text-white/80">
                <a href="https://facebook.com/zarkosportswear" target="_blank" rel="noopener noreferrer" className="transition hover:text-yellow-300">
                  <FaFacebookF />
                </a>
                <a href="https://www.instagram.com/zarko_sports.wear/" target="_blank" rel="noopener noreferrer" className="transition hover:text-yellow-300">
                  <FaInstagram />
                </a>
                <a href="https://linkedin.com/in/atif-shahzad903/" target="_blank" rel="noopener noreferrer" className="transition hover:text-yellow-300">
                  <FaLinkedinIn />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="transition hover:text-yellow-300">
                  <FaYoutube />
                </a>
              </div>
            </div>

            {footerNav.map((column) => (
              <div key={column.title}>
                <h3 className="text-lg font-semibold text-white mb-4">{column.title}</h3>
                <ul className="space-y-3 text-sm text-white/70">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to} className="transition hover:text-yellow-300">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; {new Date().getFullYear()} ZarkoSportsWear. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="transition hover:text-yellow-300">Privacy Policy</a>
              <a href="#" className="transition hover:text-yellow-300">Terms</a>
              <a href="mailto:zarkosportswear@gmail.com" className="transition hover:text-yellow-300">Support</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;