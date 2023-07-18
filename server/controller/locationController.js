const { Locations } = require("../models/locations")
const { Posts } = require("../models/posts")

module.exports = {
  getLocation: async(req, res) => {
    try {
      let { id } = req.params
      let location = await Locations.findOne({
        where: {
          id
        },
        include: [
          {model: Posts}
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