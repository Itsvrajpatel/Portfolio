"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import workspaceImg from "@/assets/workspace.png";
import PixelTransition from "@/components/PixelTransition";
import { generateParticles } from "@/lib/particles";
import { useReducedMotion } from "@/lib/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PARTICLES = generateParticles(45);

const TIMELINE = [
  {
    year: "2023",
    title: "Web Apps & Foundation",
    desc: "Built high-performance API-heavy products, real-time features, and seamless UI interfaces.",
  },
  {
    year: "2024",
    title: "SaaS MVPs",
    desc: "Engineered production SaaS platforms from wireframe to launch with auth, billing & full-stack dashboards.",
  },
  {
    year: "2025",
    title: "AI Agents & RAG Pipelines",
    desc: "Designed custom AI agents, RAG architectures, and workflow automations that save hundreds of hours.",
  },
  {
    year: "2026",
    title: "Next-Gen Intelligent Products",
    desc: "Architecting end-to-end autonomous AI systems and scalable modern web solutions for founders.",
  },
];

const STATS = [
  { value: "40+", label: "Projects" },
  { value: "15+", label: "Clients" },
  { value: "1+", label: "Years" },
];



export default function AboutSection(): JSX.Element {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [pixelReveal, setPixelReveal] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setPixelReveal(true);
    }
  }, [reducedMotion]);

  useGSAP(
    () => {
      if (reducedMotion) return;

      const section = sectionRef.current;
      const bgText = bgTextRef.current;
      const leftCol = leftColRef.current;
      const workspace = workspaceRef.current;
      const timelineWrapper = timelineRef.current;
      const line = lineRef.current;

      if (!section) return;

      if (bgText) {
        gsap.fromTo(
          bgText,
          { y: 80, opacity: 0.15 },
          {
            y: -120,
            opacity: 0.35,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      }

      if (leftCol) {
        gsap.fromTo(
          leftCol,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: leftCol, start: "top 78%", once: true },
          }
        );
      }

      if (timelineWrapper && line) {
        const cards = cardsRef.current.filter((c): c is HTMLDivElement => Boolean(c));
        const dots = dotsRef.current.filter((d): d is HTMLDivElement => Boolean(d));

        if (cards.length > 0 && dots.length > 0) {
          const lineTop = line.offsetTop;
          const lineTotalHeight = line.offsetHeight || 1;

          const ratios = dots.map((dot, i) => {
            const card = cards[i];
            if (!dot || !card) return 0;
            const dotCenterInWrapper = card.offsetTop + dot.offsetTop + dot.offsetHeight / 2;
            const relativeY = dotCenterInWrapper - lineTop;
            return Math.min(Math.max(relativeY / lineTotalHeight, 0), 1);
          });

          gsap.set(line, { scaleY: 0, transformOrigin: "top center" });

          cards.forEach((card, i) => {
            gsap.set(card, { opacity: 0, y: 30, scale: 0.96 });
            const dot = dots[i];
            if (dot) {
              gsap.set(dot, {
                scale: 0.75,
                borderColor: "rgba(255,255,255,0.18)",
                backgroundColor: "#030303",
                boxShadow: "0 0 0px transparent",
              });
              const innerDot = dot.querySelector(".timeline-dot-inner");
              if (innerDot) {
                gsap.set(innerDot, { scale: 0.4, backgroundColor: "rgba(255,255,255,0.25)" });
              }
            }
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: timelineWrapper,
              start: "top 78%",
              once: true,
            },
          });

          cards.forEach((card, i) => {
            const dot = dots[i];
            const innerDot = dot?.querySelector(".timeline-dot-inner");
            const isLast = i === cards.length - 1;
            const targetRatio = isLast ? 1.0 : (ratios[i] ?? i / (cards.length - 1));

            // 1. Highlighted green line extends down to target
            tl.to(line, {
              scaleY: targetRatio,
              duration: 0.4,
              ease: "power1.inOut",
            });

            // 2. Exact moment green line touches target -> dot lights up green & card reveals
            if (dot) {
              tl.to(
                dot,
                {
                  scale: 1.3,
                  borderColor: "#00ff66",
                  boxShadow: "0 0 18px rgba(0,255,102,0.9), 0 0 36px rgba(0,255,102,0.5)",
                  duration: 0.2,
                  ease: "back.out(1.7)",
                },
                ">"
              ).to(dot, {
                scale: 1,
                duration: 0.12,
              });
            }

            if (innerDot) {
              tl.to(
                innerDot,
                {
                  scale: 1,
                  backgroundColor: "#00ff66",
                  duration: 0.18,
                },
                "<"
              );
            }

            tl.to(
              card,
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.35,
                ease: "power2.out",
              },
              "<"
            );
          });
        }
      }

      if (workspace) {
        ScrollTrigger.create({
          trigger: workspace,
          start: "top 75%",
          once: true,
          onEnter: () => setPixelReveal(true),
        });

        gsap.fromTo(
          workspace,
          { opacity: 0, y: 50, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: workspace, start: "top 75%", once: true },
          }
        );
      }
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  const mono = "var(--font-jetbrains-mono, 'JetBrains Mono', ui-monospace, monospace)";

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full overflow-hidden"
      style={{ background: "#030303" }}
      aria-label="About Vraj"
    >
      {/* Blueprint grid */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none animate-grid-pulse"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,102,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,102,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 85% 80% at 50% 50%, transparent 25%, rgba(3,3,3,0.85) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Spotlight */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none animate-spotlight"
        style={{
          background:
            "radial-gradient(ellipse 50% 45% at 50% 45%, rgba(0,255,102,0.1) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Cursor glow — continues hero interaction */}
      <div
        className="absolute inset-0 z-[4] pointer-events-none transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(circle 420px at ${mousePos.x}% ${mousePos.y}%, rgba(0,255,102,0.1), transparent 70%)`,
          mixBlendMode: "screen",
        }}
        aria-hidden="true"
      />

      {/* Giant parallax background type */}
      <div
        ref={bgTextRef}
        className="absolute inset-0 z-[5] flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-bold tracking-tighter whitespace-nowrap"
          style={{
            fontSize: "clamp(8rem, 28vw, 22rem)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(0,255,102,0.07)",
            opacity: 0.2,
          }}
        >
          MAKER
        </span>
      </div>

      {/* Particles */}
      <div className="absolute inset-0 z-[6] pointer-events-none overflow-hidden" aria-hidden="true">
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

      {/* Hero blend */}
      <div
        className="absolute top-0 left-0 right-0 h-28 z-[7] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #030303, transparent)" }}
        aria-hidden="true"
      />

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="relative z-[10] max-w-[1300px] mx-auto px-6 md:px-10 lg:px-16 pt-28 pb-20 lg:pt-36 lg:pb-28">

        {/* Title — mirrors hero typography */}
        <div className="text-center mb-16 lg:mb-22">
          <span
            className="inline-block text-[11px] font-semibold tracking-[0.25em] uppercase mb-6"
            style={{ fontFamily: mono, color: "#00ff66" }}
          >
            {"// about"}
          </span>
          <h2 className="font-bold tracking-tighter leading-[0.88]">
            <span
              className="block"
              style={{ fontSize: "clamp(3.5rem, 12vw, 8rem)", color: "#009933", opacity: 0.85 }}
            >
              Who
            </span>
            <span
              className="block text-transparent"
              style={{
                fontSize: "clamp(3.5rem, 12vw, 8rem)",
                WebkitTextStroke: "2px rgba(0,255,102,0.35)",
              }}
            >
              I Build
            </span>
          </h2>
        </div>

        {/* Two-column: story + workspace */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 lg:mb-28">

          {/* Left — story & bento */}
          <div ref={leftColRef} style={{ opacity: reducedMotion ? 1 : 0 }}>
            <p
              className="leading-[1.9] mb-10"
              style={{
                color: "rgba(255,255,255,0.42)",
                fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
              }}
            >
              I don&apos;t just write code — I build the products founders need to ship.
              From AI agents to SaaS MVPs and workflow automations, I turn ideas into
              tools people use every day.
            </p>

            {/* Vertical timeline depicting years */}
            <div ref={timelineRef} className="relative pl-6 sm:pl-8 flex flex-col gap-5 mb-10">
              {/* Dim track background line */}
              <div
                className="absolute left-[9px] sm:left-[11px] top-3 bottom-3 w-[2px] pointer-events-none rounded-full"
                style={{
                  background: "rgba(255,255,255,0.08)",
                }}
                aria-hidden="true"
              />

              {/* Glowing active timeline line that grows on scroll */}
              <div
                ref={lineRef}
                className="absolute left-[9px] sm:left-[11px] top-3 bottom-3 w-[2px] pointer-events-none rounded-full origin-top z-[1]"
                style={{
                  background:
                    "linear-gradient(to bottom, #00ff66, rgba(0,255,102,0.7) 70%, #00ff66)",
                  boxShadow: "0 0 10px #00ff66, 0 0 20px rgba(0,255,102,0.4)",
                  transform: reducedMotion ? "scaleY(1)" : "scaleY(0)",
                }}
                aria-hidden="true"
              />

              {TIMELINE.map((item, index) => (
                <div
                  key={item.year}
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  className="group relative flex flex-col"
                  style={{
                    opacity: reducedMotion ? 1 : 0,
                  }}
                >
                  {/* Timeline node/dot */}
                  <div
                    ref={(el) => {
                      dotsRef.current[index] = el;
                    }}
                    className="absolute -left-[21px] sm:-left-[27px] top-4 w-3.5 h-3.5 rounded-full flex items-center justify-center z-[2] transition-colors duration-300"
                    style={{
                      background: "#030303",
                      border: reducedMotion ? "2px solid #00ff66" : "2px solid rgba(255,255,255,0.2)",
                      boxShadow: reducedMotion ? "0 0 10px rgba(0,255,102,0.5)" : "none",
                    }}
                  >
                    <span
                      className="timeline-dot-inner w-1.5 h-1.5 rounded-full transition-all duration-300 group-hover:scale-125"
                      style={{
                        background: reducedMotion ? "#00ff66" : "rgba(255,255,255,0.3)",
                      }}
                    />
                  </div>

                  {/* Year badge & card content */}
                  <div
                    className="rounded-xl px-5 py-4 transition-all duration-300 cursor-default"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(0,255,102,0.35)";
                      e.currentTarget.style.boxShadow = "0 0 24px rgba(0,255,102,0.08)";
                      e.currentTarget.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.transform = "translateX(0px)";
                    }}
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span
                        className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-md transition-colors duration-300"
                        style={{
                          fontFamily: mono,
                          color: "#00ff66",
                          background: "rgba(0,255,102,0.08)",
                          border: "1px solid rgba(0,255,102,0.2)",
                        }}
                      >
                        {item.year}
                      </span>
                      <h3 className="font-bold text-white text-[15px] tracking-tight">
                        {item.title}
                      </h3>
                    </div>
                    <p
                      className="text-[13px] leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Inline stats + status */}
            <div
              className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-6"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              {STATS.map((s) => (
                <div key={s.label}>
                  <div
                    className="font-bold tracking-tighter"
                    style={{ fontSize: "1.75rem", color: "#00ff66" }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="text-[10px] tracking-[0.18em] uppercase mt-0.5"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-2 ml-auto">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: "#00ff66", boxShadow: "0 0 8px rgba(0,255,102,0.6)" }}
                />
                <span
                  className="text-[10px] tracking-[0.2em] uppercase"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  Open for work
                </span>
              </div>
            </div>
          </div>

          {/* Right — workspace scene */}
          <div ref={workspaceRef} className="relative" style={{ opacity: reducedMotion ? 1 : 0 }}>
            {/* Monitor glow */}
            <div
              className="absolute inset-0 pointer-events-none z-[1]"
              style={{
                background:
                  "radial-gradient(ellipse 55% 45% at 50% 30%, rgba(0,255,102,0.14) 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />
            {/* Warm lamp */}
            <div
              className="absolute inset-0 pointer-events-none z-[2]"
              style={{
                background:
                  "radial-gradient(ellipse 35% 50% at 8% 35%, rgba(255,190,90,0.07) 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />

            <div
              className="relative z-[3] w-full aspect-square max-w-[520px] mx-auto lg:max-w-none"
              style={{
                filter:
                  "drop-shadow(0 20px 50px rgba(0,0,0,0.7)) drop-shadow(0 0 40px rgba(0,255,102,0.12))",
              }}
            >
              {pixelReveal ? (
                <PixelTransition
                  imgSrc={workspaceImg.src}
                  gridSize={28}
                  duration={1.2}
                  maskId="workspace-pixel-mask"
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full rounded-2xl" style={{ background: "rgba(0,255,102,0.03)" }} />
              )}
            </div>

            {/* Desk reflection */}
            <div
              className="absolute bottom-[12%] left-[18%] right-[18%] h-[6%] pointer-events-none z-[4]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(0,255,102,0.05) 50%, transparent)",
                filter: "blur(8px)",
              }}
              aria-hidden="true"
            />
          </div>
        </div>


      </div>
    </section>
  );
}
