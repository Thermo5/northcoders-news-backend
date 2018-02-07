const express = require('express')
const router = express.Router()
const { getAllArticles, getCommentsByArticle } = require('../controllers/articles')

router.get('/', getAllArticles)

router.get('/:article_id/comments', getCommentsByArticle)



module.exports = router