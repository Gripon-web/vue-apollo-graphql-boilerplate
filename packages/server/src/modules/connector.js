import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas'

import { merge, map, union, without, castArray } from 'lodash'

const combine = (features, extractor) => without(union(...map(features, res => castArray(extractor(res)))), undefined)

class Feature {
  constructor({ createContextFunc, createResolversFunc, schema }, ...features) {
    // GraphQL API
    this.createContextFunc = combine(arguments, arg => arg.createContextFunc)
    this.createResolversFunc = combine(arguments, arg => arg.createResolversFunc)
    this.createSchema = combine(arguments, arg => arg.schema)
  }

  get schema () {
    return mergeTypes(this.createSchema, { all: true })
  }

  createResolvers () {
    return mergeResolvers(this.createResolversFunc.map(createResolvers => createResolvers()))
  }

  async createContext(req, res, connectionParams = null, webSocket = null) {
    let context = {}
    for (const createContextFunc of this.createContextFunc) {
      context = merge(context, await createContextFunc({ req, res, connectionParams, webSocket, context }))
    }
    return context
  }
}

export default Feature
