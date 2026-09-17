import React, { useState, useEffect, useMemo } from 'react';
import { colors } from './data/designs';
import Card2DPreview from './Card2DPreview';
import { HiArrowRight, HiViewGrid, HiOutlineCube, HiOutlineLightningBolt, HiOutlineColorSwatch, HiOutlineX } from 'react-icons/hi';
import { FaChevronDown } from 'react-icons/fa';

const ColorGridMini = ({ label, selected, onSelect, isGrad, onToggleGrad, selected2, onSelect2 }) => (
  <div className="flex flex-col gap-3 p-4 bg-slate-950/40 border border-white/5 rounded-none shadow-sm">
    <div className="flex justify-between items-center pb-2 border-b border-white/5">
      <span className="text-[10px] font-black text-white uppercase tracking-wider">{label} Color</span>
      <div className="flex border border-white/10 p-0.5 bg-slate-900/60 rounded-none">
        <button onClick={() => isGrad && onToggleGrad()} className={`px-2.5 py-1 rounded-none text-[8px] font-bold uppercase transition-all ${!isGrad ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}>Solid</button>
        <button onClick={() => !isGrad && onToggleGrad()} className={`px-2.5 py-1 rounded-none text-[8px] font-bold uppercase transition-all ${isGrad ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}>Grad</button>
      </div>
    </div>

    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{isGrad ? 'Start Color' : 'Color'}</span>
        <div className="relative w-5 h-5 rounded-none border border-white/10 overflow-hidden">
          <input type="color" value={selected} onChange={(e) => onSelect(e.target.value)} className="absolute inset-0 w-[150%] h-[150%] -top-[25%] -left-[25%] cursor-pointer border-none p-0 bg-transparent" />
        </div>
      </div>
      <div className="grid grid-cols-6 gap-1">
        {colors.slice(0, 12).map((c, i) => (
          <button
            key={i}
            onClick={() => onSelect(c.hex)}
            className={`w-full aspect-square rounded-none border transition-all ${selected === c.hex ? 'border-indigo-500 scale-105 z-10 shadow-sm' : 'border-transparent'}`}
            style={{ backgroundColor: c.hex }}
          />
        ))}
      </div>
    </div>

    {isGrad && (
      <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">End Color</span>
          <div className="relative w-5 h-5 rounded-none border border-white/10 overflow-hidden">
            <input type="color" value={selected2} onChange={(e) => onSelect2(e.target.value)} className="absolute inset-0 w-[150%] h-[150%] -top-[25%] -left-[25%] cursor-pointer border-none p-0 bg-transparent" />
          </div>
        </div>
        <div className="grid grid-cols-6 gap-1">
          {colors.slice(0, 12).map((c, i) => (
            <button
              key={i}
              onClick={() => onSelect2(c.hex)}
              className={`w-full aspect-square rounded-none border transition-all ${selected2 === c.hex ? 'border-indigo-500 scale-105 z-10 shadow-sm' : 'border-transparent'}`}
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
      <div className={`aspect-[4/5] relative bg-slate-950/20 rounded-none border border-white/5 transition-all duration-500 overflow-hidden ${comparing.includes(design.id) ? 'ring-2 ring-indigo-500' : 'hover:shadow-[0_0_30px_rgba(99,102,241,0.12)] hover:border-white/15'}`}>
        <Card2DPreview
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
          finish={materialFinish}
          layersMetadata={design.layers_metadata || {}}
        />

        <div className="absolute top-4 left-4 px-2.5 py-1 bg-[#0c0e1a]/90 rounded-none border border-white/10 shadow-sm max-w-[120px] truncate" title={design.id}>
          <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest block truncate">
            {design.category ? design.category.toUpperCase() : "PRO KIT"}
          </span>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); toggleCompare(design.id); }}
          className={`absolute top-4 right-4 w-8 h-8 rounded-none flex items-center justify-center backdrop-blur-md border transition-all duration-300 ${comparing.includes(design.id) ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-slate-900/80 border-white/10 text-slate-300 opacity-0 group-hover:opacity-100 hover:scale-105'}`}
        >
          <HiViewGrid size={14} />
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-3 group-hover:translate-y-0">
          <div className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-none shadow-lg font-black text-[9px] uppercase tracking-wider hover:bg-indigo-700 transition-all duration-300">
            Customize <HiArrowRight size={10} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-0.5 px-2">
        <h3 className="text-[13px] font-bold text-white uppercase tracking-tight group-hover:text-indigo-400 transition-colors">{design.name.split(' / ')[0]}</h3>
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{design.name.split(' / ')[1] || 'Crew Neck Jersey'}</span>
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-white/10 bg-[#0c0e1a]/70 rounded-none overflow-hidden transition-colors hover:border-indigo-500/40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-4 md:p-5 flex items-center justify-between gap-4 cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="text-xs md:text-sm font-bold text-white tracking-wide">{question}</span>
        <FaChevronDown className={`text-indigo-400 text-xs transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-4 pb-4 md:px-5 md:pb-5 text-[11px] md:text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-3 animate-fade-in">
          {answer}
        </div>
      )}
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
  const [selectedSportTab, setSelectedSportTab] = useState('ALL');
  const itemsPerPage = 8;

  // Filter designs by category tab if needed
  const filteredDesigns = useMemo(() => {
    if (selectedSportTab === 'ALL') return availableDesigns;
    return availableDesigns.filter(d =>
      (d.category && d.category.toUpperCase().includes(selectedSportTab)) ||
      (d.name && d.name.toUpperCase().includes(selectedSportTab))
    );
  }, [availableDesigns, selectedSportTab]);

  const totalPages = Math.ceil(filteredDesigns.length / itemsPerPage);
  const paginatedDesigns = filteredDesigns.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredDesigns]);

  const toggleCompare = (id) => {
    setComparing(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id].slice(-2));
  };

  const sportsTabs = ['ALL', 'SOCCER', 'WRESTLING', 'BASKETBALL', 'BASEBALL', 'CRICKET', 'GYM'];

  return (
    <div className="w-full h-[calc(100dvh-44px)] bg-[#0A0C16] text-white flex flex-col lg:flex-row font-['Outfit'] relative overflow-hidden">

      {/* Premium background glow spotlight */}
      <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Mobile Drawer Floating Toggle Button */}
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 bg-indigo-600 hover:bg-indigo-700 text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2 text-xs font-black uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
      >
        <HiOutlineColorSwatch size={18} />
        <span>Controls</span>
      </button>

      {/* Mobile Backdrop Overlay */}
      {isDrawerOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-[60] animate-in fade-in duration-300"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* ── LEFT PANEL: CONFIGURATOR CONSOLE (Fixed on desktop, scrolling independently) ── */}
      <aside
        data-lenis-prevent
        className={`bg-[#0c0e1a] border-r border-white/5 flex-shrink-0 flex flex-col transition-all duration-300 z-[70] lg:z-10
          lg:w-[350px] lg:h-full lg:max-h-full lg:relative lg:translate-x-0
          fixed inset-y-0 left-0 w-[85%] max-w-[340px] h-full shadow-2xl ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >

        {/* Console Header */}
        <div className="p-4 lg:p-5 border-b border-white/5 flex items-center justify-between flex-shrink-0 bg-[#0e101f]">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-[14px] lg:text-[15px] font-black text-white uppercase tracking-wider">
              STUDIO BUILDER
            </h2>
            <span className="text-[8.5px] font-extrabold text-indigo-400 uppercase tracking-widest">
              REAL-TIME 3D COLOR ENGINE
            </span>
          </div>
          {/* Close button for mobile drawer */}
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white p-2 rounded-none hover:bg-white/5 transition-colors"
          >
            <HiOutlineX size={20} />
          </button>
        </div>

        {/* Console Content (Fixed Sidebar Scroll Container) */}
        <div className="p-5 flex flex-col gap-6 flex-1 overflow-y-auto overscroll-contain touch-pan-y no-scrollbar" data-lenis-prevent>

          {/* Studio Console Section */}
          <div className="flex flex-col gap-3">
            <span className="text-[9.5px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <span>💡</span> Studio Lighting & Finishes
            </span>

            <div className="flex flex-col gap-2.5 p-3.5 bg-slate-950/40 rounded-none border border-white/5">
              {/* Lighting Preset */}
              <div className="flex flex-col gap-1">
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Environment Lighting</span>
                <div className="grid grid-cols-3 gap-1">
                  {['city', 'studio', 'night'].map(l => (
                    <button
                      key={l}
                      onClick={() => setLightingPreset(l)}
                      className={`py-1.5 rounded-none border text-[8px] font-extrabold uppercase tracking-wider transition-all cursor-pointer ${lightingPreset === l
                          ? 'bg-indigo-500/25 border-indigo-500 text-white shadow-sm'
                          : 'bg-slate-900/40 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                        }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material Finish */}
              <div className="flex flex-col gap-1 mt-1.5">
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Material Finish</span>
                <div className="grid grid-cols-3 gap-1">
                  {['matte', 'gloss', 'metallic'].map(f => (
                    <button
                      key={f}
                      onClick={() => setMaterialFinish(f)}
                      className={`py-1.5 rounded-none border text-[8px] font-extrabold uppercase tracking-wider transition-all cursor-pointer ${materialFinish === f
                          ? 'bg-indigo-500/25 border-indigo-500 text-white shadow-sm'
                          : 'bg-slate-900/40 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
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
                className={`w-full py-2 mt-1.5 rounded-none text-[8.5px] font-extrabold uppercase tracking-wider border transition-all flex items-center justify-center gap-2 cursor-pointer ${mouseFollow
                    ? 'bg-indigo-500/25 border-indigo-500 text-white'
                    : 'bg-slate-900/40 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                  }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${mouseFollow ? 'bg-indigo-400 animate-ping' : 'bg-slate-500'}`} />
                360° Mouse Follow: {mouseFollow ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          {/* Pattern Overlay Section */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[9.5px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <span>⚡</span> High-Tech Pattern Overlays
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {['none', 'camo', 'carbon', 'hexagon', 'zebra'].map(p => (
                <button
                  key={p}
                  onClick={() => setGlobalPattern(p === 'none' ? null : p)}
                  className={`py-1.5 rounded-none border text-[8px] font-extrabold uppercase tracking-wider transition-all cursor-pointer ${globalPattern === p || (p === 'none' && !globalPattern)
                      ? 'bg-indigo-500/25 border-indigo-500 text-white shadow-sm'
                      : 'bg-slate-900/40 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                    }`}
                >
                  {p === 'none' ? 'No Pattern' : p}
                </button>
              ))}
            </div>
          </div>

          {/* Color Palettes Section */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[9.5px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <span>🎨</span> Team Color Palette (Solid / Grad)
            </span>
            <div className="flex flex-col gap-2.5">
              <ColorGridMini label="Primary" selected={primaryColor} onSelect={setPrimaryColor} isGrad={primaryIsGrad} onToggleGrad={() => setPrimaryIsGrad(!primaryIsGrad)} selected2={primaryColor2} onSelect2={setPrimaryColor2} />
              <ColorGridMini label="Secondary" selected={secondaryColor} onSelect={setSecondaryColor} isGrad={secondaryIsGrad} onToggleGrad={() => setSecondaryIsGrad(!secondaryIsGrad)} selected2={secondaryColor2} onSelect2={setSecondaryColor2} />
            </div>
          </div>

        </div>
      </aside>

      {/* ── RIGHT PANEL: DESIGN GALLERY & RICH SEO CONTENT (Only this panel scrolls) ── */}
      <main className="flex-1 h-full max-h-full overflow-y-auto overscroll-contain relative z-10 p-5 md:p-8 lg:p-10" data-lenis-prevent>
        <div className="max-w-[1240px] mx-auto flex flex-col gap-12 pb-16">

          {/* Gallery Header & SEO H1 */}
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                Factory Direct USA Custom Sportswear
              </span>
              <h1 className="text-[22px] md:text-[28px] lg:text-[32px] font-black text-white uppercase tracking-tight leading-tight">
                3D Custom Sports Jersey & Uniform Builder
              </h1>
              <p className="text-xs md:text-sm text-slate-400 max-w-2xl">
                Personalize team kits in real-time 3D with full-dye sublimation, vector crests, custom gradients, and fast USA delivery.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                {filteredDesigns.length} Models Available
              </span>
            </div>
          </div>

          {/* Sport Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {sportsTabs.map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedSportTab(tab)}
                className={`px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap border ${selectedSportTab === tab
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Comparing Indicator */}
          {comparing.length > 0 && (
            <div className="flex items-center justify-between bg-indigo-500/15 border border-indigo-500/30 px-5 py-3 animate-fade-in">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Comparing {comparing.length} / 2 models</span>
              <button onClick={() => setComparing([])} className="text-indigo-400 hover:text-white cursor-pointer"><HiOutlineX size={16} /></button>
            </div>
          )}

          {/* Design Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
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

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 border-t border-white/5 pt-6">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-white/10 bg-white/5 text-[10px] font-extrabold uppercase tracking-wider text-slate-300 disabled:opacity-30 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all select-none cursor-pointer"
              >
                Prev
              </button>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-white/10 bg-white/5 text-[10px] font-extrabold uppercase tracking-wider text-slate-300 disabled:opacity-30 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all select-none cursor-pointer"
              >
                Next
              </button>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════════════════
              RICH SEO & EDUCATIONAL SECTIONS (Rank Booster on Google & Search Crawlers)
              ══════════════════════════════════════════════════════════════════════════════ */}

          {/* Section: How It Works (Step by Step) */}
          <section className="mt-8 pt-10 border-t border-white/10 flex flex-col gap-6" aria-label="How 3D Customizer Works">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Simple 4-Step Process</span>
              <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
                How Our 3D Sports Jersey Customizer Works
              </h2>
              <p className="text-xs md:text-sm text-slate-400">
                Create professional, tournament-ready sportswear directly in your browser with real-time 3D feedback.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {[
                { step: '01', title: 'Pick Base 3D Model', desc: 'Select from our catalog of football kits, wrestling singlets, basketball uniforms, baseball, cricket, and training wear.' },
                { step: '02', title: 'Apply Custom Colors', desc: 'Choose solid or gradient colors for primary, secondary, and accent layers. Mix unlimited Pantone shades.' },
                { step: '03', title: 'Select High-Tech Textures', desc: 'Add camo, carbon fiber, hexagon, or zebra pattern overlays with matte, gloss, or metallic lighting finishes.' },
                { step: '04', title: 'Roster & Production', desc: 'Save your 3D blueprint, add team player names/numbers, and submit for factory direct manufacturing with fast USA shipping.' }
              ].map((s) => (
                <div key={s.step} className="p-5 bg-[#0c0e1a] border border-white/5 flex flex-col gap-3 relative overflow-hidden group hover:border-indigo-500/40 transition-colors">
                  <span className="text-2xl font-black text-indigo-500/40 group-hover:text-indigo-400 transition-colors font-mono">{s.step}</span>
                  <h3 className="text-sm font-extrabold text-white uppercase tracking-wide">{s.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Key Customization Features */}
          <section className="pt-6 flex flex-col gap-6" aria-label="3D Customizer Features">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Engineered for Pro Athletics</span>
              <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
                Key Features of Zarko 3D Customizer
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 bg-[#0c0e1a] border border-white/5 flex flex-col gap-2.5">
                <div className="text-indigo-400 text-lg">⚡</div>
                <h3 className="text-sm font-black text-white uppercase tracking-wide">360° Real-Time 3D Rendering</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Interactive WebGL canvas with 360-degree mouse follow, dynamic environment lighting presets (City, Studio, Night), and accurate material finishes.
                </p>
              </div>

              <div className="p-5 bg-[#0c0e1a] border border-white/5 flex flex-col gap-2.5">
                <div className="text-indigo-400 text-lg">🎽</div>
                <h3 className="text-sm font-black text-white uppercase tracking-wide">4K Full-Dye Sublimation</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Your 3D designs are mapped directly to factory laser-cut pre-press patterns. Colors, vector logos, and sponsor graphics never fade, crack, or peel.
                </p>
              </div>

              <div className="p-5 bg-[#0c0e1a] border border-white/5 flex flex-col gap-2.5">
                <div className="text-indigo-400 text-lg">📦</div>
                <h3 className="text-sm font-black text-white uppercase tracking-wide">Factory Direct USA Delivery</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Direct international air express shipping to all 50 US states. Low MOQs starting at just 15 units with turnkey custom size and roster fulfillment.
                </p>
              </div>
            </div>
          </section>

          {/* Section: Supported Sports & Internal Links */}
          <section className="pt-6 flex flex-col gap-5 bg-indigo-950/20 p-6 border border-indigo-500/20" aria-label="Supported Sports">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Sportswear Categories</span>
              <h2 className="text-lg md:text-xl font-black text-white uppercase tracking-tight">
                Custom Uniforms & Sports Apparel We Manufacture
              </h2>
              <p className="text-xs text-slate-300">
                Explore our full line of athletic apparel with custom sublimation printing and wholesale team pricing:
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {[
                { name: 'Wrestling Singlets USA', url: '/wrestling' },
                { name: 'Custom Soccer Jerseys', url: '/soccer' },
                { name: 'Football Uniforms', url: '/football' },
                { name: 'Basketball Uniforms', url: '/basketball' },
                { name: 'Baseball Jerseys', url: '/baseball' },
                { name: 'Softball Kits', url: '/softball' },
                { name: 'Cricket Uniforms', url: '/cricket' },
                { name: 'Ice Hockey Jerseys', url: '/ice-hockey' },
                { name: 'Gym Activewear', url: '/gym' },
                { name: 'Running Gear', url: '/running' },
                { name: 'Volleyball Uniforms', url: '/volleyball' },
                { name: 'Rugby Teamwear', url: '/rugby' },
                { name: 'Custom Teamwear Orders', url: '/custom' }
              ].map(sport => (
                <a
                  key={sport.name}
                  href={sport.url}
                  className="text-[10.5px] font-bold text-indigo-300 hover:text-white px-3 py-1.5 bg-[#0c0e1a] border border-white/10 hover:border-indigo-500 transition-colors uppercase tracking-wider"
                >
                  {sport.name}
                </a>
              ))}
            </div>
          </section>

          {/* Section: FAQ Accordion for Search Engine Rich Snippets */}
          <section className="pt-6 flex flex-col gap-5" aria-label="Frequently Asked Questions">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Got Questions?</span>
              <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
                Frequently Asked Questions (FAQ) - 3D Customizer
              </h2>
              <p className="text-xs md:text-sm text-slate-400">
                Everything you need to know about designing custom team jerseys, sublimation printing, and USA shipping.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <FAQItem
                question="How does the 3D Custom Jersey Builder work?"
                answer="Our online 3D customizer lets you choose from professional base sportswear models, select primary, secondary, and gradient colors, choose textures and lighting presets, and preview your design from every 360-degree angle in real-time. Once finalized, you can save your blueprint or submit your roster for factory manufacturing."
              />
              <FAQItem
                question="What is the Minimum Order Quantity (MOQ) for custom team uniforms?"
                answer="We offer flexible low MOQs starting at just 15 units per order for customized team kits, jerseys, and wrestling singlets. We also cater to large school districts, collegiate programs, and league-wide orders exceeding 5,000+ units with tiered wholesale pricing."
              />
              <FAQItem
                question="Can I add team logos, sponsor graphics, and individual player rosters?"
                answer="Yes! We support full vector graphics (AI, PDF, SVG, high-res PNG). Every jersey can be customized with individual player names, numbers, and specific sizing across your full team roster without extra setup fees."
              />
              <FAQItem
                question="How long does manufacturing and delivery take to the United States?"
                answer="Standard production and express door-to-door air freight to the USA takes approximately 10 to 14 business days from mockup approval. Rush delivery options are also available for urgent tournaments."
              />
              <FAQItem
                question="Will the physical uniform match my 3D customizer colors?"
                answer="Yes. Our 3D customizer color values are calibrated to exact CMYK and Pantone sublimation print formulas. We use high-grade Japanese dye-sublimation inks that bond permanently with the polyester fabric fibers for vibrant, fade-proof colors."
              />
              <FAQItem
                question="What performance fabrics are used for jerseys and singlets?"
                answer="We use premium moisture-wicking interlock polyester (140–180 GSM) for soccer and basketball kits, 4-way stretch compression spandex/lycra (220–280 GSM) with silicone leg grippers for wrestling singlets, and breathable pro-mesh for baseball and football uniforms."
              />
            </div>
          </section>

          {/* Section: Call-To-Action Banner */}
          <section className="mt-4 p-8 bg-gradient-to-r from-indigo-900/60 to-purple-900/40 border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col gap-2 text-center md:text-left">
              <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
                Need a Custom Team Mockup or Bulk Quote?
              </h2>
              <p className="text-xs text-indigo-200 max-w-xl">
                Have specific design requirements, complex sponsor graphics, or ordering for an entire league? Connect with our USA customer support team for an instant quote.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <a
                href="/custom"
                className="px-5 py-2.5 bg-white hover:bg-slate-100 text-indigo-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg hover:scale-105"
              >
                Submit Custom Order
              </a>
              <a
                href="https://wa.me/923039200750"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg hover:scale-105"
              >
                WhatsApp Direct
              </a>
            </div>
          </section>

        </div>
      </main>

    </div>
  );
};

export default LandingPage;

