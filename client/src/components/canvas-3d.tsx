import { useRef, useEffect } from "react";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { cn } from "@/lib/utils";

interface Canvas3DProps {
  className?: string;
}

export function Canvas3D({ className }: Canvas3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { normalizedX, normalizedY } = useMousePosition();
  const { scrollProgress } = useScrollProgress();
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particleCount = 60;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 1000,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      vz: (Math.random() - 0.5) * 1.5,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.2 + 0.05,
    }));

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const fov = 500;

      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx + normalizedX * 0.5;
        particle.y += particle.vy + normalizedY * 0.5;
        particle.z += particle.vz - scrollProgress * 10;

        if (particle.z < 1) particle.z = 1000;
        if (particle.z > 1000) particle.z = 1;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        const scale = fov / (fov + particle.z);
        const x2d = (particle.x - centerX) * scale + centerX;
        const y2d = (particle.y - centerY) * scale + centerY;
        const size = particle.size * scale * 2;
        const opacity = particle.opacity * (1 - particle.z / 1000);

        ctx.beginPath();
        ctx.arc(x2d, y2d, Math.max(size, 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      });

      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
      ctx.lineWidth = 1;

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          
          const scale1 = fov / (fov + p1.z);
          const scale2 = fov / (fov + p2.z);
          
          const x1 = (p1.x - centerX) * scale1 + centerX;
          const y1 = (p1.y - centerY) * scale1 + centerY;
          const x2 = (p2.x - centerX) * scale2 + centerX;
          const y2 = (p2.y - centerY) * scale2 + centerY;
          
          const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
          
          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.05;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [normalizedX, normalizedY, scrollProgress]);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "fixed inset-0 pointer-events-none z-0 opacity-60",
        className
      )}
      aria-hidden
    />
  );
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
