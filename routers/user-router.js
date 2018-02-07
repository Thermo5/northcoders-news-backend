
const express = require('express')
const router = express.Router()
const { getUser } = require('../controllers/users')

router.get('/:username', getUser);

module.exports = router