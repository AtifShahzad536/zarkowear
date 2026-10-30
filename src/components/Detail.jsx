import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { imageUrl, getCategories, submitContactInquiry } from '../services/api';
import toast from 'react-hot-toast';
import SizeChartModal from './SizeChartModal';
import SeoHead from './SeoHead';
import ProductCard from './ProductCard';
import { categoryConfigs } from '../data/categories';
import {
  FaWhatsapp,
  FaArrowRight,
  FaCube,
  FaShareAlt,
  FaFileAlt,
  FaComments,
  FaEye,
  FaFacebookF,
  FaTwitter,
  FaEnvelope,
  FaSpinner,
  FaPaperPlane,
  FaExternalLinkAlt
} from 'react-icons/fa';
import {
  FiCheckCircle,
  FiChevronRight,
  FiArrowLeft,
  FiShield,
  FiClock,
  FiCheck,
  FiX,
  FiCopy
} from 'react-icons/fi';

const defaultProduct = {
  name: 'Complete Squad Custom Teamwear Bundle',
  image: '/images/hero_football.webp',
  description: 'End-to-end bespoke bundle: Sublimated match jersey, match shorts, warm-up tee, tracksuit, and kit bag.',
  details: [
    '240–260 GSM Heavyweight Pro-Interlock Fabric',
    'NFHS & NCAA Uniform Regulations Compliant',
    '4K Full Digital Italian Dye-Sublimation (Zero Peel/Fade)',
    'Bar-tacked high stress points for maximum tear-resistance',
    'Includes Custom Team Name, Roster Numbers & Logos',
    'Low 15-Set Factory Minimum Order (MOQ)',
    'Turnaround: 2-3 Weeks after sample sign-off'
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'],
};

const cleanSlug = (name) => {
  if (!name) return '';
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
};

const COLOR_SCHEMES = [
  'Custom Team Pantone Matching',
  'Black / Gold',
  'Navy / White',
  'Royal / Silver',
  'Crimson / Dark Slate',
  'Emerald / Gold'
];

const CUSTOMIZATION_OPTIONS = [
  'Full 360° All-Over Digital Sublimation',
  '3D Silicone Heat-Transfer Crests & Badges',
  'High-Density Direct-To-Garment Embroidery',
  'Individual Player Name & Number Personalization',
  'Custom Woven Neck Labels & Recycled Kraft Hangtags',
  'Frosted Custom Ziplock Retail Polybags with Barcode Stickers'
];

const ProductDetail = () => {
  const { pathname, search, state } = useLocation();
  const navigate = useNavigate();

  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryMode, setInquiryMode] = useState('online'); // 'online' | 'whatsapp'
  const [inquiryLoading, setInquiryLoading] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(null);
  const [inquiryError, setInquiryError] = useState('');
  const [whatsappCustomNote, setWhatsappCustomNote] = useState('');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [quickViewSize, setQuickViewSize] = useState('L');
  const [quickViewVolume, setQuickViewVolume] = useState('15 Sets (MOQ)');

  const handleOpenInquiryModal = (mode = 'online') => {
    setInquiryMode(mode);
    setInquirySuccess(null);
    setInquiryError('');
    setIsInquiryModalOpen(true);
  };
  const [product, setProduct] = useState(defaultProduct);
  const [categoriesList, setCategoriesList] = useState([]);
  const [relatedProductsState, setRelatedProductsState] = useState([]);

  // Interactive selectors
  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedColorScheme, setSelectedColorScheme] = useState('Custom Team Pantone Matching');
  const [selectedQty, setSelectedQty] = useState('15 Sets (MOQ)');

  // Load categories & products from DB for lookup and recommendations
  useEffect(() => {
    getCategories()
      .then((data) => {
        if (Array.isArray(data)) {
          setCategoriesList(data);
        }
      })
      .catch((err) => console.error('Failed to load categories in Detail page:', err));
  }, []);

  // Resolve Product from state, query parameter, or DB
  useEffect(() => {
    // 1. Resolve from router state if available
    if (state?.product) {
      setProduct(state.product);
      window.scrollTo(0, 0);
      return;
    }
    if (state && state.name) {
      setProduct(state);
      window.scrollTo(0, 0);
      return;
    }

    // 2. Resolve from search query parameter (?product=...)
    const query = new URLSearchParams(search);
    const productQuery = (query.get('product') || '').toLowerCase().trim();

    if (!productQuery) {
      setProduct(defaultProduct);
      window.scrollTo(0, 0);
      return;
    }

    let foundProduct = null;

    // Check backend categories first
    for (const cat of categoriesList) {
      if (Array.isArray(cat.products)) {
        const p = cat.products.find(
          item =>
            (item.id && item.id.toLowerCase() === productQuery) ||
            cleanSlug(item.name) === productQuery ||
            item.name?.toLowerCase() === productQuery
        );
        if (p) {
          foundProduct = { ...p, categorySlug: cat.slug, sport: cat.name };
          break;
        }
      }
    }

    // Fallback to static categoryConfigs
    if (!foundProduct) {
      for (const catKey in categoryConfigs) {
        const cat = categoryConfigs[catKey];
        if (cat.featured && (cleanSlug(cat.featured.name) === productQuery || cat.featured.name?.toLowerCase() === productQuery)) {
          foundProduct = { ...cat.featured, categorySlug: catKey };
          break;
        }
        const p = cat.products?.find(
          item => cleanSlug(item.name) === productQuery || item.name?.toLowerCase() === productQuery
        );
        if (p) {
          foundProduct = { ...p, categorySlug: catKey };
          break;
        }
      }
    }

    setProduct(foundProduct || defaultProduct);
    window.scrollTo(0, 0);
  }, [pathname, search, state, categoriesList]);

  // Derive sport name and category link
  const sportInfo = useMemo(() => {
    const lower = (product.name + ' ' + (product.categorySlug || '')).toLowerCase();
    if (lower.includes('football')) return { name: 'American Football', slug: 'football' };
    if (lower.includes('baseball')) return { name: 'Baseball', slug: 'baseball' };
    if (lower.includes('softball')) return { name: 'Softball', slug: 'softball' };
    if (lower.includes('soccer')) return { name: 'Soccer', slug: 'soccer' };
    if (lower.includes('basketball')) return { name: 'Basketball', slug: 'basketball' };
    if (lower.includes('volleyball')) return { name: 'Volleyball', slug: 'volleyball' };
    if (lower.includes('ice-hockey') || lower.includes('hockey')) return { name: 'Ice Hockey', slug: 'ice-hockey' };
    if (lower.includes('cricket')) return { name: 'Cricket', slug: 'cricket' };
    if (lower.includes('wrestling')) return { name: 'Wrestling', slug: 'wrestling' };
    if (lower.includes('gym')) return { name: 'Gym & Fitness', slug: 'gym' };
    if (lower.includes('running')) return { name: 'Running', slug: 'running' };
    if (lower.includes('tennis')) return { name: 'Tennis', slug: 'tennis' };
    if (lower.includes('rugby')) return { name: 'Rugby', slug: 'rugby' };
    if (lower.includes('caps')) return { name: 'Headwear & Caps', slug: 'caps' };
    if (lower.includes('bags')) return { name: 'Sports Bags', slug: 'bags' };
    return { name: 'Custom Teamwear', slug: product.categorySlug || 'football' };
  }, [product]);

  // Compute related recommendations
  useEffect(() => {
    const allProds = [];
    categoriesList.forEach((cat) => {
      if (Array.isArray(cat.products)) {
        cat.products.forEach((p) => {
          if (p.name !== product.name) {
            allProds.push({ ...p, categorySlug: cat.slug });
          }
        });
      }
    });

    if (allProds.length > 0) {
      const sameCat = allProds.filter(p => p.categorySlug === sportInfo.slug);
      const others = allProds.filter(p => p.categorySlug !== sportInfo.slug);
      const combined = [...sameCat, ...others.sort(() => 0.5 - Math.random())];
      setRelatedProductsState(combined.slice(0, 4));
    }
  }, [categoriesList, product, sportInfo]);

  const displayImage = imageUrl(product.image || '/images/hero_football.webp', { width: 1200, quality: 'auto:best' });

  // Instant WhatsApp Quote Action
  const handleWhatsAppQuote = (customMsg = '') => {
    const waNumber = '923039200750';
    const message =
      `*Official Custom Teamwear Inquiry - Zarko Sportswear*\n\n` +
      `*Product:* ${product.name}\n` +
      `*Sport / Category:* ${sportInfo.name}\n` +
      `*Selected Size:* ${selectedSize}\n` +
      `*Color Scheme:* ${selectedColorScheme}\n` +
      `*Target Volume:* ${selectedQty}\n` +
      (customMsg ? `*Notes:* ${customMsg}\n` : '') +
      `\nHello! I would like to get a factory-direct quote and request a 12-hour digital mockup proof for my team.`;

    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  const copyToClipboard = async (textToCopy) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedLink(true);
      toast.success('Product link copied to clipboard!', { icon: '🔗' });
      setTimeout(() => setCopiedLink(false), 2500);
      return true;
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error('Failed to copy link. Please copy the URL manually.');
      return false;
    }
  };

  const handleShare = async () => {
    const currentUrl = window.location.href;
    const shareData = {
      title: `${product.name} | Zarko Sportswear`,
      text: `Check out custom ${product.name} on Zarko Sportswear:`,
      url: currentUrl,
    };

    if (navigator.share && /mobile|android|iphone|ipad/i.test(navigator.userAgent)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if (err.name === 'AbortError') return;
      }
    }

    copyToClipboard(currentUrl);
    setIsShareModalOpen(true);
  };

  const handleOpenProductFromQuickView = (p) => {
    setProduct(p);
    setQuickViewProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/detail?product=${encodeURIComponent(p.id || cleanSlug(p.name))}`, {
      state: { product: p },
      replace: false
    });
  };

  // Handle Online Form Submission to Backend
  const handleSubmitInquiry = async (e) => {
    e.preventDefault();
    setInquiryLoading(true);
    setInquiryError('');

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData.entries());

    const formattedSpecs = [
      `🎯 PRODUCT: ${product.name}`,
      `📏 SIZE: ${selectedSize}`,
      `🎨 COLORWAY: ${selectedColorScheme}`,
      `🔢 ESTIMATED QUANTITY: ${data.quantity || selectedQty}`,
      `📍 SHIPPING DESTINATION: ${data.address || 'Not Specified'}`,
      `🏢 CLUB / ORGANIZATION: ${data.company || 'Not Specified'}`,
      `----------------------------------------`,
      `📝 REQUIREMENTS & SPECIFICATIONS:`,
      data.message || 'No additional specifications provided.'
    ].join('\n');

    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company || data.address || '',
      message: formattedSpecs,
      type: 'product_inquiry',
      sport: sportInfo.name,
      quantity: data.quantity || selectedQty
    };

    try {
      await submitContactInquiry(payload);
      setInquirySuccess({
        name: data.name,
        email: data.email,
        phone: data.phone,
        product: product.name,
        quantity: data.quantity || selectedQty,
        summaryNote: formattedSpecs
      });
      toast.success('Inquiry submitted to factory successfully!', { icon: '✅' });
    } catch (err) {
      console.error('Inquiry submission error:', err);
      setInquiryError(err.message || 'Failed to submit online. Please message us directly on WhatsApp.');
      toast.error(err.message || 'Submission failed. Please try WhatsApp.', { icon: '⚠️' });
    } finally {
      setInquiryLoading(false);
    }
  };

  const pageTitle = `Custom ${product.name} | Factory-Direct Wholesale | Zarko Sportswear`;
  const pageDescription = `Order factory-direct custom ${product.name.toLowerCase()} for high schools, travel leagues, and clubs. Low 15-set MOQ, NFHS compliance, Italian 4K dye sublimation, and DDP express delivery to USA.`;
  const productSlug = cleanSlug(product.name);
  const canonicalUrl = `https://www.zarkosportswear.com/detail?product=${productSlug}`;

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        keywords={`custom ${product.name.toLowerCase()}, ${sportInfo.name.toLowerCase()} uniforms wholesale, custom sports jerseys USA, sialkot sportswear manufacturer, low moq teamwear`}
        openGraph={{
          'og:title': pageTitle,
          'og:description': pageDescription,
          'og:url': canonicalUrl,
          'og:type': 'product'
        }}
      />

      <main className="min-h-screen bg-[#FAFBFD] py-8 sm:py-12">
        <div className="max-w-[94%] xl:max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6">

          {/* ── BREADCRUMB & BACK NAVIGATION ── */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 border-b border-slate-200">
            <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 uppercase tracking-wider overflow-x-auto">
              <Link to="/" className="hover:text-slate-800 transition flex items-center gap-1.5">
                <span>← HOME</span>
              </Link>
              <span className="text-slate-300">/</span>
              <Link to={`/${sportInfo.slug}`} className="hover:text-slate-800 transition">
                {sportInfo.name.toUpperCase()}
              </Link>
              <span className="text-slate-300">/</span>
              <span className="text-slate-700 truncate max-w-xs">{product.name}</span>
            </nav>

            <Link
              to={`/${sportInfo.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition uppercase tracking-wider"
            >
              <FiArrowLeft className="text-xs" />
              <span>Back to {sportInfo.name}</span>
            </Link>
          </div>

          {/* ── MAIN TOP HERO PRODUCT SECTION (MATCHING SCREENSHOT 1) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* ── LEFT COLUMN: PURE WHITE IMAGE SHOWCASE & 2 TRUST BADGES ── */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Product Image Card - PURE WHITE BACKGROUND (#FFFFFF) & EXACT 5PX CORNER */}
              <div 
                className="relative border border-slate-200 p-8 sm:p-12 shadow-2xs overflow-hidden flex items-center justify-center min-h-[380px] sm:min-h-[460px] group"
                style={{ backgroundColor: '#ffffff', borderRadius: '5px' }}
              >
                {/* Floating Top Badge (Dark Pill Badge) */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span 
                    className="inline-flex items-center px-2.5 py-0.5 bg-slate-900 text-white text-[9.5px] font-semibold uppercase tracking-wider shadow-2xs"
                    style={{ borderRadius: '3px' }}
                  >
                    ZARKO INDUSTRIAL EXPORT SPEC
                  </span>
                </div>

                {/* Pure White Background Product Image Stage */}
                <div 
                  className="w-full h-full flex items-center justify-center cursor-pointer"
                  style={{ backgroundColor: '#ffffff' }}
                  onClick={() => setQuickViewProduct(product)}
                >
                  <img
                    src={displayImage}
                    alt={`${product.name} - Custom Team Uniform`}
                    title={`${product.name} - Custom Team Uniform`}
                    className="w-full max-h-[380px] sm:max-h-[440px] object-contain transform group-hover:scale-105 transition-transform duration-300 ease-out filter drop-shadow-[0_8px_18px_rgba(0,0,0,0.06)]"
                    style={{ backgroundColor: '#ffffff' }}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/images/placeholder.jpg';
                    }}
                  />
                </div>

                {/* Quick View Button on Main Image (Hover & Click) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setQuickViewProduct(product);
                  }}
                  className="absolute bottom-3.5 right-3.5 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 hover:bg-slate-900 text-slate-800 hover:text-white text-xs font-semibold uppercase tracking-wider shadow-sm border border-slate-200 transition-all duration-150 cursor-pointer backdrop-blur-xs"
                  style={{ borderRadius: '5px' }}
                  title="Quick View & High-Res Preview"
                >
                  <FaEye className="text-xs" />
                  <span>Quick View</span>
                </button>
              </div>

              {/* 2 Trust Mini-Cards Directly Below Image (Rounded 5px, Not Overly Bold) */}
              <div className="grid grid-cols-2 gap-3.5">
                <div 
                  className="bg-white p-3.5 border border-slate-200/80 flex items-center gap-3 shadow-2xs"
                  style={{ borderRadius: '5px' }}
                >
                  <div 
                    className="w-9 h-9 bg-slate-50 border border-slate-100 text-indigo-600 flex items-center justify-center shrink-0"
                    style={{ borderRadius: '5px' }}
                  >
                    <FiShield className="text-base" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase text-slate-800 block tracking-tight">ISO CERTIFIED</span>
                    <span className="text-[11px] text-slate-500 font-normal block">Export Quality Guarantee</span>
                  </div>
                </div>

                <div 
                  className="bg-white p-3.5 border border-slate-200/80 flex items-center gap-3 shadow-2xs"
                  style={{ borderRadius: '5px' }}
                >
                  <div 
                    className="w-9 h-9 bg-slate-50 border border-slate-100 text-indigo-600 flex items-center justify-center shrink-0"
                    style={{ borderRadius: '5px' }}
                  >
                    <FiClock className="text-base" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase text-slate-800 block tracking-tight">5–7 DAY SAMPLES</span>
                    <span className="text-[11px] text-slate-500 font-normal block">Fast 3D Prototyping</span>
                  </div>
                </div>
              </div>

            </div>

            {/* ── RIGHT COLUMN: PRODUCT INFO, ORDER SPECS & 3 ACTION BUTTONS ── */}
            <div className="lg:col-span-6 space-y-5">

              {/* Eyebrow & Share Link */}
              <div className="flex items-center justify-between">
                <span 
                  className="px-2.5 py-1 bg-indigo-50 border border-indigo-100 text-indigo-600 text-[11px] font-semibold uppercase tracking-wider"
                  style={{ borderRadius: '4px' }}
                >
                  {sportInfo.name.toUpperCase()} TEAMWEAR
                </span>

                <button
                  type="button"
                  onClick={handleShare}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 transition cursor-pointer uppercase tracking-wider ${
                    copiedLink
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80 bg-white'
                  }`}
                  style={{ borderRadius: '5px' }}
                  title="Share this product specification"
                >
                  {copiedLink ? (
                    <>
                      <FiCheck className="text-xs text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <FaShareAlt className="text-xs text-slate-500" />
                      <span>Share</span>
                    </>
                  )}
                </button>
              </div>

              {/* Product Title - Clean Elegant Font-Bold, Not Aggressive Font-Black */}
              <div>
                <h1
                  className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {product.name}
                </h1>

                <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  {product.description ||
                    'End-to-end bespoke teamwear: Sublimated match jersey, match shorts, warm-up tee, tracksuit, and kit bag engineered for professional athletic competition.'}
                </p>
              </div>

              {/* Wholesale Order Specifications Box (5px Corner, Balanced Typography) */}
              <div 
                className="bg-white p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-3.5"
                style={{ borderRadius: '5px' }}
              >
                <div>
                  <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400 block mb-1">
                    Minimum Order Quantity:
                  </span>
                  <p className="text-sm font-semibold text-slate-800">
                    15 Pieces per design / colorway <span className="text-xs font-normal text-indigo-600 lowercase">(sample orders available)</span>
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
                  <div>
                    <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 block mb-0.5">
                      Production Lead Time:
                    </span>
                    <span className="text-slate-700 font-normal">2 – 3 Weeks after sample sign-off</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 block mb-0.5">
                      Sample Lead Time:
                    </span>
                    <span className="text-slate-700 font-normal">5 – 7 Business Days</span>
                  </div>
                </div>
              </div>

              {/* 3 Big Action Buttons Row (Theme Matched: Navy / Outline / WhatsApp Emerald, 5px Corner) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                
                {/* Button 1: Request Inquiry (Theme Dark Slate) */}
                <button
                  type="button"
                  onClick={() => handleOpenInquiryModal('online')}
                  className="w-full py-3 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider transition-all duration-150 shadow-2xs flex items-center justify-center gap-1.5 active:scale-98 cursor-pointer"
                  style={{ borderRadius: '5px' }}
                >
                  <FaComments className="text-sm" />
                  <span>Request Inquiry</span>
                </button>

                {/* Button 2: Request Quote (Theme Outline) */}
                <button
                  type="button"
                  onClick={() => handleOpenInquiryModal('online')}
                  className="w-full py-3 px-3 bg-white hover:bg-slate-50 border border-slate-900 text-slate-900 text-xs font-semibold uppercase tracking-wider transition-all duration-150 shadow-2xs flex items-center justify-center gap-1.5 active:scale-98 cursor-pointer"
                  style={{ borderRadius: '5px' }}
                >
                  <FaFileAlt className="text-sm" />
                  <span>Request Quote</span>
                </button>

                {/* Button 3: WhatsApp Sales (Emerald Green with 03039200750) */}
                <button
                  type="button"
                  onClick={() => handleWhatsAppQuote()}
                  className="w-full py-3 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider transition-all duration-150 shadow-2xs flex items-center justify-center gap-1.5 active:scale-98 cursor-pointer"
                  style={{ borderRadius: '5px' }}
                >
                  <FaWhatsapp className="text-base" />
                  <span>WA: 03039200750</span>
                </button>
              </div>

              {/* 3D Customizer Link */}
              <div className="pt-0.5">
                <Link
                  to="/builder"
                  className="w-full py-2.5 px-4 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 text-indigo-700 text-xs font-medium uppercase tracking-wider transition flex items-center justify-center gap-2"
                  style={{ borderRadius: '5px' }}
                >
                  <FaCube className="text-xs" />
                  <span>Customize in 3D Team Studio Builder →</span>
                </Link>
              </div>

            </div>

          </div>

          {/* ── MIDDLE SECTION: SIZES, PMS COLORS & PRIVATE LABEL (MATCHING SCREENSHOT 2) ── */}
          <div className="mt-12 space-y-6">
            
            {/* 2-Columns: Sizes & Colors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Card 1: Available Size Scales */}
              <div 
                className="bg-white border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-3.5"
                style={{ borderRadius: '5px' }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Available Size Scales
                  </h3>
                  <button
                    onClick={() => setIsSizeChartOpen(true)}
                    className="text-[11px] font-semibold text-indigo-600 hover:underline uppercase tracking-wider cursor-pointer"
                  >
                    Size Guide
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'].map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[40px] py-1.5 px-2.5 text-xs font-medium uppercase tracking-wider transition cursor-pointer ${
                          isSelected
                            ? 'bg-slate-900 text-white shadow-2xs'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                        style={{ borderRadius: '5px' }}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-1.5">
                  <button
                    onClick={() => setIsSizeChartOpen(true)}
                    className="w-full py-2 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium uppercase tracking-wider transition cursor-pointer text-center"
                    style={{ borderRadius: '5px' }}
                  >
                    Custom Youth Sizes (YXS – YXL) & Sizing Charts
                  </button>
                </div>
              </div>

              {/* Card 2: Color Schemes & PMS Matching */}
              <div 
                className="bg-white border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-3.5"
                style={{ borderRadius: '5px' }}
              >
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Color Schemes & PMS Matching
                </h3>

                <div className="flex flex-wrap gap-1.5">
                  {COLOR_SCHEMES.map((color) => {
                    const isSelected = selectedColorScheme === color;
                    return (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColorScheme(color)}
                        className={`py-1.5 px-3 text-xs font-medium uppercase tracking-wider transition cursor-pointer ${
                          isSelected
                            ? 'bg-slate-900 text-white shadow-2xs'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                        style={{ borderRadius: '5px' }}
                      >
                        {color}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Card 3: Available Customization & Private Label Options (Screenshot 2) */}
            <div 
              className="bg-white border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-4"
              style={{ borderRadius: '5px' }}
            >
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Available Customization & Private Label Options
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-5">
                {CUSTOMIZATION_OPTIONS.map((option, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <div 
                      className="w-4 h-4 bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center shrink-0"
                      style={{ borderRadius: '3px' }}
                    >
                      <FiCheck className="text-[10px]" />
                    </div>
                    <span className="text-xs font-normal text-slate-600">
                      {option}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── DETAILED MANUFACTURING OVERVIEW (MATCHING SCREENSHOT 3) ── */}
          <div 
            className="mt-14 bg-white border border-slate-200/90 p-6 sm:p-8 shadow-2xs space-y-5"
            style={{ borderRadius: '5px' }}
          >
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-600 block mb-1">
                Factory Engineering
              </span>
              <h2
                className="text-lg sm:text-xl font-bold text-slate-900 uppercase tracking-tight"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Detailed Manufacturing Overview
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              End-to-end bespoke bundle: Sublimated match jersey, match shorts, warm-up tee, tracksuit, and kit bag. Manufactured at our ISO-certified industrial facility in Sialkot, Pakistan. Zarko Sportswear utilizes top-grade performance raw fabrics, precision computer-guided cutting tables, and heavy-duty 4-needle 6-thread flatlock stitching machines. Each garment undergoes strict 4-phase quality control inspection before packaging. Ideal for professional clubs, collegiate sports, national tournament teams, and private label sportswear distributors worldwide.
            </p>

            {/* 4 Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-4 border-t border-slate-100">
              <div 
                className="p-3.5 bg-slate-50 border border-slate-100 space-y-0.5"
                style={{ borderRadius: '5px' }}
              >
                <span className="text-[9.5px] font-medium text-slate-400 uppercase tracking-wider block">Raw Fabric</span>
                <span className="text-xs font-semibold text-slate-800 uppercase block">240–260 GSM Pro-Interlock</span>
              </div>
              <div 
                className="p-3.5 bg-slate-50 border border-slate-100 space-y-0.5"
                style={{ borderRadius: '5px' }}
              >
                <span className="text-[9.5px] font-medium text-slate-400 uppercase tracking-wider block">Printing Technology</span>
                <span className="text-xs font-semibold text-slate-800 uppercase block">Italian 4K Dye-Sublimation</span>
              </div>
              <div 
                className="p-3.5 bg-slate-50 border border-slate-100 space-y-0.5"
                style={{ borderRadius: '5px' }}
              >
                <span className="text-[9.5px] font-medium text-slate-400 uppercase tracking-wider block">Quality Assurance</span>
                <span className="text-xs font-semibold text-slate-800 uppercase block">4-Stage Export Inspection</span>
              </div>
              <div 
                className="p-3.5 bg-slate-50 border border-slate-100 space-y-0.5"
                style={{ borderRadius: '5px' }}
              >
                <span className="text-[9.5px] font-medium text-slate-400 uppercase tracking-wider block">Door-to-Door Delivery</span>
                <span className="text-xs font-semibold text-emerald-700 uppercase block">DDP Air Express to USA</span>
              </div>
            </div>
          </div>

          {/* ── RELATED CUSTOM TEAMWEAR ITEMS (MATCHING SCREENSHOT 3) ── */}
          {relatedProductsState.length > 0 && (
            <div className="mt-16 space-y-6">
              <div className="flex items-end justify-between border-b border-slate-200 pb-3">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-600 block mb-1">
                    Complete Your Team Bundle
                  </span>
                  <h3
                    className="text-lg sm:text-xl font-bold text-slate-900 uppercase tracking-tight"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Related Custom Teamwear Items
                  </h3>
                </div>

                <Link
                  to={`/${sportInfo.slug}`}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-indigo-600 uppercase tracking-wider transition"
                >
                  <span>View All {sportInfo.name}</span>
                  <FaArrowRight className="text-[9px]" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {relatedProductsState.map((relProduct, idx) => (
                  <ProductCard
                    key={relProduct.id || `${relProduct.name}-${idx}`}
                    id={relProduct.id}
                    image={relProduct.image}
                    name={relProduct.name}
                    description={relProduct.description}
                    price={relProduct.price}
                    categorySlug={relProduct.categorySlug || sportInfo.slug}
                    sportName={sportInfo.name}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      {/* ── INQUIRY MODAL (DUAL MODE: CUSTOM ONLINE FORM OR WHATSAPP DIRECT) ── */}
      {isInquiryModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fade-in"
          onClick={() => setIsInquiryModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-lg bg-white p-5 sm:p-7 space-y-4 border border-slate-200 shadow-2xl my-auto"
            style={{ borderRadius: '5px' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsInquiryModalOpen(false)}
              className="absolute top-4 right-4 w-7 h-7 bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition cursor-pointer"
              style={{ borderRadius: '5px' }}
              title="Close"
            >
              <FiX className="text-sm" />
            </button>

            {/* Modal Header */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-[4px] border border-indigo-100/60">
                  Direct Factory Inquiry • Sialkot, PK
                </span>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-[4px] border border-emerald-100">
                  WA: 03039200750
                </span>
              </div>
              <h3 
                className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Inquiry & Custom Quote
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Product: <span className="font-semibold text-slate-800">{product.name}</span> ({selectedSize}, {selectedColorScheme})
              </p>
            </div>

            {/* 2-Option Selector Tabs: Custom Online Form vs Direct WhatsApp */}
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-[5px]">
              <button
                type="button"
                onClick={() => setInquiryMode('online')}
                className={`py-2 px-3 text-xs font-semibold uppercase tracking-wider transition rounded-[4px] flex items-center justify-center gap-1.5 cursor-pointer ${
                  inquiryMode === 'online'
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <FaFileAlt className="text-xs" />
                <span>Custom / Online Form</span>
              </button>
              <button
                type="button"
                onClick={() => setInquiryMode('whatsapp')}
                className={`py-2 px-3 text-xs font-semibold uppercase tracking-wider transition rounded-[4px] flex items-center justify-center gap-1.5 cursor-pointer ${
                  inquiryMode === 'whatsapp'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <FaWhatsapp className="text-sm" />
                <span>Direct WhatsApp</span>
              </button>
            </div>

            {/* ── OPTION 1: CUSTOM ONLINE INQUIRY FORM ── */}
            {inquiryMode === 'online' && (
              <>
                {inquirySuccess ? (
                  /* Success Confirmation View */
                  <div className="py-4 space-y-4 text-center animate-fade-in">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <FiCheckCircle className="text-2xl" />
                    </div>
                    <div className="space-y-1">
                      <h4 
                        className="text-base font-bold text-slate-900 tracking-tight"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        Inquiry Submitted Successfully!
                      </h4>
                      <p className="text-xs text-slate-600 max-w-sm mx-auto">
                        Thank you, <strong className="text-slate-900">{inquirySuccess.name}</strong>. Your custom inquiry for <strong className="text-slate-900">{inquirySuccess.product}</strong> has been logged in our factory system.
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Our production team will contact you at <span className="font-semibold text-slate-700">{inquirySuccess.email}</span> with a custom 3D digital mockup & pricing breakdown within 24 hours.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-200 text-left text-xs space-y-1.5" style={{ borderRadius: '5px' }}>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-normal">Requested Quantity:</span>
                        <span className="font-semibold text-slate-900">{inquirySuccess.quantity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-normal">Contact Phone:</span>
                        <span className="font-semibold text-slate-900">{inquirySuccess.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-normal">Factory Direct WhatsApp:</span>
                        <span className="font-semibold text-emerald-700">+92-303-9200750</span>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-2">
                      <button
                        type="button"
                        onClick={() => handleWhatsAppQuote(`Inquiry Ref: ${inquirySuccess.name} (${inquirySuccess.email}) - ${inquirySuccess.product}`)}
                        className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition shadow-2xs cursor-pointer"
                        style={{ borderRadius: '5px' }}
                      >
                        <FaWhatsapp className="text-base" />
                        <span>Chat on WhatsApp (+92-303-9200750)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsInquiryModalOpen(false);
                          setInquirySuccess(null);
                        }}
                        className="py-2.5 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider transition cursor-pointer"
                        style={{ borderRadius: '5px' }}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Form Input View */
                  <form onSubmit={handleSubmitInquiry} className="space-y-3 animate-fade-in">
                    {inquiryError && (
                      <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-[5px]">
                        {inquiryError}
                      </div>
                    )}

                    <input
                      type="text"
                      name="name"
                      placeholder="Coach / Manager Full Name *"
                      required
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 text-xs font-normal text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition"
                      style={{ borderRadius: '5px' }}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <input
                        type="email"
                        name="email"
                        placeholder="Team / School Email *"
                        required
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 text-xs font-normal text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition"
                        style={{ borderRadius: '5px' }}
                      />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="WhatsApp / Phone (03039200750) *"
                        required
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 text-xs font-normal text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition"
                        style={{ borderRadius: '5px' }}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <input
                        type="text"
                        name="quantity"
                        defaultValue={selectedQty}
                        placeholder="Estimated Quantity (MOQ 15 Sets) *"
                        required
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 text-xs font-normal text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition"
                        style={{ borderRadius: '5px' }}
                      />
                      <input
                        type="text"
                        name="address"
                        placeholder="Shipping Destination (City & Country) *"
                        required
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 text-xs font-normal text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition"
                        style={{ borderRadius: '5px' }}
                      />
                    </div>

                    <input
                      type="text"
                      name="company"
                      placeholder="Club / Academy / Brand Name (Optional)"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 text-xs font-normal text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition"
                      style={{ borderRadius: '5px' }}
                    />

                    <textarea
                      name="message"
                      rows="3"
                      placeholder="Specify custom numbers, player names, Pantone color codes, logo placements, or required delivery deadline..."
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 text-xs font-normal text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition resize-none"
                      style={{ borderRadius: '5px' }}
                    ></textarea>

                    <button
                      type="submit"
                      disabled={inquiryLoading}
                      className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider transition-all duration-150 shadow-2xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                      style={{ borderRadius: '5px' }}
                    >
                      {inquiryLoading ? (
                        <>
                          <FaSpinner className="animate-spin text-sm" />
                          <span>Submitting Inquiry to Factory...</span>
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="text-xs" />
                          <span>Submit Online Factory Inquiry</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* Helpful navigation to dedicated Custom Order & Contact pages */}
                <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
                  <Link
                    to="/custom"
                    onClick={() => setIsInquiryModalOpen(false)}
                    className="hover:text-indigo-600 transition flex items-center gap-1 font-medium text-slate-700"
                  >
                    <span>Full Custom Orders & Tech Pack Upload</span>
                    <FaExternalLinkAlt className="text-[9px]" />
                  </Link>
                  <Link
                    to="/contact"
                    onClick={() => setIsInquiryModalOpen(false)}
                    className="hover:text-indigo-600 transition font-medium text-indigo-600"
                  >
                    Contact Us Page →
                  </Link>
                </div>
              </>
            )}

            {/* ── OPTION 2: DIRECT WHATSAPP INQUIRY ── */}
            {inquiryMode === 'whatsapp' && (
              <div className="space-y-4 animate-fade-in">
                <div className="p-4 bg-emerald-50/70 border border-emerald-100 rounded-[5px] space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                    <FaWhatsapp className="text-base text-emerald-600" />
                    <span>Direct Factory WhatsApp Line: +92-303-9200750</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Connect immediately with our export production team in Sialkot, Pakistan. Get instant quotes, fabric swatch videos, and 3D digital mockups on your phone.
                  </p>
                </div>

                {/* Specs Summary Box */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-[5px] text-xs space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Inquiry Summary:
                  </span>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Item:</span>
                    <span className="font-semibold text-slate-900">{product.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Size:</span>
                    <span className="font-semibold text-slate-900">{selectedSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Colorway:</span>
                    <span className="font-semibold text-slate-900">{selectedColorScheme}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Minimum Order (MOQ):</span>
                    <span className="font-semibold text-indigo-600">15 Sets / Design</span>
                  </div>
                </div>

                {/* Optional Note */}
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-slate-600">
                    Add optional instructions / team count:
                  </label>
                  <textarea
                    rows="2"
                    value={whatsappCustomNote}
                    onChange={(e) => setWhatsappCustomNote(e.target.value)}
                    placeholder="e.g. Need 25 sets for Varsity Team with custom numbers and crest logo..."
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 text-xs font-normal text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 transition resize-none"
                    style={{ borderRadius: '5px' }}
                  ></textarea>
                </div>

                {/* WhatsApp Action Button with 03039200750 */}
                <button
                  type="button"
                  onClick={() => {
                    handleWhatsAppQuote(whatsappCustomNote);
                    setIsInquiryModalOpen(false);
                  }}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider transition-all duration-150 shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
                  style={{ borderRadius: '5px' }}
                >
                  <FaWhatsapp className="text-base" />
                  <span>Start WhatsApp Chat (03039200750)</span>
                </button>

                {/* Navigation links */}
                <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
                  <Link
                    to="/custom"
                    onClick={() => setIsInquiryModalOpen(false)}
                    className="hover:text-indigo-600 transition flex items-center gap-1 font-medium text-slate-700"
                  >
                    <span>Upload Tech Pack on Custom Orders (/custom)</span>
                    <FaExternalLinkAlt className="text-[9px]" />
                  </Link>
                  <Link
                    to="/contact"
                    onClick={() => setIsInquiryModalOpen(false)}
                    className="hover:text-indigo-600 transition font-medium text-indigo-600"
                  >
                    Visit Contact Page →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── QUICK VIEW MODAL (ROUNDED 5PX WITH WHATSAPP 03039200750) ── */}
      {quickViewProduct && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-fade-in"
          onClick={() => setQuickViewProduct(null)}
        >
          <div 
            className="relative w-full max-w-3xl bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92vh] border border-slate-200"
            style={{ borderRadius: '5px' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-3 right-3 z-20 w-7 h-7 bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition cursor-pointer"
              style={{ borderRadius: '5px' }}
              title="Close"
            >
              <FiX className="text-sm" />
            </button>

            {/* Modal Left: Product Image with Pure White Background (#FFFFFF) */}
            <div 
              className="md:w-1/2 p-6 sm:p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 relative min-h-[260px]"
              style={{ backgroundColor: '#ffffff' }}
            >
              <img
                src={imageUrl(quickViewProduct.image || '/images/placeholder.jpg', { width: 800, quality: 'auto:best' })}
                alt={quickViewProduct.name}
                className="max-h-64 sm:max-h-72 object-contain filter drop-shadow-md"
                style={{ backgroundColor: '#ffffff' }}
              />
            </div>

            {/* Modal Right: Product Details & Fast Action */}
            <div className="md:w-1/2 p-5 sm:p-6 flex flex-col justify-between overflow-y-auto space-y-3.5">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between pr-8">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600">
                    ✦ {sportInfo.name.toUpperCase()} • CUSTOM OEM
                  </span>
                  <span 
                    className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-100"
                    style={{ borderRadius: '4px' }}
                  >
                    WA: 03039200750
                  </span>
                </div>

                <h3 
                  className="text-lg sm:text-xl font-bold text-slate-900 uppercase tracking-tight"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {quickViewProduct.name}
                </h3>
                <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                  {quickViewProduct.description || `Export-grade 240 GSM ${sportInfo.name.toLowerCase()} uniform with reinforced flatlock stitching, pad clearance, and vibrant 4K sublimation.`}
                </p>
              </div>

              {/* Specs Chips */}
              <div className="grid grid-cols-2 gap-1.5 text-[10px] font-semibold text-slate-700">
                <div className="p-2 bg-slate-50 border border-slate-100" style={{ borderRadius: '5px' }}>
                  <span className="text-slate-400 block text-[8.5px] uppercase font-normal">Fabric Tech</span>
                  <span className="font-semibold text-slate-900">240 GSM Interlock</span>
                </div>
                <div className="p-2 bg-slate-50 border border-slate-100" style={{ borderRadius: '5px' }}>
                  <span className="text-slate-400 block text-[8.5px] uppercase font-normal">Compliance</span>
                  <span className="font-semibold text-indigo-600">NFHS & NCAA Ready</span>
                </div>
                <div className="p-2 bg-slate-50 border border-slate-100" style={{ borderRadius: '5px' }}>
                  <span className="text-slate-400 block text-[8.5px] uppercase font-normal">Customization</span>
                  <span className="font-semibold text-slate-900">4K Dye-Sublimation</span>
                </div>
                <div className="p-2 bg-slate-50 border border-slate-100" style={{ borderRadius: '5px' }}>
                  <span className="text-slate-400 block text-[8.5px] uppercase font-normal">Min Order (MOQ)</span>
                  <span className="font-semibold text-slate-900">15 Sets / Design</span>
                </div>
              </div>

              {/* Interactive Sample Size Selector */}
              <div className="space-y-1">
                <span className="text-[9.5px] font-semibold uppercase tracking-wider text-slate-500">
                  Sample Sizing:
                </span>
                <div className="flex flex-wrap gap-1">
                  {['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setQuickViewSize(s)}
                      className={`px-2 py-0.5 text-[11px] font-medium border transition cursor-pointer ${
                        quickViewSize === s
                          ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                      style={{ borderRadius: '5px' }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Volume Selector */}
              <div className="space-y-1">
                <span className="text-[9.5px] font-semibold uppercase tracking-wider text-slate-500">
                  Estimated Volume:
                </span>
                <div className="grid grid-cols-2 gap-1">
                  {['15 Sets (MOQ)', '25 Sets', '50 Sets', '100+ Sets'].map((vol) => (
                    <button
                      key={vol}
                      onClick={() => setQuickViewVolume(vol)}
                      className={`p-1.5 text-center text-[11px] font-medium border transition cursor-pointer ${
                        quickViewVolume === vol
                          ? 'bg-indigo-50 border-indigo-600 text-indigo-700'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                      style={{ borderRadius: '5px' }}
                    >
                      {vol}
                    </button>
                  ))}
                </div>
              </div>

              {/* Modal Action Buttons with 03039200750 */}
              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={`https://wa.me/923039200750?text=${encodeURIComponent(`Hi Zarko Sportswear, I would like to order a quote for: ${quickViewProduct.name} in size ${quickViewSize} with target volume ${quickViewVolume}. Please share factory rates and mockups.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-2xs cursor-pointer"
                  style={{ borderRadius: '5px' }}
                >
                  <FaWhatsapp className="text-base" />
                  <span>Inquire on WhatsApp (03039200750)</span>
                </a>

                <button
                  type="button"
                  onClick={() => handleOpenProductFromQuickView(quickViewProduct)}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-semibold uppercase tracking-wider text-center transition cursor-pointer"
                  style={{ borderRadius: '5px' }}
                >
                  Open Full Specification Page →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── SHARE MODAL ── */}
      {isShareModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsShareModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-md bg-white p-6 space-y-4 shadow-2xl border border-slate-200"
            style={{ borderRadius: '5px' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsShareModalOpen(false)}
              className="absolute top-4 right-4 w-7 h-7 bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition cursor-pointer"
              style={{ borderRadius: '5px' }}
              title="Close"
            >
              <FiX className="text-sm" />
            </button>

            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-600 block mb-1">
                Share Product Specification
              </span>
              <h3 
                className="text-base sm:text-lg font-bold text-slate-900 tracking-tight"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Share {product.name}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Share this uniform spec sheet directly with your coach, athletic director, or team.
              </p>
            </div>

            {/* Quick Social Share Buttons */}
            <div className="grid grid-cols-4 gap-2.5 pt-2">
              {/* WhatsApp */}
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out ${product.name} on Zarko Sportswear: ${window.location.href}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-2.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 transition cursor-pointer group"
                style={{ borderRadius: '5px' }}
                title="Share on WhatsApp"
              >
                <FaWhatsapp className="text-xl group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-semibold mt-1">WhatsApp</span>
              </a>

              {/* Facebook */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-2.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 transition cursor-pointer group"
                style={{ borderRadius: '5px' }}
                title="Share on Facebook"
              >
                <FaFacebookF className="text-base group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-semibold mt-1.5">Facebook</span>
              </a>

              {/* Twitter / X */}
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Custom ${product.name} teamwear:`)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 transition cursor-pointer group"
                style={{ borderRadius: '5px' }}
                title="Share on X"
              >
                <FaTwitter className="text-base group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-semibold mt-1.5">X / Twitter</span>
              </a>

              {/* Email */}
              <a
                href={`mailto:?subject=${encodeURIComponent(`Custom Teamwear Spec: ${product.name}`)}&body=${encodeURIComponent(`Hi,\n\nCheck out this custom uniform spec sheet from Zarko Sportswear:\n${window.location.href}\n\nFeatures 240 GSM Pro-Interlock, NFHS compliance, and Italian 4K dye-sublimation.`)}`}
                className="flex flex-col items-center justify-center p-2.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 transition cursor-pointer group"
                style={{ borderRadius: '5px' }}
                title="Share via Email"
              >
                <FaEnvelope className="text-base group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-semibold mt-1.5">Email</span>
              </a>
            </div>

            {/* Direct Copy URL Bar */}
            <div className="pt-2">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                Or Copy Link
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  readOnly
                  value={window.location.href}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs text-slate-700 select-all focus:outline-none"
                  style={{ borderRadius: '5px' }}
                />
                <button
                  type="button"
                  onClick={() => copyToClipboard(window.location.href)}
                  className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider transition cursor-pointer shrink-0 flex items-center gap-1.5 ${
                    copiedLink
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                  style={{ borderRadius: '5px' }}
                >
                  {copiedLink ? (
                    <>
                      <FiCheck className="text-xs" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <FiCopy className="text-xs" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sizing Chart Modal */}
      <SizeChartModal
        isOpen={isSizeChartOpen}
        onClose={() => setIsSizeChartOpen(false)}
        categorySlug={sportInfo.slug}
      />
    </>
  );
};

export default ProductDetail;
