// ---------------------------------------------------------------------------
// Shared particle utility — called at module scope in consuming files
// to guarantee SSR / client hydration parity (no Math.random() at render time)
// ---------------------------------------------------------------------------

export interface Particle {
  id: number;
  x: number;        // % from left
  size: number;     // px (1–3)
  delay: number;    // animation-delay in seconds (0–8)
  duration: number; // animation-duration in seconds (6–12)
  opacity: number;  // base opacity (0.10–0.45)
}

export function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 2 + 1,          // 1–3 px
    delay: Math.random() * 8,             // 0–8 s
    duration: Math.random() * 6 + 6,      // 6–12 s
    opacity: Math.random() * 0.35 + 0.1,  // 0.10–0.45
  }));
}
