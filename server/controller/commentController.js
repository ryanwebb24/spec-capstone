const { Comments } = require("../models/comments")

module.exports = {
  addComment: async (req, res) => {
    try {
      let { postId, userId, content } = req.body
      let comment = await Comments.create({ content, userId, postId}, {
        returning: true
      })
      res.status(200).send(comment.dataValues)
    } catch (err) {
      console.log("error trying to add comment")
      console.log(err)
      res.sendStatus(400)
    }
  },
  deleteComment: async(req, res) => {
    try {
      let { id } = req.params
      await Comments.destroy({
        where: {
          id
        }
      })
      console.log("deleted comment")
      res.status(200).send("deleted comment successfully")
    } catch (err) {
      console.log("error trying to delete comment")
      console.log(err)
      res.sendStatus(400)
    }
  }
}