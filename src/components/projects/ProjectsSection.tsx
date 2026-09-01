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
        
        {/* Section Header — styled identical to About and Services */}
        <div className="text-center mb-10 lg:mb-16">
          <span
            className="inline-block text-[11px] font-semibold tracking-[0.25em] uppercase mb-6"
            style={{ fontFamily: mono, color: "#00ff66" }}
          >
            {"// selected work"}
          </span>
          <h2 className="font-bold tracking-tighter leading-[0.88]">
            <span
              className="block"
              style={{ fontSize: "clamp(3.5rem, 12vw, 8rem)", color: "#009933", opacity: 0.85 }}
            >
              Featured
            </span>
            <span
              className="block text-transparent"
              style={{
                fontSize: "clamp(3.5rem, 12vw, 8rem)",
                WebkitTextStroke: "2px rgba(0,255,102,0.35)",
              }}
            >
              Projects
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
