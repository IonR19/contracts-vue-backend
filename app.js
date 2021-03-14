const express = require('express')
// ============ import router =============
const fileuploadRouter = require('./routes/fileupload')
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
app.use(bodyParser.json())
/**
 * configuring access from other hosts
 */
const cors = require('cors')
app.use(cors())
app.use(express.static('./public'))
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   res.setHeader("Access-Control-Request-Method", "*");
//   res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   next();
// });

/**
 * adding routes
 */
// app.use(fileuploadRouter);
app.use('/contracts', contractsRouter)
app.use('/receipts', receiptsRouter)
app.use('/users', userRouter)

app.use('*', (req, res) => res.status(404).send('ROUTE NOT FOUND'))
app.listen(5000, () => console.log('app is running'))

// ;(async () => {
//   try {
//     await sequilize.sync({ force: true })
//     console.log('synchronization finished')
//   } catch (e) {
//     console.log('synchronization failed')
//   }
// })()
// sequilize.sync()
