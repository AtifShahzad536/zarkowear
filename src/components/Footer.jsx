import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import toast from 'react-hot-toast';

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
            <img
              src="/new-logo.png"
              alt="Zarko Sportswear"
              className="h-12 w-auto object-contain"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
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

        {/* Four Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          
          {/* Col 1: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-indigo-400">
              Quick Links
            </h3>
            <ul className="space-y-3 text-xs font-semibold text-slate-400">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/football" className="hover:text-white transition">Soccer / Football</Link></li>
              <li><Link to="/basketball" className="hover:text-white transition">Basketball</Link></li>
              <li><Link to="/wrestling" className="hover:text-white transition">Wrestling</Link></li>
              <li><Link to="/gym" className="hover:text-white transition">Gym & Activewear</Link></li>
            </ul>
          </div>

          {/* Col 2: Support */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-indigo-400">
              Support
            </h3>
            <ul className="space-y-3 text-xs font-semibold text-slate-400">
              <li><Link to="/custom" className="hover:text-white transition">Start Custom Order</Link></li>
              <li><Link to="/builder" className="hover:text-white transition">3D Uniform Builder</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Request Quotes</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Col 3: Contact Us */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-indigo-400">
              Contact Us
            </h3>
            <ul className="space-y-3 text-xs font-semibold text-slate-400 leading-relaxed">
              <li className="text-white">Export Distribution Hub:</li>
              <li>Shipping directly to USA & Worldwide</li>
              <li className="text-white mt-2">WhatsApp Support:</li>
              <li>
                <a href="tel:+923039220750" className="hover:text-white transition">+92 303 9220750</a>
              </li>
              <li className="text-white mt-2">Email Desk:</li>
              <li>
                <a href="mailto:zarkosportswear@gmail.com" className="hover:text-white transition break-all">zarkosportswear@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-indigo-400">
              Join Our Newsletter
            </h3>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              Get the latest updates, exclusive custom apparel offers, and sports uniforms design tips delivered to your inbox!
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-medium text-white placeholder-slate-500 focus:bg-white/10 focus:border-indigo-500 focus:outline-none transition"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition shadow-md shadow-indigo-600/20"
              >
                SUBSCRIBE
              </button>
            </form>
            
            {/* Social Links */}
            <div className="flex gap-3.5 pt-3">
              <a href="https://www.facebook.com/zarkosportswear" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-indigo-600 flex items-center justify-center border border-white/10 hover:border-transparent text-slate-400 hover:text-white transition" aria-label="Facebook">
                <FaFacebookF size={14} />
              </a>
              <a href="https://www.instagram.com/zarko_sports.wear/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-indigo-600 flex items-center justify-center border border-white/10 hover:border-transparent text-slate-400 hover:text-white transition" aria-label="Instagram">
                <FaInstagram size={14} />
              </a>
              <a href="https://www.linkedin.com/in/atif-shahzad903/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-indigo-600 flex items-center justify-center border border-white/10 hover:border-transparent text-slate-400 hover:text-white transition" aria-label="LinkedIn">
                <FaLinkedinIn size={14} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold text-slate-400">
          <p>&copy; {new Date().getFullYear()} Zarko Sportswear. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-slate-300 transition">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-slate-300 transition">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
