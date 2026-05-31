'use client'

import { LanguageProvider } from '@/components/language-context'
import { FilterProvider } from '@/components/filter-context'
import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { WhyChooseUsSection } from '@/components/why-choose-us-section'
import { AboutSection } from '@/components/about-section'
import { ServicesSection } from '@/components/services-section'
import { ResponsibleAISection } from '@/components/responsible-ai-section'
import { TrainingSection } from '@/components/training-section'
import { ProjectsSection } from '@/components/projects-section'
import { TeamSection } from '@/components/team-section'
import { ClientsSection } from '@/components/clients-section'
import { BlogSection } from '@/components/blog-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'
import { ParticleCanvas } from '@/components/particle-canvas'

export default function Home() {
  return (
    <LanguageProvider>
      <FilterProvider>
        <div className="min-h-screen bg-background relative">
          <ParticleCanvas />
          <Header />
          <main className="relative z-10">
            <HeroSection />
            <WhyChooseUsSection />
            <AboutSection />
            <ServicesSection />
            <ResponsibleAISection />
            <TrainingSection />
            <ProjectsSection />
            <TeamSection />
            <ClientsSection />
            <BlogSection />
            <ContactSection />
          </main>
          <Footer />
        </div>
      </FilterProvider>
    </LanguageProvider>
  )
}
