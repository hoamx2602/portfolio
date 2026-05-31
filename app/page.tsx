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
import { getSiteSettings } from '@/sanity/lib/settings'

export default async function Home() {
  // Uses React cache() — deduplicated with layout.tsx fetch
  const { sections, bookingUrl, contact } = await getSiteSettings()

  // undefined = not yet configured → show by default; false = explicitly hidden
  const show = (key: keyof typeof sections) => sections[key] !== false

  return (
    <LanguageProvider>
      <FilterProvider>
        <div className="min-h-screen bg-background relative">
          <ParticleCanvas />
          <Header />
          <main className="relative z-10">
            {show('hero')          && <HeroSection />}
            {show('whyUs')         && <WhyChooseUsSection />}
            {show('about')         && <AboutSection />}
            {show('services')      && <ServicesSection />}
            {show('responsibleAI') && <ResponsibleAISection />}
            {show('training')      && <TrainingSection />}
            {show('projects')      && <ProjectsSection />}
            {show('team')          && <TeamSection />}
            {show('clients')       && <ClientsSection />}
            {show('blog')          && <BlogSection />}
            {show('contact')       && (
              <ContactSection bookingUrl={bookingUrl} contactInfo={contact} />
            )}
          </main>
          <Footer />
        </div>
      </FilterProvider>
    </LanguageProvider>
  )
}
