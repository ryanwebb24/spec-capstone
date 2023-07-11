
const { Posts } = require("../models/posts")


module.exports = {
  getPosts: async(req, res) => {
    let posts = await Posts.findAll()
    // this will format the data to how we want from the sequelize query
    posts = posts.map(post => post.dataValues)
    res.status(200).send(posts)
  },
  addPost: async(req, res) => {
    try {
      let { title, content, url, address, rating } = req.body
      await Posts.create({title, content, url, locationRating: rating})
      res.status(200).send("post successful")
    } catch (err) {
      console.log("add post error")
      console.log(err)
      res.sendStatus(400)
    }
  }
}