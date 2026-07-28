import React, { useEffect, useState, memo } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import {
  setMeshes,
  setActiveMesh,
  updateMeshStates,
  updateMeshProp,
  addDecal,
  updateDecal,
  removeDecal,
  setSelectedDecalId,
  setRoster,
  setGlobalPattern,
  setLightingPreset,
  setMaterialFinish,
  setMouseFollow,
  setView,
  loadSavedDesignData
} from './builderSlice';
import { undo, redo } from './undoMiddleware';

// ── Helper: Convert blob URLs to base64 data URLs for localStorage persistence ──
const blobToDataUrl = (blobUrl) => {
  return new Promise((resolve) => {
    // Only convert blob: URLs; leave external URLs and data: URLs as-is
    if (!blobUrl || !blobUrl.startsWith('blob:')) {
      resolve(blobUrl);
      return;
    }
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      ctx.drawImage(img, 0, 0);
      try {
        resolve(canvas.toDataURL('image/png'));
      } catch {
        resolve(blobUrl); // Fallback if conversion fails
      }
    };
    img.onerror = () => resolve(blobUrl);
    img.src = blobUrl;
  });
};

const convertDesignForStorage = async (designData) => {
  const { decals, meshStates, ...rest } = designData;

  // Convert blob URLs in decals (logos, patterns)
  const convertedDecals = await Promise.all(
    (decals || []).map(async (d) => {
      if (d.imageUrl && d.imageUrl.startsWith('blob:')) {
        const dataUrl = await blobToDataUrl(d.imageUrl);
        return { ...d, imageUrl: dataUrl };
      }
      return d;
    })
  );

  // Convert blob URLs in meshStates (per-mesh pattern URLs)
  const convertedMeshStates = {};
  for (const [meshId, state] of Object.entries(meshStates || {})) {
    if (state.pUrl && state.pUrl.startsWith('blob:')) {
      const dataUrl = await blobToDataUrl(state.pUrl);
      convertedMeshStates[meshId] = { ...state, pUrl: dataUrl };
    } else {
      convertedMeshStates[meshId] = state;
    }
  }

  return { ...rest, decals: convertedDecals, meshStates: convertedMeshStates };
};

const Builder = memo(({ defaultPatterns, defaultLogos }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useStore();
  const [isHUDVisible, setIsHUDVisible] = useState(true);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [saveName, setSaveName] = useState('');

  // Checkout Form States
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [billingName, setBillingName] = useState('');
  const [billingEmail, setBillingEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('USA');
  const [isSubmitCheckingOut, setIsSubmitCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const isUserAuthenticated = true;
  const currentUser = null;
  const isDealer = false;

  const {
    selectedDesign: design,
    primaryColor, primaryIsGrad, primaryColor2,
    secondaryColor, secondaryIsGrad, secondaryColor2,
    thirdColor, thirdIsGrad, thirdColor2,
    globalPattern, lightingPreset, materialFinish, mouseFollow,
    meshes, activeMesh, meshStates, decals, selectedDecalId, roster
  } = useSelector((state) => state.builder);

  const meshStatesRef = React.useRef(meshStates);
  const pendingDesignRef = React.useRef(null); // Holds parsed pending design data until meshes load
  useEffect(() => {
    meshStatesRef.current = meshStates;
  }, [meshStates]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo(dispatch, store.getState);
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        redo(dispatch, store.getState);
      }
    };
    const handleUndo = () => undo(dispatch, store.getState);
    const handleRedo = () => redo(dispatch, store.getState);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('eay:undo', handleUndo);
    window.addEventListener('eay:redo', handleRedo);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('eay:undo', handleUndo);
      window.removeEventListener('eay:redo', handleRedo);
    };
  }, [dispatch, store]);

  const initialColors = {
    primary: { color: primaryColor, isGrad: primaryIsGrad, color2: primaryColor2 },
    secondary: { color: secondaryColor, isGrad: secondaryIsGrad, color2: secondaryColor2 },
    third: { color: thirdColor, isGrad: thirdIsGrad, color2: thirdColor2 }
  };

  // Handle Navbar Events
  useEffect(() => {
    const handleResetAll = () => {
      const resetStates = {};
      Object.keys(meshStates).forEach(meshId => {
        const m = meshes.find(mesh => mesh.id === meshId);
        if (m) {
          let type = 'Body';
          if (m.display.includes('Neck')) type = 'Neck';
          else if (m.display.includes('Sleeve')) type = m.display.includes('R') ? 'R_Sleeve' : 'L_Sleeve';
          else if (m.display.includes('Front')) type = 'Front';
          else if (m.display.includes('Back')) type = 'Back';

          resetStates[meshId] = {
            color: '#ffffff',
            isGrad: false,
            grad1: '#ffffff',
            grad2: '#ffffff',
            pColor: '#ffffff',
            pUrl: null,
            fabricTexture: 'none'
          };
        }
      });
      dispatch(updateMeshStates(resetStates));
      window.dispatchEvent(new CustomEvent('eay:resetCamera'));
    };

    const handleSave = async () => {
      if (!isUserAuthenticated) {
        toast.error('Please sign in to save your custom design!', { icon: '🔐' })
        const toastId = toast.loading('Preparing design for save...');
        const converted = await convertDesignForStorage({
          designId: design.id,
          meshStates,
          decals,
          globalPattern,
          lightingPreset,
          materialFinish,
          roster,
          autoOpenSave: true,
        });
        localStorage.setItem('pending_checkout_design', JSON.stringify(converted));
        toast.dismiss(toastId);
        router.visit('/auth')
        return
      }

      setSaveName(design.name || "My Custom Design");
      setSaveModalOpen(true);
    };

    const handleToggleHUD = () => {
      setIsHUDVisible(prev => !prev);
    };

    window.addEventListener('eay:resetAll', handleResetAll);
    window.addEventListener('eay:save', handleSave);
    window.addEventListener('eay:toggleHUD', handleToggleHUD);

    return () => {
      window.removeEventListener('eay:resetAll', handleResetAll);
      window.removeEventListener('eay:save', handleSave);
      window.removeEventListener('eay:toggleHUD', handleToggleHUD);
    };
  }, [dispatch, meshStates, meshes, design, initialColors, globalPattern, materialFinish, lightingPreset, isUserAuthenticated, decals, roster]);

  // Restore design custom state from guest checkout/save auth redirect if present
  useEffect(() => {
    const pending = localStorage.getItem('pending_checkout_design');
    console.log('[Pending Checkout Design Check]', {
      hasPending: !!pending,
      designId: design?.id
    });
    if (pending) {
      try {
        const parsed = JSON.parse(pending);
        console.log('[Pending Checkout Design Details]', {
          parsedId: parsed?.designId,
          activeId: design?.id,
          matched: parsed?.designId === design?.id
        });
        if (parsed && parsed.designId === design.id) {
          // Store parsed data in ref so handleMeshesDetected can apply it
          // after the 3D model loads (prevents race condition)
          pendingDesignRef.current = parsed;

          // Apply non-mesh design data immediately (these don't depend on mesh detection)
          dispatch(loadSavedDesignData({
            meshStates: parsed.meshStates,
            decals: parsed.decals,
            globalPattern: parsed.globalPattern,
            materialFinish: parsed.materialFinish,
            lightingPreset: parsed.lightingPreset,
            roster: parsed.roster,
          }));

          // Update the ref immediately so handleMeshesDetected sees the restored states
          if (parsed.meshStates) {
            meshStatesRef.current = parsed.meshStates;
          }

          toast.success('Restored your custom design!', { icon: '🎨' });

          if (parsed.autoOpenCheckout) {
            // Delay opening checkout modal until meshes are loaded
            setTimeout(() => setCheckoutModalOpen(true), 500);
          } else if (parsed.autoOpenSave) {
            setSaveName(design.name || "My Custom Design");
            setTimeout(() => setSaveModalOpen(true), 500);
          }

          localStorage.removeItem('pending_checkout_design');
        } else {
          console.warn('[Pending Checkout Design Mismatch] Design ID in storage does not match active design.');
        }
      } catch (e) {
        console.error('Failed to load pending guest checkout design:', e);
        localStorage.removeItem('pending_checkout_design');
      }
    }
  }, [design?.id, dispatch]);

  const handleMeshesDetected = (meshList) => {
    dispatch(setMeshes(meshList));
    if (meshList.length > 0 && !activeMesh) {
      const firstVisible = meshList.find(m => !design.layers_metadata?.[m.id]?.merge_parent) || meshList[0];
      dispatch(setActiveMesh(firstVisible.id));
    }

    // If a pending design was restored from localStorage, re-apply ALL design data
    // AFTER mesh detection to ensure they aren't overwritten by defaults.
    const pendingData = pendingDesignRef.current;
    if (pendingData) {
      console.log('[Pending Design] Applying full restored design after mesh detection');

      // Re-apply the complete design state (meshStates, decals, patterns, etc.)
      dispatch(loadSavedDesignData({
        meshStates: pendingData.meshStates,
        decals: pendingData.decals,
        globalPattern: pendingData.globalPattern,
        materialFinish: pendingData.materialFinish,
        lightingPreset: pendingData.lightingPreset,
        roster: pendingData.roster,
      }));

      if (pendingData.meshStates) {
        meshStatesRef.current = { ...meshStatesRef.current, ...pendingData.meshStates };
      }
      pendingDesignRef.current = null; // Clear after applying
      return; // Skip default color initialization
    }

    const isColorWhite = (hex) => {
      if (!hex) return true;
      const cleanHex = hex.replace('#', '');
      let r = 1, g = 1, b = 1;
      if (cleanHex.length === 3) {
        r = parseInt(cleanHex[0], 16) / 15;
        g = parseInt(cleanHex[1], 16) / 15;
        b = parseInt(cleanHex[2], 16) / 15;
      } else if (cleanHex.length === 6) {
        r = parseInt(cleanHex.substring(0, 2), 16) / 255;
        g = parseInt(cleanHex.substring(2, 4), 16) / 255;
        b = parseInt(cleanHex.substring(4, 6), 16) / 255;
      }
      return r > 0.9 && g > 0.9 && b > 0.9;
    };

    const nextStates = {};
    meshList.forEach(m => {
      if (!meshStatesRef.current[m.id]) {
        let type = 'Body';
        if (m.display.includes('Neck')) type = 'Neck';
        else if (m.display.includes('Sleeve')) type = m.display.includes('R') ? 'R_Sleeve' : 'L_Sleeve';
        else if (m.display.includes('Front')) type = 'Front';
        else if (m.display.includes('Back')) type = 'Back';

        const colorKey = design.mapping[type] || design.mapping['Body'] || 'primary';
        const config = initialColors[colorKey];

        const isWhite = isColorWhite(m.originalColor);

        nextStates[m.id] = {
          color: (!isWhite) ? (m.originalColor || '#ffffff') : (config.color === '#ffffff' ? (m.originalColor || '#ffffff') : config.color),
          isGrad: !isWhite ? false : config.isGrad,
          grad1: !isWhite ? (m.originalColor || '#ffffff') : config.color2,
          grad2: (!isWhite) ? (m.originalColor || '#ffffff') : (config.color === '#ffffff' ? (m.originalColor || '#ffffff') : config.color),
          pColor: '#ffffff',
          pUrl: null,
          fabricTexture: 'none'
        };
      }
    });

    if (Object.keys(nextStates).length > 0) {
      dispatch(updateMeshStates(nextStates));
    }
  };



  const confirmSave = () => {
    if (!saveName.trim()) {
      toast.error('Please enter a valid name for your design.');
      return;
    }

    setSaveModalOpen(false);
    const toastId = toast.loading('Saving custom design to your profile...')

    dispatch(saveDesign({
      name: saveName.trim(),
      model_name: design.name || 'jersey',
      design_data: { meshStates, decals, globalPattern, materialFinish, lightingPreset, modelUrl: design.modelUrl, layers_metadata: design.layers_metadata },
      thumbnail: design.thumbnail || 'https://images.unsplash.com/photo-1551280857-2b9bbe52acf4?w=600&h=400&fit=crop&q=80'
    }))
      .unwrap()
      .then((data) => {
        toast.success(data.message || 'Design saved successfully!', { id: toastId, icon: '🎨' })
      })
      .catch((err) => {
        toast.error(err || 'Failed to save design. Please try again.', { id: toastId })
      })
  };

  const handleCheckoutClick = () => {
    setCheckoutModalOpen(true);
  };

  const confirmCheckout = async (e) => {
    if (e) e.preventDefault();

    if (!billingName.trim()) {
      toast.error('Please enter your full name.');
      return;
    }
    if (!billingEmail.trim()) {
      toast.error('Please enter your email address.');
      return;
    }
    if (!shippingAddress.trim()) {
      toast.error('Please enter your shipping address.');
      return;
    }
    if (!contactPhone.trim()) {
      toast.error('Please enter your phone number.');
      return;
    }
    if (!city.trim()) {
      toast.error('Please enter your city.');
      return;
    }
    if (!zipCode.trim()) {
      toast.error('Please enter your ZIP / postal code.');
      return;
    }

    setIsSubmitCheckingOut(true);
    const toastId = toast.loading('Capturing 4-angle production snapshots...');

    const snapshots = { front: '', back: '', left: '', right: '', top: '' };
    const apiBase = (import.meta.env.VITE_API_BASE || '').trim();
    const uploadEndpoint = apiBase ? `${apiBase}/api/admin/upload` : '/api/admin/upload';
    const endpoint = apiBase ? `${apiBase}/api/inquiry/custom` : '/api/inquiry/custom';

    const captureAngle = async (cameraAngleEvent) => {
      window.dispatchEvent(new CustomEvent('eay:setCameraAngle', { detail: cameraAngleEvent }));
      await new Promise(r => setTimeout(r, 120));
      const canvas = document.querySelector('canvas');
      if (!canvas) return '';
      try {
        const thumbCanvas = document.createElement('canvas');
        thumbCanvas.width = 400;
        thumbCanvas.height = 400;
        const ctx = thumbCanvas.getContext('2d');
        ctx.drawImage(canvas, 0, 0, 400, 400);
        return thumbCanvas.toDataURL('image/jpeg', 0.85);
      } catch (err) {
        console.warn(`Snapshot capture failed for ${cameraAngleEvent}:`, err);
      }
      return '';
    };

    try {
      snapshots.front = await captureAngle('front');
      snapshots.back = await captureAngle('back');
      snapshots.left = await captureAngle('left');
      snapshots.right = await captureAngle('right');
      snapshots.top = await captureAngle('top');
      window.dispatchEvent(new CustomEvent('eay:setCameraAngle', { detail: 'front' }));
    } catch (err) {
      console.warn('Multi-angle snapshot error:', err);
    }

    toast.loading('Submitting inquiry...', { id: toastId });

    const rosterText = roster.map((r, i) => `${i + 1}. Name: "${r.name || '(Blank)'}", Number: "${r.number || '(Blank)'}", Size: "${r.size}"`).join('\n');
    const message = `Custom 3D jersey inquiry submitted via customizer.\n\n` +
      `Model: ${design.name || 'Custom Jersey'}\n` +
      `Shipping Address: ${shippingAddress}, ${city}, ${zipCode}, ${country}\n\n` +
      `Roster:\n${rosterText}`;

    const payload = {
      name: billingName,
      email: billingEmail,
      phone: contactPhone,
      company: country,
      message: message,
      fileUrl: snapshots.front || design.thumbnail || '',
      modelUrl: design.modelUrl || '',
      layersMetadata: JSON.stringify(design.layers_metadata || {}),
      designConfig: JSON.stringify({ meshStates, decals, globalPattern, materialFinish, lightingPreset, snapshots })
    };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      setIsSubmitCheckingOut(false);
      if (res.ok && (data._id || data.message || data.success)) {
        toast.success('Order submitted! We will contact you for pricing.', { id: toastId, icon: '🎉' });
        setOrderSuccess(true);
      } else {
        toast.error(data.error || 'Failed to submit inquiry.', { id: toastId });
      }
    } catch (err) {
      setIsSubmitCheckingOut(false);
      toast.error('Submission error. Please check network connection.', { id: toastId });
    }
  };

  if (!design) return <div className="p-20 text-center font-bold text-gray-400">Loading Design...</div>;

  return (
    <div className="flex-1 flex flex-col md:flex-row bg-white relative h-full min-h-0 overflow-hidden" style={{ minWidth: 0 }}>
      {/* ── Left Viewport & Component Dock ── */}
      <div className="flex-1 min-h-[350px] md:min-h-0 min-w-0 overflow-hidden">
        <LeftPanel
          modelUrl={design.modelUrl}
          layersMetadata={design.layers_metadata || {}}
          meshes={meshes}
          activeMesh={activeMesh}
          setActiveMesh={(id) => dispatch(setActiveMesh(id))}
          meshStates={meshStates}
          onMeshesDetected={handleMeshesDetected}
          decals={decals}
          selectedDecalId={selectedDecalId}
          setSelectedDecalId={(id) => dispatch(setSelectedDecalId(id))}
          updateDecal={(id, updates) => dispatch(updateDecal({ id, updates }))}
          removeDecal={(id) => dispatch(removeDecal(id))}
          globalPattern={globalPattern}
          materialFinish={materialFinish}
          lightingPreset={lightingPreset}
          mouseFollow={mouseFollow}
          isHUDVisible={isHUDVisible}
        />
      </div>

      {/* ── Right Panel (Workstation) ── */}
      <div className={`transition-all duration-500 ease-in-out border-l border-gray-100 bg-white flex-shrink-0
        ${isHUDVisible ? 'w-full md:w-[420px] flex-1 md:flex-none md:h-full opacity-100' : 'w-0 h-0 opacity-0 translate-x-full overflow-hidden border-none'}`}>
        <RightPanel
          meshes={meshes}
          activeMesh={activeMesh}
          setActiveMesh={(id) => dispatch(setActiveMesh(id))}
          layersMetadata={design.layers_metadata || {}}
          meshStates={meshStates}
          updateMeshStates={(states) => dispatch(updateMeshStates(states))}
          updateMeshProp={(meshId, prop, val) => dispatch(updateMeshProp({ meshId, prop, val }))}
          decals={decals}
          selectedDecalId={selectedDecalId}
          setSelectedDecalId={(id) => dispatch(setSelectedDecalId(id))}
          addDecal={(type, text, imageUrl, meshId, color) => dispatch(addDecal({ type, text, imageUrl, meshId: meshId || activeMesh, color }))}
          updateDecal={(id, updates) => dispatch(updateDecal({ id, updates }))}
          removeDecal={(id) => dispatch(removeDecal(id))}
          globalPattern={globalPattern}
          setGlobalPattern={(val) => dispatch(setGlobalPattern(val))}
          lightingPreset={lightingPreset}
          setLightingPreset={(val) => dispatch(setLightingPreset(val))}
          materialFinish={materialFinish}
          setMaterialFinish={(val) => dispatch(setMaterialFinish(val))}
          mouseFollow={mouseFollow}
          setMouseFollow={(val) => dispatch(setMouseFollow(val))}
          roster={roster}
          setRoster={(val) => dispatch(setRoster(val))}
          onCheckout={handleCheckoutClick}
          defaultPatterns={defaultPatterns}
          defaultLogos={defaultLogos}
        />
      </div>

      {/* Cinematic View Helper */}
      {!isHUDVisible && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none fade-up flex flex-col items-center">
          <span className="text-[8px] font-semibold text-gray-400 uppercase tracking-[1em] mb-1">Cinematic Mode</span>
          <div className="w-12 h-0.5 bg-indigo-600/30" />
        </div>
      )}

      {/* Save Modal */}
      <AnimatePresence>
        {saveModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSaveModalOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-[201] overflow-hidden"
            >
              <div className="p-7">
                <h3 className="text-xl font-bold text-slate-800 mb-2 tracking-tight">Save Custom Design</h3>
                <p className="text-sm text-slate-500 mb-6 font-medium">Enter a name for your design so you can easily find it later in your portfolio.</p>

                <input
                  type="text"
                  value={saveName}
                  onChange={(e) => setSaveName(e.target.value)}
                  placeholder="e.g. Home Kit 2026"
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all mb-8 font-medium text-slate-800"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') confirmSave();
                    if (e.key === 'Escape') setSaveModalOpen(false);
                  }}
                />

                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => setSaveModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl font-semibold text-slate-500 hover:bg-gray-100 hover:text-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmSave}
                    className="px-6 py-2.5 rounded-xl font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-zinc-200 hover:shadow-xl transition-all"
                  >
                    Save to Portfolio
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Roster Checkout Modal */}
      <AnimatePresence>
        {checkoutModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSubmitCheckingOut && setCheckoutModalOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg bg-white rounded-2xl shadow-2xl z-[201] overflow-hidden"
              >
                {orderSuccess ? (
                  /* ── WhatsApp Success Screen ── */
                  <div className="flex flex-col items-center justify-center py-12 px-8 text-center">
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-5 shadow-lg">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-green-600">
                        <path d="M20.52 3.48A11.86 11.86 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.59 5.97L0 24l6.22-1.56A11.95 11.95 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.24-1.44l-.37-.22-3.87.97.99-3.76-.24-.39A9.94 9.94 0 0 1 2 12C2 6.48 6.48 2 12 2c2.67 0 5.18 1.04 7.07 2.93A9.94 9.94 0 0 1 22 12c0 5.52-4.48 10-10 10zm5.44-7.4c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.21 5.1 4.5.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-800 mb-2">Order Placed! 🎉</h3>
                    <p className="text-sm text-slate-500 font-medium mb-6">Your inquiry has been submitted. Our team will contact you shortly to finalize pricing.</p>

                    <div className="w-full bg-green-50 border border-green-200 rounded-2xl p-5 mb-6">
                      <p className="text-[10px] font-black text-green-700 uppercase tracking-widest mb-1">Contact us on WhatsApp</p>
                      <a
                        href="https://wa.me/923039200750"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl font-extrabold text-green-700 hover:text-green-900 transition-colors"
                      >
                        +92 303 9200750
                      </a>
                      <p className="text-[9px] text-green-600 font-semibold mt-2 uppercase tracking-wider">Mon – Sat &bull; 9 AM – 7 PM (PKT)</p>
                    </div>

                    <a
                      href="https://wa.me/923039200750"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500 text-white font-bold hover:bg-green-600 shadow-lg transition-all mb-3 w-full justify-center"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.52 3.48A11.86 11.86 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.59 5.97L0 24l6.22-1.56A11.95 11.95 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.24-1.44l-.37-.22-3.87.97.99-3.76-.24-.39A9.94 9.94 0 0 1 2 12C2 6.48 6.48 2 12 2c2.67 0 5.18 1.04 7.07 2.93A9.94 9.94 0 0 1 22 12c0 5.52-4.48 10-10 10zm5.44-7.4c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.21 5.1 4.5.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" /></svg>
                      Chat on WhatsApp
                    </a>
                    <button
                      onClick={() => { setCheckoutModalOpen(false); setOrderSuccess(false); dispatch(setRoster([{ id: Date.now(), name: '', number: '', size: 'L' }])); }}
                      className="text-sm text-slate-400 hover:text-slate-600 transition-colors font-medium"
                    >
                      Close & Continue Designing
                    </button>
                  </div>
                ) : (
                  <form onSubmit={confirmCheckout} className="flex flex-col max-h-[85vh]">
                    {/* Header */}
                    <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-slate-800 tracking-tight">Roster Checkout</h3>
                        <p className="text-xs text-slate-400 mt-1 font-medium">Complete your wholesale / customized order details below.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCheckoutModalOpen(false)}
                        className="text-gray-400 hover:text-slate-600 transition-colors"
                        disabled={isSubmitCheckingOut}
                      >
                        ✕
                      </button>
                    </div>

                    {/* Body */}
                    <div className="p-6 overflow-y-auto space-y-5 flex-1 custom-scrollbar">

                      {/* Order Summary */}
                      <div className="bg-slate-50 border border-gray-100 p-4 rounded-xl flex items-center gap-3">
                        <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                          <img
                            src={design.thumbnail || 'https://images.unsplash.com/photo-1551280857-2b9bbe52acf4?w=600&h=400&fit=crop&q=80'}
                            alt="Custom design"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">{design.name || 'Custom Jersey'}</h4>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{roster.length} {roster.length === 1 ? 'jersey' : 'jerseys'} in roster</p>
                          <p className="text-[9px] text-amber-600 font-bold uppercase tracking-wider mt-1">💬 Pricing will be discussed via WhatsApp</p>
                        </div>
                      </div>

                      {/* Full Name & Email */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="checkout-name" className="text-[10px] font-black text-slate-500 uppercase tracking-wider">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="checkout-name"
                            type="text"
                            required
                            placeholder="John Doe"
                            value={billingName}
                            onChange={(e) => setBillingName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all font-medium text-slate-800 text-sm"
                            disabled={isSubmitCheckingOut}
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="checkout-email" className="text-[10px] font-black text-slate-500 uppercase tracking-wider">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="checkout-email"
                            type="email"
                            required
                            placeholder="you@example.com"
                            value={billingEmail}
                            onChange={(e) => setBillingEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all font-medium text-slate-800 text-sm"
                            disabled={isSubmitCheckingOut}
                          />
                        </div>
                      </div>

                      {/* Delivery Address */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="checkout-address" className="text-[10px] font-black text-slate-500 uppercase tracking-wider">
                          Shipping Address <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="checkout-address"
                          rows="2.5"
                          required
                          maxLength={350}
                          placeholder="Street address, apartment, suite..."
                          value={shippingAddress}
                          onChange={(e) => setShippingAddress(e.target.value.slice(0, 350))}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all font-medium text-slate-800 text-sm"
                          disabled={isSubmitCheckingOut}
                        />
                      </div>

                      {/* Phone Number */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="checkout-phone" className="text-[10px] font-black text-slate-500 uppercase tracking-wider">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="checkout-phone"
                          type="tel"
                          required
                          placeholder="e.g. +1 555-123-4567"
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all font-medium text-slate-800 text-sm"
                          disabled={isSubmitCheckingOut}
                        />
                      </div>

                      {/* City, ZIP, Country */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="checkout-city" className="text-[10px] font-black text-slate-500 uppercase tracking-wider">
                            City <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="checkout-city"
                            type="text"
                            required
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all font-medium text-slate-800 text-sm"
                            disabled={isSubmitCheckingOut}
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="checkout-zip" className="text-[10px] font-black text-slate-500 uppercase tracking-wider">
                            ZIP Code <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="checkout-zip"
                            type="text"
                            required
                            placeholder="10001"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all font-medium text-slate-800 text-sm"
                            disabled={isSubmitCheckingOut}
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="checkout-country" className="text-[10px] font-black text-slate-500 uppercase tracking-wider">
                            Country
                          </label>
                          <input
                            id="checkout-country"
                            type="text"
                            required
                            placeholder="USA"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all font-medium text-slate-800 text-sm"
                            disabled={isSubmitCheckingOut}
                          />
                        </div>
                      </div>

                      {/* Note about pricing */}
                      <div className="bg-amber-50/60 border border-amber-100 p-4 rounded-xl flex items-start gap-3">
                        <span className="text-lg mt-0.5">💬</span>
                        <div>
                          <h4 className="text-[10px] font-bold text-amber-900 uppercase tracking-wide">Pricing via WhatsApp</h4>
                          <p className="text-[9px] text-amber-700 font-medium mt-0.5">After placing your order, our team will reach out to you on WhatsApp to discuss final pricing based on your custom design and roster size.</p>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3 justify-end">
                      <button
                        type="button"
                        onClick={() => setCheckoutModalOpen(false)}
                        className="px-5 py-2.5 rounded-xl font-semibold text-slate-500 hover:bg-gray-200 transition-colors"
                        disabled={isSubmitCheckingOut}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-zinc-200 hover:shadow-xl transition-all disabled:opacity-50"
                        disabled={isSubmitCheckingOut}
                      >
                        {isSubmitCheckingOut ? 'Processing...' : 'Place Order'}
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
});

export default Builder;
