"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { markPreloaderAsShown } from "@/lib/preloaderState";

export default function SmoothScroll() {
  useEffect(() => {
    // If user enters on any subpage directly, mark preloader as completed
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      markPreloaderAsShown();
    }
    // Disable if reduced motion is requested
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger once DOM layout settles on load/reload
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(refreshTimer);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return null;
}
