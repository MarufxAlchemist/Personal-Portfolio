import { useEffect, useRef } from "react";

export function PaintingBackground() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    let rafId: number;
    let targetX = 50;
    let targetY = 50;
    let currentX = 50;
    let currentY = 50;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 100;
      targetY = (e.clientY / window.innerHeight) * 100;
    };

    const animate = () => {
      // Smooth easing toward target
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      const gradient = `radial-gradient(circle 150px at ${currentX}% ${currentY}%, transparent 0%, rgba(0,0,0,0.4) 40%, black 100%)`;
      layer.style.maskImage = gradient;
      layer.style.webkitMaskImage = gradient;

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-black">
      {/* Interactive disappear layer - painting visible everywhere except around cursor */}
      <div
        ref={layerRef}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/painting.jpeg")',
          opacity: 0.50,
        }}
      />

      {/* Subtle darkening vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
    </div>
  );
}
