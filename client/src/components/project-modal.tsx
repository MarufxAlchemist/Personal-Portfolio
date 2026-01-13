import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Project } from "./project-card";
import { cn } from "@/lib/utils";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence mode="wait">
      {project && (
        <>
          <motion.div
            className="fixed inset-0 bg-background/95 backdrop-blur-xl z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={onClose}
            data-testid="modal-backdrop"
          />
          
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto pointer-events-auto bg-card/50 backdrop-blur-sm rounded-md"
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 40 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              data-testid="modal-project"
            >
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-4 right-4 z-10"
                onClick={onClose}
                data-testid="button-close-modal"
              >
                <X className="w-5 h-5" />
              </Button>

              <div className="aspect-video relative overflow-hidden rounded-t-md">
                <div 
                  className="w-full h-full bg-gradient-to-br"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}30 0%, ${project.color}10 50%, hsl(var(--card)) 100%)`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    className="w-2/3 h-2/3 rounded-md bg-gradient-to-br from-foreground/5 to-foreground/15 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <span className="text-meta uppercase tracking-[0.3em] text-muted-foreground/60">
                      Project Preview
                    </span>
                  </motion.div>
                </div>
              </div>

              <div className="p-8 md:p-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-micro uppercase tracking-[0.2em] text-muted-foreground">
                      {project.category}
                    </span>
                    <span className="w-8 h-px bg-border" />
                    <span className="text-micro text-muted-foreground">
                      {project.year}
                    </span>
                  </div>

                  <h2 className="text-section font-display font-medium tracking-tight text-foreground mb-4">
                    {project.title}
                  </h2>

                  <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                    {project.subtitle}
                  </p>
                </motion.div>

                <motion.div
                  className="grid md:grid-cols-2 gap-12 mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                >
                  <div>
                    <h4 className="text-meta uppercase tracking-[0.15em] text-muted-foreground mb-4">
                      Overview
                    </h4>
                    <p className="text-foreground/80 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-meta uppercase tracking-[0.15em] text-muted-foreground mb-3">
                        Services
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {["Strategy", "Design", "Development", "Motion"].map((service) => (
                          <span 
                            key={service}
                            className="px-3 py-1 text-sm bg-muted/50 text-muted-foreground rounded-sm"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-meta uppercase tracking-[0.15em] text-muted-foreground mb-3">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {["React", "Three.js", "GSAP", "Node.js"].map((tech) => (
                          <span 
                            key={tech}
                            className="px-3 py-1 text-sm bg-muted/50 text-muted-foreground rounded-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.5 }}
                >
                  <Button 
                    className="group gap-2"
                    data-testid="button-view-live"
                  >
                    View Live Project
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    data-testid="button-case-study"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Case Study
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
