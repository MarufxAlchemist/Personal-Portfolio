import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HoverZone {
  id: string;
  /** Position as percentage of image dimensions */
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  description: string;
  color: string;
  /** Where tooltip appears relative to the zone */
  tooltipPosition: "top" | "bottom" | "left" | "right";
}

const HOVER_ZONES: HoverZone[] = [
  {
    id: "median",
    x: 25,
    y: 30,
    width: 45,
    height: 18,
    label: "Median Projection",
    description: "Expected portfolio growth trajectory — $100 → $230 over 252 trading days",
    color: "#22d3ee",
    tooltipPosition: "top",
  },
  {
    id: "bull-paths",
    x: 45,
    y: 5,
    width: 40,
    height: 25,
    label: "Bull Regime Paths",
    description: "High-volatility upside scenarios — up to +350% returns in extreme cases",
    color: "#c084fc",
    tooltipPosition: "top",
  },
  {
    id: "bear-paths",
    x: 35,
    y: 65,
    width: 40,
    height: 22,
    label: "Bear / Crisis Paths",
    description: "Drawdown scenarios driven by regime-switching to crisis volatility",
    color: "#fbbf24",
    tooltipPosition: "bottom",
  },
  {
    id: "confidence-band",
    x: 15,
    y: 28,
    width: 25,
    height: 25,
    label: "70% Confidence Interval",
    description: "Dense path cluster showing the most probable outcome range",
    color: "#38bdf8",
    tooltipPosition: "right",
  },
  {
    id: "distribution",
    x: 82,
    y: 10,
    width: 16,
    height: 65,
    label: "Terminal Distribution",
    description: "Histogram of final portfolio values across 10,000+ simulated paths",
    color: "#94a3b8",
    tooltipPosition: "left",
  },
  {
    id: "start",
    x: 5,
    y: 55,
    width: 12,
    height: 15,
    label: "Start: $100",
    description: "Initial portfolio value — all simulation paths originate here",
    color: "#f0f0f0",
    tooltipPosition: "right",
  },
];

interface MonteCarloInteractiveProps {
  className?: string;
  isHovered?: boolean;
}

export function MonteCarloInteractive({ className, isHovered }: MonteCarloInteractiveProps) {
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeData = HOVER_ZONES.find((z) => z.id === activeZone);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className || ""}`}
    >
      {/* High-res chart image */}
      <img
        src="/monte-carlo-thumbnail.png"
        alt="Regime-Switching Monte Carlo Simulation — 10,000+ paths across bull, sideways, and crisis regimes"
        className="w-full h-full object-cover select-none"
        draggable={false}
        loading="eager"
        style={{
          imageRendering: "auto",
        }}
      />

      {/* Subtle scan-line overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)",
        }}
      />

      {/* Interactive hover zones */}
      {HOVER_ZONES.map((zone) => (
        <div
          key={zone.id}
          className="absolute cursor-pointer"
          style={{
            left: `${zone.x}%`,
            top: `${zone.y}%`,
            width: `${zone.width}%`,
            height: `${zone.height}%`,
          }}
          onMouseEnter={() => setActiveZone(zone.id)}
          onMouseLeave={() => setActiveZone(null)}
        >
          {/* Glow border on hover */}
          <AnimatePresence>
            {activeZone === zone.id && (
              <motion.div
                className="absolute inset-0 rounded-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  border: `1px solid ${zone.color}40`,
                  background: `${zone.color}08`,
                  boxShadow: `inset 0 0 20px ${zone.color}10, 0 0 15px ${zone.color}08`,
                }}
              />
            )}
          </AnimatePresence>
        </div>
      ))}

      {/* Tooltip */}
      <AnimatePresence>
        {activeData && (
          <motion.div
            key={activeData.id}
            className="absolute z-50 pointer-events-none"
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={getTooltipStyle(activeData)}
          >
            <div
              className="rounded-md px-3 py-2.5 backdrop-blur-xl max-w-[220px] border"
              style={{
                background: "rgba(10, 10, 15, 0.92)",
                borderColor: `${activeData.color}30`,
                boxShadow: `0 4px 24px rgba(0,0,0,0.5), 0 0 15px ${activeData.color}15`,
              }}
            >
              {/* Color accent line */}
              <div
                className="w-6 h-0.5 rounded-full mb-1.5"
                style={{ background: activeData.color }}
              />
              <p
                className="text-[10px] font-semibold uppercase tracking-[0.15em] mb-1 leading-tight"
                style={{ color: activeData.color }}
              >
                {activeData.label}
              </p>
              <p className="text-[9px] leading-[1.4] text-white/60">
                {activeData.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle pulse indicators on zones when parent card is hovered */}
      <AnimatePresence>
        {isHovered && !activeZone && (
          <>
            {HOVER_ZONES.slice(0, 3).map((zone, i) => (
              <motion.div
                key={`pulse-${zone.id}`}
                className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
                style={{
                  left: `${zone.x + zone.width / 2}%`,
                  top: `${zone.y + zone.height / 2}%`,
                  background: zone.color,
                  boxShadow: `0 0 8px ${zone.color}80`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0.5, 1.5, 0.5],
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function getTooltipStyle(zone: HoverZone): React.CSSProperties {
  const base: React.CSSProperties = { position: "absolute" };

  switch (zone.tooltipPosition) {
    case "top":
      return {
        ...base,
        left: `${zone.x + zone.width / 2}%`,
        top: `${zone.y - 2}%`,
        transform: "translate(-50%, -100%)",
      };
    case "bottom":
      return {
        ...base,
        left: `${zone.x + zone.width / 2}%`,
        top: `${zone.y + zone.height + 2}%`,
        transform: "translateX(-50%)",
      };
    case "left":
      return {
        ...base,
        left: `${zone.x - 2}%`,
        top: `${zone.y + zone.height / 2}%`,
        transform: "translate(-100%, -50%)",
      };
    case "right":
      return {
        ...base,
        left: `${zone.x + zone.width + 2}%`,
        top: `${zone.y + zone.height / 2}%`,
        transform: "translateY(-50%)",
      };
  }
}
