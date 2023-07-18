const { sequelize } = require("../util/database")
const { DataTypes } = require("sequelize")

module.exports = {
  Comments: sequelize.define("comments", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    content: {
      type: DataTypes.STRING(500),
      allowNull: false
    }
  })
}