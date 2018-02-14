const express = require('express');
const router = express.Router();

const articleRouter = require('./article-router');
const topicRouter = require('./topic-router');
const userRouter = require('./user-router');
const commentRouter = require('./comment-router');

router.use('/topics', topicRouter);
router.use('/articles', articleRouter);
router.use('/users', userRouter);
router.use('/comments', commentRouter);

router.use('/*', (req, res) => {
	res.status(404).send('Page not found');
});

router.use((err, req, res, next) => {
	res.status(err.statusCode || 500).send(err.message);
});


module.exports = router;