
const express = require('express')
const router = express.Router()
const { getCommentById, voteOnComments, deleteComment } = require('../controllers/comments')



router.get('/:comment_id', getCommentById)

router.put('/:comment_id', voteOnComments)

router.delete('/:comment_id', deleteComment);

module.exports = router