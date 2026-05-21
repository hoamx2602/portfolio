import { type SchemaTypeDefinition } from 'sanity'
import { trainingModuleType } from './trainingModuleType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [trainingModuleType],
}
