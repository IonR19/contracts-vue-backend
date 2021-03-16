const { DataTypes } = require('sequelize')
const sequelize = require('./Connection')
const { SQL_DECIMAL_LENGTH, SQL_DECIMAL_PERCISION } = require('../config')

const Contracts = sequelize.define('Contract', {
  // id, createdAt, updatedAt are automatically enabled
  contractName: {
    type: DataTypes.STRING(100),
  },
  contractNumber: {
    type: DataTypes.STRING(60),
  },
  company: {
    type: DataTypes.STRING(60),
  },
  startDate: {
    type: DataTypes.DATEONLY,
  },
  endDate: {
    type: DataTypes.DATEONLY,
  },
  payment: {
    type: DataTypes.DECIMAL(SQL_DECIMAL_LENGTH + SQL_DECIMAL_PERCISION, SQL_DECIMAL_PERCISION),
  },
  percentage: {
    type: DataTypes.REAL,
    defaultValue: 0,
  },
  extendedAmount: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
  },
  isOrder: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  notes: {
    type: DataTypes.TEXT,
    defaultValue: '-',
  },
})

module.exports = Contracts
