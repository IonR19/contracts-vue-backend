const jwt = require('jsonwebtoken')
const User = require('./models/SQLUsers')
const Token = require('./models/SQLTokens')
const { PRIVATE_KEY, LOGIN_SESSION_EXPIRES_IN } = require('./config')

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, PRIVATE_KEY)
    const user = await User.findOne({
      include: {
        model: Token,
        where: {
          token: token,
        },
      },
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
    //increase the token time || modify existing token; maybe ?

    req.token = token
    req.user = user
    next()
  } catch (e) {
    console.log(e)
    res.status(401).send({ error: e.message })
  }
}

const generateAuthToken = async user => {
  const token = jwt.sign({ id: user.id }, PRIVATE_KEY, { expiresIn: LOGIN_SESSION_EXPIRES_IN })
  const newToken = new Token({
    token,
    UserId: user.id,
  })
  await newToken.save()
  return token
}

module.exports = {
  auth,
  generateAuthToken,
  createUserAuth: () => {},
}
