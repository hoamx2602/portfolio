import { type SchemaTypeDefinition } from 'sanity'

export const teamMemberType: SchemaTypeDefinition = {
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
      validation: (rule) => rule.required(),
    },
    {
      name: 'initials',
      title: 'Initials',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'gradientFrom',
      title: 'Gradient From (RGBA)',
      type: 'string',
    },
    {
      name: 'gradientTo',
      title: 'Gradient To (RGBA)',
      type: 'string',
    },
    {
      name: 'accentColor',
      title: 'Accent Color (Hex)',
      type: 'string',
    },
    {
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
    },
    {
      name: 'twitter',
      title: 'Twitter URL',
      type: 'url',
    },
    {
      name: 'avatar',
      title: 'Avatar Image (Optional)',
      type: 'image',
      options: { hotspot: true },
    },
  ],
}
