

const Comment = require('../models/comments')
const url = require('url')
const qs = require('querystring')

function getCommentById(req, res, next) {
  const commentId = req.params.comment_id;
  Comment.findOne({ _id: commentId })
    .then((comment) => res.json(comment))
    .catch(next)
}

function voteOnComments(req, res, next) {
  const commentId = req.params.comment_id
  const reqUrl = url.parse(req.url);
  const queryString = qs.parse(reqUrl.query)
  const upVote = queryString.vote === "up";
  Comment.findOne({ _id: commentId })
    .then((comment) => {
      if (upVote) {
        comment.votes += 1;
        console.log('upvoted comment')
      }
      else {
        if (comment.votes === 0) comment.votes = 0;
        comment.votes -= 1
        console.log('downvoted comment')
      }
      return comment.save()
    })
    .then((item) => {
      res.json({ item })
      console.log('comment changed')
    })
    .catch(next)
}


function deleteComment(req, res, next) {
  const commentId = req.params.comment_id;
  Comment.findOneAndRemove({ _id: commentId })
    .then((comment) => {
      res.json(`comment ${comment._id} deleted`)
    })
};

module.exports = {  getCommentById, voteOnComments, deleteComment,  }