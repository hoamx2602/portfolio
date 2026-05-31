import { type SchemaTypeDefinition } from 'sanity'

const sectionToggle = (name: string, title: string, description?: string) => ({
  name,
  title,
  type: 'boolean' as const,
  description: description ?? `Show the "${title}" section on the homepage`,
  initialValue: true,
  options: { layout: 'switch' as const },
})

export const siteSettingsType: SchemaTypeDefinition = {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',

  // Always display "Site Settings" — not the value of the theme field
  preview: {
    prepare: () => ({
      title: 'Site Settings',
      subtitle: 'Global website configuration',
    }),
  },

  groups: [
    { name: 'appearance', title: '🎨 Appearance',        default: true },
    { name: 'contact',    title: '📬 Contact & Booking'               },
    { name: 'sections',   title: '👁 Section Visibility'              },
  ],

  fields: [
    // ─────────────────────────────────────────────────────────────────────────
    // 🎨 APPEARANCE
    // ─────────────────────────────────────────────────────────────────────────
    {
      name: 'theme',
      title: 'Global Theme',
      group: 'appearance',
      type: 'string',
      description: 'Force a specific theme for all visitors, or let it follow their system settings.',
      options: {
        list: [
          { title: 'System Default (follows visitor OS setting)', value: 'system' },
          { title: 'Light Mode',                                  value: 'light'  },
          { title: 'Dark Mode',                                   value: 'dark'   },
        ],
        layout: 'radio',
      },
      initialValue: 'system',
      validation: (rule) => rule.required(),
    },
    {
      name: 'particleColorLight',
      title: 'Particle Color — Light Theme',
      group: 'appearance',
      type: 'string',
      description: 'Hex color shown on the background canvas in light mode (e.g. #0f8c8c)',
      initialValue: '#0f8c8c',
    },
    {
      name: 'particleColorDark',
      title: 'Particle Color — Dark Theme',
      group: 'appearance',
      type: 'string',
      description: 'Hex color shown on the background canvas in dark mode (e.g. #64d2d2)',
      initialValue: '#64d2d2',
    },
    {
      name: 'particleSize',
      title: 'Particle Size Multiplier',
      group: 'appearance',
      type: 'number',
      description: '1.0 = default size. Increase for larger particles (e.g. 1.5, 2.0).',
      initialValue: 1.0,
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 📬 CONTACT & BOOKING
    // ─────────────────────────────────────────────────────────────────────────
    {
      name: 'contactEmail',
      title: 'Contact Email',
      group: 'contact',
      type: 'string',
      description: 'Displayed in the Contact section and used as the reply-to address.',
      initialValue: 'contact@techconsult.com',
      validation: (rule) => rule.email(),
    },
    {
      name: 'contactPhone',
      title: 'Contact Phone',
      group: 'contact',
      type: 'string',
      description: 'Displayed in the Contact section (e.g. +44 7700 900123)',
      initialValue: '+1 (555) 123-4567',
    },
    {
      name: 'contactAddress',
      title: 'Office Address',
      group: 'contact',
      type: 'text',
      rows: 2,
      description: 'Displayed in the Contact section.',
      initialValue: '123 Innovation Drive, Tech City, TC 12345',
    },
    {
      name: 'bookingUrl',
      title: 'Booking URL',
      group: 'contact',
      type: 'url',
      description:
        '"Book a Free Call" button destination. Works with Calendly, Cal.com, Google Calendar, or any scheduling link.',
      validation: (rule) =>
        rule.uri({ allowRelative: false, scheme: ['http', 'https'] }),
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 👁 SECTION VISIBILITY
    // ─────────────────────────────────────────────────────────────────────────
    {
      name: 'sections',
      title: 'Homepage Sections',
      group: 'sections',
      description: 'Toggle individual sections on or off. Changes take effect within 30 seconds.',
      type: 'object',
      options: { collapsible: false },
      fields: [
        sectionToggle('hero',          'Hero'),
        sectionToggle('whyUs',         'Why Choose Us'),
        sectionToggle('about',         'About'),
        sectionToggle('services',      'Services'),
        sectionToggle('responsibleAI', 'Responsible AI'),
        sectionToggle('training',      'Training'),
        sectionToggle('projects',      'Projects / Case Studies'),
        sectionToggle('team',          'Team', 'Show or hide the Meet Our Team section'),
        sectionToggle('clients',       'Clients'),
        sectionToggle('blog',          'Blog'),
        sectionToggle('contact',       'Contact'),
      ],
    },
  ],
}
