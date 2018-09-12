import { gql } from 'apollo-server-express'

export default gql`
  type Post {
    id: ID!
    title: String!
    content: String!
  }

  type Query {
    # Post
    post(id: Int!): Post
  }

  type Mutation {
    # Create new post
    addPost(input: AddPostInput!): Post
  }

  input AddPostInput {
    title: String!
    content: String!
  }
`
