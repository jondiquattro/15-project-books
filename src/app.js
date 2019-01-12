'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require( './middleware/error.js');
const notFound = require( './middleware/404.js' );
// const categoryRouter = require( './api/categories.js' );
// const productRouter = require( './api/products.js' );
const apiRouter = require('./routes/v1.js');

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes
// app.use(categoryRouter);
// app.use(productsRouter);
app.use(apiRouter);

// Catchalls
app.use(notFound);
app.use(errorHandler);

let isRunning = false;

module.exports = {
  server: app,
  start: (PORT) => {
    if( ! isRunning ) {
      app.listen(PORT, () => {
        isRunning = true;
        console.log(`Server Up on ${PORT}`);
      });
    }
    else {
      console.log('Server is already running');
    }
  },
};
