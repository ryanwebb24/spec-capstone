const express = require("express")
const cors = require("cors")
require("dotenv").config()
const { PORT } = process.env
// controller imports 
const { getPosts, addPost } = require("./controller/postController")
// sequelize imports 
const { sequelize } = require("./util/database")
const { Users } = require("./models/users")
const { Posts } = require("./models/posts")
//basic express app setup 
const app = express()
app.use(express.json())
app.use(cors())
// database relationship setup
Users.hasMany(Posts)
Posts.belongsTo(Users)

// posts endpoints 
app.get("/posts", getPosts)
app.post("/posts", addPost)


sequelize.sync()
.then(() => {
  app.listen(PORT, () => {console.log(`Server running on ${PORT}`)})
})
.catch(err => console.log(err))