export default () => ({
  Query: {
    post: async (root, { id }, context) => {
      const post = {
        id: 1,
        title: 'post title 1',
        content: 'post content 1'
      }
      return post
    }
  },
  Mutation: {
    addPost: async (root, { input }, context) => {
      const post = {
        id: 2,
        title: 'post title add',
        content: 'post content add'
      }
      return post
    }
  }
})
