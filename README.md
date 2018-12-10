[![Waffle.io - Columns and their card count](https://badge.waffle.io/colehart/BYOBackend.svg?columns=all)](https://waffle.io/colehart/BYOBackend)

[![Build Status](https://travis-ci.org/colehart/BYOBackend.svg?branch=master)](https://travis-ci.org/colehart/BYOBackend)

# BYOBackend - Recharge API

## Recharge while you recharge! With Recharge API, you can query a sophisticated API to find Electric Vehicle (EV) charging stations and nearby cafes anywhere in the US or Canada. A Heroku-hosted PostgreSQL relational database and well-documented API built with Node.js, Express, and Knex.js.

## How to Use
Query the Recharge API on Heroku: [https://recharge-api.herokuapp.com/](https://recharge-api.herokuapp.com/).

See [API Endpoints](#api-endpoints) below for endpoint details.

### Developers:
#### Install and Start Server
* Fork and clone this repo.

* `npm install` all dependencies.

* `npm start` the development server.

#### Create Postgres Database and Run Migrations
* `psql CREATE DATABASE rechargeables`

* `knex migrate:latest`

* `knex seed:run`

### [API Endpoints](#api-endpoints)
#### Charging Stations
```
GET /api/v1/stations
--> returns a response body with an array of all station objects

GET /api/v1/stations/:station_id
--> returns a response body with an array of one station object

POST/api/v1/stations/:station_id
--> returns a response body with an id and a message

PUT/api/v1/stations/:station_id
--> returns a response body with a message

DELETE /api/v1/stations/:station_id
--> returns a response body with an id and a message
```
#### Cafes
```
GET /api/v1/cafes?cafe_name=CAFE+NAME+HERE
--> returns a response body with an array of matching cafe objects
// See example below

GET /api/v1/stations/:station_id/cafes
--> returns a response body with an array of all cafe objects matching provided station id

GET /api/v1/stations/:station_id/cafes/:cafe_id
--> returns a response body with an array of one cafe object of matching station

POST /api/v1/stations/:station_id/cafes/:cafe_id
--> returns a response body with an id and a message

PUT /api/v1/stations/:station_id/cafes/:cafe_id
--> returns a response body with an id and a message

DELETE /api/v1/cafes/:cafe_id
--> returns a response body with an id and a message

```
##### SAMPLE `GET` REQUEST
```
For station with id of 1, and cafe with id of 2

https://recharge-api.herokuapp.com/api/v1/stations/1/cafes/2

Expected response:

[
  {
      "id": 2,
      "cafe_name": "Ink! Coffee",
      "street_address": "618 16th St",
      "city": "Denver",
      "state": "CO",
      "zip_code": "80202",
      "cross_street": "btwn California & Welton",
      "formatted_address": "618 16th St (btwn California & Welton), Denver, CO 80202, United States",
      "distance_in_meters": 167,
      "station_id": 1,
      "created_at": "2018-12-08T01:10:38.015Z",
      "updated_at": "2018-12-08T01:10:38.015Z"
  }
]
```
##### SAMPLE CAFE QUERY
```
For specific cafe name, enter the following after path:

app.get('/api/v1/cafes?cafe_name=CAFE+NAME+HERE' or CAFE%20NAME%20COFFEE) where spaces are separated by + (plus) characters OR %20

SAMPLE `GET` REQUEST for cafe with name 'Perks Coffee'.

https://recharge-api.herokuapp.com/api/v1/cafes?cafe_name=Perks+Coffee

Expected response:

[
  {
      "id": 1,
      "cafe_name": "Perks Coffee",
      "street_address": "650 15th St",
      "city": "Denver",
      "state": "CO",
      "zip_code": null,
      "cross_street": null,
      "formatted_address": "650 15th St, Denver, CO, United States",
      "distance_in_meters": 32,
      "station_id": 1,
      "created_at": "2018-12-08T01:10:38.014Z",
      "updated_at": "2018-12-08T01:10:38.014Z"
  }
]
```


## Technologies Used
- JavaScript
- jQuery
- Node.js
- Express
- Knex.js
- Heroku

## Project Requirements
Project spec can be found [here](http://frontend.turing.io/projects/build-your-own-backend.html).

Feature checklist can be found here [here](http://frontend.turing.io/projects/byob/backend-feature-checklist.html).

## Database Schema Wireframe
Recharge API has a one-to-many relationship between recharging stations and cafes.
![An illustration of the database schema](https://raw.githubusercontent.com/colehart/BYOBackend/master/public/assets/images/rechargeSchema.png "Database schema")


## This is a partenered project designed and coded by Alexander Ela and Cole Hart.
