process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../server');
const config = require('../knexfile')['test'];
const database = require('knex')(config);
const { testStations, testCafes, testMockStations, testMockCafes, testMockErrorStations, testMockEditStations, testMockErrorCafes, testMockEditCafes } = require('./testMocks');

chai.use(chaiHttp)

describe('Server file', () => {
  before(done => {
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
          const stationNames = response.body.map(station => station.station_name);
          const stationAddresses = response.body.map(station => station.street_address);
          const stationName1 = 'Station 1';
          const stationName2 = 'Station 2';
          const stationAddress1 = '123 Main St.';
          const stationAddress2 = '456 Main St.';


          expect(error).to.be.null;
          expect(response).to.have.status(200);
          expect(stationNames.includes(stationName1)).to.equal(true);
          expect(stationNames.includes(stationName2)).to.equal(true);
          expect(stationAddresses.includes(stationAddress1)).to.equal(true);
          expect(stationAddresses.includes(stationAddress2)).to.equal(true);
          done();
        })
    })

    it('POST sends back 201 status code and correct response object', done => {
      const newStation = testMockStations[0]
      const successMessage = 'Station "Test Station 1" successfully created!'

      chai.request(app)
        .post('/api/v1/stations')
        .send(newStation)
        .end((error, response) => {
          expect(error).to.be.null;
          expect(response).to.have.status(201);
          expect(response.body.id).to.equal(3);
          expect(response.body.message).to.equal(successMessage);
          done();
        })
    })

    it('POST sends back 422 status code for improper formatting and correct response object', done => {
      const newStation = testMockErrorStations[0]
      const errorMessage = "Expected format: { station_name: <String>, station_phone: <String>, street_address: <String>, city: <Strin longitude: <Float>, intersection_directions: <String>, access_days_time: <String> }. You're missing the station_name property."

      chai.request(app)
        .post('/api/v1/stations')
        .send(newStation)
        .end((error, response) => {
          expect(error).to.be.null;
          expect(response).to.have.status(422);
          expect(response.body.error).to.equal(errorMessage);
          done();
        })
    })

    it('sends 404 for bad path and returns custom text', done => {
      const errorText = 'Sorry, the path you entered does not exist.'

      chai.request(app)
        .get('/api/v1/statios')
        .end((error, response) => {
          expect(error).to.be.null;
          expect(response).to.have.status(404);
          expect(response.text).to.equal(errorText);
          done();
        })
    })
  })

  describe('/api/v1/stations/:station_id', () => {
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
        .get('/api/v1/stations/1')
        .end((error, response) => {

          const stationIds = response.body.map(station => station.id);
          const expected = 1;

          expect(error).to.be.null;
          expect(response).to.have.status(200);
          expect(response.body.length).to.equal(1);
          expect(stationIds.includes(expected)).to.equal(true);
          expect(stationIds.includes(0)).to.equal(false);
          done();
        })
    })

    it('PUT sends back a 202 status code and correct response object', done => {
      const editedStation = testMockEditStations[0]

      chai.request(app)
        .put('/api/v1/stations/1')
        .send(editedStation)
        .end((error, response) => {
          expect(error).to.be.null;
          expect(response).to.have.status(202);
          expect(response.body.message.includes('Edit successful. Station with id of 1 name changed from')).to.equal(true);
          expect(response.body.message.includes('to Edit Test Station 1.')).to.equal(true);
          done();
        })
    })

    it('PUT sends back custom 404 when id not found', done => {
      const errorText = 'Station with id of 13 was not found.'
      const editedStation = testMockEditStations[0]

      chai.request(app)
        .put('/api/v1/stations/13')
        .send(editedStation)
        .end((error, response) => {
          expect(error).to.be.null;
          expect(response).to.have.status(404);
          expect(response.text).to.equal(errorText);
          done();
        })
    })

    it('PUT sends back 422 when no name provided not found', done => {
      const errorText = 'No station name provided.'
      const editedStation = testMockEditStations[1]

      chai.request(app)
        .put('/api/v1/stations/1')
        .send(editedStation)
        .end((error, response) => {
          expect(error).to.be.null;
          expect(response).to.have.status(422);
          expect(response.text).to.equal(errorText);
          done();
        })
    })

    it('DELETE sends back a 200 status code and correct response object', done => {
      const successMessage = 'Station 1 has been deleted.'
      const deletedStation = testMockEditStations[0]

      chai.request(app)
        .delete('/api/v1/stations/1')
        .send(deletedStation)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body.id).to.equal(1);
          expect(response.body.message).to.equal(successMessage);
          done();
        })
    })
  })

  describe('/api/v1/stations/:station_id/cafes', () => {
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
        .get('/api/v1/stations/2/cafes')
        .end((error, response) => {

          expect(error).to.be.null;
          expect(response).to.have.status(200);
          expect(response.body.length).to.equal(3)
          done();
      })
    })

    it('POST sends back a 201 status code and correct response object', done => {
      const newCafe = testMockCafes[0]
      const successMessage = 'Cafe "Test Cafe 1" successfully created!'

      chai.request(app)
        .post('/api/v1/stations/1/cafes')
        .send(newCafe)
        .end((error, response) => {
          expect(error).to.be.null;
          expect(response).to.have.status(201);
          expect(response.body.id).to.equal(7);
          expect(response.body.message).to.equal(successMessage)
          done();
        })
    })

    it('POST sends back 422 status code for improper formatting and correct response object', done => {
      const newStation = testMockErrorCafes[0]
      const errorMessage = "Expected format: { station_name: <String>, station_phone: <String>, street_address: <String>, city: <Strin longitude: <Float>, intersection_directions: <String>, access_days_time: <String> }. You're missing the station_name property."

      chai.request(app)
        .post('/api/v1/stations')
        .send(newStation)
        .end((error, response) => {
          expect(error).to.be.null;
          expect(response).to.have.status(422);
          expect(response.body.error).to.equal(errorMessage);
          done();
        })
    })
  })

  describe('/api/v1/cafes?', done => {
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
        .get('/api/v1/cafes?cafe_name=Cafe+1')
        .end((error, response) => {
          const firstEntry = response.body[0]
          const expectedEntry = testCafes[1]

          expect(error).to.be.null;
          expect(response).to.have.status(200);
          expect(firstEntry.cafe_name).to.equal(expectedEntry.cafe_name)
          expect(firstEntry.cross_street).to.equal(expectedEntry.cross_street)
          done();
        })
    })

    it('GET sends back a custom 422 when cafe query is formatted incorrectly', done => {
      chai.request(app)
        .get('/api/v1/cafes?cafe_name=Cole+Alex+Cafe')
        .end((error, response) => {
          const expected = []
          const expectedMessage = "Incorrect query string. Proper format is '/api/v1/cafes?cafe_name=CAFE+NAME+HERE' or CAFE%20NAME%20COFFEE"

          expect(response.body.uniqueCafes).to.deep.equal(expected)
          expect(response.body.message).to.deep.equal(expectedMessage)
          expect(response).to.have.status(422);
          done();
        })
    })
  })

  describe('/api/v1/stations/:station_id/cafes/:cafe_id', () => {
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

    it.skip('GET sends back a 200 status code and correct response object', done => {
      chai.request(app)
        .get('/api/v1/stations/1/cafes/1')
        .end((error, response) => {

          expect(error).to.be.null;
          expect(response).to.have.status(200);
          expect(response.body.length).to.equal(1)
          done();
      })
    })

    it.skip('PUT sends back a 202 status code and correct response object', done => {
      const successMessage = 'Edit successful. Cafe with id of 1 name changed from Cafe 1 to Test Cafe 1.'
      const editedCafe = testMockCafes[0]

      chai.request(app)
        .put('/api/v1/stations/1/cafes/1')
        .send(editedCafe)
        .end((error, response) => {
          expect(error).to.be.null;
          expect(response).to.have.status(202);
          expect(response.body.message).to.equal(successMessage);
          done();
        })
    })

    it('PUT sends back a custom 404 when id not found', done => {
      const errorText = 'Cafe with id of 13 was not found.'
      const editedStation = testMockEditCafes[0]

      chai.request(app)
        .put('/api/v1/stations/1/cafes/13')
        .send(editedStation)
        .end((error, response) => {
          expect(error).to.be.null;
          expect(response).to.have.status(404);
          expect(response.text).to.equal(errorText);
          done();
        })
    })

    it.skip('PUT sends back 422 when no name provided not found', done => {
      const errorText = 'No cafe name provided.'
      const editedCafe = testMockEditCafes[1]

      chai.request(app)
        .put('/api/v1/stations/1/cafes/1')
        .send(editedCafe)
        .end((error, response) => {
          expect(error).to.be.null;
          expect(response).to.have.status(422);
          expect(response.body.message).to.equal(errorText);
          done();
        })
    })

    it('DELETE sends back a 200 status code and correct response object', done => {
      const successMessage = 'Cafe 1 has been deleted.'
      const deletedCafe = testMockEditCafes[0]

      chai.request(app)
        .delete('/api/v1/cafes/1')
        .send(deletedCafe)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body.id).to.equal(1);
          expect(response.body.message).to.equal(successMessage);
          done();
        })
    })
  })
})
