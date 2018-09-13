const paginator = (limit, after, findAndCountAll) => {
  const edgesArray = []
  const { rows, count } = findAndCountAll
  const hasPreviewPage = after > 0
  const hasNextPage = count > after + limit

  rows.forEach((row, i) => {
    edgesArray.push({
      cursor: after + i,
      node: row
    })
  })

  const endCursor = edgesArray.length > 0 ? edgesArray[edgesArray.length - 1].cursor : 0

  return {
    totalCount: count,
    edges: edgesArray,
    pageInfo: {
      startCursor: after,
      endCursor,
      hasPreviewPage,
      hasNextPage
    }
  }
}

export default () => ({
  Query: {
    posts: async (root, { limit = 10, after = 0 }, { Post }) => {
      const findAndCountAll = await Post.getPosts(limit, after)
      return paginator(limit, after, findAndCountAll)
    },
    post: async (root, { id }, { Post }) => {
      return { post: await Post.getPost(id) }
    }
  },
  Mutation: {
    addPost: async (root, { input }, { Post }) => {
      try {
        const post = await Post.addPost(input)

        return { post }
      } catch(e) {
        return { errors: e }
      }
    },
    editPost: async (root, { input }, { Post }) => {
      try {
        let post = await Post.getPost(input.id)

        post = await Post.editPost(post, input)
        
        return { post }
      } catch(e) {
        return { errors: e }
      }
    },
    deletePost: async (root, { id }, { Post }) => {
      try {
        const post = await Post.getPost(id)

        const isDelete = await Post.deletePost(post)
        if (isDelete) {
          return { post }
        } else {
          // TODO
        }
        
        return { post }
      } catch(e) {
        return { errors: e }
      }
    }
  }
})
