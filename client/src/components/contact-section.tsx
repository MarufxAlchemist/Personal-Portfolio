import { motion } from "framer-motion";
import { RevealSection } from "./reveal-section";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { SiGithub, SiLinkedin, SiDribbble, SiX } from "react-icons/si";

const socialLinks = [
  { icon: SiX, label: "Twitter", href: "#" },
  { icon: SiGithub, label: "GitHub", href: "#" },
  { icon: SiLinkedin, label: "LinkedIn", href: "#" },
  { icon: SiDribbble, label: "Dribbble", href: "#" },
];

export function ContactSection() {
  return (
    <section 
      id="contact" 
      className="relative py-dramatic"
      data-testid="section-contact"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <RevealSection>
            <span className="text-meta uppercase tracking-[0.3em] text-muted-foreground block mb-8">
              Get in Touch
            </span>
          </RevealSection>

          <RevealSection delay={0.1}>
            <h2 className="text-section md:text-hero-sub font-display font-medium tracking-tight text-foreground mb-6">
              Let's create
              <br />
              <span className="font-editorial italic">something extraordinary</span>
            </h2>
          </RevealSection>

          <RevealSection delay={0.2}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
              Whether you have a project in mind, want to collaborate, or just 
              want to say hello—I'd love to hear from you.
            </p>
          </RevealSection>

          <RevealSection delay={0.3}>
            <motion.a
              href="mailto:hello@studio.design"
              className="inline-flex items-center gap-3 text-2xl md:text-3xl font-display text-foreground group mb-16"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-testid="link-email"
            >
              <Mail className="w-6 h-6 md:w-8 md:h-8 text-muted-foreground group-hover:text-foreground transition-colors" />
              hello@studio.design
              <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </motion.a>
          </RevealSection>

          <RevealSection delay={0.4}>
            <div className="flex items-center justify-center gap-6 mb-16">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.label}
                  data-testid={`link-social-${link.label.toLowerCase()}`}
                >
                  <link.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </RevealSection>

          <RevealSection delay={0.5}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Los Angeles, CA</span>
              </div>
              <span className="hidden md:block text-border">|</span>
              <span className="text-sm">Available for freelance</span>
              <span className="hidden md:block text-border">|</span>
              <span className="text-sm">Open to remote work</span>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}
