import React, { useState, useRef, useEffect, useSyncExternalStore } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineSaveAs, HiOutlineCubeTransparent, HiOutlineArrowLeft } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import { VscHistory } from 'react-icons/vsc';
import { BiUndo, BiRedo, BiHelpCircle, BiBell, BiChevronDown, BiCart } from 'react-icons/bi';
import { canUndo, canRedo, subscribeUndoRedo } from './undoMiddleware';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4001';

const Navbar = ({ onBack, backTo }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const barRef = useRef(null);
  const hasUndo = useSyncExternalStore(subscribeUndoRedo, canUndo);
  const hasRedo = useSyncExternalStore(subscribeUndoRedo, canRedo);

  useEffect(() => {
    const handler = (e) => {
      if (barRef.current && !barRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  let menuData = [
    {
      label: 'Options',
      items: [
        {
          label: 'Upload 3D Template (.glb)', icon: <HiOutlineCubeTransparent />, action: () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.glb,.gltf';
            input.onchange = (e) => {
              const file = e.target.files[0];
              if (file) {
                const toastId = toast.loading('Uploading 3D template to server...');
                const formData = new FormData();
                formData.append('file', file);

                fetch(`${API_BASE}/api/model/upload`, {
                  method: 'POST',
                  headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                  },
                  body: formData
                })
                  .then(res => res.json())
                  .then(data => {
                    if (data.success && data.url) {
                      toast.success('3D template uploaded and ready!', { id: toastId });
                      window.dispatchEvent(new CustomEvent('eay:importModel', { detail: data.url }));
                    } else {
                      toast.error(data.message || 'Failed to upload template.', { id: toastId });
                    }
                  })
                  .catch(err => {
                    console.error('Model upload error:', err);
                    toast.error('Network error during upload.', { id: toastId });
                  });
              }
            };
            input.click();
          }
        },
        { label: 'Save Design Blueprint', icon: <HiOutlineSaveAs />, action: () => window.dispatchEvent(new CustomEvent('eay:save')) },
      ]
    },
    {
      label: 'History',
      items: [
        { label: 'Undo Action', action: () => window.dispatchEvent(new CustomEvent('eay:undo')), disabled: !hasUndo },
        { label: 'Redo Action', action: () => window.dispatchEvent(new CustomEvent('eay:redo')), disabled: !hasRedo },
        { type: 'separator' },
        { label: 'Reset Design Colors', icon: <VscHistory />, action: () => window.dispatchEvent(new CustomEvent('eay:resetAll')) },
      ]
    },
    {
      label: 'Settings',
      items: [
        { label: 'Hide HUD Controls', action: () => window.dispatchEvent(new CustomEvent('eay:toggleHUD')) },
      ]
    }
  ];

  const navigate = useNavigate();

  const handleExit = () => {
    const persistedFrom = sessionStorage.getItem('builder_from_page');
    if (persistedFrom === '/dealer/designs') {
      sessionStorage.removeItem('builder_from_page');
      navigate('/dealer/designs');
      return;
    }

    if (onBack) {
      onBack();
    } else {
      navigate(backTo || '/');
    }
  };

  return (
    <div
      ref={barRef}
      className="w-full h-11 bg-[#0C0E1A] border-b border-white/5 flex items-center select-none z-[70] flex-shrink-0 relative px-2 md:px-4"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* ── Brand Logo / Left Section ── */}
      <div className="flex items-center gap-2 md:gap-4 mr-2 md:mr-6">
        <Link to="/" className="flex items-center gap-2 md:gap-2.5 hover:scale-105 transition-transform flex-shrink-0">
          <picture>
            <source srcSet="/new-logo.webp" type="image/webp" />
            <img src="/new-logo.webp" alt="ZSW Logo" title="ZSW Logo" width={24} height={24} className="h-6 w-auto object-contain" onError={(e) => { e.currentTarget.src = '/new-logo.png'; }} />
          </picture>
          <span className="hidden sm:inline text-[10px] font-black text-white uppercase tracking-[0.18em] whitespace-nowrap">
            ZARKOWEAR <span className="text-indigo-400">LAB v3D</span>
          </span>
        </Link>
      </div>

      {/* ── Editor Tabs Navigation (Figma Style) ── */}
      <div className="flex items-stretch h-full">
        {/* DESIGNER Tab (Active) */}
        <div className="flex items-stretch border-b-2 border-indigo-500">
          <button className="px-2 md:px-4 text-[9px] font-bold text-white uppercase tracking-wider cursor-pointer flex items-center gap-1.5">
            <span className="hidden md:inline">Designer</span>
            <span className="md:hidden">3D</span>
          </button>
        </div>

        {menuData.map((menu) => (
          <div key={menu.label} className="relative flex items-stretch border-b-2 border-transparent">
            <button
              className={`px-2 md:px-4 text-[9px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors outline-none cursor-pointer
                ${activeMenu === menu.label ? 'text-indigo-400' : 'text-slate-400 hover:text-white'}`}
              onClick={() => setActiveMenu(prev => prev === menu.label ? null : menu.label)}
              onMouseEnter={() => activeMenu && setActiveMenu(menu.label)}
            >
              {menu.label}
            </button>

            {activeMenu === menu.label && (
              <div className="absolute top-full left-0 mt-0 w-max min-w-[220px] bg-[#0e101f] border border-white/10 shadow-xl z-[80] py-1 animate-in fade-in slide-in-from-top-1 duration-100">
                {menu.items.map((item, i) => (
                  item.type === 'separator' ? (
                    <div key={i} className="my-1 border-t border-white/5" />
                  ) : (
                    <button
                      key={i}
                      onClick={() => { if (!item.disabled) { item.action?.(); setActiveMenu(null); } }}
                      disabled={item.disabled}
                      className={`w-full text-left px-4 py-2.5 text-[9px] font-medium flex items-center justify-between group transition-colors duration-75 cursor-pointer
                        ${item.disabled ? 'text-slate-600 cursor-default' : 'text-slate-300 hover:bg-indigo-650 hover:text-white'}`}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon && <span className="text-xs opacity-60 group-hover:opacity-100 text-indigo-400">{item.icon}</span>}
                        <span className="tracking-wide whitespace-nowrap">{item.label}</span>
                      </div>
                    </button>
                  )
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Active Blueprint Status Indicator (Center-Right) ── */}
      <div className="hidden lg:flex items-center gap-2.5 bg-slate-950/40 border border-white/5 px-3 py-1 ml-auto">
        <span className="text-[7.5px] font-bold text-slate-500 uppercase tracking-widest leading-none">Active Blueprint</span>
        <span className="text-[9px] font-bold text-slate-200 uppercase tracking-wider leading-none">
          {window.location.pathname.includes('/builder/') ? 'ZSW_ATHLETIC_BLUEPRINT' : 'ZSW_KIT_LAB_CANVAS'}
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
      </div>

      {/* ── Right Actions & Save Section ── */}
      <div className="flex items-center gap-2 md:gap-4 ml-auto md:ml-6 pl-2 md:pl-4 border-l-0 md:border-l border-white/5 h-full">
        {/* Exit Button */}
        <button 
          onClick={handleExit} 
          className="text-slate-400 hover:text-white text-[9px] font-bold uppercase tracking-wider cursor-pointer flex items-center gap-1.5 transition-colors"
          title="Exit to Store"
        >
          <HiOutlineArrowLeft size={13} />
          <span className="hidden md:inline">Exit</span>
        </button>

        {/* Undo / Redo */}
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent('eay:undo'))} 
          disabled={!hasUndo}
          className={`hidden md:block text-slate-400 hover:text-white transition-colors cursor-pointer ${!hasUndo ? 'opacity-40 pointer-events-none' : ''}`}
          title="Undo"
        >
          <BiUndo size={14} />
        </button>
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent('eay:redo'))} 
          disabled={!hasRedo}
          className={`hidden md:block text-slate-400 hover:text-white transition-colors cursor-pointer ${!hasRedo ? 'opacity-40 pointer-events-none' : ''}`}
          title="Redo"
        >
          <BiRedo size={14} />
        </button>

        {/* Help / Notifications */}
        <button className="hidden md:block text-slate-400 hover:text-white transition-colors cursor-pointer" title="Help">
          <BiHelpCircle size={14} />
        </button>
        <button className="hidden md:block text-slate-400 hover:text-white transition-colors cursor-pointer relative" title="Notifications">
          <BiBell size={14} />
          <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-indigo-500 rounded-full" />
        </button>

        {/* Checkout Button */}
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent('eay:openCheckout'))}
          className="flex items-center gap-1.5 px-3 md:px-4 py-1 bg-green-600 hover:bg-green-500 transition-colors border border-green-500/30 text-white font-bold text-[9px] tracking-wider uppercase h-7 cursor-pointer shadow-lg shadow-green-600/20 mr-1 md:mr-2"
        >
          <BiCart size={12} />
          <span>Checkout</span>
        </button>

        {/* Premium Save Split Button */}
        <div className="flex items-stretch bg-indigo-600 hover:bg-indigo-700 transition-colors border border-indigo-500/20 text-white font-bold text-[9px] tracking-wider uppercase h-7">
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('eay:save'))}
            className="px-2 md:px-3 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Save</span>
          </button>
          <button className="px-1 md:px-1.5 border-l border-white/10 hover:bg-indigo-700/50 flex items-center justify-center cursor-pointer">
            <BiChevronDown size={11} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
