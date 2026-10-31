import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaPinterestP } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { COMPANY_DETAILS } from '../data/constants';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Successfully subscribed to our newsletter!', { icon: '✉️' });
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#0A0C16] text-white text-sm border-t border-white/5 relative overflow-hidden">
      {/* Background Gradient Spotlight */}
      <div className="absolute bottom-0 right-0 w-[450px] h-[250px] bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-[94%] px-6 py-16 sm:py-20">

        {/* Top Branding Row */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-white/5 pb-10 mb-12 gap-6">
          <div className="flex items-center gap-4">
            <picture>
              <source srcSet="/new-logo.webp" type="image/webp" />
              <img
                src="/new-logo.webp"
                alt="Zarko Sportswear" title="Zarko Sportswear"
                width={48}
                height={48}
                loading="lazy"
                decoding="async"
                className="h-12 w-auto object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
                onError={(e) => { e.currentTarget.src = '/new-logo.png'; }}
              />
            </picture>
            <div>
              <span className="text-xl font-black uppercase tracking-wider block" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Zarko Sportswear
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-indigo-400">
                Premium Teamwear Factory
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-400 font-medium max-w-md text-center md:text-right leading-relaxed">
            We deliver premium custom sports uniforms and gear for all levels of athletes. Contact us today to build your custom team store!
          </p>
        </div>

        {/* Five Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Col 1: Popular Sports */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-indigo-400">
              Team Sports
            </h3>
            <ul className="space-y-1 text-xs font-semibold text-slate-400">
              <li><Link to="/football" className="inline-block py-1 hover:text-white transition">Football Uniforms</Link></li>
              <li><Link to="/soccer" className="inline-block py-1 hover:text-white transition">Soccer Kits</Link></li>
              <li><Link to="/wrestling" className="inline-block py-1 hover:text-white transition">Wrestling Singlets</Link></li>
              <li><Link to="/baseball" className="inline-block py-1 hover:text-white transition">Baseball Uniforms</Link></li>
              <li><Link to="/basketball" className="inline-block py-1 hover:text-white transition">Basketball Uniforms</Link></li>
              <li><Link to="/cricket" className="inline-block py-1 hover:text-white transition">Cricket Kits</Link></li>
              <li><Link to="/softball" className="inline-block py-1 hover:text-white transition">Softball Uniforms</Link></li>
            </ul>
          </div>

          {/* Col 2: More Sports */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-indigo-400">
              More Sports
            </h3>
            <ul className="space-y-1 text-xs font-semibold text-slate-400">
              <li><Link to="/volleyball" className="inline-block py-1 hover:text-white transition">Volleyball Jerseys</Link></li>
              <li><Link to="/ice-hockey" className="inline-block py-1 hover:text-white transition">Ice Hockey Jerseys</Link></li>
              <li><Link to="/hockey" className="inline-block py-1 hover:text-white transition">Field Hockey Kits</Link></li>
              <li><Link to="/rugby" className="inline-block py-1 hover:text-white transition">Rugby Jerseys</Link></li>
              <li><Link to="/tennis" className="inline-block py-1 hover:text-white transition">Tennis Apparel</Link></li>
              <li><Link to="/running" className="inline-block py-1 hover:text-white transition">Running & Track Wear</Link></li>
              <li><Link to="/gym" className="inline-block py-1 hover:text-white transition">Gym & Activewear</Link></li>
            </ul>
          </div>

          {/* Col 3: Accessories & Gear */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-indigo-400">
              Gear & Accessories
            </h3>
            <ul className="space-y-1 text-xs font-semibold text-slate-400">
              <li><Link to="/shoes" className="inline-block py-1 hover:text-white transition">Athletic Shoes & Turf</Link></li>
              <li><Link to="/gloves" className="inline-block py-1 hover:text-white transition">Sports & Goalie Gloves</Link></li>
              <li><Link to="/caps" className="inline-block py-1 hover:text-white transition">Team Caps & Headwear</Link></li>
              <li><Link to="/bags" className="inline-block py-1 hover:text-white transition">Equipment Duffels & Bags</Link></li>
              <li><Link to="/builder" className="inline-block py-1 hover:text-white transition">3D Uniform Builder</Link></li>
              <li><Link to="/builder/models" className="inline-block py-1 hover:text-white transition">3D Uniform Templates</Link></li>
              <li><Link to="/blogs" className="inline-block py-1 hover:text-white transition">Manufacturing Blog</Link></li>
            </ul>
          </div>

          {/* Col 4: Orders & Support */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-indigo-400">
              Order Support
            </h3>
            <ul className="space-y-1 text-xs font-semibold text-slate-400">
              <li><Link to="/custom" className="inline-block py-1 hover:text-white transition">Start Custom Order</Link></li>
              <li><Link to="/about" className="inline-block py-1 hover:text-white transition">About Our Factory</Link></li>
              <li><Link to="/contact" className="inline-block py-1 hover:text-white transition">Request Direct Quote</Link></li>
              <li><Link to="/privacy-policy" className="inline-block py-1 hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="inline-block py-1 hover:text-white transition">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Col 5: Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-indigo-400">
              Direct Contact
            </h3>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-400 leading-relaxed">
              <li className="text-white font-bold">Factory & Export Hub:</li>
              <li>{COMPANY_DETAILS.address}</li>
              <li className="text-white font-bold mt-2">WhatsApp Support:</li>
              <li>
                <a href={`https://wa.me/${COMPANY_DETAILS.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="inline-block py-0.5 hover:text-white transition">{COMPANY_DETAILS.whatsapp}</a>
              </li>
              <li className="text-white font-bold mt-2">Email Desk:</li>
              <li>
                <a href={`mailto:${COMPANY_DETAILS.email}`} className="inline-block py-0.5 hover:text-white transition break-all">{COMPANY_DETAILS.email}</a>
              </li>
            </ul>
            {/* Social Links */}
            <div className="flex gap-2.5 pt-2">
              <a href="https://www.facebook.com/zarkosportswear" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-indigo-600 flex items-center justify-center border border-white/10 hover:border-transparent text-slate-400 hover:text-white transition" aria-label="Facebook">
                <FaFacebookF size={13} />
              </a>
              <a href="https://www.instagram.com/zarko_sports.wear/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-indigo-600 flex items-center justify-center border border-white/10 hover:border-transparent text-slate-400 hover:text-white transition" aria-label="Instagram">
                <FaInstagram size={13} />
              </a>
              <a href="https://www.linkedin.com/in/zarko-sports-wear-186b1942a/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-indigo-600 flex items-center justify-center border border-white/10 hover:border-transparent text-slate-400 hover:text-white transition" aria-label="LinkedIn">
                <FaLinkedinIn size={13} />
              </a>
              <a href="https://pin.it/7x8HJGoJx" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-indigo-600 flex items-center justify-center border border-white/10 hover:border-transparent text-slate-400 hover:text-white transition" aria-label="Pinterest">
                <FaPinterestP size={13} />
              </a>
            </div>
          </div>

        </div>

        {/* Category Index Navigation Strip (Guarantees incoming internal links across whole site) */}
        <div className="border-t border-white/5 mt-12 pt-6">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">All Product & Sportswear Categories:</p>
          <div className="flex flex-wrap gap-2 text-xs text-slate-300">
            <Link to="/football" className="inline-flex items-center py-1.5 px-3 rounded-[5px] bg-white/5 hover:bg-white/10 hover:text-white transition">Football</Link>
            <Link to="/soccer" className="inline-flex items-center py-1.5 px-3 rounded-[5px] bg-white/5 hover:bg-white/10 hover:text-white transition">Soccer</Link>
            <Link to="/wrestling" className="inline-flex items-center py-1.5 px-3 rounded-[5px] bg-white/5 hover:bg-white/10 hover:text-white transition">Wrestling</Link>
            <Link to="/baseball" className="inline-flex items-center py-1.5 px-3 rounded-[5px] bg-white/5 hover:bg-white/10 hover:text-white transition">Baseball</Link>
            <Link to="/softball" className="inline-flex items-center py-1.5 px-3 rounded-[5px] bg-white/5 hover:bg-white/10 hover:text-white transition">Softball</Link>
            <Link to="/basketball" className="inline-flex items-center py-1.5 px-3 rounded-[5px] bg-white/5 hover:bg-white/10 hover:text-white transition">Basketball</Link>
            <Link to="/cricket" className="inline-flex items-center py-1.5 px-3 rounded-[5px] bg-white/5 hover:bg-white/10 hover:text-white transition">Cricket</Link>
            <Link to="/volleyball" className="inline-flex items-center py-1.5 px-3 rounded-[5px] bg-white/5 hover:bg-white/10 hover:text-white transition">Volleyball</Link>
            <Link to="/ice-hockey" className="inline-flex items-center py-1.5 px-3 rounded-[5px] bg-white/5 hover:bg-white/10 hover:text-white transition">Ice Hockey</Link>
            <Link to="/hockey" className="inline-flex items-center py-1.5 px-3 rounded-[5px] bg-white/5 hover:bg-white/10 hover:text-white transition">Field Hockey</Link>
            <Link to="/rugby" className="inline-flex items-center py-1.5 px-3 rounded-[5px] bg-white/5 hover:bg-white/10 hover:text-white transition">Rugby</Link>
            <Link to="/tennis" className="inline-flex items-center py-1.5 px-3 rounded-[5px] bg-white/5 hover:bg-white/10 hover:text-white transition">Tennis</Link>
            <Link to="/running" className="inline-flex items-center py-1.5 px-3 rounded-[5px] bg-white/5 hover:bg-white/10 hover:text-white transition">Running</Link>
            <Link to="/gym" className="inline-flex items-center py-1.5 px-3 rounded-[5px] bg-white/5 hover:bg-white/10 hover:text-white transition">Gym & Activewear</Link>
            <Link to="/shoes" className="inline-flex items-center py-1.5 px-3 rounded-[5px] bg-white/5 hover:bg-white/10 hover:text-white transition">Shoes</Link>
            <Link to="/gloves" className="inline-flex items-center py-1.5 px-3 rounded-[5px] bg-white/5 hover:bg-white/10 hover:text-white transition">Gloves</Link>
            <Link to="/caps" className="inline-flex items-center py-1.5 px-3 rounded-[5px] bg-white/5 hover:bg-white/10 hover:text-white transition">Caps</Link>
            <Link to="/bags" className="inline-flex items-center py-1.5 px-3 rounded-[5px] bg-white/5 hover:bg-white/10 hover:text-white transition">Bags</Link>
            <Link to="/builder" className="inline-flex items-center py-1.5 px-3 rounded-[5px] bg-white/5 hover:bg-white/10 hover:text-white transition">3D Builder</Link>
            <Link to="/builder/models" className="inline-flex items-center py-1.5 px-3 rounded-[5px] bg-white/5 hover:bg-white/10 hover:text-white transition">3D Kit Catalog</Link>
            <Link to="/custom" className="inline-flex items-center py-1.5 px-3 rounded-[5px] bg-white/5 hover:bg-white/10 hover:text-white transition">Custom Orders</Link>
            <Link to="/blogs" className="inline-flex items-center py-1.5 px-3 rounded-[5px] bg-white/5 hover:bg-white/10 hover:text-white transition">Blog</Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold text-slate-400">
          <p>&copy; {new Date().getFullYear()} Zarko Sportswear. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="inline-block py-1 hover:text-slate-300 transition">Privacy Policy</Link>
            <span aria-hidden="true">•</span>
            <Link to="/terms" className="inline-block py-1 hover:text-slate-300 transition">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

