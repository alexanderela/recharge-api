const bodyParser = require('body-parser');
const express = require('express');
const environment = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[environment];
const database = require('knex')(config);
const app = express();
const cafeCleanUp = require('./utils/dbDataCleaner');

const stationLengthChecker = async (request, response, next) => {
  const { station_id } = request.params;
  const station = await database('stations').where('id', station_id).select();

  if (!station.length) {
    return response.status(404).send(`Station with id of ${station_id} was not found.`);
  } else {
    next();
  }
};

const stationParamChecker = async (request, response, next) => {
  const newName = request.body.station_name;

  if (!newName) {
    return response.status(422).send('No station name provided.');
  } else {
    next();
  }
};

const cafeLengthChecker = async (request, response, next) => {
  const { cafe_id, station_id } = request.params;
  const cafe = await database('cafes').where({
    'id': cafe_id,
    station_id
  }).select();

  if (!cafe.length) {
    return response.status(404).send(`Cafe with id of ${cafe_id} was not found.`);
  } else {
    next();
  }
};

const cafeParamChecker = async (request, response, next) => {
  const newName = request.body.cafe_name;

  if (!newName) {
    return response.status(422).send('No cafe name provided.' );
  } else {
    next();
  }
};

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT || 3000);

// Station endpoints

app.get('/api/v1/stations', (request, response) => {
  database('stations').select()
    .then(stations => response.status(200).json(stations))
    .catch(error => response.status(500).json({
      error: error.message
    }));
});

app.post('/api/v1/stations', (request, response) => {
  const station = request.body;

  for (let requiredParam of [
    'station_name',
    'station_phone',
    'street_address',
    'city',
    'state',
    'zip_code',
    'latitude',
    'longitude',
    'intersection_directions',
    'access_days_time'
  ]) {
    if (!station[requiredParam]) {
      return response.status(422).json({
        error: `Expected format: { station_name: <String>, station_phone: <String>, street_address: <String>, city: <Strin longitude: <Float>, intersection_directions: <String>, access_days_time: <String> }. You're missing the ${requiredParam} property.`
      });
    }
  }

  database('stations').insert(station, 'id')
    .then(stationIds => response.status(201).json({
      id: stationIds[0],
      message: `Station "${station.station_name}" successfully created!`
    }))
    .catch(error => response.status(500).json({
      error: error.message
    }));
});

app.get('/api/v1/stations/:station_id', (request, response) => {
  const { station_id } = request.params;

  database('stations').where('id', station_id).select()
    .then(stations => response.status(200).json(stations))
    .catch(error => response.status(500).json({
      error: error.message
    }));
});

app.put('/api/v1/stations/:station_id', stationLengthChecker, stationParamChecker, async (request, response) => {
  const newName = request.body.station_name;
  const { station_id } = request.params;
  const station = await database('stations').where('id', station_id).select();
  const oldName = station[0].station_name;


  database('stations').where('station_name', oldName).update('station_name', newName)
    .then(() => response.status(202).json({
      message: `Edit successful. Station with id of ${station_id} name changed from ${oldName} to ${newName}.`
    }))
    .catch(error => response.status(500).json({
      error: `Error updating station: ${error.message}`
    }));
});

app.delete('/api/v1/stations/:station_id', (request, response) => {
  const { station_id } = request.params;
  database('cafes').where('station_id', station_id).delete()
    .then(() => database('stations').where('id', station_id).delete())
    .then(stationId => response.status(200).json({
      id: stationId,
      message: `Station ${station_id} has been deleted.`
    }))
    .catch(error => response.status(500).json({
      error: `Error deleting station: ${error.message}`
    }));
});

// Cafe endpoints

app.get('/api/v1/stations/:station_id/cafes', (request, response) => {
  const { station_id } = request.params;

  database('cafes').where('station_id', station_id).select()
    .then(cafes => response.status(200).json(cafes))
    .catch(error => response.status(500).json({
      error: error.message
    }));
});

app.get('/api/v1/cafes', (request, response) => {
  const { cafe_name } = request.query;

  database('cafes').where('cafe_name', cafe_name).select()
    .then(cafes => {
      const uniqueCafes = cafeCleanUp(cafes);
      if (!uniqueCafes.length) {
        response.status(422).json({
          uniqueCafes,
          message: "Incorrect query string. Proper format is '/api/v1/cafes?cafe_name=CAFE+NAME+HERE' or CAFE%20NAME%20COFFEE"
        });
      } else {
        response.status(200).json(uniqueCafes);
      }
    })
    .catch(error => response.status(500).json({
      error: error.message
    }));
});

app.post('/api/v1/stations/:station_id/cafes', (request, response) => {
  const cafe = request.body;

  for (let requiredParam of [
    'station_id',
    'cafe_name',
    'street_address',
    'city',
    'state',
    'zip_code',
    'formatted_address',
    'cross_street',
    'distance_in_meters'
  ]) {
    if (!cafe[requiredParam]) {
      return response.status(422).json({
        error: `Expected format: {station_id: <Integer>, cafe_name: <String>, street_address: <String>, city: <String>, state: <String>, zip_code: <String>, formatted_address: <String>, cross_street: <String>, distance_in_meters: <Integer> }. You're missing the ${requiredParam} property.`
      });
    }
  }

  database('cafes').insert(cafe, 'id')
    .then(cafeIds => response.status(201).json({
      id: cafeIds[0],
      message: `Cafe "${cafe.cafe_name}" successfully created!`
    }))
    .catch(error => response.status(500).json({
      error: error.message
    }));
});

app.get('/api/v1/stations/:station_id/cafes/:cafe_id', (request, response) => {
  const { cafe_id, station_id } = request.params;
  database('cafes').where({
    'id': cafe_id,
    station_id
  }).select()
    .then(cafes => response.status(200).json(cafes))
    .catch(error => response.status(500).json({
      error: error.message
    }));
});

app.put('/api/v1/stations/:station_id/cafes/:cafe_id', cafeLengthChecker, cafeParamChecker, async (request, response) => {
  const newName = request.body.cafe_name;
  const { cafe_id, station_id } = request.params;
  const cafe = await database('cafes').where({
    'id': cafe_id,
    station_id
  }).select();
  const oldName = cafe[0].cafe_name;

  database('cafes').where('cafe_name', oldName).update('cafe_name', newName)
    .then(cafe => response.status(202).json({
      cafe,
      message: `Edit successful. Cafe with id of ${cafe_id} name changed from ${oldName} to ${newName}.`}))
    .catch(error => response.status(500).json({
      error: `Error updating cafe: ${error.message}`
    }));
});

app.delete('/api/v1/cafes/:cafe_id', (request, response) => {
  const { cafe_id } = request.params;
  database('cafes').where('id', cafe_id).delete()
    .then(cafeId => response.status(200).json({
      id: cafeId,
      message: `Cafe ${cafe_id} has been deleted.`
    }))
    .catch(error => response.status(500).json({
      error: `Error deleting cafe: ${error.message}`
    }));
});

app.use((request, response) => {
  response.status(404).send('Sorry, the path you entered does not exist.');
});

app.listen(app.get('port'), () => {
  console.log(`App is running on ${app.get('port')}`);
});

module.exports = app;