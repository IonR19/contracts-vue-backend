const { DataTypes } = require('sequelize')
const sequelize = require('./Connection')
const passport = require('passport')

const Tokens = sequelize.define('Token', {
  // id, createdAt, updatedAt are automatically enabled
  token: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
})

module.exports = Tokens
