"use client";

import React, { useState } from "react";
import {
  PostgreSQL,
  React as ReactIcon,
  NextJs,
  TypeScript,
  TailwindCSS,
  NodeJs,
  Python,
  FastAPI,
  OpenAI,
  Supabase,
  Prisma,
  Redis,
  Docker,
  GraphQL,
  ThreeJsLight,
  MongoDB,
  Git,
  Figma,
} from "developer-icons";

interface TechItem {
  id: string;
  name: string;
  category: string;
  color: string;
  glow: string;
  icon: React.ReactNode;
}

const TECHNOLOGIES: TechItem[] = [
  {
    id: "postgres",
    name: "PostgreSQL",
    category: "Relational Database",
    color: "#336791",
    glow: "rgba(51, 103, 145, 0.45)",
    icon: (
      <PostgreSQL
        size={44}
        className="transition-transform duration-300 group-hover/card:scale-110"
      />
    ),
  },
  {
    id: "react",
    name: "React",
    category: "UI Library",
    color: "#61DAFB",
    glow: "rgba(97, 218, 251, 0.45)",
    icon: (
      <ReactIcon
        size={44}
        className="transition-transform duration-300 group-hover/card:scale-110"
      />
    ),
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Full-Stack React",
    color: "#FFFFFF",
    glow: "rgba(255, 255, 255, 0.35)",
    icon: (
      <NextJs
        size={44}
        className="transition-transform duration-300 group-hover/card:scale-110"
      />
    ),
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Typed JavaScript",
    color: "#3178C6",
    glow: "rgba(49, 120, 198, 0.45)",
    icon: (
      <TypeScript
        size={44}
        className="transition-transform duration-300 group-hover/card:scale-110"
      />
    ),
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Styling Framework",
    color: "#38BDF8",
    glow: "rgba(56, 189, 248, 0.45)",
    icon: (
      <TailwindCSS
        size={44}
        className="transition-transform duration-300 group-hover/card:scale-110"
      />
    ),
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "Runtime Environment",
    color: "#5FA04E",
    glow: "rgba(95, 160, 78, 0.45)",
    icon: (
      <NodeJs
        size={44}
        className="transition-transform duration-300 group-hover/card:scale-110"
      />
    ),
  },
  {
    id: "python",
    name: "Python",
    category: "AI & Data Pipelines",
    color: "#3776AB",
    glow: "rgba(55, 118, 171, 0.45)",
    icon: (
      <Python
        size={44}
        className="transition-transform duration-300 group-hover/card:scale-110"
      />
    ),
  },
  {
    id: "fastapi",
    name: "FastAPI",
    category: "High-Throughput APIs",
    color: "#05998B",
    glow: "rgba(5, 153, 139, 0.45)",
    icon: (
      <FastAPI
        size={44}
        className="transition-transform duration-300 group-hover/card:scale-110"
      />
    ),
  },
  {
    id: "openai",
    name: "OpenAI",
    category: "AI & LLM Architecture",
    color: "#10A37F",
    glow: "rgba(16, 163, 127, 0.45)",
    icon: (
      <OpenAI
        size={44}
        className="transition-transform duration-300 group-hover/card:scale-110"
      />
    ),
  },
  {
    id: "supabase",
    name: "Supabase",
    category: "Backend & Auth",
    color: "#3ECF8E",
    glow: "rgba(62, 207, 142, 0.45)",
    icon: (
      <Supabase
        size={44}
        className="transition-transform duration-300 group-hover/card:scale-110"
      />
    ),
  },
  {
    id: "prisma",
    name: "Prisma",
    category: "Type-Safe ORM",
    color: "#5A67D8",
    glow: "rgba(90, 103, 216, 0.45)",
    icon: (
      <Prisma
        size={44}
        className="transition-transform duration-300 group-hover/card:scale-110"
      />
    ),
  },
  {
    id: "redis",
    name: "Redis",
    category: "In-Memory Cache",
    color: "#DC382D",
    glow: "rgba(220, 56, 45, 0.45)",
    icon: (
      <Redis
        size={44}
        className="transition-transform duration-300 group-hover/card:scale-110"
      />
    ),
  },
  {
    id: "docker",
    name: "Docker",
    category: "Containerization",
    color: "#2496ED",
    glow: "rgba(36, 150, 237, 0.45)",
    icon: (
      <Docker
        size={44}
        className="transition-transform duration-300 group-hover/card:scale-110"
      />
    ),
  },
  {
    id: "graphql",
    name: "GraphQL",
    category: "API Query Language",
    color: "#E10098",
    glow: "rgba(225, 0, 152, 0.45)",
    icon: (
      <GraphQL
        size={44}
        className="transition-transform duration-300 group-hover/card:scale-110"
      />
    ),
  },
  {
    id: "threejs",
    name: "Three.js",
    category: "3D & WebGL Canvas",
    color: "#00ff66",
    glow: "rgba(0, 255, 102, 0.45)",
    icon: (
      <ThreeJsLight
        size={44}
        className="transition-transform duration-300 group-hover/card:scale-110"
      />
    ),
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "NoSQL Database",
    color: "#47A248",
    glow: "rgba(71, 162, 72, 0.45)",
    icon: (
      <MongoDB
        size={44}
        className="transition-transform duration-300 group-hover/card:scale-110"
      />
    ),
  },
  {
    id: "git",
    name: "Git",
    category: "Version Control",
    color: "#F05032",
    glow: "rgba(240, 80, 50, 0.45)",
    icon: (
      <Git
        size={44}
        className="transition-transform duration-300 group-hover/card:scale-110"
      />
    ),
  },
  {
    id: "figma",
    name: "Figma",
    category: "UI/UX & Prototyping",
    color: "#F24E1E",
    glow: "rgba(242, 78, 30, 0.45)",
    icon: (
      <Figma
        size={44}
        className="transition-transform duration-300 group-hover/card:scale-110"
      />
    ),
  },
];

const mono = "var(--font-jetbrains-mono, 'JetBrains Mono', ui-monospace, monospace)";

export default function TechStackMarquee(): JSX.Element {
  const [hoveredTech, setHoveredTech] = useState<TechItem | null>(null);

  // Replicate list 3x for uninterrupted smooth loop
  const marqueeItems = [...TECHNOLOGIES, ...TECHNOLOGIES, ...TECHNOLOGIES];

  return (
    <section
      id="skills"
      className="relative w-full overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32"
      style={{ background: "#030303" }}
      aria-label="Skills and Core Technologies"
    >
      {/* Blueprint Grid Background matching portfolio aesthetic */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,102,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,102,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 50% at 50% 50%, black 25%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      {/* Ambient Neon Glow Spotlights */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 45%, rgba(0,255,102,0.08) 0%, rgba(0,229,255,0.03) 40%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      {/* Header Container */}
      <div className="relative z-[10] max-w-[1300px] mx-auto px-6 md:px-10 lg:px-16 mb-12 sm:mb-16">
        {/* SKILLS Badge from reference */}
        <div className="flex items-center gap-3 mb-5">
          <span
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#00ff66]/40 bg-[#00ff66]/10 text-[#00ff66] text-xs font-semibold tracking-[0.2em] uppercase shadow-[0_0_15px_rgba(0,255,102,0.2)]"
            style={{ fontFamily: mono }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] shadow-[0_0_8px_#00ff66] animate-pulse" />
            SKILLS
          </span>
          <span className="text-xs text-zinc-500 font-mono tracking-wider hidden sm:inline-block">
            // TECH STACK ARCHITECTURE
          </span>
        </div>

        {/* Primary Headline Matching Reference Image */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold tracking-tight text-white leading-[1.12] max-w-4xl">
          A stack proven across{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff66] to-[#00e5ff]">
            AI products,
          </span>{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff66] to-[#00e5ff]">
            SaaS MVPs, and automations.
          </span>
        </h2>

        {/* Live Architecture Inspector readout */}
        <div className="mt-6 flex items-center gap-3 min-h-[28px] font-mono text-xs">
          <span className="text-zinc-500">SYSTEM.INSPECT:</span>
          {hoveredTech ? (
            <span className="inline-flex items-center gap-2 text-[#00ff66] transition-all duration-200">
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: hoveredTech.color,
                  boxShadow: `0 0 8px ${hoveredTech.color}`,
                }}
              />
              <strong className="text-white">{hoveredTech.name}</strong>
              <span className="text-zinc-400">— {hoveredTech.category}</span>
            </span>
          ) : (
            <span className="text-zinc-600">Hover any technology card to inspect architecture layer</span>
          )}
        </div>
      </div>

      {/* Marquee Track Container with Hover-Pause & Edge Fade Masks */}
      <div className="relative w-full overflow-hidden select-none group py-4">
        {/* Left Fade Mask */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-44 md:w-64 bg-gradient-to-r from-[#030303] via-[#030303]/80 to-transparent z-20 pointer-events-none" />

        {/* Right Fade Mask */}
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-44 md:w-64 bg-gradient-to-l from-[#030303] via-[#030303]/80 to-transparent z-20 pointer-events-none" />

        {/* Running Marquee Track */}
        <div className="flex w-max gap-4 sm:gap-6 animate-marquee group-hover:[animation-play-state:paused] will-change-transform">
          {marqueeItems.map((tech, index) => {
            const isHovered = hoveredTech?.id === tech.id;

            return (
              <div
                key={`${tech.id}-${index}`}
                onMouseEnter={() => setHoveredTech(tech)}
                onMouseLeave={() => setHoveredTech(null)}
                className="group/card relative flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl md:rounded-[22px] cursor-pointer transition-all duration-300 ease-out"
                style={{
                  background: isHovered
                    ? "linear-gradient(145deg, #0f1512 0%, #0a0c0e 100%)"
                    : "linear-gradient(145deg, #090a0c 0%, #050607 100%)",
                  border: isHovered
                    ? `1px solid ${tech.color}`
                    : "1px solid rgba(255, 255, 255, 0.08)",
                  boxShadow: isHovered
                    ? `0 0 26px ${tech.glow}, inset 0 1px 0 rgba(255,255,255,0.15)`
                    : "inset 0 1px 0 rgba(255,255,255,0.04), 0 8px 24px rgba(0,0,0,0.6)",
                  transform: isHovered ? "translateY(-4px) scale(1.05)" : "translateY(0) scale(1)",
                }}
              >
                {/* Subtle top inner glare */}
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.04] to-transparent rounded-t-2xl pointer-events-none" />

                {/* SVG Icon from developer-icons */}
                <div className="relative z-10 flex items-center justify-center mb-1">
                  {tech.icon}
                </div>

                {/* Name Label */}
                <span
                  className="absolute bottom-2 sm:bottom-2.5 text-[10px] font-mono tracking-wider transition-opacity duration-200 z-10"
                  style={{
                    color: isHovered ? tech.color : "rgba(255, 255, 255, 0.4)",
                    opacity: isHovered ? 1 : 0.65,
                  }}
                >
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
