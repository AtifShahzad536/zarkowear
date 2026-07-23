import React, { useEffect, useState, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../features/builder/Navbar';
import toast from 'react-hot-toast';

// Lazy load builder engine
const Builder = lazy(() => import('../features/builder/Builder'));
const LandingPage = lazy(() => import('../features/builder/LandingPage'));

import { 
  setSelectedDesign, 
  setPrimaryColor, setPrimaryIsGrad, setPrimaryColor2,
  setSecondaryColor, setSecondaryIsGrad, setSecondaryColor2,
  setThirdColor, setThirdIsGrad, setThirdColor2,
  setGlobalPattern, setLightingPreset, setMaterialFinish, setMouseFollow,
  incrementRefreshKey, setFromPage
} from '../features/builder/builderSlice';
import { motion, AnimatePresence } from 'framer-motion';

export const BuilderPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedDesign, refreshKey, fromPage, ...builderState } = useSelector((state) => state.builder);
  
  const [config, setConfig] = useState({
    dynamicDesigns: [],
    defaultPatterns: [],
    defaultLogos: []
  });
  const [isLoadingConfig, setIsLoadingConfig] = useState(true);

  // Local transition state
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isBuilderView = !!id;

  // Fetch builder configuration (models, patterns, logos) from Express API
  useEffect(() => {
    const apiBase = (import.meta.env.VITE_API_BASE || '').trim();
    const endpoint = apiBase ? `${apiBase}/api/builder/config` : '/api/builder/config';

    setIsLoadingConfig(true);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        setConfig({
          dynamicDesigns: data.dynamicDesigns || [],
          defaultPatterns: data.defaultPatterns || [],
          defaultLogos: data.defaultLogos || []
        });
        setIsLoadingConfig(false);
      })
      .catch(err => {
        console.error('Failed to load builder configuration:', err);
        toast.error('Failed to load 3D Customizer configuration.');
        setIsLoadingConfig(false);
      });
  }, []);

  // Set default back URL
  useEffect(() => {
    dispatch(setFromPage('/custom'));
  }, [dispatch]);

  // Handle Global Reset for Colors
  useEffect(() => {
    const handleResetAllColors = () => {
      dispatch(setPrimaryColor('#ffffff'));
      dispatch(setPrimaryIsGrad(false));
      dispatch(setPrimaryColor2('#ffffff'));
      dispatch(setSecondaryColor('#ffffff'));
      dispatch(setSecondaryIsGrad(false));
      dispatch(setSecondaryColor2('#ffffff'));
      dispatch(setThirdColor('#ffffff'));
      dispatch(setThirdIsGrad(false));
      dispatch(setThirdColor2('#ffffff'));
    };
    window.addEventListener('eay:resetAll', handleResetAllColors);
    return () => window.removeEventListener('eay:resetAll', handleResetAllColors);
  }, [dispatch]);

  // Load the correct design when ID changes
  useEffect(() => {
    if (id && config.dynamicDesigns.length > 0) {
      const decodedId = decodeURIComponent(id);
      const design = config.dynamicDesigns.find(d => d.id === decodedId || d.name.toUpperCase() === decodedId.toUpperCase());
      if (design) {
        dispatch(setSelectedDesign(design));
      }
    }
  }, [id, config.dynamicDesigns, dispatch]);

  const handleSelectDesign = (design) => {
    const categoryName = design.name.split(' / ')[0] || 'All';
    navigate(`/builder/models?category=${encodeURIComponent(categoryName)}`);
  };

  const handleBackToLanding = () => {
    setIsTransitioning(true);
    dispatch(incrementRefreshKey());
    setTimeout(() => {
      setIsTransitioning(false);
      if (window.history.length > 1) {
        window.history.back();
      } else {
        navigate('/builder/models');
      }
    }, 200);
  };

  if (isLoadingConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Loading customizer configs...</span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-[100dvh] flex flex-col bg-white ${isBuilderView ? 'h-[100dvh] overflow-hidden' : ''}`}
    >
      <AnimatePresence mode="wait">

        {/* ── GPU Clearing Transition Spinner ── */}
        {isTransitioning && (
          <motion.div
            key="transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center bg-white py-40"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Clearing GPU Context...</span>
            </div>
          </motion.div>
        )}

        {/* ── Landing Page (/builder) ── */}
        {!isTransitioning && !isBuilderView && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col"
          >
            <Navbar onBack={null} backTo={fromPage} />
            <Suspense fallback={<div className="flex-1 flex items-center justify-center text-slate-400">Loading Designs...</div>}>
              <LandingPage
                availableDesigns={config.dynamicDesigns}
                pagination={null}
                {...builderState}
                setPrimaryColor={(val) => dispatch(setPrimaryColor(val))}
                setPrimaryIsGrad={(val) => dispatch(setPrimaryIsGrad(val))}
                setPrimaryColor2={(val) => dispatch(setPrimaryColor2(val))}
                setSecondaryColor={(val) => dispatch(setSecondaryColor(val))}
                setSecondaryIsGrad={(val) => dispatch(setSecondaryIsGrad(val))}
                setSecondaryColor2={(val) => dispatch(setSecondaryColor2(val))}
                setThirdColor={(val) => dispatch(setThirdColor(val))}
                setThirdIsGrad={(val) => dispatch(setThirdIsGrad(val))}
                setThirdColor2={(val) => dispatch(setThirdColor2(val))}
                setGlobalPattern={(val) => dispatch(setGlobalPattern(val))}
                setLightingPreset={(val) => dispatch(setLightingPreset(val))}
                setMaterialFinish={(val) => dispatch(setMaterialFinish(val))}
                setMouseFollow={(val) => dispatch(setMouseFollow(val))}
                onSelectDesign={handleSelectDesign}
              />
            </Suspense>
          </motion.div>
        )}

        {/* ── 3D Builder (/builder/:id) ── */}
        {!isTransitioning && isBuilderView && (
          <motion.div
            key={`builder-${refreshKey}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col h-full min-h-0 overflow-hidden"
          >
            <Navbar onBack={handleBackToLanding} backTo={fromPage} />
            <div className="flex-1 overflow-hidden">
              <Suspense fallback={
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-4">
                  <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  Loading 3D Engine...
                </div>
              }>
                <Builder defaultPatterns={config.defaultPatterns} defaultLogos={config.defaultLogos} />
              </Suspense>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </motion.div>
  );
};

export default BuilderPage;
