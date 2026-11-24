"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import characterImg from "@/assets/character.png";
import { isPreloaderAlreadyShown, markPreloaderAsShown } from "@/lib/preloaderState";

interface PreloaderProps {
  onOpen?: () => void;
  onComplete?: () => void;
}

const BOOT_LOGS = [
  "SYS.BOOT // INITIALIZING VRAJ.DEV",
  "LOADING SHADERS & 3D VIEWPORT",
  "ESTABLISHING TELEMETRY PIPELINE",
  "SYSTEM NOMINAL // READY TO SHIP",
];

const mono = "var(--font-jetbrains-mono, 'JetBrains Mono', ui-monospace, monospace)";

export default function Preloader({ onOpen, onComplete }: PreloaderProps) {
  const [alreadyShown] = useState(() => isPreloaderAlreadyShown());
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isComplete, setIsComplete] = useState(() => isPreloaderAlreadyShown());

  const onOpenRef = useRef(onOpen);
  onOpenRef.current = onOpen;

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (alreadyShown) {
      document.body.style.overflow = "";
      if (onOpenRef.current) {
        onOpenRef.current();
      }
      if (onCompleteRef.current) {
        onCompleteRef.current();
      }
      return;
    }

    // Lock scrolling while preloader runs
    document.body.style.overflow = "hidden";

    let assetsReady = false;

    // Preload hero character image and decode off-thread
    const img = new Image();
    img.src = characterImg.src;

    const markAssetsReady = () => {
      assetsReady = true;
    };

    if (img.complete) {
      markAssetsReady();
    } else {
      img.onload = markAssetsReady;
      img.onerror = markAssetsReady;
    }

    if (typeof img.decode === "function") {
      img.decode().then(markAssetsReady).catch(markAssetsReady);
    }

    if (document.readyState === "complete") {
      markAssetsReady();
    } else {
      window.addEventListener("load", markAssetsReady, { once: true });
    }

    // Safety timeout: never hang longer than 1.8s waiting for asset load
    const safetyTimeout = setTimeout(markAssetsReady, 1800);

    // Progress counter animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        // If assets aren't ready yet, hold at 92%
        if (prev >= 92 && !assetsReady) {
          return 92;
        }

        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }

        // Smooth progression curve
        const step = prev < 30 ? 4 : prev < 70 ? 3 : prev < 90 ? 4 : 2;
        const next = Math.min(prev + step, 100);

        if (next < 25) setLogIndex(0);
        else if (next < 60) setLogIndex(1);
        else if (next < 90) setLogIndex(2);
        else setLogIndex(3);

        return next;
      });
    }, 28);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (progress === 100 && !isExiting) {
      // Hold 100% briefly so the user sees "100% // SYSTEM NOMINAL"
      const openTimer = setTimeout(() => {
        setIsExiting(true);
        markPreloaderAsShown();
        if (onOpenRef.current) {
          onOpenRef.current();
        }

        // After curtain opening animation completes (800ms), finish and remove preloader
        const completeTimer = setTimeout(() => {
          setIsComplete(true);
          document.body.style.overflow = "";
          markPreloaderAsShown();
          if (onCompleteRef.current) {
            onCompleteRef.current();
          }
        }, 800);

        return () => clearTimeout(completeTimer);
      }, 220);

      return () => clearTimeout(openTimer);
    }
  }, [progress, isExiting]);

  if (isComplete || alreadyShown) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-none select-none overflow-hidden"
      style={{ willChange: "transform, opacity" }}
    >
      {/* Top Vault Curtain */}
      <motion.div
        initial={false}
        animate={{ y: isExiting ? "-100%" : "0%" }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 left-0 right-0 h-[50.5%] bg-[#030303] border-b border-[#00ff66]/15 pointer-events-auto"
        style={{ willChange: "transform" }}
      />

      {/* Bottom Vault Curtain */}
      <motion.div
        initial={false}
        animate={{ y: isExiting ? "100%" : "0%" }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="absolute bottom-0 left-0 right-0 h-[50.5%] bg-[#030303] border-t border-[#00ff66]/15 pointer-events-auto"
        style={{ willChange: "transform" }}
      />

      {/* Blueprint Grid & Neon Glow (Fades out when vault doors open) */}
      <motion.div
        animate={{ opacity: isExiting ? 0 : 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,102,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,102,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(circle at 50% 50%, black 40%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 40%, transparent 80%)",
          }}
        />

        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0,255,102,0.14) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </motion.div>

      {/* Preloader Center Content */}
      <motion.div
        animate={{
          scale: isExiting ? 0.92 : 1,
          opacity: isExiting ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center max-w-md mx-auto w-full px-6 pointer-events-auto"
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
            {progress.toString().padStart(2, "0")}
          </span>
          <span className="text-sm font-bold text-[#00ff66] tracking-wider">%</span>
        </div>

        {/* Glowing Tech Progress Bar */}
        <div className="relative w-full h-[3px] bg-white/10 rounded-full overflow-hidden mb-5">
          <div
            className="h-full bg-gradient-to-r from-[#00ff66] via-[#00e5ff] to-[#00ff66] transition-[width] duration-75 ease-linear"
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
    </div>
  );
}
