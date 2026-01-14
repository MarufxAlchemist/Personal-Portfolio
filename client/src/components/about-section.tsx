import { motion } from "framer-motion";
import { RevealSection, RevealGroup } from "./reveal-section";
import { useMousePosition } from "@/hooks/use-mouse-position";

const capabilities = [
  "Brand Strategy",
  "Visual Identity",
  "Web Development",
  "Motion Design",
  "3D & WebGL",
  "Creative Direction",
  "UI/UX Design",
  "Interactive Experiences",
];

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "12", label: "Years Experience" },
  { value: "8", label: "Awards Won" },
  { value: "∞", label: "Ideas Explored" },
];

export function AboutSection() {
  const { normalizedX, normalizedY } = useMousePosition();

  return (
    <section 
      id="about" 
      className="relative py-dramatic overflow-hidden"
      data-testid="section-about"
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-[10%] w-64 h-64 rounded-full border border-foreground/5"
          style={{
            transform: `translate(${normalizedX * 15}px, ${normalizedY * 15}px)`,
          }}
        />
        <motion.div
          className="absolute bottom-40 left-[5%] w-40 h-40 rounded-full border border-foreground/8"
          style={{
            transform: `translate(${normalizedX * -20}px, ${normalizedY * -20}px)`,
          }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <RevealSection>
              <span className="text-meta uppercase tracking-[0.3em] text-muted-foreground block mb-8">
                About
              </span>
            </RevealSection>

            <RevealSection delay={0.1}>
              <h2 className="text-section md:text-7xl font-display font-medium tracking-tight text-foreground mb-12 leading-[0.9]">
                Building at the
                <br />
                <span className="font-editorial italic font-light">edge of possible</span>
              </h2>
            </RevealSection>

            <RevealSection delay={0.2}>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 max-w-xl">
                I'm a creative developer and digital artist with over a decade of 
                experience crafting memorable digital experiences. My work lives 
                at the intersection of design, technology, and storytelling.
              </p>
            </RevealSection>

            <RevealSection delay={0.3}>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-20 max-w-xl">
                I believe in the power of digital craft to evoke emotion, challenge 
                perception, and create lasting impact. Every project is an opportunity 
                to push boundaries and discover something new.
              </p>
            </RevealSection>

            <RevealSection delay={0.4}>
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-4xl md:text-5xl font-display font-medium text-foreground mb-1">
                      {stat.value}
                    </p>
                    <p className="text-meta uppercase tracking-[0.15em] text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>

          <div className="lg:pt-24">
            <RevealSection delay={0.2}>
              <h3 className="text-meta uppercase tracking-[0.3em] text-muted-foreground mb-8">
                Capabilities
              </h3>
            </RevealSection>

            <div className="space-y-0">
              {capabilities.map((capability, i) => (
                <RevealSection 
                  key={capability} 
                  delay={0.25 + i * 0.05}
                  animation="slide-left"
                >
                  <motion.div
                    className="group py-4 border-b border-border/50 flex items-center justify-between cursor-default"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="text-xl md:text-2xl font-display text-foreground/90 group-hover:text-foreground transition-colors">
                      {capability}
                    </span>
                    <span className="text-micro text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </motion.div>
                </RevealSection>
              ))}
            </div>

            <RevealSection delay={0.7} className="mt-16">
              <div className="p-8 bg-card/30 rounded-md">
                <p className="text-meta uppercase tracking-[0.2em] text-muted-foreground mb-4">
                  Philosophy
                </p>
                <blockquote className="text-xl md:text-2xl font-editorial italic text-foreground/90 leading-relaxed">
                  "The best digital experiences don't just function—they feel. 
                  They resonate with users on a level that transcends utility."
                </blockquote>
              </div>
            </RevealSection>
          </div>
        </div>
      </div>
    </section>
  );
}
