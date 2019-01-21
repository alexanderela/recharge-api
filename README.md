[![Waffle.io - Columns and their card count](https://badge.waffle.io/colehart/BYOBackend.svg?columns=all)](https://waffle.io/colehart/BYOBackend)
[![Build Status](https://travis-ci.org/alexanderela/recharge-api.svg?branch=master)](https://travis-ci.org/alexanderela/recharge-api)

# Recharge API

## Recharge while you recharge! With Recharge API, you can query a sophisticated API to find Electric Vehicle (EV) charging stations and nearby cafes anywhere in the US or Canada. A Heroku-hosted PostgreSQL relational database and well-documented API built with Node.js, Express, and Knex.js.

## How to Use
Query the Recharge API on Heroku: [https://recharge-api-v2.herokuapp.com/](https://recharge-api-v2.herokuapp.com/).

See [API Endpoints](#api-endpoints) below for endpoint details.

## Getting Started
This is a general guide to setting up a Recharge API development environment on your local machine.

### Dependencies
* Node.js, Express.js, and Knex.js
* PostgreSQL database
* Mocha and Chai for testing
* See package.json for a list of required modules

### Developers:
#### Get the app on your local machine
* Fork this repo using the `Fork` button in the upper right corner of this page.

* `Clone` your fork onto your local machine
```
git clone https://github.com/YOUR_GITHUB_USERNAME_HERE/BYOBackend
```

* Jump into that directory on your local machine
```
cd BYOBackend
```

* Add an upstream remote that points to the main repo:
```
git remote add upstream https://github.com/colehart/BYOBackend/
```

* Fetch the latest version of `master` from `upstream`
```
git fetch upstream master
```

#### Install and Start Server

* `npm install` all dependencies.

* `npm start` the development server.

#### Create Postgres Development Database and Run Migrations
*  Create a test database on your local machine:
```
psql CREATE DATABASE rechargeables
```

* Run migrations to set up your database schema
```
knex migrate:latest
```

* Seed your database
```
knex seed:run
```

#### Testing
* Create a testing database
```
psql CREATE DATABASE rechargeables_test
```
* Run tests in the test environment:
```
npm test
```

#### Linter
This project is going to be configured to use ESLint to automatically check for style and syntax errors.

You can use eslint against your changes: 
```
npm run eslint
```

### Contributing
This guide assumes that the git remote name of the main repo is `upstream` and that **your** fork is named `origin`.

Create a new branch on your local machine to make your changes against (based on `upstream/master`):
```
git checkout -b branch-name-here --no-track upstream/master
```
We recommend naming your branch using the following convention:
```
#(issueNumber)-feature-name-your-name
ex: 36-middleware-error-handling-cole
```

#### Contribute using Waffle.io board as a guide
* Click on the orange and grey Waffle.io badge at the top of this README to see a list of current issues
* Choose one and work on your local machine to fix it  
  - We recommend naming your branch according to the above convention  
  - Use TDD as much as possible and make sure there are both happy path and sad path tests for new endpoints  
  - Once the tests are passing, you can commit your changes. See [Making a great commit for more tips](https://github.com/openfoodfoundation/openfoodnetwork/wiki/Making-a-great-commit).  
```
git add .
git commit -m "Add a concise commit message describing your change here"
```
  - Before pushing to your fork, rebase your commits against the upstream master branch
```
git pull --rebase upstream master
```
  - Push your changes to a branch on your fork:
```
git push origin branch-name-here
```

#### Submitting a Pull Request
* Create a Pull Request (PR) to this repo's master using GitHub's UI
* Fill in the requested information re: what you worked on
* Keep your PR small, with a single focus

### API Endpoints
#### Charging Stations
```
GET /api/v1/stations
--> returns a response body with an array of all station objects

GET /api/v1/stations/:station_id
--> returns a response body with an array of one station object

POST/api/v1/stations
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

POST /api/v1/stations/:station_id/cafes
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


## This is a partenered project designed and coded by:
* Alexander Ela - [Github.com/alexanderela](https://github.com/alexanderela)
* Cole Hart - [Github.com/colehart](https://github.com/colehart)

## This README relied upon Open Food Source's extensive and excellent [Set Up](https://github.com/openfoodfoundation/openfoodnetwork/blob/master/GETTING_STARTED.md) and [Contibution](https://github.com/openfoodfoundation/openfoodnetwork/blob/master/CONTRIBUTING.md) docs.
