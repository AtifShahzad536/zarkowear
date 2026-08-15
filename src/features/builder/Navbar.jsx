import React, { useState, useRef, useEffect, useSyncExternalStore } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineFolderOpen, HiOutlineSaveAs, HiOutlineDownload, HiOutlineCubeTransparent, HiOutlineArrowLeft } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import { VscHistory } from 'react-icons/vsc';
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
      label: 'File',
      items: [
        {
          label: 'Import Model (.glb)', icon: <HiOutlineCubeTransparent />, action: () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.glb,.gltf';
            input.onchange = (e) => {
              const file = e.target.files[0];
              if (file) {
                const toastId = toast.loading('Uploading 3D model to server...');
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
                      toast.success('3D model uploaded and ready!', { id: toastId });
                      window.dispatchEvent(new CustomEvent('eay:importModel', { detail: data.url }));
                    } else {
                      toast.error(data.message || 'Failed to upload model.', { id: toastId });
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
        { label: 'Save Design', icon: <HiOutlineSaveAs />, action: () => window.dispatchEvent(new CustomEvent('eay:save')) },
        { label: 'Export PNG', icon: <HiOutlineDownload />, action: () => window.dispatchEvent(new CustomEvent('eay:export')) },
      ]
    },
    {
      label: 'Edit',
      items: [
        { label: 'Undo', action: () => window.dispatchEvent(new CustomEvent('eay:undo')), disabled: !hasUndo },
        { label: 'Redo', action: () => window.dispatchEvent(new CustomEvent('eay:redo')), disabled: !hasRedo },
        { type: 'separator' },
        { label: 'Clear Colors', icon: <VscHistory />, action: () => window.dispatchEvent(new CustomEvent('eay:resetAll')) },
      ]
    },
    {
      label: 'View',
      items: [
        { label: 'Toggle HUD', action: () => window.dispatchEvent(new CustomEvent('eay:toggleHUD')) },
      ]
    }
  ];

  const isLandingPage = !window.location.pathname.includes('/builder/');

  if (isLandingPage) {
    menuData = menuData.filter(m => m.label !== 'File' && m.label !== 'View');
  }

  const navigate = useNavigate();

  // Helper to determine where the Exit button should go
  const handleExit = () => {
    const persistedFrom = sessionStorage.getItem('builder_from_page');
    if (persistedFrom === '/dealer/designs') {
      // Clear storage after exit to prevent sticky redirects in other sessions
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
      className="w-full h-9 bg-white border-b border-gray-200 flex items-stretch select-none z-[70] flex-shrink-0 relative"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* ── Navigation / Exit Logic (Always Shown) ── */}
      <div className="flex items-stretch border-r border-gray-100">
        <button
          onClick={handleExit}
          className="px-4 flex items-center gap-2 hover:bg-gray-100 transition-colors border-r border-gray-100 group"
          title={onBack ? "Return to Library" : "Exit to Store"}
        >
          <HiOutlineArrowLeft className="text-gray-400 group-hover:text-indigo-600 transition-colors" size={14} />
          <span className="text-[10px] font-bold text-gray-500 group-hover:text-gray-900 uppercase tracking-tighter">Exit</span>
        </button>
      </div>

      {/* ── VS Code Style Logo & Branding ── */}
      <div className="flex items-center px-4 gap-4 border-r border-gray-100 bg-gray-50/10">
        <div className="flex items-center gap-2.5">
          <Link to="/" className="flex items-center gap-2 hover:scale-105 transition-transform flex-shrink-0">
            <img src="/new-logo.png" alt="ZSW Logo" title="ZSW Logo" width={28} height={28} className="h-7 w-auto object-contain" />
            <span className="hidden sm:inline text-[10px] font-bold text-gray-900 uppercase tracking-[0.1em] whitespace-nowrap">
              Zarko <span className="text-indigo-600">Studio</span>
            </span>
          </Link>
        </div>
      </div>

      {/* ── Editor Menu Bar ── */}
      <div className="flex items-stretch">
        {menuData.map((menu) => (
          <div key={menu.label} className="relative flex items-stretch">
            <button
              className={`px-3 h-full text-[10px] font-medium tracking-wide flex items-center gap-1.5 transition-colors outline-none
                ${activeMenu === menu.label ? 'bg-gray-100 text-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
              onClick={() => setActiveMenu(prev => prev === menu.label ? null : menu.label)}
              onMouseEnter={() => activeMenu && setActiveMenu(menu.label)}
            >
              {menu.label}
            </button>

            {activeMenu === menu.label && (
              <div className="absolute top-full left-0 mt-0 w-max min-w-[220px] bg-white border border-gray-200 shadow-xl z-50 py-1 animate-in fade-in slide-in-from-top-1 duration-100">
                {menu.items.map((item, i) => (
                  item.type === 'separator' ? (
                    <div key={i} className="my-1 border-t border-gray-100" />
                  ) : (
                  <button
                    key={i}
                    onClick={() => { if (!item.disabled) { item.action?.(); setActiveMenu(null); } }}
                    disabled={item.disabled}
                    className={`w-full text-left px-4 py-2 text-[10px] font-medium flex items-center justify-between group transition-colors duration-75
                      ${item.disabled ? 'text-gray-300 cursor-default' : 'text-gray-700 hover:bg-blue-600 hover:text-white'}`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon && <span className="text-xs opacity-60 group-hover:opacity-100">{item.icon}</span>}
                      <span className="tracking-wide whitespace-nowrap">{item.label}</span>
                    </div>
                    <span className="text-[8px] opacity-40 group-hover:opacity-60 ml-8 tracking-tighter">
                      {item.label === 'Undo' ? 'CTRL+Z' : ''}
                      {item.label === 'Redo' ? 'CTRL+Y' : ''}
                      {item.label === 'Save Design' ? 'CTRL+S' : ''}
                      {item.label === 'Clear Colors' ? 'CTRL+R' : ''}
                    </span>
                  </button>
                  )
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Active File / Project Name Indicator ── */}
      <div className="hidden md:flex flex-1 items-center justify-center pointer-events-none">
        <div className="px-3 py-0.5 bg-gray-50 border border-gray-100 rounded-none flex items-center gap-2">
          <span className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.2em]">Active Workspace:</span>
          <span className="text-[9px] font-semibold text-gray-700 uppercase tracking-widest">
            {window.location.pathname.includes('/builder/') ? 'Jersey_Library_Context' : 'Studio_Entry_Context'}
          </span>
        </div>
      </div>

      {/* ── System Status ── */}
      <div className="ml-auto flex items-center gap-3 px-4">
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex flex-col items-end leading-none">
            <span className="text-[7px] font-bold text-gray-300 uppercase tracking-[0.2em]">Build</span>
            <span className="text-[8px] font-semibold text-gray-500 tracking-wider">v1.0.4-PRO</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-50 border border-green-100">
            <div className="w-1 h-1 rounded-none bg-green-500 animate-pulse" />
            <span className="text-[8px] font-bold text-green-600 uppercase">Live</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

