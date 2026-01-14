import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function PaintingBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate percentage position for responsive sizing
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-black">
      {/* Interactive disappear layer - painting visible everywhere except around cursor */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/painting.jpeg")',
          maskImage: `radial-gradient(circle 150px at ${mousePosition.x}% ${mousePosition.y}%, transparent 0%, rgba(0,0,0,0.4) 40%, black 100%)`,
          WebkitMaskImage: `radial-gradient(circle 150px at ${mousePosition.x}% ${mousePosition.y}%, transparent 0%, rgba(0,0,0,0.4) 40%, black 100%)`,
          opacity: 0.50,
        }}
      />

      {/* Subtle darkening vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
    </div>
  );
}
