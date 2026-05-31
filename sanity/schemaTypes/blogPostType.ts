import { type SchemaTypeDefinition } from 'sanity'

export const blogPostType: SchemaTypeDefinition = {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  orderings: [
    {
      name: 'publishedAtDesc',
      title: 'Published Date, Newest',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Responsible AI', value: 'Responsible AI' },
          { title: 'Industrial IoT', value: 'Industrial IoT' },
          { title: 'AI Strategy', value: 'AI Strategy' },
          { title: 'RPA', value: 'RPA' },
          { title: 'Data Strategy', value: 'Data Strategy' },
          { title: 'AI Governance', value: 'AI Governance' },
        ],
      },
      validation: (rule) => rule.required(),
    },
    {
      name: 'categoryColor',
      title: 'Category Badge Color (Tailwind classes)',
      type: 'string',
      description:
        'e.g. bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(300),
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'Bradford AI Team',
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (rule) => rule.required(),
    },
    {
      name: 'readTime',
      title: 'Read Time',
      type: 'string',
      description: 'e.g. "7 min read"',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Underline', value: 'underline' },
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
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alt text',
            },
          ],
        },
      ],
    },
    {
      name: 'accentFrom',
      title: 'Accent Gradient From',
      type: 'string',
      description: 'CSS rgba color, e.g. rgba(52,211,153,0.25)',
      initialValue: 'rgba(99,102,241,0.22)',
    },
    {
      name: 'accentTo',
      title: 'Accent Gradient To',
      type: 'string',
      description: 'CSS rgba color, e.g. rgba(34,211,238,0.08)',
      initialValue: 'rgba(139,92,246,0.08)',
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
      description: 'Pin this post to the top of the blog listing',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
  ],
}
