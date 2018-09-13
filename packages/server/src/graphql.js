import { ApolloServer, AuthenticationError } from 'apollo-server-express'

import schema from './api/schema'
import modules from './modules'

const graphqlApolloServer = new ApolloServer({
  schema,
  context: async ({ req, res }) => ({ ...(await modules.createContext(req, res)), req, res }),
  formatError: error => {
    return error.message === 'Not Authenticated!' ? new AuthenticationError(error) : error;
  }
})

export default graphqlApolloServer