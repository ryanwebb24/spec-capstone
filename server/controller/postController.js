
const { Posts } = require("../models/posts")


module.exports = {
  getPosts: async(req, res) => {
    try {
      let posts = await Posts.findAll()
      // this will format the data to how we want from the sequelize query
      posts = posts.map(post => post.dataValues)
      res.status(200).send(posts)
    } catch(err) {
      console.log("error trying to get all post")
      console.log(err)
      res.sendStatus(400)
    }
  },
  getIndividualPost: async(req, res) => {
    try{
      let { id } = req.params
      let post = await Posts.findOne({
        where: {
          id
        }
      })
      res.status(200).send(post)
    }catch(err) {
      console.log("error trying to get post")
      console.log(err)
      res.sendStatus(400)
    }
  },
  addPost: async(req, res) => {
    try {
      let { title, content, url, address, rating, userId} = req.body
      await Posts.create({title, content, url, locationRating: rating, userId})
      res.status(200).send("Post created successfully")
    } catch (err) {
      console.log("add post error")
      console.log(err)
      res.sendStatus(400)
    }
  },
  deletePost: async(req, res) => {
    try {
      let { id } = req.params
      await Posts.destroy({
        where: {
          id
        }
      })
      res.status(200).send("Post deleted successfully")
    } catch(err) {
      console.log("delete post error")
      console.log(err)
      res.sendStatus(400)
    }
  },
  updatePost: async(req, res) => {
    try {
      let { id } = req.params
      let {title, content, url, address, rating } = req.body
      await Posts.update({title, content, url, locationRating: rating}, {
        where: {
          id
        }
      })
      res.status(200).send("update successful")

    }catch(err) {
      console.log("error trying to update post")
      console.log(err)
      res.sendStatus(400)
    }
  }
}