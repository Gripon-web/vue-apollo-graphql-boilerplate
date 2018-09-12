import schema from './schema'
import resolvers from './resolvers'

import Feature from '../connector'


export default new Feature({
  schema,
  createResolversFunc: resolvers
})
