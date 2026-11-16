import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  PROJECTS_DATA,
  getProjectById,
  getAllProjectIds,
} from "@/data/projectsData";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import ProjectScreenTour from "@/components/projects/ProjectScreenTour";
import characterImg from "@/assets/character.png";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Github,
  CheckCircle2,
  Sparkles,
  Layers,
  Code2,
  Cpu,
  ShieldCheck,
  Terminal,
} from "lucide-react";

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return getAllProjectIds().map((id) => ({ id }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = getProjectById(params.id);
  if (!project) {
    return { title: "Project Not Found" };
  }
  return {
    title: `${project.title} — Selected Project | Vraj Patel`,
    description: project.overview,
  };
}

const mono = "var(--font-jetbrains-mono, 'JetBrains Mono', ui-monospace, monospace)";

export default function ProjectDetailPage({ params }: ProjectPageProps): JSX.Element {
  const project = getProjectById(params.id);

  if (!project) {
    notFound();
  }

  // Next and Previous projects for fluid navigation
  const nextProject = getProjectById(project.nextProjectId) || PROJECTS_DATA[0];

  return (
    <>
      <SmoothScroll />

      <main className="relative min-h-screen w-full bg-[#030303] text-white selection:bg-[#00ff66] selection:text-black font-sans pb-28 overflow-x-hidden">
        {/* ── Background Blueprint Grid ────────────────────────────────────────── */}
        <div
          className="fixed inset-0 z-[1] pointer-events-none opacity-25"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 102, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 102, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 10%, black 30%, transparent 90%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 10%, black 30%, transparent 90%)",
          }}
          aria-hidden="true"
        />

        {/* Ambient Top Glow */}
        <div
          className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] z-[2] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0, 255, 102, 0.09) 0%, rgba(99, 102, 241, 0.05) 45%, transparent 75%)",
            filter: "blur(70px)",
          }}
          aria-hidden="true"
        />

        {/* ── Fixed Floating Pill Navbar (identical to homepage) ──────────── */}
        <Navbar activeSection="Work" />

        {/* ── Back to Work Link ─────────────────────────────────────────────── */}
        <div className="relative z-10 max-w-[1240px] mx-auto px-6 md:px-10 pt-24 sm:pt-28 pb-3">
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors tracking-wider"
            style={{ fontFamily: mono }}
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-[#00ff66]" />
            <span>Back to Work</span>
          </Link>
        </div>

        {/* ── Project Header Section (with 3D Badge on Right) ───────────────── */}
        <section className="relative z-10 max-w-[1240px] mx-auto px-6 md:px-10 pt-4 pb-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            {/* Title & Overview */}
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold tracking-tight text-white leading-[1.1]">
                {project.title}
              </h1>
              <p className="mt-4 text-sm sm:text-base text-zinc-400 font-normal leading-relaxed max-w-2xl">
                {project.overview}
              </p>
            </div>

            {/* Top-Right 3D Illustration / Character Badge (matching screenshot) */}
            <div className="relative flex-shrink-0 self-center md:self-start">
              <div className="relative w-36 h-28 sm:w-44 sm:h-32 flex items-center justify-center">
                {/* Background glow halo */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none opacity-50"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, rgba(0, 255, 102, 0.15) 50%, transparent 75%)",
                    filter: "blur(18px)",
                  }}
                />

                {/* Character preview */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 z-10 drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]">
                  <Image
                    src={characterImg}
                    alt="Vraj 3D Character"
                    fill
                    sizes="112px"
                    className="object-contain object-bottom"
                    priority
                  />
                </div>

                {/* Floating 3D Speech Bubbles / HUD Accents */}
                <div className="absolute -top-1 -right-1 z-20 px-2 py-1 rounded-lg bg-indigo-900/90 border border-indigo-500/40 text-[9px] font-mono text-indigo-200 shadow-[0_0_12px_rgba(99,102,241,0.4)] backdrop-blur-md animate-bounce" style={{ animationDuration: "3s" }}>
                  <span>PROD READY</span>
                </div>

                <div className="absolute -bottom-1 -left-2 z-20 px-2.5 py-0.5 rounded-full bg-[#00ff66]/15 border border-[#00ff66]/40 text-[9px] font-mono text-[#00ff66] shadow-[0_0_10px_rgba(0,255,102,0.3)] backdrop-blur-md">
                  <span>{project.year}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Guided Product Tour Browser Component ──────────────────────── */}
          <ProjectScreenTour project={project} />

          {/* ── 2-Column Detailed Case Study Breakdown ──────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-14 pt-10 border-t border-white/[0.08]">
            {/* Left Column (65% width) - Context, Focus, Shipped */}
            <div className="lg:col-span-8 space-y-12">
              {/* Section 1: Project context */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[#00ff66] font-mono text-sm">—</span>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    Project context
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed pl-5 border-l border-white/10">
                  {project.context}
                </p>
              </div>

              {/* Section 2: What I focused on */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[#00ff66] font-mono text-sm">—</span>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    What I focused on
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed pl-5 border-l border-white/10">
                  {project.focusedOn}
                </p>
              </div>

              {/* Section 3: What I shipped */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[#00ff66] font-mono text-sm">—</span>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    What I shipped
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed pl-5 border-l border-white/10 mb-4">
                  {project.shipped}
                </p>

                {/* Key feature highlights list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-5 mt-4">
                  {project.screens.map((screen, idx) => (
                    <div
                      key={screen.id}
                      className="p-3.5 rounded-xl border border-white/[0.08] bg-[#0c0d12]/70 backdrop-blur-md flex items-start gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#00ff66]/10 border border-[#00ff66]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff66]" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-white block">
                          {screen.tabLabel}
                        </span>
                        <span className="text-[11px] text-zinc-400 leading-normal block mt-0.5">
                          {screen.pillars[0]?.description || screen.subtitle}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 4: Why it matters */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[#00ff66] font-mono text-sm">—</span>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    Why it matters
                  </h3>
                </div>
                <div className="pl-5 border-l border-[#00ff66]/40 bg-[#00ff66]/[0.02] py-3 pr-4 rounded-r-xl">
                  <p className="text-sm sm:text-base text-zinc-200 leading-relaxed">
                    {project.whyItMatters}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column (35% width sidebar) - Role, Tech Stack, Links */}
            <div className="lg:col-span-4 space-y-5">
              {/* Card 1: ROLE */}
              <div className="rounded-2xl border border-white/10 bg-[#0c0d14]/80 p-5 sm:p-6 backdrop-blur-md shadow-[0_15px_30px_rgba(0,0,0,0.4)]">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66]" />
                  <span
                    className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400 font-semibold"
                    style={{ fontFamily: mono }}
                  >
                    Role
                  </span>
                </div>
                <div className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {project.role}
                </div>
                <div
                  className="text-xs text-zinc-500 font-mono mt-1"
                  style={{ fontFamily: mono }}
                >
                  ENGINEERING LEAD & AUTHOR
                </div>
              </div>

              {/* Card 2: TECH STACK */}
              <div className="rounded-2xl border border-white/10 bg-[#0c0d14]/80 p-5 sm:p-6 backdrop-blur-md shadow-[0_15px_30px_rgba(0,0,0,0.4)]">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66]" />
                  <span
                    className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400 font-semibold"
                    style={{ fontFamily: mono }}
                  >
                    Tech Stack
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 hover:border-[#00ff66]/40 text-xs font-mono text-zinc-300 hover:text-white transition-all shadow-sm"
                      style={{ fontFamily: mono }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card 3: LINKS */}
              <div className="rounded-2xl border border-white/10 bg-[#0c0d14]/80 p-5 sm:p-6 backdrop-blur-md shadow-[0_15px_30px_rgba(0,0,0,0.4)]">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66]" />
                  <span
                    className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400 font-semibold"
                    style={{ fontFamily: mono }}
                  >
                    Links
                  </span>
                </div>

                <div className="space-y-2.5">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between w-full px-4 py-3 rounded-xl bg-[#00ff66]/10 hover:bg-[#00ff66]/20 border border-[#00ff66]/40 text-[#00ff66] text-xs font-semibold tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(0,255,102,0.15)]"
                      style={{ fontFamily: mono }}
                    >
                      <div className="flex items-center gap-2.5">
                        <ExternalLink className="w-4 h-4" />
                        <span>VISIT LIVE PROJECT</span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between w-full px-4 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-white text-xs font-semibold tracking-wider transition-all duration-300"
                      style={{ fontFamily: mono }}
                    >
                      <div className="flex items-center gap-2.5">
                        <Github className="w-4 h-4 text-zinc-400 group-hover:text-white" />
                        <span>GITHUB REPOSITORY</span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Card 4: AUDIT & METRICS */}
              <div className="rounded-2xl border border-white/10 bg-[#0c0d14]/80 p-5 sm:p-6 backdrop-blur-md shadow-[0_15px_30px_rgba(0,0,0,0.4)]">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66]" />
                  <span
                    className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400 font-semibold"
                    style={{ fontFamily: mono }}
                  >
                    Performance & Metrics
                  </span>
                </div>
                <div
                  className="text-xs font-mono text-[#00ff66] bg-[#00ff66]/10 px-3 py-2 rounded-lg border border-[#00ff66]/20"
                  style={{ fontFamily: mono }}
                >
                  {project.metrics}
                </div>
              </div>
            </div>
          </div>

          {/* ── Next Project Banner Card (matching bottom of screenshot) ──────── */}
          <div className="mt-16 pt-8 border-t border-white/[0.08]">
            <Link
              href={`/work/${nextProject.id}`}
              className="group relative block w-full rounded-2xl border border-white/10 bg-gradient-to-r from-[#0d0d14] via-[#10101a] to-[#0a0a0f] p-6 sm:p-8 hover:border-[#00ff66]/50 transition-all duration-500 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
            >
              {/* Subtle hover gradient wash */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#00ff66]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <span
                    className="text-[11px] font-mono tracking-[0.2em] text-[#00ff66] uppercase block mb-1 font-semibold"
                    style={{ fontFamily: mono }}
                  >
                    NEXT PROJECT
                  </span>
                  <span className="text-xs text-zinc-500 font-mono tracking-wider block mb-2">
                    {nextProject.category}
                  </span>
                  <div className="flex items-center gap-3">
                    <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight group-hover:text-[#00ff66] transition-colors">
                      {nextProject.title}
                    </h4>
                    <div className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/70 group-hover:text-[#00ff66] group-hover:border-[#00ff66]/40 group-hover:bg-[#00ff66]/10 transition-all duration-300">
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>

                {/* Right Miniature Next Project Thumbnail preview */}
                <div className="relative w-full sm:w-56 md:w-64 aspect-[16/10] rounded-xl overflow-hidden border border-white/15 group-hover:border-[#00ff66]/50 transition-colors flex-shrink-0 shadow-lg bg-[#111116]">
                  <Image
                    src={nextProject.image}
                    alt={nextProject.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 256px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/10">
                    <span
                      className="text-[10px] font-mono text-[#00ff66]"
                      style={{ fontFamily: mono }}
                    >
                      {nextProject.year}
                    </span>
                    <span className="text-[10px] font-mono text-white/90">
                      EXPLORE →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
