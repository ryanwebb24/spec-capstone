const { Users } = require("../models/users")
const { Posts } = require("../models/posts")

module.exports = {
  getProfile: async(req, res) => {
    let { id } = req.params
    let user = await Users.findAll({
      attributes: [
        "username",
        "email",
        "bio",
        "isPublic",
        "createdAt"
      ],
      where: {
        id
      }
    })
    let userPosts = await Posts.findAll({
      where: {
        userId: id
      }
    })
    let data = {user: user[0].dataValues, posts: userPosts.map(post => post.dataValues)}
    res.status(200).send(data)
  },
}