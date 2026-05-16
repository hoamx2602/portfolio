'use client'

import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useLanguage } from '@/components/language-context'

export function ContactSection() {
  const { t } = useLanguage()

  const contactInfo = [
    { icon: Mail, label: 'Email', value: t.contact.info.email },
    { icon: Phone, label: 'Phone', value: t.contact.info.phone },
    { icon: MapPin, label: 'Address', value: t.contact.info.address },
  ]

  return (
    <section id="contact" className="py-24 bg-secondary/30" aria-labelledby="contact-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h2 id="contact-title" className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            {t.contact.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {t.contact.subtitle}
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-card rounded-2xl border border-border p-8">
            <form className="space-y-6" aria-label="Contact form">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{t.contact.form.name}</Label>
                  <Input id="name" name="name" placeholder="John Doe" required autoComplete="name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t.contact.form.email}</Label>
                  <Input id="email" name="email" type="email" placeholder="john@company.com" required autoComplete="email" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">{t.contact.form.company}</Label>
                <Input id="company" name="company" placeholder="Your Company" autoComplete="organization" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">{t.contact.form.message}</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your project..."
                  rows={5}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full gap-2">
                <Send className="w-4 h-4" aria-hidden="true" />
                {t.contact.form.send}
              </Button>
            </form>
          </div>

          <div className="space-y-8">
            <address className="bg-card rounded-2xl border border-border p-8 not-italic">
              <h3 className="text-lg font-semibold text-foreground mb-6">Contact Information</h3>
              <ul className="space-y-6">
                {contactInfo.map((item) => (
                  <li key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0" aria-hidden="true">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                      <p className="text-foreground">{item.value}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </address>

            <div className="bg-gradient-to-br from-primary/20 to-secondary rounded-2xl p-8 text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Schedule a Consultation
              </h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Book a free 30-minute call with our experts
              </p>
              <Button variant="outline" className="gap-2">
                Book a Call
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
