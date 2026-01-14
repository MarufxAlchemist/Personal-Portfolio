import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export function PaintingBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 40, mass: 1 };
  const revealX = useSpring(mouseX, springConfig);
  const revealY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-black">
      {/* Base layer: Very dim or blurred version of the painting for depth */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 blur-sm scale-105"
        style={{ backgroundImage: 'url("/painting.jpeg")' }}
      />
      
      {/* Interactive reveal layer */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("/painting.jpeg")',
          maskImage: `radial-gradient(circle 250px at var(--reveal-x) var(--reveal-y), black 0%, rgba(0,0,0,0.4) 40%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle 250px at var(--reveal-x) var(--reveal-y), black 0%, rgba(0,0,0,0.4) 40%, transparent 100%)`,
          opacity: 0.25,
          // We use motion values directly in style for performance
          ["--reveal-x" as any]: revealX,
          ["--reveal-y" as any]: revealY,
        } as any}
      />

      {/* Subtle darkening vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
    </div>
  );
}
