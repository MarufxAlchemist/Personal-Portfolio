import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Canvas3DProps {
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  opacity: number;
}

export function Canvas3D({ className }: Canvas3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ normalizedX: 0, normalizedY: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Use fewer particles for better performance
    const particleCount = 40;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      z: Math.random() * 1000,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      vz: (Math.random() - 0.5) * 1.5,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.2 + 0.05,
    }));

    // Mouse handler - updates ref, no re-renders
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.normalizedX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.normalizedY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    // Scroll handler - updates ref, no re-renders
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = docHeight > 0 ? window.scrollY / docHeight : 0;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Reduced connection distance for fewer line draws
    const CONNECTION_DIST = 120;
    const CONNECTION_DIST_SQ = CONNECTION_DIST * CONNECTION_DIST;

    const animate = () => {
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      ctx.clearRect(0, 0, w, h);

      const centerX = w / 2;
      const centerY = h / 2;
      const fov = 500;
      const { normalizedX, normalizedY } = mouseRef.current;
      const scrollProgress = scrollRef.current;

      const projected: { x: number; y: number; opacity: number }[] = [];

      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx + normalizedX * 0.15;
        particle.y += particle.vy + normalizedY * 0.15;
        particle.z += particle.vz - scrollProgress * 2;

        if (particle.z < 1) particle.z = 1000;
        if (particle.z > 1000) particle.z = 1;
        if (particle.x < 0) particle.x = w;
        if (particle.x > w) particle.x = 0;
        if (particle.y < 0) particle.y = h;
        if (particle.y > h) particle.y = 0;

        const scale = fov / (fov + particle.z);
        const x2d = (particle.x - centerX) * scale + centerX;
        const y2d = (particle.y - centerY) * scale + centerY;
        const size = particle.size * scale * 2;
        const opacity = particle.opacity * (1 - particle.z / 1000);

        projected.push({ x: x2d, y: y2d, opacity });

        ctx.beginPath();
        ctx.arc(x2d, y2d, Math.max(size, 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      });

      // Draw connections — use squared distance to avoid sqrt
      ctx.lineWidth = 1;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[j].x - projected[i].x;
          const dy = projected[j].y - projected[i].y;
          const distSq = dx * dx + dy * dy;

          if (distSq < CONNECTION_DIST_SQ) {
            const dist = Math.sqrt(distSq);
            const opacity = (1 - dist / CONNECTION_DIST) * 0.04;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "fixed inset-0 pointer-events-none z-0 opacity-60",
        className
      )}
      style={{ width: "100%", height: "100%" }}
      aria-hidden
    />
  );
}
