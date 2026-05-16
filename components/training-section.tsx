'use client'

import { useState } from 'react'
import { Clock, Users, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/components/language-context'
import { useFilter, ServiceCategory } from '@/components/filter-context'
import { cn } from '@/lib/utils'

type ModuleDay = {
  day: number
  title: string
  topics: string[]
}

type TrainingModule = {
  id: string
  category: ServiceCategory
  title: string
  duration: string
  level: string
  color: string
  days: ModuleDay[]
}

const trainingModules: TrainingModule[] = [
  // AI Modules
  {
    id: 'python-fundamentals',
    category: 'ai',
    title: 'Python Fundamentals',
    duration: '5 days',
    level: 'Beginner',
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    days: [
      { day: 1, title: 'Python Basics', topics: ['Variables & Data Types', 'Control Flow', 'Functions'] },
      { day: 2, title: 'Data Structures', topics: ['Lists & Tuples', 'Dictionaries', 'Sets'] },
      { day: 3, title: 'Object-Oriented Programming', topics: ['Classes & Objects', 'Inheritance', 'Polymorphism'] },
      { day: 4, title: 'File Handling & Modules', topics: ['File I/O', 'Exception Handling', 'Custom Modules'] },
      { day: 5, title: 'Python for Data Science', topics: ['NumPy Basics', 'Pandas Introduction', 'Data Visualization with Matplotlib'] },
    ],
  },
  {
    id: 'ml-hands-on',
    category: 'ai',
    title: 'ML Hands-On',
    duration: '5 days',
    level: 'Intermediate',
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    days: [
      { day: 1, title: 'ML Fundamentals', topics: ['Supervised vs Unsupervised', 'Model Evaluation', 'Train/Test Split'] },
      { day: 2, title: 'Regression Techniques', topics: ['Linear Regression', 'Polynomial Regression', 'Regularization'] },
      { day: 3, title: 'Classification Algorithms', topics: ['Logistic Regression', 'Decision Trees', 'Random Forest'] },
      { day: 4, title: 'Clustering & Dimensionality', topics: ['K-Means Clustering', 'PCA', 'Feature Selection'] },
      { day: 5, title: 'Model Deployment', topics: ['Model Serialization', 'API Development', 'Production Best Practices'] },
    ],
  },
  {
    id: 'advanced-python-analytics',
    category: 'ai',
    title: 'Advanced Python & Data Analytics',
    duration: '5 days',
    level: 'Advanced',
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    days: [
      { day: 1, title: 'Advanced Pandas', topics: ['MultiIndex', 'Time Series Analysis', 'Data Aggregation'] },
      { day: 2, title: 'Data Visualization', topics: ['Seaborn', 'Plotly Interactive Charts', 'Dashboard Creation'] },
      { day: 3, title: 'Statistical Analysis', topics: ['Hypothesis Testing', 'A/B Testing', 'Correlation Analysis'] },
      { day: 4, title: 'Big Data Processing', topics: ['PySpark Basics', 'Distributed Computing', 'Data Pipelines'] },
      { day: 5, title: 'Real-World Projects', topics: ['End-to-End Analytics Project', 'Business Intelligence', 'Reporting Automation'] },
    ],
  },
  // IIoT Modules
  {
    id: 'iiot-fundamentals',
    category: 'iiot',
    title: 'IIoT Implementation',
    duration: '5 days',
    level: 'Intermediate',
    color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    days: [
      { day: 1, title: 'Perceptron & Neural Networks', topics: ['Single Layer Perceptron', 'Activation Functions', 'Backpropagation Basics'] },
      { day: 2, title: 'Data Pipelines', topics: ['ETL Processes', 'Real-time Data Streaming', 'Message Queues (MQTT, Kafka)'] },
      { day: 3, title: 'Edge Computing', topics: ['Edge vs Cloud', 'Edge Device Programming', 'Data Preprocessing at Edge'] },
      { day: 4, title: 'Predictive Maintenance', topics: ['Sensor Data Analysis', 'Anomaly Detection', 'Failure Prediction Models'] },
      { day: 5, title: 'IIoT Security & Integration', topics: ['Industrial Protocols', 'Security Best Practices', 'System Integration'] },
    ],
  },
  // RPA Modules
  {
    id: 'rpa-development',
    category: 'rpa',
    title: 'RPA Development',
    duration: '5 days',
    level: 'Intermediate',
    color: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    days: [
      { day: 1, title: 'RPA Fundamentals', topics: ['Introduction to RPA', 'Process Assessment', 'Automation Candidates'] },
      { day: 2, title: 'Bot Development Basics', topics: ['Recording & Playback', 'Variables & Arguments', 'Control Flow'] },
      { day: 3, title: 'Advanced Automation', topics: ['Excel Automation', 'Web Scraping', 'Email Automation'] },
      { day: 4, title: 'Orchestration & Management', topics: ['Bot Scheduling', 'Queue Management', 'Error Handling'] },
      { day: 5, title: 'UiPath Studio', topics: ['UiPath Environment Setup', 'Building Production Bots', 'Deployment & Monitoring'] },
    ],
  },
]

export function TrainingSection() {
  const { t } = useLanguage()
  const { activeFilter, setActiveFilter } = useFilter()
  const [expandedModules, setExpandedModules] = useState<string[]>([])

  const filteredModules = activeFilter === 'all' 
    ? trainingModules 
    : trainingModules.filter(m => m.category === activeFilter)

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    )
  }

  const filterButtons: { id: ServiceCategory; label: string }[] = [
    { id: 'all', label: 'All Programs' },
    { id: 'ai', label: 'Artificial Intelligence' },
    { id: 'iiot', label: 'Industrial IoT' },
    { id: 'rpa', label: 'RPA' },
  ]

  return (
    <section id="training" className="py-24 bg-secondary/30" aria-labelledby="training-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h2 id="training-title" className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            {t.training.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {t.training.subtitle}
          </p>
        </header>

        {/* Filter Buttons */}
        <nav aria-label="Filter training programs" className="flex flex-wrap justify-center gap-3 mb-12" role="group">
          {filterButtons.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? 'default' : 'outline'}
              onClick={() => setActiveFilter(filter.id)}
              className="min-w-[140px]"
              aria-pressed={activeFilter === filter.id}
            >
              {filter.label}
            </Button>
          ))}
        </nav>

        {/* Training Modules */}
        <div className="grid gap-6" role="list" aria-label="Training modules">
          {filteredModules.map((module) => {
            const isExpanded = expandedModules.includes(module.id)
            
            return (
              <article
                key={module.id}
                className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-colors"
                role="listitem"
              >
                {/* Module Header */}
                <div 
                  className="p-6 cursor-pointer flex items-center justify-between"
                  onClick={() => toggleModule(module.id)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  aria-controls={`module-content-${module.id}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      toggleModule(module.id)
                    }
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-xl font-semibold text-foreground">
                          {module.title}
                        </h3>
                        <Badge variant="outline" className={module.color}>
                          {module.level}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" aria-hidden="true" />
                          <span>{module.duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-4 h-4" aria-hidden="true" />
                          <span>15-20 participants</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" aria-label={isExpanded ? 'Collapse module' : 'Expand module'}>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5" aria-hidden="true" />
                    ) : (
                      <ChevronDown className="w-5 h-5" aria-hidden="true" />
                    )}
                  </Button>
                </div>

                {/* Expandable Day-by-Day Content */}
                <div 
                  id={`module-content-${module.id}`}
                  className={cn(
                    'overflow-hidden transition-all duration-300',
                    isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                  )}
                >
                  <div className="px-6 pb-6 pt-2 border-t border-border">
                    <div className="grid gap-4">
                      {module.days.map((day) => (
                        <div 
                          key={day.day}
                          className="bg-secondary/50 rounded-xl p-4"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                              <span className="text-sm font-bold text-primary">D{day.day}</span>
                            </div>
                            <div>
                              <h4 className="font-medium text-foreground mb-2">
                                {day.title}
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {day.topics.map((topic) => (
                                  <span 
                                    key={topic}
                                    className="px-2 py-1 text-xs bg-background rounded-md text-muted-foreground"
                                  >
                                    {topic}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <Button className="gap-2">
                        Enroll Now
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {activeFilter !== 'all' && (
          <div className="text-center mt-12">
            <Button 
              variant="ghost" 
              size="lg" 
              className="gap-2"
              onClick={() => setActiveFilter('all')}
            >
              {t.training.viewAll}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
