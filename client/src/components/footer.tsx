import { motion } from "framer-motion";
import { RevealSection } from "./reveal-section";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="relative py-12 border-t border-border/30"
      data-testid="footer"
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <RevealSection animation="fade">
            <div className="flex items-center gap-4">
              <span className="text-xl font-display font-medium text-foreground">
                STUDIO
              </span>
              <span className="text-muted-foreground text-sm">
                © {currentYear}
              </span>
            </div>
          </RevealSection>

          <RevealSection animation="fade" delay={0.1}>
            <div className="flex items-center gap-8">
              <motion.a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ x: 2 }}
                data-testid="link-privacy"
              >
                Privacy
              </motion.a>
              <motion.a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ x: 2 }}
                data-testid="link-terms"
              >
                Terms
              </motion.a>
              <motion.a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ x: 2 }}
                data-testid="link-colophon"
              >
                Colophon
              </motion.a>
            </div>
          </RevealSection>

          <RevealSection animation="fade" delay={0.2}>
            <p className="text-micro uppercase tracking-[0.15em] text-muted-foreground">
              Designed & Built with intention
            </p>
          </RevealSection>
        </div>
      </div>
    </footer>
  );
}
