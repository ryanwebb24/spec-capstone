const { sequelize } = require("../util/database")
const { DataTypes } = require("sequelize")

module.exports = {
  Posts: sequelize.define("posts", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    locationRating: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })
}