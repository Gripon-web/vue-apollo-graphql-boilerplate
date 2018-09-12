import { ApolloServer } from 'apollo-server-express'

import { typeDefs, resolvers } from './schema'

const graphqlApolloServer = new ApolloServer({
  typeDefs,
  resolvers
})

export default graphqlApolloServer