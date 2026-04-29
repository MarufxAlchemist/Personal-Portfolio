import { useState, useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  description: string;
  image: string;
  color: string;
  thumbnail?: (props: { isHovered: boolean }) => ReactNode;
  link?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}

export function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [30, -30]);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(y, [-100, 100], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [-100, 100], [-8, 8]), springConfig);
  const scale = useSpring(isHovered ? 1.02 : 1, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative group cursor-pointer perspective-1000",
        isEven ? "md:mr-[15%]" : "md:ml-[15%]"
      )}
      style={{
        rotateX,
        rotateY,
        scale,
        y: yParallax,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
      data-testid={`card-project-${project.id}`}
    >
      <div className="relative overflow-hidden rounded-md bg-card/50">
        <div className="aspect-[16/7] relative overflow-hidden">
          <motion.div
            className="absolute inset-0"
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {project.thumbnail ? (
              <div className="w-full h-full relative">
                <div 
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}15 0%, ${project.color}05 50%, transparent 100%)`,
                  }}
                />
                {project.thumbnail({ isHovered })}
              </div>
            ) : project.image && !project.image.includes("placeholder") ? (
              <div className="w-full h-full relative">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div 
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}15 0%, ${project.color}05 50%, transparent 100%)`,
                  }}
                />
              </div>
            ) : (
              <>
                <div 
                  className="w-full h-full bg-gradient-to-br"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}20 0%, ${project.color}05 50%, transparent 100%)`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="w-3/4 h-3/4 rounded-md bg-gradient-to-br from-foreground/5 to-foreground/10 flex items-center justify-center"
                  >
                    <span className="text-meta uppercase tracking-[0.3em] text-muted-foreground/60">
                      {project.category}
                    </span>
                  </div>
                </div>
              </>
            )}
          </motion.div>
          
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"
            animate={{ opacity: isHovered ? 0.8 : 0.6 }}
            transition={{ duration: 0.4 }}
          />
          
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-6 md:p-8"
            animate={{ opacity: isHovered ? 1 : 0.9 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-micro uppercase tracking-[0.2em] text-muted-foreground">
                    {project.category}
                  </span>
                  <span className="w-8 h-px bg-border" />
                  <span className="text-micro text-muted-foreground">
                    {project.year}
                  </span>
                </div>
                
                <motion.h3 
                  className="text-2xl md:text-3xl lg:text-4xl font-display font-medium tracking-tight text-foreground mb-2"
                >
                  {project.title}
                </motion.h3>
                
                <motion.p 
                  className="text-base text-muted-foreground max-w-md"
                  animate={{ 
                    opacity: isHovered ? 1 : 0.7,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {project.subtitle}
                </motion.p>
              </div>
              
              <motion.div
                className="flex-shrink-0 w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center"
                animate={{
                  scale: isHovered ? 1.1 : 1,
                  borderColor: isHovered ? "hsl(var(--foreground) / 0.4)" : "hsl(var(--foreground) / 0.2)",
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  animate={{ 
                    x: isHovered ? 2 : 0,
                    y: isHovered ? -2 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowUpRight className="w-5 h-5 text-foreground/70" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <motion.div
        className="absolute -inset-px rounded-md pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${project.color}10, transparent 40%)`,
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
