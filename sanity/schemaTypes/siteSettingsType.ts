import { type SchemaTypeDefinition } from 'sanity'

export const siteSettingsType: SchemaTypeDefinition = {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'theme',
      title: 'Global Theme',
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
      type: 'string',
      description: 'Hex color code (e.g. #0f8c8c)',
      initialValue: '#0f8c8c'
    },
    {
      name: 'particleColorDark',
      title: 'Particle Color (Dark Theme)',
      type: 'string',
      description: 'Hex color code (e.g. #64d2d2)',
      initialValue: '#64d2d2'
    },
    {
      name: 'particleSize',
      title: 'Particle Size Multiplier',
      type: 'number',
      description: 'Default is 1.0. Increase for larger particles (e.g. 1.5, 2.0).',
      initialValue: 1.0
    }
  ],
}
