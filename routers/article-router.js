const express = require('express')
const router = express.Router()
const { getAllArticles } = require('../controllers/articles')

router.get('/', getAllArticles)



module.exports = router