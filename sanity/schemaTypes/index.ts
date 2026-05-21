import { type SchemaTypeDefinition } from 'sanity'
import { trainingModuleType } from './trainingModuleType'
import { projectType } from './projectType'
import { teamMemberType } from './teamMemberType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [trainingModuleType, projectType, teamMemberType],
}
