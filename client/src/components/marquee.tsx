import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  pauseOnHover?: boolean;
  reverse?: boolean;
}

export function Marquee({
  children,
  className,
  speed = 30,
  pauseOnHover = false,
  reverse = false,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "overflow-hidden flex",
        pauseOnHover && "group",
        className
      )}
    >
      <motion.div
        className={cn(
          "flex shrink-0",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        animate={{
          x: reverse ? ["0%", "100%"] : ["0%", "-100%"],
        }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {children}
      </motion.div>
      <motion.div
        className={cn(
          "flex shrink-0",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        animate={{
          x: reverse ? ["0%", "100%"] : ["0%", "-100%"],
        }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function TextMarquee() {
  const items = [
    "DESIGN",
    "DEVELOP",
    "CREATE",
    "INNOVATE",
    "CRAFT",
    "BUILD",
    "IMAGINE",
    "EXPLORE",
  ];

  return (
    <div className="py-12 border-y border-border/30 overflow-hidden">
      <Marquee speed={40} className="py-4">
        <div className="flex items-center gap-8 px-4">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-8">
              <span className="text-6xl md:text-8xl font-display font-medium text-foreground/10 whitespace-nowrap">
                {item}
              </span>
              <span className="w-3 h-3 rounded-full bg-foreground/10" />
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
}
