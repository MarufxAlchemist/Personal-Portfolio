import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { useIntersection } from "@/hooks/use-intersection";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  splitBy?: "letters" | "words";
  animation?: "reveal" | "fade" | "blur" | "slide";
}

const letterVariants: Variants = {
  hidden: { 
    y: "100%", 
    opacity: 0,
  },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.03,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const wordVariants: Variants = {
  hidden: { 
    y: 40, 
    opacity: 0,
  },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.8,
    },
  }),
};

const blurVariants: Variants = {
  hidden: { 
    opacity: 0, 
    filter: "blur(10px)",
  },
  visible: (i: number) => ({
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.04,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const slideVariants: Variants = {
  hidden: { 
    x: -30, 
    opacity: 0,
  },
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: i * 0.06,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export function AnimatedText({
  text,
  className,
  delay = 0,
  as = "h1",
  splitBy = "letters",
  animation = "reveal",
}: AnimatedTextProps) {
  const { ref, hasIntersected } = useIntersection<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  const getVariants = () => {
    switch (animation) {
      case "fade": return fadeVariants;
      case "blur": return blurVariants;
      case "slide": return slideVariants;
      default: return splitBy === "letters" ? letterVariants : wordVariants;
    }
  };

  const variants = getVariants();
  const Component = as;
  const shouldAnimate = hasIntersected && isReady;

  if (splitBy === "letters") {
    const letters = text.split("");
    
    return (
      <Component ref={ref} className={cn("overflow-hidden", className)}>
        <span className="sr-only">{text}</span>
        <span aria-hidden className="inline-flex flex-wrap">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              initial="hidden"
              animate={shouldAnimate ? "visible" : "hidden"}
              variants={variants}
              className="inline-block"
              style={{ 
                display: letter === " " ? "inline" : "inline-block",
                whiteSpace: letter === " " ? "pre" : "normal",
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </span>
      </Component>
    );
  }

  const words = text.split(" ");
  
  return (
    <Component ref={ref} className={cn("overflow-hidden", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline-flex flex-wrap gap-x-[0.25em]">
        {words.map((word, i) => (
          <motion.span
            key={i}
            custom={i}
            initial="hidden"
            animate={shouldAnimate ? "visible" : "hidden"}
            variants={variants}
            className="inline-block"
          >
            {word}
          </motion.span>
        ))}
      </span>
    </Component>
  );
}
