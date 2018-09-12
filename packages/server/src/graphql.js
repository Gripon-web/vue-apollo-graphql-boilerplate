import { ApolloServer } from 'apollo-server-express'

import schema from './api/schema'

const graphqlApolloServer = new ApolloServer({
  schema
})

export default graphqlApolloServer