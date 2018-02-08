const expect = require('chai').expect;
const seed = require('../seed/test.seed');
const app = require('../server');
const request = require('supertest')(app);
const mongoose = require('mongoose');




describe('API endpoints', () => {
  let docs;
  beforeEach(function () {
    return mongoose.connection.dropDatabase()
      .then(() => {
        return seed();
      })
      .then(({ users, comments, topics, articles }) => {
        docs = { users, comments, topics, articles };
        return;
      });
  });
  after(() => {
    mongoose.disconnect();
  });


  describe('/api', () => {
    describe('/topics', () => {
      it('GET returns an array of the topics', () => {
        return request
          .get('/api/topics')
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.an('array');
            expect(res.body[0]).to.be.an('object');
            expect(res.body.length).to.be.eql(3);
          });
      });
    });
    describe('/articles', () => {
      it('GET returns an array of the articles', () => {
        return request
          .get('/api/articles')
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.an('array');
            expect(res.body[0]).to.be.an('object');
            expect(res.body.length).to.be.eql(2);
            expect(Object.keys(res.body[0]).length).to.be.eql(6);
          });
      });
    });
    describe('/users', () => {
      it('GET returns an array of the users', () => {
        return request
          .get('/api/users/northcoder')
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.an('object');
            expect(Object.keys(res.body).length).to.be.eql(4);
          });
      });
    });
    describe('/topics/football/articles', () => {
      it('GET returns an object of the article', () => {
        return request
          .get('/api/topics/football/articles')
          .expect(200)
          .then((res) => {
            expect(res.body[0]).to.be.an('object');
            expect(Object.keys(res.body[0]).length).to.be.eql(3);
          });
      });
    });
    describe('/articles/:article_id/comments', () => {
      it('GET returns an array of the comments', () => {
        return request
          .get(`/api/articles/${docs.articles[0]._id}/comments`)
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.eql(2);
            expect(res.body[0]).to.be.an('object');
            expect(Object.keys(res.body[0]).length).to.be.eql(6);
          })
      });
      it('POST adds a new comment to the article', () => {
        const newComment = {
          "body": "test, test",
          "created_by": "me"
        }
        return request
          .post(`/api/articles/${docs.articles[0]._id}/comments`)
          .send(newComment)
          .expect(201)
          .then((res) => {
            expect(res.body).to.be.an('object');
            expect(Object.keys(res.body).length).to.be.eql(7);
          })
          .then(() => {
            return request
              .get(`/api/articles/${docs.articles[0]._id}/comments`)
              .expect(200)
          })
          .then(res => {
            expect(res.body.length).to.be.eql(3);
          })
      });
    });

  


  })
})