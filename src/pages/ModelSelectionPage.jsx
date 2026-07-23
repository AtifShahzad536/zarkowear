import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { HiArrowRight, HiOutlineCube, HiArrowLeft } from 'react-icons/hi';
import DesignPreview from '../features/builder/DesignPreview';
import { useSelector } from 'react-redux';

export const ModelSelectionPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';
  
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const builderState = useSelector((state) => state.builder);

  useEffect(() => {
    const apiBase = (import.meta.env.VITE_API_BASE || '').trim();
    const endpoint = apiBase ? `${apiBase}/api/builder/config` : '/api/builder/config';

    setLoading(true);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        let allDesigns = data.dynamicDesigns || [];
        if (categoryParam && categoryParam.toLowerCase() !== 'all') {
          allDesigns = allDesigns.filter(d => 
            d.name.toLowerCase().includes(categoryParam.toLowerCase()) || 
            (d.category && d.category.toLowerCase().includes(categoryParam.toLowerCase()))
          );
          if (allDesigns.length === 0) {
            allDesigns = data.dynamicDesigns || [];
          }
        }
        setModels(allDesigns);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching models:', err);
        setLoading(false);
      });
  }, [categoryParam]);

  const handleSelectModel = (modelId) => {
    navigate(`/builder/${modelId}`);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 font-['Plus_Jakarta_Sans',sans-serif] text-slate-800 py-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/builder')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
            >
              <HiArrowLeft size={16} /> Back to Basis
            </button>
            <div>
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Model Variations</span>
              <h1 className="text-2xl lg:text-3xl font-black text-slate-900 uppercase tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {categoryParam} Models & Variations
              </h1>
            </div>
          </div>
          <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold uppercase tracking-widest">
            {models.length} Models Found
          </span>
        </div>

        {/* Model Cards Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Loading model variations...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {models.map((model) => (
              <div
                key={model.id}
                onClick={() => handleSelectModel(model.id)}
                className="group flex flex-col gap-3 bg-white p-4 rounded-2xl border border-slate-200 hover:border-indigo-500/40 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-[4/5] relative bg-slate-50 rounded-xl overflow-hidden border border-slate-100 flex items-center justify-center">
                  <DesignPreview
                    modelUrl={model.modelUrl}
                    mapping={model.mapping}
                    primaryColor={builderState.primaryColor || '#ffffff'}
                    secondaryColor={builderState.secondaryColor || '#ffffff'}
                    thirdColor={builderState.thirdColor || '#ffffff'}
                    layersMetadata={model.layers_metadata || {}}
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 bg-white/90 rounded text-[9px] font-black text-slate-700 uppercase">
                    {model.id}
                  </div>
                </div>

                <div className="flex flex-col gap-1 px-1">
                  <h3 className="text-sm font-extrabold text-slate-800 uppercase group-hover:text-indigo-600 transition-colors">
                    {model.name}
                  </h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Click to open 3D Customizer
                  </span>
                </div>

                <button className="w-full mt-2 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition">
                  <span>Open Customizer</span>
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
