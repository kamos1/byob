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

  describe('GET /api/v1/employees/:id', () => {
    it('should return an employee', (done) => {
      chai.request(server)
      .get('/api/v1/employees/Vanessa Morrone')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        done();
      });
    });

    it('should not return an employee', (done) => {
      chai.request(server)
      .get('/api/v1/employees/keji')
      .end((err, response) => {
        response.should.have.status(404);
        response.should.be.json;
        response.body.should.be.a('object');
        done();
      });
    });
  });

  describe('POST /api/v1/employees', () => {
    it('should create a new employee', (done) => {
      chai.request(server)
      .post('/api/v1/employees')
      .send({
        fullname: "Man Spider",
        name:"Spider Man",
        first_name: "Spider",
        last_name: "Man",
        salary: 56000,
        job_id: 205
      })
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('id');
        response.body.id.should.equal(378);
        chai.request(server)
        .get('/api/v1/employees/?job=STENOGRAPHER')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          done();
        });
      });
    });

    it('should not create a new employee', (done) => {
      chai.request(server)
      .post('/api/v1/employees')
      .send({
        first_name: "Spider",
        last_name: "Man",
        salary: 56000,
        job_id: 205
      })
      .end((err, response) => {
        response.should.have.status(422);
        response.body.should.be.a('object');
        done();
      });
    });
  });

  describe('POST /api/v1/jobs', () => {
    it('should create a new job', (done) => {
      chai.request(server)
      .post('/api/v1/jobs')
      .send({
        title: "student",
      })
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('id');
        response.body.id.should.equal(216);
        chai.request(server)
        .get('/api/v1/jobs')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(216);
          done();
        });
      });
    });

    it('should not create a new job', (done) => {
      chai.request(server)
      .post('/api/v1/employees')
      .send({
        first_name: "Spider",
        last_name: "Man",
        salary: 56000,
        job_id: 205
      })
      .end((err, response) => {
        response.should.have.status(422);
        response.body.should.be.a('object');
        done();
      });
    });
  });

  describe('PATCH /api/v1/employees/:id/salary', () => {
    it('should update employee salary', (done) => {
      chai.request(server)
      .patch('/api/v1/employees/Ivanka Trump/salary')
      .send({
        salary: 1
      })
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('success');
        chai.request(server)
        .get('/api/v1/employees/?job=FIRST DAUGHTER AND ADVISOR TO THE PRESIDENT')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('salary');
          response.body.salary.should.equal(1);
          done();
        });
      });
    }); 

    it('should not update employee salary', (done) => {
      chai.request(server)
      .patch('/api/v1/employees/Ivanka Trump/salary')
      .send({
        salad: 1
      })
      .end((err, response) => {
        response.should.have.status(422);
        response.body.should.be.a('object');
        done();
      });
    });
  });

  describe('PATCH /api/v1/jobs/:id/title', () => {
    it('should update job title', (done) => {
      chai.request(server)
      .patch('/api/v1/jobs/STENOGRAPHER/title')
      .send({
        title: "keji",
      })
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('success');
        chai.request(server)
        .get('/api/v1/jobs/keji')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property("title");
          response.body.title.should.equal('keji');
          done();
        });
      });
    });

    it('should not update job title', (done) => {
      chai.request(server)
      .patch('/api/v1/jobs/STENOGRAPHER/title')
      .send({
        asdf: "keji",
      })
      .end((err, response) => {
        response.should.have.status(422);
        response.body.should.be.a('object');
        response.body.should.have.property('error');
        done();
      });
    });
  });

  describe('DELETE /api/v1/employees/:id/', () => {
    it('should delete an employee', (done) => {
      chai.request(server)
      .delete('/api/v1/employees/Ivanka Trump/')
      .send({
        name: 'Ivanka Trump'
      })
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('success');
        chai.request(server)
        .get('/api/v1/employees/?job=FIRST DAUGHTER AND ADVISOR TO THE PRESIDENT')
        .end((err, response) => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.should.be.a('object');
          done();
        });
      });
    });

    it('should not delete an employee', (done) => {
      chai.request(server)
      .delete('/api/v1/employees/Ivanka Trump/')
      .send({
        name: 'keji'
      })
      .end((err, response) => {
        response.should.have.status(404);
        response.should.be.json;
        response.body.should.be.a('object');
        done();
      });
    });
  });

  describe('DELETE /api/v1/jobs/:id/', () => {
    it('should delete a job', (done) => {
      chai.request(server)
      .delete('/api/v1/jobs/STENOGRAPHER')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('success');
        chai.request(server)
        .get('/api/v1/jobs/STENOGRAPHER')
        .end((err, response) => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.should.be.a('object');
          done();
        });
      });
    });

    it('should not delete a job', (done) => {
      chai.request(server)
      .delete('/api/v1/jobs/keji')
      .end((err, response) => {
        response.should.have.status(404);
        response.should.be.json;
        response.body.should.be.a('object');
        done();
      });
    });
  });
});

  

  

