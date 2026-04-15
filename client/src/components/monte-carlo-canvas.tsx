import { useEffect, useRef, useCallback } from "react";

interface MonteCarloCanvasProps {
  className?: string;
  isHovered?: boolean;
}

// A single simulation path
interface SimPath {
  points: number[];
  color: string;
  opacity: number;
  speed: number;
}

const COLORS = {
  bull: ["#22d3ee", "#06b6d4", "#0891b2"],   // cyan tones (calm regime)
  bear: ["#f43f5e", "#e11d48", "#be123c"],    // rose tones (crisis regime)
  grid: "rgba(148, 163, 184, 0.06)",
  axis: "rgba(148, 163, 184, 0.15)",
  glow: "rgba(34, 211, 238, 0.03)",
};

function createPath(width: number, steps: number): SimPath {
  const isBear = Math.random() < 0.3;
  const palette = isBear ? COLORS.bear : COLORS.bull;
  const color = palette[Math.floor(Math.random() * palette.length)];
  const drift = isBear ? -0.0012 : 0.0008;
  const vol = 0.015 + Math.random() * 0.02;

  const points: number[] = [0.5]; // start at midpoint (normalized 0-1)
  for (let i = 1; i < steps; i++) {
    const prev = points[i - 1];
    const shock = (Math.random() - 0.5) * 2 * vol + drift;
    points.push(Math.max(0.05, Math.min(0.95, prev + shock)));
  }

  return {
    points,
    color,
    opacity: 0.15 + Math.random() * 0.35,
    speed: 0.3 + Math.random() * 0.7,
  };
}

export function MonteCarloCanvas({ className, isHovered }: MonteCarloCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathsRef = useRef<SimPath[]>([]);
  const progressRef = useRef(0);
  const animRef = useRef<number>(0);
  const hoveredRef = useRef(false);

  // Keep hoveredRef in sync
  useEffect(() => {
    hoveredRef.current = isHovered ?? false;
  }, [isHovered]);

  const initPaths = useCallback((width: number) => {
    const steps = Math.floor(width * 0.8);
    const numPaths = 60;
    pathsRef.current = Array.from({ length: numPaths }, () => createPath(width, steps));
    progressRef.current = 0;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      initPaths(rect.width);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      // Draw subtle grid
      ctx.strokeStyle = COLORS.grid;
      ctx.lineWidth = 1;
      const gridSpacingY = h / 8;
      for (let i = 1; i < 8; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * gridSpacingY);
        ctx.lineTo(w, i * gridSpacingY);
        ctx.stroke();
      }
      const gridSpacingX = w / 12;
      for (let i = 1; i < 12; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSpacingX, 0);
        ctx.lineTo(i * gridSpacingX, h);
        ctx.stroke();
      }

      // Draw axis
      ctx.strokeStyle = COLORS.axis;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, h * 0.5);
      ctx.lineTo(w, h * 0.5);
      ctx.stroke();

      // Advance progress
      const speed = hoveredRef.current ? 1.8 : 0.8;
      progressRef.current = Math.min(progressRef.current + speed, 100);

      const paths = pathsRef.current;
      const margin = w * 0.1;
      const drawWidth = w - margin * 2;

      for (const path of paths) {
        const totalSteps = path.points.length;
        const visibleSteps = Math.floor((progressRef.current / 100) * totalSteps);
        if (visibleSteps < 2) continue;

        ctx.beginPath();
        ctx.strokeStyle = path.color;
        ctx.globalAlpha = path.opacity * (hoveredRef.current ? 1.4 : 1);
        ctx.lineWidth = 1.2;

        for (let i = 0; i < visibleSteps; i++) {
          const x = margin + (i / totalSteps) * drawWidth;
          const y = path.points[i] * h;
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Draw glowing head dot
        if (visibleSteps > 0 && progressRef.current < 100) {
          const lastIdx = visibleSteps - 1;
          const hx = margin + (lastIdx / totalSteps) * drawWidth;
          const hy = path.points[lastIdx] * h;

          ctx.beginPath();
          ctx.fillStyle = path.color;
          ctx.globalAlpha = path.opacity * 1.5;
          ctx.arc(hx, hy, 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }

      // Restart cycle when complete
      if (progressRef.current >= 100) {
        // Hold for a beat, then regenerate
        setTimeout(() => {
          initPaths(w);
        }, 2000);
        progressRef.current = 99.9; // prevent re-trigger
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      observer.disconnect();
    };
  }, [initPaths]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
