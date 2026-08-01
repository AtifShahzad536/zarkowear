import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown, FaArrowRight, FaPhoneAlt, FaWhatsapp, FaGlobe, FaInstagram, FaFacebookF } from 'react-icons/fa';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';

const TopBar = () => {
  return (
    <div className="bg-indigo-950 text-white text-[11px] py-2 overflow-hidden relative border-b border-indigo-900/40">
      <style>{`
        @keyframes marquee-l2r {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-marquee-l2r {
          display: inline-flex;
          white-space: nowrap;
          animation: marquee-l2r 25s linear infinite;
        }
        .animate-marquee-l2r:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="w-full flex justify-center">
        <div className="animate-marquee-l2r flex items-center gap-12 font-semibold uppercase tracking-wider">
          <a href="https://wa.me/923039200750" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-green-400 transition-colors">
            <FaWhatsapp className="text-sm text-green-400" />
            <span>WhatsApp: +92-303-9200750</span>
          </a>
          <a href="https://www.zarkosportswear.com" className="flex items-center gap-2 hover:text-indigo-300 transition-colors">
            <FaGlobe className="text-sm text-indigo-400" />
            <span>www.zarkosportswear.com</span>
          </a>
          <a href="https://www.instagram.com/zarko_sports.wear/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-pink-400 transition-colors">
            <FaInstagram className="text-sm text-pink-400" />
            <span>Instagram</span>
          </a>
          <a href="https://www.facebook.com/zarkosportswear" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
            <FaFacebookF className="text-sm text-blue-400" />
            <span>Facebook</span>
          </a>
        </div>
      </div>
    </div>
  );
};

const sportsWear = [
  { label: 'Wrestling Kits', to: '/wrestling' },
  { label: 'Football Kits', to: '/football' },
  { label: 'Cricket Kits', to: '/cricket' },
  { label: 'Basketball Kits', to: '/basketball' },
  { label: 'Hockey Kits', to: '/hockey' },
  { label: 'Rugby Kits', to: '/rugby' },
  { label: 'Tennis Wear', to: '/tennis' },
  { label: 'Running Wear', to: '/running' },
  { label: 'Gym/Fitness Wear', to: '/gym' },
];

const accessories = [
  { label: 'Shoes', to: '/shoes' },
  { label: 'Gloves', to: '/gloves' },
  { label: 'Caps', to: '/caps' },
  { label: 'Bags', to: '/bags' },
];

const linkBase = 'flex w-full items-center justify-between rounded-2xl border border-indigo-100/70 bg-white/85 px-4 py-3 text-sm font-semibold text-indigo-700 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-white';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleMobile = () => setMobileOpen((v) => !v);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
        setOpenDropdown(null);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!mobileOpen) setOpenDropdown(null);
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="sticky top-0 z-50 border-b border-slate-100/70 bg-white/90 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.02)]"
    >
      <TopBar />
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      />
      <div className="mx-auto flex max-w-[94%] items-center justify-between px-6 py-3.5">
        {/* Logo and Typography Brand Name on the Left */}
        <Link to="/" className="flex items-center gap-1 group flex-shrink-0">
          <img
            src="/new-logo.png"
            alt="Zarko Sportswear"
            className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <span className="text-[16px] md:text-[18px] font-black  text-indigo-950 uppercase tracking-widest -ml-0.5" style={{ fontFamily: "'Outfit', sans-serif" }}>
            ARKO
          </span>
        </Link>

        {/* Inline Flex Desktop Menu (Centered relative to container width) */}
        <div className="hidden lg:flex items-center gap-5 text-[11px] font-bold uppercase tracking-wider text-slate-600">
          <DesktopLink to="/">Home</DesktopLink>
          <span className="h-3 w-px bg-slate-200/80" />

          <Dropdown label="Sports Wear" items={sportsWear} />
          <span className="h-3 w-px bg-slate-200/80" />
          <Dropdown label="Accessories" items={accessories} />
          <span className="h-3 w-px bg-slate-200/80" />

          <DesktopLink to="/builder">3D Customizer</DesktopLink>
          <span className="h-3 w-px bg-slate-200/80" />
          <DesktopLink to="/custom">Custom Orders</DesktopLink>
          <span className="h-3 w-px bg-slate-200/80" />
          <DesktopLink to="/about">About Us</DesktopLink>
          <span className="h-3 w-px bg-slate-200/80" />
          <DesktopLink to="/contact">Contact Us</DesktopLink>
        </div>

        {/* WhatsApp & Mobile Toggle on the Right */}
        <div className="flex items-center gap-4">
          <motion.a
            href="https://wa.me/923039200750"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-full transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaWhatsapp className="text-sm" />
            <span>+92-303-9200750</span>
          </motion.a>

          {/* Mobile Menu Toggle (Displays on screens below lg) */}
          <button
            onClick={toggleMobile}
            className="lg:hidden inline-flex items-center justify-center rounded-full p-2 text-slate-600 hover:bg-slate-50 transition"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative mx-auto w-full max-w-[94%] px-4 pb-6"
          >
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-[0_24px_45px_-30px_rgba(15,23,42,0.45)] backdrop-blur"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-500">
                Navigate
              </p>
              <div className="mt-4 space-y-3">
                <MobileLink to="/" onClick={() => setMobileOpen(false)}>Home</MobileLink>

                <MobileDropdown
                  label="Sports Wear"
                  isOpen={openDropdown === 'sports'}
                  toggle={() => setOpenDropdown(openDropdown === 'sports' ? null : 'sports')}
                  items={sportsWear}
                  onNavigate={() => setMobileOpen(false)}
                />

                <MobileDropdown
                  label="Team Accessories"
                  isOpen={openDropdown === 'accessories'}
                  toggle={() => setOpenDropdown(openDropdown === 'accessories' ? null : 'accessories')}
                  items={accessories}
                  onNavigate={() => setMobileOpen(false)}
                />

                <MobileLink to="/builder" onClick={() => setMobileOpen(false)}>3D Customizer</MobileLink>
                <MobileLink to="/custom" onClick={() => setMobileOpen(false)}>Custom Orders</MobileLink>
                <MobileLink to="/about" onClick={() => setMobileOpen(false)}>About Us</MobileLink>
                <MobileLink to="/contact" onClick={() => setMobileOpen(false)}>Contact Us</MobileLink>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                  <a
                    href="https://wa.me/923039200750"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between rounded-2xl border border-indigo-100/70 bg-white/85 px-4 py-3 text-sm font-semibold text-indigo-700 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-white"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
                        <FaWhatsapp className="text-sm" />
                      </div>
                      <span>WhatsApp Us</span>
                    </div>
                    <span className="text-xs text-green-400">💬</span>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

const Dropdown = ({ label, items }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative whitespace-nowrap"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <button
        className={`flex items-center gap-1.5 py-2 text-[11px] font-extrabold uppercase tracking-wider transition-all duration-300 select-none outline-none
          relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-indigo-600 after:transition-transform after:duration-300 hover:after:scale-x-100
          ${open ? 'text-indigo-600 after:scale-x-100' : 'text-slate-500 hover:text-indigo-600'}`}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {label}
        <FaChevronDown className={`text-[9px] transition-transform duration-300 ${open ? 'rotate-180 text-indigo-600' : 'text-slate-400'}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={`absolute top-full z-50 mt-2 -translate-x-1/2 left-1/2 ${items.length > 4 ? 'w-[480px]' : 'w-[260px]'}`}
          >
            <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white/95 p-3 shadow-[0_20px_50px_rgba(99,102,241,0.15)] backdrop-blur-xl">
              <div className={`grid gap-2 ${items.length > 4 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {items.map((item, index) => (
                  <Link
                    key={index}
                    to={item.to}
                    className="group flex items-center justify-between rounded-xl px-4 py-2.5 border border-slate-100/50 bg-slate-50/30 hover:bg-indigo-50/50 hover:border-indigo-100/80 text-[13px] font-semibold text-slate-700 hover:text-indigo-600 transition-all duration-200 normal-case"
                  >
                    <span>{item.label}</span>
                    <FaArrowRight className="text-[10px] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-indigo-600" />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DesktopLink = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `relative py-2 text-[11px] font-extrabold uppercase tracking-wider transition-all duration-300 select-none
       after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-indigo-600 after:transition-transform after:duration-300 hover:after:scale-x-100
       ${isActive ? 'text-indigo-600 after:scale-x-100' : 'text-slate-500 hover:text-indigo-600'}`
    }
    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
  >
    {children}
  </NavLink>
);

const MobileLink = ({ to, children, onClick }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
    <Link to={to} onClick={onClick} className={linkBase}>
      <span>{children}</span>
      <span className="text-xs text-indigo-400">→</span>
    </Link>
  </motion.div>
);

const MobileDropdown = ({ label, isOpen, toggle, items, onNavigate }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
    <button
      onClick={toggle}
      className={`${linkBase} ${isOpen ? 'border-indigo-300 bg-indigo-50 text-indigo-800' : ''}`}
      aria-expanded={isOpen}
    >
      <span>{label}</span>
      <FaChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.ul
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="mt-2 space-y-2 overflow-hidden"
        >
          {items.map((sub, j) => (
            <motion.li key={j} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: j * 0.02 }}>
              <Link
                to={sub.to}
                onClick={onNavigate}
                className="flex items-center justify-between rounded-2xl border border-indigo-100/70 bg-white/85 px-4 py-3 text-sm font-semibold text-indigo-700 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-white"
              >
                <span>{sub.label}</span>
                <span className="text-xs text-indigo-400">↗</span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  </motion.div>
);

export default Header;
