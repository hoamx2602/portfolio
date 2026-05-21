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
  ],
}
