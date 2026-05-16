'use client'

import { Linkedin, Twitter, Mail } from 'lucide-react'
import { useLanguage } from '@/components/language-context'

const team = [
  {
    name: 'Dr. Sarah Chen',
    role: 'CEO & AI Lead',
    bio: '15+ years in AI research. Former Google AI researcher with expertise in deep learning and NLP.',
    image: 'from-blue-500/30 to-cyan-500/30',
    initials: 'SC',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Michael Rodriguez',
    role: 'CTO & IIoT Director',
    bio: 'Industrial automation expert. Led digital transformation projects for Fortune 500 manufacturers.',
    image: 'from-emerald-500/30 to-teal-500/30',
    initials: 'MR',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Emily Watson',
    role: 'RPA Practice Lead',
    bio: 'UiPath certified expert. Delivered 500+ automation projects across healthcare and finance sectors.',
    image: 'from-orange-500/30 to-amber-500/30',
    initials: 'EW',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'David Kim',
    role: 'Head of Training',
    bio: 'Certified instructor with 10+ years experience. Trained 5000+ professionals globally.',
    image: 'from-purple-500/30 to-pink-500/30',
    initials: 'DK',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Anna Petrova',
    role: 'Data Science Lead',
    bio: 'PhD in Statistics. Specialized in predictive analytics and machine learning operations.',
    image: 'from-rose-500/30 to-red-500/30',
    initials: 'AP',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'James Thompson',
    role: 'Solutions Architect',
    bio: 'AWS & Azure certified. Expert in designing scalable enterprise technology solutions.',
    image: 'from-indigo-500/30 to-blue-500/30',
    initials: 'JT',
    linkedin: '#',
    twitter: '#',
  },
]

export function TeamSection() {
  const { t } = useLanguage()

  return (
    <section id="team" className="py-24 bg-secondary/30" aria-labelledby="team-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h2 id="team-title" className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            {t.team?.title || 'Meet Our Team'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {t.team?.subtitle || 'Industry experts dedicated to driving your digital transformation'}
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8" role="list" aria-label="Team members">
          {team.map((member) => (
            <article
              key={member.name}
              className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-300"
              role="listitem"
            >
              {/* Avatar */}
              <div className={`h-48 bg-gradient-to-br ${member.image} flex items-center justify-center`} aria-hidden="true">
                <div className="w-24 h-24 rounded-full bg-background/50 backdrop-blur-sm flex items-center justify-center border-2 border-primary/20 group-hover:border-primary/50 transition-colors">
                  <span className="text-2xl font-bold text-primary">{member.initials}</span>
                </div>
              </div>
              
              <div className="p-6 text-center">
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-primary font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {member.bio}
                </p>
                
                {/* Social Links */}
                <nav aria-label={`${member.name} social links`} className="flex items-center justify-center gap-3">
                  <a 
                    href={member.linkedin}
                    className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
                    aria-label={`${member.name} LinkedIn profile`}
                  >
                    <Linkedin className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  </a>
                  <a 
                    href={member.twitter}
                    className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
                    aria-label={`${member.name} Twitter profile`}
                  >
                    <Twitter className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  </a>
                  <a 
                    href={`mailto:${member.name.toLowerCase().replace(' ', '.')}@techconsult.com`}
                    className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  </a>
                </nav>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
