import { useMousePosition } from "@/hooks/use-mouse-position";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingShapesProps {
  className?: string;
  variant?: "hero" | "section";
}

export function FloatingShapes({ className, variant = "hero" }: FloatingShapesProps) {
  const { normalizedX, normalizedY } = useMousePosition();
  const { scrollProgress } = useScrollProgress();

  const shapes = variant === "hero" ? heroShapes : sectionShapes;

  return (
    <div 
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      aria-hidden
    >
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className={cn(
            "absolute",
            shape.className
          )}
          style={{
            left: shape.left,
            top: shape.top,
            width: shape.size,
            height: shape.size,
          }}
          animate={{
            x: normalizedX * shape.parallax * 30,
            y: normalizedY * shape.parallax * 30 + scrollProgress * shape.scrollSpeed * 100,
            rotate: scrollProgress * shape.rotation,
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 30,
            mass: shape.mass,
          }}
        >
          <ShapeRenderer type={shape.type} />
        </motion.div>
      ))}
    </div>
  );
}

function ShapeRenderer({ type }: { type: string }) {
  switch (type) {
    case "ring":
      return (
        <div className="w-full h-full rounded-full border border-foreground/10 animate-pulse-slow" />
      );
    case "ring-thick":
      return (
        <div className="w-full h-full rounded-full border-2 border-foreground/8 animate-float" />
      );
    case "dot":
      return (
        <div className="w-full h-full rounded-full bg-foreground/5 animate-drift" />
      );
    case "square":
      return (
        <div className="w-full h-full border border-foreground/8 rotate-45 animate-float-reverse" />
      );
    case "gradient-orb":
      return (
        <div className="w-full h-full rounded-full bg-gradient-to-br from-foreground/8 via-foreground/3 to-transparent blur-2xl animate-drift" />
      );
    case "line":
      return (
        <div className="w-full h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
      );
    case "arc":
      return (
        <div 
          className="w-full h-full rounded-full border border-foreground/6 animate-pulse-slow"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
          }}
        />
      );
    case "cross":
      return (
        <div className="w-full h-full relative">
          <div className="absolute top-1/2 left-0 w-full h-px bg-foreground/8 -translate-y-1/2" />
          <div className="absolute top-0 left-1/2 w-px h-full bg-foreground/8 -translate-x-1/2" />
        </div>
      );
    default:
      return null;
  }
}

const heroShapes = [
  { type: "gradient-orb", left: "5%", top: "20%", size: "400px", parallax: 0.8, scrollSpeed: -2, rotation: 0, mass: 2, className: "opacity-40" },
  { type: "gradient-orb", left: "70%", top: "60%", size: "300px", parallax: 0.5, scrollSpeed: -1.5, rotation: 0, mass: 2.5, className: "opacity-30" },
  { type: "ring", left: "80%", top: "15%", size: "150px", parallax: 1.2, scrollSpeed: -3, rotation: 180, mass: 1, className: "" },
  { type: "ring-thick", left: "15%", top: "70%", size: "100px", parallax: 0.6, scrollSpeed: -2.5, rotation: -90, mass: 1.5, className: "" },
  { type: "dot", left: "90%", top: "80%", size: "20px", parallax: 2, scrollSpeed: -4, rotation: 0, mass: 0.5, className: "" },
  { type: "dot", left: "10%", top: "30%", size: "15px", parallax: 1.8, scrollSpeed: -3.5, rotation: 0, mass: 0.5, className: "" },
  { type: "square", left: "60%", top: "25%", size: "40px", parallax: 1.5, scrollSpeed: -2.8, rotation: 360, mass: 0.8, className: "" },
  { type: "line", left: "30%", top: "85%", size: "200px", parallax: 0.3, scrollSpeed: -1, rotation: 0, mass: 3, className: "" },
  { type: "arc", left: "50%", top: "10%", size: "80px", parallax: 1.1, scrollSpeed: -2.2, rotation: 270, mass: 1.2, className: "" },
];

const sectionShapes = [
  { type: "ring", left: "85%", top: "20%", size: "80px", parallax: 0.8, scrollSpeed: -1.5, rotation: 90, mass: 1.2, className: "" },
  { type: "dot", left: "5%", top: "60%", size: "12px", parallax: 1.5, scrollSpeed: -2, rotation: 0, mass: 0.6, className: "" },
  { type: "gradient-orb", left: "90%", top: "70%", size: "200px", parallax: 0.4, scrollSpeed: -1, rotation: 0, mass: 2, className: "opacity-20" },
  { type: "cross", left: "10%", top: "30%", size: "30px", parallax: 1.2, scrollSpeed: -2.5, rotation: 45, mass: 0.8, className: "" },
];
