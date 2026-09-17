import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { HiArrowRight, HiArrowLeft, HiSearch, HiX, HiOutlineColorSwatch, HiOutlineCube, HiOutlineShieldCheck, HiOutlineTruck, HiOutlineSparkles } from 'react-icons/hi';
import { FaChevronDown } from 'react-icons/fa';
import Card2DPreview from '../features/builder/Card2DPreview';
import { useSelector } from 'react-redux';
import SeoHead from '../components/SeoHead';
import MaintenancePage from './MaintenancePage';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-white/10 bg-[#0c0e1a]/70 rounded-none overflow-hidden transition-colors hover:border-indigo-500/40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-4 md:p-4.5 flex items-center justify-between gap-4 cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="text-xs md:text-sm font-bold text-white tracking-wide">{question}</span>
        <FaChevronDown className={`text-indigo-400 text-xs transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-4 pb-4 md:px-4.5 md:pb-4.5 text-[11px] md:text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-3 animate-fade-in">
          {answer}
        </div>
      )}
    </div>
  );
};

export const ModelSelectionPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';
  
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [builderEnabled, setBuilderEnabled] = useState(true);
  const builderState = useSelector((state) => state.builder);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const apiBase = (import.meta.env.VITE_API_BASE || '').trim();
    const endpoint = apiBase ? `${apiBase}/api/builder/config` : '/api/builder/config';
    const settingsEndpoint = apiBase ? `${apiBase}/api/home/settings` : '/api/home/settings';

    setLoading(true);
    Promise.all([
      fetch(endpoint).then(res => res.json()),
      fetch(settingsEndpoint).then(res => res.json())
    ])
      .then(([data, settings]) => {
        if (settings.customBuilderEnabled === false) {
          setBuilderEnabled(false);
          setLoading(false);
          return;
        }
        setBuilderEnabled(true);
        const allDesigns = data.dynamicDesigns || [];
        setModels(allDesigns);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching models:', err);
        setLoading(false);
      });
  }, []);

  // Sync category param from URL if present
  useEffect(() => {
    const validCategories = new Set(models.map(m => m.category ? m.category.toLowerCase() : ''));
    if (categoryParam && categoryParam.toLowerCase() !== 'all' && validCategories.has(categoryParam.toLowerCase())) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory('all');
    }
  }, [categoryParam, models]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    if (cat.toLowerCase() === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  // Compute unique categories with counts
  const categoryStats = useMemo(() => {
    const counts = { all: models.length };
    models.forEach(m => {
      if (m.category) {
        const cat = m.category;
        counts[cat] = (counts[cat] || 0) + 1;
      }
    });
    return counts;
  }, [models]);

  const categories = useMemo(() => {
    const set = new Set();
    models.forEach(m => {
      if (m.category) set.add(m.category);
    });
    return ['all', ...Array.from(set)];
  }, [models]);

  // Filter models based on search query and category
  const filteredModels = useMemo(() => {
    return models.filter(model => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        (model.name && model.name.toLowerCase().includes(q)) || 
        (model.category && model.category.toLowerCase().includes(q)) ||
        (model.id && model.id.toLowerCase().includes(q));
      
      const matchesCategory = selectedCategory.toLowerCase() === 'all' || 
        (model.category && model.category.toLowerCase() === selectedCategory.toLowerCase());
      
      return matchesSearch && matchesCategory;
    });
  }, [models, searchQuery, selectedCategory]);

  const handleSelectModel = (modelId) => {
    navigate(`/builder/${modelId}`);
  };

  const seoData = useMemo(() => {
    const categoryTitle = categoryParam && categoryParam.toLowerCase() !== 'all' ? categoryParam.toUpperCase() : 'Sports Uniform';
    const hasCategory = categoryParam && categoryParam.toLowerCase() !== 'all';
    const canonicalUrl = hasCategory 
      ? `https://www.zarkosportswear.com/builder/models?category=${encodeURIComponent(categoryParam)}`
      : 'https://www.zarkosportswear.com/builder/models';
    return {
      title: `3D Custom ${categoryTitle} Templates & Models Catalog USA | Zarko`,
      description: `Browse 3D custom ${categoryTitle.toLowerCase()} templates. Real-time 3D jersey customizer with 4K sublimation printing, vector logos, and fast USA delivery.`,
      keywords: `3d custom ${categoryTitle.toLowerCase()} templates, 3d sports uniforms catalog, custom jerseys builder models usa, teamwear 3d design templates, zarko sportswear`,
      canonical: canonicalUrl,
      openGraph: {
        'og:title': `3D Custom ${categoryTitle} Templates & Models Catalog USA | Zarko`,
        'og:description': `Select a base 3D model template and design your custom ${categoryTitle.toLowerCase()} online in real-time. Direct factory USA supply.`,
        'og:type': 'website',
        'og:url': canonicalUrl
      },
      jsonLd: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CollectionPage",
            "@id": `${canonicalUrl}#collection`,
            "name": `3D Custom ${categoryTitle} Templates & Models`,
            "url": canonicalUrl,
            "description": `Browse 3D custom sports uniform templates for ${categoryTitle.toLowerCase()} with live 3D customizer.`,
            "isPartOf": {
              "@type": "WebSite",
              "name": "Zarko Sportswear",
              "url": "https://www.zarkosportswear.com"
            }
          },
          {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.zarkosportswear.com/" },
              { "@type": "ListItem", "position": 2, "name": "3D Builder", "item": "https://www.zarkosportswear.com/builder" },
              { "@type": "ListItem", "position": 3, "name": `${categoryTitle} Templates`, "item": canonicalUrl }
            ]
          }
        ]
      }
    };
  }, [categoryParam]);

  if (!builderEnabled) {
    return <MaintenancePage />;
  }

  return (
    <div className="w-full min-h-screen bg-[#0A0C16] text-white py-8 md:py-12 px-4 sm:px-6 lg:px-10 relative overflow-x-hidden font-['Outfit']">
      <SeoHead {...seoData} />
      
      {/* Background Spotlight Glow */}
      <div className="absolute top-[3%] left-[50%] -translate-x-1/2 w-[900px] h-[360px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto flex flex-col gap-8 relative z-10">
        
        {/* Navigation Breadcrumb, Header & Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-white/10 pb-6 gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <button
              onClick={() => navigate('/builder')}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-bold text-slate-300 uppercase tracking-wider transition-colors cursor-pointer w-fit"
            >
              <HiArrowLeft size={14} /> Back to 3D Hub
            </button>
            <div className="flex flex-col">
              <span className="text-[9.5px] font-black text-indigo-400 uppercase tracking-widest">
                Base Template Library
              </span>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white uppercase tracking-tight">
                3D Sports Uniform Catalog
              </h1>
            </div>
          </div>

          {/* Search Bar with clear button and live counter */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-96">
              <input
                type="text"
                placeholder="Search templates (e.g. soccer, singlet, shorts)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#121626] border border-white/10 px-4 py-2.5 pl-10 pr-10 text-xs text-white rounded-none outline-none focus:border-indigo-500 transition-colors placeholder-slate-500 font-medium"
              />
              <HiSearch className="absolute left-3 top-3 text-slate-500" size={16} />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Clear search"
                >
                  <HiX size={16} />
                </button>
              )}
            </div>
            <div className="hidden sm:flex items-center px-3 py-2.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
              {filteredModels.length} Models
            </div>
          </div>
        </div>

        {/* Dynamic Category Chips with Counts */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
            const count = categoryStats[cat] || 0;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider transition-all border cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  isSelected
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                <span>{cat}</span>
                <span className={`px-1.5 py-0.2 rounded-none text-[8.5px] ${isSelected ? 'bg-indigo-800 text-white' : 'bg-black/40 text-slate-400'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 5-Column Compact Card Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-28 gap-4">
            <div className="w-10 h-10 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading Catalog Models...</span>
          </div>
        ) : filteredModels.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 bg-[#0c0e1a]/60 border border-dashed border-white/10 p-8 text-center">
            <span className="text-sm font-bold text-slate-300 uppercase tracking-wider">No matching sportswear templates found</span>
            <p className="text-xs text-slate-500 max-w-md">Try searching for a different sport, model name, or clear your search query.</p>
            <button 
              onClick={() => { setSearchQuery(''); handleCategoryChange('all'); }}
              className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-4.5">
            {filteredModels.map((model) => (
              <div
                key={model.id}
                onClick={() => handleSelectModel(model.id)}
                className="group flex flex-col gap-2.5 bg-[#0c0e1a] p-3 rounded-none border border-white/5 hover:border-indigo-500/50 hover:shadow-[0_0_25px_rgba(99,102,241,0.15)] transition-all duration-300 cursor-pointer select-none"
              >
                {/* 2D Canvas Preview Area */}
                <div className="aspect-[4/5] relative bg-slate-950/40 rounded-none overflow-hidden border border-white/5 flex items-center justify-center">
                  <Card2DPreview
                    modelUrl={model.modelUrl}
                    mapping={model.mapping}
                    primaryColor={builderState.primaryColor || '#ffffff'}
                    primaryIsGrad={builderState.primaryIsGrad || false}
                    primaryColor2={builderState.primaryColor2 || '#ffffff'}
                    secondaryColor={builderState.secondaryColor || '#ffffff'}
                    secondaryIsGrad={builderState.secondaryIsGrad || false}
                    secondaryColor2={builderState.secondaryColor2 || '#ffffff'}
                    thirdColor={builderState.thirdColor || '#ffffff'}
                    thirdIsGrad={builderState.thirdIsGrad || false}
                    thirdColor2={builderState.thirdColor2 || '#ffffff'}
                    pattern={builderState.globalPattern || 'none'}
                    finish={builderState.materialFinish || 'matte'}
                    layersMetadata={model.layers_metadata || {}}
                  />

                  {/* Pro Kit Badge */}
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-[#0c0e1a]/90 border border-white/10 text-indigo-400 rounded-none text-[8px] font-black uppercase tracking-widest max-w-[100px] truncate">
                    {model.category ? model.category.toUpperCase() : "PRO KIT"}
                  </div>

                  {/* Hover Customize CTA Overlay */}
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3 backdrop-blur-[2px]">
                    <span className="flex items-center gap-1.5 bg-indigo-600 text-white px-3.5 py-1.5 text-[9px] font-black uppercase tracking-wider shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
                      Customize <HiArrowRight size={11} />
                    </span>
                  </div>
                </div>

                {/* Card Title & Category */}
                <div className="flex flex-col gap-0.5 px-0.5">
                  <h3 className="text-[11.5px] font-extrabold text-white uppercase tracking-tight truncate group-hover:text-indigo-400 transition-colors" title={model.name}>
                    {model.name.split(' / ')[0]}
                  </h3>
                  <span className="text-[8.5px] font-bold text-slate-400 uppercase tracking-widest truncate">
                    {model.name.split(' / ')[1] || model.category || 'Custom Model'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── SEO Rich Content & FAQ Section ── */}
        <section className="mt-12 pt-10 border-t border-white/10 flex flex-col gap-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-4 bg-[#0c0e1a]/70 border border-white/5 flex items-start gap-3">
              <div className="p-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <HiOutlineSparkles size={18} />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-xs font-black text-white uppercase tracking-wide">4K Full Sublimation</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">Colors, vector sponsor graphics, and roster names infused permanently into moisture-wicking fabrics.</p>
              </div>
            </div>

            <div className="p-4 bg-[#0c0e1a]/70 border border-white/5 flex items-start gap-3">
              <div className="p-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <HiOutlineShieldCheck size={18} />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-xs font-black text-white uppercase tracking-wide">Low 15-Piece MOQ</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">Direct factory manufacturing with flexible low minimum order quantities for sports clubs and school teams.</p>
              </div>
            </div>

            <div className="p-4 bg-[#0c0e1a]/70 border border-white/5 flex items-start gap-3">
              <div className="p-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <HiOutlineTruck size={18} />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-xs font-black text-white uppercase tracking-wide">Direct USA Express Shipping</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">Door-to-door express international air delivery across all 50 US states with real-time tracking support.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-black text-white uppercase tracking-tight">Frequently Asked Questions</h2>
            <div className="flex flex-col gap-2.5">
              <FAQItem
                question="How do I customize a 3D sports model template?"
                answer="Click on any template in the catalog above to open our real-time 3D interactive builder. You can customize primary and secondary Pantone colors, add custom vector logos, change fabric finishes, and input your complete player roster."
              />
              <FAQItem
                question="Can I order custom uniforms for multiple sports in one order?"
                answer="Yes! You can design soccer jerseys, basketball kits, wrestling singlets, and baseball apparel separately and submit your combined roster for unified factory-direct production and consolidated USA shipping."
              />
              <FAQItem
                question="What is the production turnaround time for custom sublimation uniforms?"
                answer="Standard sublimation production takes approximately 10 to 14 business days from digital mockup approval, followed by express international air freight (4–7 business days) directly to your USA address."
              />
            </div>
          </div>

        </section>

      </div>
    </div>
  );
};

export default ModelSelectionPage;
