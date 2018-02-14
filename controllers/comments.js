

const Comment = require('../models/comments');
const url = require('url');
const qs = require('querystring');

function getCommentById(req, res, next) {
	const commentId = req.params.comment_id;
	Comment.findOne({ _id: commentId })
		.then((comment) => res.json(comment))
		.catch(next);
}

function voteOnComments(req, res, next) {
	const commentId = req.params.comment_id;
	if (commentId.length !== 24) return next({ statusCode: 404, message: `Article ${commentId} not valid length` });
	const reqUrl = url.parse(req.url);
	const queryString = qs.parse(reqUrl.query);
	if ((queryString.vote !== 'up') && (queryString.vote !== 'down')) return next({ statusCode: 404, message: `Vote ${queryString.vote} invalid` });
	const upVote = queryString.vote === 'up';
	Comment.findOne({ _id: commentId })
		.then((comment) => {
			if (upVote) {
				comment.votes += 1;
				console.log('upvoted comment');
			}
			else {
				if (comment.votes === 0) comment.votes = 0;
				comment.votes -= 1;
				console.log('downvoted comment');
			}
			return comment.save();
		})
		.then((comments) => {
			res.json( {comments} );
			console.log('comment changed');
		})
		.catch(next);
}


function deleteComment(req, res, next) {
	const commentId = req.params.comment_id;
	if (commentId.length !== 24) return next({ statusCode: 404, message: `Article ${commentId} not valid length` });
	Comment.findOneAndRemove({ _id: commentId })
		.then((comment) => {
			if (comment === null) return next({ statusCode: 404, message: `Comment ${commentId} not found` });
			console.log(comment);
			res.json(`comment ${comment._id} deleted`);
		})
		.catch(next);
}

module.exports = {  getCommentById, voteOnComments, deleteComment  };