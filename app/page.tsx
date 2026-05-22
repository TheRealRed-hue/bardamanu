import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { LocationsSection } from "@/components/locations-section"
import { DrinksSection } from "@/components/drinks-section"
import { EventsSection } from "@/components/events-section"
import { GallerySection } from "@/components/gallery-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { FloatingParticles } from "@/components/floating-particles"

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      <FloatingParticles />
      <Header />
      <HeroSection />
      <AboutSection />
      <LocationsSection />
      <DrinksSection />
      <EventsSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </main>
  )
}
