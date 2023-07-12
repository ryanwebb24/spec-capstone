const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { SECRET } = process.env
const { Users } = require("../models/users")
const { Posts } = require("../models/posts")

function createToken(username, id) {
  return jwt.sign({ username, id }, SECRET, { expiresIn: "2 days" })
}

module.exports = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body
      let foundUser = await Users.findOne({ where: { username: username } })
      if (foundUser) {
        const isAuthenticated = bcrypt.compareSync(
          password,
          foundUser.hashedPass
        )
        if (isAuthenticated) {
          const token = createToken(
            foundUser.dataValues.username,
            foundUser.dataValues.id
          )
          const exp = Date.now() + 1000 * 60 * 60 * 48
          res
            .status(200)
            .send({
              username: foundUser.dataValues.username,
              userId: foundUser.dataValues.id,
              token,
              exp,
            })
        } else {
          res.status(400).send("Could not login failed authentication")
        }
      } else {
        res.status(400).send("Could not login no user with that name")
      }
    } catch (err) {
      console.log("login error")
      console.log(err)
      res.status(400).send("Login error")
    }
  },
  register: async (req, res) => {
    try {
      const { username, password, email } = req.body
      let foundUser = await Users.findOne({ where: { username: username } })
      if (foundUser) { // if the user exists
        res.status(400).send("User already exists")
      } else if (username.length < 3) { // if username is less then 3
        res.status(400).send("User name has to be entered")
      } else if (password.length < 8) { // if password is less then 8
        res.status(400).send("Password must be longer 8 characters or longer")
      } else { // if its a valid username and password
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const newUser = await Users.create({
          username,
          email,
          hashedPass: hash
        })
        const token = createToken(
          newUser.dataValues.username,
          newUser.dataValues.id
        )
        const exp = Date.now() + 1000 * 60 * 60 * 48
        res
          .status(200)
          .send({
            username: newUser.dataValues.username,
            userId: newUser.dataValues.id,
            token,
            exp,
          })
      }
    } catch (err) {
      // if there is some other error
      console.log("registration error")
      console.log(err)
      res.status(400).send("Registration error")
    }
  },
}
