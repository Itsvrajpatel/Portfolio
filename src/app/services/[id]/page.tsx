import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SERVICES, getServiceById, getAllServiceIds } from "@/data/servicesData";
import SmoothScroll from "@/components/SmoothScroll";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Code2,
  Layers,
  Sparkles,
  Zap,
  HelpCircle,
  ShieldCheck,
  Calendar,
} from "lucide-react";

interface ServicePageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return getAllServiceIds().map((id) => ({ id }));
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const service = getServiceById(params.id);
  if (!service) {
    return { title: "Service Not Found" };
  }
  return {
    title: `${service.title} | Vraj Patel`,
    description: service.description,
  };
}

const mono = "var(--font-jetbrains-mono, 'JetBrains Mono', ui-monospace, monospace)";

export default function ServiceDetailPage({ params }: ServicePageProps) {
  const service = getServiceById(params.id);

  if (!service) {
    notFound();
  }

  // Find adjacent services for next/previous navigation
  const currentIndex = SERVICES.findIndex((s) => s.id === service.id);
  const prevService = SERVICES[(currentIndex - 1 + SERVICES.length) % SERVICES.length];
  const nextService = SERVICES[(currentIndex + 1) % SERVICES.length];

  return (
    <>
      <SmoothScroll />

      <main className="relative min-h-screen w-full bg-[#030303] text-white selection:bg-[#00ff66] selection:text-black font-sans pb-24 overflow-x-hidden">
        {/* ── Background Grid & Radial Spotlights ───────────────────────────── */}
        <div
          className="fixed inset-0 z-[1] pointer-events-none opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,102,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,102,0.06) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse 80% 50% at 50% 0%, black 40%, transparent 90%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 50% at 50% 0%, black 40%, transparent 90%)",
          }}
          aria-hidden="true"
        />

        <div
          className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] z-[2] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 10%, rgba(0,255,102,0.12) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          aria-hidden="true"
        />

        {/* ── Breadcrumb & Top Indicator ────────────────────────────────────── */}
          <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-10 pt-10 sm:pt-14 pb-4">
            <div
              className="flex items-center gap-2 text-xs font-mono text-zinc-500 tracking-wider"
              style={{ fontFamily: mono }}
            >
              <Link href="/" className="hover:text-white transition-colors">
                HOME
              </Link>
              <span>/</span>
              <Link href="/#services" className="hover:text-white transition-colors">
                SERVICES
              </Link>
              <span>/</span>
              <span className="text-[#00ff66] font-semibold">{service.id.toUpperCase()}</span>
            </div>
          </div>

          {/* ── HERO BANNER ──────────────────────────────────────────────────── */}
          <section className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-10 pt-6 pb-16">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-white/10">
              <div className="max-w-3xl">
                {/* Badge & Timeline */}
                <div className="flex items-center gap-3 mb-6">
                  {service.badge ? (
                    <>
                      <span
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#00ff66]/40 bg-[#00ff66]/10 text-[#00ff66] text-xs font-semibold tracking-[0.2em] uppercase shadow-[0_0_15px_rgba(0,255,102,0.15)]"
                        style={{ fontFamily: mono }}
                      >
                        <span className="w-2 h-2 rounded-full bg-[#00ff66] shadow-[0_0_8px_#00ff66] animate-pulse" />
                        {service.badge}
                      </span>
                      <span className="text-xs text-zinc-500 font-mono tracking-wider">
                      // {service.duration} ESTIMATED TIMELINE
                      </span>
                    </>
                  ) : (
                    <span
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#00ff66]/40 bg-[#00ff66]/10 text-[#00ff66] text-xs font-semibold tracking-[0.2em] uppercase shadow-[0_0_15px_rgba(0,255,102,0.15)]"
                      style={{ fontFamily: mono }}
                    >
                      <span className="w-2 h-2 rounded-full bg-[#00ff66] shadow-[0_0_8px_#00ff66] animate-pulse" />
                      {service.duration} ESTIMATED TIMELINE
                    </span>
                  )}
                </div>

                {/* Title & Subtitle */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.08] mb-6">
                  {service.title}
                </h1>

                <p className="text-lg sm:text-xl text-zinc-300 font-light leading-relaxed mb-6">
                  {service.subtitle}
                </p>

                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl">
                  {service.tagline}
                </p>
              </div>

              {/* Quick Action Box */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[240px]">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[#00ff66] text-black font-bold text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(0,255,102,0.3)] hover:shadow-[0_0_35px_rgba(0,255,102,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                  style={{ fontFamily: mono }}
                >
                  <span>BOOK THIS SERVICE</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#specs"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/10 hover:border-white/30 bg-white/[0.03] hover:bg-white/[0.08] text-white text-xs font-mono tracking-wider transition-all duration-200"
                  style={{ fontFamily: mono }}
                >
                  <span>VIEW SPECS & PROCESS</span>
                </a>
              </div>
            </div>

            {/* ── Visual Showcase Card ─────────────────────────────────────────── */}
            <div className="mt-12 grid lg:grid-cols-12 gap-8 items-center">
              {/* Image Preview */}
              <div className="lg:col-span-7">
                <div
                  className="relative rounded-2xl p-6 sm:p-10 overflow-hidden border border-white/10"
                  style={{
                    background: "radial-gradient(ellipse at 50% 50%, rgba(18,18,18,0.85) 0%, rgba(8,8,8,0.95) 100%)",
                    boxShadow: "0 25px 60px rgba(0,0,0,0.8), 0 0 35px rgba(0,255,102,0.08)",
                  }}
                >
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "radial-gradient(circle at 50% 50%, rgba(0,255,102,0.12) 0%, transparent 65%)",
                    }}
                  />

                  <div className="relative w-full aspect-[4/3] max-w-[500px] mx-auto flex items-center justify-center">
                    <div
                      className="relative w-full h-full rounded-xl overflow-hidden"
                      style={{
                        filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.9)) drop-shadow(0 0 30px rgba(0,255,102,0.25))",
                      }}
                    >
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 600px"
                        className="object-contain p-4"
                      />
                    </div>
                  </div>

                  <div
                    className="relative mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-500 font-mono tracking-wider"
                    style={{ fontFamily: mono }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse" />
                      <span className="text-zinc-300">ARCHITECTURE DIAGRAM & PREVIEW</span>
                    </div>
                    <span>[SPEC-REV.2026]</span>
                  </div>
                </div>
              </div>

              {/* Spec Matrix & Highlights */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {/* Specs Card */}
                <div
                  id="specs"
                  className="rounded-2xl p-6 sm:p-8 border border-white/10 bg-[#0a0a0a]/90 backdrop-blur-xl"
                  style={{ fontFamily: mono }}
                >
                  <h3 className="text-xs text-[#00ff66] uppercase tracking-[0.2em] font-semibold mb-6 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#00ff66]" />
                    TECHNICAL SPECIFICATION MATRIX
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start justify-between border-b border-white/[0.08] pb-3">
                      <span className="text-[11px] text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-zinc-500" /> DURATION:
                      </span>
                      <span className="text-xs font-bold text-[#00ff66] tracking-wider text-right">
                        {service.duration}
                      </span>
                    </div>

                    <div className="flex items-start justify-between border-b border-white/[0.08] pb-3">
                      <span className="text-[11px] text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                        <Code2 className="w-3.5 h-3.5 text-zinc-500" /> TECH STACK:
                      </span>
                      <span className="text-xs font-medium text-white tracking-wider text-right max-w-[200px]">
                        {service.stack}
                      </span>
                    </div>

                    <div className="flex items-start justify-between border-b border-white/[0.08] pb-3">
                      <span className="text-[11px] text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-zinc-500" /> PRIMARY DELIVERABLE:
                      </span>
                      <span className="text-xs font-medium text-white tracking-wider text-right max-w-[200px]">
                        {service.deliverables}
                      </span>
                    </div>

                    <div className="flex items-start justify-between pt-1">
                      <span className="text-[11px] text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-zinc-500" /> IP & CODE OWNERSHIP:
                      </span>
                      <span className="text-xs font-bold text-[#00ff66] tracking-wider">
                        100% TRANSFERRED
                      </span>
                    </div>
                  </div>
                </div>

                {/* Highlights Box */}
                <div className="rounded-2xl p-6 sm:p-8 border border-white/10 bg-[#080808]">
                  <h4
                    className="text-xs text-white uppercase tracking-[0.2em] font-semibold mb-4 flex items-center gap-2"
                    style={{ fontFamily: mono }}
                  >
                    <Sparkles className="w-4 h-4 text-[#00ff66]" />
                    KEY DELIVERABLE HIGHLIGHTS
                  </h4>

                  <ul className="space-y-3">
                    {service.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-[#00ff66] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* ── EXECUTIVE OVERVIEW ────────────────────────────────────────────── */}
          <section className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-10 py-16 border-t border-white/10">
            <div className="grid lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-4">
                <span
                  className="text-xs text-[#00ff66] uppercase tracking-[0.25em] font-mono block mb-3"
                  style={{ fontFamily: mono }}
                >
                // ARCHITECTURAL OVERVIEW
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                  Designed to deliver measurable impact.
                </h2>
              </div>

              <div className="lg:col-span-8">
                <div className="prose prose-invert max-w-none">
                  <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-light mb-6">
                    {service.fullOverview}
                  </p>
                  <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                    Every solution is engineered with strict type safety, clean modular structure, zero technical debt,
                    and direct alignment with your core business metrics. Whether you are bootstrapping an MVP or
                    integrating enterprise autonomous pipelines, this service delivers production-ready value from day one.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── CORE CAPABILITIES / WHAT'S INCLUDED ──────────────────────────── */}
          <section className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-10 py-16 border-t border-white/10">
            <div className="mb-12">
              <span
                className="text-xs text-[#00ff66] uppercase tracking-[0.25em] font-mono block mb-3"
                style={{ fontFamily: mono }}
              >
              // WHAT&apos;S INCLUDED
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                End-to-End Capabilities & Features
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {service.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-2xl p-6 sm:p-8 border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 hover:border-[#00ff66]/40"
                >
                  <div
                    className="absolute left-0 top-6 bottom-6 w-1 bg-transparent group-hover:bg-[#00ff66] transition-colors rounded-r"
                  />

                  <span
                    className="inline-block text-[10px] font-mono text-[#00ff66] uppercase tracking-wider px-2.5 py-1 rounded bg-[#00ff66]/10 mb-4 border border-[#00ff66]/20"
                    style={{ fontFamily: mono }}
                  >
                    {feat.tag}
                  </span>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-[#00ff66] transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── DELIVERY PROCESS (4 PHASES) ──────────────────────────────────── */}
          <section className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-10 py-16 border-t border-white/10">
            <div className="mb-12">
              <span
                className="text-xs text-[#00ff66] uppercase tracking-[0.25em] font-mono block mb-3"
                style={{ fontFamily: mono }}
              >
              // EXECUTION METHODOLOGY
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
                From Concept to Production Launch
              </h2>
              <p className="text-sm text-zinc-400">
                A transparent, battle-tested four-phase process designed for velocity and precision.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.process.map((step, idx) => (
                <div
                  key={idx}
                  className="relative rounded-2xl p-6 border border-white/10 bg-[#080808] flex flex-col justify-between hover:border-[#00ff66]/30 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4" style={{ fontFamily: mono }}>
                      <span className="text-xs font-bold text-[#00ff66] tracking-widest">{step.step}</span>
                      <span className="text-[11px] text-zinc-500">{step.timeline}</span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-3 leading-snug">{step.title}</h3>

                    <p className="text-xs text-zinc-400 leading-relaxed mb-6">{step.description}</p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.08]">
                    <span
                      className="text-[10px] uppercase font-mono text-zinc-500 tracking-wider block mb-2"
                      style={{ fontFamily: mono }}
                    >
                      DELIVERABLES:
                    </span>
                    <ul className="space-y-1.5">
                      {step.deliverables.map((deliv, dIdx) => (
                        <li key={dIdx} className="text-[11px] text-zinc-300 flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-[#00ff66]" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── TECH STACK & IDEAL FOR ───────────────────────────────────────── */}
          <section className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-10 py-16 border-t border-white/10">
            <div className="grid lg:grid-cols-12 gap-10">
              {/* Tech Stack */}
              <div className="lg:col-span-6">
                <span
                  className="text-xs text-[#00ff66] uppercase tracking-[0.25em] font-mono block mb-3"
                  style={{ fontFamily: mono }}
                >
                // TECHNOLOGY ECOSYSTEM
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-6">
                  Engineered with Modern Tooling
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  {service.techStack.map((tech, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                    >
                      <div className="text-sm font-bold text-white mb-1">{tech.name}</div>
                      <div className="text-[11px] text-zinc-400 font-mono" style={{ fontFamily: mono }}>
                        {tech.category}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ideal For */}
              <div className="lg:col-span-6">
                <span
                  className="text-xs text-[#00ff66] uppercase tracking-[0.25em] font-mono block mb-3"
                  style={{ fontFamily: mono }}
                >
                // TARGET PROFILE
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-6">
                  Who This Service Is Ideal For
                </h2>

                <div className="space-y-3">
                  {service.idealFor.map((target, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3.5 p-4 rounded-xl border border-white/10 bg-[#080808]"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#00ff66]/10 text-[#00ff66] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                        ✓
                      </div>
                      <span className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{target}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── FREQUENTLY ASKED QUESTIONS ───────────────────────────────────── */}
          <section className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-10 py-16 border-t border-white/10">
            <div className="max-w-3xl mb-12">
              <span
                className="text-xs text-[#00ff66] uppercase tracking-[0.25em] font-mono block mb-3"
                style={{ fontFamily: mono }}
              >
              // COMMON INQUIRIES
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-zinc-400">Everything you need to know about working together on this service.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {service.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl p-6 sm:p-7 border border-white/10 bg-[#080808] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 text-[#00ff66] text-xs font-mono mb-3" style={{ fontFamily: mono }}>
                      <HelpCircle className="w-4 h-4" />
                      <span>FAQ 0{idx + 1}</span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-3">{faq.question}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed pt-3 border-t border-white/[0.08]">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── BOTTOM CTA BANNER ─────────────────────────────────────────────── */}
          <section className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-10 py-16">
            <div
              className="relative rounded-3xl p-8 sm:p-12 md:p-16 overflow-hidden border border-[#00ff66]/30 text-center"
              style={{
                background: "radial-gradient(ellipse at 50% 50%, rgba(0,255,102,0.08) 0%, rgba(8,8,8,0.95) 100%)",
                boxShadow: "0 0 50px rgba(0,255,102,0.1)",
              }}
            >
              <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
                <span
                  className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#00ff66]/40 bg-[#00ff66]/10 text-[#00ff66] text-xs font-semibold tracking-widest uppercase mb-6"
                  style={{ fontFamily: mono }}
                >
                  <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse" />
                  {service.badge ? `INITIATE PROJECT // ${service.badge}` : "INITIATE PROJECT"}
                </span>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
                  Ready to build your{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff66] to-[#00e5ff]">
                    {service.shortTitle}?
                  </span>
                </h2>

                <p className="text-sm sm:text-base text-zinc-400 mb-8 max-w-lg leading-relaxed">
                  Let&apos;s schedule a short discovery call to map out requirements, estimate timelines, and discuss your goals.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                  <Link
                    href="/#contact"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#00ff66] text-black font-bold text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(0,255,102,0.4)] hover:scale-[1.03] active:scale-[0.98] transition-all"
                    style={{ fontFamily: mono }}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>START A CONVERSATION</span>
                  </Link>

                  <Link
                    href="/#services"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-white/20 hover:border-white/40 bg-white/[0.04] text-white text-xs font-mono tracking-wider transition-colors"
                    style={{ fontFamily: mono }}
                  >
                    <span>BROWSE OTHER SERVICES</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ── PREVIOUS / NEXT SERVICE NAVIGATION ───────────────────────────── */}
          <section className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-10 pt-8 pb-12 border-t border-white/10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6" style={{ fontFamily: mono }}>
              <Link
                href={`/services/${prevService.id}`}
                className="group flex items-center gap-3 text-left w-full sm:w-auto p-4 rounded-xl border border-white/[0.06] hover:border-[#00ff66]/30 bg-white/[0.02] hover:bg-white/[0.04] transition-all"
              >
                <ArrowLeft className="w-5 h-5 text-zinc-500 group-hover:text-[#00ff66] group-hover:-translate-x-1 transition-all" />
                <div>
                  <span className="text-[10px] text-zinc-500 tracking-widest block uppercase">PREVIOUS SERVICE</span>
                  <span className="text-xs sm:text-sm font-bold text-white group-hover:text-[#00ff66] transition-colors">
                    {prevService.title}
                  </span>
                </div>
              </Link>

              <Link
                href={`/services/${nextService.id}`}
                className="group flex items-center justify-end gap-3 text-right w-full sm:w-auto p-4 rounded-xl border border-white/[0.06] hover:border-[#00ff66]/30 bg-white/[0.02] hover:bg-white/[0.04] transition-all"
              >
                <div>
                  <span className="text-[10px] text-zinc-500 tracking-widest block uppercase">NEXT SERVICE</span>
                  <span className="text-xs sm:text-sm font-bold text-white group-hover:text-[#00ff66] transition-colors">
                    {nextService.title}
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-zinc-500 group-hover:text-[#00ff66] group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </section>
      </main>
    </>
  );
}

