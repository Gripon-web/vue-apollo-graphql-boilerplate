import schema from './schema'
import resolvers from './resolvers'
import Post from './sql'
import resources from './locales'

import Feature from '../connector'


export default new Feature({
  schema,
  createContextFunc: () => ({ Post }),
  createResolversFunc: resolvers,
  localization: { ns: 'post', resources }
})
