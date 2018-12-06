process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../server');
const config = require('../knexfile')['test'];
const database = require('knex')(config);
const { testMockStations, testMockCafes } = require('./testMocks');

chai.use(chaiHttp)

describe('Server file', () => {
  describe('/api/v1/stations', () => {
    beforeEach(done => {
      database.migrate.rollback()
        .then(() => database.migrate.latest())
        .then(() => database.seed.run())
        .then(() => done())
    })

    after(done => {
      database.migrate.rollback()
        .then(() => console.log('Testing complete. Db rolled back.'))
        .then(() => done())
    })

    it('GET sends back a 200 status code and correct response object', done => {
      chai.request(app)
        .get('/api/v1/stations')
        .end((error, response) => {
          expect(response).to.have.status(200);
          done();
        })
    })

    it('POST sends back 201 status code and correct response object', done => {
      const newStation = testMockStations[0]

      chai.request(app)
        .post('/api/v1/stations')
        .send(newStation)
        .end((error, response) => {
          expect(error).to.be.null;
          expect(response).to.have.status(201);
          expect(response.body.id).to.equal(3);
          expect(response.body.message).to.equal('Station "Test Station 1" successfully created!');
          done();
        })
    })

    it('sends 404 for bad path', done => {
      chai.request(app)
        .get('/api/v1/statios')
        .end((error, response) => {
          expect(error).to.be.null;
          expect(response).to.have.status(404);
          expect(response.text).to.equal('Sorry, the path you entered does not exist.');
          done();
        })
    })
  })
})
