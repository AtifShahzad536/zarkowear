import React, { useEffect, useRef, useState, useCallback } from 'react';
import { imageUrl } from '../services/api';

/**
 * CategoryHeroVideo Component
 * Clean, Full-Width Cinematic 3D Background Video Hero that syncs with mouse scrolling
 */
const CategoryHeroVideo = ({
  videoUrl = '',
  featuredImage = '',
  sportName = 'Sportswear',
  slug = '',
  title = '',
}) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const rafRef = useRef(null);

  const [hasVideo, setHasVideo] = useState(Boolean(videoUrl));
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // 3D Parallax Tilt state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [lightPos, setLightPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    setHasVideo(Boolean(videoUrl && videoUrl.trim()));
    setVideoLoaded(false);
  }, [videoUrl]);

  // Target progress for smooth lerp scrubbing
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);

  // Synchronize video currentTime with smooth lerp
  const updateVideoFrame = useCallback(() => {
    const video = videoRef.current;
    if (video && video.duration && !isNaN(video.duration)) {
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0008) {
        currentProgressRef.current += diff * 0.18; // Smooth physics damping
        const targetTime = Math.max(0, Math.min(video.duration, currentProgressRef.current * video.duration));
        
        if (Math.abs(video.currentTime - targetTime) > 0.02) {
          try {
            video.currentTime = targetTime;
          } catch (e) {}
        }
        setScrollProgress(currentProgressRef.current);
      }
    }

    rafRef.current = requestAnimationFrame(updateVideoFrame);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(updateVideoFrame);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateVideoFrame]);

  // Page Scroll listener to scrub video
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      // Calculate progress relative to hero scroll (0 at top, 1 as you scroll through hero)
      const totalScrollDistance = rect.height + windowHeight * 0.4;
      const currentScrollOffset = windowHeight - rect.top;
      const rawProgress = Math.max(0, Math.min(1, currentScrollOffset / totalScrollDistance));

      targetProgressRef.current = rawProgress;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse wheel scroll acceleration when over hero
  const handleWheel = (e) => {
    if (!hasVideo) return;
    const delta = e.deltaY * 0.0006;
    const newProgress = Math.max(0, Math.min(1, targetProgressRef.current + delta));
    targetProgressRef.current = newProgress;
  };

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setTilt({
        x: (x - 0.5) * 10,
        y: (0.5 - y) * 10
      });
      setLightPos({ x: x * 100, y: y * 100 });
    }
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setLightPos({ x: 50, y: 50 });
  };

  const fallbackImageSrc = imageUrl(featuredImage || '/images/placeholder.jpg', { width: 1400, quality: 'auto:best' });

  return (
    <section
      ref={containerRef}
      onWheel={handleWheel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[75vh] sm:h-[82vh] lg:h-[88vh] bg-[#0A0C16] text-white overflow-hidden border-b border-white/10 select-none flex items-center justify-center"
      style={{
        perspective: '1200px',
      }}
    >
      {/* 3D Tilted Inner Stage */}
      <div
        className="absolute inset-0 w-full h-full transition-transform duration-200 ease-out flex items-center justify-center pointer-events-none"
        style={{
          transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale3d(1.02, 1.02, 1.02)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Dynamic Studio Ambient Spotlight Glows */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-60 z-10"
          style={{
            background: `radial-gradient(circle 600px at ${lightPos.x}% ${lightPos.y}%, rgba(99, 102, 241, 0.22), rgba(168, 85, 247, 0.08) 50%, transparent 80%)`,
          }}
        />

        {/* Ambient Dark Studio Floor Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:36px_36px] opacity-20 pointer-events-none" />

        {/* 3D WebM / MP4 Full Video Layer (Scroll-Controlled) */}
        {hasVideo ? (
          <video
            ref={videoRef}
            src={imageUrl(videoUrl)}
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={() => {
              setVideoLoaded(true);
            }}
            className={`relative z-20 w-full h-full object-contain pointer-events-none transition-opacity duration-700 ${
              videoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : null}

        {/* Fallback 3D Uniform Image (shown if no video or during buffer) */}
        <div
          className={`absolute inset-0 flex items-center justify-center p-6 transition-opacity duration-700 z-15 ${
            hasVideo && videoLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <img
            src={fallbackImageSrc}
            alt={`${sportName} Custom Uniform 3D`}
            className="max-h-[85%] max-w-[90%] object-contain filter drop-shadow-[0_35px_50px_rgba(0,0,0,0.85)] transform transition-transform duration-500"
            loading="eager"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = imageUrl('/images/placeholder.jpg');
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default CategoryHeroVideo;
