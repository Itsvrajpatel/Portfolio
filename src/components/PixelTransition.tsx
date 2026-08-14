"use client";

import React, { useEffect, useState } from "react";

interface PixelTransitionProps {
  imgSrc: string;
  gridSize?: number;
  duration?: number;
  className?: string;
  maskId?: string;
}

export default function PixelTransition({
  imgSrc,
  gridSize = 35,
  duration = 1.5,
  className = "",
  maskId = "pixel-mask",
}: PixelTransitionProps) {
  const [pixels, setPixels] = useState<number[]>([]);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const totalPixels = gridSize * gridSize;
    const delays = Array.from({ length: totalPixels }).map(() => Math.random() * duration);
    setPixels(delays);
    
    const timeout = setTimeout(() => {
      setIsRevealed(true);
    }, 50);
    return () => clearTimeout(timeout);
  }, [gridSize, duration]);

  const step = 1 / gridSize;

  return (
    <svg className={`w-full h-full ${className}`} style={{ overflow: 'visible' }}>
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
                  transition: `opacity 0.1s linear`,
                  transitionDelay: `${delay}s`,
                }}
              />
            );
          })}
        </mask>
      </defs>
      <image
        href={imgSrc}
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
