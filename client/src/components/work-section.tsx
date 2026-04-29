import { useState } from "react";
import { motion } from "framer-motion";
import { ProjectCard, type Project } from "./project-card";
import { ProjectModal } from "./project-modal";
import { RevealSection } from "./reveal-section";
import { FloatingShapes } from "./floating-shapes";
import { MonteCarloInteractive } from "./monte-carlo-interactive";


const projects: Project[] = [
  {
    id: "1",
    title: "REGIME-SWITCHING MONTE CARLO",
    subtitle: "Systemic risk engine with Hidden Markov regime detection and contagion-aware VaR estimation",
    category: "Quantitative Finance",
    year: "2025",
    description: "A production-grade systemic risk simulation engine that combines Hidden Markov Models for market regime detection with Monte Carlo path generation. Features dynamic correlation networks, Cholesky-decomposed contagion propagation, and expanding-window backtesting. The engine estimates Value-at-Risk across bull, sideways, and crisis regimes using 10,000+ simulated paths with regime-switching volatility and drift parameters calibrated on real multi-sector ETF data.",
    image: "/monte-carlo-thumbnail.png",
    color: "#22d3ee",
    thumbnail: ({ isHovered }) => (
      <MonteCarloInteractive
        className="absolute inset-0"
        isHovered={isHovered}
      />
    ),
    link: "https://github.com/MarufxAlchemist/Regime-Switching-Monte-Carlo-Simulation",
  },
  {
    id: "2",
    title: "ECHOES",
    subtitle: "Spatial audio visualization for ambient music platform",
    category: "Creative Platform",
    year: "2024",
    description: "A revolutionary music platform that transforms sound into visual art. Each track generates unique particle systems and geometric patterns that dance in three-dimensional space. The interface itself becomes an instrument, allowing listeners to manipulate and shape their audio environment.",
    image: "/placeholder-2.jpg",
    color: "#8b5cf6",
  },
  {
    id: "3",
    title: "VOID THEORY",
    subtitle: "Experimental fashion brand with generative visual identity",
    category: "Brand Identity",
    year: "2023",
    description: "Complete brand redesign for an avant-garde fashion house. The visual identity system uses generative algorithms to create ever-evolving patterns and compositions. No two touchpoints are identical, reflecting the brand's commitment to uniqueness and artistic expression.",
    image: "/placeholder-3.jpg",
    color: "#ec4899",
  },
  {
    id: "4",
    title: "NEURAL DRIFT",
    subtitle: "AI-powered creative tool for digital artists",
    category: "Product Design",
    year: "2023",
    description: "An innovative creative tool that bridges human intuition with machine learning. Artists can collaborate with AI to generate, iterate, and refine their visions. The interface disappears into the background, letting creativity flow unobstructed.",
    image: "/placeholder-4.jpg",
    color: "#14b8a6",
  },
  {
    id: "5",
    title: "ARCHIVE ZERO",
    subtitle: "Digital preservation platform for independent artists",
    category: "Web Application",
    year: "2023",
    description: "A platform dedicated to preserving and celebrating independent digital art. Features include decentralized storage, provenance tracking, and immersive viewing experiences. The design honors both the art and the artists who create it.",
    image: "/placeholder-5.jpg",
    color: "#f59e0b",
  },
];

export function WorkSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section 
      id="work" 
      className="relative py-dramatic"
      data-testid="section-work"
    >
      <FloatingShapes variant="section" className="opacity-50" />

      <div className="container mx-auto px-6 md:px-12">
        <RevealSection className="mb-32 md:mb-48">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12">
            <div className="max-w-3xl">
              <span className="text-meta uppercase tracking-[0.4em] text-muted-foreground block mb-6">
                Selected Work
              </span>
              <h2 className="text-section md:text-7xl font-display font-medium tracking-tight text-foreground leading-[0.9]">
                Projects that
                <br />
                <span className="font-editorial italic font-light">push boundaries</span>
              </h2>
            </div>
            <p className="text-muted-foreground max-w-sm text-xl leading-relaxed">
              A curated collection of digital experiences, brand identities, and 
              creative experiments from the past years.
            </p>
          </div>
        </RevealSection>

        <div className="space-y-32 md:space-y-56">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onSelect={setSelectedProject}
            />
          ))}
        </div>

        <RevealSection className="mt-24 md:mt-40 text-center" delay={0.2}>
          <p className="text-muted-foreground mb-6">
            Interested in seeing more?
          </p>
          <motion.button
            className="inline-flex items-center gap-3 text-lg font-display text-foreground group"
            whileHover={{ x: 10 }}
            transition={{ duration: 0.3 }}
            data-testid="button-view-all-projects"
          >
            View All Projects
            <span className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </motion.button>
        </RevealSection>
      </div>

      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
}
