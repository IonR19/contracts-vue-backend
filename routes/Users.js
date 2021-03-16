const express = require('express')
const usersController = require('../controllers/user-control')
const { auth } = require('../auth')

const router = express.Router()

// router.get('/', usersController.getUsers)

router.post('/login', usersController.login)
router.post('/logout', usersController.logout)
router.post('/signup', usersController.signup)
router.delete('/deleteUser', auth, usersController.deleteUser)
router.patch('/editUser', auth, usersController.updateUser)

module.exports = router
