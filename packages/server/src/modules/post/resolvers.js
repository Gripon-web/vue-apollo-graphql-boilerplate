import FieldError from '../../../../common/FieldError'

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
    post: async (root, { id }, { Post, req: { t } }) => {
      try {
        const e = new FieldError()

        const post = await Post.getPost(id)
        if (!post) {
          e.setError('post', t('post:postIsNotExisted'))
          e.throwIf()
        }

        return { post: post }
      } catch (e) {
        return { errors: e }
      }
    }
  },
  Mutation: {
    addPost: async (root, { input }, { Post, req: { t } }) => {
      try {
        const e = new FieldError()

        const titleExist = await Post.getPostByTitle(input.title)
        if (titleExist) {
          e.setError('title', t('post:titleIsExisted'))
          e.throwIf()
        }

        const post = await Post.addPost(input)

        return { post }
      } catch(e) {
        return { errors: e }
      }
    },
    editPost: async (root, { input }, { Post, req: { t } }) => {
      try {
        const e = new FieldError()

        let post = await Post.getPost(input.id)

        if (!post) {
          e.setError('post', t('post:postIsNotExisted'))
          e.throwIf()
        }

        const titleExist = await Post.getPostByTitle(input.title)
        if (titleExist && titleExist.id !== post.id) {
          e.setError('title', t('post:titleIsExisted'))
          e.throwIf()
        }

        post = await Post.editPost(post, input)

        return { post }
      } catch(e) {
        return { errors: e }
      }
    },
    removePost: async (root, { id }, { Post, req: { t } }) => {
      try {
        const e = new FieldError()

        const post = await Post.getPost(id)

        if (!post) {
          e.setError('post', t('post:postIsNotExisted'))
          e.throwIf()
        }

        const isDelete = await Post.removePost(post)
        if (isDelete) {
          return { post }
        } else {
          e.setError('delete', t('post:postIsDelete'))
          e.throwIf()
        }
        
        return { post }
      } catch(e) {
        return { errors: e }
      }
    }
  }
})
