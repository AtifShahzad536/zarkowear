import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown, FaArrowRight, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import Logo from './Logo';

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

const linkBase = 'flex items-center justify-between rounded-2xl border border-indigo-100/70 bg-white/85 px-4 py-3 text-sm font-semibold text-indigo-700 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-white';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleMobile = () => setMobileOpen((v) => !v);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
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
      className="sticky top-0 z-50 border-b border-slate-100/70 bg-white/80 backdrop-blur-xl shadow-[0_20px_45px_-28px_rgba(15,23,42,0.4)]"
    >
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      />
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo on the left */}
        <div className="relative inline-flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3 group">
            {/* Logo */}
            <motion.div
              className="relative p-0.5 rounded-full bg-gradient-to-br from-indigo-100/50 to-purple-100/50 backdrop-blur-sm border border-indigo-200/40 shadow-lg overflow-hidden"
              initial={{ y: 0 }}
              animate={{ y: [0, -3, 0] }}
              transition={{
                y: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                },
                type: "spring",
                stiffness: 400,
                damping: 25
              }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                boxShadow: "0 10px 30px rgba(99, 102, 241, 0.3)",
                y: -5
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/30 shadow-inner">
                <img
                  src="/headerLogo.png"
                  alt="Zarko Sportswear"
                  className="w-full h-full object-cover scale-150"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 rounded-full ring-1 ring-indigo-400/40 animate-pulse" />
              </div>
            </motion.div>

            {/* Brand Name */}
            <motion.div
              className="flex items-baseline"
              initial="hidden"
              animate="show"
            >
              {["Zarko", "Sportswear"].map((word, wordIndex) => (
                <motion.div
                  key={wordIndex}
                  className="flex mr-3"
                >
                  {word.split("").map((letter, letterIndex) => (
                    <motion.span
                      key={letterIndex}
                      className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent inline-block"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: 1,
                        y: [0, -3, 0],
                        transition: {
                          y: {
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                            delay: wordIndex * 0.5 + letterIndex * 0.1
                          },
                          opacity: { duration: 0.5, delay: 0.2 + wordIndex * 0.1 + letterIndex * 0.05 }
                        }
                      }}
                      whileHover={{
                        y: -6,
                        scale: 1.2,
                        rotate: letterIndex % 2 === 0 ? 5 : -5,
                        transition: {
                          type: "spring",
                          stiffness: 500,
                          damping: 20,
                          delay: letterIndex * 0.03
                        }
                      }}
                      whileTap={{
                        scale: 0.9,
                        transition: { duration: 0.1 }
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.div>
              ))}
            </motion.div>
          </Link>
        </div>

        {/* Centered Desktop Menu */}
        <LayoutGroup>
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-3 rounded-full border border-slate-200/60 bg-white/75 px-6 py-1.5 shadow-[0_15px_38px_-28px_rgba(15,23,42,0.3)] backdrop-blur">
            <nav className="flex items-center gap-3 text-xs font-semibold text-slate-600">
              <DesktopLink to="/">Home</DesktopLink>
              <span className="h-4 w-px bg-indigo-100/70" />
              <DesktopLink to="/about">About Us</DesktopLink>
              <span className="h-4 w-px bg-indigo-100/70" />

              <Dropdown label="Sports Wear" items={sportsWear} />
              <span className="h-4 w-px bg-indigo-100/70" />
              <Dropdown label="Team Accessories" items={accessories} />
              <span className="h-4 w-px bg-indigo-100/70" />

              <DesktopLink to="/custom">Custom Orders</DesktopLink>
              <span className="h-4 w-px bg-indigo-100/70" />
              <DesktopLink to="/contact">Contact Us</DesktopLink>
            </nav>
          </div>
        </LayoutGroup>

        {/* Contact on the right */}
        <div className="hidden md:flex items-center gap-4">
          <motion.a
            href="https://wa.me/923039200750"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-semibold text-indigo-700 hover:text-indigo-800 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
              <FaWhatsapp className="text-sm" />
            </div>
            <span>+92-303-9200750</span>
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <motion.button
          onClick={toggleMobile}
          className="md:hidden inline-flex items-center justify-center rounded-full border border-indigo-200/70 bg-white/85 px-3 py-2 text-indigo-600 shadow-sm backdrop-blur"
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
        >
          {mobileOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
        </motion.button>
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
            className="relative mx-auto w-full max-w-7xl px-4 pb-6"
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
                <MobileLink to="/about" onClick={() => setMobileOpen(false)}>About Us</MobileLink>

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

                <MobileLink to="/custom" onClick={() => setMobileOpen(false)}>Custom Orders</MobileLink>
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
    >
      <button
        className="flex items-center gap-1 text-xs font-semibold transition-colors hover:text-indigo-600"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {label}
        <FaChevronDown className={`text-xs mt-0.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute left-1/2 top-full z-50 mt-3 w-60 -translate-x-1/2"
          >
            <div className="overflow-hidden rounded-2xl border border-indigo-100 bg-white/95 shadow-2xl backdrop-blur">
              <div className="h-1 bg-gradient-to-r from-indigo-500/0 via-indigo-400/50 to-indigo-500/0" />
              <ul className="py-3">
                {items.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.to}
                      className="block px-5 py-2 text-sm text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DesktopLink = ({ to, children }) => (
  <NavLink to={to} className={({ isActive }) => 'relative whitespace-nowrap'}>
    {({ isActive }) => (
      <span
        className={`group relative inline-flex items-center px-3 py-2 text-sm font-semibold transition-colors ${
          isActive ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'
        }`}
      >
        <motion.span
          className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/0 via-indigo-500/20 to-indigo-500/0 opacity-0"
          initial={false}
          whileHover={{ opacity: 1, scale: 1 }}
          whileTap={{ opacity: 1, scale: 0.96 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        />
        <motion.span
          className="pointer-events-none absolute inset-0 rounded-full bg-indigo-500/15 blur-xl opacity-0"
          initial={false}
          whileHover={{ opacity: 0.55, scale: 1.05 }}
          whileTap={{ opacity: 0.75, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
        <span>{children}</span>
        <motion.span
          layoutId="desktopNavGlow"
          className="pointer-events-none absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-gradient-to-r from-indigo-500 via-sky-400 to-purple-500"
          initial={false}
          animate={{
            opacity: isActive ? 1 : 0,
            scaleX: isActive ? 1 : 0,
          }}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
        />
        {!isActive && (
          <motion.span
            className="pointer-events-none absolute inset-0 rounded-full bg-indigo-500/0 blur-md"
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 0.15 }}
            transition={{ duration: 0.25 }}
          />
        )}
      </span>
    )}
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
          className="mt-2 space-y-2 overflow-hidden pl-1"
        >
          {items.map((sub, j) => (
            <motion.li key={j} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: j * 0.02 }}>
              <Link
                to={sub.to}
                onClick={onNavigate}
                className="flex items-center justify-between rounded-lg border border-indigo-100 bg-white px-3 py-2 text-sm text-indigo-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50"
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
