import React, { useMemo, useState } from 'react';
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
  const [moonHit, setMoonHit] = useState(false);

  const stars = useMemo(() => (
    Array.from({ length: 140 }).map(() => {
      const baseX = Math.random() * 100;
      const baseY = Math.random() * 100;
      const moveHorizontally = Math.random() > 0.5;
      const driftX = Math.random() * 6 + 4;
      const driftY = Math.random() * 6 + 4;
      return {
        baseX,
        baseY,
        radius: Math.random() * 2.4 + 0.8,
        opacity: Math.random() * 0.5 + 0.4,
        duration: 6 + Math.random() * 6,
        delay: Math.random() * 2,
        moveHorizontally,
        targetX: Math.max(baseX - driftX, 0),
        targetY: Math.min(baseY + driftY, 100),
      };
    })
  ), []);

  return (
    <footer className="relative w-full overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_55%)]" />
        <div className="absolute inset-0 opacity-60">
          <svg className="h-full w-full" preserveAspectRatio="none">
            <defs>
              <radialGradient id="footerStar" r="50%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </radialGradient>
              <linearGradient id="shootingTail" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(252, 211, 77, 0)" />
                <stop offset="40%" stopColor="rgba(252, 211, 77, 0.35)" />
                <stop offset="100%" stopColor="rgba(254, 243, 199, 0.8)" />
              </linearGradient>
              <radialGradient id="footerMoon" r="60%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.98)" />
                <stop offset="55%" stopColor="rgba(248,248,255,0.75)" />
                <stop offset="100%" stopColor="rgba(248,248,255,0.22)" />
              </radialGradient>
              <filter id="moonGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g opacity="0.95">
              <g
                className="cursor-pointer"
                style={{ pointerEvents: 'auto' }}
                onClick={() => {
                  setMoonHit(true);
                  setTimeout(() => setMoonHit(false), 1400);
                }}
              >
                <circle cx="92%" cy="36%" r="16" fill="url(#footerMoon)" filter="url(#moonGlow)">
                  <animate
                    attributeName="r"
                    values={moonHit ? '16;4;0' : '16;17.5;16'}
                    dur={moonHit ? '0.6s' : '6s'}
                    repeatCount={moonHit ? '1' : 'indefinite'}
                    begin={moonHit ? '0s' : '0s'}
                    fill={moonHit ? 'freeze' : 'remove'}
                  />
                  {moonHit && (
                    <animate
                      attributeName="opacity"
                      values="1;0"
                      dur="0.6s"
                      repeatCount="1"
                      begin="0s"
                      fill="freeze"
                    />
                  )}
                </circle>
                {!moonHit && <circle cx="90%" cy="34%" r="8" fill="rgba(30,41,59,0.55)" />}
                <circle cx="92%" cy="36%" r="16" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.4">
                  <animate
                    attributeName="r"
                    values={moonHit ? '16;36;16' : '16;28;16'}
                    dur={moonHit ? '1.2s' : '5s'}
                    repeatCount={moonHit ? '1' : 'indefinite'}
                    begin="0s"
                  />
                  <animate
                    attributeName="opacity"
                    values={moonHit ? '0.9;0;0.6' : '0;0.8;0'}
                    dur={moonHit ? '1.2s' : '5s'}
                    repeatCount={moonHit ? '1' : 'indefinite'}
                    begin="0s"
                  />
                </circle>
                {moonHit && (
                  <g>
                    <line
                      x1="79%"
                      y1="50%"
                      x2="105%"
                      y2="26%"
                      stroke="rgba(255,255,255,0.85)"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                    >
                      <animate attributeName="stroke-width" values="2.8;0" dur="0.4s" repeatCount="1" begin="0s" fill="freeze" />
                      <animate attributeName="opacity" values="1;0" dur="0.4s" repeatCount="1" begin="0s" fill="freeze" />
                    </line>
                    <circle cx="92%" cy="36%" r="0" fill="rgba(255,255,255,0.9)">
                      <animate attributeName="r" values="0;30;0" dur="1.1s" repeatCount="1" begin="0s" fill="freeze" />
                      <animate attributeName="opacity" values="1;0" dur="1.1s" repeatCount="1" begin="0s" fill="freeze" />
                    </circle>
                  </g>
                )}
              </g>
            </g>
            {stars.map((star, i) => (
              <circle
                key={i}
                r={star.radius}
                fill="url(#footerStar)"
                cx={`${star.baseX}%`}
                cy={`${star.baseY}%`}
                opacity={star.opacity}
              >
                <animate attributeName="opacity" values="0.3;0.85;0.3" dur={`${star.duration}s`} repeatCount="indefinite" begin={`${star.delay}s`} />
                {star.moveHorizontally ? (
                  <animate
                    attributeName="cx"
                    values={`${star.baseX}%;${star.targetX}%;${star.baseX}%`}
                    dur={`${star.duration + 2}s`}
                    repeatCount="indefinite"
                    begin={`${star.delay / 2}s`}
                  />
                ) : (
                  <animate
                    attributeName="cy"
                    values={`${star.baseY}%;${star.targetY}%;${star.baseY}%`}
                    dur={`${star.duration + 1.5}s`}
                    repeatCount="indefinite"
                    begin={`${star.delay / 2}s`}
                  />
                )}
              </circle>
            ))}
            <g>
              <line
                x1="40%"
                y1="90%"
                x2="70%"
                y2="90%"
                stroke="url(#shootingTail)"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <animate
                  attributeName="x1"
                  values="55%;40%"
                  dur="3.5s"
                  repeatCount="indefinite"
                  begin="1s"
                />
                <animate
                  attributeName="x2"
                  values="85%;70%"
                  dur="3.5s"
                  repeatCount="indefinite"
                  begin="1s"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;0"
                  dur="3.5s"
                  repeatCount="indefinite"
                  begin="1s"
                />
              </line>
              <circle cx="70%" cy="90%" r="2" fill="#fde68a">
                <animate
                  attributeName="cx"
                  values="55%;70%"
                  dur="3.5s"
                  repeatCount="indefinite"
                  begin="1s"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;0"
                  dur="3.5s"
                  repeatCount="indefinite"
                  begin="1s"
                />
              </circle>
            </g>
          </svg>
        </div>
      </div>
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