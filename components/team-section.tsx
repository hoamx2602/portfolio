'use client'

import { Linkedin, Twitter, Mail } from 'lucide-react'
import { useLanguage } from '@/components/language-context'

const team = [
  {
    name: 'Dr. Sarah Chen',
    role: 'CEO & AI Lead',
    bio: '15+ years in AI research. Former Google AI researcher with expertise in deep learning and NLP.',
    gradientFrom: 'rgba(96,165,250,0.30)',
    gradientTo: 'rgba(34,211,238,0.15)',
    accentColor: '#60a5fa',
    initials: 'SC',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Michael Rodriguez',
    role: 'CTO & IIoT Director',
    bio: 'Industrial automation expert. Led digital transformation projects for Fortune 500 manufacturers.',
    gradientFrom: 'rgba(52,211,153,0.30)',
    gradientTo: 'rgba(20,184,166,0.15)',
    accentColor: '#34d399',
    initials: 'MR',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Emily Watson',
    role: 'RPA Practice Lead',
    bio: 'UiPath certified expert. Delivered 500+ automation projects across healthcare and finance sectors.',
    gradientFrom: 'rgba(251,146,60,0.30)',
    gradientTo: 'rgba(245,158,11,0.15)',
    accentColor: '#fb923c',
    initials: 'EW',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'David Kim',
    role: 'Head of Training',
    bio: 'Certified instructor with 10+ years experience. Trained 5,000+ professionals globally.',
    gradientFrom: 'rgba(167,139,250,0.30)',
    gradientTo: 'rgba(192,132,252,0.15)',
    accentColor: '#a78bfa',
    initials: 'DK',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Anna Petrova',
    role: 'Data Science Lead',
    bio: 'PhD in Statistics. Specialized in predictive analytics and machine learning operations.',
    gradientFrom: 'rgba(251,113,133,0.30)',
    gradientTo: 'rgba(244,63,94,0.15)',
    accentColor: '#fb7185',
    initials: 'AP',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'James Thompson',
    role: 'Solutions Architect',
    bio: 'AWS & Azure certified. Expert in designing scalable enterprise technology solutions.',
    gradientFrom: 'rgba(99,102,241,0.30)',
    gradientTo: 'rgba(96,165,250,0.15)',
    accentColor: '#6366f1',
    initials: 'JT',
    linkedin: '#',
    twitter: '#',
  },
]

export function TeamSection() {
  const { t } = useLanguage()

  return (
    <section id="team" className="py-24 relative overflow-hidden" aria-labelledby="team-title">
      <div className="absolute inset-0 bg-secondary/20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary tracking-widest uppercase mb-4 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
            Our Experts
          </span>
          <h2 id="team-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            {t.team?.title || 'Meet Our Team'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {t.team?.subtitle || 'Industry experts dedicated to driving your digital transformation'}
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Team members">
          {team.map((member, i) => (
            <article
              key={member.name}
              className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/40 transition-all duration-500 flex flex-col"
              role="listitem"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {/* Avatar header */}
              <div
                className="h-44 relative flex items-center justify-center overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${member.gradientFrom}, ${member.gradientTo})`,
                }}
                aria-hidden="true"
              >
                {/* Mesh pattern */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `radial-gradient(circle, ${member.accentColor} 1px, transparent 1px)`,
                    backgroundSize: '20px 20px',
                  }}
                />
                {/* Avatar circle */}
                <div
                  className="relative w-22 h-22 rounded-full flex items-center justify-center border-2 backdrop-blur-sm transition-transform duration-500 group-hover:scale-105"
                  style={{
                    width: '88px',
                    height: '88px',
                    background: 'rgba(0,0,0,0.35)',
                    borderColor: `${member.accentColor}50`,
                    boxShadow: `0 0 30px ${member.accentColor}30`,
                  }}
                >
                  <span
                    className="text-2xl font-bold"
                    style={{ color: member.accentColor }}
                  >
                    {member.initials}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 text-center flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {member.name}
                </h3>
                <p
                  className="text-sm font-medium mb-3"
                  style={{ color: member.accentColor }}
                >
                  {member.role}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                  {member.bio}
                </p>

                {/* Social links */}
                <nav aria-label={`${member.name} social links`} className="flex items-center justify-center gap-2.5 mt-auto">
                  {[
                    { href: member.linkedin, Icon: Linkedin, label: `${member.name} LinkedIn` },
                    { href: member.twitter,  Icon: Twitter,  label: `${member.name} Twitter` },
                    {
                      href: `mailto:${member.name.toLowerCase().replace(/[.\s]+/g, '.')}@techconsult.com`,
                      Icon: Mail,
                      label: `Email ${member.name}`,
                    },
                  ].map(({ href, Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      className="w-9 h-9 rounded-full bg-secondary/80 flex items-center justify-center hover:bg-primary/20 hover:scale-110 transition-all duration-200"
                      aria-label={label}
                    >
                      <Icon className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                    </a>
                  ))}
                </nav>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
