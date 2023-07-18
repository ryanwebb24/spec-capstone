const { sequelize } = require("../util/database")
const { DataTypes } = require("sequelize")

module.exports = {
  Locations: sequelize.define("locations", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(500),
      allowNull: false
    }
  })
}