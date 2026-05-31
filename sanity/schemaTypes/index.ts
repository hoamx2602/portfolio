import { type SchemaTypeDefinition } from 'sanity'
import { trainingModuleType } from './trainingModuleType'
import { projectType } from './projectType'
import { teamMemberType } from './teamMemberType'
import { siteSettingsType } from './siteSettingsType'
import { blogPostType } from './blogPostType'
import { legalPageType } from './legalPageType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [trainingModuleType, projectType, teamMemberType, siteSettingsType, blogPostType, legalPageType],
}
