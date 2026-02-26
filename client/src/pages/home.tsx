import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { WorkSection } from "@/components/work-section";
import { AboutSection } from "@/components/about-section";
import { SkillsSection } from "@/components/skills-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { Canvas3D } from "@/components/canvas-3d";
import { TextMarquee } from "@/components/marquee";
import { CustomCursor } from "@/components/custom-cursor";
import { PaintingBackground } from "@/components/painting-background";
//home
export default function Home() {
  return (
    <div className="relative min-h-screen cursor-none">
      <CustomCursor />
      <PaintingBackground />
      <Canvas3D />
      <Navigation />
      <main>
        <HeroSection />
        <TextMarquee />
        <WorkSection />
        <AboutSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
