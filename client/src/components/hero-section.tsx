import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { FloatingShapes } from "./floating-shapes";
import { ArrowDown } from "lucide-react";

export function HeroSection() {
  const { normalizedX, normalizedY } = useMousePosition();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToWork = () => {
    const workSection = document.querySelector("#work");
    if (workSection) {
      workSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      className="relative min-h-screen flex flex-col justify-center overflow-hidden noise"
      data-testid="section-hero"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/95" />
      
      <FloatingShapes variant="hero" />
      
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, hsl(var(--foreground) / 0.03) 0%, transparent 70%)",
            transform: `translate(${normalizedX * 20}px, ${normalizedY * 20}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, hsl(var(--foreground) / 0.04) 0%, transparent 70%)",
            transform: `translate(${normalizedX * -15}px, ${normalizedY * -15}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-6xl">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-meta uppercase tracking-[0.3em] text-muted-foreground">
              Creative Developer & Digital Artist
            </span>
          </motion.div>

          <div className="overflow-hidden mb-6">
            <motion.h1 
              className="text-hero font-display font-bold tracking-tight text-foreground leading-none"
              style={{
                transform: `translate(${normalizedX * 5}px, ${normalizedY * 3}px)`,
              }}
            >
              <motion.span
                className="block"
                initial={{ y: "100%" }}
                animate={{ y: mounted ? 0 : "100%" }}
                transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                CRAFTING
              </motion.span>
            </motion.h1>
          </div>

          <div className="overflow-hidden mb-6">
            <motion.h1 
              className="text-hero font-editorial italic font-normal tracking-tight text-foreground leading-none"
              style={{
                transform: `translate(${normalizedX * 8}px, ${normalizedY * 5}px)`,
              }}
            >
              <motion.span
                className="block"
                initial={{ y: "100%" }}
                animate={{ y: mounted ? 0 : "100%" }}
                transition={{ duration: 1, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
              >
                DIGITAL
              </motion.span>
            </motion.h1>
          </div>

          <div className="overflow-hidden mb-12">
            <motion.h1 
              className="text-hero font-display font-bold tracking-tight text-foreground leading-none"
              style={{
                transform: `translate(${normalizedX * 3}px, ${normalizedY * 4}px)`,
              }}
            >
              <motion.span
                className="block"
                initial={{ y: "100%" }}
                animate={{ y: mounted ? 0 : "100%" }}
                transition={{ duration: 1, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
              >
                EXPERIENCES
              </motion.span>
            </motion.h1>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
            >
              A multidisciplinary studio at the intersection of design, 
              technology, and art. Creating immersive digital experiences 
              that challenge conventions.
            </motion.p>

            <motion.div
              className="flex items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: mounted ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              <div className="hidden md:block text-right">
                <p className="text-meta uppercase tracking-[0.15em] text-muted-foreground mb-1">
                  Based in
                </p>
                <p className="text-sm text-foreground/80">
                  Los Angeles, CA
                </p>
              </div>
              <div className="w-px h-12 bg-border hidden md:block" />
              <div className="text-right">
                <p className="text-meta uppercase tracking-[0.15em] text-muted-foreground mb-1">
                  Available for
                </p>
                <p className="text-sm text-foreground/80">
                  Freelance Work
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.button
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        onClick={scrollToWork}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 2, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: 5 }}
        data-testid="button-scroll-down"
      >
        <span className="text-micro uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: mounted ? 1 : 0 }}
        transition={{ duration: 1.5, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </section>
  );
}
