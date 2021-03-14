const express = require('express')

// ============ import router =============
// const fileuploadRouter = require('./routes/fileupload')
// const contractsRouter = require('./routes/Contracts')
// const receiptsRouter = require('./routes/Receipts')
// ============ import router =============

// ============ import middlewares =============
const bodyParser = require('body-parser')
// const sequilize = require('./models/Connection')
// ============ import middlewares =============

// ============ import models =============
// require('./models/registerModels')
// ============ import models =============

const app = express()
/**
 * configuring MIDDLEWARES
 */
app.use(
  bodyParser.json({
    limit: 100 * 1024,
  }),
)
/**
 * configuring access from other hosts
 */
const cors = require('cors')

app.use(cors())
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
// app.use('/contracts', contractsRouter)
// app.use('/receipts', receiptsRouter)
app.use('*', (req, res, nxt) => {
  console.log('received something ')
  nxt()
})

const login = express.Router()

login.post('/', async (req, res) => {
  return res.send({ access_token: 'randomstring' })
})

const contracts = express.Router()

contracts.get('/:id', async (req, res) => {
  return res.send({
    id: req.params.id,
    contractName: 'contract name',
    contractNumber: 'long contract Number',
    payment: '251233123',
    startDate: new Date(),
    endDate: new Date(),
  })
})
contracts.delete('/:id', async (req, res) => {
  return res.sendStatus(200)
})
contracts.patch('/:id', async (req, res) => {
  return res.send({
    id: 2,
    contractName: 'contract name updated',
    contractNumber: 'long contract Number updated',
    payment: '9999999',
    startDate: new Date(),
    endDate: new Date(),
  })
})
contracts.post('/add', async (req, res) => {
  return res.sendStatus(201)
})
contracts.get('/search/', async (req, res) => {
  return res.send(req.query)
})
app.use('/login', login)
app.use('contracts', contracts)
app.use('*', (req, res) => res.sendStatus(404))
app.listen(5000, () => console.log('app is running'))
// ;(async () => {
//   try {
//     await sequilize.sync({ force: true })
//     console.log('synchronization finished')
//   } catch (e) {
//     console.log('synchronization failed')
//   }
// })()
// sequilize.sync();
