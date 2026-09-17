import React, { useState, useMemo } from 'react';
import { HiOutlineScissors, HiOutlineZoomIn, HiOutlineZoomOut, HiOutlineRefresh, HiOutlineInformationCircle } from 'react-icons/hi';

const getComponentColor = (keyword, meshStates, fallbackIndex = 0) => {
  const keys = Object.keys(meshStates || {});
  
  const matchKey = keys.find(k => k.toLowerCase().includes(keyword.toLowerCase()));
  if (matchKey && meshStates[matchKey]) {
    const s = meshStates[matchKey];
    if (s.isGrad && s.grad1 && s.grad2) {
      return { isGrad: true, grad1: s.grad1, grad2: s.grad2 };
    }
    return { isGrad: false, color: s.color || '#ffffff' };
  }

  if (keys.length > 0) {
    const idx = Math.min(fallbackIndex, keys.length - 1);
    const key = keys[idx];
    const s = meshStates[key];
    if (s) {
      if (s.isGrad && s.grad1 && s.grad2) {
        return { isGrad: true, grad1: s.grad1, grad2: s.grad2 };
      }
      return { isGrad: false, color: s.color || '#ffffff' };
    }
  }

  return { isGrad: false, color: '#ffffff' };
};

/**
 * ✂️ Realistic 2D Tailoring Sewing Pattern Blueprint Component
 */
const Pattern2DView = ({ meshStates = {}, decals = [], layersMetadata = {} }) => {
  const [zoom, setZoom] = useState(1);
  const [showSeamAllowance, setShowSeamAllowance] = useState(true);
  const [showDimensions, setShowDimensions] = useState(true);

  // Derive part colors
  const bodyColor = useMemo(() => getComponentColor('body', meshStates, 0), [meshStates]);
  const leftSleeveColor = useMemo(() => getComponentColor('sleeve', meshStates, 1) || bodyColor, [meshStates, bodyColor]);
  const rightSleeveColor = useMemo(() => getComponentColor('sleeve', meshStates, 2) || leftSleeveColor, [meshStates, leftSleeveColor]);
  const collarColor = useMemo(() => getComponentColor('collar', meshStates, 3) || getComponentColor('neck', meshStates, 3) || { isGrad: false, color: '#0f172a' }, [meshStates]);

  // Filter decals per panel
  const frontDecals = useMemo(() => decals.filter(d => !d.view || d.view === 'front'), [decals]);
  const backDecals = useMemo(() => decals.filter(d => d.view === 'back'), [decals]);
  const sleeveDecals = useMemo(() => decals.filter(d => d.view === 'left' || d.view === 'right'), [decals]);

  const renderFillStyle = (col) => {
    if (col.isGrad) {
      return `linear-gradient(180deg, ${col.grad1}, ${col.grad2})`;
    }
    return col.color || '#ffffff';
  };

  return (
    <div className="absolute inset-0 bg-[#060814] flex flex-col select-none z-10 overflow-hidden font-['Outfit']">
      
      {/* Top Controls Toolbar */}
      <div className="h-10 border-b border-white/5 bg-[#090b17] px-4 flex items-center justify-between z-20 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[9px] font-black uppercase tracking-wider">
            <HiOutlineScissors size={12} />
            <span>SEWING PATTERN BLUEPRINT</span>
          </div>
          <span className="text-[8.5px] font-bold text-slate-400 font-mono hidden md:inline">
            SCALE 1:1 • SEAM ALLOWANCE: 1.2CM (1/2") • READY FOR LASER CUTTING
          </span>
        </div>

        {/* View Options & Zoom Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSeamAllowance(!showSeamAllowance)}
            className={`px-2.5 py-1 border text-[8.5px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              showSeamAllowance ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            Seam Allowance
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
              onClick={() => setZoom((z) => Math.max(0.6, z - 0.15))}
              className="px-2 py-1 text-slate-400 hover:text-white border-r border-white/10 transition cursor-pointer"
              title="Zoom Out"
            >
              <HiOutlineZoomOut size={13} />
            </button>
            <span className="px-2 py-1 text-[8.5px] font-mono text-indigo-400 font-bold">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(2.0, z + 0.15))}
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
        </div>
      </div>

      {/* Rulers Container */}
      <div className="flex-1 flex flex-col min-h-0 relative">
        {/* Top Horizontal Centimeter Ruler */}
        <div className="h-5 border-b border-white/5 bg-[#090b17] flex items-center justify-between px-6 text-[7px] font-bold text-slate-500 font-mono flex-shrink-0 pl-16">
          <span>0cm</span><span>20cm</span><span>40cm</span><span>60cm</span><span>80cm</span><span>100cm</span><span>120cm</span><span>140cm</span>
        </div>

        <div className="flex-1 flex flex-row min-h-0 relative">
          {/* Left Vertical Centimeter Ruler */}
          <div className="w-10 border-r border-white/5 bg-[#090b17] flex flex-col justify-between py-8 items-center text-[7px] font-bold text-slate-500 font-mono flex-shrink-0">
            <span>0cm</span><span>20cm</span><span>40cm</span><span>60cm</span><span>80cm</span><span>100cm</span>
          </div>

          {/* Pattern Pieces Workspace */}
          <div className="flex-1 flex items-center justify-center p-8 overflow-auto custom-scrollbar bg-[radial-gradient(#1e1b4b_1px,transparent_1px)] [background-size:24px_24px]">
            <div 
              className="flex items-center gap-10 md:gap-14 transition-transform duration-150 my-auto py-6"
              style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
            >
              
              {/* ── 1. FRONT PANEL PATTERN PIECE ── */}
              <div className="flex flex-col items-center gap-2 group">
                <div className="flex items-center justify-between w-full px-1">
                  <span className="text-[8px] font-black uppercase tracking-widest text-indigo-400">FRONT PANEL</span>
                  <span className="text-[7.5px] font-bold text-slate-500 font-mono">CUT 1 ON FOLD</span>
                </div>

                <div className="relative w-44 h-64 border border-indigo-500/30 p-2 bg-[#090b17]/80 shadow-2xl flex items-center justify-center">
                  <svg viewBox="0 0 100 140" className="w-full h-full filter drop-shadow-md">
                    {/* Seam Allowance Outer Boundary */}
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

                    {/* True Contoured Tailored Front Jersey Silhouette */}
                    <path
                      d="M 30,15 C 40,26 60,26 70,15 L 84,24 C 79,36 81,46 86,50 L 80,130 L 20,130 L 14,50 C 19,46 21,36 16,24 Z"
                      style={{ fill: renderFillStyle(bodyColor) }}
                      stroke="#4f46e5"
                      strokeWidth="1.2"
                    />

                    {/* Grainline Arrow */}
                    <line x1="50" y1="45" x2="50" y2="105" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
                    <polyline points="47,50 50,45 53,50" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
                    <polyline points="47,100 50,105 53,100" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
                  </svg>

                  {/* Live Front Logo Overlay */}
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

                  {/* Dimensions Annotations */}
                  {showDimensions && (
                    <>
                      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[7px] font-mono text-indigo-400 font-bold whitespace-nowrap">
                        W: 54.0 CM
                      </div>
                      <div className="absolute -left-5 top-1/2 -translate-y-1/2 -rotate-90 text-[7px] font-mono text-indigo-400 font-bold whitespace-nowrap">
                        L: 72.0 CM
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* ── 2. BACK PANEL PATTERN PIECE ── */}
              <div className="flex flex-col items-center gap-2 group">
                <div className="flex items-center justify-between w-full px-1">
                  <span className="text-[8px] font-black uppercase tracking-widest text-indigo-400">BACK PANEL</span>
                  <span className="text-[7.5px] font-bold text-slate-500 font-mono">CUT 1 ON FOLD</span>
                </div>

                <div className="relative w-44 h-64 border border-indigo-500/30 p-2 bg-[#090b17]/80 shadow-2xl flex items-center justify-center">
                  <svg viewBox="0 0 100 140" className="w-full h-full filter drop-shadow-md">
                    {/* Seam Allowance Outer Boundary */}
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

                    {/* True Contoured Tailored Back Jersey Silhouette */}
                    <path
                      d="M 30,11 C 40,18 60,18 70,11 L 84,22 C 79,34 81,44 86,48 L 80,130 L 20,130 L 14,48 C 19,44 21,34 16,22 Z"
                      style={{ fill: renderFillStyle(bodyColor) }}
                      stroke="#4f46e5"
                      strokeWidth="1.2"
                    />

                    {/* Grainline Arrow */}
                    <line x1="50" y1="40" x2="50" y2="105" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
                    <polyline points="47,45 50,40 53,45" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
                    <polyline points="47,100 50,105 53,100" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
                  </svg>

                  {/* Live Back Player Name & Number Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-4 pt-8 gap-0.5">
                    {backDecals.length > 0 ? (
                      backDecals.map((d, i) => (
                        <div key={i} className="flex flex-col items-center justify-center">
                          {d.text ? (
                            <span className="text-[12px] font-black uppercase text-white drop-shadow-md" style={{ color: d.fillColor }}>
                              {d.text}
                            </span>
                          ) : null}
                        </div>
                      ))
                    ) : (
                      <>
                        <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">PLAYER NAME</span>
                        <span className="text-xl font-black text-white/40 tracking-tighter">00</span>
                      </>
                    )}
                  </div>

                  {/* Dimensions Annotations */}
                  {showDimensions && (
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[7px] font-mono text-indigo-400 font-bold whitespace-nowrap">
                      W: 54.0 CM
                    </div>
                  )}
                </div>
              </div>

              {/* ── 3. SLEEVES & COLLAR PATTERN PIECES ── */}
              <div className="flex flex-col gap-5">
                
                {/* Left & Right Sleeves */}
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center justify-between w-full px-1">
                    <span className="text-[8px] font-black uppercase tracking-widest text-indigo-400">SLEEVES (L & R)</span>
                    <span className="text-[7.5px] font-bold text-slate-500 font-mono">CUT 2 (PAIR)</span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Left Sleeve Piece */}
                    <div className="relative w-28 h-36 border border-indigo-500/30 p-1.5 bg-[#090b17]/80 shadow-2xl flex items-center justify-center">
                      <svg viewBox="0 0 100 120" className="w-full h-full filter drop-shadow-md">
                        {showSeamAllowance && (
                          <path
                            d="M 12,38 C 25,8 75,8 88,38 L 80,114 L 20,114 Z"
                            fill="none"
                            stroke="#6366f1"
                            strokeWidth="0.8"
                            strokeDasharray="2,2"
                            opacity="0.6"
                          />
                        )}
                        <path
                          d="M 15,40 C 28,12 72,12 85,40 L 78,110 L 22,110 Z"
                          style={{ fill: renderFillStyle(leftSleeveColor) }}
                          stroke="#4f46e5"
                          strokeWidth="1.2"
                        />
                      </svg>
                      <span className="absolute bottom-3 text-[7.5px] font-black text-white/50 uppercase">L. SLEEVE</span>
                    </div>

                    {/* Right Sleeve Piece */}
                    <div className="relative w-28 h-36 border border-indigo-500/30 p-1.5 bg-[#090b17]/80 shadow-2xl flex items-center justify-center">
                      <svg viewBox="0 0 100 120" className="w-full h-full filter drop-shadow-md">
                        {showSeamAllowance && (
                          <path
                            d="M 12,38 C 25,8 75,8 88,38 L 80,114 L 20,114 Z"
                            fill="none"
                            stroke="#6366f1"
                            strokeWidth="0.8"
                            strokeDasharray="2,2"
                            opacity="0.6"
                          />
                        )}
                        <path
                          d="M 15,40 C 28,12 72,12 85,40 L 78,110 L 22,110 Z"
                          style={{ fill: renderFillStyle(rightSleeveColor) }}
                          stroke="#4f46e5"
                          strokeWidth="1.2"
                        />
                      </svg>
                      <span className="absolute bottom-3 text-[7.5px] font-black text-white/50 uppercase">R. SLEEVE</span>
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
                    style={{ background: renderFillStyle(collarColor) }}
                  >
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,rgba(255,255,255,0.06)_4px,rgba(255,255,255,0.06)_8px)]" />
                    <span className="text-[8px] font-black text-white/70 uppercase tracking-widest z-10">COLLAR / RIB</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Footer Info Strip */}
      <div className="h-7 bg-[#070914] border-t border-white/5 px-4 flex items-center justify-between text-[7.5px] font-mono text-slate-500 z-20 flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-indigo-400">SYSTEM: 2D_CLOTH_PATTERN_ENGINE</span>
          <span>FORMAT: DXF / PDF / GERBER_COMPATIBLE</span>
        </div>
        <span>FACTORY LASER CUTTING READY</span>
      </div>

    </div>
  );
};

export default Pattern2DView;
