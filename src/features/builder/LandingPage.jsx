import React, { useState, useEffect } from 'react';
import { colors } from './data/designs';
import DesignPreview from './DesignPreview';
import { HiArrowRight, HiViewGrid, HiOutlineCube, HiOutlineLightningBolt, HiOutlineColorSwatch, HiOutlineX } from 'react-icons/hi';
import { FaChevronDown } from 'react-icons/fa';

const ColorGridMini = ({ label, selected, onSelect, isGrad, onToggleGrad, selected2, onSelect2 }) => (
  <div className="flex flex-col gap-3 p-4 bg-white border border-slate-100 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
    <div className="flex justify-between items-center pb-2 border-b border-slate-50">
      <span className="text-[10px] font-black text-slate-900 uppercase tracking-wider">{label} Color</span>
      <div className="flex border border-slate-200 p-0.5 bg-slate-50 rounded-lg">
        <button onClick={() => isGrad && onToggleGrad()} className={`px-2.5 py-1 rounded-md text-[8px] font-bold uppercase transition-all ${!isGrad ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400'}`}>Solid</button>
        <button onClick={() => !isGrad && onToggleGrad()} className={`px-2.5 py-1 rounded-md text-[8px] font-bold uppercase transition-all ${isGrad ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400'}`}>Grad</button>
      </div>
    </div>

    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{isGrad ? 'Start Color' : 'Color'}</span>
        <div className="relative w-5 h-5 rounded-md border border-slate-200 overflow-hidden">
          <input type="color" value={selected} onChange={(e) => onSelect(e.target.value)} className="absolute inset-0 w-[150%] h-[150%] -top-[25%] -left-[25%] cursor-pointer border-none p-0" />
        </div>
      </div>
      <div className="grid grid-cols-6 gap-1">
        {colors.slice(0, 12).map((c, i) => (
          <button
            key={i}
            onClick={() => onSelect(c.hex)}
            className={`w-full aspect-square rounded-md border transition-all ${selected === c.hex ? 'border-indigo-600 scale-105 z-10 shadow-sm' : 'border-transparent'}`}
            style={{ backgroundColor: c.hex }}
          />
        ))}
      </div>
    </div>

    {isGrad && (
      <div className="flex flex-col gap-2 pt-2 border-t border-slate-50">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">End Color</span>
          <div className="relative w-5 h-5 rounded-md border border-slate-200 overflow-hidden">
            <input type="color" value={selected2} onChange={(e) => onSelect2(e.target.value)} className="absolute inset-0 w-[150%] h-[150%] -top-[25%] -left-[25%] cursor-pointer border-none p-0" />
          </div>
        </div>
        <div className="grid grid-cols-6 gap-1">
          {colors.slice(0, 12).map((c, i) => (
            <button
              key={i}
              onClick={() => onSelect2(c.hex)}
              className={`w-full aspect-square rounded-md border transition-all ${selected2 === c.hex ? 'border-indigo-600 scale-105 z-10 shadow-sm' : 'border-transparent'}`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>
    )}
  </div>
);

const DesignCard = ({
  design,
  onSelectDesign,
  comparing,
  toggleCompare,
  primaryColor,
  primaryIsGrad,
  primaryColor2,
  secondaryColor,
  secondaryIsGrad,
  secondaryColor2,
  thirdColor,
  thirdIsGrad,
  thirdColor2,
  globalPattern,
  lightingPreset,
  materialFinish,
  mouseFollow
}) => {
  return (
    <div
      className="group flex flex-col gap-3 cursor-pointer"
      onClick={() => onSelectDesign(design)}
    >
      <div className={`aspect-[4/5] relative bg-white rounded-2xl border border-slate-100 transition-all duration-500 overflow-hidden ${comparing.includes(design.id) ? 'ring-4 ring-indigo-600' : 'hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:-translate-y-1'}`}>
        <DesignPreview
          modelUrl={design.modelUrl}
          mapping={design.mapping}
          primaryColor={primaryColor}
          primaryIsGrad={primaryIsGrad}
          primaryColor2={primaryColor2}
          secondaryColor={secondaryColor}
          secondaryIsGrad={secondaryIsGrad}
          secondaryColor2={secondaryColor2}
          thirdColor={thirdColor}
          thirdIsGrad={thirdIsGrad}
          thirdColor2={thirdColor2}
          pattern={globalPattern}
          lighting={lightingPreset}
          finish={materialFinish}
          mouseFollow={mouseFollow}
          layersMetadata={design.layers_metadata || {}}
        />

        <div className="absolute top-4 left-4 px-2.5 py-1 bg-white/95 rounded-lg border border-slate-100 shadow-sm max-w-[100px] truncate" title={design.id}>
          <span className="text-[9px] font-black text-indigo-950 uppercase tracking-widest block truncate">{design.id}</span>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); toggleCompare(design.id); }}
          className={`absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center backdrop-blur-md border transition-all duration-300 ${comparing.includes(design.id) ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white/90 border-slate-100 text-slate-700 opacity-0 group-hover:opacity-100 hover:scale-105'}`}
        >
          <HiViewGrid size={14} />
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-3 group-hover:translate-y-0">
          <div className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-full shadow-lg font-black text-[9px] uppercase tracking-wider hover:bg-indigo-700 transition-all duration-300">
            Customize <HiArrowRight size={10} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-0.5 px-2">
        <h3 className="text-[13px] font-bold text-slate-800 uppercase tracking-tight group-hover:text-indigo-600 transition-colors">{design.name.split(' / ')[0]}</h3>
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{design.name.split(' / ')[1] || 'Crew Neck Jersey'}</span>
      </div>
    </div>
  );
};

const LandingPage = ({
  availableDesigns,
  pagination,
  primaryColor, setPrimaryColor, primaryIsGrad, setPrimaryIsGrad, primaryColor2, setPrimaryColor2,
  secondaryColor, setSecondaryColor, secondaryIsGrad, setSecondaryIsGrad, secondaryColor2, setSecondaryColor2,
  thirdColor, setThirdColor, thirdIsGrad, setThirdIsGrad, thirdColor2, setThirdColor2,
  onSelectDesign,
  globalPattern, setGlobalPattern, lightingPreset, setLightingPreset, materialFinish, setMaterialFinish, mouseFollow, setMouseFollow
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [comparing, setComparing] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(availableDesigns.length / itemsPerPage);
  const paginatedDesigns = availableDesigns.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset page if availableDesigns changes
  useEffect(() => {
    setCurrentPage(1);
  }, [availableDesigns]);

  const toggleCompare = (id) => {
    setComparing(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id].slice(-2));
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col lg:flex-row font-['Plus_Jakarta_Sans',sans-serif] text-slate-800 relative">
      
      {/* Mobile Drawer Floating Toggle Button */}
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 bg-indigo-600 hover:bg-indigo-700 text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2 text-xs font-black uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <HiOutlineColorSwatch size={18} />
        <span>Controls</span>
      </button>

      {/* Mobile Backdrop Overlay */}
      {isDrawerOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-[60] animate-in fade-in duration-300"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* ── LEFT PANEL: CONFIGURATOR CONSOLE (Responsive Mobile Drawer & Desktop Sticky Sidebar) ── */}
      <aside data-lenis-prevent className={`bg-white border-r border-slate-100 flex-shrink-0 flex flex-col transition-all duration-300 z-[70] h-screen max-h-screen overflow-hidden
        lg:w-[350px] lg:sticky lg:top-0 lg:translate-x-0
        fixed inset-y-0 left-0 w-[85%] max-w-[340px] shadow-2xl ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        
        {/* Console Header */}
        <div className="p-5 lg:p-6 border-b border-slate-100 flex items-center justify-between flex-shrink-0 bg-white">
          <div className="flex flex-col gap-1">
            <h1 className="text-[15px] lg:text-[16px] font-black text-indigo-950 uppercase tracking-wider" style={{ fontFamily: "'Outfit', sans-serif" }}>
              ELITE CONFIGURATOR
            </h1>
            <span className="text-[9px] font-extrabold text-indigo-600 uppercase tracking-widest">
              STUDIO CUSTOMIZATION PANEL
            </span>
          </div>
          {/* Close button for mobile drawer */}
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="lg:hidden text-slate-400 hover:text-slate-900 p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <HiOutlineX size={20} />
          </button>
        </div>

        {/* Console Content (Scrollable Container) */}
        <div className="p-6 flex flex-col gap-8 flex-1 overflow-y-auto overscroll-contain touch-pan-y no-scrollbar" data-lenis-prevent>
          
          {/* Studio Console Section */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              🛠️ Studio Console
            </span>
            
            <div className="flex flex-col gap-3 p-4 bg-slate-50/50 rounded-xl border border-slate-100">
              {/* Lighting Preset */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Environment Lighting</span>
                <div className="grid grid-cols-3 gap-1">
                  {['city', 'studio', 'night'].map(l => (
                    <button 
                      key={l} 
                      onClick={() => setLightingPreset(l)} 
                      className={`py-1.5 rounded-lg border text-[8px] font-extrabold uppercase tracking-wider transition-all ${
                        lightingPreset === l 
                          ? 'bg-indigo-50 border-indigo-200 text-indigo-600 shadow-sm' 
                          : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material Finish */}
              <div className="flex flex-col gap-1.5 mt-2">
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Material Finish</span>
                <div className="grid grid-cols-3 gap-1">
                  {['matte', 'gloss', 'metallic'].map(f => (
                    <button 
                      key={f} 
                      onClick={() => setMaterialFinish(f)} 
                      className={`py-1.5 rounded-lg border text-[8px] font-extrabold uppercase tracking-wider transition-all ${
                        materialFinish === f 
                          ? 'bg-indigo-50 border-indigo-200 text-indigo-600 shadow-sm' 
                          : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mouse Follow */}
              <button 
                onClick={() => setMouseFollow(!mouseFollow)} 
                className={`w-full py-2.5 mt-2 rounded-lg text-[9px] font-extrabold uppercase tracking-wider border transition-all flex items-center justify-center gap-2 ${
                  mouseFollow 
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-600' 
                    : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${mouseFollow ? 'bg-indigo-500 animate-ping' : 'bg-slate-300'}`} />
                360 Mouse Follow: {mouseFollow ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          {/* Pattern Overlay Section */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              🎨 Global Pattern Overlay
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {['none', 'camo', 'carbon', 'hexagon', 'zebra'].map(p => (
                <button 
                  key={p} 
                  onClick={() => setGlobalPattern(p === 'none' ? null : p)} 
                  className={`py-2 rounded-lg border text-[8px] font-extrabold uppercase tracking-wider transition-all ${
                    globalPattern === p || (p === 'none' && !globalPattern)
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-600 shadow-sm' 
                      : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  {p === 'none' ? 'No Pattern' : p}
                </button>
              ))}
            </div>
          </div>

          {/* Color Palettes Section */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              🎨 Material Palette
            </span>
            <div className="flex flex-col gap-3">
              <ColorGridMini label="Primary" selected={primaryColor} onSelect={setPrimaryColor} isGrad={primaryIsGrad} onToggleGrad={() => setPrimaryIsGrad(!primaryIsGrad)} selected2={primaryColor2} onSelect2={setPrimaryColor2} />
              <ColorGridMini label="Secondary" selected={secondaryColor} onSelect={setSecondaryColor} isGrad={secondaryIsGrad} onToggleGrad={() => setSecondaryIsGrad(!secondaryIsGrad)} selected2={secondaryColor2} onSelect2={setSecondaryColor2} />
            </div>
          </div>

        </div>
      </aside>

      {/* ── RIGHT PANEL: DESIGN GALLERY ── */}
      <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
          
          {/* Gallery Header */}
          <div className="flex items-end justify-between border-b border-slate-200/60 pb-6">
            <div className="flex flex-col gap-1.5">
              <h2 className="text-[22px] md:text-[28px] font-black text-indigo-950 uppercase tracking-wider" style={{ fontFamily: "'Outfit', sans-serif" }}>
                DESIGN GALLERY
              </h2>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                SELECT A BASE MODEL TO BEGIN
              </span>
            </div>

            <div className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-[9px] font-bold uppercase tracking-widest">
              {availableDesigns.length} Models
            </div>
          </div>

          {/* Comparing Indicator */}
          {comparing.length > 0 && (
            <div className="flex items-center justify-between bg-indigo-50 border border-indigo-100 px-5 py-3 rounded-xl animate-fade-in">
              <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">Comparing {comparing.length} / 2 models</span>
              <button onClick={() => setComparing([])} className="text-indigo-600 hover:text-indigo-800"><HiOutlineX size={16} /></button>
            </div>
          )}

          {/* Design Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10">
            {paginatedDesigns.map((design) => (
              <DesignCard
                key={design.id}
                design={design}
                onSelectDesign={onSelectDesign}
                comparing={comparing}
                toggleCompare={toggleCompare}
                primaryColor={primaryColor}
                primaryIsGrad={primaryIsGrad}
                primaryColor2={primaryColor2}
                secondaryColor={secondaryColor}
                secondaryIsGrad={secondaryIsGrad}
                secondaryColor2={secondaryColor2}
                thirdColor={thirdColor}
                thirdIsGrad={thirdIsGrad}
                thirdColor2={thirdColor2}
                globalPattern={globalPattern}
                lightingPreset={lightingPreset}
                materialFinish={materialFinish}
                mouseFollow={mouseFollow}
              />
            ))}
          </div>

          {/* Local Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8 border-t border-slate-100 pt-6">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-slate-200 rounded-lg text-[10px] font-extrabold uppercase tracking-wider disabled:opacity-30 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all select-none"
              >
                Prev
              </button>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-slate-200 rounded-lg text-[10px] font-extrabold uppercase tracking-wider disabled:opacity-30 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all select-none"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </main>

    </div>
  );
};

export default LandingPage;
