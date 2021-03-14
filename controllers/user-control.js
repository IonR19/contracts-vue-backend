const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

const { PRIVATE_KEY } = require('../config')
const HttpError = require('../models/http-error')
const User = require('../models/SQLUsers')
const Token = require('../models/SQLTokens')

const { generateAuthToken } = require('../auth')
const { Op } = require('sequelize')

const getUsers = async (req, res, next) => {
  let users = []
  try {
    // users = await User.find({}, '-password');
    users = await User.findAll()
  } catch (err) {
    const error = new HttpError('Fetching users failed, please try again later.', 500)
    return next(error)
  }
  res.json({ users: users.map(user => user.toObject({ getters: true })) })
}

const signup = async (req, res, next) => {
  const { name, titleAr, titleEn, password, type, canEdit, canDelete, canCreate } = req.body
  let existingUser
  try {
    existingUser = await User.findOne({ where: { name: { [Op.iLike]: name } } })
  } catch (err) {
    const error = new HttpError('Signing up failed, please try again later. Error finding user', 500)
    res.status(400).send(error)
    // return next(error)
  }

  if (existingUser) {
    const error = new HttpError('User exists already, please login instead. User already exist', 422)
    return next(error)
  }

  const createdUser = new User({
    name,
    titleAr,
    password,
    titleEn,
    type,
    canEdit,
    canCreate,
    canDelete,
  })

  try {
    await createdUser.save()
  } catch (err) {
    const error = new HttpError('Signing up failed, please try again later. failed saving user', 500)
    return next(error)
  }

  res.status(201).json(createdUser)
}

const login = async (req, res, next) => {
  const { name, password } = req.body
  let existingUser

  try {
    existingUser = await User.findOne({
      where: {
        name: {
          [Op.iLike]: name,
        },
      },
    })
    if (!existingUser) {
      return res.status(401).send('Incorrect Info')
    }
    if (existingUser.password !== password) {
      return res.status(401).send('Wrong Password')
    }
    const token = await generateAuthToken(existingUser)
    existingUser.setAttributes('password', null)
    res.json({ user: existingUser, token })
  } catch (err) {
    return res.status(500).send(err.message)
  }
}

const updateUser = async (req, res, next) => {}
const deleteUser = async (req, res, next) => {}
const logout = async (req, res, next) => {
  //clean all tokens, send ok;
  const decoded = jwt.verify(token, PRIVATE_KEY)
  //get token
  // const token = req.headers.;

  //find user

  //delete toke ns

  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const user = Token.findOne({
      where: {
        token: token,
      },
    })
    const result = await Token.destroy({
      where: {
        UserId: user.id,
      },
    })
    res.send({ deletedTokens: result, token })
  } catch (e) {
    res.status(500).send(e.message)
  }
}

exports.getUsers = getUsers
exports.signup = signup
exports.login = login
exports.updateUser = updateUser
exports.deleteUser = deleteUser
exports.logout = logout
