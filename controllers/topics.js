

const Topic = require('../models/topics')
const Article = require('../models/articles')


function getAllTopics(req, res, next) {
  Topic.find().lean()
    .then(topic => res.json( topic ))
    .catch(next);
}

function getArticlesByTopic(req, res, next) {
  const topicId = req.params.topic
    return Article.find({ belongs_to: topicId }, { title: true, body: true, created_by: true })
    .then(result => res.json(result))
    .catch(next)
}

module.exports = { getAllTopics, getArticlesByTopic }
