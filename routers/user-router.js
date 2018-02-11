
const express = require('express')
const router = express.Router()
const { getUser, getAllUsers, getArticlesByUser } = require('../controllers/users')

router.get('/', getAllUsers)

router.get('/:username', getUser);

router.get('/:user_id/articles', getArticlesByUser)

module.exports = router