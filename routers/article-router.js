const express = require('express')
const router = express.Router()
const { getAllArticles, getCommentsByArticle, postCommentToArticle, articleVote } = require('../controllers/articles')

router.get('/', getAllArticles)

router.get('/:article_id/comments', getCommentsByArticle)

router.post('/:article_id/comments', postCommentToArticle)

router.put('/:article_id', articleVote)

module.exports = router