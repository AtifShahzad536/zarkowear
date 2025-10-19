import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';

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

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // 'sports' | 'accessories' | null

  const toggleMobile = () => setMobileOpen((v) => !v);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600">ZarkoSportsWear</Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          <NavLink to="/" className={({ isActive }) => `hover:text-indigo-600 ${isActive ? 'text-indigo-600' : ''}`}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => `hover:text-indigo-600 ${isActive ? 'text-indigo-600' : ''}`}>About Us</NavLink>

          <Dropdown label="Sports Wear" items={sportsWear} />
          <Dropdown label="Team Accessories" items={accessories} />

          <NavLink to="/custom" className={({ isActive }) => `hover:text-indigo-600 ${isActive ? 'text-indigo-600' : ''}`}>Custom Orders</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `hover:text-indigo-600 ${isActive ? 'text-indigo-600' : ''}`}>Contact Us</NavLink>
        </nav>

        {/* Mobile Toggle */}
        <button onClick={toggleMobile} className="md:hidden text-2xl text-indigo-600" aria-label="Toggle menu">
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-gray-700 font-medium border-t">
          <MobileLink to="/" onClick={() => setMobileOpen(false)}>Home</MobileLink>
          <MobileLink to="/about" onClick={() => setMobileOpen(false)}>About Us</MobileLink>

          {/* Sports Wear mobile dropdown */}
          <MobileDropdown
            label="Sports Wear"
            isOpen={openDropdown === 'sports'}
            toggle={() => setOpenDropdown(openDropdown === 'sports' ? null : 'sports')}
            items={sportsWear}
            onNavigate={() => setMobileOpen(false)}
          />

          {/* Accessories mobile dropdown */}
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
      )}
    </header>
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
        className="flex items-center gap-1 hover:text-indigo-600"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {label}
        <FaChevronDown className={`text-sm mt-0.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {/* Ensure no hover gap by anchoring to top-full and adding internal padding */}
      <div className={`absolute left-0 top-full pt-2 z-50 ${open ? 'block' : 'hidden'}`}>
        <div className="bg-white shadow-lg rounded-md">
          <ul className="py-2 w-56">
            {items.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.to}
                  className="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-600 whitespace-nowrap"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const MobileLink = ({ to, children, onClick }) => (
  <Link to={to} onClick={onClick} className="block py-2 hover:text-indigo-600">
    {children}
  </Link>
);

const MobileDropdown = ({ label, isOpen, toggle, items, onNavigate }) => (
  <div>
    <button
      onClick={toggle}
      className="w-full text-left font-semibold flex justify-between items-center py-2"
      aria-expanded={isOpen}
    >
      {label}
      <FaChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    {isOpen && (
      <ul className="pl-4 mt-1 space-y-1">
        {items.map((sub, j) => (
          <li key={j}>
            <Link to={sub.to} onClick={onNavigate} className="block py-1 hover:text-indigo-600">
              {sub.label}
            </Link>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default Header;
