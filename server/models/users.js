const { sequelize } = require("../util/database")
const { DataTypes } = require("sequelize")
module.exports = {
  Users: sequelize.define("users", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(50)
    },
    hashedPass: {
      type: DataTypes.STRING
    },
    bio: {
      type: DataTypes.STRING
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  })
}