"use client";

import React, { useRef, useEffect, useState, useCallback, useImperativeHandle, forwardRef } from "react";
import Image, { StaticImageData } from "next/image";

interface PixelData {
  col: number;
  row: number;
  originX: number;
  originY: number;
  w: number;
  h: number;
  color: string;
  distFromClick: number;
  delay: number;
  zMax: number;
  rotZ: number;
}

export interface PixelBounceImageHandle {
  triggerBounce: (clickX?: number, clickY?: number) => void;
}

interface PixelBounceImageProps {
  src: StaticImageData;
  alt: string;
  className?: string;
  cols?: number;
  rows?: number;
  isCenter?: boolean;
}

const PixelBounceImage = forwardRef<PixelBounceImageHandle, PixelBounceImageProps>(
  function PixelBounceImage(
    { src, alt, className = "", cols = 36, rows = 24, isCenter = true },
    ref
  ) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imgElRef = useRef<HTMLImageElement | null>(null);
    const rawPixelsRef = useRef<{ col: number; row: number; color: string }[]>([]);
    const activeParticlesRef = useRef<PixelData[]>([]);
    const isAnimatingRef = useRef(false);
    const animFrameRef = useRef<number>(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isReady, setIsReady] = useState(false);

    // Pre-sample image colors onto a tiny offscreen canvas
    const preparePixels = useCallback(
      (img: HTMLImageElement) => {
        try {
          const offscreen = document.createElement("canvas");
          offscreen.width = cols;
          offscreen.height = rows;
          const ctx = offscreen.getContext("2d", { willReadFrequently: true });
          if (!ctx) return;

          ctx.drawImage(img, 0, 0, cols, rows);
          const imgData = ctx.getImageData(0, 0, cols, rows).data;

          const items: { col: number; row: number; color: string }[] = [];

          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              const idx = (r * cols + c) * 4;
              const red = imgData[idx];
              const green = imgData[idx + 1];
              const blue = imgData[idx + 2];
              const alpha = imgData[idx + 3] / 255;

              if (alpha < 0.05) continue;

              items.push({
                col: c,
                row: r,
                color: `rgba(${red},${green},${blue},${alpha.toFixed(2)})`,
              });
            }
          }

          rawPixelsRef.current = items;
          setIsReady(true);
        } catch (err) {
          console.warn("Pixel sampling failed:", err);
        }
      },
      [cols, rows]
    );

    const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
      const img = e.currentTarget;
      imgElRef.current = img;
      preparePixels(img);
    };

    // Trigger the 3D bounce toward user screen
    const triggerBounce = useCallback(
      (clickX?: number, clickY?: number) => {
        if (isAnimatingRef.current) return;

        if (rawPixelsRef.current.length === 0) {
          const img = imgElRef.current || containerRef.current?.querySelector("img");
          if (img && img.complete) {
            preparePixels(img as HTMLImageElement);
          }
        }

        if (rawPixelsRef.current.length === 0) return;

        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;

        const W = container.offsetWidth;
        const H = container.offsetHeight;
        canvas.width = W;
        canvas.height = H;

        const pixelW = W / cols;
        const pixelH = H / rows;

        // Default click to center if not provided
        const originClickX = clickX ?? W / 2;
        const originClickY = clickY ?? H / 2;
        const maxDist = Math.hypot(W, H);

        // Build active 3D particle array
        const raw = rawPixelsRef.current;
        const particles: PixelData[] = new Array(raw.length);

        for (let i = 0; i < raw.length; i++) {
          const item = raw[i];
          const ox = item.col * pixelW;
          const oy = item.row * pixelH;
          const dist = Math.hypot(ox - originClickX, oy - originClickY);

          // Staggered outward wave from click location (0-160ms)
          const waveDelay = (dist / maxDist) * 0.14 + Math.random() * 0.08;

          // Leap toward user screen (Z-axis depth): 140px to 260px in 3D perspective space
          const zMax = 140 + Math.random() * 120;

          particles[i] = {
            col: item.col,
            row: item.row,
            originX: ox,
            originY: oy,
            w: pixelW + 0.9,
            h: pixelH + 0.9,
            color: item.color,
            distFromClick: dist,
            delay: waveDelay,
            zMax,
            rotZ: (Math.random() - 0.5) * 0.7, // 3D tumble angle
          };
        }

        activeParticlesRef.current = particles;
        isAnimatingRef.current = true;
        setIsAnimating(true);

        const ctx = canvas.getContext("2d")!;
        const startTime = performance.now();
        const cycleDuration = 0.92; // total animation time in seconds
        const focalLength = 320; // 3D perspective distance
        const cx = W / 2;
        const cy = H / 2;

        const animate = (now: number) => {
          const elapsed = (now - startTime) / 1000;
          ctx.clearRect(0, 0, W, H);

          let activeCount = 0;

          // Temporary list for sorted 3D rendering
          const floatingList: {
            p: PixelData;
            z: number;
            scale: number;
            curX: number;
            curY: number;
            curW: number;
            curH: number;
            rot: number;
          }[] = [];

          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            const localTime = elapsed - p.delay;

            if (localTime < 0) {
              // Not yet launched: flat at origin
              ctx.fillStyle = p.color;
              ctx.fillRect(p.originX, p.originY, p.w, p.h);
              activeCount++;
              continue;
            }

            if (localTime >= cycleDuration) {
              // Finished: locked back at origin
              ctx.fillStyle = p.color;
              ctx.fillRect(p.originX, p.originY, p.w, p.h);
              continue;
            }

            // Currently airborne bouncing toward user screen!
            activeCount++;
            const u = localTime / cycleDuration; // 0 to 1

            let z = 0;
            let rot = 0;

            if (u <= 0.68) {
              // Main 3D bounce leap toward user screen
              const p1 = u / 0.68;
              const arch = Math.sin(Math.PI * p1);
              z = p.zMax * arch;
              rot = p.rotZ * arch;
            } else {
              // Elastic rebound settle upon returning
              const p2 = (u - 0.68) / 0.32;
              const rebound = Math.sin(Math.PI * p2);
              z = p.zMax * 0.12 * rebound;
              rot = p.rotZ * 0.12 * rebound;
            }

            // 3D Perspective Projection toward user screen:
            const safeZ = Math.min(z, focalLength - 20);
            const scale = focalLength / (focalLength - safeZ);

            // Radial 3D expansion away from center toward viewer
            const curX = cx + (p.originX - cx) * scale;
            const curY = cy + (p.originY - cy) * scale;
            const curW = p.w * scale;
            const curH = p.h * scale;

            // Draw base shadow on original image plane
            const shadowIntensity = Math.min(0.65, (z / p.zMax) * 0.65);
            ctx.fillStyle = `rgba(0, 0, 0, ${shadowIntensity})`;
            ctx.fillRect(p.originX, p.originY, p.w, p.h);

            floatingList.push({
              p,
              z,
              scale,
              curX,
              curY,
              curW,
              curH,
              rot,
            });
          }

          // Sort airborne particles by Z so closest to user screen render in front
          floatingList.sort((a, b) => a.z - b.z);

          for (let i = 0; i < floatingList.length; i++) {
            const item = floatingList[i];
            const { p, z, scale, curX, curY, curW, curH, rot } = item;

            ctx.save();
            ctx.translate(curX + curW / 2, curY + curH / 2);
            if (Math.abs(rot) > 0.02) {
              ctx.rotate(rot);
            }

            // Floating pixel cube body
            ctx.fillStyle = p.color;
            ctx.fillRect(-curW / 2, -curH / 2, curW, curH);

            // Holographic cyber neon rim as pixels pop toward user
            if (z > 20) {
              const glowAlpha = Math.min(0.85, (z / p.zMax) * 0.85);
              ctx.strokeStyle = `rgba(0, 255, 102, ${glowAlpha})`;
              ctx.lineWidth = Math.max(1, 1.2 * scale);
              ctx.strokeRect(-curW / 2, -curH / 2, curW, curH);
            }

            ctx.restore();
          }

          if (activeCount > 0) {
            animFrameRef.current = requestAnimationFrame(animate);
          } else {
            // Animation complete: clean canvas and return to regular Image
            ctx.clearRect(0, 0, W, H);
            isAnimatingRef.current = false;
            setIsAnimating(false);
          }
        };

        animFrameRef.current = requestAnimationFrame(animate);
      },
      [cols, rows, preparePixels]
    );

    useImperativeHandle(ref, () => ({
      triggerBounce,
    }));

    useEffect(() => {
      return () => {
        if (animFrameRef.current) {
          cancelAnimationFrame(animFrameRef.current);
        }
      };
    }, []);

    // Re-sample on window resize
    useEffect(() => {
      const handleResize = () => {
        if (imgElRef.current && imgElRef.current.complete) {
          preparePixels(imgElRef.current);
        }
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [preparePixels]);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      const rect = containerRef.current?.getBoundingClientRect();
      const clickX = rect ? e.clientX - rect.left : undefined;
      const clickY = rect ? e.clientY - rect.top : undefined;
      triggerBounce(clickX, clickY);
    };

    return (
      <div
        ref={containerRef}
        className={`relative w-full h-full cursor-pointer select-none overflow-hidden ${className}`}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label="Click for 3D pixel bounce effect"
        title="Click for 3D pixel bounce effect"
      >
        {/* Real Image — visible when not animating */}
        <div
          className="absolute inset-0 transition-opacity duration-150"
          style={{ opacity: isAnimating ? 0 : 1 }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            unoptimized
            sizes="(max-width: 640px) 320px, (max-width: 1024px) 520px, 600px"
            className="object-cover object-center pointer-events-none"
            priority={isCenter}
            onLoad={handleImageLoad}
          />
        </div>

        {/* Canvas for 3D pixel bounce particles */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            display: isAnimating ? "block" : "none",
            imageRendering: "pixelated",
          }}
        />

        {/* Interactive Pointer Badge (Center Card) */}
        {isCenter && !isAnimating && isReady && (
          <div className="absolute bottom-3 right-3 z-10 pointer-events-none opacity-65 hover:opacity-100 transition-opacity">
            <span
              className="px-2 py-0.5 rounded text-[8px] font-mono tracking-widest text-[#00ff66] bg-black/80 border border-[#00ff66]/30 backdrop-blur-sm uppercase flex items-center gap-1 shadow-[0_0_8px_rgba(0,255,102,0.2)]"
            >
              <svg className="w-2.5 h-2.5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
              </svg>
              3D PIXEL BURST
            </span>
          </div>
        )}
      </div>
    );
  }
);

export default PixelBounceImage;
