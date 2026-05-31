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
  groups: [
    { name: 'appearance', title: 'Appearance' },
    { name: 'sections', title: 'Section Visibility' },
  ],
  fields: [
    // ── Appearance ────────────────────────────────────────────────────────────
    {
      name: 'theme',
      title: 'Global Theme',
      group: 'appearance',
      description: 'Force a specific theme for all visitors, or let it follow their system settings.',
      type: 'string',
      options: {
        list: [
          { title: 'System Default', value: 'system' },
          { title: 'Light Mode', value: 'light' },
          { title: 'Dark Mode', value: 'dark' },
        ],
        layout: 'radio',
      },
      initialValue: 'system',
      validation: (rule) => rule.required(),
    },
    {
      name: 'particleColorLight',
      title: 'Particle Color (Light Theme)',
      group: 'appearance',
      type: 'string',
      description: 'Hex color code (e.g. #0f8c8c)',
      initialValue: '#0f8c8c',
    },
    {
      name: 'particleColorDark',
      title: 'Particle Color (Dark Theme)',
      group: 'appearance',
      type: 'string',
      description: 'Hex color code (e.g. #64d2d2)',
      initialValue: '#64d2d2',
    },
    {
      name: 'particleSize',
      title: 'Particle Size Multiplier',
      group: 'appearance',
      type: 'number',
      description: 'Default is 1.0. Increase for larger particles (e.g. 1.5, 2.0).',
      initialValue: 1.0,
    },
    // ── Section Visibility ───────────────────────────────────────────────────
    {
      name: 'sections',
      title: 'Homepage Sections',
      group: 'sections',
      description: 'Toggle individual sections on or off. Changes take effect immediately.',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        sectionToggle('hero', 'Hero'),
        sectionToggle('whyUs', 'Why Choose Us'),
        sectionToggle('about', 'About'),
        sectionToggle('services', 'Services'),
        sectionToggle('responsibleAI', 'Responsible AI'),
        sectionToggle('training', 'Training'),
        sectionToggle('projects', 'Projects / Case Studies'),
        sectionToggle('team', 'Team', 'Show or hide the Meet Our Team section'),
        sectionToggle('clients', 'Clients'),
        sectionToggle('blog', 'Blog'),
        sectionToggle('contact', 'Contact'),
      ],
    },
  ],
}
