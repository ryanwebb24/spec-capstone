const { sequelize } = require("../util/database")
const { DataTypes } = require("sequelize")

module.exports = {
  Likes: sequelize.define("likes", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    }
  })
}