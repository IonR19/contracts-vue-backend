const express = require('express')
const path = require('path')
const { FILE_STORAGE_DIR: fileStorageDirectory } = require('../config')
const ReceiptRouter = express.Router()

const fileupload = require('express-fileupload')

const Contracts = require('../models/SQLContracts')
const Receipt = require('../models/SQLReceipts')
const File = require('../models/SQLReceiptFiles')
const auth = require('../auth')
const sequilize = require('../models/Connection')

ReceiptRouter.use(fileupload())
ReceiptRouter.use(auth.auth)

ReceiptRouter.post('/add', async (req, res) => {
  if (!req.body.ContractId) {
    return res.status(400).send('No Contract Provided')
  }
  try {
    const { ContractId, monthlySerial, payment, enterDate } = req.body
    const newReceipt = new Receipt({ monthlySerial, payment, enterDate, ContractId })
    await newReceipt.save()

    if (req.files) {
      const { id, createdAt } = newReceipt
      const file = req.files.documentFile
      const fileExtension = file.name.split('.').pop() // last token after dot
      const fileName = `RECEIPTS_${Date.parse(new Date(createdAt))}_${id}.${fileExtension}` //TABLE_DATE_ID.(PDF|PNG|JPG)

      const path0 = path.join(fileStorageDirectory, fileName)
      const newFile = new File({
        fileName,
        ReceiptId: id,
      })
      req.files.documentFile.mv(path0, err => {
        if (err) {
          throw err
        }
      })
      await newFile.save()
    }
    await updatePercentage(ContractId)
    res.status(200).send(newReceipt)
  } catch (err) {
    console.log(err.message)
    return res.status(500).send(err)
  }
})

ReceiptRouter.get('/get/:id', async (req, res) => {
  try {
    const receipt = await Receipt.findByPk(req.params.id, {
      include: File,
    })
    if (!receipt) {
      return res.sendStatus(404)
    }
    res.send(receipt)
  } catch (e) {
    res.status(500).send(e.message)
  }
})

ReceiptRouter.get('/getAll/:contractId', async (req, res) => {
  try {
    const receipt = await Receipt.findAll({
      include: [File],
      where: {
        ContractId: req.params.contractId,
      },
      order: [['monthlySerial', 'DESC'], ['enterDate', 'DESC']],
    })
    if (!receipt) {
      return res.sendStatus(404)
    }
    res.send(receipt)
  } catch (e) {
    res.status(500).send(e.message)
  }
})

ReceiptRouter.get('/getFile/:fileId', async (req, res) => {
  try {
    // getFileId
    const id = req.params.fileId

    // find File
    const file = await File.findByPk(id)
    if (!file) {
      return res.status(404).send('No file found')
    }

    //sendFile
    const filePath = path.join(fileStorageDirectory, file.fileName)
    res.sendFile(filePath)
  } catch (e) {
    res.send(e.message)
  }
})

ReceiptRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const ReceiptToBeDeleted = await Receipt.findByPk(id)
    if (!ReceiptToBeDeleted) {
      res.sendStatus(404)
      return
    }
    let contractId = ReceiptToBeDeleted.ContractId
    await ReceiptToBeDeleted.destroy()
    await updatePercentage(contractId)

    return res.sendStatus(200)
  } catch (e) {
    console.log(e.message)
    res.status(400).send(e.message)
  }
})

ReceiptRouter.patch('/:id', async (req, res) => {
  // to be completed
  try {
    let ReceiptId = req.params.id
    const receipt = await Receipt.findByPk(ReceiptId)
    if (!receipt) {
      return res.sendStatus(404)
    }
    const AllowedUpdate = ['monthlySerial', 'payment', 'enterDate']
    let update = {};
    AllowedUpdate.forEach(param => {
      if (req.body[param]) {
        update[param] = req.body[param];
      }
    })
    await receipt.update(update);
    await updatePercentage(receipt.ContractId)
    res.send()
  } catch (e) {
    console.log(e.message)
    res.status(400).send(e.message)
  }
})
// instance.update({
//   username: self.sequelize.fn('upper', self.sequelize.col('username'))
// })
async function updatePercentage(contractId) {
  try {
    // this works!!!!!!!
    // await Contracts.update(
    //   {
    //     percentage: 10000,
    //   },
    //   {
    //     where: {
    //       id: contractId,
    //     },
    //   },
    // )
    //get Contract
    let contract = await Contracts.findByPk(contractId)
    //get All Receipts
    let receipts = await Receipt.findAll({
      attributes: ['payment'],
      where: {
        ContractId: contractId,
      },
    })
    //calculate
    let sum = 0 // change to BigInt Later
    receipts.forEach(receipt => {
      // console.log(receipt['dataValues']['payment'])
      sum += +receipt['dataValues']['payment']
    })
    //set & save
    await contract.update({
      percentage: sum,
    })
  } catch (e) {
    console.log(e.message)
  }
}

module.exports = ReceiptRouter
