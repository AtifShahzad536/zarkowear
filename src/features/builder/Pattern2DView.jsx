import React, { useState, useMemo, useRef } from 'react';
import { 
  HiOutlineScissors, HiOutlineZoomIn, HiOutlineZoomOut, 
  HiOutlineRefresh, HiOutlineDownload, HiOutlineInformationCircle,
  HiOutlineCheckCircle
} from 'react-icons/hi';
import toast from 'react-hot-toast';

/**
 * Helper to extract component colors from meshStates
 */
const getComponentColor = (keywords, meshStates, fallbackIndex = 0) => {
  const keys = Object.keys(meshStates || {});
  const kwList = Array.isArray(keywords) ? keywords : [keywords];
  
  // 1. Keyword matching
  for (const kw of kwList) {
    const matchKey = keys.find(k => k.toLowerCase().includes(kw.toLowerCase()));
    if (matchKey && meshStates[matchKey]) {
      const s = meshStates[matchKey];
      if (s.isGrad && s.grad1 && s.grad2) {
        return { isGrad: true, grad1: s.grad1, grad2: s.grad2, color: s.grad1 };
      }
      return { isGrad: false, color: s.color || '#ffffff' };
    }
  }

  // 2. Fallback to order-based index
  if (keys.length > 0) {
    const idx = Math.min(fallbackIndex, keys.length - 1);
    const key = keys[idx];
    const s = meshStates[key];
    if (s) {
      if (s.isGrad && s.grad1 && s.grad2) {
        return { isGrad: true, grad1: s.grad1, grad2: s.grad2, color: s.grad1 };
      }
      return { isGrad: false, color: s.color || '#ffffff' };
    }
  }

  return { isGrad: false, color: '#ffffff' };
};

/**
 * Intelligent Garment Type Detector
 */
function detectGarmentType(designName = '', category = '', meshes = []) {
  const text = `${designName} ${category}`.toLowerCase();
  
  if (text.includes('short') || text.includes('boxer') || text.includes('trunk')) {
    return 'shorts';
  }
  if (text.includes('singlet') || text.includes('wrestl') || text.includes('bodysuit') || text.includes('leotard')) {
    return 'singlet';
  }
  if (text.includes('hoodie') || text.includes('sweatshirt') || text.includes('pullover') || text.includes('sweater')) {
    return 'hoodie';
  }
  if (text.includes('pant') || text.includes('trouser') || text.includes('jogger') || text.includes('legging') || text.includes('tight')) {
    return 'pants';
  }
  if (text.includes('tank') || text.includes('sleeveless') || text.includes('basketball')) {
    return 'tank';
  }

  // Check meshes list for hints
  for (const m of (meshes || [])) {
    const mName = String(m.name || m.display || '').toLowerCase();
    if (mName.includes('short') || mName.includes('leg')) return 'shorts';
    if (mName.includes('singlet')) return 'singlet';
    if (mName.includes('hood')) return 'hoodie';
    if (mName.includes('pant')) return 'pants';
  }

  return 'jersey';
}

/**
 * ✂️ Tailored 2D Sewing Pattern Blueprint Component
 */
const Pattern2DView = ({ 
  meshStates = {}, 
  decals = [], 
  layersMetadata = {},
  designName = '',
  category = '',
  meshes = []
}) => {
  const [zoom, setZoom] = useState(1);
  const [showSeamAllowance, setShowSeamAllowance] = useState(true);
  const [showDimensions, setShowDimensions] = useState(true);
  const [showNotches, setShowNotches] = useState(true);
  
  // Auto-detect garment type with user override option
  const autoType = useMemo(() => detectGarmentType(designName, category, meshes), [designName, category, meshes]);
  const [selectedGarment, setSelectedGarment] = useState(null);
  const activeGarment = selectedGarment || autoType;

  const blueprintContainerRef = useRef(null);

  // Colors
  const primaryColor = useMemo(() => getComponentColor(['body', 'atif', 'main', 'base', 'leg', 'front'], meshStates, 0), [meshStates]);
  const secondaryColor = useMemo(() => getComponentColor(['sleeve', 'side', 'stripe', 'panel', 'accent'], meshStates, 1) || primaryColor, [meshStates, primaryColor]);
  const accentColor = useMemo(() => getComponentColor(['collar', 'trim', 'waist', 'neck', 'rib', 'cuff', 'hem'], meshStates, 2) || { isGrad: false, color: '#1e293b' }, [meshStates]);

  // Decals
  const frontDecals = useMemo(() => decals.filter(d => !d.view || d.view === 'front'), [decals]);
  const backDecals = useMemo(() => decals.filter(d => d.view === 'back'), [decals]);
  const leftDecals = useMemo(() => decals.filter(d => d.view === 'left'), [decals]);
  const rightDecals = useMemo(() => decals.filter(d => d.view === 'right'), [decals]);

  const renderFillStyle = (col) => {
    if (col.isGrad) {
      return `linear-gradient(180deg, ${col.grad1}, ${col.grad2})`;
    }
    return col.color || '#ffffff';
  };

  // Export 2D Pattern as SVG / PNG
  const handleExportPattern = () => {
    toast.success(`Exporting 2D ${activeGarment.toUpperCase()} production blueprint...`, { icon: '📐' });
    const printWindow = window.open('', '_blank');
    if (printWindow && blueprintContainerRef.current) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Zarko - 2D Pattern Blueprint (${activeGarment.toUpperCase()})</title>
            <style>
              body { background: #060814; color: #fff; font-family: monospace; padding: 20px; text-align: center; }
              svg { max-width: 100%; height: auto; }
            </style>
          </head>
          <body>
            <h2>ZARKO SPORTSWEAR - 2D PRODUCTION BLUEPRINT (${activeGarment.toUpperCase()})</h2>
            <p>Seam Allowance: 1.2cm (1/2") • Factory Laser Cutting Ready</p>
            ${blueprintContainerRef.current.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="absolute inset-0 bg-[#060814] flex flex-col select-none z-10 overflow-hidden font-['Outfit']">
      
      {/* Top Controls Toolbar */}
      <div className="h-10 border-b border-white/5 bg-[#090b17] px-4 flex items-center justify-between z-20 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[9px] font-black uppercase tracking-wider">
            <HiOutlineScissors size={12} />
            <span>2D SEWING BLUEPRINT: {activeGarment.toUpperCase()}</span>
          </div>

          {/* Garment Selector Overrides */}
          <div className="hidden lg:flex items-center gap-1 bg-white/5 p-0.5 border border-white/10">
            {[
              { id: 'shorts', label: 'SHORTS' },
              { id: 'jersey', label: 'JERSEY' },
              { id: 'singlet', label: 'SINGLET' },
              { id: 'hoodie', label: 'HOODIE' },
              { id: 'pants', label: 'PANTS' },
              { id: 'tank', label: 'TANK' }
            ].map((g) => (
              <button
                key={g.id}
                onClick={() => setSelectedGarment(g.id)}
                className={`px-2 py-0.5 text-[7.5px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  activeGarment === g.id
                    ? 'bg-indigo-600 text-white font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {g.id === autoType ? `* ${g.label}` : g.label}
              </button>
            ))}
          </div>
        </div>

        {/* View Options & Zoom Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSeamAllowance(!showSeamAllowance)}
            className={`px-2.5 py-1 border text-[8.5px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              showSeamAllowance ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            Seam (1.2cm)
          </button>

          <button
            onClick={() => setShowDimensions(!showDimensions)}
            className={`px-2.5 py-1 border text-[8.5px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              showDimensions ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            Dimensions
          </button>

          <div className="flex items-center border border-white/10 bg-white/5">
            <button
              onClick={() => setZoom((z) => Math.max(0.5, z - 0.15))}
              className="px-2 py-1 text-slate-400 hover:text-white border-r border-white/10 transition cursor-pointer"
              title="Zoom Out"
            >
              <HiOutlineZoomOut size={13} />
            </button>
            <span className="px-2 py-1 text-[8.5px] font-mono text-indigo-400 font-bold">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(2.5, z + 0.15))}
              className="px-2 py-1 text-slate-400 hover:text-white transition cursor-pointer"
              title="Zoom In"
            >
              <HiOutlineZoomIn size={13} />
            </button>
          </div>

          <button
            onClick={() => setZoom(1)}
            className="p-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition cursor-pointer"
            title="Reset Zoom"
          >
            <HiOutlineRefresh size={13} />
          </button>

          <button
            onClick={handleExportPattern}
            className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 border border-indigo-400 text-white text-[8.5px] font-black uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer"
            title="Export Production Blueprint"
          >
            <HiOutlineDownload size={13} />
            <span className="hidden sm:inline">Export Blueprint</span>
          </button>
        </div>
      </div>

      {/* Rulers Container */}
      <div className="flex-1 flex flex-col min-h-0 relative">
        {/* Top Horizontal Centimeter Ruler */}
        <div className="h-5 border-b border-white/5 bg-[#090b17] flex items-center justify-between px-6 text-[7px] font-bold text-slate-500 font-mono flex-shrink-0 pl-16">
          <span>0cm</span><span>20cm</span><span>40cm</span><span>60cm</span><span>80cm</span><span>100cm</span><span>120cm</span><span>140cm</span><span>160cm</span>
        </div>

        <div className="flex-1 flex flex-row min-h-0 relative">
          {/* Left Vertical Centimeter Ruler */}
          <div className="w-10 border-r border-white/5 bg-[#090b17] flex flex-col justify-between py-8 items-center text-[7px] font-bold text-slate-500 font-mono flex-shrink-0">
            <span>0cm</span><span>20cm</span><span>40cm</span><span>60cm</span><span>80cm</span><span>100cm</span>
          </div>

          {/* Pattern Pieces Workspace */}
          <div className="flex-1 flex items-center justify-center p-8 overflow-auto custom-scrollbar bg-[radial-gradient(#1e1b4b_1px,transparent_1px)] [background-size:24px_24px]">
            <div 
              ref={blueprintContainerRef}
              className="flex items-center gap-8 md:gap-12 transition-transform duration-150 my-auto py-6"
              style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
            >
              
              {/* ════════════════════════════════════════════════════════════════
                  1. SHORTS BLUEPRINT (Front & Back Legs, Waistband, Side Panels)
                  ════════════════════════════════════════════════════════════════ */}
              {activeGarment === 'shorts' && (
                <>
                  {/* FRONT LEFT LEG */}
                  <div className="flex flex-col items-center gap-2 group">
                    <div className="flex items-center justify-between w-full px-1">
                      <span className="text-[8px] font-black uppercase tracking-widest text-indigo-400">FRONT LEFT LEG</span>
                      <span className="text-[7px] font-bold text-slate-500 font-mono">CUT 1 (PAIR)</span>
                    </div>

                    <div className="relative w-44 h-64 border border-indigo-500/30 p-2 bg-[#090b17]/85 shadow-2xl flex items-center justify-center">
                      <svg viewBox="0 0 100 130" className="w-full h-full filter drop-shadow-md">
                        {/* Seam Allowance */}
                        {showSeamAllowance && (
                          <path
                            d="M 12,12 L 82,12 C 84,40 85,75 88,118 L 18,118 C 14,88 12,60 12,12 Z"
                            fill="none"
                            stroke="#6366f1"
                            strokeWidth="0.8"
                            strokeDasharray="2,2"
                            opacity="0.6"
                          />
                        )}
                        {/* Cut Line */}
                        <path
                          d="M 15,15 L 80,15 C 82,42 83,76 86,115 L 21,115 C 17,86 15,58 15,15 Z"
                          style={{ fill: renderFillStyle(primaryColor) }}
                          stroke="#4f46e5"
                          strokeWidth="1.2"
                        />
                        {/* Front Inseam Curve */}
                        <path d="M 80,15 C 65,45 68,85 86,115" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" strokeDasharray="1,2" />
                        {/* Grainline */}
                        <line x1="48" y1="35" x2="48" y2="95" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
                        <polyline points="45,40 48,35 51,40" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" />
                        <polyline points="45,90 48,95 51,90" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" />
                      </svg>

                      {/* Decals / Thigh Logo Overlay */}
                      <div className="absolute bottom-6 left-6 pointer-events-none">
                        {frontDecals.length > 0 ? (
                          frontDecals.map((d, i) => (
                            <div key={i} className="max-w-[40px]">
                              {d.type === 'image' && d.imageUrl ? (
                                <img src={d.imageUrl} alt="Decal" className="max-w-[32px] max-h-[32px] object-contain drop-shadow" />
                              ) : d.text ? (
                                <span className="text-[9px] font-black uppercase" style={{ color: d.fillColor }}>{d.text}</span>
                              ) : null}
                            </div>
                          ))
                        ) : (
                          <span className="text-[7.5px] font-black text-white/30 uppercase tracking-widest">THIGH CREST</span>
                        )}
                      </div>

                      {showDimensions && (
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[7px] font-mono text-indigo-400 font-bold whitespace-nowrap">
                          W: 32.5 CM • L: 48.0 CM
                        </div>
                      )}
                    </div>
                  </div>

                  {/* BACK LEFT LEG (Deeper Crotch Rise for Seating Ergonomics) */}
                  <div className="flex flex-col items-center gap-2 group">
                    <div className="flex items-center justify-between w-full px-1">
                      <span className="text-[8px] font-black uppercase tracking-widest text-indigo-400">BACK LEFT LEG</span>
                      <span className="text-[7px] font-bold text-slate-500 font-mono">CUT 1 (PAIR)</span>
                    </div>

                    <div className="relative w-44 h-64 border border-indigo-500/30 p-2 bg-[#090b17]/85 shadow-2xl flex items-center justify-center">
                      <svg viewBox="0 0 100 130" className="w-full h-full filter drop-shadow-md">
                        {showSeamAllowance && (
                          <path
                            d="M 12,8 L 88,14 C 92,48 94,80 96,118 L 18,118 C 14,88 12,60 12,8 Z"
                            fill="none"
                            stroke="#6366f1"
                            strokeWidth="0.8"
                            strokeDasharray="2,2"
                            opacity="0.6"
                          />
                        )}
                        <path
                          d="M 15,11 L 86,17 C 90,50 92,81 94,115 L 21,115 C 17,86 15,58 15,11 Z"
                          style={{ fill: renderFillStyle(primaryColor) }}
                          stroke="#4f46e5"
                          strokeWidth="1.2"
                        />
                        {/* High Back Rise Curve */}
                        <path d="M 86,17 C 60,45 65,90 94,115" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" strokeDasharray="1,2" />
                        {/* Grainline */}
                        <line x1="52" y1="35" x2="52" y2="95" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
                        <polyline points="49,40 52,35 55,40" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" />
                        <polyline points="49,90 52,95 55,90" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" />
                      </svg>

                      {/* Back Decal Overlay */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        {backDecals.length > 0 && (
                          <span className="text-[11px] font-black uppercase text-white/90 drop-shadow">
                            {backDecals[0].text || ''}
                          </span>
                        )}
                      </div>

                      {showDimensions && (
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[7px] font-mono text-indigo-400 font-bold whitespace-nowrap">
                          W: 36.0 CM • L: 52.0 CM
                        </div>
                      )}
                    </div>
                  </div>

                  {/* WAISTBAND & SIDE ACCENT STRIPES */}
                  <div className="flex flex-col gap-4">
                    {/* Waistband Elastic Channel */}
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="flex items-center justify-between w-full px-1">
                        <span className="text-[8px] font-black uppercase tracking-widest text-indigo-400">ELASTIC WAISTBAND</span>
                        <span className="text-[7px] font-bold text-slate-500 font-mono">CUT 1 ON FOLD</span>
                      </div>
                      <div 
                        className="w-56 h-12 border border-indigo-500/30 p-1 flex items-center justify-center shadow-lg relative overflow-hidden"
                        style={{ background: renderFillStyle(accentColor) }}
                      >
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_6px,rgba(255,255,255,0.06)_6px,rgba(255,255,255,0.06)_12px)]" />
                        <div className="flex items-center gap-3 z-10">
                          <span className="text-[7.5px] font-mono text-white/80 font-bold">4.0CM ELASTIC CHANNEL</span>
                          <span className="text-[6.5px] font-mono text-indigo-300">| DRAWSTRING NOTCH |</span>
                        </div>
                      </div>
                      {showDimensions && (
                        <span className="text-[6.5px] font-mono text-indigo-400">LENGTH: 86.0 CM • WIDTH: 8.0 CM</span>
                      )}
                    </div>

                    {/* Left & Right Side Accent Stripes */}
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="flex items-center justify-between w-full px-1">
                        <span className="text-[8px] font-black uppercase tracking-widest text-indigo-400">SIDE STRIPES (L & R)</span>
                        <span className="text-[7px] font-bold text-slate-500 font-mono">CUT 2</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-24 h-28 border border-indigo-500/30 flex items-center justify-center shadow-lg relative"
                          style={{ background: renderFillStyle(secondaryColor) }}
                        >
                          <span className="text-[7px] font-black text-white/70 uppercase">L. SIDE PANEL</span>
                        </div>
                        <div 
                          className="w-24 h-28 border border-indigo-500/30 flex items-center justify-center shadow-lg relative"
                          style={{ background: renderFillStyle(secondaryColor) }}
                        >
                          <span className="text-[7px] font-black text-white/70 uppercase">R. SIDE PANEL</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* ════════════════════════════════════════════════════════════════
                  2. SINGLET BLUEPRINT (Wrestling Scoop Body, Racerback, Leg Grippers)
                  ════════════════════════════════════════════════════════════════ */}
              {activeGarment === 'singlet' && (
                <>
                  {/* FRONT SINGLET BODY */}
                  <div className="flex flex-col items-center gap-2 group">
                    <div className="flex items-center justify-between w-full px-1">
                      <span className="text-[8px] font-black uppercase tracking-widest text-indigo-400">SINGLET FRONT BODY</span>
                      <span className="text-[7px] font-bold text-slate-500 font-mono">CUT 1 ON FOLD</span>
                    </div>

                    <div className="relative w-48 h-72 border border-indigo-500/30 p-2 bg-[#090b17]/85 shadow-2xl flex items-center justify-center">
                      <svg viewBox="0 0 100 150" className="w-full h-full filter drop-shadow-md">
                        {showSeamAllowance && (
                          <path
                            d="M 32,8 C 42,22 58,22 68,8 L 82,14 C 74,32 76,50 82,68 L 84,142 L 56,142 C 54,124 50,118 50,118 C 50,118 46,124 44,142 L 16,142 L 18,68 C 24,50 26,32 18,14 Z"
                            fill="none"
                            stroke="#6366f1"
                            strokeWidth="0.8"
                            strokeDasharray="2,2"
                            opacity="0.6"
                          />
                        )}
                        <path
                          d="M 34,11 C 44,24 56,24 66,11 L 80,16 C 72,34 74,52 80,70 L 82,139 L 58,139 C 56,122 50,116 50,116 C 50,116 44,122 42,139 L 18,139 L 20,70 C 26,52 28,34 20,16 Z"
                          style={{ fill: renderFillStyle(primaryColor) }}
                          stroke="#4f46e5"
                          strokeWidth="1.2"
                        />
                        {/* Grainline */}
                        <line x1="50" y1="40" x2="50" y2="100" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
                      </svg>

                      {/* Chest Crest */}
                      <div className="absolute top-20 left-1/2 -translate-x-1/2 pointer-events-none">
                        {frontDecals.length > 0 ? (
                          frontDecals.map((d, i) => (
                            <div key={i}>
                              {d.type === 'image' && d.imageUrl ? (
                                <img src={d.imageUrl} alt="Decal" className="max-w-[36px] max-h-[36px] object-contain drop-shadow" />
                              ) : d.text ? (
                                <span className="text-[10px] font-black uppercase text-white drop-shadow">{d.text}</span>
                              ) : null}
                            </div>
                          ))
                        ) : (
                          <span className="text-[7.5px] font-black text-white/30 uppercase tracking-widest">CHEST BADGE</span>
                        )}
                      </div>

                      {showDimensions && (
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[7px] font-mono text-indigo-400 font-bold whitespace-nowrap">
                          W: 42.0 CM • L: 84.0 CM
                        </div>
                      )}
                    </div>
                  </div>

                  {/* BACK RACERBACK SINGLET */}
                  <div className="flex flex-col items-center gap-2 group">
                    <div className="flex items-center justify-between w-full px-1">
                      <span className="text-[8px] font-black uppercase tracking-widest text-indigo-400">SINGLET RACERBACK</span>
                      <span className="text-[7px] font-bold text-slate-500 font-mono">CUT 1 ON FOLD</span>
                    </div>

                    <div className="relative w-48 h-72 border border-indigo-500/30 p-2 bg-[#090b17]/85 shadow-2xl flex items-center justify-center">
                      <svg viewBox="0 0 100 150" className="w-full h-full filter drop-shadow-md">
                        {showSeamAllowance && (
                          <path
                            d="M 36,6 C 44,14 56,14 64,6 L 80,12 C 68,36 72,56 82,68 L 84,142 L 56,142 C 54,124 50,118 50,118 C 50,118 46,124 44,142 L 16,142 L 18,68 C 28,56 32,36 20,12 Z"
                            fill="none"
                            stroke="#6366f1"
                            strokeWidth="0.8"
                            strokeDasharray="2,2"
                            opacity="0.6"
                          />
                        )}
                        <path
                          d="M 38,9 C 46,16 54,16 62,9 L 78,14 C 66,38 70,58 80,70 L 82,139 L 58,139 C 56,122 50,116 50,116 C 50,116 44,122 42,139 L 18,139 L 20,70 C 30,58 34,38 22,14 Z"
                          style={{ fill: renderFillStyle(primaryColor) }}
                          stroke="#4f46e5"
                          strokeWidth="1.2"
                        />
                      </svg>

                      {/* Back Name */}
                      <div className="absolute top-16 left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center">
                        {backDecals.length > 0 ? (
                          <span className="text-[11px] font-black uppercase text-white drop-shadow">
                            {backDecals[0].text || ''}
                          </span>
                        ) : (
                          <>
                            <span className="text-[7.5px] font-black text-white/40 uppercase tracking-widest">USA / COUNTRY</span>
                            <span className="text-sm font-black text-white/40">00</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* THIGH GRIPPERS & BINDING TRIMS */}
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col items-center gap-1.5">
                      <span className="text-[8px] font-black uppercase tracking-widest text-indigo-400">THIGH GRIPPER BANDS</span>
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-24 h-10 border border-indigo-500/30 flex items-center justify-center shadow-lg"
                          style={{ background: renderFillStyle(accentColor) }}
                        >
                          <span className="text-[7px] font-mono text-white/80">L. GRIPPER</span>
                        </div>
                        <div 
                          className="w-24 h-10 border border-indigo-500/30 flex items-center justify-center shadow-lg"
                          style={{ background: renderFillStyle(accentColor) }}
                        >
                          <span className="text-[7px] font-mono text-white/80">R. GRIPPER</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-1.5">
                      <span className="text-[8px] font-black uppercase tracking-widest text-indigo-400">ARMHOLE & NECK BINDING</span>
                      <div 
                        className="w-52 h-8 border border-indigo-500/30 flex items-center justify-center shadow-lg"
                        style={{ background: renderFillStyle(secondaryColor) }}
                      >
                        <span className="text-[7px] font-mono text-white/80">1.8CM ELASTANE BINDING STRIP</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* ════════════════════════════════════════════════════════════════
                  3. JERSEY / T-SHIRT / TANK BLUEPRINT (Standard Kit)
                  ════════════════════════════════════════════════════════════════ */}
              {(activeGarment === 'jersey' || activeGarment === 'tank' || activeGarment === 'hoodie' || activeGarment === 'pants') && (
                <>
                  {/* FRONT TORSO PANEL */}
                  <div className="flex flex-col items-center gap-2 group">
                    <div className="flex items-center justify-between w-full px-1">
                      <span className="text-[8px] font-black uppercase tracking-widest text-indigo-400">FRONT PANEL</span>
                      <span className="text-[7.5px] font-bold text-slate-500 font-mono">CUT 1 ON FOLD</span>
                    </div>

                    <div className="relative w-44 h-64 border border-indigo-500/30 p-2 bg-[#090b17]/85 shadow-2xl flex items-center justify-center">
                      <svg viewBox="0 0 100 140" className="w-full h-full filter drop-shadow-md">
                        {showSeamAllowance && (
                          <path
                            d="M 28,12 C 40,24 60,24 72,12 L 86,22 C 81,35 83,48 88,52 L 82,134 L 18,134 L 12,52 C 17,48 19,35 14,22 Z"
                            fill="none"
                            stroke="#6366f1"
                            strokeWidth="0.8"
                            strokeDasharray="2,2"
                            opacity="0.6"
                          />
                        )}
                        <path
                          d="M 30,15 C 40,26 60,26 70,15 L 84,24 C 79,36 81,46 86,50 L 80,130 L 20,130 L 14,50 C 19,46 21,36 16,24 Z"
                          style={{ fill: renderFillStyle(primaryColor) }}
                          stroke="#4f46e5"
                          strokeWidth="1.2"
                        />
                        <line x1="50" y1="45" x2="50" y2="105" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
                      </svg>

                      {/* Front Logo Overlay */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-4">
                        {frontDecals.length > 0 ? (
                          frontDecals.map((d, i) => (
                            <div key={i} className="flex flex-col items-center justify-center max-w-[80px]">
                              {d.type === 'image' && d.imageUrl ? (
                                <img src={d.imageUrl} alt="Decal" className="max-w-[42px] max-h-[42px] object-contain drop-shadow-md" />
                              ) : d.text ? (
                                <span className="text-[10px] font-black uppercase text-white drop-shadow-md" style={{ color: d.fillColor }}>
                                  {d.text}
                                </span>
                              ) : null}
                            </div>
                          ))
                        ) : (
                          <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">CHEST CREST</span>
                        )}
                      </div>

                      {showDimensions && (
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[7px] font-mono text-indigo-400 font-bold whitespace-nowrap">
                          W: 54.0 CM • L: 72.0 CM
                        </div>
                      )}
                    </div>
                  </div>

                  {/* BACK TORSO PANEL */}
                  <div className="flex flex-col items-center gap-2 group">
                    <div className="flex items-center justify-between w-full px-1">
                      <span className="text-[8px] font-black uppercase tracking-widest text-indigo-400">BACK PANEL</span>
                      <span className="text-[7.5px] font-bold text-slate-500 font-mono">CUT 1 ON FOLD</span>
                    </div>

                    <div className="relative w-44 h-64 border border-indigo-500/30 p-2 bg-[#090b17]/85 shadow-2xl flex items-center justify-center">
                      <svg viewBox="0 0 100 140" className="w-full h-full filter drop-shadow-md">
                        {showSeamAllowance && (
                          <path
                            d="M 28,8 C 40,16 60,16 72,8 L 86,20 C 81,33 83,46 88,50 L 82,134 L 18,134 L 12,50 C 17,46 19,33 14,20 Z"
                            fill="none"
                            stroke="#6366f1"
                            strokeWidth="0.8"
                            strokeDasharray="2,2"
                            opacity="0.6"
                          />
                        )}
                        <path
                          d="M 30,11 C 40,18 60,18 70,11 L 84,22 C 79,34 81,44 86,48 L 80,130 L 20,130 L 14,48 C 19,44 21,34 16,22 Z"
                          style={{ fill: renderFillStyle(primaryColor) }}
                          stroke="#4f46e5"
                          strokeWidth="1.2"
                        />
                      </svg>

                      {/* Back Player Overlay */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-4 pt-8 gap-0.5">
                        {backDecals.length > 0 ? (
                          backDecals.map((d, i) => (
                            <div key={i} className="flex flex-col items-center justify-center">
                              {d.text && (
                                <span className="text-[12px] font-black uppercase text-white drop-shadow-md" style={{ color: d.fillColor }}>
                                  {d.text}
                                </span>
                              )}
                            </div>
                          ))
                        ) : (
                          <>
                            <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">PLAYER NAME</span>
                            <span className="text-xl font-black text-white/40 tracking-tighter">00</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* SLEEVES & COLLAR */}
                  <div className="flex flex-col gap-5">
                    {/* Left & Right Sleeves */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center justify-between w-full px-1">
                        <span className="text-[8px] font-black uppercase tracking-widest text-indigo-400">SLEEVES (L & R)</span>
                        <span className="text-[7.5px] font-bold text-slate-500 font-mono">CUT 2 (PAIR)</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="relative w-28 h-36 border border-indigo-500/30 p-1.5 bg-[#090b17]/85 shadow-2xl flex items-center justify-center">
                          <svg viewBox="0 0 100 120" className="w-full h-full filter drop-shadow-md">
                            <path
                              d="M 15,40 C 28,12 72,12 85,40 L 78,110 L 22,110 Z"
                              style={{ fill: renderFillStyle(secondaryColor) }}
                              stroke="#4f46e5"
                              strokeWidth="1.2"
                            />
                          </svg>
                          <span className="absolute bottom-3 text-[7.5px] font-black text-white/60 uppercase">L. SLEEVE</span>
                        </div>

                        <div className="relative w-28 h-36 border border-indigo-500/30 p-1.5 bg-[#090b17]/85 shadow-2xl flex items-center justify-center">
                          <svg viewBox="0 0 100 120" className="w-full h-full filter drop-shadow-md">
                            <path
                              d="M 15,40 C 28,12 72,12 85,40 L 78,110 L 22,110 Z"
                              style={{ fill: renderFillStyle(secondaryColor) }}
                              stroke="#4f46e5"
                              strokeWidth="1.2"
                            />
                          </svg>
                          <span className="absolute bottom-3 text-[7.5px] font-black text-white/60 uppercase">R. SLEEVE</span>
                        </div>
                      </div>
                    </div>

                    {/* Collar Rib Piece */}
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="flex items-center justify-between w-full px-1">
                        <span className="text-[8px] font-black uppercase tracking-widest text-indigo-400">COLLAR RIB TRIM</span>
                        <span className="text-[7.5px] font-bold text-slate-500 font-mono">CUT 1</span>
                      </div>
                      <div 
                        className="w-full h-9 border border-indigo-500/30 flex items-center justify-center shadow-lg relative overflow-hidden"
                        style={{ background: renderFillStyle(accentColor) }}
                      >
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,rgba(255,255,255,0.06)_4px,rgba(255,255,255,0.06)_8px)]" />
                        <span className="text-[8px] font-black text-white/80 uppercase tracking-widest z-10">COLLAR / RIB</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* Footer Info Strip */}
      <div className="h-7 bg-[#070914] border-t border-white/5 px-4 flex items-center justify-between text-[7.5px] font-mono text-slate-500 z-20 flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-indigo-400">ACTIVE BLUEPRINT: {activeGarment.toUpperCase()}_PATTERN_ENGINE</span>
          <span>FORMAT: DXF / PDF / GERBER_COMPATIBLE</span>
        </div>
        <span>FACTORY LASER CUTTING & DYE-SUBLIMATION READY</span>
      </div>

    </div>
  );
};

export default Pattern2DView;
