const { Sequelize } = require('sequelize')

let sequilize = new Sequelize('postgres://postgres:admin@localhost:5432/contracts-web', {
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
