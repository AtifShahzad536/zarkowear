import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const footerNav = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Our Process', to: '/custom' },
      { label: 'Testimonials', to: '/#testimonials' },
      { label: 'Contact Us', to: '/contact' },
      { label: 'Privacy Policy', to: '/privacy-policy' },
      { label: 'Terms of Service', to: '/terms' },
    ],
  },
  {
    title: 'Sports Wear',
    links: [
      { label: 'Football Kits', to: '/football' },
      { label: 'Cricket Uniforms', to: '/cricket' },
      { label: 'Basketball Jerseys', to: '/basketball' },
      { label: 'Hockey Equipment', to: '/hockey' },
      { label: 'Rugby Kits', to: '/rugby' },
      { label: 'Tennis Apparel', to: '/tennis' },
    ],
  },
  {
    title: 'Accessories',
    links: [
      { label: 'Sports Shoes', to: '/shoes' },
      { label: 'Sports Gloves', to: '/gloves' },
      { label: 'Caps & Hats', to: '/caps' },
      { label: 'Sports Bags', to: '/bags' },
      { label: 'Socks & Accessories', to: '/accessories' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'FAQs', to: '/faq' },
      { label: 'Size Guide', to: '/size-guide' },
      { label: 'Shipping Info', to: '/shipping' },
      { label: 'Returns & Exchanges', to: '/returns' },
      { label: 'Track Order', to: '/track-order' },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-950 text-white text-sm">
      <div className="relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_55%)]" />
        
        {/* Main Content */}
        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 overflow-hidden rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-1">
                  <img
                    src="/headerLogo.png"
                    alt="Zarko Sportswear"
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <span className="text-2xl font-bold">Zarko Sports</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Premium sportswear and equipment for athletes and teams worldwide. Quality, performance, and style in every stitch.
              </p>
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                  <FaFacebookF className="h-5 w-5" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors" aria-label="Instagram">
                  <FaInstagram className="h-5 w-5" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="LinkedIn">
                  <FaLinkedinIn className="h-5 w-5" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors" aria-label="YouTube">
                  <FaYoutube className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Navigation Columns */}
            {footerNav.map((section) => (
              <div key={section.title} className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-300">
                  {section.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="text-sm text-gray-300 hover:text-white transition-colors flex items-start group"
                      >
                        <span className="text-indigo-400 mr-2">•</span>
                        <span className="group-hover:translate-x-1 transition-transform">
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {/* Support Section */}
            <div className="col-span-2">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-300 mb-4">
                Support
              </h3>
              <ul className="space-y-2">
                {footerNav[3].links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-300 hover:text-white transition-colors flex items-center group"
                    >
                      <span className="text-indigo-400 mr-2">•</span>
                      <span className="group-hover:translate-x-1 transition-transform">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Contact Section - Professional Layout */}
            <div className="col-span-2 mt-6 sm:mt-0">
              <div className="bg-gradient-to-br from-indigo-900/30 to-indigo-900/10 p-5 rounded-xl border border-indigo-800/30 shadow-lg">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-300 mb-5 text-center sm:text-left">
                  Get In Touch
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Location */}
                  <div className="flex flex-col items-center text-center p-3 rounded-xl bg-indigo-900/20 hover:bg-indigo-900/40 transition-all border border-indigo-800/20">
                    <div className="bg-indigo-900/40 p-2.5 rounded-full mb-3 shadow-inner">
                      <FaMapMarkerAlt className="h-4 w-4 text-indigo-300" />
                    </div>
                    <div className="w-full">
                      <h4 className="text-xs font-medium text-indigo-200 mb-1.5">Our Location</h4>
                      <p className="text-xs text-gray-300 leading-tight break-words">Sialkot, Pakistan</p>
                    </div>
                  </div>
                  
                  {/* Phone */}
                  <div className="flex flex-col items-center text-center p-3 rounded-xl bg-indigo-900/20 hover:bg-indigo-900/40 transition-all border border-indigo-800/20">
                    <div className="bg-indigo-900/40 p-2.5 rounded-full mb-3 shadow-inner">
                      <FaPhoneAlt className="h-4 w-4 text-indigo-300" />
                    </div>
                    <div className="w-full">
                      <h4 className="text-xs font-medium text-indigo-200 mb-1.5">Call Us</h4>
                      <a href="tel:+923039220750" className="text-xs text-gray-300 hover:text-white transition-colors break-words">+92 303 9220750</a>
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div className="flex flex-col items-center text-center p-3 rounded-xl bg-indigo-900/20 hover:bg-indigo-900/40 transition-all border border-indigo-800/20 sm:col-span-2 lg:col-span-1">
                    <div className="bg-indigo-900/40 p-2.5 rounded-full mb-3 shadow-inner">
                      <FaEnvelope className="h-4 w-4 text-indigo-300" />
                    </div>
                    <div className="w-full">
                      <h4 className="text-xs font-medium text-indigo-200 mb-1.5">Email Us</h4>
                      <a href="mailto:zarkosportswear@gmail.com" 
                         className="text-xs text-gray-300 hover:text-white transition-colors break-all hover:underline"
                         style={{ wordBreak: 'break-all' }}>
                        zarkosportswear@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          
          {/* Bottom Bar - Copyright */}
          <div className="border-t border-white/10 mt-8 pt-6">
            <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
              <div className="flex flex-wrap justify-center gap-4 text-xs">
                <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <span className="text-gray-600">•</span>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <span className="text-gray-600">•</span>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </div>
              <p className="text-xs text-gray-500 text-center sm:text-right mt-4 sm:mt-0">
                &copy; {new Date().getFullYear()} Zarko SportsWear. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
