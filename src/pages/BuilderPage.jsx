import React, { useEffect, useState, Suspense, lazy, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../features/builder/Navbar';
import toast from 'react-hot-toast';
import SeoHead from '../components/SeoHead';
import MaintenancePage from './MaintenancePage';

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
  const [builderEnabled, setBuilderEnabled] = useState(true);

  // Local transition state
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isBuilderView = !!id;

  const seoData = useMemo(() => {
    if (isBuilderView) {
      const designName = selectedDesign?.name ? selectedDesign.name.toUpperCase() : 'Sports Jersey';
      return {
        title: `Design Custom ${designName} Online | 3D Customizer USA | Zarko`,
        description: `Customize your ${designName} in real-time 3D with custom Pantone colors, vector team logos, and player numbers. Factory direct USA delivery with low MOQ.`,
        keywords: `design custom ${designName.toLowerCase()} usa, custom ${designName.toLowerCase()} 3d, 3d jersey builder, team jersey maker online, sublimation jersey customizer usa, zarko sportswear`,
        canonical: `https://www.zarkosportswear.com/builder/${id}`,
        openGraph: {
          'og:title': `Design Custom ${designName} Online | 3D Customizer USA | Zarko`,
          'og:description': `Fully personalize your ${designName} online in 360° 3D. Direct factory sublimation manufacturing and fast USA shipping.`,
          'og:type': 'website',
          'og:url': `https://www.zarkosportswear.com/builder/${id}`
        },
        jsonLd: {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebApplication",
              "@id": `https://www.zarkosportswear.com/builder/${id}#app`,
              "name": `Zarko 3D Customizer - ${designName}`,
              "url": `https://www.zarkosportswear.com/builder/${id}`,
              "description": `Interactive real-time 3D customization tool for ${designName} with USA factory direct fulfillment.`,
              "applicationCategory": "DesignApplication",
              "operatingSystem": "All",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              }
            },
            {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.zarkosportswear.com/" },
                { "@type": "ListItem", "position": 2, "name": "3D Customizer", "item": "https://www.zarkosportswear.com/builder" },
                { "@type": "ListItem", "position": 3, "name": designName, "item": `https://www.zarkosportswear.com/builder/${id}` }
              ]
            }
          ]
        }
      };
    } else {
      return {
        title: '3D Custom Sports Jersey & Uniform Builder USA | Zarko Sportswear',
        description: 'Design custom sports jerseys & team uniforms online in real-time 3D. Full-dye sublimation, team colors, vector crests & fast factory-direct USA shipping.',
        keywords: '3d jersey builder, custom sports jerseys usa, 3d uniform builder usa, design sports jersey online 3d, custom team jersey maker with logo, custom soccer jerseys 3d, custom wrestling singlet builder, sublimation jersey creator, team kit designer usa, zarko sportswear builder',
        canonical: 'https://www.zarkosportswear.com/builder',
        openGraph: {
          'og:title': '3D Custom Sports Jersey & Uniform Builder USA | Zarko Sportswear',
          'og:description': 'Design custom sports jerseys & team uniforms in real-time with our 3D customizer. Full sublimation printing and express USA shipping.',
          'og:type': 'website',
          'og:url': 'https://www.zarkosportswear.com/builder'
        },
        jsonLd: {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebApplication",
              "@id": "https://www.zarkosportswear.com/builder#app",
              "name": "Zarko 3D Custom Sports Jersey & Uniform Builder",
              "url": "https://www.zarkosportswear.com/builder",
              "description": "Professional 3D sports apparel customization tool for USA athletic teams, schools, and clubs.",
              "applicationCategory": "DesignApplication",
              "operatingSystem": "All (Web Browser, iOS, Android, macOS, Windows)",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "184",
                "bestRating": "5",
                "worstRating": "1"
              },
              "featureList": [
                "Real-time 360 3D Rendering",
                "4K Full-Dye Sublimation Pre-Press",
                "Custom Pantone & Gradient Color Engine",
                "Vector Logo & Sponsor Placement",
                "Instant Team Roster Sizing & Numbering",
                "Direct Factory USA Fulfillment"
              ]
            },
            {
              "@type": "FAQPage",
              "@id": "https://www.zarkosportswear.com/builder#faq",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How does the 3D Custom Jersey Builder work?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our online 3D customizer allows you to pick base sportswear models, select solid or gradient colors, apply textures, and preview your uniforms 360-degrees in real-time before placing a factory direct order."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is the MOQ for custom team uniforms in 3D?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We offer low minimum order quantities starting at just 15 units per custom design with full sublimation printing and express USA shipping."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I add custom team logos and player rosters?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, you can upload your vector team crest, sponsor logos, and provide individual player names and numbers with zero extra setup fees."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How long does USA delivery take?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Production and international express air delivery to any US state takes approximately 10 to 14 business days from mockup approval."
                  }
                }
              ]
            },
            {
              "@type": "HowTo",
              "@id": "https://www.zarkosportswear.com/builder#howto",
              "name": "How to Design Custom Sports Uniforms in 3D",
              "step": [
                {
                  "@type": "HowToStep",
                  "position": 1,
                  "name": "Pick Base 3D Model",
                  "text": "Select from football, wrestling, basketball, baseball, cricket, or training apparel."
                },
                {
                  "@type": "HowToStep",
                  "position": 2,
                  "name": "Apply Colors & Gradients",
                  "text": "Choose custom primary, secondary, and accent colors with solid or gradient transitions."
                },
                {
                  "@type": "HowToStep",
                  "position": 3,
                  "name": "Preview in 360 3D",
                  "text": "Inspect your customized teamwear in high-fidelity 3D with dynamic lighting presets."
                },
                {
                  "@type": "HowToStep",
                  "position": 4,
                  "name": "Submit for Factory Production",
                  "text": "Provide team sizes and roster details for direct factory sublimation manufacturing."
                }
              ]
            },
            {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.zarkosportswear.com/" },
                { "@type": "ListItem", "position": 2, "name": "3D Customizer", "item": "https://www.zarkosportswear.com/builder" }
              ]
            }
          ]
        }
      };
    }
  }, [isBuilderView, selectedDesign, id]);

  // Fetch builder configuration (models, patterns, logos) from Express API
  useEffect(() => {
    const apiBase = (import.meta.env.VITE_API_BASE || '').trim();
    const endpoint = apiBase ? `${apiBase}/api/builder/config` : '/api/builder/config';
    const settingsEndpoint = apiBase ? `${apiBase}/api/home/settings` : '/api/home/settings';

    setIsLoadingConfig(true);
    Promise.all([
      fetch(endpoint).then(res => res.json()),
      fetch(settingsEndpoint).then(res => res.json())
    ])
      .then(([data, settings]) => {
        if (settings.customBuilderEnabled === false) {
          setBuilderEnabled(false);
          setIsLoadingConfig(false);
          return;
        }
        setBuilderEnabled(true);
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
  }, [navigate]);

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

  if (!builderEnabled) {
    return <MaintenancePage />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-[100dvh] flex flex-col bg-white ${isBuilderView ? 'h-[100dvh] overflow-hidden' : ''}`}
    >
      <SeoHead {...seoData} />
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
            <Navbar onBack={null} backTo={fromPage} isEditor={false} />
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
            <Navbar onBack={handleBackToLanding} backTo={fromPage} isEditor={true} />
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

