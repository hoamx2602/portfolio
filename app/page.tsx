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
import { client } from '@/sanity/lib/client'

type Sections = {
  hero?: boolean
  whyUs?: boolean
  about?: boolean
  services?: boolean
  responsibleAI?: boolean
  training?: boolean
  projects?: boolean
  team?: boolean
  clients?: boolean
  blog?: boolean
  contact?: boolean
}

const SETTINGS_QUERY = `*[_type == "siteSettings"][0]{ sections }`

export default async function Home() {
  let sections: Sections = {}

  try {
    const data = await client.fetch<{ sections?: Sections }>(
      SETTINGS_QUERY,
      {},
      { next: { revalidate: 30 } }
    )
    sections = data?.sections ?? {}
  } catch {
    // fallback: show all sections
  }

  // undefined = not configured → show by default; false = explicitly hidden
  const show = (key: keyof Sections) => sections[key] !== false

  return (
    <LanguageProvider>
      <FilterProvider>
        <div className="min-h-screen bg-background relative">
          <ParticleCanvas />
          <Header visibleSections={sections} />
          <main className="relative z-10">
            {show('hero') && <HeroSection />}
            {show('whyUs') && <WhyChooseUsSection />}
            {show('about') && <AboutSection />}
            {show('services') && <ServicesSection />}
            {show('responsibleAI') && <ResponsibleAISection />}
            {show('training') && <TrainingSection />}
            {show('projects') && <ProjectsSection />}
            {show('team') && <TeamSection />}
            {show('clients') && <ClientsSection />}
            {show('blog') && <BlogSection />}
            {show('contact') && <ContactSection />}
          </main>
          <Footer />
        </div>
      </FilterProvider>
    </LanguageProvider>
  )
}
