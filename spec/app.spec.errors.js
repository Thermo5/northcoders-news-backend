const expect = require('chai').expect;
const seed = require('../seed/test.seed');
const app = require('../server');
const request = require('supertest')(app);
const mongoose = require('mongoose');
var DBs = require('../config').DB;






describe('API endpoints', () => {
	let docs;
	beforeEach(function () {
		const p = mongoose.connection.readyState === 0 ? mongoose.connect(DBs.test) : Promise.resolve();

		return p
			.then(() => {
				return mongoose.connection.dropDatabase();
			})
			.then(seed)
			.then(usefulDocs => {
				docs = usefulDocs;
			});

	});
	after(() => {
		mongoose.disconnect();
	});

	describe('/topics/fotball/articles', () => {
		it('GET returns error topic', () => {
			return request
				.get('/api/topics/fotball/articles')
				.then((err) => {
					expect(err.statusCode).to.equal(404);
					expect(err.text).to.equal('Topic fotball not found');
				});
		});
	});
  
	describe('/users/stephen', () => {
		it('GET returns error user', () => {
			return request
				.get('/api/users/stephen')
				.then((err) => {
					expect(err.statusCode).to.equal(404);
					expect(err.text).to.equal('User stephen not found');
				});
		});
	});
  
	describe('/articles', () => {
		it('GET returns error articles', () => {
			return request
				.get('/api/articles/article1')
				.then((err) => {
					expect(err.statusCode).to.equal(404);
					expect(err.text).to.equal('Article article1 not valid length');
				});
		});
		it('GET returns error articles', () => {
			return request
				.get('/api/articles/5a8430dd6aca51157077af83')
				.then((err) => {
					expect(err.statusCode).to.equal(404);
					expect(err.text).to.equal('Article 5a8430dd6aca51157077af83 not found');
				});
		});
		it('GET returns error articles vote', () => {
			return request
				.put(`/api/comments/${docs.comments[0]._id}?vote=u`)
				.then((err) => {        
					expect(err.statusCode).to.equal(404);
					expect(err.text).to.equal('Vote u invalid');
				});
		});
		it('GET returns error articles comment post', () => {
			return request
				.post('/api/articles/5a8430dd6aca51157077af83/comments')
				.then((err) => {
					expect(err.statusCode).to.equal(404);
					expect(err.text).to.equal('Article 5a8430dd6aca51157077af83 not found');
				});
		});
	});
	describe('/users/stephen', () => {
		it('GET returns error user', () => {
			return request
				.delete('/api/comments/5a8430dd6aca51157077af83')
				.then((err) => {
					expect(err.statusCode).to.equal(404);
					expect(err.text).to.equal('Comment 5a8430dd6aca51157077af83 not found');
				});
		});
	});
});