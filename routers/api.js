const express = require('express')
const router = express.Router()


const articleRouter = require('./article-router')
const topicRouter = require('./topic-router')
const userRouter = require('./user-router')

router.use('/topics', topicRouter)
router.use('/articles', articleRouter)
router.use('/users', userRouter)


router.use('/*', (req, res) => {
  res.status(404).send('Page not found');
});

router.use((err, req, res, next) => {
  res.status(500).json(err);
  next();
});


module.exports = router