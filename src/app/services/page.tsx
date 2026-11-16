import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { SERVICES } from "@/data/servicesData";
import SmoothScroll from "@/components/SmoothScroll";
import { ArrowLeft, ArrowRight, ArrowUpRight, Layers, Clock, Code2 } from "lucide-react";

export const metadata: Metadata = {
  title: "All Services | Vraj Patel Portfolio",
  description: "Specialized engineering and design capabilities for modern digital products.",
};

const mono = "var(--font-jetbrains-mono, 'JetBrains Mono', ui-monospace, monospace)";

export default function ServicesIndexPage() {
  return (
    <>
      <SmoothScroll />

      <main className="relative min-h-screen w-full bg-[#030303] text-white selection:bg-[#00ff66] selection:text-black font-sans pb-24 overflow-x-hidden">
        {/* Background Grid */}
        <div
          className="fixed inset-0 z-[1] pointer-events-none opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,102,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,102,0.06) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />

        {/* Header */}
        <header className="sticky top-0 left-0 right-0 z-40 bg-[#030303]/80 backdrop-blur-xl border-b border-white/[0.08]">
          <div className="max-w-[1300px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-3 text-white hover:text-[#00ff66] transition-colors duration-200"
            >
              <span
                className="text-base font-bold tracking-wider select-none text-white hover:text-[#00ff66] transition-colors"
                style={{ fontFamily: mono }}
              >
                &lt;VRAJ /&gt;
              </span>
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-[#00ff66]/40 bg-white/[0.03] text-white text-xs font-mono tracking-wider transition-all"
              style={{ fontFamily: mono }}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>BACK TO HOME</span>
            </Link>
          </div>
        </header>

        {/* Hero */}
        <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-10 pt-16 pb-12">
          <div className="flex items-center gap-3 mb-5">
            <span
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#00ff66]/40 bg-[#00ff66]/10 text-[#00ff66] text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ fontFamily: mono }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] animate-pulse" />
              SERVICE DIRECTORY
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-6">
            Explore All{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff66] to-[#00e5ff]">
              Specialized Services
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed">
            Click on any service to inspect full architectural breakdowns, timeline deliverables, tech stacks, and execution roadmaps.
          </p>
        </div>

        {/* Services Grid */}
        <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-8">
          {SERVICES.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.id}`}
              className="group relative rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-[#00ff66]/40 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "radial-gradient(circle at 80% 20%, rgba(0,255,102,0.1) 0%, transparent 60%)",
                }}
              />

              <div>
                <div className={`flex items-center ${service.badge ? "justify-between" : "justify-end"} mb-6`} style={{ fontFamily: mono }}>
                  {service.badge && (
                    <span className="text-xs text-[#00ff66] font-semibold tracking-wider">
                      {service.badge}
                    </span>
                  )}
                  <span className="text-xs text-zinc-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {service.duration}
                  </span>
                </div>

                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-black/60 border border-white/[0.06] mb-6 flex items-center justify-center">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-[#00ff66] transition-colors">
                  {service.title}
                </h2>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono" style={{ fontFamily: mono }}>
                <span className="text-zinc-500">{service.stack}</span>
                <span className="inline-flex items-center gap-1.5 text-[#00ff66] font-semibold group-hover:translate-x-1 transition-transform">
                  EXPLORE SPECS <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

