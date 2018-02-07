const Article = require('../models/articles')
const Comment = require('../models/comments')
const url = require('url')
const qs = require('querystring')

function getAllArticles(req, res, next) {
  Article.find().lean()
    .then((articles) => res.json(articles))
    .catch(next)
}

function getCommentsByArticle(req, res, next) {
  const articleId = req.params.article_id;
  Article.findOne({ _id: articleId })
    .then((article) => {
      const idOfArticle = article._id;
      return Comment.find({ belongs_to: idOfArticle }, { __v: false })
    })
    .then((comments) => res.json(comments))
    .catch(next)
}

function postCommentToArticle(req, res, next) {
  const articleId = req.params.article_id;
  Article.find({ _id: articleId })
    .then((article) => {
      let comment = new Comment({
        body: req.body.body,
        belongs_to: article[0]._id,
        created_by: req.body.created_by,
        votes: 0,
        created_at: Date.now()
      })
      return comment.save()
    })
    .then((comment) => res.status(201).json(comment))
    .catch(next)
}

function articleVote(req, res, next) {
  const articleId = req.params.article_id;
  const reqUrl = url.parse(req.url);
  const queryString = qs.parse(reqUrl.query)

  const yesVote = queryString.vote === "up"
  Article.findOne({ _id: articleId })
    .then((article) => {
      if (yesVote) {
        article.votes += 1
        console.log('upvoted article')
      }
      else {
        if (article.votes === 0) article.votes = 0;
        article.votes -= 1
        console.log('down voted article')
      }
      return article.save()
    })
    .then((item) => res.json(item))
    .catch(next)
}


module.exports = { getAllArticles, getCommentsByArticle, postCommentToArticle, articleVote }