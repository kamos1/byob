process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');

const server = require('../server/server');
const knex = require('../db/knex');

chai.use(chaiHttp);

describe('API Routes', () => {

 beforeEach((done) => {
    knex.migrate.rollback()
    .then(() => {
      knex.migrate.latest()
      .then(() => {
        knex.seed.run()
        .then(() => {
          done();
        });
      });
    });
  });

  describe('GET /api/v1/jobs/', () => {
    it('should return all jobs', (done) => {
      chai.request(server)
      .get('/api/v1/jobs/')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(215);
        done();
      });
    });
  });

  describe('GET /api/v1/jobs/:id/', () => {
    it('should return a job', (done) => {
      chai.request(server)
      .get('/api/v1/jobs/CALLIGRAPHER')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        done();
      });
    });

    it('should not return a job', (done) => {
      chai.request(server)
      .get('/api/v1/jobs/keji')
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
    });
  });

  describe('GET /api/v1/employees/', () => {
    it('should return employees by title', (done) => {
      chai.request(server)
      .get('/api/v1/employees/?job=STENOGRAPHER')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        done();
      });
    });

    it('should not return employees by title', (done) => {
      chai.request(server)
      .get('/api/v1/employees/?job=keji')
      .end((err, response) => {
        response.should.have.status(404);
        response.should.be.json;
        response.body.should.be.a('object');
        done();
      });
    });
  });
});

  

  

