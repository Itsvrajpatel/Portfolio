"use client";

import React, { useState } from "react";
import Image from "next/image";

import aiAgentsImg from "@/assets/services/ai-agents.jpg";
import saasMvpImg from "@/assets/services/saas-mvp.jpg";
import webDevImg from "@/assets/services/web-dev.jpg";
import uiUxImg from "@/assets/services/ui-ux.jpg";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  stack: string;
  deliverables: string;
  image: any;
}

const SERVICES: ServiceItem[] = [
  {
    id: "design-services",
    title: "DESIGN SERVICES",
    description: "Our professional design experts can help you craft pixel-perfect wireframes, design systems, and responsive interactive prototypes for your project.",
    duration: "2 WEEKS",
    stack: "FIGMA / THREEJS",
    deliverables: "DESIGN SYSTEM",
    image: uiUxImg,
  },
  {
    id: "ai-services",
    title: "AI & AUTOMATION SERVICES",
    description: "Custom autonomous AI agents, RAG architectures, LLM fine-tuning, and intelligent workflow automations built to save hundreds of hours.",
    duration: "3 WEEKS",
    stack: "PYTHON / LANGCHAIN",
    deliverables: "CUSTOM AI AGENTS",
    image: aiAgentsImg,
  },
  {
    id: "saas-services",
    title: "SAAS MVP SERVICES",
    description: "Production-ready SaaS platforms engineered from wireframe to launch with multi-tenant auth, billing, and scalable database infrastructure.",
    duration: "4 WEEKS",
    stack: "NEXT.JS / POSTGRES",
    deliverables: "PRODUCTION SAAS",
    image: saasMvpImg,
  },
  {
    id: "pro-services",
    title: "PRO WEB SERVICES",
    description: "High-performance API-heavy web applications with real-time sync, custom micro-animations, and responsive modern layouts.",
    duration: "2 WEEKS",
    stack: "REACT / TYPESCRIPT",
    deliverables: "FULL-STACK WEB APP",
    image: webDevImg,
  },
];

const mono = "var(--font-jetbrains-mono, 'JetBrains Mono', ui-monospace, monospace)";

export default function ServicesSection(): JSX.Element {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeService = SERVICES[activeIndex];

  return (
    <section
      id="services"
      className="relative w-full overflow-hidden pt-8 pb-24 lg:pt-12 lg:pb-32"
      style={{ background: "#030303" }}
      aria-label="Our Services"
    >
      {/* Background blueprint grid matching site aesthetic */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,102,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,102,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      {/* Spotlight glow behind section */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 45% at 50% 50%, rgba(0,255,102,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-[10] max-w-[1300px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Section Header matching Skills & Process style */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-5">
            <span
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#00ff66]/40 bg-[#00ff66]/10 text-[#00ff66] text-xs font-semibold tracking-[0.2em] uppercase shadow-[0_0_15px_rgba(0,255,102,0.2)]"
              style={{ fontFamily: mono }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] shadow-[0_0_8px_#00ff66] animate-pulse" />
              SERVICES
            </span>
            <span className="text-xs text-zinc-500 font-mono tracking-wider hidden sm:inline-block">
              // CAPABILITIES & SPECIALIZATIONS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold tracking-tight text-white leading-[1.12] max-w-4xl">
            Specialized capabilities for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff66] to-[#00e5ff]">
              modern digital products.
            </span>
          </h2>
        </div>

        {/* Main Grid: Left Image/Meta Area + Right Services List */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Dynamic Image Preview Area & Specs */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div
              className="relative w-full rounded-2xl p-6 sm:p-8 overflow-hidden transition-all duration-500 group"
              style={{
                background: "rgba(18, 18, 18, 0.5)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 255, 102, 0.05)",
              }}
            >
              {/* Dynamic glowing radial spotlight behind image */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-700 opacity-60 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle 240px at 50% 50%, rgba(0, 255, 102, 0.15), transparent 70%)",
                }}
              />

              {/* Spec overlay details matching reference mockup */}
              <div className="relative z-10 space-y-4 mb-6" style={{ fontFamily: mono }}>
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-[11px] text-white/40 uppercase tracking-widest">
                    DURATION:
                  </span>
                  <span className="text-[12px] font-bold text-[#00ff66] tracking-wider">
                    {activeService.duration}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-[11px] text-white/40 uppercase tracking-widest">
                    STACK:
                  </span>
                  <span className="text-[12px] font-medium text-white/80 tracking-wider">
                    {activeService.stack}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-[11px] text-white/40 uppercase tracking-widest">
                    DELIVERABLE:
                  </span>
                  <span className="text-[12px] font-medium text-white/80 tracking-wider">
                    {activeService.deliverables}
                  </span>
                </div>
              </div>

              {/* Image Preview Container */}
              <div className="relative z-10 w-full aspect-square max-w-[340px] mx-auto flex items-center justify-center">
                {SERVICES.map((service, idx) => (
                  <div
                    key={service.id}
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out ${
                      idx === activeIndex
                        ? "opacity-100 scale-100 rotate-0"
                        : "opacity-0 scale-90 rotate-3 pointer-events-none"
                    }`}
                  >
                    <div
                      className="relative w-full h-full rounded-xl overflow-hidden"
                      style={{
                        filter:
                          "drop-shadow(0 15px 35px rgba(0,0,0,0.8)) drop-shadow(0 0 25px rgba(0,255,102,0.25))",
                      }}
                    >
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-contain p-2"
                        priority={idx === 0}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom indicator status */}
              <div
                className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-white/40"
                style={{ fontFamily: mono }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-ping" />
                  <span className="text-white/60">ACTIVE PREVIEW</span>
                </div>
                <span>0{activeIndex + 1} / 0{SERVICES.length}</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Services List */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-white/10 border-t border-b border-white/10">
            {SERVICES.map((service, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={service.id}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  className={`group relative py-8 px-4 sm:px-6 cursor-pointer transition-all duration-300 flex items-center justify-between ${
                    isActive ? "bg-white/[0.03]" : "hover:bg-white/[0.015]"
                  }`}
                >
                  {/* Left glowing accent line for active row */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 ${
                      isActive
                        ? "bg-[#00ff66] shadow-[0_0_12px_#00ff66]"
                        : "bg-transparent group-hover:bg-white/20"
                    }`}
                  />

                  {/* Service Text details */}
                  <div className="flex-1 pr-6 sm:pr-10">
                    <h3
                      className={`text-xl sm:text-2xl md:text-3xl font-bold tracking-tight uppercase transition-colors duration-300 ${
                        isActive ? "text-white" : "text-white/60 group-hover:text-white/90"
                      }`}
                    >
                      {service.title}
                    </h3>
                    <p
                      className="mt-2 text-xs sm:text-sm leading-relaxed transition-colors duration-300 max-w-xl"
                      style={{ color: isActive ? "rgba(255, 255, 255, 0.65)" : "rgba(255, 255, 255, 0.35)" }}
                    >
                      {service.description}
                    </p>
                  </div>

                  {/* Right Arrow chevron indicator */}
                  <div className="flex-shrink-0">
                    <svg
                      className={`w-7 h-7 sm:w-9 sm:h-9 transition-all duration-300 ease-out transform ${
                        isActive
                          ? "text-[#00ff66] translate-x-2 scale-110"
                          : "text-white/30 group-hover:text-white/70 group-hover:translate-x-1"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
