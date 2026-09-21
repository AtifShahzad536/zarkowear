import React, { useEffect, useRef, useState, useCallback } from 'react';
import { imageUrl } from '../services/api';
import { FaPlay, FaPause, FaSyncAlt, FaCube, FaArrowsAlt } from 'react-icons/fa';

/**
 * CategoryHeroVideo Component
 * High-performance 3D Scroll-Controlled WebM Video Player with 3D Tilt Parallax
 */
const CategoryHeroVideo = ({
  videoUrl = '',
  featuredImage = '',
  sportName = 'Sportswear',
  slug = '',
  badgeText = '',
  className = '',
}) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const rafRef = useRef(null);

  const [hasVideo, setHasVideo] = useState(Boolean(videoUrl));
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAutoSpin, setIsAutoSpin] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartProgress, setDragStartProgress] = useState(0);

  // 3D Parallax Tilt state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [lightPos, setLightPos] = useState({ x: 50, y: 50 });

  // Update hasVideo whenever prop changes
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
    if (!video || !video.duration || isNaN(video.duration)) {
      rafRef.current = requestAnimationFrame(updateVideoFrame);
      return;
    }

    if (isAutoSpin) {
      // Auto-spin mode: continuously advance time smoothly
      currentProgressRef.current = (currentProgressRef.current + 0.003) % 1;
      targetProgressRef.current = currentProgressRef.current;
      video.currentTime = currentProgressRef.current * video.duration;
      setCurrentTime(video.currentTime);
      setScrollProgress(currentProgressRef.current);
    } else {
      // Scroll / Drag scrubbing mode: lerp towards target progress
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.001) {
        currentProgressRef.current += diff * 0.15; // Smooth damping
        const targetTime = Math.max(0, Math.min(video.duration, currentProgressRef.current * video.duration));
        
        // Update video currentTime safely
        if (Math.abs(video.currentTime - targetTime) > 0.02) {
          try {
            video.currentTime = targetTime;
          } catch (e) {
            // Ignored if browser throttles rapid seeks
          }
        }
        setCurrentTime(video.currentTime);
        setScrollProgress(currentProgressRef.current);
      }
    }

    rafRef.current = requestAnimationFrame(updateVideoFrame);
  }, [isAutoSpin]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(updateVideoFrame);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateVideoFrame]);

  // Page Scroll listener to scrub video
  useEffect(() => {
    if (isAutoSpin) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      // Calculate progress relative to viewport visibility (0 when entering bottom, 1 when scrolling past)
      const totalScrollDistance = rect.height + windowHeight * 0.8;
      const currentScrollOffset = windowHeight - rect.top;
      const rawProgress = Math.max(0, Math.min(1, currentScrollOffset / totalScrollDistance));

      targetProgressRef.current = rawProgress;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial computation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAutoSpin]);

  // Handle local Wheel scrub over the video box
  const handleWheel = (e) => {
    if (isAutoSpin || !hasVideo) return;
    // Allow scrubbing via mouse wheel when hovering directly over the 3D viewport
    const delta = e.deltaY * 0.0008;
    const newProgress = Math.max(0, Math.min(1, targetProgressRef.current + delta));
    targetProgressRef.current = newProgress;
  };

  // Mouse Drag Scrub Handlers
  const handleMouseDown = (e) => {
    if (isAutoSpin || !hasVideo) return;
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragStartProgress(targetProgressRef.current);
  };

  const handleMouseMove = (e) => {
    // 3D Parallax Tilt Calculation
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setTilt({
        x: (x - 0.5) * 16, // max 8 deg tilt
        y: (0.5 - y) * 16
      });
      setLightPos({ x: x * 100, y: y * 100 });
    }

    // Drag scrub
    if (isDragging && hasVideo) {
      const deltaX = e.clientX - dragStartX;
      const progressDelta = deltaX / 300; // 300px drag = full rotation
      let newProgress = (dragStartProgress + progressDelta) % 1;
      if (newProgress < 0) newProgress += 1;
      targetProgressRef.current = newProgress;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    // Smoothly reset 3D tilt back to level
    setTilt({ x: 0, y: 0 });
    setLightPos({ x: 50, y: 50 });
  };

  // Touch Drag Support for Mobile Devices
  const handleTouchStart = (e) => {
    if (isAutoSpin || !hasVideo) return;
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStartX(touch.clientX);
    setDragStartProgress(targetProgressRef.current);
  };

  const handleTouchMove = (e) => {
    if (isDragging && hasVideo && e.touches[0]) {
      const touch = e.touches[0];
      const deltaX = touch.clientX - dragStartX;
      const progressDelta = deltaX / 260;
      let newProgress = (dragStartProgress + progressDelta) % 1;
      if (newProgress < 0) newProgress += 1;
      targetProgressRef.current = newProgress;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const fallbackImageSrc = imageUrl(featuredImage || '/images/placeholder.jpg', { width: 1200, quality: 'auto:best' });

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`relative w-full ${
        className || 'h-[480px] sm:h-[540px] lg:h-[600px]'
      } rounded-3xl bg-[#0d1021]/80 backdrop-blur-xl overflow-hidden shadow-2xl border border-white/10 select-none group transition-all duration-300 ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      style={{
        perspective: '1200px',
      }}
    >
      {/* 3D Tilted Inner Container */}
      <div
        className="w-full h-full relative transition-transform duration-150 ease-out flex items-center justify-center"
        style={{
          transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale3d(1.02, 1.02, 1.02)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Dynamic Specular Studio Lighting Sheen */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-60 z-10"
          style={{
            background: `radial-gradient(circle 350px at ${lightPos.x}% ${lightPos.y}%, rgba(99, 102, 241, 0.25), rgba(168, 85, 247, 0.1) 40%, transparent 80%)`,
          }}
        />

        {/* Ambient Dark Tech Studio Floor Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35" />

        {/* 3D WebM Video Layer */}
        {hasVideo ? (
          <video
            ref={videoRef}
            src={imageUrl(videoUrl)}
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={() => {
              setVideoLoaded(true);
              if (videoRef.current) {
                setVideoDuration(videoRef.current.duration || 0);
              }
            }}
            className={`relative z-20 w-full h-full object-contain pointer-events-none transition-opacity duration-700 ${
              videoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : null}

        {/* Fallback 3D Uniform Image (shown if no video or during buffer) */}
        <div
          className={`absolute inset-0 flex items-center justify-center p-8 transition-opacity duration-700 z-15 ${
            hasVideo && videoLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <img
            src={fallbackImageSrc}
            alt={`${sportName} Custom Uniform Kit 3D`}
            className="max-h-full max-w-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)] transform transition-transform duration-500 group-hover:scale-105"
            loading="eager"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = imageUrl('/images/placeholder.jpg');
            }}
          />
        </div>

        {/* Top Badges Overlay */}
        <div className="absolute top-5 left-5 right-5 z-30 flex items-center justify-between pointer-events-none">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/90 border border-white/10 px-3.5 py-1.5 text-xs font-bold text-white uppercase tracking-wider backdrop-blur-md shadow-lg">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400">{badgeText || `${sportName} 3D Showcase`}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600/80 border border-indigo-400/30 px-3 py-1 text-[11px] font-extrabold text-white tracking-wide backdrop-blur-md shadow-md">
            <FaCube className="text-indigo-200 text-xs animate-pulse" />
            <span>3D Interactive</span>
          </div>
        </div>

        {/* Bottom Interactive Control & Scrub Indicator Bar */}
        <div className="absolute bottom-4 inset-x-4 z-30 flex flex-col gap-2 pointer-events-auto">
          {/* Real-time Rotation Scrub Progress Line */}
          <div className="w-full bg-white/10 backdrop-blur-md h-1.5 rounded-full overflow-hidden border border-white/5 relative">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 transition-all duration-75 ease-out rounded-full"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-300 bg-slate-900/80 backdrop-blur-md py-2 px-3.5 rounded-2xl border border-white/10 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                <FaArrowsAlt className="text-indigo-400 text-[10px]" />
                <span className="hidden sm:inline">Scroll page or drag to rotate</span>
                <span className="sm:hidden">Drag 360°</span>
              </span>
              <span className="text-[10px] font-mono text-indigo-400 font-bold bg-indigo-950/60 px-2 py-0.5 rounded-md border border-indigo-500/20">
                {Math.round(scrollProgress * 360)}°
              </span>
            </div>

            {/* Auto-Spin Toggle Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsAutoSpin(!isAutoSpin);
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[11px] font-bold transition-all shadow-sm ${
                isAutoSpin
                  ? 'bg-indigo-600 text-white border border-indigo-400'
                  : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10'
              }`}
            >
              {isAutoSpin ? (
                <>
                  <FaPause className="text-[9px]" /> <span>Pause</span>
                </>
              ) : (
                <>
                  <FaSyncAlt className="text-[9px]" /> <span>360° Spin</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryHeroVideo;
