import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { imageUrl, getCategories } from '../services/api';
import toast from 'react-hot-toast';
import SizeChartModal from './SizeChartModal';
import SeoHead from './SeoHead';
import { categoryConfigs } from '../data/categories';

const defaultProduct = {
  name: 'Premium Team Jersey',
  image: '/images/slide1.jpg',
  description: 'Designed for elite performance, this premium jersey features high-breathability mesh panels, moisture-wicking technology, and an athletic fit tailored for professionals.',
  details: [
    'Export-grade breathable dry-fit fabric',
    'Intense moisture-wicking technology',
    'Reinforced flatlock stitching for durability',
    'Fully customizable sublimated prints',
    'MOQ: 25 Units per design',
    'Fulfillment: 10-12 Days worldwide'
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
};

const cleanSlug = (name) => {
  if (!name) return '';
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
};

const ProductInquiry = () => {
  const { pathname, search, state } = useLocation();
  const navigate = useNavigate();
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [product, setProduct] = useState(defaultProduct);
  const [relatedProductsState, setRelatedProductsState] = useState([]);

  useEffect(() => {
    getCategories()
      .then((data) => {
        if (Array.isArray(data)) {
          const allProds = [];
          data.forEach(cat => {
            if (cat.featured) {
              allProds.push({ ...cat.featured, categorySlug: cat.slug });
            }
            if (Array.isArray(cat.products)) {
              cat.products.forEach(p => {
                allProds.push({ ...p, categorySlug: cat.slug });
              });
            }
          });

          const filtered = allProds.filter(p => p.name !== product?.name);
          if (filtered.length > 0) {
            const shuffled = filtered.sort(() => 0.5 - Math.random());
            setRelatedProductsState(shuffled.slice(0, 4));
          }
        }
      })
      .catch((err) => console.error('Failed to load related products from backend:', err));
  }, [product]);

  useEffect(() => {
    // 1. Try resolving product from state
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

    // 2. Try resolving product from search query ?product=slug
    const query = new URLSearchParams(search);
    const productSlug = query.get('product');
    let foundProduct = null;

    if (productSlug) {
      for (const catKey in categoryConfigs) {
        const cat = categoryConfigs[catKey];
        // Check featured product
        if (cat.featured && cleanSlug(cat.featured.name) === productSlug) {
          foundProduct = cat.featured;
          break;
        }
        // Check products list
        const prod = cat.products?.find(p => cleanSlug(p.name) === productSlug);
        if (prod) {
          foundProduct = prod;
          break;
        }
      }
    }

    setProduct(foundProduct || defaultProduct);
    window.scrollTo(0, 0);
  }, [pathname, search, state]);

  const displayImage = imageUrl(product.image || '/images/slide1.jpg');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Construct WhatsApp message
    const waNumber = '923039200750';
    const message = `*Product Inquiry*\n\n` +
      `*Product:* ${product.name}\n` +
      `*Name:* ${data.name}\n` +
      `*Email:* ${data.email}\n` +
      `*Phone:* ${data.phone}\n` +
      `*Address:* ${data.address}\n` +
      `*Details:* ${data.message}`;

    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
    toast.success('Inquiry submitted! Redirecting to WhatsApp...', { icon: '💬' });
  };

  const getSportAndType = (name) => {
    const lowerName = name.toLowerCase();
    let sport = 'Teamwear';
    if (lowerName.includes('football') || lowerName.includes('soccer')) sport = 'Football';
    else if (lowerName.includes('wrestling') || lowerName.includes('singlet')) sport = 'Wrestling';
    else if (lowerName.includes('cricket')) sport = 'Cricket';
    else if (lowerName.includes('basketball')) sport = 'Basketball';
    else if (lowerName.includes('baseball')) sport = 'Baseball';
    else if (lowerName.includes('softball')) sport = 'Softball';
    else if (lowerName.includes('volleyball')) sport = 'Volleyball';
    else if (lowerName.includes('hockey')) sport = 'Hockey';
    else if (lowerName.includes('gym') || lowerName.includes('fitness') || lowerName.includes('activewear')) sport = 'Gym & Fitness';

    let type = 'Uniforms';
    if (lowerName.includes('jersey')) type = 'Jerseys';
    else if (lowerName.includes('singlet')) type = 'Singlets';
    else if (lowerName.includes('shorts')) type = 'Shorts';
    else if (lowerName.includes('jacket') || lowerName.includes('windbreaker')) type = 'Jackets';
    else if (lowerName.includes('pants') || lowerName.includes('joggers')) type = 'Pants';
    else if (lowerName.includes('hoodie')) type = 'Hoodies';
    else if (lowerName.includes('glove')) type = 'Gloves';
    else if (lowerName.includes('cap')) type = 'Caps';
    else if (lowerName.includes('bag')) type = 'Bags';

    return { sport, type };
  };

  const { sport, type } = getSportAndType(product.name);
  const moqDetail = product.details?.find(d => d.includes('MOQ:'));
  const moq = moqDetail ? moqDetail.replace(/[^0-9]/g, '') : 25;

  const pageTitle = `Custom ${sport} ${type} USA | Factory-Direct, Low MOQ ${moq} Units | Zarko Sportswear`;
  const pageDescription = `Order custom sublimated ${product.name.toLowerCase()} for your team. Direct from factory with high-performance breathable fabrics, low ${moq} unit MOQ, and fast USA delivery.`;
  const productSlug = cleanSlug(product.name);
  const canonicalUrl = `https://www.zarkosportswear.com/detail?product=${productSlug}`;

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        keywords={`custom ${product.name.toLowerCase()}, custom ${sport.toLowerCase()} ${type.toLowerCase()}, sialkot sportswear manufacturer, custom teamwear USA`}
        openGraph={{
          'og:title': pageTitle,
          'og:description': pageDescription,
          'og:url': canonicalUrl,
          'og:type': 'product'
        }}
        twitter={{
          'twitter:title': pageTitle,
          'twitter:description': pageDescription,
        }}
      />
      <section className="w-full min-h-screen bg-slate-50/50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Back Button */}
        <Link
          to="/"
          onClick={(e) => { e.preventDefault(); navigate(-1); }}
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition"
        >
          ← Back to Collection
        </Link>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start bg-transparent py-4 sm:py-6">

          {/* Left: Product Image Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-square w-full rounded-2xl bg-white overflow-hidden flex items-center justify-center p-6 group shadow-sm">
              <img
                src={displayImage}
                alt={product?.name || "Product Image"} title={product?.name || "Product Image"}
                className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = imageUrl('/images/placeholder.jpg');
                }}
              />
            </div>

            {/* Quick specifications */}
            <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-100/50">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Specifications</h4>
              <ul className="space-y-2.5">
                {(product.details || defaultProduct.details).map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 font-medium">
                    <span className="text-indigo-500 mt-0.5">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Info & Inquiry Form Column */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-normal mb-4">
                {product.name}
              </h1>
              <p className="text-slate-600 leading-relaxed font-medium">
                {product.description || `Premium export-grade ${product.name} customized to match team aesthetics and comfort.`}
              </p>
            </div>

            {/* Sizes */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest">Available Sizes</h2>
                <button
                  type="button"
                  onClick={() => setIsSizeChartOpen(true)}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline flex items-center gap-1"
                >
                  📏 View Size Chart
                </button>
              </div>
              <div className="flex gap-2.5 flex-wrap">
                {(product.sizes || defaultProduct.sizes).map((size, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition cursor-default uppercase"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Inquiry Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="text-lg font-black text-slate-800 uppercase tracking-wide mb-1">Send Instant Inquiry</h3>
                <p className="text-xs text-slate-400 font-medium mb-4">We will configure bulk pricing and design proofs via WhatsApp.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number / WhatsApp"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition"
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Country / City"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition"
                  required
                />
              </div>

              <textarea
                name="message"
                rows="4"
                placeholder="Quantity, target colors, branding instructions..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition resize-none"
                required
              ></textarea>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-sm hover:shadow transition-all duration-200"
              >
                Submit & Chat on WhatsApp
              </button>
            </form>
          </div>

        </div>

        {/* Related Products Section */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <span className="inline-flex items-center justify-center rounded-full border border-indigo-200 bg-white px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-indigo-500">
              Recommendations
            </span>
            <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">You May Also Like</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProductsState.map((item, idx) => (
              <Link
                key={idx}
                to={`/detail?product=${cleanSlug(item.name)}`}
                state={{ product: item }}
                className="group bg-white rounded-2xl border border-slate-100 p-4 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between block"
              >
                <div className="aspect-square w-full rounded-xl bg-slate-50 overflow-hidden mb-4 flex items-center justify-center">
                  <img
                    src={imageUrl(item.image)}
                    alt={item?.name || "Recommended Product"} title={item?.name || "Recommended Product"}
                    className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = imageUrl('/images/slide1.jpg');
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-800 group-hover:text-indigo-600 transition text-sm">{item.name}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
      <SizeChartModal isOpen={isSizeChartOpen} onClose={() => setIsSizeChartOpen(false)} />
    </section>
    </>
  );
};

export default ProductInquiry;
