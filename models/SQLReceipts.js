const { Sequelize, DataTypes } = require('sequelize')
const Contract = require('./SQLContracts')
const sequelize = require('./Connection')
const { SQL_DECIMAL_LENGTH, SQL_DECIMAL_PERCISION } = require('../config')

const Receipt = sequelize.define('Receipt', {
  // id, createdAt, updatedAt are automatically enabled
  monthlySerial: {
    type: DataTypes.INTEGER,
  },
  payment: {
    type: DataTypes.DECIMAL(SQL_DECIMAL_LENGTH + SQL_DECIMAL_PERCISION, SQL_DECIMAL_PERCISION),
  },
  enterDate: {
    type: DataTypes.DATE,
  },
})

Contract.hasMany(Receipt, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

module.exports = Receipt
