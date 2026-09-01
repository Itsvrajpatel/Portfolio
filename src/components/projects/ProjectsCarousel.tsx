"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image, { StaticImageData } from "next/image";

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  year: string;
  stack: string[];
  metrics: string;
  image: StaticImageData;
  link?: string;
  github?: string;
}

interface ProjectsCarouselProps {
  projects: ProjectItem[];
  activeIndex: number;
  onSelectProject: (index: number) => void;
}

const mono = "var(--font-jetbrains-mono, 'JetBrains Mono', ui-monospace, monospace)";

export default function ProjectsCarousel({
  projects,
  activeIndex,
  onSelectProject,
}: ProjectsCarouselProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const numProjects = projects.length;

  const handlePrev = useCallback(() => {
    onSelectProject((activeIndex - 1 + numProjects) % numProjects);
  }, [activeIndex, numProjects, onSelectProject]);

  const handleNext = useCallback(() => {
    onSelectProject((activeIndex + 1) % numProjects);
  }, [activeIndex, numProjects, onSelectProject]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 50) handleNext();
    if (diff < -50) handlePrev();
    setTouchStartX(null);
  };

  // Helper to calculate circular shortest offset from activeIndex
  const getOffset = (index: number) => {
    let diff = index - activeIndex;
    if (diff > numProjects / 2) diff -= numProjects;
    if (diff < -numProjects / 2) diff += numProjects;
    return diff;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none py-10"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ perspective: "1100px", perspectiveOrigin: "50% 50%" }}
    >
      {/* 3D Convex Carousel Container */}
      <div className="relative w-full h-[320px] sm:h-[380px] md:h-[440px] flex items-center justify-center">
        {projects.map((project, index) => {
          const offset = getOffset(index);
          const isCenter = offset === 0;
          const absOffset = Math.abs(offset);

          // Only render visible items within distance 3
          if (absOffset > 2.5) return null;

          // 3D positioning calculations:
          // CENTER: pops forward (translateZ: 70px, scale: 1.1, translateY: -8px)
          // SIDES: go backward into depth (translateZ: -90px to -190px, rotateY: ±20deg to ±36deg, translateY: +14px to +32px)
          const baseSpacing = typeof window !== "undefined" && window.innerWidth < 640 ? 210 : 360;
          const translateX = offset * baseSpacing;
          const translateY = absOffset === 0 ? -8 : absOffset === 1 ? 14 : 32;
          const translateZ = isCenter ? 70 : -90 * absOffset;
          const rotateY = isCenter ? 0 : offset > 0 ? -20 * Math.min(absOffset, 1.8) : 20 * Math.min(absOffset, 1.8);
          const rotateZ = isCenter ? 0 : offset > 0 ? 2.5 * absOffset : -2.5 * absOffset;
          const scale = isCenter ? 1.1 : Math.max(0.72, 1 - absOffset * 0.16);
          const opacity = isCenter ? 1 : Math.max(0.35, 1 - absOffset * 0.35);
          const zIndex = 30 - Math.round(absOffset * 10);

          return (
            <div
              key={project.id}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform"
              style={{
                transform: `translateX(calc(-50% + ${translateX}px)) translateY(calc(-50% + ${translateY}px)) translateZ(${translateZ}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
                zIndex,
                opacity,
              }}
            >
              {/* Card Container: Horizontal rectangle shape with smooth rounded corners */}
              <div
                className={`relative w-[300px] sm:w-[420px] md:w-[500px] lg:w-[560px] aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 ${
                  isCenter
                    ? "ring-2 ring-[#00ff66] ring-offset-4 ring-offset-[#030303] shadow-[0_0_45px_rgba(0,255,102,0.35),0_25px_60px_rgba(0,0,0,0.95)]"
                    : "ring-1 ring-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
                }`}
                style={{
                  background: "#080808",
                }}
              >
                {/* Full Solid Image for Center Card, Styled with Pixel Mask for Side Cards */}
                <div className="relative w-full h-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 320px, (max-width: 1024px) 520px, 600px"
                    className={`object-cover object-center transition-all duration-700 ${
                      isCenter ? "scale-100 filter-none" : "scale-105 filter contrast-125"
                    }`}
                    priority={isCenter}
                  />

                  {/* Cyber Glass Gradient Overlays */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      isCenter
                        ? "bg-gradient-to-t from-black/85 via-black/20 to-black/30"
                        : "bg-black/40"
                    }`}
                  />

                  {/* Center Card Glowing HUD Accents */}
                  {isCenter && (
                    <>
                      {/* Top Cyber Status Pill */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                        <span
                          className="px-2.5 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase bg-black/70 border border-[#00ff66]/40 text-[#00ff66] backdrop-blur-md flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,255,102,0.2)]"
                          style={{ fontFamily: mono }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] animate-pulse" />
                          ACTIVE // 0{index + 1}
                        </span>

                        <span
                          className="text-[9px] font-bold text-white/50 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm"
                          style={{ fontFamily: mono }}
                        >
                          {project.year}
                        </span>
                      </div>

                      {/* Bottom Info Title on Thumbnail */}
                      <div className="absolute bottom-4 left-4 right-4 z-20">
                        <span
                          className="text-[10px] font-semibold text-[#00ff66] tracking-wider uppercase block mb-1"
                          style={{ fontFamily: mono }}
                        >
                          {project.category}
                        </span>
                        <h4 className="text-base font-bold text-white tracking-tight leading-snug line-clamp-1">
                          {project.title}
                        </h4>
                      </div>

                      {/* Corner Target Accents */}
                      <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 border-[#00ff66] pointer-events-none" />
                      <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 border-[#00ff66] pointer-events-none" />
                      <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 border-[#00ff66] pointer-events-none" />
                      <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-[#00ff66] pointer-events-none" />
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Carousel Navigation Bar & Interactive Controls */}
      <div className="relative z-30 flex items-center justify-center gap-6 mt-6">
        {/* Prev Button */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous project"
          className="group relative p-3 rounded-full bg-[#121212]/80 border border-white/10 text-white/70 hover:text-[#00ff66] hover:border-[#00ff66]/50 hover:bg-black/90 transition-all duration-300 hover:scale-110 active:scale-95 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        >
          <svg className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Dynamic Pagination Indicator */}
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[11px]"
          style={{ fontFamily: mono }}
        >
          {projects.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onSelectProject(i)}
              aria-label={`Go to project ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-6 bg-[#00ff66] shadow-[0_0_8px_#00ff66]"
                  : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
          <span className="ml-2 text-white/50 font-mono">
            0{activeIndex + 1} / 0{numProjects}
          </span>
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next project"
          className="group relative p-3 rounded-full bg-[#121212]/80 border border-white/10 text-white/70 hover:text-[#00ff66] hover:border-[#00ff66]/50 hover:bg-black/90 transition-all duration-300 hover:scale-110 active:scale-95 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        >
          <svg className="w-5 h-5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
