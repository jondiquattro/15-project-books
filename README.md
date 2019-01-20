![CF](http://i.imgur.com/7v5ASc8.png) LAB 15
=================================================

## Lab 15 Project Books

### Author: Jon Diquattro and Ryan Gallaway 
#### refactoring Code Fellows Book App
### Links and Resources

[![Build Status](https://travis-ci.com/jondiquattro/15-project-books.svg?branch=master)](https://travis-ci.com/jondiquattro/15-project-books)

* [repo](https://github.com/jondiquattro/15-project-books)
* [travis](https://travis-ci.com/jondiquattro/15-project-books)
* [back-end](https://lab-15-ryan-jon.herokuapp.com/)
* [front-end](http://localhost:8080)

#### Documentation ///////////////////////////on its way
* [jsdoc](http://xyz.com) (All assignments)

### Modules
#### `models/books.js`, `books-schema.js`, `api/books.js`, `404.js`, `error.js`, `routes/v1.js`
#### Exported Values and Methods:
#### router, books, Books

### Overview
Refactors the Code Fellows 301 Book App

#### Requirements
* The UI and App Functionality must remain identical
* Modularize the server code
  * server.js should be a requireable module
  * index.js should be written to:
    * require mongo and connect to your books database
    * require your server.js and start
  * routes.js should be written to handle routing
  * Middleware moved to appropriate files
  * Model behavior (SQL) moved out into a model file
* Convert the models from postgres to mongo
  * Keep the pg version in addition to the mongo version
  * Must be able to change between them based on config
    * (Model Interface)
* Deploy to Heroku

### Setup
#### `.env` requirements
* `PORT` - defined in ENV
* `MONGODB_URI` - mongodb://heroku_61kfgjf6:50tgahono1pdv66tgvunf66cau@ds251849.mlab.com:51849/heroku_61kfgjf6)

#### Running the app
* `nodemon`
  
#### Tests
* `npm i` to install dependencies
* npm test (to run jest)
* run eslint (to run linter)
* nodemon (to start server)
