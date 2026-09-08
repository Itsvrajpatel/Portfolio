"use client";

import React, { useState } from "react";

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
      <svg viewBox="0 0 128 128" className="w-11 h-11 sm:w-13 sm:h-13 transition-transform duration-300 group-hover/card:scale-110">
        <path
          fill="#336791"
          d="M64 7.2C32.6 7.2 7.2 32.6 7.2 64s25.4 56.8 56.8 56.8 56.8-25.4 56.8-56.8S95.4 7.2 64 7.2zm0 10.7c19.3 0 35.8 11.5 43.1 27.9-1.9-.4-3.8-.7-5.9-.7-10.4 0-19.4 6-23.7 14.8-1.5-.2-3-.3-4.5-.3-12.7 0-23 10.3-23 23 0 2.2.3 4.4.9 6.4-1.3-.2-2.7-.3-4.1-.3-10.6 0-19.3 7.8-20.8 17.9C18.6 96.6 14.7 80.8 14.7 64c0-27.2 22.1-49.3 49.3-49.3zm1.1 52.1c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z"
        />
        <path
          fill="#4285F4"
          d="M88.7 45.4c-4.2 0-8.1 1.7-11 4.5 4.8 7.3 12.2 12.8 21.1 15.1 1.3-4.1 2-8.5 2-13.1 0-3.6-.8-7-2.1-10.1-3 2.2-6.4 3.6-10 3.6z"
        />
        <circle cx="65" cy="86" r="7" fill="#68B5E8" />
      </svg>
    ),
  },
  {
    id: "react",
    name: "React",
    category: "UI Library",
    color: "#61DAFB",
    glow: "rgba(97, 218, 251, 0.45)",
    icon: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-11 h-11 sm:w-13 sm:h-13 transition-transform duration-300 group-hover/card:scale-110">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    id: "supabase",
    name: "Supabase",
    category: "Backend & Auth",
    color: "#3ECF8E",
    glow: "rgba(62, 207, 142, 0.45)",
    icon: (
      <svg viewBox="0 0 109 113" fill="none" className="w-11 h-11 sm:w-13 sm:h-13 transition-transform duration-300 group-hover/card:scale-110">
        <path
          d="M63.7076 110.284C60.8481 113.885 55.0754 111.913 54.9818 107.314L53.9738 57.8162H96.0044C104.058 57.8162 108.572 67.0734 103.578 73.3633L63.7076 110.284Z"
          fill="#3ECF8E"
        />
        <path
          d="M45.317 2.70617C48.1765 -0.894372 53.9492 1.07724 54.0428 5.67669L54.3475 55.1748H13.0202C4.96695 55.1748 0.452601 45.9176 5.44634 39.6277L45.317 2.70617Z"
          fill="#249361"
        />
      </svg>
    ),
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Styling Framework",
    color: "#38BDF8",
    glow: "rgba(56, 189, 248, 0.45)",
    icon: (
      <svg viewBox="0 0 24 24" fill="#38BDF8" className="w-11 h-11 sm:w-13 sm:h-13 transition-transform duration-300 group-hover/card:scale-110">
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
      </svg>
    ),
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Typed JavaScript",
    color: "#3178C6",
    glow: "rgba(49, 120, 198, 0.45)",
    icon: (
      <svg viewBox="0 0 128 128" className="w-11 h-11 sm:w-13 sm:h-13 transition-transform duration-300 group-hover/card:scale-110">
        <rect width="128" height="128" rx="24" fill="#3178C6" />
        <path
          fill="#FFFFFF"
          d="M64.6 57.9h-15v47.2h-9.8V57.9H24.8V50h39.8v7.9zm41.2 18.2c0 2.2-.4 4.3-1.3 6.3-.9 1.9-2.2 3.6-3.8 5-1.6 1.4-3.5 2.5-5.8 3.3-2.3.8-4.8 1.2-7.5 1.2-3.1 0-6.1-.5-8.9-1.6-2.8-1.1-5.1-2.7-7-4.8l5.8-6.1c1.5 1.7 3.3 2.9 5.2 3.8 1.9.9 3.9 1.3 5.9 1.3 2.8 0 4.9-.6 6.3-1.7 1.4-1.1 2.1-2.6 2.1-4.4 0-1.4-.5-2.6-1.6-3.6-1.1-1-2.8-1.9-5.1-2.7l-4.7-1.7c-3.6-1.3-6.5-3.1-8.5-5.3-2-2.2-3-5.1-3-8.6 0-2.3.5-4.5 1.5-6.4 1-1.9 2.4-3.6 4.1-4.9 1.7-1.3 3.7-2.3 6-3 2.3-.7 4.7-1 7.2-1 2.9 0 5.6.4 8.1 1.3 2.5.9 4.6 2.2 6.3 3.9l-5.3 6.2c-1.3-1.3-2.8-2.3-4.5-2.9-1.7-.7-3.4-1-5.2-1-2.4 0-4.3.5-5.6 1.5-1.3 1-2 2.3-2 3.9 0 1.3.5 2.4 1.5 3.3 1 1 2.5 1.8 4.6 2.5l5.2 1.9c3.9 1.4 6.8 3.2 8.7 5.5 1.8 2.2 2.8 5 2.8 8.4z"
        />
      </svg>
    ),
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Full-Stack React",
    color: "#FFFFFF",
    glow: "rgba(255, 255, 255, 0.35)",
    icon: (
      <svg viewBox="0 0 180 180" fill="none" className="w-11 h-11 sm:w-13 sm:h-13 transition-transform duration-300 group-hover/card:scale-110">
        <circle cx="90" cy="90" r="86" fill="black" stroke="rgba(255,255,255,0.25)" strokeWidth="6" />
        <path
          d="M149.508 157.438L69.1415 54H54V125.979H66.6136V69.3831L139.999 164.845C143.333 162.614 146.509 160.137 149.508 157.438Z"
          fill="url(#next_marquee_paint)"
        />
        <rect x="115" y="54" width="12.6" height="72" fill="white" />
        <defs>
          <linearGradient id="next_marquee_paint" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    id: "python",
    name: "Python",
    category: "AI & Data Pipelines",
    color: "#3776AB",
    glow: "rgba(55, 118, 171, 0.45)",
    icon: (
      <svg viewBox="0 0 110 110" className="w-11 h-11 sm:w-13 sm:h-13 transition-transform duration-300 group-hover/card:scale-110">
        <path
          fill="#3776AB"
          d="M54.4 2C27.6 2 29.3 13.6 29.3 13.6l.03 12.1h25.4v3.6H19.2S2 27.2 2 54.2c0 27 15 25.8 15 25.8h8.9v-12.5s-.5-15 14.7-15h25.2s14.2.2 14.2-13.8V15.8S81.8 2 54.4 2zM41.7 10.4c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5z"
        />
        <path
          fill="#FFD43B"
          d="M55.6 108c26.8 0 25.1-11.6 25.1-11.6l-.03-12.1H55.3v-3.6h35.5s17.2 2.1 17.2-24.9c0-27-15-25.8-15-25.8h-8.9v12.5s.5 15-14.7 15H44.2s-14.2-.2-14.2 13.8v12.9s-1.8 13.8 25.6 13.8zm12.7-8.4c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"
        />
      </svg>
    ),
  },
  {
    id: "fastapi",
    name: "FastAPI",
    category: "High-Throughput APIs",
    color: "#05998B",
    glow: "rgba(5, 153, 139, 0.45)",
    icon: (
      <svg viewBox="0 0 128 128" className="w-11 h-11 sm:w-13 sm:h-13 transition-transform duration-300 group-hover/card:scale-110">
        <circle cx="64" cy="64" r="60" fill="#05998B" />
        <path fill="white" d="M69.6 18.5L34 70.8h25.3l-5.5 38.7 40.2-54.8H67.2l2.4-36.2z" />
      </svg>
    ),
  },
  {
    id: "langchain",
    name: "LangChain",
    category: "Agent Orchestration",
    color: "#00ff66",
    glow: "rgba(0, 255, 102, 0.4)",
    icon: (
      <svg viewBox="0 0 100 100" className="w-11 h-11 sm:w-13 sm:h-13 transition-transform duration-300 group-hover/card:scale-110">
        <rect x="6" y="6" width="88" height="88" rx="22" fill="#06180f" stroke="#00ff66" strokeWidth="3" />
        <path d="M30 50h40M50 30v40M35 35l30 30M65 35L35 65" stroke="#00ff66" strokeWidth="4" strokeLinecap="round" />
        <circle cx="50" cy="50" r="7" fill="#00ff66" />
      </svg>
    ),
  },
  {
    id: "docker",
    name: "Docker",
    category: "Containerization",
    color: "#2496ED",
    glow: "rgba(36, 150, 237, 0.45)",
    icon: (
      <svg viewBox="0 0 24 24" fill="#2496ED" className="w-11 h-11 sm:w-13 sm:h-13 transition-transform duration-300 group-hover/card:scale-110">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.186.185.186zm0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186zm-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm-2.954 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.145a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm5.884 2.714h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185zm-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186H8.1a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185zm-2.954 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.145a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185zm-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-1.04.14-2.168.618-2.618 1.488H.795a.8.8 0 00-.795.801c0 5.508 4.49 9.99 10.015 9.99 8.163 0 13.064-5.066 13.818-10.428.04-.3.04-.474.02-.555l-.09-.435z" />
      </svg>
    ),
  },
  {
    id: "redis",
    name: "Redis",
    category: "In-Memory Cache",
    color: "#DC382D",
    glow: "rgba(220, 56, 45, 0.45)",
    icon: (
      <svg viewBox="0 0 128 128" className="w-11 h-11 sm:w-13 sm:h-13 transition-transform duration-300 group-hover/card:scale-110">
        <path
          fill="#DC382D"
          d="M118.8 77.4l-50 28.9c-2.9 1.7-6.5 1.7-9.4 0l-50.2-29C6.4 75.6 4.6 72.5 4.6 69V41.7c0-3.5 1.9-6.6 4.9-8.3l50-28.9c2.9-1.7 6.5-1.7 9.4 0l50.2 29c2.9 1.7 4.7 4.8 4.7 8.3V69c0 3.5-1.9 6.6-5 8.4z"
        />
        <circle cx="50" cy="54" r="5" fill="#FFFFFF" />
        <circle cx="78" cy="54" r="5" fill="#FFFFFF" />
        <circle cx="64" cy="70" r="5" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    id: "prisma",
    name: "Prisma",
    category: "Type-Safe ORM",
    color: "#5A67D8",
    glow: "rgba(90, 103, 216, 0.45)",
    icon: (
      <svg viewBox="0 0 128 128" className="w-11 h-11 sm:w-13 sm:h-13 transition-transform duration-300 group-hover/card:scale-110">
        <path
          fill="#5A67D8"
          d="M104.9 98.4L68.7 13.9c-2.3-5.4-9.8-5.7-12.4-.6L18.4 89.2c-2.8 5.4.8 11.9 6.8 12.3l69.8 4.5c6.2.4 11.8-4.2 9.9-7.6z"
        />
        <path fill="#FFFFFF" d="M64 24.8l29.8 69.5-38.3-2.5L64 24.8z" />
      </svg>
    ),
  },
  {
    id: "graphql",
    name: "GraphQL",
    category: "API Query Language",
    color: "#E10098",
    glow: "rgba(225, 0, 152, 0.45)",
    icon: (
      <svg viewBox="0 0 128 128" className="w-11 h-11 sm:w-13 sm:h-13 transition-transform duration-300 group-hover/card:scale-110">
        <path
          fill="none"
          stroke="#E10098"
          strokeWidth="7"
          d="M64 14l43 25v50L64 114 21 89V39z"
        />
        <circle cx="64" cy="14" r="9" fill="#E10098" />
        <circle cx="107" cy="39" r="9" fill="#E10098" />
        <circle cx="107" cy="89" r="9" fill="#E10098" />
        <circle cx="64" cy="114" r="9" fill="#E10098" />
        <circle cx="21" cy="89" r="9" fill="#E10098" />
        <circle cx="21" cy="39" r="9" fill="#E10098" />
        <path fill="none" stroke="#E10098" strokeWidth="5" d="M64 14L21 89h86L64 14z" />
      </svg>
    ),
  },
  {
    id: "threejs",
    name: "Three.js",
    category: "3D & WebGL Canvas",
    color: "#00ff66",
    glow: "rgba(0, 255, 102, 0.45)",
    icon: (
      <svg viewBox="0 0 128 128" className="w-11 h-11 sm:w-13 sm:h-13 transition-transform duration-300 group-hover/card:scale-110">
        <path
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="6"
          strokeLinejoin="round"
          d="M64 18l46 76H18L64 18z"
        />
        <path
          fill="none"
          stroke="#00ff66"
          strokeWidth="5"
          strokeLinejoin="round"
          d="M64 18v76M18 94l69-38M110 94L41 56"
        />
      </svg>
    ),
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "Runtime Environment",
    color: "#5FA04E",
    glow: "rgba(95, 160, 78, 0.45)",
    icon: (
      <svg viewBox="0 0 128 128" className="w-11 h-11 sm:w-13 sm:h-13 transition-transform duration-300 group-hover/card:scale-110">
        <path
          fill="#5FA04E"
          d="M64 8.5L14 37.4v57.8L64 124l50-28.8V37.4L64 8.5zm0 14.5l37.5 21.6v43.2L64 109.5 26.5 87.8V44.6L64 23z"
        />
        <circle cx="64" cy="66" r="14" fill="#83CD29" />
      </svg>
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

                {/* SVG Icon */}
                <div className="relative z-10 flex items-center justify-center">
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
