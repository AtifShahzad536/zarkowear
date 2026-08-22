import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { HiArrowRight, HiArrowLeft, HiSearch } from 'react-icons/hi';
import DesignPreview from '../features/builder/DesignPreview';
import { useSelector } from 'react-redux';
import SeoHead from '../components/SeoHead';
import MaintenancePage from './MaintenancePage';

export const ModelSelectionPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
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

  // Sync category param from URL if present and valid in catalog
  useEffect(() => {
    const validCategories = new Set(models.map(m => m.category ? m.category.toLowerCase() : ''));
    if (categoryParam && categoryParam.toLowerCase() !== 'all' && validCategories.has(categoryParam.toLowerCase())) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory('all');
    }
  }, [categoryParam, models]);

  // Compute unique categories
  const categories = useMemo(() => {
    const set = new Set();
    models.forEach(m => {
      if (m.category) set.add(m.category);
    });
    return ['all', ...Array.from(set)];
  }, [models]);

  // Filter models
  const filteredModels = useMemo(() => {
    return models.filter(model => {
      const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (model.category && model.category.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory.toLowerCase() === 'all' || 
                              (model.category && model.category.toLowerCase() === selectedCategory.toLowerCase());
      return matchesSearch && matchesCategory;
    });
  }, [models, searchQuery, selectedCategory]);

  const handleSelectModel = (modelId) => {
    navigate(`/builder/${modelId}`);
  };

  const seoData = useMemo(() => {
    const categoryTitle = categoryParam ? categoryParam.toUpperCase() : 'Sports';
    const hasCategory = categoryParam && categoryParam.toLowerCase() !== 'all';
    const canonicalUrl = hasCategory 
      ? `https://www.zarkosportswear.com/builder/models?category=${encodeURIComponent(categoryParam)}`
      : 'https://www.zarkosportswear.com/builder/models';
    return {
      title: `Custom ${categoryTitle} Jerseys USA | 3D Templates`,
      description: `Select and customize premium ${categoryTitle} uniform templates online. Personalize your teamwear in real-time with fast USA shipping.`,
      keywords: `custom ${categoryTitle.toLowerCase()} jersey usa, 3d sports uniforms templates, team jerseys builder usa, zarko customization`,
      canonical: canonicalUrl,
      openGraph: {
        'og:title': `Custom ${categoryTitle} Jerseys USA | 3D Templates`,
        'og:description': `Select a base model template and customize your ${categoryTitle} uniform in real-time.`,
        'og:type': 'website',
        'og:url': canonicalUrl
      }
    };
  }, [categoryParam]);

  if (!builderEnabled) {
    return <MaintenancePage />;
  }

  return (
    <div className="w-full min-h-screen bg-[#0A0C16] text-white py-12 px-6 lg:px-12 relative overflow-x-hidden font-['Outfit']">
      <SeoHead {...seoData} />
      
      {/* Premium Spotlight Glow */}
      <div className="absolute top-[5%] left-[50%] -translate-x-1/2 w-[800px] h-[350px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[94%] mx-auto flex flex-col gap-8 relative z-10">
        
        {/* Navigation Breadcrumb & Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 pb-8 gap-6">
          <div className="flex items-start gap-4">
            <button
              onClick={() => navigate('/builder')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-none text-xs font-bold text-slate-300 hover:bg-white/10 hover:border-white/20 transition cursor-pointer"
            >
              <HiArrowLeft size={16} /> Return to Hub
            </button>
            <div>
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-1">Model Variations</span>
              <h1 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-tight leading-none">
                3D Kit Catalog
              </h1>
            </div>
          </div>

          {/* Search Input Box */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search custom jerseys..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121626] border border-white/10 px-4 py-2.5 pl-10 text-xs text-white rounded-none outline-none focus:border-indigo-500/80 transition-colors placeholder-slate-500 font-medium"
            />
            <HiSearch className="absolute left-3 top-3 text-slate-500" size={16} />
          </div>
        </div>

        {/* Dynamic Category Chips */}
        <div className="flex flex-wrap gap-2 pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all border cursor-pointer rounded-none ${
                selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Model Cards Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading dynamic 3D templates...</span>
          </div>
        ) : filteredModels.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-3 border border-dashed border-white/5">
            <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">No matching templates found</span>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="text-xs font-bold text-indigo-400 hover:text-white uppercase tracking-wider underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredModels.map((model) => (
              <div
                key={model.id}
                onClick={() => handleSelectModel(model.id)}
                className="group flex flex-col gap-3 bg-[#0c0e1a]/80 p-4 rounded-none border border-white/5 hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.12)] transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-[4/5] relative bg-slate-950/20 rounded-none overflow-hidden border border-white/5 flex items-center justify-center">
                  <DesignPreview
                    modelUrl={model.modelUrl}
                    mapping={model.mapping}
                    primaryColor={builderState.primaryColor || '#ffffff'}
                    secondaryColor={builderState.secondaryColor || '#ffffff'}
                    thirdColor={builderState.thirdColor || '#ffffff'}
                    layersMetadata={model.layers_metadata || {}}
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 bg-indigo-600 text-white rounded-none text-[9px] font-black uppercase tracking-wider">
                    {model.category ? model.category.toUpperCase() : "PRO KIT"}
                  </div>
                </div>

                <div className="flex flex-col gap-1 px-1 mt-2">
                  <h3 className="text-sm font-extrabold text-white uppercase group-hover:text-indigo-400 transition-colors">
                    {model.name}
                  </h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Click to launch 3D Designer
                  </span>
                </div>

                <button className="w-full mt-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-none text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer">
                  <span>Start Design</span>
                  <HiArrowRight size={12} />
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default ModelSelectionPage;
