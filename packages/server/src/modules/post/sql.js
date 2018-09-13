import database from '../../database'
const { db, PostDb = db.Post } = database

class Post {
  async getPosts (limit, after) {
    return PostDb.findAndCountAll({
      offset: after,
      limit: limit
    })
  }

  async getPost (id) {
    return PostDb.findById(id, {
    })
  }

  async getPostByTitle (title) {
    return PostDb.findOne({
      where: { title: title },
    })
  }

  async addPost (input) {
    return await PostDb.create(input)
  }

  async editPost(post, input) {
    return await post.update(input, { where: { id: input.id } })
  }

  async deletePost(post) {
    return await post.destroy()
  }

}

export default new Post()