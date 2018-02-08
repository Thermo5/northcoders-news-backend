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
      it('GET returns an object of the topics', () => {
        return request
          .get('/api/topics')
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.topics[0]).to.be.an('object');
            expect(res.body.topics.length).to.be.eql(3);
          });
      });
    });
    describe('/articles', () => {
      it('GET returns an array of the articles', () => {
        return request
          .get('/api/articles')
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.articles[0]).to.be.an('object');
            expect(res.body.articles.length).to.be.eql(2);
            expect(Object.keys(res.body.articles[0]).length).to.be.eql(6);
          });
      });
    });
    describe('/users', () => {
      it('GET returns an object of the users', () => {
        return request
          .get('/api/users/northcoder')
          .expect(200)
          .then((res) => {
            expect(res.body.users).to.be.an('object');
            expect(Object.keys(res.body.users).length).to.be.eql(4);
          });
      });
    });
    describe('/topics/football/articles', () => {
      it('GET returns an object of the articles', () => {
        return request
          .get('/api/topics/football/articles')
          .expect(200)
          .then((res) => {
            console
            expect(res.body.articles[0]).to.be.an('object');
            expect(Object.keys(res.body.articles[0]).length).to.be.eql(3);
          });
      });
    });
    describe('/articles/:article_id/comments', () => {
      it('GET returns an array of the comments', () => {
        return request
          .get(`/api/articles/${docs.articles[0]._id}/comments`)
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.comments.length).to.be.eql(2);                             //number of comments returned
            expect(res.body.comments[0]).to.be.an('object');
            expect(Object.keys(res.body.comments[0]).length).to.be.eql(6);
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
            expect(res.body.comments.length).to.be.eql(3);
          })
      });
    });

    describe('/articles/:article_id', () => {
      it('GET the article vote', () => {
        return request
          .get(`/api/articles/${docs.articles[0]._id}`)
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.article.votes).to.be.eql(0);
          })
        });
        it('PUT add one to the article vote', () => {
          return request
          .put(`/api/articles/${docs.articles[0]._id}?vote=up`)
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.votes).to.be.eql(1);
          })
        })
        it('PUT sub one to the article vote', () => {
          return request
          .put(`/api/articles/${docs.articles[0]._id}?vote=down`)
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.votes).to.be.eql(-1);
          })
      })
    });
    describe('/comments/:comment_id', () => {
      it('GET the comment vote', () => {
        return request
          .get(`/api/comments/${docs.comments[0]._id}`)
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.votes).to.be.eql(0);
          })
      });
      it('PUT add one to the comment vote', () => {
        return request
          .put(`/api/comments/${docs.comments[0]._id}?vote=up`)
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.votes).to.be.eql(1);
          })
      })
      it('PUT sub one to the comment vote', () => {
        return request
          .put(`/api/comments/${docs.comments[0]._id}?vote=down`)
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.votes).to.be.eql(-1);
          })
      })
    });
    describe('/comments/:comment_id', () => {   //delete comment
      it('GET comment', () => {
        return request
          .get(`/api/comments/${docs.comments[0]._id}`)
          .expect(200)
          .then((res) => {
            //console.log(res.body)
            expect(res.body).to.be.an('object');
          })
      });

      it('DELETE comment ', () => {
        return request
          .get(`/api/articles/${docs.articles[0]._id}/comments`)
          .then((res) => {
            console.log(res.body.comments.length, 'inital length check')
            expect(res.body.comments.length).to.be.eql(2);
          })
          .then(() => {
            return request
              .delete(`/api/comments/${docs.comments[0]._id}`)
              .expect(200)
          })
          .then((res) => {
            console.log(res.body)
          })
          .then(() => {
            return request
              .get(`/api/articles/${docs.articles[0]._id}/comments`)
          })
          .then((res) => {
            console.log(res.body.comments.length, 'after delete length')
            expect(res.body.comments.length).to.be.eql(1);
          })
      })
    });
  })
})