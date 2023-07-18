const express = require("express")
const cors = require("cors")
require("dotenv").config()
const { PORT } = process.env
// controller imports 
const { getPosts, addPost, deletePost, updatePost, getIndividualPost } = require("./controller/postController")
const { addComment, deleteComment } = require("./controller/commentController")
const { addLike, deleteLike } = require("./controller/likeController")
const { login, register } = require("./controller/authController")
const { getProfile, updateProfile } = require("./controller/profileController")
const { getLocation } = require("./controller/locationController")
const { isAuthenticated } = require("./middleware/isAuthenticated")
// sequelize imports 
const { sequelize } = require("./util/database")
const { Users } = require("./models/users")
const { Posts } = require("./models/posts")
const { Comments } = require("./models/comments")
const { Likes } = require("./models/likes")
const { Locations } = require("./models/locations")
//basic express app setup 
const app = express()
app.use(express.json())
app.use(cors())
// database relationship setup
Users.hasMany(Posts)
Posts.belongsTo(Users)
Posts.hasMany(Comments)
Comments.belongsTo(Posts)
Users.hasMany(Comments)
Comments.belongsTo(Users)
Users.hasMany(Likes)
Likes.belongsTo(Users)
Posts.hasMany(Likes)
Likes.belongsTo(Posts)
Locations.hasMany(Posts)
Posts.belongsTo(Locations)

// post endpoints 
app.get("/posts", getPosts)
app.get("/posts/:id", getIndividualPost)
app.post("/posts", isAuthenticated, addPost)
app.delete("/posts/:id", isAuthenticated, deletePost)
app.put("/posts/:id", isAuthenticated, updatePost)
// like endpoints 
app.post("/likes", isAuthenticated, addLike) 
app.delete("/likes/:id", isAuthenticated, deleteLike)
// comment endpoints 
app.post("/comments", isAuthenticated, addComment),
app.delete("/comments/:id", isAuthenticated, deleteComment)
// auth endpoints
app.post("/login", login)
app.post("/register", register)
// profile endpoints
app.get("/profile/:id", getProfile)
app.put("/profile/:id", isAuthenticated, updateProfile)
// location endpoints
app.get("/locations/:id", getLocation)


sequelize.sync()
.then(() => {
  app.listen(PORT, () => {console.log(`Server running on ${PORT}`)})
})
.catch(err => console.log(err))