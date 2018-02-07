

const User = require('../models/users')
const url = require('url')
const qs = require('querystring')

function getUser(req, res, nest) {
  const userName = req.params.username;
  User.findOne({ username: userName }, { __v: false })
    .then((user) => res.json(user))
}


module.exports = { getUser }