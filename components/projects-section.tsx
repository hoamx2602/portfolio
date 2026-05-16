'use client'

import { useState } from 'react'
import { ArrowRight, X, Play, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/components/language-context'
import { cn } from '@/lib/utils'

type Project = {
  id: string
  title: string
  client: string
  category: string
  description: string
  metrics: string[]
  image: string
  fullDescription: string
  challenge: string
  solution: string
  results: string[]
  technologies: string[]
  videoUrl: string
  images: string[]
}

const projects: Project[] = [
  {
    id: 'smart-factory',
    title: 'Smart Factory Transformation',
    client: 'Global Manufacturing Corp',
    category: 'IIoT',
    description: 'Implemented a comprehensive IIoT solution reducing downtime by 40% and increasing production efficiency by 25%.',
    metrics: ['40% Downtime Reduction', '25% Efficiency Increase', '$2M Annual Savings'],
    image: 'from-blue-500/20 to-cyan-500/20',
    fullDescription: 'A complete digital transformation of a 50-year-old manufacturing facility, bringing Industry 4.0 capabilities to legacy equipment through strategic IoT sensor deployment and real-time analytics.',
    challenge: 'The client faced significant production losses due to unexpected equipment failures and inefficient maintenance schedules. Their legacy systems lacked visibility into machine health and performance metrics.',
    solution: 'We deployed over 500 IoT sensors across critical machinery, implemented edge computing for real-time data processing, and built a centralized dashboard for predictive maintenance alerts. Machine learning models were trained on historical data to predict failures 72 hours in advance.',
    results: [
      'Reduced unplanned downtime by 40%',
      'Increased overall equipment effectiveness (OEE) by 25%',
      'Achieved $2M in annual cost savings',
      'Reduced maintenance costs by 30%',
      'Improved worker safety with real-time hazard detection',
    ],
    technologies: ['Azure IoT Hub', 'Apache Kafka', 'TensorFlow', 'Power BI', 'Edge Computing'],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    images: ['/images/project-1-1.jpg', '/images/project-1-2.jpg', '/images/project-1-3.jpg'],
  },
  {
    id: 'ai-customer-service',
    title: 'AI-Powered Customer Service',
    client: 'FinTech Solutions Ltd',
    category: 'AI',
    description: 'Deployed conversational AI handling 80% of customer inquiries automatically with 95% satisfaction rate.',
    metrics: ['80% Automation Rate', '95% Satisfaction', '60% Cost Reduction'],
    image: 'from-emerald-500/20 to-teal-500/20',
    fullDescription: 'An intelligent customer service platform that combines natural language processing, sentiment analysis, and multi-channel support to deliver exceptional customer experiences at scale.',
    challenge: 'The financial services company was struggling with high call volumes, long wait times, and inconsistent service quality across their support channels. Customer satisfaction scores were declining, and operational costs were increasing.',
    solution: 'We developed a multi-channel AI assistant using advanced NLP models, integrated with their existing CRM and knowledge base. The system handles complex financial queries, performs secure account lookups, and seamlessly escalates to human agents when needed.',
    results: [
      'Automated 80% of routine customer inquiries',
      'Achieved 95% customer satisfaction rating',
      'Reduced support costs by 60%',
      'Decreased average response time from 15 minutes to 30 seconds',
      'Enabled 24/7 customer support availability',
    ],
    technologies: ['OpenAI GPT-4', 'LangChain', 'Pinecone', 'Twilio', 'Salesforce Integration'],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    images: ['/images/project-2-1.jpg', '/images/project-2-2.jpg', '/images/project-2-3.jpg'],
  },
  {
    id: 'enterprise-rpa',
    title: 'Enterprise Process Automation',
    client: 'Healthcare Systems Inc',
    category: 'RPA',
    description: 'Automated 200+ business processes saving 50,000 hours annually across multiple departments.',
    metrics: ['200+ Processes', '50K Hours Saved', '99.9% Accuracy'],
    image: 'from-orange-500/20 to-amber-500/20',
    fullDescription: 'A comprehensive robotic process automation implementation that transformed back-office operations across finance, HR, and patient services departments in a major healthcare network.',
    challenge: 'The healthcare organization was burdened by manual, repetitive processes across departments, leading to errors, delays, and staff burnout. Claims processing alone required 40 FTEs and had a 5% error rate.',
    solution: 'We conducted process mining to identify automation opportunities, designed and deployed 200+ RPA bots using UiPath, and implemented an intelligent orchestration layer. Bots handle everything from claims processing to employee onboarding.',
    results: [
      'Automated 200+ business processes',
      'Saved 50,000 work hours annually',
      'Achieved 99.9% accuracy rate',
      'Reduced claims processing time by 75%',
      'Freed up 35 FTEs for higher-value work',
    ],
    technologies: ['UiPath', 'Process Mining', 'OCR', 'Azure Functions', 'SQL Server'],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    images: ['/images/project-3-1.jpg', '/images/project-3-2.jpg', '/images/project-3-3.jpg'],
  },
]

export function ProjectsSection() {
  const { t } = useLanguage()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <>
      <section id="projects" className="py-24" aria-labelledby="projects-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-16">
            <h2 id="projects-title" className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
              {t.projects.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              {t.projects.subtitle}
            </p>
          </header>

          <div className="grid lg:grid-cols-3 gap-8" role="list" aria-label="Featured projects">
            {projects.map((project) => (
              <article
                key={project.id}
                className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedProject(project)}
                role="listitem"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelectedProject(project)
                  }
                }}
                aria-label={`View details for ${project.title}`}
              >
                <div className={`h-48 bg-gradient-to-br ${project.image} flex items-center justify-center relative overflow-hidden`} aria-hidden="true">
                  <div className="w-16 h-16 rounded-xl bg-background/50 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">{project.category}</span>
                  </div>
                  <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-primary font-medium flex items-center gap-2">
                      View Details <ExternalLink className="w-4 h-4" />
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <Badge variant="secondary" className="mb-3">
                    {project.category}
                  </Badge>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    {project.client}
                  </p>
                  
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <ul className="flex flex-wrap gap-2 mb-4" aria-label="Project metrics">
                    {project.metrics.map((metric) => (
                      <li
                        key={metric}
                        className="px-2 py-1 text-xs font-medium text-primary bg-primary/10 rounded"
                      >
                        {metric}
                      </li>
                    ))}
                  </ul>

                  <span className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all">
                    {t.projects.viewCase}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <div 
            className="bg-card border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            role="document"
          >
            {/* Modal Header */}
            <div className={`h-48 bg-gradient-to-br ${selectedProject.image} relative`} aria-hidden="true">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 bg-background/50 hover:bg-background/80"
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </Button>
              <div className="absolute bottom-4 left-6">
                <Badge variant="secondary" className="mb-2">
                  {selectedProject.category}
                </Badge>
                <h2 id="project-modal-title" className="text-2xl font-bold text-foreground">
                  {selectedProject.title}
                </h2>
                <p className="text-muted-foreground">{selectedProject.client}</p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-8">
              {/* Overview */}
              <section>
                <h3 className="text-lg font-semibold text-foreground mb-3">Overview</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedProject.fullDescription}
                </p>
              </section>

              {/* Video Section */}
              <section>
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Play className="w-5 h-5 text-primary" aria-hidden="true" /> Project Video
                </h3>
                <div className="aspect-video bg-secondary rounded-xl overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3" aria-hidden="true">
                        <Play className="w-8 h-8 text-primary ml-1" />
                      </div>
                      <p className="text-sm text-muted-foreground">Video presentation coming soon</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Challenge & Solution */}
              <div className="grid md:grid-cols-2 gap-6">
                <section className="bg-secondary/50 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-foreground mb-3">The Challenge</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {selectedProject.challenge}
                  </p>
                </section>
                <section className="bg-secondary/50 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Our Solution</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {selectedProject.solution}
                  </p>
                </section>
              </div>

              {/* Results */}
              <section>
                <h3 className="text-lg font-semibold text-foreground mb-3">Key Results</h3>
                <ol className="grid sm:grid-cols-2 gap-3" aria-label="Key project results">
                  {selectedProject.results.map((result, index) => (
                    <li 
                      key={index}
                      className="flex items-start gap-3 bg-primary/5 rounded-lg p-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0" aria-hidden="true">
                        <span className="text-xs font-bold text-primary">{index + 1}</span>
                      </div>
                      <span className="text-sm text-foreground">{result}</span>
                    </li>
                  ))}
                </ol>
              </section>

              {/* Technologies */}
              <section>
                <h3 className="text-lg font-semibold text-foreground mb-3">Technologies Used</h3>
                <ul className="flex flex-wrap gap-2" aria-label="Technologies used in this project">
                  {selectedProject.technologies.map((tech) => (
                    <li key={tech}>
                      <Badge variant="outline" className="bg-secondary">
                        {tech}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Gallery */}
              <section>
                <h3 className="text-lg font-semibold text-foreground mb-3">Project Gallery</h3>
                <div className="grid grid-cols-3 gap-4" role="list" aria-label="Project images">
                  {[1, 2, 3].map((i) => (
                    <div 
                      key={i}
                      className={cn(
                        "aspect-video rounded-lg bg-gradient-to-br flex items-center justify-center",
                        selectedProject.image
                      )}
                      role="listitem"
                      aria-label={`Project image ${i}`}
                    >
                      <span className="text-xs text-muted-foreground" aria-hidden="true">Image {i}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* CTA */}
              <div className="flex gap-4 pt-4 border-t border-border">
                <Button className="flex-1 gap-2">
                  Request Similar Solution
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Button>
                <Button variant="outline" onClick={() => setSelectedProject(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
