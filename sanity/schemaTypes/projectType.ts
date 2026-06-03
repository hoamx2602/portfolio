import { type SchemaTypeDefinition } from 'sanity'

export const projectType: SchemaTypeDefinition = {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'id',
      title: 'String ID (e.g. smart-factory)',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'client',
      title: 'Client Name',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Artificial Intelligence', value: 'ai' },
          { title: 'Industrial IoT', value: 'iiot' },
          { title: 'RPA', value: 'rpa' },
          { title: 'AI Training', value: 'training' },
          { title: 'Cybersecurity', value: 'cybersecurity' },
        ],
      },
      validation: (rule) => rule.required(),
    },
    {
      name: 'categoryColor',
      title: 'Category Badge Color (Tailwind classes)',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      validation: (rule) => rule.required(),
    },
    {
      name: 'fullDescription',
      title: 'Full Description',
      type: 'text',
    },
    {
      name: 'challenge',
      title: 'Challenge',
      type: 'text',
    },
    {
      name: 'solution',
      title: 'Solution',
      type: 'text',
    },
    {
      name: 'metrics',
      title: 'Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'value', type: 'string', title: 'Value' },
          ],
        },
      ],
    },
    {
      name: 'results',
      title: 'Results (Bullet points)',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'gradientFrom',
      title: 'Gradient From Color',
      type: 'string',
    },
    {
      name: 'gradientTo',
      title: 'Gradient To Color',
      type: 'string',
    },
    {
      name: 'accentColor',
      title: 'Accent Color',
      type: 'string',
    },
    {
      name: 'iconLabel',
      title: 'Icon Label',
      type: 'string',
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail Image (Optional)',
      type: 'image',
      options: { hotspot: true },
    },
  ],
}
