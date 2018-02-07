
const express = require('express')
const router = express.Router()
const { voteOnComments, deleteComment } = require('../controllers/comments')

router.put('/:comment_id', voteOnComments)

router.delete('/:comment_id', deleteComment);

module.exports = router