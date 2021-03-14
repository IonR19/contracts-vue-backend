const sequelize = require('sequelize')
const { Sequelize } = require('sequelize')

let sequilize = new Sequelize('postgres://127.0.0.1:5433', {
  dialect: 'postgres',
  username: 'postgres',
  password: 'admin',
  database: 'contracts-web',
  logging: false
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