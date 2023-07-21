const { Users } = require("../models/users")
const { Posts } = require("../models/posts")
const { Comments } = require("../models/comments")
const { Likes } = require("../models/likes")
const { Locations } = require("../models/locations")

module.exports = {
  getProfile: async(req, res) => {
    try {
      let { id } = req.params
    let user = await Users.findOne({
      attributes: [
        "id",
        "username",
        "email",
        "bio",
        "isPublic",
        "createdAt"
      ],
      where: {
        id
      },
      include: [
        {
          model: Posts,
          include: [{model: Likes}, {model: Users}, {model: Comments}, {model: Locations}]
        },
      ]
    })
    let data = user.dataValues
    res.status(200).send(data)
    } catch(err) {
      console.log("error trying to get profile")
      console.log(err)
      res.sendStatus(400)
    }
  },
  updateProfile: async(req, res) => {
    try {
      let { id } = req.params
      let { bio, isPublic} = req.body
      console.log(isPublic)
      let user = await Users.update(
        {bio, isPublic},
        {
          where: {
          id
          },
          returning: true
        }
      )
      res.status(200).send({bio: user[1][0].dataValues.bio, isPublic: user[1][0].dataValues.isPublic})
    } catch(err) {
      console.log("error trying to update profile")
      console.log(err)
      res.sendStatus(400)
    }
  }
}