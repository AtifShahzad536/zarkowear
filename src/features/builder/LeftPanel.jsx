import React, { useState, useEffect } from 'react';
import ModelViewer from './ModelViewer';
import { 
  HiOutlineCamera, HiOutlineZoomIn, HiOutlineZoomOut, 
  HiOutlineChevronDown, HiOutlineChevronRight, HiOutlineX, 
  HiOutlineLockClosed, HiOutlineSearch, HiOutlinePlay, 
  HiOutlinePause, HiOutlineChevronLeft, HiOutlinePhotograph,
  HiOutlinePlus
} from 'react-icons/hi';
import { VscFiles, VscMenu, VscLayers, VscSymbolColor } from 'react-icons/vsc';
import { BiCube, BiPalette, BiImage, BiText, BiCart, BiWater } from 'react-icons/bi';
import toast from 'react-hot-toast';

const formatMeshName = (name) => {
  const clean = String(name).replace(/\.obj$/i, '').replace(/_/g, ' ');
  if (clean.toLowerCase() === 'atif') return 'Base Fabric Core';
  if (clean.toLowerCase().includes('cloth mesh 1')) return 'Neckline Trim';
  if (clean.toLowerCase().includes('cloth mesh 2')) return 'Left Sleeve Panel';
  if (clean.toLowerCase().includes('cloth mesh 3')) return 'Right Sleeve Panel';
  if (clean.toLowerCase().includes('cloth mesh 4')) return 'Hem & Seam Accents';
  if (clean.toLowerCase().includes('cloth mesh')) return 'Sportswear Stitching';
  return clean.charAt(0).toUpperCase() + clean.slice(1);
};

const getComponentColor = (keyword, meshStates, fallbackIndex = 0) => {
  const keys = Object.keys(meshStates || {});
  
  // 1. Try formatted humanName matching
  const matchKey = keys.find(k => {
    const humanName = formatMeshName(k);
    return humanName.toLowerCase().includes(keyword.toLowerCase());
  });

  if (matchKey && meshStates[matchKey]) {
    const s = meshStates[matchKey];
    if (s.isGrad && s.grad1 && s.grad2) {
      return `linear-gradient(135deg, ${s.grad1}, ${s.grad2})`;
    }
    return s.color || '#ffffff';
  }

  // 2. Try raw key matching
  const rawMatch = keys.find(k => k.toLowerCase().includes(keyword.toLowerCase()));
  if (rawMatch && meshStates[rawMatch]) {
    const s = meshStates[rawMatch];
    if (s.isGrad && s.grad1 && s.grad2) {
      return `linear-gradient(135deg, ${s.grad1}, ${s.grad2})`;
    }
    return s.color || '#ffffff';
  }

  // 3. Fallback to order-based index
  if (keys.length > 0) {
    const idx = Math.min(fallbackIndex, keys.length - 1);
    const key = keys[idx];
    const s = meshStates[key];
    if (s && s.color) {
      if (s.isGrad && s.grad1 && s.grad2) {
        return `linear-gradient(135deg, ${s.grad1}, ${s.grad2})`;
      }
      return s.color;
    }
  }

  return '#ffffff';
};

const isMeshInSameGroup = (idA, idB, layersMetadata) => {
  if (!idA || !idB) return false;

  const norm = (id) => id.replace(/\.obj$/i, '');
  const normA = norm(idA);
  const normB = norm(idB);

  if (normA === normB) return true;

  const metaA = layersMetadata[idA] || layersMetadata[normA] || layersMetadata[normA + '.obj'] || {};
  const metaB = layersMetadata[idB] || layersMetadata[normB] || layersMetadata[normB + '.obj'] || {};

  const parentA = norm(metaA.merge_parent || idA);
  const parentB = norm(metaB.merge_parent || idB);

  return parentA === parentB;
};

const ActivityBtn = ({ icon, label, onClick, active = false }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center transition-all relative group cursor-pointer w-12 h-12
      ${active ? 'text-indigo-400' : 'text-slate-400 hover:text-white'}`}
    title={label}
  >
    <span className="text-xl">{icon}</span>
    {active && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-indigo-500 shadow-[2px_0_8px_rgba(99,102,241,0.4)]" />}
    <div className="absolute left-full ml-2 px-2 py-1 bg-slate-900 text-white text-[8px] font-bold uppercase tracking-widest rounded-none opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
      {label}
    </div>
  </button>
);

const UVBlueprintView = ({ meshStates = {} }) => {
  const baseColor = getComponentColor('Fabric Core', meshStates, 0) || '#ffffff';
  const leftSleeveColor = getComponentColor('Left Sleeve', meshStates, 2) || baseColor;
  const rightSleeveColor = getComponentColor('Right Sleeve', meshStates, 3) || baseColor;
  const isGradient = baseColor.startsWith('linear');

  return (
    <div className="absolute inset-0 bg-[#070913] overflow-auto custom-scrollbar p-6 select-none z-10 flex items-center justify-start md:justify-center">
      <div className="w-full max-w-[380px] min-w-[300px] aspect-square border border-indigo-500/20 bg-[#090b15]/60 relative flex flex-col items-center justify-center p-4 flex-shrink-0 my-auto">
        <div className="absolute top-2 left-2 text-[7.5px] font-bold text-slate-500 font-mono">UV COORDINATES (0.0 - 1.0)</div>
        
        {/* Semi-transparent grid backdrop indicating fabric background */}
        <div className="absolute inset-4 opacity-10 blur-[2px]" 
             style={{ 
               background: isGradient ? baseColor : undefined,
               backgroundColor: isGradient ? undefined : baseColor
             }} 
        />
        
        <svg viewBox="0 0 100 100" className="w-full h-full text-indigo-500/40 fill-none stroke-current stroke-[0.4] relative z-10">
          {/* Main Jersey body UV layout block filled with dynamic color */}
          <path d="M 30,10 L 70,10 L 75,30 L 70,80 L 30,80 L 25,30 Z" className="stroke-indigo-500/80" 
                style={{ 
                  fill: isGradient ? 'rgba(99, 102, 241, 0.15)' : baseColor, 
                  fillOpacity: isGradient ? 0.15 : 0.75 
                }} 
          />
          <path d="M 30,20 L 70,20 M 27,40 L 73,40 M 29,60 L 71,60 M 40,10 L 40,80 M 50,10 L 50,80 M 60,10 L 60,80" className="stroke-indigo-500/25" />
          
          {/* Left sleeve piece */}
          <path d="M 10,20 L 23,25 L 20,45 L 8,40 Z" className="stroke-indigo-500/80" 
                style={{ 
                  fill: leftSleeveColor.startsWith('linear') ? 'rgba(99, 102, 241, 0.15)' : leftSleeveColor, 
                  fillOpacity: leftSleeveColor.startsWith('linear') ? 0.15 : 0.75 
                }} 
          />
          
          {/* Right sleeve piece */}
          <path d="M 90,20 L 77,25 L 80,45 L 92,40 Z" className="stroke-indigo-500/80" 
                style={{ 
                  fill: rightSleeveColor.startsWith('linear') ? 'rgba(99, 102, 241, 0.15)' : rightSleeveColor, 
                  fillOpacity: rightSleeveColor.startsWith('linear') ? 0.15 : 0.75 
                }} 
          />
        </svg>

        <div className="absolute bottom-3 left-3 bg-slate-950/80 border border-white/5 px-2 py-1 text-[7px] font-bold text-indigo-400 font-mono flex flex-col gap-0.5">
          <span>SHEET: UV_MAP_JERSEY_GEN_1</span>
          <span>RESOLUTION: 2048 x 2048 PX</span>
        </div>
      </div>
    </div>
  );
};

const Pattern2DView = ({ meshStates = {} }) => {
  const bodyColor = getComponentColor('Fabric Core', meshStates, 0) || '#ffffff';
  const leftSleeveColor = getComponentColor('Left Sleeve', meshStates, 2) || bodyColor;
  const rightSleeveColor = getComponentColor('Right Sleeve', meshStates, 3) || bodyColor;
  const collarColor = getComponentColor('Neckline', meshStates, 1) || '#0f172a';

  return (
    <div className="absolute inset-0 bg-[#070913] flex flex-col select-none z-10 overflow-hidden">
      {/* Floating coordinates rulers (sticky at top/left viewport borders) */}
      <div className="h-5 border-b border-white/5 bg-[#0e101f]/60 flex items-center justify-between px-4 text-[7px] font-bold text-slate-500 font-mono flex-shrink-0 pl-14">
        <span>0cm</span><span>20cm</span><span>40cm</span><span>60cm</span><span>80cm</span><span>100cm</span>
      </div>

      <div className="flex-1 flex flex-row min-h-0 relative">
        {/* Left ruler */}
        <div className="w-10 border-r border-white/5 bg-[#0e101f]/60 flex flex-col justify-between py-6 items-center text-[7px] font-bold text-slate-500 font-mono flex-shrink-0">
          <span>0cm</span><span>20cm</span><span>40cm</span><span>60cm</span><span>80cm</span>
        </div>

        {/* Workspace centered container without scrollbars */}
        <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
          <div className="flex items-center gap-6 py-2 my-auto">
            
            {/* FRONT PANEL */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-[7.5px] font-bold uppercase tracking-widest text-slate-500">FRONT PANEL</span>
              <div className="w-24 h-36 border border-white/10 relative overflow-hidden flex items-center justify-center shadow-lg transition-all"
                   style={{ 
                     background: bodyColor.startsWith('linear') ? bodyColor : undefined,
                     backgroundColor: bodyColor.startsWith('linear') ? undefined : bodyColor
                   }}>
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:10px_10px]" />
                <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">FRONT</span>
              </div>
            </div>

            {/* BACK PANEL */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-[7.5px] font-bold uppercase tracking-widest text-slate-500">BACK PANEL</span>
              <div className="w-24 h-36 border border-white/10 relative overflow-hidden flex items-center justify-center shadow-lg transition-all"
                   style={{ 
                     background: bodyColor.startsWith('linear') ? bodyColor : undefined,
                     backgroundColor: bodyColor.startsWith('linear') ? undefined : bodyColor
                   }}>
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:10px_10px]" />
                <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">BACK</span>
              </div>
            </div>

            {/* SLEEVES & COLLAR DOCK */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col items-center gap-1">
                <span className="text-[7.5px] font-bold uppercase tracking-widest text-slate-500">L. SLEEVE</span>
                <div className="w-16 h-12 border border-white/10 relative overflow-hidden flex items-center justify-center shadow-lg transition-all"
                     style={{ 
                       background: leftSleeveColor.startsWith('linear') ? leftSleeveColor : undefined,
                       backgroundColor: leftSleeveColor.startsWith('linear') ? undefined : leftSleeveColor
                     }}>
                  <span className="text-[7.5px] font-black text-white/40 uppercase tracking-wider">LEFT</span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-1">
                <span className="text-[7.5px] font-bold uppercase tracking-widest text-slate-500">R. SLEEVE</span>
                <div className="w-16 h-12 border border-white/10 relative overflow-hidden flex items-center justify-center shadow-lg transition-all"
                     style={{ 
                       background: rightSleeveColor.startsWith('linear') ? rightSleeveColor : undefined,
                       backgroundColor: rightSleeveColor.startsWith('linear') ? undefined : rightSleeveColor
                     }}>
                  <span className="text-[7.5px] font-black text-white/40 uppercase tracking-wider">RIGHT</span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-1">
                <span className="text-[7.5px] font-bold uppercase tracking-widest text-slate-500">COLLAR</span>
                <div className="w-16 h-5 border border-white/10 relative overflow-hidden flex items-center justify-center shadow-lg transition-all"
                     style={{ 
                       background: collarColor.startsWith('linear') ? collarColor : undefined,
                       backgroundColor: collarColor.startsWith('linear') ? undefined : collarColor
                     }}>
                  <span className="text-[6.5px] font-black text-white/40 uppercase tracking-wider">NECK</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

const LeftPanel = ({
  modelUrl,
  layersMetadata = {},
  meshes,
  activeMesh,
  setActiveMesh,
  meshStates,
  updateMeshProp,
  onMeshesDetected,
  decals,
  selectedDecalId,
  setSelectedDecalId,
  updateDecal,
  removeDecal,
  addDecal,
  defaultPatterns = [],
  defaultLogos = [],
  globalPattern,
  materialFinish,
  lightingPreset,
  mouseFollow,
  isHUDVisible = true,
  assetSubTab,
  setAssetSubTab,
  rightPanelComponent
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isOutlinerExpanded, setIsOutlinerExpanded] = useState(true);
  const [isPropertiesExpanded, setIsPropertiesExpanded] = useState(true);
  const [isAssetsExpanded, setIsAssetsExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [outlinerSearch, setOutlinerSearch] = useState('');
  const [assetSearch, setAssetSearch] = useState('');
  const [assetViewMode, setAssetViewMode] = useState('grid');
  const [assetFilter, setAssetFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('3D View'); // '3D View', 'UV View', '2D Pattern'
  
  // Playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [timelineVal, setTimelineVal] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setIsSidebarOpen(true);
      else setIsSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeState = activeMesh ? (meshStates[activeMesh] || {}) : {};
  const activeMeta = activeMesh ? (layersMetadata[activeMesh] || {}) : {};
  const activeDisplayName = activeState.displayName || activeMeta.display_name || (activeMesh ? formatMeshName(activeMesh) : '');

  const fabricPresets = [
    { id: 'fleece', name: 'Fleece', color: '#a1a8b5', category: 'Warm' },
    { id: 'mesh_knit', name: 'Mesh', color: '#5b6473', category: 'Performance' },
    { id: 'jersey_knit', name: 'Jersey', color: '#7e8796', category: 'Performance' },
    { id: 'cotton', name: 'Cotton', color: '#cbd5e1', category: 'Natural' },
    { id: 'polyester', name: 'Polyester', color: '#475569', category: 'Synthetic' },
    { id: 'ripstop', name: 'Ripstop', color: '#1e293b', category: 'Synthetic' },
    { id: 'pique', name: 'Pique', color: '#334155', category: 'Performance' },
    { id: 'wool', name: 'Wool', color: '#0f172a', category: 'Natural' },
    { id: 'satin', name: 'Satin', color: '#e2e8f0', category: 'Natural' },
    { id: 'nylon', name: 'Nylon', color: '#94a3b8', category: 'Synthetic' },
  ];

  return (
    <div className="flex-1 flex flex-col md:flex-row h-full relative bg-[#090b15] overflow-hidden font-['Outfit']">

      {/* ── MOBILE BACKDROP OVERLAY ── */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-[2px] z-[55] animate-in fade-in duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ── 1. ACTIVITY BAR ── */}
      {!isMobile && (
        <div className={`transition-all duration-500 ease-in-out z-40 flex flex-col items-center bg-[#0c0e1a] border-r border-white/5 flex-shrink-0
          ${isHUDVisible ? 'w-12 h-full' : 'w-0 h-0 opacity-0 pointer-events-none'}`}
        >
          <ActivityBtn icon={<VscLayers size={20} />} label="Kit Designer" active={isSidebarOpen} onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        </div>
      )}

      {/* ── 2. SIDE BAR (Outliner + Properties Drawer) ── */}
      <div className={`transition-all duration-500 ease-in-out z-[80] flex flex-col bg-[#0c0e1a] border-r border-white/5 flex-shrink-0 overflow-hidden
        ${isMobile ? 'fixed inset-y-0 left-0 shadow-2xl' : 'relative'}
        ${isHUDVisible && isSidebarOpen ? (isMobile ? 'w-64' : 'w-64') : 'w-0 opacity-0 pointer-events-none'}`}
      >
        {/* Header toolbar */}
        <div className="h-11 px-4 flex items-center justify-between bg-[#0e101f] border-b border-white/5 flex-shrink-0">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">OUTLINER & PROP</span>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-slate-400 hover:text-white transition-colors p-1 hover:bg-white/5 rounded-none cursor-pointer"
          >
            {isMobile ? <HiOutlineX size={16} /> : <VscMenu size={12} />}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar" data-lenis-prevent>
          
          {/* OUTLINER SECTION */}
          <div className="border-b border-white/5">
            <button
              onClick={() => setIsOutlinerExpanded(!isOutlinerExpanded)}
              className="w-full flex items-center gap-1.5 px-3 py-2.5 hover:bg-white/5 transition-colors cursor-pointer group outline-none"
            >
              {isOutlinerExpanded ? <HiOutlineChevronDown size={12} className="text-gray-400" /> : <HiOutlineChevronRight size={12} className="text-gray-400" />}
              <span className="text-[10px] font-bold text-white uppercase tracking-wider">OUTLINER</span>
            </button>

            {isOutlinerExpanded && (
              <div className="px-3 pb-3 flex flex-col gap-2">
                {/* Search sections */}
                <div className="relative flex items-center">
                  <span className="absolute left-2.5 flex items-center pointer-events-none text-slate-500">
                    <HiOutlineSearch size={12} />
                  </span>
                  <input
                    type="text"
                    placeholder="Search sections..."
                    value={outlinerSearch}
                    onChange={(e) => setOutlinerSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-1 bg-slate-950/40 border border-white/5 text-[10px] text-slate-350 outline-none focus:border-indigo-500/50"
                  />
                </div>

                {/* Mesh layers list */}
                <div className="flex flex-col max-h-[120px] overflow-y-auto no-scrollbar">
                  {meshes
                    .filter(info => {
                      const meta = layersMetadata[info.id] || {};
                      if (meta.merge_parent) return false;
                      if (meta.is_locked && meta.show_lock === false) return false;
                      if (outlinerSearch && !formatMeshName(meta.display_name || info.display).toLowerCase().includes(outlinerSearch.toLowerCase())) return false;
                      return true;
                    })
                    .map((info, idx) => {
                      const isActive = activeMesh === info.id;
                      const meta = layersMetadata[info.id] || {};
                      const displayName = meta.display_name || info.display;
                      const isLocked = !!meta.is_locked;

                      return (
                        <button
                          key={info.id}
                          onClick={() => {
                            setActiveMesh(info.id);
                            const patternForActiveMesh = decals?.find(d => d.type === 'pattern' && isMeshInSameGroup(d.meshId, info.id, layersMetadata));
                            if (patternForActiveMesh) {
                              if (selectedDecalId !== patternForActiveMesh.id) {
                                setSelectedDecalId(patternForActiveMesh.id);
                              }
                            } else {
                              const currentSelected = decals?.find(d => d.id === selectedDecalId);
                              if (currentSelected && currentSelected.type === 'pattern' && !isMeshInSameGroup(currentSelected.meshId, info.id, layersMetadata)) {
                                setSelectedDecalId(null);
                              }
                            }
                          }}
                          className={`group flex items-center gap-2 px-2.5 py-1.5 transition-all text-left relative outline-none rounded-none cursor-pointer
                            ${isActive ? 'bg-indigo-500/10 text-indigo-400 font-semibold border border-indigo-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'}`}
                        >
                          <div 
                            className="w-2 h-2 rounded-none flex-shrink-0"
                            style={{ backgroundColor: meshStates[info.id]?.color || '#ffffff' }}
                          />
                          <div className="flex flex-col leading-none overflow-hidden flex-grow">
                            <span className="text-[10px] truncate tracking-tight">{formatMeshName(displayName)}</span>
                            <span className="text-[6.5px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Section ID {String(idx + 1).padStart(2, '0')}</span>
                          </div>
                          {isLocked && <HiOutlineLockClosed size={10} className="text-amber-500 flex-shrink-0" />}
                        </button>
                      );
                    })}
                </div>
              </div>
            )}
          </div>

          {/* PROPERTIES INSPECTOR SECTION */}
          {activeMesh && (
            <div className="border-b border-white/5">
              <button
                onClick={() => setIsPropertiesExpanded(!isPropertiesExpanded)}
                className="w-full flex items-center gap-1.5 px-3 py-2.5 hover:bg-white/5 transition-colors cursor-pointer group outline-none"
              >
                {isPropertiesExpanded ? <HiOutlineChevronDown size={12} className="text-gray-400" /> : <HiOutlineChevronRight size={12} className="text-gray-400" />}
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">PROPERTIES</span>
              </button>

              {isPropertiesExpanded && (
                <div className="px-4 pb-3 flex flex-col gap-3 text-[10px]">
                  {/* Name change input */}
                  <div className="flex flex-col gap-1">
                    <span className="text-slate-500 uppercase tracking-wider text-[7.5px] font-bold">Section Name</span>
                    <input
                      type="text"
                      value={activeDisplayName}
                      onChange={(e) => updateMeshProp?.(activeMesh, 'displayName', e.target.value)}
                      className="w-full px-2.5 py-1 bg-slate-950/40 border border-white/5 text-slate-200 outline-none focus:border-indigo-500/50"
                    />
                  </div>

                  {/* Fabric selection */}
                  <div className="flex flex-col gap-1">
                    <span className="text-slate-500 uppercase tracking-wider text-[7.5px] font-bold">Fabric</span>
                    <select
                      value={activeState.fabricTexture || 'none'}
                      onChange={(e) => updateMeshProp?.(activeMesh, 'fabricTexture', e.target.value)}
                      className="w-full px-2 py-1 bg-[#0c0e1a] border border-white/5 text-slate-200 outline-none focus:border-indigo-500/50 cursor-pointer"
                    >
                      <option value="none">None (Smooth)</option>
                      <option value="polyester">Polyester knit</option>
                      <option value="mesh_knit">Mesh Panels</option>
                      <option value="fleece">Fleece texture</option>
                      <option value="ripstop">Ripstop weave</option>
                      <option value="satin">Satin sheen</option>
                      <option value="nylon">Nylon fabric</option>
                      <option value="jersey_knit">Jersey knit</option>
                    </select>
                  </div>

                  {/* Color box picker */}
                  <div className="flex flex-col gap-1">
                    <span className="text-slate-500 uppercase tracking-wider text-[7.5px] font-bold">Color</span>
                    <div className="flex items-center gap-2">
                      <div className="relative w-8 h-6 border border-white/10 flex-shrink-0 cursor-pointer overflow-hidden">
                        <input
                          type="color"
                          value={activeState.color || '#ffffff'}
                          onChange={(e) => updateMeshProp?.(activeMesh, 'color', e.target.value)}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                        <div 
                          className="w-full h-full"
                          style={{ backgroundColor: activeState.color || '#ffffff' }}
                        />
                      </div>
                      <input
                        type="text"
                        value={(activeState.color || '#ffffff').toUpperCase()}
                        onChange={(e) => updateMeshProp?.(activeMesh, 'color', e.target.value)}
                        placeholder="#FFFFFF"
                        maxLength={7}
                        className="w-full px-2.5 py-1 bg-slate-950/40 border border-white/5 text-slate-200 uppercase outline-none focus:border-indigo-500/50"
                      />
                    </div>
                  </div>

                  {/* Roughness range */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 uppercase tracking-wider text-[7.5px] font-bold">Roughness</span>
                      <span className="text-[9px] font-bold text-slate-400">{(activeState.roughness !== undefined ? activeState.roughness : 0.8).toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min={0.0}
                      max={1.0}
                      step={0.05}
                      value={activeState.roughness !== undefined ? activeState.roughness : 0.8}
                      onChange={(e) => updateMeshProp?.(activeMesh, 'roughness', parseFloat(e.target.value))}
                      className="w-full accent-indigo-500 bg-slate-950/40 h-1 rounded-none outline-none appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Opacity range */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 uppercase tracking-wider text-[7.5px] font-bold">Opacity</span>
                      <span className="text-[9px] font-bold text-slate-400">{(activeState.opacity !== undefined ? activeState.opacity : 1.0).toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min={0.1}
                      max={1.0}
                      step={0.05}
                      value={activeState.opacity !== undefined ? activeState.opacity : 1.0}
                      onChange={(e) => updateMeshProp?.(activeMesh, 'opacity', parseFloat(e.target.value))}
                      className="w-full accent-indigo-500 bg-slate-950/40 h-1 rounded-none outline-none appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── ASSETS ACCORDION SEGMENT ── */}
          <div className="border-b border-white/5">
            <button
              onClick={() => setIsAssetsExpanded(!isAssetsExpanded)}
              className="w-full flex items-center gap-1.5 px-3 py-2.5 hover:bg-white/5 transition-colors cursor-pointer group outline-none"
            >
              {isAssetsExpanded ? <HiOutlineChevronDown size={12} className="text-gray-400" /> : <HiOutlineChevronRight size={12} className="text-gray-400" />}
              <span className="text-[10px] font-bold text-white uppercase tracking-wider">ASSETS</span>
            </button>

            {isAssetsExpanded && (
              <div className="px-3 pb-3 flex flex-col gap-1">
                {['Fabrics', 'Patterns', 'Trims', 'Logos', 'Stitches'].map(assetTab => (
                  <button
                    key={assetTab}
                    onClick={() => setAssetSubTab(assetTab)}
                    className={`w-full py-1.5 px-3 text-left text-[9px] font-bold uppercase tracking-wider transition-colors cursor-pointer rounded-none border border-transparent
                      ${assetSubTab === assetTab 
                        ? 'text-indigo-400 bg-indigo-500/10 border-indigo-500/25 font-black' 
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                  >
                    {assetTab}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer info online status */}
        <div className="px-4 py-2 bg-[#0e101f] border-t border-white/5 flex-shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">3D Engine Online</span>
          </div>
        </div>
      </div>

      {/* ── 3. MAIN WORKSPACE (Viewport Top Row + RightPanel, Bottom Assets Shelf Bottom Row) ── */}
      <div className="flex-1 flex flex-col min-h-0 h-full relative overflow-hidden">
        
        {/* Top Row: Viewport side-by-side with RightPanel */}
        <div className="flex-1 flex flex-row min-h-0 overflow-hidden relative">
          
          {/* 3D Viewport canvas container */}
          <div className="flex-grow flex flex-col min-h-0 relative bg-[#090b15] min-w-0">
            <div className="h-10 bg-[#0c0e1a] border-b border-white/5 px-4 flex items-center justify-between z-10 flex-shrink-0">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsSidebarOpen(true)}
                  className="md:hidden px-2.5 h-6 flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-bold uppercase tracking-wider text-indigo-400 hover:bg-indigo-500/20 rounded-none cursor-pointer"
                >
                  <VscLayers size={12} /> Layers
                </button>
                <button 
                  onClick={() => window.dispatchEvent(new CustomEvent('eay:toggleHUD'))}
                  className="md:hidden px-2.5 h-6 flex items-center gap-1.5 bg-slate-800 border border-white/10 text-[9px] font-bold uppercase tracking-wider text-white hover:bg-slate-700 rounded-none cursor-pointer"
                >
                  <BiPalette size={12} /> {isHUDVisible ? 'Hide Tools' : 'Show Tools'}
                </button>
                <button className="hidden md:block px-2.5 h-6 bg-slate-950/40 border border-white/5 text-[9px] font-bold uppercase tracking-wider text-slate-400 hover:text-white rounded-none cursor-pointer">
                  Select
                </button>
                <div className="flex items-center gap-1 border-l border-white/10 pl-3">
                  {['3D View', 'UV View', '2D Pattern'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveTab(tab);
                        if (tab !== '3D View') {
                          toast.success(`${tab} blueprint mode activated!`, { id: 'tab-toast', icon: '📐' });
                        }
                      }}
                      className={`px-3 py-1 text-[8.5px] font-bold uppercase tracking-wider rounded-none transition-colors cursor-pointer
                        ${activeTab === tab ? 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-400' : 'text-slate-400 hover:text-white'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Viewport Canvas wrapper */}
            <div className="flex-1 relative overflow-hidden min-h-[250px]">
              {/* Radial Ambient Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(99,102,241,0.08),transparent_70%)] pointer-events-none" />

              {activeTab === '3D View' ? (
                <ModelViewer
                  modelUrl={modelUrl}
                  layersMetadata={layersMetadata}
                  meshStates={meshStates}
                  onMeshesDetected={onMeshesDetected}
                  decals={decals}
                  selectedDecalId={selectedDecalId}
                  setSelectedDecalId={setSelectedDecalId}
                  updateDecal={updateDecal}
                  removeDecal={removeDecal}
                  globalPattern={globalPattern}
                  materialFinish={materialFinish}
                  lightingPreset={lightingPreset}
                  mouseFollow={mouseFollow}
                  timelineVal={timelineVal}
                  setTimelineVal={setTimelineVal}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                />
              ) : activeTab === 'UV View' ? (
                <UVBlueprintView meshStates={meshStates} />
              ) : (
                <Pattern2DView meshStates={meshStates} />
              )}

              <div className={`absolute top-3 left-3 pointer-events-none select-none z-10 transition-all duration-500 
                ${isHUDVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                <div className="flex items-center gap-2 px-2.5 py-1 bg-[#090b15]/90 border border-white/5 rounded-none shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                  <span className="text-[9px] font-bold text-slate-350 tracking-wide">{meshes.length} Active Parts</span>
                </div>
              </div>
            </div>

            {/* ── 4. TIMELINE PLAYBACK SLIDER DOCK ── */}
            <div className={`h-11 bg-[#0c0e1a] border-t border-white/5 flex items-center px-4 transition-all duration-500 flex-shrink-0 z-40
              ${isHUDVisible ? 'opacity-100' : 'h-0 opacity-0 translate-y-full overflow-hidden'}`}>
              <div className="flex items-center gap-4 w-full">
                {/* Play/Pause controls */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-7 h-7 bg-slate-950/40 hover:bg-white/5 border border-white/5 text-slate-400 hover:text-white rounded-none flex items-center justify-center cursor-pointer"
                    title={isPlaying ? "Pause Simulation" : "Play Simulation"}
                  >
                    {isPlaying ? <HiOutlinePause size={13} /> : <HiOutlinePlay size={13} />}
                  </button>
                  <button 
                    onClick={() => setTimelineVal(Math.max(0, timelineVal - 10))}
                    className="w-7 h-7 bg-slate-950/40 hover:bg-white/5 border border-white/5 text-slate-400 hover:text-white rounded-none flex items-center justify-center cursor-pointer"
                    title="Step Backward"
                  >
                    <HiOutlineChevronLeft size={13} />
                  </button>
                  <button 
                    onClick={() => setTimelineVal(Math.min(100, timelineVal + 10))}
                    className="w-7 h-7 bg-slate-950/40 hover:bg-white/5 border border-white/5 text-slate-400 hover:text-white rounded-none flex items-center justify-center cursor-pointer"
                    title="Step Forward"
                  >
                    <HiOutlineChevronRight size={13} />
                  </button>
                </div>

                {/* Slider with markings */}
                <div className="flex-1 flex flex-col gap-0.5 relative pt-1">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={timelineVal}
                    onChange={(e) => setTimelineVal(parseInt(e.target.value))}
                    className="w-full accent-indigo-500 bg-slate-950/40 h-1 rounded-none outline-none appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[6.5px] font-bold text-slate-600 px-0.5">
                    {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(val => (
                      <span key={val}>{val}</span>
                    ))}
                  </div>
                </div>

                {/* Camera operations */}
                <div className="flex items-center gap-1.5 pl-4 border-l border-white/10 flex-shrink-0">
                  <button 
                    onClick={() => window.dispatchEvent(new CustomEvent('eay:resetCamera'))} 
                    className="px-2.5 h-7 bg-slate-950/40 hover:bg-white/5 border border-white/5 text-slate-400 hover:text-white rounded-none flex items-center gap-1.5 transition-all cursor-pointer text-[8px] font-bold uppercase tracking-wider"
                    title="Reset Camera View"
                  >
                    <HiOutlineCamera size={12} />
                    <span>Reset View</span>
                  </button>
                  <button 
                    onClick={() => window.dispatchEvent(new CustomEvent('eay:zoom', { detail: -0.3 }))} 
                    className="w-7 h-7 bg-slate-950/40 hover:bg-white/5 border border-white/5 text-slate-400 hover:text-white rounded-none flex items-center justify-center transition-all cursor-pointer text-[11px] font-bold"
                    title="Zoom In"
                  >
                    +
                  </button>
                  <button 
                    onClick={() => window.dispatchEvent(new CustomEvent('eay:zoom', { detail: 0.3 }))} 
                    className="w-7 h-7 bg-slate-950/40 hover:bg-white/5 border border-white/5 text-slate-400 hover:text-white rounded-none flex items-center justify-center transition-all cursor-pointer text-[11px] font-bold"
                    title="Zoom Out"
                  >
                    −
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel directly next to Viewport inside top row */}
          {rightPanelComponent}
        </div>

        {/* ── 5. ASSETS LIBRARY HORIZONTAL PREVIEW CARDS (Figma Style spanning Viewport + RightPanel width!) ── */}
        <div className={`h-32 bg-[#0A0C16] border-t border-white/5 flex flex-col transition-all duration-500 flex-shrink-0 z-40 overflow-hidden
          ${isHUDVisible ? 'opacity-100' : 'h-0 opacity-0 overflow-hidden'}`}>
          
          {/* Header search, filter and grid options */}
          <div className="h-8 border-b border-white/5 px-4 flex items-center justify-between bg-[#0C0E1A]">
            <div className="flex items-center gap-2">
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{assetSubTab} Catalog</span>
              <div className="relative flex items-center">
                <span className="absolute left-2.5 flex items-center pointer-events-none text-slate-500">
                  <HiOutlineSearch size={10} />
                </span>
                <input
                  type="text"
                  placeholder={`Search ${assetSubTab.toLowerCase()}...`}
                  value={assetSearch}
                  onChange={(e) => setAssetSearch(e.target.value)}
                  className="bg-slate-950/40 border border-white/5 text-[8px] text-slate-350 outline-none pl-8 pr-2 py-0.5 w-44 focus:border-indigo-500/50"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <select 
                value={assetFilter}
                onChange={(e) => setAssetFilter(e.target.value)}
                className="bg-[#0c0e1a] border border-white/5 text-[8px] font-bold text-slate-400 px-2 py-0.5 outline-none cursor-pointer"
              >
                <option value="all">All Items</option>
                <option value="Performance">Performance</option>
                <option value="Synthetic">Synthetic</option>
                <option value="Natural">Natural</option>
                <option value="Warm">Warm</option>
              </select>
              <div className="flex items-center gap-2 border-l border-white/10 pl-3">
                <span onClick={() => setAssetViewMode('grid')} className={`text-[8.5px] font-bold cursor-pointer ${assetViewMode === 'grid' ? 'text-indigo-400' : 'text-slate-500 hover:text-white'}`}>Grid</span>
                <span onClick={() => setAssetViewMode('list')} className={`text-[8.5px] font-bold cursor-pointer ${assetViewMode === 'list' ? 'text-indigo-400' : 'text-slate-500 hover:text-white'}`}>List</span>
              </div>
            </div>
          </div>

          {/* Scrollable grid tray of material spheres */}
          <div className={`flex-1 overflow-x-auto custom-scrollbar flex ${assetViewMode === 'grid' ? 'items-center' : 'items-start pt-2'} gap-4 px-4 py-2 bg-[#070911]`}>
            {assetSubTab === 'Fabrics' && (
              fabricPresets
                .filter(f => f.name.toLowerCase().includes(assetSearch.toLowerCase()))
                .filter(f => assetFilter === 'all' || f.category === assetFilter)
                .map(f => (
                  <button
                    key={f.id}
                    onClick={() => {
                      if (activeMesh) {
                        updateMeshProp?.(activeMesh, 'fabricTexture', f.id);
                      }
                    }}
                    className={`flex ${assetViewMode === 'grid' ? 'flex-col items-center gap-1.5' : 'flex-row items-center gap-3 w-32 bg-slate-900/50 p-2 rounded-lg border border-white/5 hover:border-indigo-500/50'} cursor-pointer group flex-shrink-0
                      ${activeState.fabricTexture === f.id ? (assetViewMode === 'grid' ? 'scale-105' : 'border-indigo-500 bg-indigo-500/10') : 'opacity-85 hover:opacity-100'}`}
                  >
                    <div 
                      className={`${assetViewMode === 'grid' ? 'w-12 h-12 rounded-full' : 'w-8 h-8 rounded-md'} shadow-lg border transition-all duration-300 relative overflow-hidden group-hover:scale-105 flex-shrink-0
                        ${activeState.fabricTexture === f.id ? 'border-indigo-500 shadow-indigo-500/20' : 'border-white/5'}`}
                      style={{ 
                        background: `radial-gradient(circle at 35% 35%, ${f.color}, #090c15)`,
                        backgroundImage: `radial-gradient(circle at 35% 35%, ${f.color}, #090c15)`
                      }}
                    >
                      <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-repeat" style={{ backgroundImage: `url('/fabric-tile.png')`, backgroundSize: '6px' }} />
                    </div>
                    <div className={`flex flex-col ${assetViewMode === 'grid' ? 'items-center' : 'items-start flex-1 overflow-hidden'}`}>
                      <span className={`text-[7.5px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-white leading-none ${assetViewMode === 'grid' ? 'text-center max-w-[50px]' : 'text-left w-full'} truncate`}>{f.name}</span>
                      {assetViewMode === 'list' && (
                        <span className="text-[6px] text-slate-500 uppercase tracking-widest mt-1">{f.category}</span>
                      )}
                    </div>
                  </button>
                ))
            )}

            {assetSubTab === 'Patterns' && (
              defaultPatterns && defaultPatterns.length > 0 ? (
                defaultPatterns
                  .filter(pat => pat.name.toLowerCase().includes(assetSearch.toLowerCase()))
                  .map(pat => (
                    <button
                      key={pat.id}
                      onClick={() => {
                        if (activeMesh) {
                          addDecal?.('pattern', pat.name, pat.imageUrl, activeMesh);
                        }
                      }}
                      className="flex flex-col items-center gap-1.5 cursor-pointer group flex-shrink-0"
                    >
                      <div className="w-12 h-12 rounded-full shadow-lg border border-white/5 transition-all duration-300 relative overflow-hidden group-hover:scale-105 bg-slate-950">
                        <img src={pat.imageUrl} alt={pat.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[7.5px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-white leading-none">{pat.name}</span>
                    </button>
                  ))
              ) : (
                <div className="text-slate-600 text-[8px] font-bold uppercase tracking-widest w-full text-center">No patterns available</div>
              )
            )}

            {assetSubTab === 'Logos' && (
              defaultLogos && defaultLogos.length > 0 ? (
                defaultLogos
                  .filter(logo => logo.name.toLowerCase().includes(assetSearch.toLowerCase()))
                  .map(logo => (
                    <button
                      key={logo.id || logo.url}
                      onClick={() => {
                        if (activeMesh) {
                          addDecal?.('image', '', logo.url, activeMesh);
                        }
                      }}
                      className="flex flex-col items-center gap-1.5 cursor-pointer group flex-shrink-0"
                    >
                      <div className="w-12 h-12 rounded-full shadow-lg border border-white/5 transition-all duration-300 relative overflow-hidden group-hover:scale-105 bg-white p-1.5">
                        <img src={logo.url} alt={logo.name} className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[7.5px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-white leading-none truncate max-w-[60px]">{logo.name}</span>
                    </button>
                  ))
              ) : (
                <div className="text-slate-655 text-[8px] font-bold uppercase tracking-widest w-full text-center">No logos available</div>
              )
            )}

            {assetSubTab !== 'Fabrics' && assetSubTab !== 'Patterns' && assetSubTab !== 'Logos' && (
              <div className="text-slate-600 text-[8px] font-bold uppercase tracking-widest w-full text-center">
                Select an active {assetSubTab.toLowerCase().slice(0, -1)} layer to configure.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
