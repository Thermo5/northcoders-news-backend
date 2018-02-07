const express = require('express')
const router = express.Router()
const { getAllArticles, getCommentsByArticle, postCommentToArticle } = require('../controllers/articles')

router.get('/', getAllArticles)

router.get('/:article_id/comments', getCommentsByArticle)

router.post('/:article_id/comments', postCommentToArticle)



module.exports = router