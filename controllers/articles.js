const Article = require('../models/articles')
const Comment = require('../models/comments')
const url = require('url')
const qs = require('querystring')


function getAllArticles(req, res, next) {
  Article.find().lean()
    .then((articles) => res.json({articles}))
    .catch(next)
}

function getArticleById(req, res, next) {
  const articleId = req.params.article_id;
  if (articleId.length !== 24) return next({ statusCode: 404, message: `Article ${articleId} not valid length` })
  Article.findOne({ _id: articleId })
  
    .then((article) => {
      if (!article) return next({ statusCode: 404, message: `Article empty` })
      return res.json({article})})
    .catch(next)
}


function getCommentsByArticle(req, res, next) {
  const articleId = req.params.article_id;
  if (articleId.length !== 24) return next({ statusCode: 404, message: `Article ${articleId} not valid length` })
  Comment.find({ belongs_to: articleId }, { __v: false })
    .then((comments) => {
      if (comments.length === 0) return next({ statusCode: 404, message: 'Comment empty' })
      return res.json({comments})})
    .catch(next)
}

function postCommentToArticle(req, res, next) {
  const articleId = req.params.article_id;
  if (articleId.length !== 24) return next({ statusCode: 404, message: `Article ${articleId} not valid length` })
  Article.findOne({ _id: articleId })
    .then((article) => {
      if (!article) return next({ statusCode: 404, message: `Article ${articleId} returned empty body` })
      console.log(req.body, 'req.body')
      let comment = new Comment({
        body: req.body.body,
        belongs_to: article._id,
        created_by: 'northcoder',
        votes: 0,
        created_at: Date.now()
      })
      if (comment.body === "") return next({ statusCode: 404, message: `Comment required` })
      //if (comment.created_by === "") return next({ statusCode: 404, message: `User name required` })
      return comment.save()
    })
    .then((comment) => res.status(201).json(comment))
    .catch(next)
}

function articleVote(req, res, next) {
  const articleId = req.params.article_id;
  if (articleId.length !== 24) return next({ statusCode: 404, message: `Article ${articleId} not valid length` })
  const reqUrl = url.parse(req.url);
  const queryString = qs.parse(reqUrl.query)
  if ((queryString.vote !== "up") && (queryString.vote !== "down")) return next({ statusCode: 404, message: `Vote ${queryString.vote} invalid` })

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






module.exports = { getAllArticles, getArticleById, getCommentsByArticle, postCommentToArticle, articleVote }