import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { BiCube, BiPalette, BiText, BiImage, BiCart, BiWater, BiFlag, BiFootball, BiChevronRight, BiPlus, BiTrash, BiMapAlt, BiDna, BiBug, BiCamera, BiUserCircle, BiGhost, BiStar, BiHeart } from 'react-icons/bi';
import { HiOutlineSparkles, HiOutlinePhotograph, HiOutlineCube, HiOutlineLightningBolt, HiOutlineColorSwatch, HiOutlineCursorClick, HiOutlineAdjustments, HiOutlineUserAdd, HiOutlineTrash, HiOutlinePlus, HiOutlineMinus, HiOutlineChevronDown, HiOutlineCloudUpload, HiOutlineLockClosed } from 'react-icons/hi';
import { VscSymbolColor } from 'react-icons/vsc';
import { FaPaw, FaCat, FaCrow, FaHippo, FaHorse } from 'react-icons/fa';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

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

const colorCategories = {
  classic: [
    { name: 'BLACK', hex: '#000000' },
    { name: 'GRAPHITE', hex: '#2C3539' },
    { name: 'CHARCOAL', hex: '#36454F' },
    { name: 'GRAY', hex: '#808080' },
    { name: 'SILVER', hex: '#C0C0C0' },
    { name: 'PLATINUM', hex: '#E5E4E2' },
    { name: 'WHITE', hex: '#FFFFFF' },
    { name: 'CREAM', hex: '#FFFDD0' },
  ],
  vibrant: [
    { name: 'NAVY', hex: '#000080' },
    { name: 'ROYAL BLUE', hex: '#4169E1' },
    { name: 'SKY BLUE', hex: '#87CEEB' },
    { name: 'CYAN', hex: '#00FFFF' },
    { name: 'TEAL', hex: '#008080' },
    { name: 'FOREST GREEN', hex: '#228B22' },
    { name: 'EMERALD', hex: '#50C878' },
    { name: 'MINT', hex: '#98FF98' },
    { name: 'GOLD', hex: '#FFD700' },
    { name: 'ORANGE', hex: '#FFA500' },
    { name: 'RED', hex: '#FF0000' },
    { name: 'CRIMSON', hex: '#DC143C' },
    { name: 'MAGENTA', hex: '#FF00FF' },
    { name: 'PURPLE', hex: '#800080' },
    { name: 'DEEP VIOLET', hex: '#4B0082' },
    { name: 'HOT PINK', hex: '#FF69B4' },
  ],
  neon: [
    { name: 'NEON YELLOW', hex: '#FFFF00' },
    { name: 'NEON GREEN', hex: '#39FF14' },
    { name: 'NEON BLUE', hex: '#04D9FF' },
    { name: 'NEON PINK', hex: '#FF1493' },
    { name: 'NEON PURPLE', hex: '#8A2BE2' },
    { name: 'NEON ORANGE', hex: '#FF5F1F' },
    { name: 'NEON CORAL', hex: '#FF3131' },
    { name: 'OPTIC YELLOW', hex: '#CCFF00' },
  ],
  earth: [
    { name: 'BROWN', hex: '#8B4513' },
    { name: 'TAUPE', hex: '#483C32' },
    { name: 'SAND', hex: '#C2B280' },
    { name: 'KHAKI', hex: '#F0E68C' },
    { name: 'OLIVE', hex: '#808000' },
    { name: 'SAGE', hex: '#BCB88A' },
    { name: 'TERRA COTTA', hex: '#E2725B' },
    { name: 'MAROON', hex: '#800000' },
  ]
};

const colors = Object.values(colorCategories).flat();

const getColorName = (hex) =>
  colors.find(c => c.hex.toLowerCase() === hex?.toLowerCase())?.name || hex || '—';

const ColorGrid = ({ selected, onSelect }) => {
  const [activeCategory, setActiveCategory] = useState('classic');

  return (
    <div className="mt-2 space-y-3">
      {/* Category Tabs */}
      <div className="flex gap-1 border-b border-white/5 pb-1">
        {Object.keys(colorCategories).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-2.5 py-1 text-[8.5px] font-bold uppercase tracking-wider transition-all border-b-2 rounded-t-sm ${activeCategory === cat
                ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10/10'
                : 'border-transparent text-slate-500 hover:text-slate-400'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Color Swatches */}
      <div className="grid grid-cols-8 gap-1.5 animate-in fade-in duration-200">
        {colorCategories[activeCategory].map((c, i) => {
          const isActive = selected?.toLowerCase() === c.hex.toLowerCase();
          return (
            <div
              key={i}
              title={c.name}
              onClick={() => onSelect(c.hex)}
              className={`swatch aspect-square rounded-lg cursor-pointer border transition-all duration-300 transform hover:scale-110
                ${isActive ? 'border-indigo-500 shadow-[0_0_10px_rgba(37,99,235,0.2)] scale-105 z-10' : 'border-white/5 hover:border-white/30'}`}
              style={{ backgroundColor: c.hex }}
            >
              {isActive && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0A0C16] shadow-sm" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SecHeader = ({ label, icon, isOpen, onToggle }) => (
  <button
    onClick={onToggle}
    className="w-full flex items-center justify-between px-5 py-3.5 border-b border-white/5 cursor-pointer outline-none transition-all hover:bg-[#0e101f]/50 bg-[#0A0C16] group"
  >
    <div className="flex items-center gap-3">
      <span className={`text-xl transition-colors ${isOpen ? 'text-indigo-400' : 'text-slate-500'}`}>{icon}</span>
      <span className={`text-[10px] font-semibold tracking-[0.15em] uppercase transition-colors ${isOpen ? 'text-white' : 'text-slate-500'}`}>{label}</span>
    </div>
    <HiOutlineChevronDown className={`text-gray-300 text-sm transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-400' : ''}`} />
  </button>
);

const MeshProperties = ({
  state,
  updateProp: singleUpdateProp,
  meshStates,
  updateMeshStates,
  activeMesh,
  setActiveMesh,
  layersMetadata = {},
  updateMeshProp,
  addDecal,
  decals = [],
  selectedDecalId,
  setSelectedDecalId,
  updateDecal,
  removeDecal,
  defaultPatterns = []
}) => {
  const [openSections, setOpenSections] = useState(['fill']);
  const [applyGlobally, setApplyGlobally] = useState(false);

  const toggleSection = (id) => {
    setOpenSections(prev => {
      if (prev.includes(id)) return prev.filter(s => s !== id);
      const limit = typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 2;
      const next = [...prev, id];
      return next.length > limit ? next.slice(1) : next;
    });
  };

  const updateProp = (prop, val) => {
    if (applyGlobally) {
      // Sync change to all panels in design
      const updates = {};
      Object.keys(meshStates).forEach(meshId => {
        updates[meshId] = {
          ...meshStates[meshId],
          [prop]: val
        };
      });
      updateMeshStates(updates);
    } else {
      singleUpdateProp(prop, val);
    }
  };

  const handleToggleApplyGlobally = (checked) => {
    setApplyGlobally(checked);
    if (checked && state) {
      // Sync active mesh pattern settings to ALL other meshes immediately!
      const patternProps = ['pUrl', 'pColor', 'pSize', 'pRotation', 'pOffsetX', 'pOffsetY', 'pMinY', 'pMaxY', 'pMappingMode'];
      const updates = {};
      Object.keys(meshStates).forEach(meshId => {
        const meshState = meshStates[meshId];
        const newMeshState = { ...meshState };
        patternProps.forEach(p => {
          if (state[p] !== undefined) {
            newMeshState[p] = state[p];
          }
        });
        updates[meshId] = newMeshState;
      });
      updateMeshStates(updates);
    }
  };

  if (!state) return <div className="p-10 text-center text-slate-500 font-semibold uppercase tracking-widest text-[10px]">Select a part to edit</div>;

  const meta = layersMetadata[activeMesh] || {};
  const isLocked = !!meta.is_locked;

  if (isLocked) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-[#0A0C16] min-h-[300px]">
        <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 mb-4 animate-pulse">
          <HiOutlineLockClosed size={28} />
        </div>
        <h4 className="text-[12px] font-bold text-white uppercase tracking-widest mb-1.5">Layer is Locked</h4>
        <p className="text-[10px] text-slate-500 font-medium uppercase max-w-[240px] leading-relaxed">
          This layer has been locked by the administrator and cannot be modified in the builder.
        </p>
      </div>
    );
  }

  const patternDecals = decals.filter(d => d.type === 'pattern');
  const selectedPattern = patternDecals.find(d => d.id === selectedDecalId);

  return (
    <div className="flex flex-col bg-[#0A0C16]">
      <SecHeader label="Fill Color" icon={<VscSymbolColor />} isOpen={openSections.includes('fill')} onToggle={() => toggleSection('fill')} />
      <div className={`acc-body ${openSections.includes('fill') ? 'open' : ''}`}>
        <div className="p-5 bg-[#0A0C16] border-b border-white/5">
          <div className="flex items-center gap-4 p-3 bg-[#0e101f] border border-white/5 rounded-none mb-4">
            <div className="w-10 h-10 rounded-none border border-white shadow-sm flex-shrink-0" style={{ backgroundColor: state.color }} />
            <div>
              <div className="text-[8px] font-semibold text-slate-500 uppercase tracking-widest">Active Material</div>
              <div className="text-[12px] font-semibold text-white tracking-wider">{getColorName(state.color)}</div>
            </div>
          </div>
          <ColorGrid selected={state.color} onSelect={(hex) => { updateProp('color', hex); updateProp('isGrad', false); }} />
        </div>
      </div>

      {/* ─── FABRIC MATERIAL ─── */}
      <SecHeader label="Fabric Material" icon={<BiWater />} isOpen={openSections.includes('fabric')} onToggle={() => toggleSection('fabric')} />
      <div className={`acc-body ${openSections.includes('fabric') ? 'open' : ''}`}>
        <div className="p-5 bg-[#0A0C16] border-b border-white/5">
          <p className="text-[8px] font-semibold text-slate-500 uppercase tracking-widest mb-4">Select Fabric Weave Texture</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { key: 'none',        label: 'Plain',        emoji: '⬜', desc: 'Smooth flat finish' },
              { key: 'polyester',   label: 'Polyester',    emoji: '🔲', desc: 'Fine woven grid' },
              { key: 'mesh_knit',   label: 'Mesh Knit',    emoji: '🕸️', desc: 'Open breathable holes' },
              { key: 'ribbed',      label: 'Ribbed',       emoji: '〰️', desc: 'Horizontal rib lines' },
              { key: 'dryfit',      label: 'Dry-Fit',      emoji: '✖️', desc: 'Cross-hatch performance' },
              { key: 'honeycomb',   label: 'Honeycomb',    emoji: '🔶', desc: 'Hex cell pattern' },
              { key: 'waffle_knit', label: 'Waffle Knit',  emoji: '🧇', desc: 'Raised square grid' },
              { key: 'twill',       label: 'Twill',        emoji: '🌊', desc: 'Diagonal denim weave' },
              { key: 'jersey_knit', label: 'Jersey Knit',  emoji: '🔄', desc: 'V-shaped loop stitch' },
              { key: 'oxford',      label: 'Oxford Weave', emoji: '🏛️', desc: '2x2 basket weave' },
              { key: 'fleece',      label: 'Fleece',       emoji: '☁️', desc: 'Soft fuzzy bumps' },
              { key: 'pinstripe',   label: 'Pinstripe',    emoji: '🕴️', desc: 'Vertical thin lines' },
            ].map(fab => {
              const isActive = (state.fabricTexture || 'none') === fab.key;
              return (
                <button
                  key={fab.key}
                  type="button"
                  onClick={() => updateProp('fabricTexture', fab.key)}
                  className={`flex flex-col items-center gap-1.5 p-3 border rounded-none transition-all duration-200 cursor-pointer text-center
                    ${isActive
                      ? 'border-indigo-500 bg-indigo-500/10/40 shadow-[0_0_8px_rgba(37,99,235,0.15)]'
                      : 'border-white/5 hover:border-white/10 bg-[#0A0C16] hover:bg-[#0e101f]/50'
                    }`}
                >
                  <span className="text-xl leading-none">{fab.emoji}</span>
                  <span className={`text-[9px] font-bold uppercase tracking-wider ${isActive ? 'text-indigo-400' : 'text-slate-300'}`}>{fab.label}</span>
                  <span className="text-[7.5px] text-slate-500 font-medium leading-tight">{fab.desc}</span>
                  {isActive && <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-indigo-500/100 inline-block" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <SecHeader label="Gradient Engine" icon={<HiOutlineSparkles />} isOpen={openSections.includes('grad')} onToggle={() => toggleSection('grad')} />
      <div className={`acc-body ${openSections.includes('grad') ? 'open' : ''}`}>
        <div className="p-5 bg-[#0A0C16] border-b border-white/5">
          <div className="flex gap-2 mb-5">
            <button onClick={() => updateProp('isGrad', false)} className={`flex-1 py-2 rounded-none text-[9px] font-semibold tracking-widest border transition-all ${!state.isGrad ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400 shadow-sm' : 'border-white/5 text-slate-500'}`}>SOLID</button>
            <button onClick={() => updateProp('isGrad', true)} className={`flex-1 py-2 rounded-none text-[9px] font-semibold tracking-widest border transition-all ${state.isGrad ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400 shadow-sm' : 'border-white/5 text-slate-500'}`}>GRADIENT</button>
          </div>
          {state.isGrad && (
            <div className="fade-up space-y-5">
              <div className="h-6 rounded-none border border-white/5 shadow-inner" style={{ background: `linear-gradient(to right, ${state.grad1}, ${state.grad2})` }} />
              <ColorGrid selected={state.grad1} onSelect={(val) => updateProp('grad1', val)} />
              <ColorGrid selected={state.grad2} onSelect={(val) => updateProp('grad2', val)} />
            </div>
          )}
        </div>
      </div>

      <SecHeader label="Pattern Overlay" icon={<HiOutlinePhotograph />} isOpen={openSections.includes('pat')} onToggle={() => toggleSection('pat')} />
      <div className={`acc-body ${openSections.includes('pat') ? 'open' : ''}`}>
        <div className="p-5 bg-[#0A0C16] border-b border-white/5">
          <div className="p-3 bg-indigo-500/10/50 border border-indigo-500/20 rounded-none text-[8.5px] text-indigo-400/80 font-bold uppercase tracking-wider flex items-center gap-2 mb-4">
            <span className="text-xs">💡</span>
            <span>Patterns are now placed as interactive layers! Scale, rotate, tint, and click to position them anywhere on the model.</span>
          </div>

          <div className="flex gap-3 mb-2">
            <label className="flex-1 h-14 rounded-none border border-dashed border-white/10 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-indigo-500 hover:bg-indigo-500/10 transition-all text-gray-300 group">
              <HiOutlinePlus className="text-lg group-hover:text-indigo-400" />
              <span className="text-[9px] font-bold group-hover:text-indigo-400 uppercase">Upload Pattern Layer</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => {
                  if (e.target.files?.[0]) {
                    const file = e.target.files[0];
                    const toastId = toast.loading('Uploading pattern...');
                    const formData = new FormData();
                    formData.append('file', file);

                    fetch(`${API_BASE}/api/decal/upload`, {
                      method: 'POST',
                      headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                      },
                      body: formData
                    })
                      .then(res => res.json())
                      .then(data => {
                        if (data.success && data.url) {
                          toast.success('Pattern uploaded!', { id: toastId });
                          addDecal('pattern', 'Pattern Layer', data.url, activeMesh);
                        } else {
                          toast.error('Failed to upload pattern.', { id: toastId });
                        }
                      })
                      .catch(err => {
                        console.error('Pattern upload error:', err);
                        toast.error('Upload error occurred.', { id: toastId });
                      });
                    e.target.value = '';
                  }
                }}
              />
            </label>
          </div>

          {defaultPatterns && defaultPatterns.length > 0 && (
            <div className="mb-4">
              <p className="text-[8.5px] font-bold text-slate-500 uppercase tracking-widest mb-2.5">Default Patterns</p>
              <div className="grid grid-cols-4 gap-2">
                {defaultPatterns.map((pat) => (
                  <button
                    key={pat.id}
                    type="button"
                    onClick={() => addDecal('pattern', pat.name, pat.imageUrl, activeMesh)}
                    className="aspect-square bg-[#0e101f] border border-white/5 rounded-none p-1.5 hover:border-indigo-500 hover:bg-indigo-500/10 transition-all flex flex-col items-center justify-center gap-1 group cursor-pointer"
                    title={pat.name}
                  >
                    <img src={pat.imageUrl} alt={pat.name ? `${pat.name} pattern` : "Pattern texture"} title={pat.name} className="w-full h-full object-contain opacity-60 group-hover:opacity-100 transition-opacity" />
                    <span className="text-[6.5px] font-semibold text-slate-500 uppercase truncate w-full text-center group-hover:text-indigo-400">{pat.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ACTIVE PATTERN LAYERS LIST */}
          {patternDecals.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/5">
              <h4 className="text-[8.5px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center justify-between">
                <span>Active Pattern Layers</span>
                <span className="text-[8px] bg-slate-950/40 px-2 py-0.5 rounded-none text-slate-500 border border-white/5">{patternDecals.length}</span>
              </h4>
              <div className="space-y-1.5">
                {patternDecals.map(d => (
                  <div
                    key={d.id}
                    onClick={() => {
                      setSelectedDecalId(d.id);
                      if (d.meshId) {
                        const dMeta = layersMetadata[d.meshId] || {};
                        const targetMeshId = dMeta.merge_parent || d.meshId;
                        if (targetMeshId !== activeMesh) {
                          setActiveMesh(targetMeshId);
                        }
                      }
                    }}
                    className={`p-3.5 rounded-none border transition-all flex items-center justify-between bg-[#0A0C16] cursor-pointer ${selectedDecalId === d.id ? 'border-indigo-500 bg-indigo-500/10/20' : 'border-white/5 hover:border-white/5'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-none border border-white/5 bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url(${d.imageUrl})` }} />
                      <div className="flex flex-col text-left">
                        <span className="text-[10px] font-semibold truncate max-w-[150px]">{d.text || 'Pattern Layer'}</span>
                        <span className="text-[7px] font-semibold text-gray-300 uppercase mt-0.5">SIZE {((d.decalScale || 0.8) * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-none border border-white shadow-sm flex-shrink-0" style={{ backgroundColor: d.color }} />
                      <button onClick={(e) => { e.stopPropagation(); removeDecal(d.id); }} className="w-5 h-5 flex items-center justify-center text-gray-200 hover:text-red-500 transition-colors"><BiTrash /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedPattern && (
            <div className="mt-6 p-4 bg-[#0e101f] rounded-none border border-white/5 space-y-6 text-left">
              {/* Tip Banner */}
              <div className="p-3 bg-indigo-500/10/50 border border-indigo-500/20 rounded-none text-[8.5px] text-indigo-400/80 font-bold uppercase tracking-wider flex items-center gap-2">
                <span className="text-xs">💡</span>
                <span>Tip: click anywhere on the 3D model to move this layer.</span>
              </div>

              {/* Pattern Tint Color */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Pattern Tint Color</p>
                  <button
                    onClick={() => updateDecal(selectedPattern.id, { color: 'original' })}
                    className={`text-[8.5px] font-bold uppercase px-2.5 py-1.5 transition-all border cursor-pointer ${selectedPattern.color === 'original'
                      ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10/20'
                      : 'border-white/10 text-slate-400 hover:border-white/30 bg-[#0A0C16]'
                      }`}
                  >
                    Original Colors
                  </button>
                </div>
                <ColorGrid selected={selectedPattern.color} onSelect={(val) => updateDecal(selectedPattern.id, { color: val })} />
              </div>

              {/* Sizing & Stretching */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                  {selectedPattern.type === 'pattern' ? 'Pattern Repeat / Density' : 'Sizing & Stretching'}
                </p>

                {/* Uniform Scale */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">
                      {selectedPattern.type === 'pattern' ? 'Pattern Density / Repeat' : 'Overall Scale (Uniform)'}
                    </span>
                    <span className="text-[10px] font-semibold text-indigo-400">{((selectedPattern.decalScale || 0.8) * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.03"
                    max="4.0"
                    step="0.01"
                    className="w-full h-1.5 bg-gray-200 rounded-none appearance-none cursor-pointer accent-indigo-500"
                    value={selectedPattern.decalScale || 0.8}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);
                      if (selectedPattern.type === 'pattern') {
                        updateDecal(selectedPattern.id, { decalScale: v });
                      } else {
                        updateDecal(selectedPattern.id, { decalScale: v, decalScaleX: v, decalScaleY: v });
                      }
                    }}
                  />
                </div>

                {selectedPattern.type !== 'pattern' && (
                  <>
                    {/* Horizontal Stretch (Width) */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">Width (Horizontal Stretch)</span>
                        <span className="text-[10px] font-semibold text-indigo-400">{((selectedPattern.decalScaleX !== undefined ? selectedPattern.decalScaleX : (selectedPattern.decalScale || 0.8)) * 100).toFixed(0)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.03"
                        max="4.0"
                        step="0.01"
                        className="w-full h-1.5 bg-gray-200 rounded-none appearance-none cursor-pointer accent-indigo-500"
                        value={selectedPattern.decalScaleX !== undefined ? selectedPattern.decalScaleX : (selectedPattern.decalScale || 0.8)}
                        onChange={(e) => updateDecal(selectedPattern.id, { decalScaleX: parseFloat(e.target.value) })}
                      />
                    </div>

                    {/* Vertical Stretch (Height) */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">Height (Vertical Stretch)</span>
                        <span className="text-[10px] font-semibold text-indigo-400">{((selectedPattern.decalScaleY !== undefined ? selectedPattern.decalScaleY : (selectedPattern.decalScale || 0.8)) * 100).toFixed(0)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.03"
                        max="4.0"
                        step="0.01"
                        className="w-full h-1.5 bg-gray-200 rounded-none appearance-none cursor-pointer accent-indigo-500"
                        value={selectedPattern.decalScaleY !== undefined ? selectedPattern.decalScaleY : (selectedPattern.decalScale || 0.8)}
                        onChange={(e) => updateDecal(selectedPattern.id, { decalScaleY: parseFloat(e.target.value) })}
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Edge Blending (Gradient Fade) */}
              <div className="space-y-4 pt-4 border-t border-white/10 text-left">
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Edge Blending (Gradient Fade)</p>

                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  {/* Fade Top */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[8px] font-semibold text-slate-500 uppercase tracking-wider">Fade Top</span>
                      <span className="text-[8.5px] font-semibold text-indigo-400">{Math.round((selectedPattern.pFadeTop || 0.0) * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.0"
                      max="1.0"
                      step="0.01"
                      className="w-full h-1 bg-gray-200 rounded-none appearance-none cursor-pointer accent-indigo-500"
                      value={selectedPattern.pFadeTop || 0.0}
                      onChange={(e) => updateDecal(selectedPattern.id, { pFadeTop: parseFloat(e.target.value) })}
                    />
                  </div>

                  {/* Fade Bottom */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[8px] font-semibold text-slate-500 uppercase tracking-wider">Fade Bottom</span>
                      <span className="text-[8.5px] font-semibold text-indigo-400">{Math.round((selectedPattern.pFadeBottom || 0.0) * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.0"
                      max="1.0"
                      step="0.01"
                      className="w-full h-1 bg-gray-200 rounded-none appearance-none cursor-pointer accent-indigo-500"
                      value={selectedPattern.pFadeBottom || 0.0}
                      onChange={(e) => updateDecal(selectedPattern.id, { pFadeBottom: parseFloat(e.target.value) })}
                    />
                  </div>

                  {/* Fade Left */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[8px] font-semibold text-slate-500 uppercase tracking-wider">Fade Left</span>
                      <span className="text-[8.5px] font-semibold text-indigo-400">{Math.round((selectedPattern.pFadeLeft || 0.0) * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.0"
                      max="1.0"
                      step="0.01"
                      className="w-full h-1 bg-gray-200 rounded-none appearance-none cursor-pointer accent-indigo-500"
                      value={selectedPattern.pFadeLeft || 0.0}
                      onChange={(e) => updateDecal(selectedPattern.id, { pFadeLeft: parseFloat(e.target.value) })}
                    />
                  </div>

                  {/* Fade Right */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[8px] font-semibold text-slate-500 uppercase tracking-wider">Fade Right</span>
                      <span className="text-[8.5px] font-semibold text-indigo-400">{Math.round((selectedPattern.pFadeRight || 0.0) * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.0"
                      max="1.0"
                      step="0.01"
                      className="w-full h-1 bg-gray-200 rounded-none appearance-none cursor-pointer accent-indigo-500"
                      value={selectedPattern.pFadeRight || 0.0}
                      onChange={(e) => updateDecal(selectedPattern.id, { pFadeRight: parseFloat(e.target.value) })}
                    />
                  </div>

                  {/* Fade Top Left */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[8px] font-semibold text-slate-500 uppercase tracking-wider">Top Left</span>
                      <span className="text-[8.5px] font-semibold text-indigo-400">{Math.round((selectedPattern.pFadeTopLeft || 0.0) * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.0"
                      max="1.0"
                      step="0.01"
                      className="w-full h-1 bg-gray-200 rounded-none appearance-none cursor-pointer accent-indigo-500"
                      value={selectedPattern.pFadeTopLeft || 0.0}
                      onChange={(e) => updateDecal(selectedPattern.id, { pFadeTopLeft: parseFloat(e.target.value) })}
                    />
                  </div>

                  {/* Fade Top Right */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[8px] font-semibold text-slate-500 uppercase tracking-wider">Top Right</span>
                      <span className="text-[8.5px] font-semibold text-indigo-400">{Math.round((selectedPattern.pFadeTopRight || 0.0) * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.0"
                      max="1.0"
                      step="0.01"
                      className="w-full h-1 bg-gray-200 rounded-none appearance-none cursor-pointer accent-indigo-500"
                      value={selectedPattern.pFadeTopRight || 0.0}
                      onChange={(e) => updateDecal(selectedPattern.id, { pFadeTopRight: parseFloat(e.target.value) })}
                    />
                  </div>

                  {/* Fade Bottom Left */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[8px] font-semibold text-slate-500 uppercase tracking-wider">Bottom Left</span>
                      <span className="text-[8.5px] font-semibold text-indigo-400">{Math.round((selectedPattern.pFadeBottomLeft || 0.0) * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.0"
                      max="1.0"
                      step="0.01"
                      className="w-full h-1 bg-gray-200 rounded-none appearance-none cursor-pointer accent-indigo-500"
                      value={selectedPattern.pFadeBottomLeft || 0.0}
                      onChange={(e) => updateDecal(selectedPattern.id, { pFadeBottomLeft: parseFloat(e.target.value) })}
                    />
                  </div>

                  {/* Fade Bottom Right */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[8px] font-semibold text-slate-500 uppercase tracking-wider">Bottom Right</span>
                      <span className="text-[8.5px] font-semibold text-indigo-400">{Math.round((selectedPattern.pFadeBottomRight || 0.0) * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.0"
                      max="1.0"
                      step="0.01"
                      className="w-full h-1 bg-gray-200 rounded-none appearance-none cursor-pointer accent-indigo-500"
                      value={selectedPattern.pFadeBottomRight || 0.0}
                      onChange={(e) => updateDecal(selectedPattern.id, { pFadeBottomRight: parseFloat(e.target.value) })}
                    />
                  </div>
                </div>
              </div>

              {/* Rotation */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest">Rotation</p>
                  <span className="text-[10px] font-semibold text-indigo-400">{Math.round((selectedPattern.rotation || 0) * 180 / Math.PI)}°</span>
                </div>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  step="1"
                  className="w-full h-1.5 bg-gray-200 rounded-none appearance-none cursor-pointer accent-indigo-500"
                  value={Math.round((selectedPattern.rotation || 0) * 180 / Math.PI)}
                  onChange={(e) => updateDecal(selectedPattern.id, { rotation: parseFloat(e.target.value) * Math.PI / 180 })}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Scroll spacer to guarantee Chrome/Edge scrollbar scrolling past the bottom */}
      <div className="h-28 flex-shrink-0" />
    </div>
  );
};

const NamesNumbersTab = ({ decals, selectedDecalId, setSelectedDecalId, addDecal, updateDecal, removeDecal }) => {
  const textDecals = decals.filter(d => d.type === 'text');
  const selected = textDecals.find(d => d.id === selectedDecalId);
  const [localText, setLocalText] = useState('');
  const [openSection, setOpenSection] = useState('font');
  const isLocked = !selected;

  useEffect(() => {
    if (selected) setLocalText(selected.text);
  }, [selectedDecalId]);

  const fonts = ['Arial', 'Impact', 'Verdana', 'Georgia', 'Courier New'];

  const safeUpdate = (updates) => {
    if (!selected) return;
    updateDecal(selected.id, updates);
  };

  const renderColorGrid = (targetProp) => (
    <div className="flex flex-wrap gap-2">
      {colors.map((c, i) => (
        <button
          key={c.hex + i}
          onClick={() => safeUpdate({ [targetProp]: c.hex })}
          className={`w-7 h-7 rounded-none border cursor-pointer transition-all hover:scale-110 ${selected?.[targetProp] === c.hex ? 'border-indigo-500 shadow-lg ring-1 ring-blue-100 z-10' : 'border-white/10 hover:border-gray-400'}`}
          style={{ backgroundColor: c.hex }}
          title={c.name}
        />
      ))}
    </div>
  );

  const renderSection = (id, label, content) => {
    const isOpen = openSection === id;
    return (
      <div key={id} className={`bg-[#0A0C16] border-b border-white/5 ${isLocked ? 'opacity-40 pointer-events-none' : ''}`}>
        <button
          onClick={() => { if (!isLocked) setOpenSection(isOpen ? null : id); }}
          className={`w-full flex items-center justify-between px-5 py-3 hover:bg-[#0e101f] transition-colors cursor-pointer ${isOpen ? 'bg-[#0e101f]' : ''}`}
        >
          <span className={`text-[10px] font-semibold uppercase tracking-widest ${isOpen ? 'text-indigo-400' : 'text-slate-300'}`}>{label}</span>
          <span className={`text-[10px] transition-transform duration-300 ${isOpen ? 'rotate-45 text-indigo-400' : 'text-gray-300'}`}>＋</span>
        </button>
        {isOpen && (
          <div className="p-5">
            {content}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col bg-[#0A0C16]">
      <div className="p-6 bg-[#0A0C16] border-b border-white/5">
        <h3 className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest mb-4 flex items-center justify-between">
          <span>Active Text Layers</span>
          <span className="text-[8px] bg-slate-950/40 px-2 py-0.5 rounded-none text-slate-500 border border-white/5">{textDecals.length} TOTAL</span>
        </h3>
        <div className="space-y-1.5">
          {textDecals.map((d, i) => (
            <div
              key={d.id}
              onClick={() => setSelectedDecalId(d.id)}
              className={`p-3.5 rounded-none border transition-all flex items-center justify-between bg-[#0A0C16] cursor-pointer
                ${selectedDecalId === d.id ? 'border-indigo-500 bg-indigo-500/10/20' : 'border-white/5 hover:border-white/5'}`}
            >
              <div className="flex flex-col">
                <span className={`text-[10px] font-semibold tracking-widest ${selectedDecalId === d.id ? 'text-white' : 'text-slate-400'}`}>{d.text || 'EMPTY'}</span>
                <span className="text-[7px] font-semibold text-gray-300 uppercase tracking-widest mt-0.5">{d.font} • SIZE {((d.decalScale || 0.15) * 100).toFixed(0)}%</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-none border border-white shadow-sm" style={{ backgroundColor: d.color }} />
                <button onClick={(e) => { e.stopPropagation(); removeDecal(d.id); }} className="w-5 h-5 flex items-center justify-center text-gray-200 hover:text-red-500 transition-colors"><HiOutlineTrash /></button>
              </div>
            </div>
          ))}
          {textDecals.length === 0 && (
            <div className="text-center py-10 border border-dashed border-white/5 rounded-none bg-[#0e101f]/30">
              <p className="text-[8px] font-semibold text-gray-300 uppercase tracking-widest">No Text Layers Added</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-[#0A0C16] p-6 border-b border-white/5 relative z-10">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="TYPE HERE..."
            className="flex-1 bg-[#0e101f] border border-white/5 rounded-none px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-slate-200 focus:border-indigo-500 focus:bg-[#0A0C16] outline-none transition-all"
            onChange={(e) => {
              const val = e.target.value.toUpperCase();
              setLocalText(val);
              if (selected) safeUpdate({ text: val });
            }}
            onKeyDown={(e) => { if (e.key === 'Enter') addDecal('text', localText || 'TEAM NAME'); }}
            value={localText}
          />
          <button
            onClick={() => addDecal('text', localText || 'TEAM NAME')}
            className="px-6 bg-gray-800 text-white rounded-none text-[10px] font-semibold uppercase tracking-widest hover:bg-indigo-600 transition-all active:scale-95"
          >
            ADD
          </button>
        </div>
      </div>

      <div className="flex-1">
        {renderSection('font', 'Font & Color', (
          <div className="space-y-6">
            <div>
              <p className="text-[9px] font-semibold text-slate-500 uppercase mb-3">Primary Color</p>
              {renderColorGrid('color')}
            </div>
            <div>
              <p className="text-[9px] font-semibold text-slate-500 uppercase mb-3">Sports Typography</p>
              <div className="grid grid-cols-2 gap-2">
                {fonts.map(f => (
                  <button
                    key={f}
                    onClick={() => safeUpdate({ font: f })}
                    className={`py-3 rounded-none border text-[10px] font-semibold cursor-pointer transition-all ${selected?.font === f ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400' : 'border-white/5 text-slate-400 hover:border-white/30'}`}
                    style={{ fontFamily: f }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}

        {renderSection('outline', 'Outline Layer 1', (
          <div className="space-y-5">
            <div className="flex items-center justify-between bg-[#0e101f] p-3 rounded-none">
              <p className="text-[9px] font-semibold text-slate-500 uppercase">Thickness</p>
              <span className="text-[10px] font-semibold text-indigo-400 bg-[#0A0C16] px-2 py-1 rounded-none shadow-sm">{selected?.outline1Width || 0}PX</span>
            </div>
            <input type="range" min="0" max="12" step="1" className="w-full h-1.5 bg-gray-200 rounded-none appearance-none cursor-pointer accent-indigo-500" value={selected?.outline1Width || 0} onChange={(e) => safeUpdate({ outline1Width: parseInt(e.target.value) })} />
            <div>
              <p className="text-[9px] font-semibold text-slate-500 uppercase mb-3">Outline Color</p>
              {renderColorGrid('outline1Color')}
            </div>
          </div>
        ))}

        {renderSection('outline2', 'Outline Layer 2', (
          <div className="space-y-5">
            <div className="flex items-center justify-between bg-[#0e101f] p-3 rounded-none">
              <p className="text-[9px] font-semibold text-slate-500 uppercase">Outer Thickness</p>
              <span className="text-[10px] font-semibold text-indigo-400 bg-[#0A0C16] px-2 py-1 rounded-none shadow-sm">{selected?.outline2Width || 0}PX</span>
            </div>
            <input type="range" min="0" max="12" step="1" className="w-full h-1.5 bg-gray-200 rounded-none appearance-none cursor-pointer accent-indigo-500" value={selected?.outline2Width || 0} onChange={(e) => safeUpdate({ outline2Width: parseInt(e.target.value) })} />
            <div>
              <p className="text-[9px] font-semibold text-slate-500 uppercase mb-3">Outer Color</p>
              {renderColorGrid('outline2Color')}
            </div>
          </div>
        ))}

        {renderSection('effect', 'Text Curvature', (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-none border border-white/5 bg-[#0A0C16]">
              <span className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider">Arch Effect</span>
              <button
                onClick={() => safeUpdate({ effect: selected?.effect === 'arch' ? 'none' : 'arch' })}
                className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${selected?.effect === 'arch' ? 'bg-indigo-600' : 'bg-gray-200'}`}
              >
                <div className={`absolute top-1 left-1 w-3 h-3 rounded-full bg-[#0A0C16] transition-all ${selected?.effect === 'arch' ? 'translate-x-5' : ''}`} />
              </button>
            </div>
            {selected?.effect === 'arch' && (
              <div className="p-4 bg-[#0A0C16] border border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-[9px] font-semibold text-slate-500 uppercase">Bend Intensity</p>
                  <span className="text-[10px] font-semibold text-indigo-400">{((selected?.effectIntensity || 0.5) * 100).toFixed(0)}%</span>
                </div>
                <input type="range" min="0.1" max="1.5" step="0.1" className="w-full h-1.5 bg-gray-200 rounded-none appearance-none cursor-pointer accent-indigo-500" value={selected?.effectIntensity || 0.5} onChange={(e) => safeUpdate({ effectIntensity: parseFloat(e.target.value) })} />
              </div>
            )}
          </div>
        ))}

        {renderSection('transform', 'Layer Size & Rotation', (
          <div className="space-y-6">
            {/* Tip Banner */}
            <div className="p-3 bg-indigo-500/10/50 border border-indigo-500/20 rounded-none text-[8.5px] text-indigo-400/80 font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="text-xs">💡</span>
              <span>Tip: click anywhere on the 3D model to move this layer.</span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest">Overall Scale</p>
                  <span className="text-[10px] font-semibold text-indigo-400">{((selected?.decalScale || 0.15) * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0.03"
                  max="1.5"
                  step="0.01"
                  className="w-full h-1.5 bg-gray-200 rounded-none appearance-none cursor-pointer accent-indigo-500"
                  value={selected?.decalScale || 0.15}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    safeUpdate({ decalScale: v, decalScaleX: v, decalScaleY: v });
                  }}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest">Width (Horizontal Stretch)</p>
                  <span className="text-[10px] font-semibold text-indigo-400">{((selected?.decalScaleX !== undefined ? selected.decalScaleX : (selected?.decalScale || 0.15)) * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0.03"
                  max="1.5"
                  step="0.01"
                  className="w-full h-1.5 bg-gray-200 rounded-none appearance-none cursor-pointer accent-indigo-500"
                  value={selected?.decalScaleX !== undefined ? selected.decalScaleX : (selected?.decalScale || 0.15)}
                  onChange={(e) => safeUpdate({ decalScaleX: parseFloat(e.target.value) })}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest">Height (Vertical Stretch)</p>
                  <span className="text-[10px] font-semibold text-indigo-400">{((selected?.decalScaleY !== undefined ? selected.decalScaleY : (selected?.decalScale || 0.15)) * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0.03"
                  max="1.5"
                  step="0.01"
                  className="w-full h-1.5 bg-gray-200 rounded-none appearance-none cursor-pointer accent-indigo-500"
                  value={selected?.decalScaleY !== undefined ? selected.decalScaleY : (selected?.decalScale || 0.15)}
                  onChange={(e) => safeUpdate({ decalScaleY: parseFloat(e.target.value) })}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest">Rotation</p>
                  <span className="text-[10px] font-semibold text-indigo-400">{Math.round((selected?.rotation || 0) * 180 / Math.PI)}°</span>
                </div>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  step="1"
                  className="w-full h-1.5 bg-gray-200 rounded-none appearance-none cursor-pointer accent-indigo-500"
                  value={Math.round((selected?.rotation || 0) * 180 / Math.PI)}
                  onChange={(e) => safeUpdate({ rotation: parseFloat(e.target.value) * Math.PI / 180 })}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const logoCategories = [
  {
    name: 'TAIL SWEEP', icon: <BiWater />,
    items: [
      { name: 'Classic Swoosh', url: 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/wind.svg' },
      { name: 'Wave Sweep', url: 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/water.svg' },
      { name: 'Power Line', url: 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/bolt.svg' }
    ]
  },
  {
    name: 'FLAGS & SYMBOLS', icon: <BiFlag />,
    items: [
      { name: 'USA Flag', url: 'https://flagcdn.com/us.svg' },
      { name: 'UK Flag', url: 'https://flagcdn.com/gb.svg' },
      { name: 'Golden Star', url: 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/star.svg' },
      { name: 'Shield', url: 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/shield-halved.svg' }
    ]
  },
  {
    name: 'SPORT BALLS & ICONS', icon: <BiFootball />,
    items: [
      { name: 'Basketball', url: 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/basketball.svg' },
      { name: 'Soccer Ball', url: 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/futbol.svg' },
      { name: 'Baseball', url: 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/baseball.svg' },
      { name: 'Trophy', url: 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/trophy.svg' }
    ]
  },
  {
    name: 'WOLVES & DOGS', icon: <FaPaw />,
    items: [
      { name: 'Wolf Head', url: 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/dog.svg' },
      { name: 'Paw Print', url: 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/paw.svg' }
    ]
  },
  { name: 'CATS', icon: <FaCat />, items: [{ name: 'Cat Icon', url: 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/cat.svg' }] },
  { name: 'PEOPLE', icon: <BiUserCircle />, items: [{ name: 'Athlete', url: 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/user-ninja.svg' }] },
  { name: 'BIRDS & THINGS WITH WINGS', icon: <FaCrow />, items: [{ name: 'Eagle', url: 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/crow.svg' }] },
  { name: 'BEARS & TUSKS', icon: <FaHippo />, items: [{ name: 'Bear', url: 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/hippo.svg' }] },
  { name: 'REPTILES & SEA CREATURES', icon: <BiBug />, items: [{ name: 'Dragon', url: 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/dragon.svg' }] },
  { name: 'HORSES & HOOVES', icon: <FaHorse />, items: [{ name: 'Horse', url: 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/horse.svg' }] },
  { name: 'MISC. LOGOS', icon: <BiStar />, items: [{ name: 'Crown', url: 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/crown.svg' }] },
  { name: 'WATERMARKS', icon: <BiGhost />, items: [{ name: 'Ghost', url: 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/ghost.svg' }] },
];

const LogosFlagsTab = ({ decals, selectedDecalId, setSelectedDecalId, addDecal, updateDecal, removeDecal, defaultLogos = [] }) => {
  const imageDecals = decals.filter(d => d.type === 'image');
  const selected = imageDecals.find(d => d.id === selectedDecalId);
  const [expandedCat, setExpandedCat] = useState(null);

  const mergedLogoCategories = useMemo(() => {
    const cats = logoCategories.map(c => ({ ...c, items: [...(c.items || [])] }));
    const byName = new Map(cats.map(c => [c.name.toUpperCase(), c]));
    (defaultLogos || []).forEach(logo => {
      const catName = (logo.category || 'MISC. LOGOS').toUpperCase();
      const item = { name: logo.name, url: logo.imageUrl };
      const existing = byName.get(catName);
      if (existing) {
        existing.items.push(item);
      } else {
        const newCat = { name: catName, icon: <BiStar />, items: [item] };
        cats.push(newCat);
        byName.set(catName, newCat);
      }
    });
    return cats;
  }, [defaultLogos]);

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const toastId = toast.loading('Uploading logo...');
    const formData = new FormData();
    formData.append('file', file);

    fetch(`${API_BASE}/api/decal/upload`, {
      method: 'POST',
      headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
      },
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.url) {
          toast.success('Logo uploaded!', { id: toastId });
          addDecal('image', file.name.replace(/\.[^.]+$/, ''), data.url);
        } else {
          toast.error('Failed to upload logo.', { id: toastId });
        }
      })
      .catch(err => {
        console.error('Logo upload error:', err);
        toast.error('Upload error occurred.', { id: toastId });
      });

    e.target.value = '';
  };

  const safeUpdate = (updates) => {
    if (!selected) return;
    updateDecal(selected.id, updates);
  };

  return (
    <div className="flex flex-col bg-[#0A0C16]">
      {/* ADD LOGO - PREMIUM OVERHAUL */}
      <div className="p-6 bg-[#0A0C16] border-b border-white/5">
        <h3 className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest mb-4">Add Components</h3>
        <label className="group relative flex flex-col items-center justify-center py-10 border border-dashed border-white/10 rounded-none bg-[#0e101f]/30 hover:bg-indigo-500/10/30 hover:border-indigo-500 transition-all cursor-pointer overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-50/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-12 h-12 rounded-none bg-[#0A0C16] shadow-sm border border-white/5 flex items-center justify-center text-slate-500 group-hover:text-indigo-400 group-hover:scale-110 transition-all mb-4">
            <HiOutlineCloudUpload size={24} className="animate-bounce-subtle" />
          </div>
          <div className="text-center relative z-10">
            <p className="text-[10px] font-semibold text-white uppercase tracking-widest">Upload Custom Artwork</p>
            <p className="text-[8px] text-slate-500 uppercase tracking-widest mt-1">PNG, SVG, JPG (Max 5MB)</p>
          </div>
          <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
        </label>
      </div>

      {/* ACTIVE LOGOS LIST */}
      {imageDecals.length > 0 && (
        <div className="p-6 bg-[#0A0C16] border-b border-white/5">
          <h3 className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest mb-4 flex items-center justify-between">
            <span>Active Logos</span>
            <span className="text-[8px] bg-slate-950/40 px-2 py-0.5 rounded-none text-slate-500 border border-white/5">{imageDecals.length}</span>
          </h3>
          <div className="space-y-1.5">
            {imageDecals.map(d => (
              <div
                key={d.id}
                onClick={() => setSelectedDecalId(d.id)}
                className={`p-3.5 rounded-none border transition-all flex items-center justify-between bg-[#0A0C16] cursor-pointer ${selectedDecalId === d.id ? 'border-indigo-500 bg-indigo-500/10/20' : 'border-white/5 hover:border-white/5'}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-none border border-white/5 bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url(${d.imageUrl})` }} />
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-semibold truncate max-w-[150px]">{d.text || 'Logo'}</span>
                    <span className="text-[7px] font-semibold text-gray-300 uppercase mt-0.5">SIZE {((d.decalScale || 0.12) * 100).toFixed(0)}%</span>
                  </div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); removeDecal(d.id); }} className="w-5 h-5 flex items-center justify-center text-gray-200 hover:text-red-500 transition-colors"><BiTrash /></button>
              </div>
            ))}
          </div>

          {selected && (
            <div className="mt-6 p-4 bg-[#0e101f] rounded-none border border-white/5 space-y-6 text-left">
              {/* Tip Banner */}
              <div className="p-3 bg-indigo-500/10/50 border border-indigo-500/20 rounded-none text-[8.5px] text-indigo-400/80 font-bold uppercase tracking-wider flex items-center gap-2">
                <span className="text-xs">💡</span>
                <span>Tip: click anywhere on the 3D model to move this layer.</span>
              </div>

              {/* Sizing & Stretching */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Sizing & Stretching</p>

                {/* Uniform Scale */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">Overall Scale (Uniform)</span>
                    <span className="text-[10px] font-semibold text-indigo-400">{((selected.decalScale || 0.12) * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.03"
                    max="4.0"
                    step="0.01"
                    className="w-full h-1.5 bg-gray-200 rounded-none appearance-none cursor-pointer accent-indigo-500"
                    value={selected.decalScale || 0.12}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);
                      safeUpdate({ decalScale: v, decalScaleX: v, decalScaleY: v });
                    }}
                  />
                </div>

                {/* Horizontal Stretch (Width) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">Width (Horizontal Stretch)</span>
                    <span className="text-[10px] font-semibold text-indigo-400">{((selected.decalScaleX !== undefined ? selected.decalScaleX : (selected.decalScale || 0.12)) * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.03"
                    max="4.0"
                    step="0.01"
                    className="w-full h-1.5 bg-gray-200 rounded-none appearance-none cursor-pointer accent-indigo-500"
                    value={selected.decalScaleX !== undefined ? selected.decalScaleX : (selected.decalScale || 0.12)}
                    onChange={(e) => safeUpdate({ decalScaleX: parseFloat(e.target.value) })}
                  />
                </div>

                {/* Vertical Stretch (Height) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">Height (Vertical Stretch)</span>
                    <span className="text-[10px] font-semibold text-indigo-400">{((selected.decalScaleY !== undefined ? selected.decalScaleY : (selected.decalScale || 0.12)) * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.03"
                    max="4.0"
                    step="0.01"
                    className="w-full h-1.5 bg-gray-200 rounded-none appearance-none cursor-pointer accent-indigo-500"
                    value={selected.decalScaleY !== undefined ? selected.decalScaleY : (selected.decalScale || 0.12)}
                    onChange={(e) => safeUpdate({ decalScaleY: parseFloat(e.target.value) })}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest">Rotation</p>
                  <span className="text-[10px] font-semibold text-indigo-400">{Math.round((selected.rotation || 0) * 180 / Math.PI)}°</span>
                </div>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  step="1"
                  className="w-full h-1.5 bg-gray-200 rounded-none appearance-none cursor-pointer accent-indigo-500"
                  value={Math.round((selected.rotation || 0) * 180 / Math.PI)}
                  onChange={(e) => safeUpdate({ rotation: parseFloat(e.target.value) * Math.PI / 180 })}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* LOGO CATEGORIES */}
      <div className="flex-1">
        {mergedLogoCategories.map((cat, i) => (
          <div key={cat.name} className="border-b border-white/5 bg-[#0A0C16]">
            <button
              onClick={() => setExpandedCat(expandedCat === i ? null : i)}
              className={`w-full flex items-center justify-between px-5 py-3.5 transition-colors cursor-pointer hover:bg-[#0e101f] ${expandedCat === i ? 'bg-[#0e101f]' : ''}`}
            >
              <div className="flex items-center gap-3">
                <span className={`text-lg transition-colors ${expandedCat === i ? 'text-indigo-400' : 'text-slate-500'}`}>{cat.icon}</span>
                <span className={`text-[10px] font-semibold uppercase tracking-widest ${expandedCat === i ? 'text-white' : 'text-slate-500'}`}>{cat.name}</span>
              </div>
              <span className={`text-[10px] transition-transform duration-300 ${expandedCat === i ? 'rotate-45 text-indigo-400' : 'text-gray-300'}`}>＋</span>
            </button>
            {expandedCat === i && (
              <div className="p-4 bg-[#0A0C16] border-t border-white/5">
                <div className="grid grid-cols-3 gap-2">
                  {cat.items?.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => addDecal('image', item.name, item.url)}
                      className="aspect-square bg-[#0e101f] border border-white/5 rounded-none p-2 hover:border-indigo-500 hover:bg-indigo-500/10 transition-all flex flex-col items-center justify-center gap-1 group cursor-pointer"
                    >
                      <img src={item.url} alt={item.name ? `${item.name} graphic` : "Graphic icon"} title={item.name} className="w-full h-full object-contain opacity-60 group-hover:opacity-100 transition-opacity" />
                      <span className="text-[6px] font-semibold text-slate-500 uppercase truncate w-full text-center group-hover:text-indigo-400">{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const StudioConfigTab = ({ globalPattern, setGlobalPattern, lightingPreset, setLightingPreset, materialFinish, setMaterialFinish, mouseFollow, setMouseFollow }) => {
  const [openSection, setOpenSection] = useState('pattern');

  const renderSection = (id, label, icon, content) => {
    const isOpen = openSection === id;
    return (
      <div className="bg-[#0A0C16] border-b border-white/5">
        <button
          onClick={() => setOpenSection(isOpen ? null : id)}
          className={`w-full flex items-center justify-between px-5 py-4 hover:bg-[#0e101f] transition-colors cursor-pointer ${isOpen ? 'bg-[#0e101f]' : ''}`}
        >
          <div className="flex items-center gap-3">
            <span className={`text-lg transition-colors ${isOpen ? 'text-indigo-400' : 'text-slate-500'}`}>{icon}</span>
            <span className={`text-[10px] font-semibold uppercase tracking-widest ${isOpen ? 'text-white' : 'text-slate-500'}`}>{label}</span>
          </div>
          <span className={`text-[10px] transition-transform duration-300 ${isOpen ? 'rotate-45 text-indigo-400' : 'text-gray-300'}`}>＋</span>
        </button>
        {isOpen && <div className="p-5 bg-[#0A0C16]">{content}</div>}
      </div>
    );
  };

  return (
    <div className="flex flex-col bg-[#0A0C16] h-full font-['Outfit']">
      {renderSection('pattern', 'Fabric Options', <HiOutlineCube />, (
        <div className="grid grid-cols-2 gap-2">
          {['none', 'carbon', 'camo', 'dots'].map(p => (
            <button key={p} onClick={() => setGlobalPattern(p === 'none' ? null : p)} className={`py-3 rounded-none text-[9px] font-semibold uppercase tracking-widest border transition-all ${globalPattern === p || (p === 'none' && !globalPattern) ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400' : 'border-white/5 text-slate-500 hover:border-white/30'}`}>{p}</button>
          ))}
        </div>
      ))}
      {renderSection('finish', 'Material Finish', <HiOutlineColorSwatch />, (
        <div className="grid grid-cols-3 gap-2">
          {['matte', 'gloss', 'metallic'].map(f => (
            <button key={f} onClick={() => setMaterialFinish(f)} className={`py-3 rounded-none text-[9px] font-semibold uppercase tracking-widest border transition-all ${materialFinish === f ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400' : 'border-white/5 text-slate-500 hover:border-white/30'}`}>{f}</button>
          ))}
        </div>
      ))}
      {renderSection('lighting', 'Studio Lighting', <HiOutlineLightningBolt />, (
        <div className="grid grid-cols-3 gap-2">
          {['city', 'studio', 'night'].map(l => (
            <button key={l} onClick={() => setLightingPreset(l)} className={`py-3 rounded-none text-[9px] font-semibold uppercase tracking-widest border transition-all ${lightingPreset === l ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400' : 'border-white/5 text-slate-500 hover:border-white/30'}`}>{l}</button>
          ))}
        </div>
      ))}
      {renderSection('interaction', 'Viewport Settings', <HiOutlineCursorClick />, (
        <div className="space-y-4">
          <button onClick={() => setMouseFollow(!mouseFollow)} className={`w-full py-3.5 rounded-none text-[10px] font-semibold uppercase tracking-widest border transition-all flex items-center justify-center gap-3 ${mouseFollow ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-[#0A0C16] text-slate-500 border-white/5 hover:border-indigo-500'}`}>
            <div className={`w-2 h-2 rounded-none ${mouseFollow ? 'bg-[#0A0C16]' : 'bg-gray-200'}`} />
            360 Mouse Follow: {mouseFollow ? 'ACTIVE' : 'OFF'}
          </button>
        </div>
      ))}
    </div>
  );
};

const CheckoutRosterTab = ({ roster, setRoster, onCheckout }) => {
  const [isPersonalized, setIsPersonalized] = useState(true);
  const addRow = () => setRoster([...roster, { id: Date.now(), name: '', number: '', size: 'L' }]);
  const removeRow = (id) => roster.length > 1 && setRoster(roster.filter(r => r.id !== id));
  const updateRow = (id, field, value) => setRoster(roster.map(r => r.id === id ? { ...r, [field]: value } : r));

  return (
    <div className="flex flex-col bg-[#0A0C16] h-full">
      <div className="p-6 bg-[#0A0C16] border-b border-white/5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-widest text-white">Order Roster</h3>
            <p className="text-[8px] font-semibold text-slate-500 uppercase mt-1">{roster.length} Total Units</p>
          </div>
          <button onClick={addRow} className="flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-none text-[9px] font-semibold uppercase tracking-widest shadow-lg shadow-blue-500/10"><HiOutlineUserAdd /> Add Unit</button>
        </div>
        <div className="flex items-center justify-between bg-[#0e101f] rounded-none p-3 border border-white/5">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-none flex items-center justify-center text-sm ${isPersonalized ? 'bg-indigo-500/20 text-indigo-400' : 'bg-gray-200 text-slate-500'}`}><BiText /></div>
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-300">Personalization</p>
              <p className="text-[7px] font-semibold text-slate-500 uppercase">Names & Numbers</p>
            </div>
          </div>
          <button onClick={() => setIsPersonalized(!isPersonalized)} className={`w-10 h-5 rounded-full relative transition-all duration-300 ${isPersonalized ? 'bg-indigo-600' : 'bg-gray-300'}`}><div className={`absolute top-1 w-3 h-3 bg-[#0A0C16] rounded-full transition-all duration-300 ${isPersonalized ? 'left-6' : 'left-1'}`} /></button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto h-[calc(100%-10rem)] p-4 py-12 space-y-3 right-scroll" data-lenis-prevent>
        {roster.map((row, index) => (
          <div key={row.id} className="bg-[#0A0C16] rounded-none border border-white/5 p-3 relative group">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-none bg-[#0e101f] flex items-center justify-center text-[9px] font-semibold text-slate-500 border border-white/5">{index + 1}</div>
              <div className="flex-1 grid grid-cols-12 gap-2">
                {isPersonalized ? (
                  <>
                    <div className="col-span-6"><input type="text" value={row.name} onChange={(e) => updateRow(row.id, 'name', e.target.value.toUpperCase())} placeholder="PLAYER NAME" className="w-full bg-[#0e101f] border-none px-2 py-2 text-[10px] font-semibold focus:ring-1 focus:ring-indigo-500 transition-all" /></div>
                    <div className="col-span-3"><input type="text" value={row.number} onChange={(e) => updateRow(row.id, 'number', e.target.value)} placeholder="00" maxLength={3} className="w-full bg-[#0e101f] border-none px-2 py-2 text-[10px] font-semibold text-center focus:ring-1 focus:ring-indigo-500 transition-all" /></div>
                    <div className="col-span-3"><select value={row.size} onChange={(e) => updateRow(row.id, 'size', e.target.value)} className="w-full bg-[#0e101f] border-none px-2 py-2 text-[10px] font-semibold appearance-none focus:ring-1 focus:ring-indigo-500 transition-all cursor-pointer">{['YS', 'YM', 'YL', 'S', 'M', 'L', 'XL', '2XL', '3XL'].map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                  </>
                ) : (
                  <div className="col-span-12 flex items-center justify-between bg-[#0e101f] px-3 py-1.5"><span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Select Size</span><select value={row.size} onChange={(e) => updateRow(row.id, 'size', e.target.value)} className="bg-transparent border-none py-1 text-[12px] font-semibold text-indigo-400 appearance-none focus:ring-0 cursor-pointer text-right">{['YS', 'YM', 'YL', 'S', 'M', 'L', 'XL', '2XL', '3XL'].map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                )}
              </div>
              <button onClick={() => removeRow(row.id)} className="w-6 h-6 flex items-center justify-center text-gray-200 hover:text-red-500 transition-colors"><HiOutlineTrash /></button>
            </div>
          </div>
        ))}
      </div>
      <div className="p-6 bg-[#0A0C16] border-t border-white/5">
        <button onClick={onCheckout} className="w-full bg-indigo-600 text-white py-4 rounded-none text-[11px] font-semibold uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 hover:bg-indigo-700 transition-all flex items-center justify-center gap-3">Finalize & Checkout <div className="w-1.5 h-1.5 rounded-full bg-[#0A0C16] animate-pulse" /></button>
      </div>
    </div>
  );
};

import AIAssistantTab from './AIAssistantTab';

// ── Model View Tab (UV & 2D Flat views) ──────────────────────────────────────
const ModelViewTab = ({ uvView, flatView, modelName }) => {
  const [activeView, setActiveView] = React.useState('uv');
  const hasUV = !!(uvView && uvView.trim());
  const hasFlat = !!(flatView && flatView.trim());
  const hasAny = hasUV || hasFlat;

  // Auto-select whichever is available
  React.useEffect(() => {
    if (!hasUV && hasFlat) setActiveView('flat');
    else setActiveView('uv');
  }, [uvView, flatView]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 py-3 border-b border-white/5 bg-[#0e101f] flex-shrink-0">
        <div className="flex items-center gap-2 mb-2">
          <BiMapAlt className="text-indigo-400" size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest text-white">Model Reference Views</span>
        </div>
        <p className="text-[9px] text-slate-500 uppercase tracking-wider">{modelName || 'Current Model'}</p>

        {/* Sub-tab switcher */}
        {hasAny && (
          <div className="flex gap-1 mt-3">
            <button
              onClick={() => setActiveView('uv')}
              disabled={!hasUV}
              className={`flex-1 py-1.5 text-[8px] font-bold uppercase tracking-widest rounded-none transition
                ${activeView === 'uv' ? 'bg-indigo-600 text-white' : 'bg-[#0A0C16] text-slate-500 hover:text-white border border-white/5'}
                ${!hasUV ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              UV Layout
            </button>
            <button
              onClick={() => setActiveView('flat')}
              disabled={!hasFlat}
              className={`flex-1 py-1.5 text-[8px] font-bold uppercase tracking-widest rounded-none transition
                ${activeView === 'flat' ? 'bg-indigo-600 text-white' : 'bg-[#0A0C16] text-slate-500 hover:text-white border border-white/5'}
                ${!hasFlat ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              2D Flat View
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center" data-lenis-prevent>
        {!hasAny ? (
          /* No images uploaded yet */
          <div className="flex flex-col items-center gap-4 py-12 text-center">
            <div className="w-16 h-16 rounded-none bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <BiMapAlt size={28} className="text-indigo-400/50" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">No view images uploaded</p>
              <p className="text-[9px] text-slate-600 mt-1 max-w-[180px] leading-relaxed">
                Upload a UV layout or 2D flat diagram for this model in the admin panel.
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full">
            {activeView === 'uv' && hasUV && (
              <div className="flex flex-col items-center gap-3">
                <div className="w-full bg-[#0e101f] border border-white/5 rounded-none overflow-hidden">
                  <img
                    src={uvView}
                    alt="UV Layout"
                    className="w-full object-contain max-h-[340px]"
                    style={{ imageRendering: 'crisp-edges' }}
                  />
                </div>
                <p className="text-[8px] text-slate-600 uppercase tracking-widest">UV Texture Layout Map</p>
              </div>
            )}
            {activeView === 'flat' && hasFlat && (
              <div className="flex flex-col items-center gap-3">
                <div className="w-full bg-[#0e101f] border border-white/5 rounded-none overflow-hidden">
                  <img
                    src={flatView}
                    alt="2D Flat View"
                    className="w-full object-contain max-h-[340px]"
                  />
                </div>
                <p className="text-[8px] text-slate-600 uppercase tracking-widest">2D Flat / Front–Back Diagram</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const RightPanel = (props) => {
  const [activeTab, setActiveTab] = useState('colors');

  useEffect(() => {
    const handleOpenCheckout = () => setActiveTab('roster');
    window.addEventListener('eay:openCheckout', handleOpenCheckout);
    return () => window.removeEventListener('eay:openCheckout', handleOpenCheckout);
  }, []);
  
  const mainTabs = [
    { id: 'colors', label: 'Colors', icon: <BiPalette /> },
    { id: 'names', label: 'Names', icon: <BiText /> },
    { id: 'logos', label: 'Logos', icon: <BiImage /> },
    { id: 'view', label: 'View', icon: <BiMapAlt /> },
    { id: 'ai', label: 'AI Tools', icon: <HiOutlineSparkles /> },
    { id: 'config', label: 'Studio', icon: <HiOutlineAdjustments /> },
    { id: 'roster', label: 'Checkout', icon: <BiCart /> },
  ];

  const activeMeshDisplayName = props.activeMesh 
    ? (props.layersMetadata?.[props.activeMesh]?.display_name || props.activeMesh.replace(/\.obj$/i, '').replace(/_/g, ' '))
    : 'Select Part';

  return (
    <div className="flex flex-1 md:flex-none w-full md:w-[480px] h-full flex-shrink-0 border-t md:border-t-0 md:border-l border-white/5 bg-[#0A0C16] flex-col-reverse md:flex-row z-50 relative overflow-hidden min-h-0">
      {/* ── Active Tab Area on Left ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Workspace details header */}
        <div className="px-5 py-3.5 border-b border-white/5 flex items-center justify-between bg-[#0e101f] flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-none bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20"><BiCube size={18} /></div>
            <div>
              <div className="text-[9px] font-bold text-white uppercase tracking-widest truncate max-w-[160px]">
                {activeMeshDisplayName}
              </div>
              <div className="text-[7.5px] font-bold text-indigo-400 uppercase tracking-widest mt-0.5">Active Component</div>
            </div>
          </div>
          <div className="px-2 py-0.5 rounded-none border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 text-[8px] font-bold tracking-widest uppercase">Live Customizer</div>
        </div>

        {/* Tab contents scroll pane */}
        <div className="flex-1 relative min-h-0">
          <div className={`absolute inset-0 ${activeTab === 'ai' ? 'overflow-hidden pb-0' : 'overflow-y-auto pb-24'} overflow-x-hidden touch-auto custom-scrollbar`} data-lenis-prevent onWheel={(e) => e.stopPropagation()} style={{ WebkitOverflowScrolling: 'touch' }}>
            
            {activeTab === 'colors' ? (
              <MeshProperties
                state={props.meshStates[props.activeMesh]}
                updateProp={(prop, val) => props.updateMeshProp(props.activeMesh, prop, val)}
                meshStates={props.meshStates}
                updateMeshStates={props.updateMeshStates}
                activeMesh={props.activeMesh}
                setActiveMesh={props.setActiveMesh}
                layersMetadata={props.layersMetadata || {}}
                updateMeshProp={props.updateMeshProp}
                addDecal={props.addDecal}
                decals={props.decals}
                selectedDecalId={props.selectedDecalId}
                setSelectedDecalId={props.setSelectedDecalId}
                updateDecal={props.updateDecal}
                removeDecal={props.removeDecal}
                defaultPatterns={props.defaultPatterns}
              />
            ) : activeTab === 'names' ? (
              <NamesNumbersTab {...props} />
            ) : activeTab === 'logos' ? (
              <LogosFlagsTab {...props} />
            ) : activeTab === 'view' ? (
              <ModelViewTab uvView={props.uvView} flatView={props.flatView} modelName={props.modelName} />
            ) : activeTab === 'ai' ? (
              <AIAssistantTab
                meshes={props.meshes}
                meshStates={props.meshStates}
                updateMeshStates={props.updateMeshStates}
                addDecal={props.addDecal}
                decals={props.decals}
                updateDecal={props.updateDecal}
                removeDecal={props.removeDecal}
                defaultPatterns={props.defaultPatterns}
                defaultLogos={props.defaultLogos}
              />
            ) : activeTab === 'config' ? (
              <StudioConfigTab {...props} />
            ) : (
              <CheckoutRosterTab roster={props.roster} setRoster={props.setRoster} onCheckout={props.onCheckout} />
            )}

          </div>
        </div>

        <div className="px-4 py-2 bg-[#0e101f] border-t border-white/5 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
            <span className="text-[8px] font-bold text-slate-455 uppercase tracking-widest">3D Customization Engine Online</span>
          </div>
        </div>
      </div>

      {/* ── Toolbar (Horizontal on Mobile, Vertical on Desktop) ── */}
      <div className="w-full md:w-16 h-16 md:h-full bg-[#0e101f] border-t md:border-t-0 md:border-l border-white/5 flex flex-row md:flex-col items-center justify-between md:justify-start px-2 md:px-0 py-0 md:py-4 gap-2 md:gap-4 flex-shrink-0 overflow-x-auto md:overflow-x-hidden overflow-y-hidden md:overflow-y-auto custom-scrollbar">
        {mainTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-12 h-12 flex flex-col items-center justify-center gap-1 transition-all rounded-none cursor-pointer relative group flex-shrink-0
              ${activeTab === tab.id 
                ? 'text-indigo-400 bg-indigo-500/10 shadow-inner border-b-2 md:border-b-0 md:border-l-2 border-indigo-500' 
                : 'text-slate-500 hover:text-white hover:bg-[#0A0C16]/5'}`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="text-[7.5px] font-bold uppercase tracking-tighter text-center leading-none max-w-[42px] truncate">
              {tab.label.split(' ')[0]}
            </span>
            
            {/* Tooltip */}
            <div className="absolute right-full mr-2 px-2.5 py-1.5 bg-slate-900 border border-white/10 text-white text-[8px] font-bold uppercase tracking-wider rounded-none opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-xl">
              {tab.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RightPanel;

