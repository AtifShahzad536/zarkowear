import React, { useEffect, useState, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaArrowRight,
  FaWhatsapp,
  FaGlobe,
  FaInstagram,
  FaFacebookF,
  FaShieldAlt,
  FaBolt,
  FaCheck
} from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';

// ── Original Top Announcement Bar with Social Links & Marquee ────────────────
const TopBar = () => {
  return (
    <div className="bg-indigo-950 text-white text-[11px] py-1.5 overflow-hidden relative border-b border-indigo-900/40">
      <style>{`
        @keyframes marquee-l2r {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-marquee-l2r {
          display: inline-flex;
          white-space: nowrap;
          animation: marquee-l2r 28s linear infinite;
        }
        .animate-marquee-l2r:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="w-full flex justify-center">
        <div className="animate-marquee-l2r flex items-center gap-10 font-medium uppercase tracking-wider text-[11px]">
          <span className="flex items-center gap-2 text-indigo-300">
            <FaShieldAlt className="text-xs text-indigo-400" />
            <span>Sialkot Factory Direct | Door-to-Door DDP Air Express to USA (All Duties Paid)</span>
          </span>
          <span className="flex items-center gap-2 text-emerald-300">
            <FaBolt className="text-xs text-emerald-400" />
            <span>Low 15-Set MOQ • 10-12 Days Production • Free 12h Digital Mockups</span>
          </span>
          <a
            href="https://wa.me/923039200750"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-green-400 transition-colors"
          >
            <FaWhatsapp className="text-sm text-green-400" />
            <span>WhatsApp: +92-303-9200750</span>
          </a>
          <a href="https://www.zarkosportswear.com/" className="flex items-center gap-1.5 hover:text-indigo-300 transition-colors">
            <FaGlobe className="text-sm text-indigo-400" />
            <span>www.zarkosportswear.com</span>
          </a>
          <a
            href="https://www.instagram.com/zarko_sports.wear/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-pink-400 transition-colors"
          >
            <FaInstagram className="text-sm text-pink-400" />
            <span>Instagram</span>
          </a>
          <a
            href="https://www.facebook.com/zarkosportswear"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-blue-400 transition-colors"
          >
            <FaFacebookF className="text-sm text-blue-400" />
            <span>Facebook</span>
          </a>
        </div>
      </div>
    </div>
  );
};

// ── Full-Width Mega Menu Data (Parent Categories with Sub-Categories) ─────────
const megaCategories = {
  sportsWear: {
    id: 'sportsWear',
    label: 'SPORTS WEAR',
    tagline: 'Professional Teamwear, Match Uniforms & Athletic Gear',
    viewAllTo: '/football',
    viewAllLabel: 'View All Sports Wear',
    parents: [
      {
        name: 'Baseball',
        to: '/baseball',
        subs: [
          { label: 'Full Button Jerseys', to: '/baseball?sub=Full Button Jerseys' },
          { label: 'Crew Neck Jerseys', to: '/baseball?sub=Crew Neck Jerseys' },
          { label: 'Piped Game Pants', to: '/baseball?sub=Pants' },
          { label: 'Cage Batting Jackets', to: '/baseball?sub=Cage Jackets' },
          { label: 'Pro Team Socks', to: '/baseball?sub=Socks' }
        ]
      },
      {
        name: 'Softball',
        to: '/softball',
        subs: [
          { label: 'Two Button Jerseys', to: '/softball?sub=Two Button Jerseys' },
          { label: 'Crew Neck Jerseys', to: '/softball?sub=Crew Neck Jerseys' },
          { label: 'Knickers Pants', to: '/softball?sub=Knickers Pants' },
          { label: 'Fastpitch Caps & Visors', to: '/softball?sub=Caps' },
          { label: 'Padded Sliding Shorts', to: '/softball?sub=Shorts' }
        ]
      },
      {
        name: 'American Football',
        to: '/football',
        subs: [
          { label: 'Elite Game Jerseys (Tackle Twill)', to: '/football?sub=Jerseys' },
          { label: 'Porthole Mesh Practice Jerseys', to: '/football?sub=Jerseys' },
          { label: 'Integrated 7-Pad Pants', to: '/football?sub=Pants' },
          { label: 'Slotted Game Pants', to: '/football?sub=Pants' },
          { label: 'Compression Padded Girdles', to: '/football?sub=Pants' },
          { label: 'Youth Tackle Football Kits', to: '/football?sub=Jerseys' }
        ]
      },
      {
        name: 'Basketball',
        to: '/basketball',
        subs: [
          { label: 'Pro Wide-Armhole Tops', to: '/basketball?sub=Tops' },
          { label: 'Team Game Shorts', to: '/basketball?sub=Shorts' },
          { label: 'Shooting Warm-up Shirts', to: '/basketball?sub=Tops' },
          { label: 'Snap-Down Warm-Up Suits', to: '/basketball?sub=Shorts' },
          { label: 'Youth Basketball Kits', to: '/basketball?sub=Tops' }
        ]
      },
      {
        name: 'Soccer',
        to: '/soccer',
        subs: [
          { label: 'Matchday Striker Jerseys', to: '/soccer?sub=Jerseys' },
          { label: 'Performance Match Shorts', to: '/soccer?sub=Shorts' },
          { label: 'Padded Goalkeeper Kits', to: '/soccer?sub=Jerseys' },
          { label: 'Club Training Tops & Bibs', to: '/soccer?sub=Jerseys' },
          { label: 'Soccer Travel Tracksuits', to: '/soccer?sub=Shorts' }
        ]
      },
      {
        name: 'Volleyball',
        to: '/volleyball',
        subs: [
          { label: 'Elite Sleeveless Jerseys', to: '/volleyball?sub=Sleeveless Tops' },
          { label: 'Active Long Sleeve Jerseys', to: '/volleyball?sub=Jerseys' },
          { label: 'Lateral Agility Shorts', to: '/volleyball?sub=Shorts' },
          { label: 'Training Compression Tops', to: '/volleyball?sub=Sleeveless Tops' },
          { label: 'Libero Contrast Uniforms', to: '/volleyball?sub=Jerseys' }
        ]
      },
      {
        name: 'Ice Hockey',
        to: '/ice-hockey',
        subs: [
          { label: 'Heavy Pro-Knit Sweaters', to: '/ice-hockey?sub=Jerseys' },
          { label: 'Practice Mesh Jerseys', to: '/ice-hockey?sub=Jerseys' },
          { label: 'Pro Team Player Socks', to: '/ice-hockey?sub=Jerseys' }
        ]
      },
      {
        name: 'Lacrosse',
        to: '/lacrosse',
        subs: [
          { label: 'Lacrosse Game Jerseys', to: '/lacrosse?sub=Jerseys' },
          { label: 'Lacrosse Team Shorts', to: '/lacrosse?sub=Shorts' },
          { label: 'Athletic Tank Tops', to: '/lacrosse?sub=Tanktops' },
          { label: 'Game Skorts', to: '/lacrosse?sub=Skorts' }
        ]
      },
      {
        name: 'Cricket & Rugby',
        to: '/cricket',
        subs: [
          { label: 'T20 Sublimated Color Jerseys', to: '/cricket?sub=T20 Jerseys' },
          { label: 'Test Match Dry-Fit Shirts', to: '/cricket?sub=Test Shirts' },
          { label: 'Cricket Match White Pants', to: '/cricket?sub=Match Pants' },
          { label: 'Rugby Sublimated Heavy Shirts', to: '/rugby?sub=Heavy Jerseys' },
          { label: 'Rugby Heavy-Duty Shorts', to: '/rugby?sub=Rugby Shorts' }
        ]
      },
      {
        name: 'Wrestling & Others',
        to: '/wrestling',
        subs: [
          { label: 'NFHS Certified Singlets', to: '/wrestling?sub=Singlets' },
          { label: '2-Piece Compression Sets', to: '/wrestling?sub=2-Piece Sets' },
          { label: 'Cheerleaders Uniform Sets', to: '/wrestling' },
          { label: 'Swimming & Water Polo Suits', to: '/wrestling' },
          { label: 'Netball Match Uniforms', to: '/wrestling' }
        ]
      }
    ]
  },
  streetwear: {
    id: 'streetwear',
    label: 'STREETWEAR',
    tagline: 'Urban Athletic Fashion, Cut & Sew Fleece and Lifestyle Streetwear',
    viewAllTo: '/streetwear',
    viewAllLabel: 'View All StreetWear',
    parents: [
      {
        name: 'Hoodies & Pullovers',
        to: '/streetwear?sub=Hoodies',
        subs: [
          { label: 'Custom Athletic Hoodies', to: '/streetwear?sub=Hoodies' },
          { label: 'Sleeveless Gym Hoodies', to: '/streetwear?sub=Sleeveless Hoodies' },
          { label: 'Hoodie Shirts (Shooting Shirts)', to: '/streetwear?sub=Hoodie Shirts' },
          { label: 'Half-Zip Pullovers', to: '/streetwear?sub=Pullovers' },
          { label: 'Heavyweight French Terry Hoodies', to: '/streetwear?sub=Hoodies' }
        ]
      },
      {
        name: 'Shirts & Casual Tops',
        to: '/streetwear?sub=Polo Shirts',
        subs: [
          { label: 'Performance Polo Shirts', to: '/streetwear?sub=Polo Shirts' },
          { label: 'Sublimated V-Neck Shirts', to: '/streetwear?sub=V Necks' },
          { label: 'Crew Neck Heavyweight Tees', to: '/streetwear?sub=Polo Shirts' },
          { label: 'Oversized Drop-Shoulder Tees', to: '/streetwear?sub=Polo Shirts' },
          { label: 'Streetwear Tank Tops', to: '/streetwear?sub=Polo Shirts' }
        ]
      },
      {
        name: 'Sweatshirts & Fleece',
        to: '/streetwear?sub=Sweatshirts',
        subs: [
          { label: 'Crewneck Sweatshirts', to: '/streetwear?sub=Sweatshirts' },
          { label: 'Custom Sweatsuits Combo', to: '/streetwear?sub=Tracksuits' },
          { label: 'Brushed Fleece Sweaters', to: '/streetwear?sub=Sweatshirts' },
          { label: 'Raglan Sleeve Sweatshirts', to: '/streetwear?sub=Sweatshirts' }
        ]
      },
      {
        name: 'Pants & Trousers',
        to: '/streetwear?sub=Tracksuits',
        subs: [
          { label: 'Athletic Joggers & Pants', to: '/streetwear?sub=Tracksuits' },
          { label: 'Heavy Fleece Sweatpants', to: '/streetwear?sub=Tracksuits' },
          { label: 'Cargo Streetwear Trousers', to: '/streetwear?sub=Tracksuits' },
          { label: 'Denim Jeans Pants', to: '/streetwear?sub=Tracksuits' }
        ]
      },
      {
        name: 'Shorts & Outerwear',
        to: '/streetwear?sub=Tracksuits',
        subs: [
          { label: 'Workout Training Shorts', to: '/streetwear?sub=Tracksuits' },
          { label: '3-Quarter Cargo Shorts', to: '/streetwear?sub=Tracksuits' },
          { label: 'Custom Denim Shorts', to: '/streetwear?sub=Tracksuits' },
          { label: 'Windbreaker Sets (Jacket & Pants)', to: '/streetwear?sub=Tracksuits' },
          { label: 'Complete Team Tracksuits', to: '/streetwear?sub=Tracksuits' }
        ]
      }
    ]
  },
  gymActive: {
    id: 'gymActive',
    label: 'GYM & ACTIVE',
    tagline: 'High-Performance Activewear, Compression Base Layers & Fitness Apparel',
    viewAllTo: '/gym',
    viewAllLabel: 'View All Gym & Active',
    parents: [
      {
        name: "Men's Tops & Tees",
        to: '/gym?sub=Tops & Tees',
        subs: [
          { label: 'Performance Training Tees', to: '/gym?sub=Tops & Tees' },
          { label: 'Gym Stringers & Tank Tops', to: '/gym?sub=Tops & Tees' },
          { label: 'Drop-Arm Workout Muscle Tees', to: '/gym?sub=Tops & Tees' },
          { label: 'Seamless Raglan Gym Tops', to: '/gym?sub=Tops & Tees' }
        ]
      },
      {
        name: "Men's Bottoms & Shorts",
        to: '/gym?sub=Shorts',
        subs: [
          { label: 'Workout Training Shorts', to: '/gym?sub=Shorts' },
          { label: 'Athletic Tapered Joggers', to: '/gym?sub=Shorts' },
          { label: '2-in-1 Compression Liner Shorts', to: '/gym?sub=Shorts' },
          { label: 'Gym Fleece Track Pants', to: '/gym?sub=Shorts' }
        ]
      },
      {
        name: 'Compression Gear',
        to: '/gym?sub=Compression Tights',
        subs: [
          { label: 'Long Sleeve Compression Tops', to: '/gym?sub=Compression Tights' },
          { label: 'Short Sleeve Muscle Shield Tops', to: '/gym?sub=Compression Tights' },
          { label: 'Full Length Compression Tights', to: '/gym?sub=Compression Tights' },
          { label: 'Padded Base Layer Girdles', to: '/gym?sub=Compression Tights' }
        ]
      },
      {
        name: "Women's Active Tops",
        to: '/gym?sub=Tops & Tees',
        subs: [
          { label: 'High-Support Sports Bras', to: '/gym?sub=Tops & Tees' },
          { label: 'Racerback Athletic Tank Tops', to: '/gym?sub=Tops & Tees' },
          { label: 'Breathable Dry-Fit Active Tees', to: '/gym?sub=Tops & Tees' },
          { label: 'Long Sleeve Seamless Crop Tops', to: '/gym?sub=Tops & Tees' }
        ]
      },
      {
        name: "Women's Bottoms & Tights",
        to: '/gym?sub=Shorts',
        subs: [
          { label: 'High-Waist Squat-Proof Leggings', to: '/gym?sub=Compression Tights' },
          { label: 'Biker & Running Workout Shorts', to: '/gym?sub=Shorts' },
          { label: 'Athletic Fitted Track Trousers', to: '/gym?sub=Shorts' },
          { label: 'Seamless Booty Contour Shorts', to: '/gym?sub=Shorts' }
        ]
      }
    ]
  },
  varsityJackets: {
    id: 'varsityJackets',
    label: 'VARSITY JACKETS',
    tagline: 'Custom Wool, Cowhide Leather, Satin & Cotton Fleece Letterman Outerwear',
    viewAllTo: '/custom',
    viewAllLabel: 'View All Varsity Jackets',
    parents: [
      {
        name: 'Wool & Genuine Leather',
        to: '/custom',
        subs: [
          { label: 'Melton Wool Body / Cowhide Leather Sleeves', to: '/custom' },
          { label: 'Chenille Letterman Embroidery & Patches', to: '/custom' },
          { label: 'Diamond Quilted Thermal Silk Lining', to: '/custom' },
          { label: 'Heavy Striped Rib-Knit Trims', to: '/custom' }
        ]
      },
      {
        name: 'Satin & Retro Styles',
        to: '/custom',
        subs: [
          { label: 'High-Gloss Retro Baseball Satin Jackets', to: '/custom' },
          { label: 'Matte Finish Lightweight Satin Letterman', to: '/custom' },
          { label: 'Sublimated All-Over Print Satin Jackets', to: '/custom' }
        ]
      },
      {
        name: 'Fleece & Casual Varsity',
        to: '/custom',
        subs: [
          { label: 'Heavyweight 380 GSM Cotton Fleece Jackets', to: '/custom' },
          { label: 'Contrast Raglan Sleeve Fleece Letterman', to: '/custom' },
          { label: 'Snap-Button Front Casual Campus Jackets', to: '/custom' }
        ]
      },
      {
        name: 'Bomber & Puffer Outerwear',
        to: '/custom',
        subs: [
          { label: 'MA-1 Military Reversible Bomber Jackets', to: '/custom' },
          { label: 'Winter Down Insulated Puffer Jackets', to: '/custom' },
          { label: 'Softshell Windproof Coaching Jackets', to: '/custom' }
        ]
      }
    ]
  },
  headwear: {
    id: 'headwear',
    label: 'HEADWEAR',
    tagline: 'Custom Embroidered Caps, Mesh Truckers, Beanies & Athletic Visors',
    viewAllTo: '/caps',
    viewAllLabel: 'View All Headwear',
    parents: [
      {
        name: 'Baseball & Snapback Caps',
        to: '/caps?sub=Snapback Caps',
        subs: [
          { label: 'Classic 6-Panel Structured Snapbacks', to: '/caps?sub=Snapback Caps' },
          { label: 'Flat Brim Pro Fit Team Caps', to: '/caps?sub=Snapback Caps' },
          { label: 'Curved Visor Low-Profile Dad Hats', to: '/caps?sub=Baseball Caps' },
          { label: '3D High-Density Puff Embroidery', to: '/caps?sub=Snapback Caps' }
        ]
      },
      {
        name: 'Trucker Mesh Caps',
        to: '/caps?sub=Baseball Caps',
        subs: [
          { label: 'High-Crown Foam Front Trucker Caps', to: '/caps?sub=Baseball Caps' },
          { label: 'Breathable Polyester Mesh Back Caps', to: '/caps?sub=Baseball Caps' },
          { label: 'Vintage Washed Cotton Trucker Caps', to: '/caps?sub=Baseball Caps' }
        ]
      },
      {
        name: 'Visors & Bucket Hats',
        to: '/caps?sub=Visors',
        subs: [
          { label: 'Performance Running & Tennis Visors', to: '/caps?sub=Visors' },
          { label: 'Laser-Perforated Quick-Dry Caps', to: '/caps?sub=Visors' },
          { label: '360° Custom Sublimated Bucket Hats', to: '/caps?sub=Baseball Caps' },
          { label: 'Wide-Brim Sun Protection Boonie Hats', to: '/caps?sub=Visors' }
        ]
      },
      {
        name: 'Knit Beanies & Cold Gear',
        to: '/caps?sub=Beanies',
        subs: [
          { label: 'Fold-Over Cuff Winter Knit Beanies', to: '/caps?sub=Beanies' },
          { label: 'Fleece-Lined Thermal Team Beanies', to: '/caps?sub=Beanies' },
          { label: 'Pom-Pom Jacquard Striped Ski Hats', to: '/caps?sub=Beanies' }
        ]
      }
    ]
  },
  workwear: {
    id: 'workwear',
    label: 'WORKWEAR',
    tagline: 'ANSI Certified Hi-Vis Safety, Industrial Uniforms & Heavy-Duty Work Apparel',
    viewAllTo: '/custom',
    viewAllLabel: 'View All Workwear',
    parents: [
      {
        name: 'High-Visibility & Safety',
        to: '/custom',
        subs: [
          { label: 'ANSI Class 2 & 3 Hi-Vis Safety Jackets', to: '/custom' },
          { label: 'Breathable Mesh Reflective Safety Vests', to: '/custom' },
          { label: '3M Scotchlite Reflective Striping Wear', to: '/custom' },
          { label: 'High-Vis Sublimated Polo Work Shirts', to: '/custom' }
        ]
      },
      {
        name: 'Pants & Heavy Coveralls',
        to: '/custom',
        subs: [
          { label: 'Heavy-Duty Multi-Pocket Cargo Work Pants', to: '/custom' },
          { label: 'Reinforced Knee Pad Heavy Work Trousers', to: '/custom' },
          { label: 'Industrial 100% Cotton Work Coveralls', to: '/custom' },
          { label: 'Heavy Twill Mechanic Boiler Suits', to: '/custom' }
        ]
      },
      {
        name: 'Tactical & Protective',
        to: '/custom',
        subs: [
          { label: 'Tactical Security & Enforcement Uniforms', to: '/custom' },
          { label: 'Ripstop BDU Field Combat Shirts', to: '/custom' },
          { label: 'Flame Retardant (FR) Industrial Shirts', to: '/custom' }
        ]
      }
    ]
  },
  accessories: {
    id: 'accessories',
    label: 'ACCESSORIES',
    tagline: 'Athletic Footwear, Grip Gloves, Equipment Bags & Team Match Accessories',
    viewAllTo: '/shoes',
    viewAllLabel: 'View All Accessories',
    parents: [
      {
        name: 'Performance Footwear',
        to: '/shoes',
        subs: [
          { label: 'Custom Turf Training Cleats', to: '/shoes?sub=Athletic Footwear' },
          { label: 'Indoor Court Grip Athletic Shoes', to: '/shoes?sub=Athletic Footwear' },
          { label: 'Speed Running Performance Shoes', to: '/shoes?sub=Athletic Footwear' },
          { label: 'Molded Field Spikes', to: '/shoes?sub=Athletic Footwear' }
        ]
      },
      {
        name: 'Grip & Protective Gloves',
        to: '/gloves',
        subs: [
          { label: 'Silicone Grip Football Receiver Gloves', to: '/gloves?sub=Training Gloves' },
          { label: 'Latex Palm Soccer Goalkeeper Gloves', to: '/gloves?sub=Goalkeeper Gloves' },
          { label: 'Padded Baseball Batting Gloves', to: '/gloves?sub=Batting Gloves' },
          { label: 'Rugby & Field Impact Mitts', to: '/gloves?sub=Training Gloves' }
        ]
      },
      {
        name: 'Team Bags & Sideline Gear',
        to: '/bags',
        subs: [
          { label: 'Heavy-Duty Team Equipment Duffles', to: '/bags?sub=Duffel Bags' },
          { label: 'Player Backpacks with Cleat Compartments', to: '/bags?sub=Backpacks' },
          { label: 'Compression Arm & Calf Sleeves', to: '/shoes?sub=Pro Socks' },
          { label: 'Elite Cushioned Team Match Socks', to: '/shoes?sub=Pro Socks' },
          { label: 'Custom Sublimated Sideline Towels', to: '/bags?sub=Team Gear Bags' }
        ]
      }
    ]
  },
  company: {
    id: 'company',
    label: 'COMPANY',
    tagline: 'Direct Sialkot Factory, B2B OEM Infrastructure & Exporter Credentials',
    viewAllTo: '/about',
    viewAllLabel: 'About Zarko Sportswear',
    parents: [
      {
        name: 'Factory & Manufacturing',
        to: '/about',
        subs: [
          { label: 'About Sialkot Export Facility', to: '/about' },
          { label: 'Factory Direct Production Line', to: '/about#factory' },
          { label: 'Door-to-Door DDP Air Express (USA)', to: '/about#shipping' },
          { label: 'SCCI & PSGMEA Registered Exporter', to: '/about#guarantee' }
        ]
      },
      {
        name: 'B2B Wholesale Services',
        to: '/custom',
        subs: [
          { label: 'OEM & Private Label Packaging', to: '/about#oem' },
          { label: 'Free 12h Digital & 3D Mockups', to: '/custom' },
          { label: 'Low 15-Set Minimum Order (MOQ)', to: '/custom' },
          { label: '100% Free Remake Defect Guarantee', to: '/about#guarantee' }
        ]
      },
      {
        name: 'Contact & Inquiries',
        to: '/contact',
        subs: [
          { label: 'Direct Factory Inquiries Desk', to: '/contact' },
          { label: 'Direct WhatsApp Line (+92-303-9200750)', to: 'https://wa.me/923039200750' },
          { label: 'Official Wholesale Price Quotation', to: '/custom' }
        ]
      }
    ]
  }
};

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null); // 'sportsWear' | 'streetwear' | etc.
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const timeoutRef = useRef(null);
  const location = useLocation();

  const toggleMobile = () => setMobileOpen((v) => !v);

  // Close menus on route change
  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
  }, [location.pathname]);

  const handleMouseEnter = (menuKey) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menuKey);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 180);
  };

  // Close mobile on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.header
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="sticky top-0 z-50 border-b border-slate-200/90 bg-white shadow-xs"
      style={{ backgroundColor: '#ffffff' }}
    >
      {/* Top Bar with Social Icons */}
      <TopBar />

      {/* Main Navigation Bar */}
      <div className="mx-auto flex max-w-[99%] 2xl:max-w-[1440px] items-center justify-between px-2 xl:px-4 h-[52px]">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-1 group flex-shrink-0 mr-1 xl:mr-2">
          <picture>
            <source srcSet="/new-logo.webp" type="image/webp" />
            <img
              src="/new-logo.webp"
              alt="Zarko Sportswear"
              title="Zarko Sportswear"
              width={36}
              height={36}
              className="h-7 xl:h-8 w-auto object-contain transition-transform group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = '/new-logo.png';
              }}
            />
          </picture>
          <span
            className="text-[16px] xl:text-[18px] font-black text-indigo-950 uppercase tracking-widest -ml-0.5"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            ARKO
          </span>
        </Link>

        {/* Desktop Navigation Links — Compact Font Size, Non-Bold, Animated Underline */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 2xl:gap-1.5 text-[10.5px] xl:text-[11px] 2xl:text-[12px] font-medium uppercase tracking-normal text-slate-700 whitespace-nowrap flex-shrink-0 h-full">
          {/* HOME */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative flex items-center h-full px-1.5 xl:px-2 transition-colors whitespace-nowrap flex-shrink-0 font-medium group ${
                isActive ? 'text-indigo-600' : 'text-slate-700 hover:text-indigo-600'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>Home</span>
                {/* Underline on Active / Hover */}
                <span
                  className={`absolute bottom-0 left-1.5 right-1.5 h-[2px] bg-indigo-600 transition-all duration-200 ${
                    isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                  }`}
                />
              </>
            )}
          </NavLink>

          {/* Mega Menu Triggers (Full-Screen Width Dropdowns with Sub-Categories) */}
          {Object.keys(megaCategories).map((key) => {
            const menu = megaCategories[key];
            const isOpen = activeMenu === key;

            return (
              <div
                key={key}
                className="relative flex-shrink-0 h-full flex items-center"
                onMouseEnter={() => handleMouseEnter(key)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Trigger Button with Underline on Hover & Open */}
                <button
                  onClick={() => setActiveMenu(isOpen ? null : key)}
                  className={`relative flex items-center gap-0.5 xl:gap-1 h-full px-1.5 xl:px-2 transition-colors whitespace-nowrap flex-shrink-0 outline-none font-medium group ${
                    isOpen ? 'text-indigo-600' : 'text-slate-700 hover:text-indigo-600'
                  }`}
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                >
                  <span>{menu.label}</span>
                  <FaChevronDown
                    className={`text-[7px] xl:text-[8px] transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-indigo-600' : 'text-slate-400 group-hover:text-indigo-600'
                    }`}
                  />
                  {/* Underline: NO bg change, purely clean line */}
                  <span
                    className={`absolute bottom-0 left-1.5 right-1.5 h-[2px] bg-indigo-600 transition-all duration-200 ${
                      isOpen
                        ? 'opacity-100 scale-x-100'
                        : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                    }`}
                  />
                </button>
              </div>
            );
          })}

          {/* 3D CUSTOMIZER Direct Link (Clean, No BG Box) */}
          <NavLink
            to="/builder"
            className={({ isActive }) =>
              `relative flex items-center h-full px-1.5 xl:px-2 transition-colors whitespace-nowrap flex-shrink-0 font-medium group ${
                isActive ? 'text-indigo-600' : 'text-slate-700 hover:text-indigo-600'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>3D Customizer</span>
                <span
                  className={`absolute bottom-0 left-1.5 right-1.5 h-[2px] bg-indigo-600 transition-all duration-200 ${
                    isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                  }`}
                />
              </>
            )}
          </NavLink>
        </nav>

        {/* Right Side: Compact WhatsApp Direct Pill & Mobile Hamburger */}
        <div className="flex items-center gap-1.5 xl:gap-2 flex-shrink-0 ml-1">
          {/* WhatsApp Direct */}
          <motion.a
            href="https://wa.me/923039200750"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1 text-[11px] xl:text-xs font-semibold text-emerald-800 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-full transition shadow-2xs whitespace-nowrap flex-shrink-0"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaWhatsapp className="text-xs xl:text-sm text-emerald-600 flex-shrink-0" />
            <span className="hidden xl:inline">+92-303-9200750</span>
            <span className="xl:hidden">WhatsApp</span>
          </motion.a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMobile}
            className="lg:hidden inline-flex items-center justify-center rounded-lg p-1.5 text-slate-800 hover:bg-slate-100 transition border border-slate-200"
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <FaTimes className="text-base" /> : <FaBars className="text-base" />}
          </button>
        </div>
      </div>

      {/* ── Soft Backdrop Dim Overlay ─────────────────────────────────────── */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 top-[88px] md:top-[94px] bg-slate-950/20 backdrop-blur-[1px] z-40 pointer-events-auto"
            onClick={() => setActiveMenu(null)}
          />
        )}
      </AnimatePresence>

      {/* ==================================================================== */}
      {/* 🚀 FULL SCREEN WIDTH DROPDOWNS WITH PARENT + SUB-CATEGORIES         */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {activeMenu && megaCategories[activeMenu] && (
          <motion.div
            key={activeMenu}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            onMouseEnter={() => handleMouseEnter(activeMenu)}
            onMouseLeave={handleMouseLeave}
            style={{ backgroundColor: '#ffffff' }}
            className="absolute top-full left-0 right-0 w-full bg-white border-b border-slate-200/90 shadow-[0_25px_50px_-12px_rgba(15,23,42,0.18)] z-50 overflow-hidden"
          >
            <div className="mx-auto max-w-[96%] 2xl:max-w-7xl px-4 lg:px-8 py-5 md:py-6">
              {/* Mega Categories Grid (Parents with Sub-Categories) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 items-start">
                {megaCategories[activeMenu].parents.map((parent, pIdx) => (
                  <div key={pIdx} className="space-y-2">
                    {/* Parent Category Header */}
                    <Link
                      to={parent.to}
                      onClick={() => setActiveMenu(null)}
                      className="text-xs font-bold uppercase tracking-wider text-slate-900 hover:text-indigo-600 block pb-1 border-b border-slate-100 group transition-colors"
                    >
                      <span className="flex items-center justify-between">
                        <span>{parent.name}</span>
                        <FaArrowRight className="text-[9px] text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
                      </span>
                    </Link>

                    {/* Sub-Categories List */}
                    <div className="space-y-1 pt-0.5">
                      {parent.subs.map((sub, sIdx) => (
                        <Link
                          key={sIdx}
                          to={sub.to}
                          onClick={() => setActiveMenu(null)}
                          className="block text-[11.5px] text-slate-600 hover:text-indigo-600 hover:translate-x-0.5 py-0.5 leading-snug transition-all"
                        >
                          • {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile Responsive Drawer ───────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="lg:hidden mx-auto w-full max-w-[96%] px-2 pb-6 max-h-[85vh] overflow-y-auto"
          >
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl space-y-3">
              {/* Top Banner */}
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Navigation
                </p>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                  Direct OEM Sialkot
                </span>
              </div>

              {/* Home */}
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-1.5 text-sm font-medium uppercase text-slate-900 hover:text-indigo-600 rounded-lg hover:bg-slate-50"
              >
                Home
              </Link>

              {/* Mobile Accordions for each Category */}
              <div className="space-y-1">
                {Object.keys(megaCategories).map((key) => {
                  const menu = megaCategories[key];
                  const isExpanded = mobileExpanded === key;

                  return (
                    <div key={key} className="border-b border-slate-100 pb-1">
                      <div className="flex items-center justify-between px-3 py-2">
                        <span className="text-xs font-medium uppercase tracking-wider text-slate-800">
                          {menu.label}
                        </span>
                        <button
                          onClick={() => setMobileExpanded(isExpanded ? null : key)}
                          className="p-1 text-slate-400 hover:text-indigo-600 text-xs"
                          aria-label={`Toggle ${menu.label}`}
                        >
                          <FaChevronDown
                            className={`transition-transform duration-200 ${
                              isExpanded ? 'rotate-180 text-indigo-600' : ''
                            }`}
                          />
                        </button>
                      </div>

                      {isExpanded && (
                        <div className="pl-4 pr-2 py-2 space-y-3 bg-slate-50/70 rounded-xl mb-1">
                          {menu.parents.map((parent, pIdx) => (
                            <div key={pIdx} className="space-y-1">
                              <Link
                                to={parent.to}
                                onClick={() => setMobileOpen(false)}
                                className="block text-xs font-bold text-slate-800 hover:text-indigo-600 uppercase"
                              >
                                {parent.name} →
                              </Link>
                              <div className="pl-2 space-y-0.5">
                                {parent.subs.map((sub, sIdx) => (
                                  <Link
                                    key={sIdx}
                                    to={sub.to}
                                    onClick={() => setMobileOpen(false)}
                                    className="block py-0.5 text-xs text-slate-600 hover:text-indigo-600"
                                  >
                                    • {sub.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                          <Link
                            to={menu.viewAllTo}
                            onClick={() => setMobileOpen(false)}
                            className="block pt-1.5 pb-0.5 text-xs font-bold text-indigo-600 hover:text-indigo-800"
                          >
                            {menu.viewAllLabel} →
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* 3D Customizer Link */}
              <div className="pt-2 border-t border-slate-100">
                <Link
                  to="/builder"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50/70 rounded-lg hover:bg-indigo-100"
                >
                  <span className="px-1.5 py-0.5 bg-indigo-600 text-white text-[9px] font-black rounded uppercase">
                    3D
                  </span>
                  <span>3D Customizer</span>
                </Link>
              </div>

              {/* WhatsApp Button Mobile */}
              <div className="pt-2">
                <a
                  href="https://wa.me/923039200750"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl text-xs font-semibold shadow-xs"
                >
                  <FaWhatsapp className="text-sm" />
                  <span>Chat on WhatsApp (+92-303-9200750)</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
