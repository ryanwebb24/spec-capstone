const { Likes } = require("../models/likes")

module.exports = {
  addLike: async(req, res) => {
    try {
      let { postId, userId } = req.body
      let like = await Likes.create({postId, userId}, {
        returning: true
      })
      res.status(200).send(like.dataValues.id)
    } catch(err) {
      console.log("error trying to add a like")
      console.log(err)
      res.sendStatus(400)
    }
  },
  deleteLike: async(req, res) => {
    try {
      let { id } = req.params
      await Likes.destroy({
        where: {
         id
        },
      })
      let likes = await Likes.findAll({
        where: {
          id
        }
      })
      console.log(likes)
      res.status(200).send("like deleted successfully")
    } catch(err) {
      console.log("error trying to delete a like")
      console.log(err)
      res.sendStatus(400)
    }
  }
}