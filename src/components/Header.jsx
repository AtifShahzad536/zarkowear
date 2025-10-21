import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';

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

const linkBase = 'flex items-center justify-between rounded-xl border border-indigo-100 bg-white px-4 py-3 text-sm font-semibold text-indigo-700 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50';

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
      className="sticky top-0 z-50 border-b border-indigo-100/70 bg-white/90 backdrop-blur"
    >
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500/0 via-indigo-500/40 to-indigo-500/0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.6 }}
      />
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="relative inline-flex items-center gap-3">
          <Link to="/" className="text-2xl font-extrabold tracking-tight text-indigo-600">
            ZarkoSportswear
          </Link>
          <motion.span
            className="h-2 w-2 rounded-full bg-indigo-500/80 shadow-[0_0_12px_rgba(79,70,229,0.6)]"
            animate={{ scale: [1, 1.35, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            aria-hidden
          />
        </div>

        {/* Desktop Menu */}
        <LayoutGroup>
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600">
            <DesktopLink to="/">Home</DesktopLink>
            <DesktopLink to="/about">About Us</DesktopLink>

            <Dropdown label="Sports Wear" items={sportsWear} />
            <Dropdown label="Team Accessories" items={accessories} />

            <DesktopLink to="/custom">Custom Orders</DesktopLink>
            <DesktopLink to="/contact">Contact Us</DesktopLink>
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/custom"
                className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-gradient-to-r from-indigo-500/20 via-white to-indigo-500/20 px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm transition hover:border-indigo-300 hover:bg-white"
              >
                Start a Brief
              </Link>
            </motion.div>
          </nav>
        </LayoutGroup>

        {/* Mobile Toggle */}
        <motion.button
          onClick={toggleMobile}
          className="md:hidden inline-flex items-center justify-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-2 text-indigo-600 shadow-sm"
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
              className="rounded-3xl border border-indigo-100 bg-white p-5 shadow-2xl"
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
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="flex items-center gap-1 text-sm font-semibold transition-colors hover:text-indigo-600"
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
  <NavLink to={to} className={({ isActive }) => 'relative'}>
    {({ isActive }) => (
      <span className={`relative inline-flex items-center px-2 py-2 text-sm font-semibold transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}>
        <span>{children}</span>
        <AnimatePresence>
          {isActive && (
            <motion.span
              layoutId="desktopNavUnderline"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="absolute -bottom-0.5 left-2 right-2 h-0.5 rounded-full bg-indigo-500"
              transition={{ type: 'spring', stiffness: 360, damping: 30 }}
            />
          )}
        </AnimatePresence>
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
