import { gql } from 'apollo-server-express'

export default gql`
  type Post {
    id: ID!
    title: String!
    content: String!
  }

  # Posts relay-style pagination query
  type Posts {
    totalCount: Int
    edges: [PostEdges]
    pageInfo: PostPageInfo
  }

  # Edges for Posts
  type PostEdges {
    node: Post
    cursor: Int
  }

  # PageInfo for Posts
  type PostPageInfo {
    startCursor: Int
    endCursor: Int
    hasPreviewPage: Boolean
    hasNextPage: Boolean
  }

  type Query {
    # Posts pagination query
    posts(limit: Int, after: Int): Posts
    # Post
    post(id: Int!): PostPayload
  }

  type Mutation {
    # Create new post
    addPost(input: AddPostInput!): PostPayload
    # Edit a post
    editPost(input: EditPostInput!): PostPayload
    # Delete a post
    removePost(id: ID!): PostPayload
  }

  type PostPayload {
    post: Post
    errors: [FieldError!]
  }

  input AddPostInput {
    title: String!
    content: String!
  }

  # Input for editPost Mutation
  input EditPostInput {
    id: ID!
    title: String!
    content: String!
  }


  type FieldError {
    field: String!
    message: String!
  }
`
