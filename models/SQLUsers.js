const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('./Connection')
const Tokens = require('./SQLTokens')

const Users = sequelize.define('User', {
  titleEn: {
    type: DataTypes.STRING(60),
  },
  titleAr: {
    type: DataTypes.STRING(60),
  },
  name: {
    type: DataTypes.STRING(60),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  canEdit: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  canDelete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  canCreate: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
})

Users.hasMany(Tokens, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})
module.exports = Users
