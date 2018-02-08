

const User = require('../models/users')
const url = require('url')
const qs = require('querystring')

function getUser(req, res, next) {
  const userName = req.params.username;
  User.findOne({ username: userName }, { __v: false })
    .then((users) => res.json({users}))
    .catch(next)

}


module.exports = { getUser }