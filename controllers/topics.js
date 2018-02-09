

const Topic = require('../models/topics')
const Article = require('../models/articles')


function getAllTopics(req, res, next) {
  Topic.find().lean()
    .then(topics => res.json( {topics} ))
    .catch(next);
}

function getArticlesByTopic(req, res, next) {
  const topicId = req.params.topic
  if ((topicId !== 'football') && (topicId !== 'coding') && (topicId !== 'cooking')) return next({ statusCode: 404, message: `Topic ${topicId} not found` })
    return Article.find({ belongs_to: topicId }, { title: true, body: true, created_by: true })
    .then(articles => res.json({articles}))
    .catch(next)
}

module.exports = { getAllTopics, getArticlesByTopic }
