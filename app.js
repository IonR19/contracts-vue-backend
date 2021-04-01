const express = require('express')
// ============ import router =============
const contractsRouter = require('./routes/Contracts')
const receiptsRouter = require('./routes/Receipts')
const userRouter = require('./routes/Users')
// ============ import router =============

// ============ import middlewares =============
const bodyParser = require('body-parser')
const sequilize = require('./models/Connection')
// ============ import middlewares =============

// ============ import models =============
// require('./models/registerModels')
// ============ import models =============
const app = express()
/**
 * configuring MIDDLEWARES
 */
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

/**
 * configuring access from other hosts
 */
const cors = require('cors')
app.use(cors())
app.use(express.static('./public'))

/**
 * adding routes
 */
// app.use(fileuploadRouter);
app.use('/contracts', contractsRouter)
app.use('/receipts', receiptsRouter)
app.use('/users', userRouter)

app.use('*', (req, res) => res.status(404).send('ROUTE NOT FOUND'))

const PORT = process.env.PORT || 5005
app.listen(PORT, () => console.log(`app is running on ${PORT}`))

sequilize.sync({
  alter: {
    drop: false,
  },
})

// sequilize.sync({
//   schema:
//   alter: {
//     drop: false,
//   },
// })
// ;(async () => {
//   try {
//     await sequilize.sync({ force: true })
//     console.log('synchronization finished')
//   } catch (e) {
//     console.log('synchronization failed')
//   }
// })()
// sequilize.sync()
