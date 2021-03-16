const jwt = require('jsonwebtoken')
const User = require('./models/SQLUsers')
const { PRIVATE_KEY} = require('./config')


//token will not expire by time. instead with version (altering the secretKey)

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, PRIVATE_KEY)
    const user = await User.findOne({
      where: {
        id: decoded.id,
      },
    })
    if (!user) {
      throw new Error('Invalid User')
    }
    if (req.method === 'PATCH') {
      if (!user.canEdit) {
        throw new Error('Unauthorized')
      }
    }
    if (req.method === 'DELETE') {
      if (!user.canDelete) {
        throw new Error('Unauthorized')
      }
    }

    req.token = token
    req.user = user
    next()
  } catch (e) {
    console.log(e)
    res.status(401).send({ error: e.message })
  }
}


const generateAuthToken = async user => {
  const token = jwt.sign({ id: user.id }, PRIVATE_KEY)
  return token
}

module.exports = {
  auth,
  generateAuthToken,
  createUserAuth: () => {},
}
