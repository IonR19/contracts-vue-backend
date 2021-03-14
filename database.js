const { Sequelize } = require("sequelize");

let sequelize = new Sequelize("postgres://postgres:admin@127.0.0.1:5433/contracts-web");

const User = sequelize.define(
  "user",
  {
    // attributes
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    lastName: {
      type: Sequelize.STRING,
      // allowNull defaults to true
    },
  },
  {
    // options
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("connection successfull");
  })
  .catch((err) => {
    console.log(err);
  });
