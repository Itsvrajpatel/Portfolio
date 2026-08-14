"use client";

import React from "react";

interface MarqueeItem {
  text: string;
  tag: string;
  highlight?: boolean;
}

const MARQUEE_ITEMS: MarqueeItem[] = [
  { text: "FULL-STACK ARCHITECTURE", tag: "SYS.01" },
  { text: "AI AGENTS & RAG PIPELINES", tag: "AI.02" },
  { text: "NEXT.JS 15 & REACT 19", tag: "WEB.03" },
  { text: "CREATIVE DEVELOPER & GSAP", tag: "FX.04" },
  { text: "HIGH PERFORMANCE SAAS", tag: "PROD.05" },
  { text: "AVAILABLE FOR CONTRACT & FREELANCE", tag: "HIRE ME" },
  { text: "TYPESCRIPT & NODE.JS", tag: "DEV.06" },
  { text: "REAL-TIME SYSTEMS & APIS", tag: "DATA.07" },
];

export default function ScannerMarquee(): JSX.Element {
  // Duplicate list 3x for seamless infinite marquee loop
  const marqueeList = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <section className="relative w-full bg-[#030303] border-y border-[#00ff66]/15 z-20 select-none overflow-hidden py-3.5 md:py-5">
      
      {/* Subtle Left & Right Gradient Edge Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#030303] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#030303] to-transparent z-10 pointer-events-none" />

      {/* ── INFINITE RUNNING MARQUEE TRACK ───────────────────────────── */}
      <div className="flex w-full overflow-hidden">
        <div className="flex shrink-0 items-center gap-6 md:gap-10 animate-marquee whitespace-nowrap will-change-transform">
          {marqueeList.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-3 rounded-full border px-4 py-2 text-xs md:text-sm font-mono tracking-wider transition-colors duration-200 ${
                item.highlight
                  ? "border-[#00ff66]/40 bg-[#00ff66]/10 text-white shadow-[0_0_12px_rgba(0,255,102,0.15)]"
                  : "border-[#00ff66]/15 bg-[#080808] text-zinc-300 hover:border-[#00ff66]/40 hover:text-white"
              }`}
            >
              <span className="text-[10px] text-[#00ff66]">[{item.tag}]</span>
              <span className="font-semibold uppercase">{item.text}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#00ff66] shadow-[0_0_6px_#00ff66]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
