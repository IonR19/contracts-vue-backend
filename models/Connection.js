const { Sequelize } = require('sequelize')
const pg = require('pg')
let sequilize = new Sequelize({
  username: 'postgres',
  password: 'admin',
  database: 'contracts-web',
  host: 'localhost',
  dialect: 'postgres',
  dialectModule: pg,
  port: 5432,
  logging: false,
})

sequilize
  .authenticate()
  .then(() => {
    console.log('DB Connection Succesful')
  })
  .catch(err => {
    console.log(err, 'Error Connecting to DB')
  })

module.exports = sequilize
