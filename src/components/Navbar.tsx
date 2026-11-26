"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface NavbarProps {
  activeSection?: string;
}

export default function Navbar({ activeSection = "Work" }: NavbarProps): JSX.Element {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Work", href: "/#work" },
    { label: "About", href: "/#about" },
    { label: "Services", href: "/#services" },
    { label: "Skills", href: "/#skills" },
    { label: "Process", href: "/#process" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[50] pointer-events-none transition-all duration-700 ease-out">
      <div
        className="relative flex items-center justify-center px-6 md:px-10"
        style={{ height: "72px" }}
      >
        {/* Logo — top-left, same row as nav, hidden once scrolled */}
        <Link
          href="/"
          className={`absolute left-6 sm:left-10 text-[13px] font-semibold tracking-wider select-none pointer-events-auto transition-all duration-500 ${
            scrolled
              ? "opacity-0 -translate-x-4 pointer-events-none"
              : "opacity-100 translate-x-0 text-white hover:text-[#00ff66]"
          }`}
          style={{ fontFamily: "monospace" }}
          aria-label="Home"
        >
          &lt;VRAJ /&gt;
        </Link>

        {/* 
          Nav — centered in the same row.
          AT FIRST (top of page): Spreads out, transparent background, no border (NOT in capsule).
          AFTER SCROLL: Smoothly animates into the rounded-full floating glass capsule.
        */}
        <nav
          className="pointer-events-auto flex items-center transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)]"
          style={{
            gap: scrolled ? "24px" : "clamp(20px, 4.5vw, 60px)",
            height: scrolled ? "60px" : "auto",
            paddingLeft: scrolled ? "28px" : "0px",
            paddingRight: scrolled ? "28px" : "0px",
            borderRadius: "999px",
            background: scrolled ? "rgba(18,18,18,0.65)" : "transparent",
            backdropFilter: scrolled ? "blur(18px)" : "blur(0px)",
            WebkitBackdropFilter: scrolled ? "blur(18px)" : "blur(0px)",
            border: scrolled ? "1px solid #2A2A2A" : "1px solid transparent",
            boxShadow: scrolled ? "0 10px 30px rgba(0,0,0,0.5)" : "none",
            transform: scrolled ? "translateY(0px)" : "translateY(0px)",
          }}
          onMouseEnter={(e) => {
            if (!scrolled) return;
            const el = e.currentTarget;
            el.style.borderColor = "rgba(0,255,102,0.45)";
            el.style.background = "rgba(28,28,28,0.75)";
            el.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            if (!scrolled) return;
            const el = e.currentTarget;
            el.style.borderColor = "#2A2A2A";
            el.style.background = "rgba(18,18,18,0.65)";
            el.style.transform = "translateY(0px)";
          }}
        >
          {navLinks.map(({ label, href }) => {
            const isActive = label.toLowerCase() === activeSection.toLowerCase();
            return (
              <Link
                key={label}
                href={href}
                className="text-[11px] font-medium tracking-widest uppercase transition-colors duration-200 flex items-center gap-1.5"
                style={{
                  color: isActive
                    ? "#00ff66"
                    : scrolled
                    ? "rgba(255,255,255,0.5)"
                    : "rgba(255,255,255,0.6)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#00ff66")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = isActive
                    ? "#00ff66"
                    : scrolled
                    ? "rgba(255,255,255,0.5)"
                    : "rgba(255,255,255,0.6)")
                }
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] shadow-[0_0_8px_#00ff66] animate-pulse inline-block" />
                )}
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Resume — top-right corner, animates to pill on scroll just like middle nav */}
        <div className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 pointer-events-auto flex items-center">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto flex items-center justify-center text-[11px] font-mono font-medium tracking-widest uppercase transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)] select-none"
            style={{
              height: scrolled ? "38px" : "auto",
              paddingLeft: scrolled ? "20px" : "0px",
              paddingRight: scrolled ? "20px" : "0px",
              borderRadius: "999px",
              background: scrolled ? "rgba(18,18,18,0.65)" : "transparent",
              backdropFilter: scrolled ? "blur(18px)" : "blur(0px)",
              WebkitBackdropFilter: scrolled ? "blur(18px)" : "blur(0px)",
              border: scrolled ? "1px solid #2A2A2A" : "1px solid transparent",
              boxShadow: scrolled ? "0 10px 30px rgba(0,0,0,0.5)" : "none",
              color: scrolled ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.85)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#00ff66";
              if (scrolled) {
                e.currentTarget.style.borderColor = "rgba(0,255,102,0.45)";
                e.currentTarget.style.background = "rgba(28,28,28,0.75)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = scrolled ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.85)";
              if (scrolled) {
                e.currentTarget.style.borderColor = "#2A2A2A";
                e.currentTarget.style.background = "rgba(18,18,18,0.65)";
                e.currentTarget.style.transform = "translateY(0px)";
              }
            }}
            aria-label="Resume"
          >
            RESUME
          </a>
        </div>
      </div>
    </header>
  );
}
