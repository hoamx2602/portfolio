import { type SchemaTypeDefinition } from 'sanity'

export const trainingModuleType: SchemaTypeDefinition = {
  name: 'trainingModule',
  title: 'Training Module',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
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
          { title: 'Cybersecurity', value: 'cybersecurity' },
        ],
      },
      validation: (rule) => rule.required(),
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'level',
      title: 'Level',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'color',
      title: 'Badge Color Class',
      type: 'string',
      description: 'e.g. bg-blue-500/10 text-blue-400 border-blue-500/20',
      validation: (rule) => rule.required(),
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    },
    {
      name: 'contentType',
      title: 'Content Type',
      type: 'string',
      options: {
        list: [
          { title: 'Days Format', value: 'days' },
          { title: 'Overview Format', value: 'overview' },
        ],
      },
      validation: (rule) => rule.required(),
    },
    // For "Days Format"
    {
      name: 'days',
      title: 'Days (For Days Format)',
      type: 'array',
      hidden: ({ document }) => document?.contentType !== 'days',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'day', title: 'Day Number', type: 'number' },
            { name: 'title', title: 'Day Title', type: 'string' },
            { name: 'topics', title: 'Topics', type: 'array', of: [{ type: 'string' }] },
          ],
        },
      ],
    },
    // For "Overview Format"
    {
      name: 'overview',
      title: 'Overview (For Overview Format)',
      type: 'object',
      hidden: ({ document }) => document?.contentType !== 'overview',
      fields: [
        { name: 'description', title: 'Description', type: 'text' },
        { name: 'noCodingNote', title: 'No Coding Note (Optional)', type: 'text' },
        { name: 'calloutTitle', title: 'Callout Title', type: 'string' },
        {
          name: 'benefits',
          title: 'Benefits',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'iconName', title: 'Icon Name (Lucide)', type: 'string' },
                { name: 'title', title: 'Title', type: 'string' },
                { name: 'stat', title: 'Statistic', type: 'string' },
                { name: 'desc', title: 'Description', type: 'text' },
              ],
            },
          ],
        },
        {
          name: 'useCases',
          title: 'Use Cases',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'iconName', title: 'Icon Name (Lucide)', type: 'string' },
                { name: 'title', title: 'Title', type: 'string' },
                { name: 'outcome', title: 'Outcome', type: 'text' },
              ],
            },
          ],
        },
        {
          name: 'topics',
          title: 'Topics',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'gallery',
          title: 'Gallery Images',
          type: 'array',
          of: [
            {
              type: 'image',
              fields: [
                {
                  name: 'caption',
                  type: 'string',
                  title: 'Caption',
                }
              ]
            }
          ]
        }
      ],
    },
  ],
}
