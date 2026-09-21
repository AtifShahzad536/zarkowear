import React, { useEffect, useRef, useState, useCallback } from 'react';
import { imageUrl } from '../services/api';

/**
 * CategoryHeroVideo Component
 * Clean, 100% Full-Width Cinematic 3D Background Video Hero
 * - Zero left/right padding (w-full object-cover)
 * - Ultra-smooth 60FPS scroll-responsive velocity & parallax motion
 * - Pure video stage without clutter
 */
const CategoryHeroVideo = ({
  videoUrl = '',
  featuredImage = '',
  sportName = 'Sportswear',
  slug = '',
}) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const rafRef = useRef(null);

  const [hasVideo, setHasVideo] = useState(Boolean(videoUrl));
  const [videoLoaded, setVideoLoaded] = useState(false);

  // 3D Parallax & Motion Physics state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [scrollYOffset, setScrollYOffset] = useState(0);

  // Velocity tracking for silky smooth acceleration on scroll
  const scrollVelocityRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const targetScaleRef = useRef(1);
  const currentScaleRef = useRef(1);

  useEffect(() => {
    setHasVideo(Boolean(videoUrl && videoUrl.trim()));
    setVideoLoaded(false);
  }, [videoUrl]);

  // Smooth 60FPS physics animation loop
  const updatePhysics = useCallback(() => {
    const video = videoRef.current;
    
    // Smooth scale lerp
    currentScaleRef.current += (targetScaleRef.current - currentScaleRef.current) * 0.1;

    // Decay scroll velocity smoothly
    scrollVelocityRef.current *= 0.92;

    if (video) {
      // Dynamic playbackRate based on scroll velocity (normal 1.0x -> max 2.5x during scroll)
      const targetRate = Math.min(3.0, Math.max(0.6, 1.0 + Math.abs(scrollVelocityRef.current) * 0.04));
      const currentRate = video.playbackRate || 1.0;
      video.playbackRate = currentRate + (targetRate - currentRate) * 0.15;

      if (video.paused && videoLoaded) {
        video.play().catch(() => {});
      }
    }

    rafRef.current = requestAnimationFrame(updatePhysics);
  }, [videoLoaded]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(updatePhysics);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updatePhysics]);

  // Window scroll listener for parallax & scroll velocity
  useEffect(() => {
    let lastTime = performance.now();

    const handleScroll = () => {
      if (!containerRef.current) return;
      const currentScrollY = window.scrollY || window.pageYOffset;
      const rect = containerRef.current.getBoundingClientRect();
      const currentTime = performance.now();
      const deltaTime = Math.max(1, currentTime - lastTime);

      // Parallax translateY when scrolling past hero
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        const offset = currentScrollY * 0.25;
        setScrollYOffset(offset);

        // Calculate scroll speed/velocity
        const deltaY = currentScrollY - lastScrollYRef.current;
        const speed = Math.abs(deltaY) / deltaTime;
        scrollVelocityRef.current = Math.min(25, scrollVelocityRef.current + speed * 12);
        
        // Slight dynamic zoom on rapid scroll
        targetScaleRef.current = 1.0 + Math.min(0.08, speed * 0.05);
      } else {
        targetScaleRef.current = 1.0;
      }

      lastScrollYRef.current = currentScrollY;
      lastTime = currentTime;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Interactive mouse move 3D tilt
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (x - 0.5) * 6,
      y: (0.5 - y) * 6,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    targetScaleRef.current = 1.0;
  };

  const fallbackImageSrc = imageUrl(featuredImage || '/images/placeholder.jpg', { width: 1920, quality: 'auto:best' });

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[82vh] sm:h-[88vh] lg:h-[94vh] min-h-[580px] bg-black text-white overflow-hidden select-none"
      style={{
        perspective: '1200px',
      }}
    >
      {/* 3D Tilted & Parallax Canvas Stage */}
      <div
        className="absolute inset-0 w-full h-full transition-transform duration-150 ease-out pointer-events-none"
        style={{
          transform: `translate3d(0, ${scrollYOffset}px, 0) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale3d(${currentScaleRef.current}, ${currentScaleRef.current}, 1)`,
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
        }}
      >
        {/* Full-bleed 3D Background Video */}
        {hasVideo ? (
          <video
            ref={videoRef}
            src={imageUrl(videoUrl)}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onLoadedData={() => {
              setVideoLoaded(true);
              if (videoRef.current) {
                videoRef.current.play().catch(() => {});
              }
            }}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              videoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : null}

        {/* Fallback 3D Uniform Image if no video is uploaded */}
        <div
          className={`absolute inset-0 w-full h-full flex items-center justify-center transition-opacity duration-700 ${
            hasVideo && videoLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <img
            src={fallbackImageSrc}
            alt={`${sportName} Custom 3D Showcase`}
            className="w-full h-full object-cover filter drop-shadow-2xl"
            loading="eager"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = imageUrl('/images/placeholder.jpg');
            }}
          />
        </div>

        {/* Subtle Bottom Vignette Gradient for smooth transition to page content */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default CategoryHeroVideo;
