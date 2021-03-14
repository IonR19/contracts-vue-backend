const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./Connection");
const Contracts = require("./SQLContracts");

const File = sequelize.define("ContractAttachment", {
  // id, createdAt, updatedAt are automatically enabled
  fileName: {
    type: DataTypes.STRING(100),
  },
});

Contracts.hasMany(File, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = File;
