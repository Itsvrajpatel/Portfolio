"use client";

import React, { useState, useEffect, useRef } from "react";
import characterImg from "@/assets/character.png";
import PixelTransition from "@/components/PixelTransition";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/services/ServicesSection";
import ProjectsSection from "@/components/projects/ProjectsSection";
import TechStackMarquee from "@/components/skills/TechStackMarquee";
import ProcessSection from "@/components/process/ProcessSection";
import ContactSection from "@/components/contact/ContactSection";
import ScannerMarquee from "@/components/ScannerMarquee";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import { generateParticles } from "@/lib/particles";
import { isPreloaderAlreadyShown } from "@/lib/preloaderState";

// ---------------------------------------------------------------------------
// 22 Lightweight particles for smooth, low-overhead ambient atmosphere
// ---------------------------------------------------------------------------
const PARTICLES = generateParticles(22);

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [websiteOpen, setWebsiteOpen] = useState(() => isPreloaderAlreadyShown());
  const rafId = useRef<number | null>(null);

  const handlePreloaderOpen = () => {
    setWebsiteOpen(true);
  };

  const handlePreloaderComplete = () => {
    if (typeof window !== "undefined") {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        ScrollTrigger.refresh();
      });
    }
  };

  useEffect(() => {
    if (isPreloaderAlreadyShown()) {
      setWebsiteOpen(true);
      if (typeof window !== "undefined") {
        import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
          ScrollTrigger.refresh();
        });
      }
    }
  }, []);

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    let targetX = 50;
    let targetY = 50;
    let targetOffsetX = 0;
    let targetOffsetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth) * 100;
      targetY = (e.clientY / innerHeight) * 100;
      targetOffsetX = (e.clientX / innerWidth - 0.5) * 2;
      targetOffsetY = (e.clientY / innerHeight - 0.5) * 2;

      if (!rafId.current) {
        rafId.current = requestAnimationFrame(() => {
          if (heroEl) {
            heroEl.style.setProperty("--hero-mouse-x", `${targetX.toFixed(2)}%`);
            heroEl.style.setProperty("--hero-mouse-y", `${targetY.toFixed(2)}%`);
            heroEl.style.setProperty("--hero-offset-x", `${(targetOffsetX * 8).toFixed(2)}px`);
            heroEl.style.setProperty("--hero-offset-y", `${(targetOffsetY * 8).toFixed(2)}px`);
            heroEl.style.setProperty("--hero-char-x", `${(targetOffsetX * -8).toFixed(2)}px`);
            heroEl.style.setProperty("--hero-char-y", `${(targetOffsetY * -4).toFixed(2)}px`);
          }
          rafId.current = null;
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Preloader onOpen={handlePreloaderOpen} onComplete={handlePreloaderComplete} />
      <SmoothScroll />

      <main
        ref={heroRef}
        className="relative min-h-screen w-full overflow-hidden bg-[#030303] text-white selection:bg-[#00ff66] selection:text-black font-sans"
        style={{
          // Default fallbacks
          ["--hero-mouse-x" as string]: "50%",
          ["--hero-mouse-y" as string]: "50%",
          ["--hero-offset-x" as string]: "0px",
          ["--hero-offset-y" as string]: "0px",
          ["--hero-char-x" as string]: "0px",
          ["--hero-char-y" as string]: "0px",
        }}
      >
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

        {/* ── LAYER 18 · Cursor glow — hardware accelerated via CSS variables ─ */}
        <div
          className="absolute inset-0 z-[18] pointer-events-none transition-opacity duration-300 ease-out"
          style={{
            background:
              "radial-gradient(circle 500px at var(--hero-mouse-x) var(--hero-mouse-y), rgba(0,255,102,0.18), transparent 70%)",
            mixBlendMode: "screen",
            willChange: "background",
          }}
        />

        {/* ── Header · Spreads on hero, shrinks to pill on scroll ──────────── */}
        <header
          className="fixed top-0 left-0 right-0 z-[30] pointer-events-none transition-all duration-700 ease-out"
          style={{
            transform: websiteOpen ? "translateY(0)" : "translateY(-24px)",
            opacity: websiteOpen ? 1 : 0,
          }}
        >
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
                gap: scrolled ? "24px" : "60px",
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
                { label: "Skills", href: "#skills" },
                { label: "Process", href: "#process" },
                { label: "Contact", href: "#contact" },
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

        {/* ── LAYER 10 · Large typography — hardware accelerated parallax ─── */}
        <div
          className="absolute inset-0 z-[10] flex flex-col items-center justify-center font-bold tracking-tighter select-none pointer-events-none transition-all duration-1000 ease-out"
          style={{
            transform: websiteOpen
              ? "translate3d(var(--hero-offset-x), var(--hero-offset-y), 0) scale(1)"
              : "translate3d(var(--hero-offset-x), calc(var(--hero-offset-y) + 36px), 0) scale(0.95)",
            opacity: websiteOpen ? 1 : 0,
            willChange: "transform, opacity",
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
        <div
          className="absolute bottom-0 left-1/2 z-[15] -translate-x-1/2 w-[420px] h-[50px] bg-black/90 blur-2xl rounded-[100%] pointer-events-none transition-opacity duration-1000 ease-out"
          style={{ opacity: websiteOpen ? 1 : 0 }}
        />
        <div
          className="absolute bottom-2 left-1/2 z-[15] -translate-x-1/2 w-[320px] h-[35px] bg-[#00ff66]/15 blur-xl rounded-[100%] pointer-events-none transition-opacity duration-1000 ease-out"
          style={{ opacity: websiteOpen ? 1 : 0 }}
        />

        {/* ── LAYER 20 · Character — counter-parallax to typography ───────── */}
        <div
          className="absolute bottom-0 left-1/2 z-[20] w-full max-w-[525px] h-[89.25vh] pointer-events-none"
          style={{
            transform: "translateX(-50%) translate3d(var(--hero-char-x), var(--hero-char-y), 0)",
            willChange: "transform",
          }}
        >
          <div className="w-full h-full flex items-end justify-center">
            <PixelTransition
              gridSize={24}
              duration={1.3}
              imgSrc={characterImg.src}
              startAnimation={websiteOpen}
              className="[filter:drop-shadow(0_0_30px_rgba(0,255,102,0.2))_drop-shadow(0_20px_35px_rgba(0,0,0,0.85))] pointer-events-auto"
            />
          </div>
        </div>

        {/* ── LAYER 19 · Floating particles — beneath character ───────────── */}
        <div
          className="absolute inset-0 z-[19] pointer-events-none overflow-hidden transition-opacity duration-1000 ease-out"
          style={{ opacity: websiteOpen ? 1 : 0 }}
        >
          {PARTICLES.map((p) => (
            <span
              key={p.id}
              className="absolute bottom-0 rounded-full bg-[#00ff66] animate-float-up"
              style={{
                left: `${p.x}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
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
      <ProcessSection />
      <ContactSection />
    </>
  );
}
