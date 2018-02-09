

const User = require('../models/users')
const url = require('url')
const qs = require('querystring')

function getAllUsers(req, res, next) {
  User.find().lean()
  .then((users) => res.json({users}))
  .catch(next)
}

function getUser(req, res, next) {
  const userName = req.params.username;
  User.findOne({ username: userName }, { __v: false })
    .then((users) => {
      if (!users) return next({ statusCode: 404, message: `User ${userName} not found` })
      return res.json({users})})
    .catch(next)

}


module.exports = { getUser, getAllUsers }