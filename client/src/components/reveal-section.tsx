import { motion, Variants } from "framer-motion";
import { useIntersection } from "@/hooks/use-intersection";
import { cn } from "@/lib/utils";

interface RevealSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: "fade" | "slide-up" | "slide-left" | "scale" | "blur";
  threshold?: number;
  stagger?: number;
}

const animations: Record<string, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    },
  },
  "slide-up": {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    },
  },
  "slide-left": {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(8px)" },
    visible: { 
      opacity: 1, 
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    },
  },
};

export function RevealSection({
  children,
  className,
  delay = 0,
  animation = "slide-up",
  threshold = 0.1,
}: RevealSectionProps) {
  const { ref, hasIntersected } = useIntersection<HTMLDivElement>({
    threshold,
    triggerOnce: true,
    rootMargin: "-50px",
  });

  const variants = animations[animation];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={hasIntersected ? "visible" : "hidden"}
      variants={variants}
      className={cn(className)}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </motion.div>
  );
}

interface RevealGroupProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  animation?: "fade" | "slide-up" | "slide-left" | "scale" | "blur";
}

const containerVariants: Variants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: {
      staggerChildren: stagger,
    },
  }),
};

export function RevealGroup({
  children,
  className,
  stagger = 0.1,
  animation = "slide-up",
}: RevealGroupProps) {
  const { ref, hasIntersected } = useIntersection<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={hasIntersected ? "visible" : "hidden"}
      variants={containerVariants}
      custom={stagger}
      className={cn(className)}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={animations[animation]}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}
