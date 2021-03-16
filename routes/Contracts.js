const path = require('path')
const express = require('express')
const ContractRouter = express.Router()
// todo - seperate router/view from controller

const { FILE_STORAGE_DIR: fileStorageDirectory } = require('../config')

const File = require('../models/SQLContractFiles')
const Contract = require('../models/SQLContracts')
const Receipt = require('../models/SQLReceipts')
const { Op } = require('sequelize')
const fileUpload = require('express-fileupload')
const auth = require('../auth')

// use abs path when moving files;....

// to do in the future , divide these into 2 requests called by the front end, data first, then upload file
ContractRouter.use(fileUpload())
ContractRouter.use(auth.auth)
ContractRouter.post('/add', async (req, res) => {
  try {
    // console.log("bod", req.body);
    // console.log("fil", req.files);
    // create and save record
    const newRecord = new Contract({
      ...req.body,
      //contractNumber, contractName, companyName, payment, extendedAmount?, startDate, endDate, notes
    })
    await newRecord.save()
    // get the id, createdAt from the saved record
    const { id, createdAt } = newRecord

    //no file selected <--> skip adding the file
    if (req.files) {
      //generate file name
      const file = req.files.documentFile
      const fileExtension = file.name.split('.').pop() // last token after dot
      const fileName = `CONTRACTS_${Date.parse(new Date(createdAt))}_${id}.${fileExtension}` //TABLE_DATE_ID.(PDF|PNG|JPG)

      const path0 = path.join(fileStorageDirectory, fileName)
      const newFile = new File({
        fileName,
        ContractId: id,
      })
      await newFile.save()
      file.mv(path0, err => {
        try {
          if (err) {
            throw new Error(err)
          }
          return res.send({ ...newRecord, ...newFile })
        } catch (err) {
          return res.status(500).send(err.message)
        }
      })
    } else {
      return res.send(newRecord)
    }
  } catch (err) {
    console.log(err.message)
    return res.status(501).send(err.message)
  }
})

ContractRouter.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params
    let cur = await Contract.update(req.body, {
      where: {
        id,
      },
    })
    return res.sendStatus(202)
  } catch (e) {
    console.log(e.message)
    return res.status(500).send(e.message)
  }
})

ContractRouter.get('/get/:id', async (req, res) => {
  const id = req.params.id
  try {
    const record = await Contract.findByPk(id, { include: [Receipt, File] })
    return record ? res.send(record) : res.status(404).send("Contract Not Found!")
  } catch (e) {
    return res.status(500).send(e.message)
  }
})

ContractRouter.get('/getFile/:fileId', async (req, res) => {
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

ContractRouter.get('/getAll', async (req, res) => {
  try {
    const record = await Contract.findAll({
      limit: 100,
      include: {
        model: File,
        attributes: ['id', 'fileName'],
      },
    })
    return record ? res.send(record) : res.sendStatus(404)
  } catch (err) {
    res.statusCode(500).send(err.message)
  }
})

ContractRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  try {
    const deleted = await Contract.destroy({
      where: {
        id,
      },
    })
    return res.sendStatus(200 + 204 * !deleted)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

ContractRouter.get('/search', async (req, res) => {
  try {
    const {
      contractName,
      company,
      contractNumber,
      startDate,
      endDate,
      startDateSwh,
      endDateSwh,
      isOrder = false,
    } = req.query
    let results = await Contract.findAll({
      limit: 100,
      where: {
        contractName: {
          [Op.like]: tokenize(contractName),
        },
        contractNumber: {
          [Op.like]: tokenize(contractNumber),
        },
        company: {
          [Op.like]: tokenize(company),
        },
        isOrder,
        ...searchQuery(startDate, endDate, startDateSwh, endDateSwh),
      },
    })
    res.send(results)
  } catch (e) {
    console.log(e.message)
    res.send(e)
  }
})

function searchQuery(startDate, endDate, startDateBefore, endDateBefore) {
  let obj = {}
  if (startDate) {
    obj.startDate = {
      [Op[startDateBefore === 'true' ? 'gte' : 'lte']]: new Date(startDate),
    }
  }
  if (endDate) {
    obj.endDate = {
      [Op[endDateBefore === 'false' ? 'gte' : 'lte']]: new Date(endDate),
    }
  }
  return obj
}
function tokenize(str) {
  if (!str) {
    return '%'
  }
  let newStr = str
    .toLowerCase()
    .split(/[\s,.<>$/^;:'" \t\[\] ]+/)
    .filter(token => token)
    .join(' ')
  newStr = '%' + newStr + '%'

  return newStr
}
// ========== playground ==========
function getFileName(id, cat = 'CONTRACT') {
  return path.join(fileStorageDirectory)
}
ContractRouter.get('/gets/file/', async (req, res) => {
  // console.log(req.body)
  // const filePath = path.join(fileStorageDirectory, 'CONTRACTS_1606638829000_6.pdf')
})
ContractRouter.get('/getWith', async (req, res) => {
  const records = await Contract.findAll({
    limit: 100,
    include: [
      // {
      //   model: File,
      //   attributes: ["fileName"],
      // },
      {
        model: Receipt,
        attributes: ['payment'],
      },
    ],
  })
  res.send(records)
})

ContractRouter.get('/test', async (req, res) => {
  // const file = await Contract.findAll({
  //   include: [
  //     {
  //       model: Files,
  //       attributes: ["fileName"],
  //     },
  //   ],
  // });
  const file = await Contract.findAll({
    where: {
      // [Op.or]: [{ id: 1 }, { id: 2 }],
      ////////
      // [Op.or]: [
      //   { [Op.and]: [
      //     { id: 1 },
      //     { id: 2 }]
      //    },
      //   { id: 2 }
      // ],
      //////////
      // [Op.or]: [{ id: 1 }, { id: 2 }, { [Op.lte]: [{ id: 2 }] }],
      /////////
      id: {
        [Op.lte]: 3,
      },
    },
    order: [['id', 'DESC']],
  })
  res.send(file)
})

ContractRouter.post('/addSampleData', async (req, res) => {
  // queries with files
  try {
    const responseData = []
    const newContract = new Contract({
      contractName: 'a valid name?',
      contractNumber: 'a valid number 2020',
    })
    await newContract.save()
    const contractId = newContract.id
    responseData.push(newContract)

    for (let i = 0; i < 5; ++i) {
      const newFile = new File({
        fileName: `file_${i + 1}`,
        ContractId: contractId,
      })
      await newFile.save()
      responseData.push(newFile)
    }
    res.send({
      responseData,
    })
  } catch (err) {
    res.send(err.message)
  }
})
module.exports = ContractRouter
