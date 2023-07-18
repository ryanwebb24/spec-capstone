const { Posts } = require("../models/posts")
const { Comments } = require("../models/comments")
const { Likes } = require("../models/likes")
const { Locations } = require("../models/locations")
const { Users } = require("../models/users")
const { sequelize } = require("../util/database")

module.exports = {
  getPosts: async (req, res) => {
    try {
      let posts = await Posts.findAll({
        include: [
          {model: Comments},
          {model: Likes},
          {model: Locations},
          {
            model: Users,
            attributes: ["id", "username", "isPublic"]
          }
        ]
      })
      // this will format the data to how we want from the sequelize query and make it so only public users show there posts to the main feed
      posts = posts.map((post) => post.dataValues).filter(post => post.user.dataValues.isPublic)
      res.status(200).send(posts)
    } catch (err) {
      console.log("error trying to get all post")
      console.log(err)
      res.sendStatus(400)
    }
  },
  getIndividualPost: async (req, res) => {
    try {
      let { id } = req.params
      let post = await Posts.findOne({
        where: {
          id,
        },
        include: [
          { model: Comments},
          {model: Likes},
          {model: Locations},
          {
            model: Users,
            attributes: ["id", "username"]
          }
        ]
      })
      res.status(200).send(post.dataValues)
    } catch (err) {
      console.log("error trying to get post")
      console.log(err)
      res.sendStatus(400)
    }
  },
  addPost: async (req, res) => {
    try {
      let { title, content, url, address, locationName, rating, userId } = req.body
      let [location, created] = await Locations.findOrCreate({
        where: {
          address
        },
         defaults: {
          name: locationName,
          address,
        }
      })
      await Posts.create({
        title,
        content,
        url,
        locationRating: rating,
        userId,
        locationId: location.dataValues.id
      })
      
      res.status(200).send("Post created successfully")
    } catch (err) {
      console.log("add post error")
      console.log(err)
      res.sendStatus(400)
    }
  },
  deletePost: async (req, res) => {
    try {
      let { id } = req.params
      await Posts.destroy({
        where: {
          id,
        },
      })
      res.status(200).send("Post deleted successfully")
    } catch (err) {
      console.log("delete post error")
      console.log(err)
      res.sendStatus(400)
    }
  },
  updatePost: async (req, res) => {
    try {
      let { id } = req.params
      let { title, content, url, address, locationName, locationRating } = req.body
      let updatedPost = await Posts.update(
        { title, content, url, locationRating },
        {
          where: {
            id,
          },
          returning: true,
        }
      )
      let comments = await Comments.findAll({
        where: {
          postId: id,
        },
      })
      let likes = await Likes.findAll({
        where: {
          postId: id,
        },
      })
      res.status(200).send({ post: updatedPost[1][0].dataValues, comments, likes })
    } catch (err) {
      console.log("error trying to update post")
      console.log(err)
      res.sendStatus(400)
    }
  }
}
