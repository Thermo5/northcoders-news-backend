const Article = require('../models/articles')
const Comment = require('../models/comments')
const url = require('url')
const qs = require('querystring')

function getAllArticles(req, res, next) {
  Article.find().lean()
    .then((articles) => res.json( articles ))
    .catch(next)
}

module.exports = { getAllArticles }