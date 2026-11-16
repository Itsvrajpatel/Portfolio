"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ProjectData } from "@/data/projectsData";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ExternalLink,
  Layers,
  Lock,
  Sparkles,
  Database,
  ShieldCheck,
  Cpu,
  Brain,
  Upload,
  Users,
  CheckCircle2,
  Calendar,
  MessageSquare,
  User,
  Mail,
  Zap,
} from "lucide-react";

interface ProjectScreenTourProps {
  project: ProjectData;
}

const mono = "var(--font-jetbrains-mono, 'JetBrains Mono', ui-monospace, monospace)";

export default function ProjectScreenTour({ project }: ProjectScreenTourProps): JSX.Element {
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const screens = project.screens;
  const currentScreen = screens[activeScreenIndex] || screens[0];

  const handlePrev = () => {
    setActiveScreenIndex((prev) => (prev - 1 + screens.length) % screens.length);
  };

  const handleNext = () => {
    setActiveScreenIndex((prev) => (prev + 1) % screens.length);
  };

  // Helper icon selector
  const getScreenIcon = (iconName: string) => {
    switch (iconName) {
      case "brain":
        return <Brain className="w-5 h-5 text-[#00ff66]" />;
      case "upload":
        return <Upload className="w-5 h-5 text-cyan-400" />;
      case "shield":
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case "database":
        return <Database className="w-5 h-5 text-teal-400" />;
      case "users":
        return <Users className="w-5 h-5 text-[#00ff66]" />;
      case "check-circle":
        return <CheckCircle2 className="w-5 h-5 text-cyan-400" />;
      case "calendar":
        return <Calendar className="w-5 h-5 text-amber-400" />;
      case "message-square":
        return <MessageSquare className="w-5 h-5 text-[#00ff66]" />;
      case "user":
        return <User className="w-5 h-5 text-purple-400" />;
      case "sparkles":
        return <Sparkles className="w-5 h-5 text-[#00ff66]" />;
      case "mail":
        return <Mail className="w-5 h-5 text-sky-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#00ff66]" />;
    }
  };

  return (
    <div className="relative w-full my-8">
      {/* ── Guided Product Tour Top Bar ───────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          {/* Subtle glowing pill */}
          <div className="flex items-center gap-2 mb-2">
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00ff66]/30 bg-[#00ff66]/10 text-[#00ff66] text-[11px] font-semibold tracking-wider uppercase shadow-[0_0_12px_rgba(0,255,102,0.15)]"
              style={{ fontFamily: mono }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] shadow-[0_0_6px_#00ff66] animate-pulse" />
              Guided product tour
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Explore the product
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mt-1.5 leading-relaxed">
            Explore real product screens without needing a client account. The live site is still available in a separate tab.
          </p>
        </div>

        {/* Right Screens button */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] text-zinc-300 text-xs font-mono tracking-wider backdrop-blur-md"
            style={{ fontFamily: mono }}
          >
            <Layers className="w-3.5 h-3.5 text-[#00ff66]" />
            <span>Screens ({screens.length})</span>
          </div>
        </div>
      </div>

      {/* ── Browser Window Container ───────────────────────────────────────── */}
      <div
        className={`relative w-full rounded-2xl border border-white/10 bg-[#0a0a0f] shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden transition-all duration-300 ${
          isFullscreen ? "fixed inset-4 z-50 m-0 bg-black/95 flex flex-col" : ""
        }`}
      >
        {/* Browser Top Navigation Chrome */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#121218]/90 border-b border-white/[0.08] backdrop-blur-md">
          {/* 3 macOS dots */}
          <div className="flex items-center gap-2 w-20">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-[0_0_6px_rgba(255,95,86,0.5)]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-[0_0_6px_rgba(255,189,46,0.5)]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-[0_0_6px_rgba(39,201,63,0.5)]" />
          </div>

          {/* Centered URL Address Pill */}
          <div className="flex-1 max-w-md mx-2 flex items-center justify-center">
            <div
              className="w-full flex items-center justify-center gap-2 px-4 py-1 rounded-full bg-black/60 border border-white/10 text-zinc-400 text-[11px] font-mono tracking-wider truncate shadow-inner"
              style={{ fontFamily: mono }}
            >
              <Lock className="w-3 h-3 text-[#00ff66] flex-shrink-0" />
              <span className="truncate text-zinc-300 font-medium">{project.title}</span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-500 truncate">product screens</span>
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center justify-end gap-2.5 w-20 text-zinc-400">
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? "Exit Fullscreen" : "Expand Screen"}
              className="p-1.5 rounded-md hover:bg-white/10 hover:text-white transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Open Live Site in New Tab"
                className="p-1.5 rounded-md hover:bg-white/10 hover:text-[#00ff66] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* ── Main Screen Mockup Canvas Area ───────────────────────────────── */}
        <div className={`relative w-full ${isFullscreen ? "flex-1" : "min-h-[380px] sm:min-h-[440px] md:min-h-[480px]"} bg-gradient-to-b from-[#100c14] via-[#0d0912] to-[#08060a] p-6 sm:p-10 flex flex-col items-center justify-center overflow-hidden`}>
          {/* Subtle warm/cyber glow backdrop matching screenshot */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              background:
                "radial-gradient(ellipse 65% 55% at 50% 40%, rgba(217, 70, 239, 0.12) 0%, rgba(0, 255, 102, 0.05) 50%, transparent 80%)",
            }}
          />

          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous screen"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/60 border border-white/10 hover:border-[#00ff66]/50 text-white/70 hover:text-white hover:bg-black/90 backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.6)]"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next screen"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/60 border border-white/10 hover:border-[#00ff66]/50 text-white/70 hover:text-white hover:bg-black/90 backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.6)]"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Screen Content Wrapper */}
          <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
            {/* Screen Header inside canvas */}
            <div className="mb-8 sm:mb-10 max-w-2xl">
              <span
                className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#00ff66]/90 block mb-2"
                style={{ fontFamily: mono }}
              >
                // {currentScreen.badge}
              </span>
              <h4 className="text-xl sm:text-2xl md:text-3xl font-serif sm:font-sans font-semibold tracking-tight text-white mb-2">
                {currentScreen.title}
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed">
                {currentScreen.subtitle}
              </p>
            </div>

            {/* Main Screen Content: Either Live Screenshot Image or Four Pillars Grid */}
            {currentScreen.isScreenshot ? (
              <div className="relative w-full max-w-4xl aspect-[16/10] rounded-xl overflow-hidden border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.85)] bg-black/80 group">
                <Image
                  src={project.image}
                  alt={currentScreen.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1000px"
                  className="object-contain object-center"
                  priority
                />
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-md bg-black/80 border border-white/10 text-[10px] font-mono text-zinc-300 backdrop-blur-md">
                  AUTHENTIC PRODUCTION SCREENSHOT
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full text-left">
                {currentScreen.pillars.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="group relative rounded-xl border border-white/[0.08] bg-[#16101c]/70 hover:bg-[#1f1627]/90 p-4 sm:p-5 backdrop-blur-sm transition-all duration-300 hover:border-[#00ff66]/40 hover:-translate-y-1 shadow-[0_8px_25px_rgba(0,0,0,0.5)] flex flex-col justify-between"
                  >
                    {/* Subtle top card glow */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:via-[#00ff66]/50 transition-all duration-500" />

                    <div>
                      {/* Icon & tag */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:border-[#00ff66]/40 transition-colors">
                          {getScreenIcon(currentScreen.iconName)}
                        </div>
                        {pillar.stat && (
                          <span
                            className="text-[10px] font-mono text-[#00ff66] bg-[#00ff66]/10 px-2 py-0.5 rounded border border-[#00ff66]/20"
                            style={{ fontFamily: mono }}
                          >
                            {pillar.stat}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h5 className="text-sm font-semibold text-white tracking-tight mb-2 group-hover:text-[#00ff66] transition-colors">
                        {pillar.title}
                      </h5>

                      {/* Description */}
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>

                    {/* Bottom tag */}
                    <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between">
                      <span
                        className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider"
                        style={{ fontFamily: mono }}
                      >
                        {pillar.tag}
                      </span>
                      <span className="text-[10px] text-zinc-600 font-mono">0{idx + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Bottom Thumbnail Preview Strip (matching screenshot) ─────────────── */}
        <div className="bg-[#0b0a10] border-t border-white/[0.08] px-4 sm:px-6 py-4 flex items-center justify-center">
          <div className="flex items-center gap-2.5 sm:gap-4 overflow-x-auto max-w-full pb-1 scrollbar-none">
            {screens.map((screen, idx) => {
              const isSelected = idx === activeScreenIndex;
              return (
                <button
                  key={screen.id}
                  type="button"
                  onClick={() => setActiveScreenIndex(idx)}
                  className={`group relative flex-shrink-0 w-28 sm:w-36 md:w-44 rounded-lg overflow-hidden border text-left p-2.5 transition-all duration-300 ${
                    isSelected
                      ? "border-[#00ff66] bg-[#1a1426] shadow-[0_0_15px_rgba(0,255,102,0.25)] scale-[1.02]"
                      : "border-white/10 bg-[#120f18]/80 hover:border-white/20 hover:bg-[#181320]"
                  }`}
                >
                  {/* Miniature mockup preview box with real image preview */}
                  <div className="relative w-full h-12 sm:h-14 rounded-md bg-[#16161e] border border-white/10 mb-2 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={screen.tabLabel}
                      fill
                      sizes="180px"
                      className={`object-cover object-top transition-all duration-300 ${
                        isSelected ? "opacity-100 scale-105" : "opacity-85 group-hover:opacity-100"
                      }`}
                    />

                    {/* Top HUD status */}
                    <div className="absolute top-1 left-1.5 right-1.5 flex items-center justify-between pointer-events-none z-10">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block shadow-sm" />
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 inline-block shadow-sm" />
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block shadow-sm" />
                      </div>
                      <span className="text-[8px] font-mono text-white/90 bg-black/60 px-1 rounded">0{idx + 1}</span>
                    </div>

                    {/* Bottom indicator tag */}
                    <div className="absolute bottom-1 left-1.5 z-10 pointer-events-none">
                      <span className="text-[7.5px] font-mono text-[#00ff66] tracking-wider uppercase bg-black/80 px-1.5 py-0.5 rounded border border-[#00ff66]/30">
                        {screen.isScreenshot ? "LIVE UI" : screen.tabLabel.split(" ")[0]}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`block text-[11px] font-semibold truncate transition-colors ${
                      isSelected ? "text-[#00ff66]" : "text-zinc-300 group-hover:text-white"
                    }`}
                  >
                    {screen.tabLabel}
                  </span>
                  <span
                    className="block text-[9px] font-mono text-zinc-500 truncate mt-0.5"
                    style={{ fontFamily: mono }}
                  >
                    {screen.badge.split("//")[0]?.trim()}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
