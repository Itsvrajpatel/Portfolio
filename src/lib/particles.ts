// ---------------------------------------------------------------------------
// Deterministic Particle Generator — guarantees 100% parity between SSR & Client
// eliminating any React hydration mismatch errors.
// ---------------------------------------------------------------------------

export interface Particle {
  id: number;
  x: number;        // % from left
  size: number;     // px (1–3)
  delay: number;    // animation-delay in seconds (0–8)
  duration: number; // animation-duration in seconds (6–12)
  opacity: number;  // base opacity (0.10–0.45)
}

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export function generateParticles(count: number, baseSeed = 42): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    const s1 = pseudoRandom(baseSeed + i * 5 + 1);
    const s2 = pseudoRandom(baseSeed + i * 5 + 2);
    const s3 = pseudoRandom(baseSeed + i * 5 + 3);
    const s4 = pseudoRandom(baseSeed + i * 5 + 4);
    const s5 = pseudoRandom(baseSeed + i * 5 + 5);

    return {
      id: i,
      x: Number((s1 * 100).toFixed(2)),
      size: Number((s2 * 2 + 1).toFixed(2)),           // 1–3 px
      delay: Number((s3 * 8).toFixed(2)),              // 0–8 s
      duration: Number((s4 * 6 + 6).toFixed(2)),       // 6–12 s
      opacity: Number((s5 * 0.35 + 0.1).toFixed(3)),   // 0.10–0.45
    };
  });
}
