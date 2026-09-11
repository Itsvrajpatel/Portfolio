"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Search,
  Compass,
  Pencil,
  Wrench,
  FlaskConical,
  Rocket,
  Sparkles,
  LucideIcon,
} from "lucide-react";

interface ProcessStep {
  number: number;
  title: string;
  description: string;
  phase: string;
  deliverables: string;
  icon: LucideIcon;
}

const THEME_ACCENT = "#00ff66";
const THEME_GLOW = "rgba(0, 255, 102, 0.4)";

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: 1,
    title: "Discovery",
    description: "Goals, audience, success metrics.",
    phase: "01 // SCOPING",
    deliverables: "User research, KPI baseline, project roadmap",
    icon: Search,
  },
  {
    number: 2,
    title: "Strategy",
    description: "Sitemap, flows and tech blueprint.",
    phase: "02 // ARCHITECTURE",
    deliverables: "System diagram, database schema, user flows",
    icon: Compass,
  },
  {
    number: 3,
    title: "Design",
    description: "Hi-fi UI, prototypes and feedback loops.",
    phase: "03 // UI / UX",
    deliverables: "Interactive prototypes, design tokens, design system",
    icon: Pencil,
  },
  {
    number: 4,
    title: "Development",
    description: "Clean, typed, production-ready code.",
    phase: "04 // ENGINEERING",
    deliverables: "Type-safe APIs, responsive components, DB migrations",
    icon: Wrench,
  },
  {
    number: 5,
    title: "Testing",
    description: "QA, accessibility, performance.",
    phase: "05 // AUDIT & QA",
    deliverables: "Automated test suites, a11y compliance, 95+ Lighthouse",
    icon: FlaskConical,
  },
  {
    number: 6,
    title: "Launch",
    description: "Deploy, measure, iterate.",
    phase: "06 // CI/CD & LIVE",
    deliverables: "Zero-downtime deploy, analytics telemetry, post-launch sync",
    icon: Rocket,
  },
];

const mono = "var(--font-jetbrains-mono, 'JetBrains Mono', ui-monospace, monospace)";

export default function ProcessSection(): JSX.Element {
  const [hoveredStep, setHoveredStep] = useState<ProcessStep | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative w-full overflow-hidden pt-16 pb-24 lg:pt-20 lg:pb-32"
      style={{ background: "#030303" }}
      aria-label="Development Process and Workflow"
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
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,255,102,0.08) 0%, rgba(0,229,255,0.03) 45%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      {/* Main Container */}
      <div className="relative z-[10] max-w-[1300px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header Container */}
        <motion.div
          className="mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* PROCESS Badge matching SKILLS styling */}
          <div className="flex items-center gap-3 mb-5">
            <span
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#00ff66]/40 bg-[#00ff66]/10 text-[#00ff66] text-xs font-semibold tracking-[0.2em] uppercase shadow-[0_0_15px_rgba(0,255,102,0.2)]"
              style={{ fontFamily: mono }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] shadow-[0_0_8px_#00ff66] animate-pulse" />
              PROCESS
            </span>
            <span className="text-xs text-zinc-500 font-mono tracking-wider hidden sm:inline-block">
              // WORKFLOW & EXECUTION ROADMAP
            </span>
          </div>

          {/* Primary Headline with consistent gradient */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold tracking-tight text-white leading-[1.12] max-w-4xl">
            A proven path from{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff66] to-[#00e5ff]">
              idea to launch.
            </span>
          </h2>

          {/* Dynamic Workflow Inspector */}
          <div className="mt-6 flex flex-wrap items-center gap-3 min-h-[28px] font-mono text-xs">
            <span className="text-zinc-500">SYSTEM.WORKFLOW:</span>
            {hoveredStep ? (
              <span className="inline-flex items-center gap-2 text-[#00ff66] transition-all duration-200">
                <span className="w-2 h-2 rounded-full bg-[#00ff66] shadow-[0_0_8px_#00ff66]" />
                <strong className="text-white">STEP 0{hoveredStep.number}</strong>
                <span className="text-zinc-400">— {hoveredStep.phase}:</span>
                <span className="text-zinc-300 font-sans hidden md:inline">{hoveredStep.deliverables}</span>
              </span>
            ) : (
              <span className="text-zinc-600">
                Hover any stage to inspect execution deliverables
              </span>
            )}
          </div>
        </motion.div>

        {/* Timeline Grid & Segmented Connecting Line */}
        <div className="relative mt-8 sm:mt-10">
          {/* Synchronized Sequential Line Segments (Connecting adjacent cards) */}
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={`segment-${i}`}
              className="hidden lg:block absolute top-[30px] sm:top-[34px] h-[2px] z-0 pointer-events-none"
              style={{
                left: `${(i * 100) / 6 + 100 / 12}%`,
                width: `${100 / 6}%`,
              }}
            >
              <motion.div
                className="h-full w-full bg-gradient-to-r from-[#00ff66] via-[#00e5ff] to-[#00ff66]"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={
                  isInView
                    ? { scaleX: 1, opacity: 0.55 }
                    : { scaleX: 0, opacity: 0 }
                }
                transition={{
                  duration: 0.32,
                  delay: i * 0.28 + 0.14,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  transformOrigin: "left center",
                  boxShadow: "0 0 10px rgba(0,255,102,0.5)",
                }}
              />
            </div>
          ))}

          {/* Continuous Ambient Shimmer Beam (fades in after sequence joins) */}
          <motion.div
            className="hidden lg:block absolute top-[30px] sm:top-[34px] left-[5%] right-[5%] h-[2px] z-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <div
              className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-white to-transparent opacity-70 blur-[1px]"
              style={{
                animation: "pulseTrack 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              }}
            />
          </motion.div>

          {/* 6 Steps Grid Layout with In-Place Pop Up Animation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 sm:gap-6 lg:gap-4">
            {PROCESS_STEPS.map((step, index) => {
              const StepIcon = step.icon;
              const isHovered = hoveredStep?.number === step.number;
              const stepDelay = index * 0.28;

              return (
                <div
                  key={step.number}
                  onMouseEnter={() => setHoveredStep(step)}
                  onMouseLeave={() => setHoveredStep(null)}
                  className="group relative flex flex-col items-center text-center cursor-pointer transition-all duration-300"
                >
                  {/* Icon Card Box — Pops up directly in its original position */}
                  <div className="relative z-10 mb-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={
                        isInView
                          ? { opacity: 1, scale: 1 }
                          : { opacity: 0, scale: 0 }
                      }
                      transition={{
                        duration: 0.45,
                        delay: stepDelay,
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      className="relative flex items-center justify-center w-[60px] h-[60px] sm:w-[68px] sm:h-[68px] rounded-2xl transition-all duration-300 ease-out"
                      style={{
                        transformOrigin: "center center",
                        background: isHovered
                          ? "linear-gradient(145deg, #0e1613 0%, #080b0f 100%)"
                          : "linear-gradient(145deg, #0a0b0d 0%, #050607 100%)",
                        border: isHovered
                          ? `1px solid ${THEME_ACCENT}`
                          : "1px solid rgba(255, 255, 255, 0.1)",
                        boxShadow: isHovered
                          ? `0 0 24px ${THEME_GLOW}, inset 0 1px 0 rgba(255,255,255,0.2)`
                          : "inset 0 1px 0 rgba(255,255,255,0.05), 0 6px 16px rgba(0,0,0,0.5)",
                        transform: isHovered
                          ? "translateY(-4px) scale(1.05)"
                          : "translateY(0) scale(1)",
                      }}
                    >
                      {/* Top inner glass glare */}
                      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.06] to-transparent rounded-t-2xl pointer-events-none" />

                      {/* Small Sized Icon */}
                      <StepIcon
                        className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ${
                          isHovered
                            ? "scale-105 text-[#00ff66]"
                            : "text-zinc-300 group-hover:text-white"
                        }`}
                        style={{
                          filter: isHovered ? "drop-shadow(0 0 8px rgba(0,255,102,0.6))" : "none",
                        }}
                        strokeWidth={1.8}
                      />

                      {/* Number Badge (top-right pill) popping up in place */}
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={
                          isInView
                            ? { scale: 1, opacity: 1 }
                            : { scale: 0, opacity: 0 }
                        }
                        transition={{
                          duration: 0.35,
                          delay: stepDelay + 0.14,
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                        }}
                        className="absolute -top-2 -right-2 w-5 h-5 sm:w-[22px] sm:h-[22px] rounded-full flex items-center justify-center text-[10px] sm:text-[11px] font-bold font-mono transition-all duration-300 z-20"
                        style={{
                          transformOrigin: "center center",
                          background: isHovered
                            ? "linear-gradient(135deg, #00ff66, #00e5ff)"
                            : "linear-gradient(135deg, #181c24, #0f1117)",
                          color: isHovered ? "#030303" : "rgba(255, 255, 255, 0.8)",
                          border: isHovered
                            ? "1.5px solid #030303"
                            : "1px solid rgba(255, 255, 255, 0.2)",
                          boxShadow: isHovered
                            ? "0 0 10px rgba(0,255,102,0.7)"
                            : "none",
                          transform: isHovered ? "scale(1.1)" : "scale(1)",
                        }}
                      >
                        {step.number}
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Step Title & Description — Fades in cleanly directly in place */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: stepDelay + 0.12,
                      ease: "easeOut",
                    }}
                  >
                    <h3
                      className="text-sm sm:text-base font-bold tracking-tight mb-1.5 transition-colors duration-200"
                      style={{
                        color: isHovered ? "#ffffff" : "rgba(255, 255, 255, 0.9)",
                      }}
                    >
                      {step.title}
                    </h3>

                    <p className="text-[11px] sm:text-xs leading-relaxed text-zinc-400 max-w-[170px] mx-auto group-hover:text-zinc-300 transition-colors duration-200">
                      {step.description}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Banner Detail Card with Smooth Fade In */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, delay: 1.7, ease: "easeOut" }}
          className="mt-12 sm:mt-14 p-4 sm:p-6 rounded-2xl relative overflow-hidden transition-all duration-500"
          style={{
            background: "rgba(18, 18, 18, 0.4)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.5), 0 0 30px rgba(0,255,102,0.03)",
          }}
        >
          {/* Subtle accent glow */}
          <div
            className={`absolute -right-20 -bottom-20 w-64 h-64 rounded-full pointer-events-none blur-3xl transition-opacity duration-700 bg-[#00ff66] ${
              hoveredStep ? "opacity-20" : "opacity-5"
            }`}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#00ff66]/10 border border-[#00ff66]/30 text-[#00ff66]"
              >
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-[11px] font-mono font-semibold tracking-wider text-[#00ff66]"
                    style={{ fontFamily: mono }}
                  >
                    {hoveredStep ? hoveredStep.phase : "END-TO-END EXECUTION"}
                  </span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-xs font-semibold text-white tracking-wide">
                    {hoveredStep ? `${hoveredStep.title} Phase` : "Agile Engineering Lifecycle"}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                  <span className="text-zinc-500 font-mono">
                    {hoveredStep ? "Deliverables: " : "Scope: "}
                  </span>
                  <span className="text-zinc-200">
                    {hoveredStep
                      ? hoveredStep.deliverables
                      : "Full lifecycle execution from architecture design to automated production deployment."}
                  </span>
                </p>
              </div>
            </div>

            {/* Stage Indicator */}
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 self-end md:self-center">
              <span>{hoveredStep ? "INSPECTING:" : "ROADMAP:"}</span>
              <span className="text-white font-bold">
                {hoveredStep ? `0${hoveredStep.number} / 06` : "06 PHASES"}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Keyframe animation style for pulse beam */}
      <style jsx>{`
        @keyframes pulseTrack {
          0% {
            left: 0%;
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            left: 85%;
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
