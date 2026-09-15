"use client";

import React, { useState } from "react";
import ProjectsCarousel, { ProjectItem } from "./ProjectsCarousel";

import aiAgentImg from "@/assets/projects/ai-agent.jpg";
import saasPlatformImg from "@/assets/projects/saas-platform.jpg";
import cryptoTerminalImg from "@/assets/projects/crypto-terminal.jpg";
import creativeStudioImg from "@/assets/projects/creative-studio.jpg";
import ragEngineImg from "@/assets/projects/rag-engine.jpg";

const PROJECTS: ProjectItem[] = [
  {
    id: "neuro-agent",
    title: "Neuro-Agent :: Autonomous Workflow Core",
    category: "AI AGENTS & RAG",
    tagline: "High-throughput multi-agent execution pipeline",
    description:
      "Enterprise autonomous agent system coordinating distributed LLM reasoning workers with live vector memories, self-correcting code synthesis, and sub-15ms streaming latency.",
    year: "2026",
    stack: ["PYTHON", "LANGCHAIN", "FASTAPI", "VECTOR DB", "NEXT.JS"],
    metrics: "14ms Latency / 96.7% Accuracy",
    image: aiAgentImg,
    link: "#",
    github: "#",
  },
  {
    id: "aether-saas",
    title: "Aether :: High-Performance SaaS Engine",
    category: "SAAS MVP PLATFORM",
    tagline: "Scalable multi-tenant recurring revenue infrastructure",
    description:
      "Full-stack production SaaS dashboard with real-time financial tracking, Stripe automated billing, usage-based telemetry, and instantaneous Postgres query optimization.",
    year: "2025",
    stack: ["NEXT.JS 15", "POSTGRESQL", "PRISMA", "TAILWIND", "STRIPE"],
    metrics: "$140k+ ARR Handled / 99.99% Uptime",
    image: saasPlatformImg,
    link: "#",
    github: "#",
  },
  {
    id: "cybercrypt-dex",
    title: "CyberCrypt :: Real-Time Trading Terminal",
    category: "DEFI & WEB3 TERMINAL",
    tagline: "Sub-millisecond orderbook & liquidity analytics",
    description:
      "Modern dark-mode Web3 trading terminal featuring WebSocket live depth chart streaming, algorithmic order routing, and instant wallet execution.",
    year: "2025",
    stack: ["REACT", "TYPESCRIPT", "WEBSOCKETS", "ETHERS.JS", "GSAP"],
    metrics: "12.4 ETH Volume / 0-lag Charting",
    image: cryptoTerminalImg,
    link: "#",
    github: "#",
  },
  {
    id: "neon-genesis",
    title: "Neon Genesis :: Generative 3D Studio",
    category: "CREATIVE TECH & 3D",
    tagline: "Browser-based generative mesh & shader engine",
    description:
      "Interactive 3D sculpting and procedural shader canvas powered by WebGL and Three.js with real-time parametric deformation and timeline keyframe animation.",
    year: "2024",
    stack: ["THREE.JS", "WEBGL", "GLSL SHADERS", "REACT THREE FIBER"],
    metrics: "60 FPS Render / 8k Export",
    image: creativeStudioImg,
    link: "#",
    github: "#",
  },
  {
    id: "neural-vortex",
    title: "Neural Vortex :: RAG Knowledge Base",
    category: "ENTERPRISE AI SEARCH",
    tagline: "Semantic cluster indexing & generative retrieval",
    description:
      "Document ingestion and clustering engine indexing 50,000+ complex technical documents with hybrid dense-sparse vector search and hallucination mitigation guards.",
    year: "2024",
    stack: ["PINECONE", "OPENAI", "PYTHON", "REACT 19", "TAILWIND"],
    metrics: "50k+ Docs Clustered / 98% Relevancy",
    image: ragEngineImg,
    link: "#",
    github: "#",
  },
];

const mono = "var(--font-jetbrains-mono, 'JetBrains Mono', ui-monospace, monospace)";

export default function ProjectsSection(): JSX.Element {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section
      id="work"
      className="relative w-full overflow-hidden pt-12 pb-28 lg:pt-16 lg:pb-36"
      style={{ background: "#030303" }}
      aria-label="Selected Projects"
    >
      {/* Blueprint Grid Background matching theme */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,102,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,102,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      {/* Radial Green Spotlight */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 45%, rgba(0,255,102,0.09) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Section Content */}
      <div className="relative z-[10] max-w-[1300px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* Section Header matching Skills & Process style */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-5">
            <span
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#00ff66]/40 bg-[#00ff66]/10 text-[#00ff66] text-xs font-semibold tracking-[0.2em] uppercase shadow-[0_0_15px_rgba(0,255,102,0.2)]"
              style={{ fontFamily: mono }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] shadow-[0_0_8px_#00ff66] animate-pulse" />
              WORK
            </span>
            <span className="text-xs text-zinc-500 font-mono tracking-wider hidden sm:inline-block">
              // FEATURED SYSTEMS & APPS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold tracking-tight text-white leading-[1.12] max-w-4xl">
            Crafted with purpose,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff66] to-[#00e5ff]">
              shipped to production.
            </span>
          </h2>
        </div>

        {/* 3D Convex Arched Carousel Reel */}
        <ProjectsCarousel
          projects={PROJECTS}
          activeIndex={activeIndex}
          onSelectProject={setActiveIndex}
        />
      </div>
    </section>
  );
}
