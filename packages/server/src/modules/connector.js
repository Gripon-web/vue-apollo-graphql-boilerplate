import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas'

import { map, union, without, castArray } from 'lodash'

const combine = (features, extractor) => without(union(...map(features, res => castArray(extractor(res)))), undefined)

class Feature {
  constructor({ createResolversFunc, schema }, ...features) {
    // GraphQL API
    this.createResolversFunc = combine(arguments, arg => arg.createResolversFunc)
    this.createSchema = combine(arguments, arg => arg.schema)
  }

  get schema () {
    return mergeTypes(this.createSchema, { all: true })
  }

  createResolvers () {
    return mergeResolvers(this.createResolversFunc.map(createResolvers => createResolvers()))
  }
}

export default Feature
