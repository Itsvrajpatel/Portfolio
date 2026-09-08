"use client";

import React, { useState, useEffect } from "react";
import characterImg from "@/assets/character.png";
import PixelTransition from "@/components/PixelTransition";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/services/ServicesSection";
import ProjectsSection from "@/components/projects/ProjectsSection";
import TechStackMarquee from "@/components/skills/TechStackMarquee";
import ScannerMarquee from "@/components/ScannerMarquee";

// ---------------------------------------------------------------------------
// Particle type — generated once, animated via CSS custom properties
// ---------------------------------------------------------------------------
interface Particle {
  id: number;
  x: number;       // % from left
  size: number;    // px
  delay: number;   // animation-delay in seconds
  duration: number;// animation-duration in seconds
  opacity: number; // base opacity
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 2 + 1,        // 1–3 px
    delay: Math.random() * 8,
    duration: Math.random() * 6 + 6,    // 6–12 s
    opacity: Math.random() * 0.35 + 0.1, // 0.10–0.45
  }));
}

const PARTICLES = generateParticles(55);

// ---------------------------------------------------------------------------
export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (e.clientX / innerWidth) * 100,
        y: (e.clientY / innerHeight) * 100,
      });
      setMouseOffset({
        x: (e.clientX / innerWidth - 0.5) * 2,
        y: (e.clientY / innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <main className="relative min-h-screen w-full overflow-hidden bg-[#030303] text-white selection:bg-[#00ff66] selection:text-black font-sans">

        {/* ── LAYER 1 · Soft edge vignette — always static ─────────────────── */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 85% 80% at 50% 50%, transparent 30%, rgba(3,3,3,0.75) 100%)",
          }}
        />

        {/* ── LAYER 2 · Green spotlight — fixed centre, slow breathe ────────── */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none animate-spotlight"
          style={{
            background:
              "radial-gradient(ellipse 55% 50% at 50% 60%, rgba(0,255,102,0.13) 0%, transparent 70%)",
          }}
        />

        {/* ── LAYER 18 · Cursor glow — beneath character ───────────────────── */}
        <div
          className="absolute inset-0 z-[18] pointer-events-none transition-all duration-300 ease-out"
          style={{
            background: `radial-gradient(circle 500px at ${mousePos.x}% ${mousePos.y}%, rgba(0,255,102,0.18), transparent 70%)`,
            mixBlendMode: "screen",
          }}
        />

        {/* ── Header · Spreads on hero, shrinks to pill on scroll ──────────── */}
        <header className="fixed top-0 left-0 right-0 z-[30] pointer-events-none">
          <div className="relative flex items-center justify-center" style={{ height: "72px", paddingLeft: "40px", paddingRight: "40px" }}>

            {/* Logo — top-left, same row as nav, hidden once scrolled */}
            {!scrolled && (
              <span
                className="absolute left-10 text-[13px] font-semibold tracking-wider text-white select-none pointer-events-auto"
                style={{ fontFamily: "monospace" }}
              >
                &lt;VRAJ /&gt;
              </span>
            )}

            {/* Nav — centered in the same row */}
            <nav
              className="pointer-events-auto flex items-center transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)]"
              style={{
                gap: scrolled ? "32px" : "80px",
                height: scrolled ? "60px" : "auto",
                paddingLeft: scrolled ? "28px" : "0px",
                paddingRight: scrolled ? "28px" : "0px",
                borderRadius: "999px",
                background: scrolled ? "rgba(18,18,18,0.65)" : "transparent",
                backdropFilter: scrolled ? "blur(18px)" : "blur(0px)",
                WebkitBackdropFilter: scrolled ? "blur(18px)" : "blur(0px)",
                border: scrolled ? "1px solid #2A2A2A" : "1px solid transparent",
              }}
              onMouseEnter={e => {
                if (!scrolled) return;
                const el = e.currentTarget;
                el.style.borderColor = "rgba(0,255,102,0.45)";
                el.style.background = "rgba(28,28,28,0.75)";
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                if (!scrolled) return;
                const el = e.currentTarget;
                el.style.borderColor = "#2A2A2A";
                el.style.background = "rgba(18,18,18,0.65)";
                el.style.transform = "translateY(0px)";
              }}
            >
              {[
                { label: "Work", href: "#work" },
                { label: "About", href: "#about" },
                { label: "Services", href: "#services" },
                { label: "Contact", href: "#" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-[11px] font-medium tracking-widest uppercase transition-colors duration-200"
                  style={{ color: scrolled ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.6)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#00ff66")}
                  onMouseLeave={e => (e.currentTarget.style.color = scrolled ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.6)")}
                >
                  {label}
                </a>
              ))}
            </nav>

          </div>
        </header>

        {/* ── LAYER 10 · Large typography — parallax shift ──────────────────── */}
        <div
          className="absolute inset-0 z-[10] flex flex-col items-center justify-center font-bold tracking-tighter select-none transition-transform duration-200 ease-out pointer-events-none"
          style={{
            transform: `translate3d(${mouseOffset.x * 8}px, ${mouseOffset.y * 8}px, 0)`,
          }}
        >
          <h1 className="text-[20vw] leading-[0.75] text-[#009933] opacity-60">
            Building
          </h1>
          <h1 className="text-[20vw] leading-[0.75] text-transparent [-webkit-text-stroke:2px_rgba(0,255,102,0.3)]">
            Products
          </h1>
        </div>

        {/* ── LAYER 15 · Ground contact & ambient shadows ───────────────────── */}
        <div className="absolute bottom-0 left-1/2 z-[15] -translate-x-1/2 w-[420px] h-[50px] bg-black/90 blur-2xl rounded-[100%] pointer-events-none" />
        <div className="absolute bottom-2 left-1/2 z-[15] -translate-x-1/2 w-[320px] h-[35px] bg-[#00ff66]/15 blur-xl rounded-[100%] pointer-events-none" />

        {/* ── LAYER 20 · Character — counter-parallax to typography ───────── */}
        <div
          className="absolute bottom-0 left-1/2 z-[20] w-full max-w-[525px] h-[89.25vh] -translate-x-1/2 flex items-end justify-center pointer-events-none transition-transform duration-200 ease-out"
          style={{
            transform: `translateX(-50%) translate3d(${mouseOffset.x * -8}px, ${mouseOffset.y * -4}px, 0)`,
          }}
        >
          <PixelTransition
            gridSize={35}
            duration={1.5}
            imgSrc={characterImg.src}
            className="[filter:drop-shadow(0_-2px_6px_rgba(0,255,102,0.12))_drop-shadow(0_0_40px_rgba(0,255,102,0.25))_drop-shadow(0_20px_35px_rgba(0,0,0,0.85))] pointer-events-auto"
          />
        </div>

        {/* ── LAYER 19 · Floating particles — beneath character ───────────── */}
        <div className="absolute inset-0 z-[19] pointer-events-none overflow-hidden">
          {PARTICLES.map((p) => (
            <span
              key={p.id}
              className="absolute bottom-0 rounded-full bg-[#00ff66] animate-float-up"
              style={{
                left: `${p.x}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                // feed per-particle opacity into the keyframe via a CSS custom property
                ["--p-opacity" as string]: p.opacity,
                opacity: p.opacity,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
              }}
            />
          ))}
        </div>

        {/* ── LAYER 25 · Ground blend gradient ─────────────────────────────── */}
        <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#030303] via-[#030303]/50 to-transparent z-[25] pointer-events-none" />
      </main>
      <ScannerMarquee />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <TechStackMarquee />
    </>
  );
}
