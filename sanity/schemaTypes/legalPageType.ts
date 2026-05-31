import { type SchemaTypeDefinition } from 'sanity'

export const legalPageType: SchemaTypeDefinition = {
  name: 'legalPage',
  title: 'Legal Page',
  type: 'document',

  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle: `/${subtitle}`,
    }),
  },

  orderings: [
    {
      name: 'titleAsc',
      title: 'Title A–Z',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],

  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Displayed as the page heading (e.g. "Privacy Policy")',
      validation: (rule) => rule.required(),
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'URL path after /legal/ (e.g. "privacy-policy" → /legal/privacy-policy)',
      options: { source: 'title', maxLength: 64 },
      validation: (rule) => rule.required(),
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'date',
      options: { dateFormat: 'MMMM D, YYYY' },
      validation: (rule) => rule.required(),
    },
    {
      name: 'summary',
      title: 'Summary (optional)',
      type: 'text',
      rows: 2,
      description: 'One or two sentences shown below the title — a plain-language summary.',
    },
    {
      name: 'body',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal',    value: 'normal'     },
            { title: 'Heading 2', value: 'h2'         },
            { title: 'Heading 3', value: 'h3'         },
            { title: 'Quote',     value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet',   value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong',    value: 'strong'    },
              { title: 'Emphasis',  value: 'em'        },
              { title: 'Underline', value: 'underline' },
              { title: 'Code',      value: 'code'      },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (rule) =>
                      rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto'] }),
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: false,
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (rule) => rule.required(),
    },
  ],
}
