import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { WorkSection } from "@/components/work-section";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { Canvas3D } from "@/components/canvas-3d";
import { TextMarquee } from "@/components/marquee";
import { CustomCursor } from "@/components/custom-cursor";
import { PaintingBackground } from "@/components/painting-background";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background cursor-none">
      <CustomCursor />
      <PaintingBackground />
      <Canvas3D />
      <Navigation />
      <main>
        <HeroSection />
        <TextMarquee />
        <WorkSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
