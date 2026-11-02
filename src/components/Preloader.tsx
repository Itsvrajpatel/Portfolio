"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete?: () => void;
}

const BOOT_LOGS = [
  "SYS.BOOT // INITIALIZING VRAJ.CORE",
  "LOADING SHADERS & 3D VIEWPORT",
  "ESTABLISHING TELEMETRY PIPELINE",
  "SYSTEM NOMINAL // READY TO SHIP",
];

const mono = "var(--font-jetbrains-mono, 'JetBrains Mono', ui-monospace, monospace)";

export default function Preloader({ onComplete }: PreloaderProps) {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check if website has already loaded in this browser session (e.g. user refreshed the page)
    const hasLoadedBefore = typeof window !== "undefined" && sessionStorage.getItem("vraj_portfolio_loaded");

    if (hasLoadedBefore) {
      setIsLoaded(true);
      if (onComplete) onComplete();
      return;
    }

    // First time startup in this session: display preloader
    setShouldShow(true);
    document.body.style.overflow = "hidden";

    // Progress counter animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Smooth progression curve
        const step = prev < 30 ? 4 : prev < 70 ? 3 : prev < 90 ? 5 : 2;
        const next = Math.min(prev + step, 100);

        if (next < 25) setLogIndex(0);
        else if (next < 60) setLogIndex(1);
        else if (next < 90) setLogIndex(2);
        else setLogIndex(3);

        return next;
      });
    }, 25);

    // Fallback timer
    const safetyTimeout = setTimeout(() => {
      setIsLoaded(true);
      try {
        sessionStorage.setItem("vraj_portfolio_loaded", "true");
      } catch {}
      document.body.style.overflow = "unset";
      if (onComplete) onComplete();
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimeout);
      document.body.style.overflow = "unset";
    };
  }, [onComplete]);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
        try {
          sessionStorage.setItem("vraj_portfolio_loaded", "true");
        } catch {}
        document.body.style.overflow = "unset";
        if (onComplete) onComplete();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  // If not client-mounted, or already loaded previously in this session, don't show preloader
  if (!mounted || !shouldShow || isLoaded) return null;

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          key="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030303] select-none pointer-events-auto"
          style={{ willChange: "opacity, transform" }}
        >
          {/* Top Curtain Panel */}
          <motion.div
            exit={{ y: "-100%", transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
            className="absolute top-0 left-0 right-0 h-1/2 bg-[#030303] border-b border-[#00ff66]/10"
          />

          {/* Bottom Curtain Panel */}
          <motion.div
            exit={{ y: "100%", transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#030303] border-t border-[#00ff66]/10"
          />

          {/* Blueprint Grid in background of preloader */}
          <div
            className="absolute inset-0 z-[1] pointer-events-none opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,255,102,0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,255,102,0.08) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
              maskImage: "radial-gradient(circle at 50% 50%, black 40%, transparent 80%)",
            }}
          />

          {/* Center Neon Glow */}
          <div
            className="absolute w-[450px] h-[450px] rounded-full pointer-events-none z-[2]"
            style={{
              background: "radial-gradient(circle, rgba(0,255,102,0.12) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          {/* Preloader Main Content */}
          <motion.div
            exit={{
              scale: 0.9,
              opacity: 0,
              transition: { duration: 0.35, ease: "easeInOut" },
            }}
            className="relative z-10 flex flex-col items-center max-w-md w-full px-6"
          >
            {/* Monogram Brand Header */}
            <div className="flex items-center gap-2 mb-8">
              <span
                className="text-lg sm:text-xl font-bold tracking-[0.25em] text-white px-4 py-1.5 rounded-full border border-[#00ff66]/30 bg-[#00ff66]/5 shadow-[0_0_20px_rgba(0,255,102,0.15)] flex items-center gap-2"
                style={{ fontFamily: mono }}
              >
                <span className="w-2 h-2 rounded-full bg-[#00ff66] shadow-[0_0_8px_#00ff66] animate-pulse" />
                &lt;VRAJ /&gt;
              </span>
            </div>

            {/* Progress Percentage Display */}
            <div className="flex items-baseline justify-center gap-2 mb-4" style={{ fontFamily: mono }}>
              <span className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#00ff66] tracking-tighter">
                {progress.toString().padStart(3, "0")}
              </span>
              <span className="text-sm font-bold text-[#00ff66] tracking-wider">%</span>
            </div>

            {/* Glowing Tech Progress Bar */}
            <div className="relative w-full h-[3px] bg-white/10 rounded-full overflow-hidden mb-5">
              <motion.div
                className="h-full bg-gradient-to-r from-[#00ff66] via-[#00e5ff] to-[#00ff66]"
                style={{
                  width: `${progress}%`,
                  boxShadow: "0 0 14px #00ff66, 0 0 24px rgba(0,255,102,0.6)",
                }}
              />
            </div>

            {/* Telemetry Status Console Log */}
            <div
              className="flex items-center justify-between w-full text-[11px] text-zinc-500 font-mono tracking-wider px-1"
              style={{ fontFamily: mono }}
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] animate-ping" />
                <span className="text-zinc-300 transition-all duration-200">
                  {BOOT_LOGS[logIndex]}
                </span>
              </div>
              <span className="text-zinc-600 hidden sm:inline">[PORTFOLIO.V2]</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
