import { makeExecutableSchema } from 'graphql-tools'
import modules from '../modules'

const executableSchema = makeExecutableSchema({
  typeDefs: modules.schema,
  resolvers: modules.createResolvers()
})

export default executableSchema
