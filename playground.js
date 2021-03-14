const jwt = require('jsonwebtoken')

const text = 'random text'
const key = 'abc'

const encoded = jwt.sign({ text }, key, {
  expiresIn: 1,
})

console.log(encoded)

setTimeout(() => {
  const decoded = jwt.decode(encoded, key)
  const verify = jwt.verify(encoded, key)
  console.log('verification', verify)
}, 1000)

console.log('done')
