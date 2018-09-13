import schema from './schema'
import resolvers from './resolvers'
import Post from './sql'

import Feature from '../connector'


export default new Feature({
  schema,
  createContextFunc: () => ({ Post }),
  createResolversFunc: resolvers
})
