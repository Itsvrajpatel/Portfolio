"use client";

import React, { useEffect, useState, useMemo } from "react";

interface PixelTransitionProps {
  imgSrc: string;
  gridSize?: number;
  duration?: number;
  className?: string;
  maskId?: string;
  startAnimation?: boolean;
}

function pseudoDelay(index: number, maxDuration: number): number {
  const x = Math.sin((index + 1) * 37.234) * 43758.5453;
  const rand = x - Math.floor(x);
  return Number((rand * maxDuration).toFixed(3));
}

export default function PixelTransition({
  imgSrc,
  gridSize = 24,
  duration = 1.3,
  className = "",
  maskId = "pixel-mask",
  startAnimation = true,
}: PixelTransitionProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isFullyComplete, setIsFullyComplete] = useState(false);

  // Deterministic delay calculation — guarantees exact SSR & Client parity
  const pixels = useMemo(() => {
    const totalPixels = gridSize * gridSize;
    return Array.from({ length: totalPixels }, (_, i) => pseudoDelay(i, duration));
  }, [gridSize, duration]);

  useEffect(() => {
    if (!startAnimation) return;

    const revealTimer = setTimeout(() => {
      setIsRevealed(true);
    }, 40);

    // After animation duration completes, switch off the SVG mask to free GPU memory
    const completeTimer = setTimeout(() => {
      setIsFullyComplete(true);
    }, (duration + 0.35) * 1000);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(completeTimer);
    };
  }, [startAnimation, duration]);

  // Once fully complete, render a clean native SVG image without active mask computation overhead
  if (isFullyComplete) {
    return (
      <svg className={`w-full h-full ${className}`} style={{ overflow: "visible" }} suppressHydrationWarning>
        <image
          href={imgSrc}
          xlinkHref={imgSrc}
          x="0"
          y="0"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMax slice"
        />
      </svg>
    );
  }

  const step = 1 / gridSize;

  return (
    <svg className={`w-full h-full ${className}`} style={{ overflow: "visible", willChange: "transform" }} suppressHydrationWarning>
      <defs>
        <mask id={maskId} maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
          {pixels.map((delay, i) => {
            const x = (i % gridSize) * step;
            const y = Math.floor(i / gridSize) * step;
            return (
              <rect
                key={i}
                x={x}
                y={y}
                width={step + 0.002}
                height={step + 0.002}
                fill="white"
                style={{
                  opacity: isRevealed ? 1 : 0,
                  transition: `opacity 0.22s linear`,
                  transitionDelay: `${delay}s`,
                  willChange: "opacity",
                }}
              />
            );
          })}
        </mask>
      </defs>
      <image
        href={imgSrc}
        xlinkHref={imgSrc}
        x="0"
        y="0"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMax slice"
        mask={`url(#${maskId})`}
      />
    </svg>
  );
}
