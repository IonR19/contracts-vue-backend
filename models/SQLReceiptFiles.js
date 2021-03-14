const { DataTypes } = require("sequelize");
const sequelize = require("./Connection");
const Receipt = require("./SQLReceipts");

const File = sequelize.define("ReceiptAttachment", {
  // id, createdAt, updatedAt are automatically enabled
  fileName: {
    type: DataTypes.STRING(100),
  },
});

Receipt.hasMany(File, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = File;
