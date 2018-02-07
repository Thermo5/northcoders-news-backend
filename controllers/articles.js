const Article = require('../models/articles')
const Comment = require('../models/comments')
const url = require('url')
const qs = require('querystring')

function getAllArticles(req, res, next) {
  Article.find().lean()
    .then((articles) => res.json( articles ))
    .catch(next)
}

function getCommentsByArticle(req, res, next) {
  const articleId = req.params.article_id;
  Article.findOne({ _id: articleId })
    .then((article) => {
      const idOfArticle = article._id;
      return Comment.find({ belongs_to: idOfArticle }, { __v: false })
    })
    .then((comments) => res.json( comments ))
    .catch(next)
}


module.exports = { getAllArticles, getCommentsByArticle }