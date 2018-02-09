
const express = require('express')
const router = express.Router()
const { getUser, getAllUsers } = require('../controllers/users')

router.get('/', getAllUsers)

router.get('/:username', getUser);

module.exports = router