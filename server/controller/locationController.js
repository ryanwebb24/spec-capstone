const { Locations } = require("../models/locations")
const { Posts } = require("../models/posts")
const { Users } = require("../models/users")

module.exports = {
  getLocation: async(req, res) => {
    try {
      let { id } = req.params
      let location = await Locations.findOne({
        where: {
          id
        },
        include: [
          {
            model: Posts,
            include: [{model: Users}]
          }
        ]
      })
      res.status(200).send(location.dataValues)
    } catch(err) {
      console.log("error trying to get a location")
      console.log(err)
      res.sendStatus(400)
    }
  }
}